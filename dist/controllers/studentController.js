"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStudents = getAllStudents;
exports.getStudentById = getStudentById;
exports.createStudent = createStudent;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
exports.getStudentRemainingRent = getStudentRemainingRent;
const bcrypt_1 = __importDefault(require("bcrypt"));
const StudentModel = __importStar(require("../models/Student"));
const RoomModel = __importStar(require("../models/Room"));
const PaymentModel = __importStar(require("../models/Payment"));
async function getAllStudents(req, res) {
    const students = await StudentModel.getAllStudents();
    res.json(students);
}
async function getStudentById(req, res) {
    try {
        const studentId = Number(req.params.id);
        console.log('Getting student by ID:', studentId);
        const student = await StudentModel.getStudentById(studentId);
        console.log('Student found:', student);
        if (!student) {
            console.log('Student not found for ID:', studentId);
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    }
    catch (error) {
        console.error('Error getting student by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function createStudent(req, res) {
    try {
        const studentData = { ...req.body };
        // Validate room capacity if roomId is provided
        if (studentData.roomId) {
            const roomId = Number(studentData.roomId);
            const room = await RoomModel.getRoomById(roomId);
            if (!room) {
                return res.status(400).json({ error: 'Room not found' });
            }
            // Check current occupancy
            const currentOccupants = await StudentModel.getStudentsByRoomId(roomId);
            if (currentOccupants.length >= room.maxOccupancy) {
                return res.status(400).json({
                    error: `Room is full. Maximum capacity: ${room.maxOccupancy}, Current occupants: ${currentOccupants.length}`
                });
            }
            // Update room status based on occupancy after adding this student
            const newOccupancy = currentOccupants.length + 1;
            let newStatus = room.status;
            if (newOccupancy >= room.maxOccupancy) {
                newStatus = 'complet';
            }
            else if (newOccupancy > 0) {
                newStatus = 'occupied';
            }
            // Update room status if needed
            if (newStatus !== room.status) {
                await RoomModel.updateRoom(roomId, { status: newStatus });
            }
        }
        // Hash password if provided
        if (studentData.password) {
            const saltRounds = 10;
            studentData.password = await bcrypt_1.default.hash(studentData.password, saltRounds);
        }
        const student = await StudentModel.createStudent(studentData);
        res.status(201).json(student);
    }
    catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Failed to create student' });
    }
}
async function updateStudent(req, res) {
    try {
        const studentId = Number(req.params.id);
        const studentData = { ...req.body };
        // Get current student data
        const currentStudent = await StudentModel.getStudentById(studentId);
        if (!currentStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        // Validate room capacity if roomId is being changed
        if (studentData.roomId && studentData.roomId !== currentStudent.roomId) {
            const roomId = Number(studentData.roomId);
            const room = await RoomModel.getRoomById(roomId);
            if (!room) {
                return res.status(400).json({ error: 'Room not found' });
            }
            // Check current occupancy (excluding this student if they're changing rooms)
            const currentOccupants = await StudentModel.getStudentsByRoomId(roomId);
            if (currentOccupants.length >= room.maxOccupancy) {
                return res.status(400).json({
                    error: `Room is full. Maximum capacity: ${room.maxOccupancy}, Current occupants: ${currentOccupants.length}`
                });
            }
            // Update new room status
            const newOccupancy = currentOccupants.length + 1;
            let newStatus = room.status;
            if (newOccupancy >= room.maxOccupancy) {
                newStatus = 'complet';
            }
            else if (newOccupancy > 0) {
                newStatus = 'occupied';
            }
            if (newStatus !== room.status) {
                await RoomModel.updateRoom(roomId, { status: newStatus });
            }
            // Update old room status if student had a previous room
            if (currentStudent.roomId) {
                const oldRoom = await RoomModel.getRoomById(currentStudent.roomId);
                if (oldRoom) {
                    const oldRoomOccupants = await StudentModel.getStudentsByRoomId(currentStudent.roomId);
                    const oldRoomNewOccupancy = oldRoomOccupants.length - 1; // Remove this student
                    let oldRoomNewStatus = oldRoom.status;
                    if (oldRoomNewOccupancy === 0) {
                        oldRoomNewStatus = 'available';
                    }
                    else if (oldRoomNewOccupancy < oldRoom.maxOccupancy) {
                        oldRoomNewStatus = 'occupied';
                    }
                    if (oldRoomNewStatus !== oldRoom.status) {
                        await RoomModel.updateRoom(currentStudent.roomId, { status: oldRoomNewStatus });
                    }
                }
            }
        }
        // Hash password if provided in update
        if (studentData.password) {
            const saltRounds = 10;
            studentData.password = await bcrypt_1.default.hash(studentData.password, saltRounds);
        }
        const updated = await StudentModel.updateStudent(studentId, studentData);
        if (!updated)
            return res.status(404).json({ error: 'Student not found' });
        res.json(updated);
    }
    catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Failed to update student' });
    }
}
async function deleteStudent(req, res) {
    await StudentModel.deleteStudent(Number(req.params.id));
    res.status(204).send();
}
// Get remaining rent for a student
async function getStudentRemainingRent(req, res) {
    try {
        const studentId = Number(req.params.id);
        // Get student and their room information
        const student = await StudentModel.getStudentById(studentId);
        if (!student || !student.roomId) {
            return res.status(404).json({ error: 'Student not found or not assigned to a room' });
        }
        const room = await RoomModel.getRoomById(student.roomId);
        if (!room || !room.rent) {
            return res.status(404).json({ error: 'Room not found or rent not set' });
        }
        // Get all payments for this student
        const payments = await PaymentModel.getPaymentsByStudentId(studentId);
        const monthlyRent = room.rent;
        // Calculate months since enrollment
        const enrollmentDate = student.enrollmentDate ? new Date(student.enrollmentDate) : new Date();
        const currentDate = new Date();
        const monthsSinceEnrollment = Math.max(1, Math.ceil((currentDate.getTime() - enrollmentDate.getTime()) / (1000 * 60 * 60 * 24 * 30)));
        // Calculate total rent due (monthly rent * months since enrollment)
        const totalRentDue = monthlyRent * monthsSinceEnrollment;
        // Calculate total paid amount from actual payments
        const totalPaid = payments
            .filter(payment => payment.status === 'paid')
            .reduce((sum, payment) => sum + payment.amount, 0);
        // Calculate remaining rent
        const remainingRent = Math.max(0, totalRentDue - totalPaid);
        // Calculate overdue amount (payments that are overdue)
        const overdueAmount = payments
            .filter(payment => payment.status === 'overdue')
            .reduce((sum, payment) => sum + payment.amount, 0);
        // Calculate pending amount (payments that are pending)
        const pendingAmount = payments
            .filter(payment => payment.status === 'pending')
            .reduce((sum, payment) => sum + payment.amount, 0);
        // Next payment due date (current month if not paid, or next month)
        const nextPaymentDate = new Date();
        nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
        nextPaymentDate.setDate(1); // First of next month
        res.json({
            studentId: student.id,
            studentName: student.name,
            roomNumber: room.number,
            monthlyRent: monthlyRent,
            monthsSinceEnrollment: monthsSinceEnrollment,
            totalRentDue: totalRentDue,
            totalPaid: totalPaid,
            remainingRent: remainingRent,
            overdueAmount: overdueAmount,
            pendingAmount: pendingAmount,
            nextPaymentDate: nextPaymentDate.toISOString().split('T')[0],
            paymentSummary: {
                totalPayments: payments.length,
                paidPayments: payments.filter(p => p.status === 'paid').length,
                pendingPayments: payments.filter(p => p.status === 'pending').length,
                overduePayments: payments.filter(p => p.status === 'overdue').length
            }
        });
    }
    catch (error) {
        console.error('Error calculating remaining rent:', error);
        res.status(500).json({ error: 'Failed to calculate remaining rent' });
    }
}
