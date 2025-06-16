"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
const db = require("../db/knex");
async function getAllUsers(req, res) {
    const users = await db('users').select('id', 'name', 'email', 'role');
    res.json(users);
}
async function getUserById(req, res) {
    const user = await db('users').where({ id: req.params.id }).select('id', 'name', 'email', 'role').first();
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user);
}
async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const { name, email, phone, department, employeeId, studentId, roomNumber, enrollmentDate } = req.body;
        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        // Check if email is already taken by another user
        const existingUser = await db('users').where({ email }).andWhere('id', '!=', userId).first();
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already taken' });
        }
        // Update user
        const updatedUser = await db('users')
            .where({ id: userId })
            .update({
            name,
            email,
            phone,
            department,
            employeeId,
            studentId,
            roomNumber,
            enrollmentDate,
            updated_at: new Date()
        })
            .returning(['id', 'name', 'email', 'role', 'phone', 'department', 'employeeId', 'studentId', 'roomNumber', 'enrollmentDate']);
        if (!updatedUser || updatedUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser[0]);
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
