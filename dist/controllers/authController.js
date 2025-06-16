"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
dotenv_1.default.config();
async function login(req, res) {
    const { email, password } = req.body;
    console.log('Login attempt:', email);
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }
    try {
        const user = await (0, User_1.findUserByEmailFromBothTables)(email);
        if (!user) {
            console.log('Invalid credentials - user not found:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const valid = await (0, User_1.comparePassword)(password, user.password);
        if (!valid) {
            console.log('Invalid credentials - password mismatch for:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        console.log('User found for login:', { id: user.id, email: user.email, role: user.role, name: user.name });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log('Successful login for:', email, 'with role:', user.role);
        // Return a standardized response format
        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        console.log('Login response user object:', userResponse);
        res.json({
            success: true,
            token,
            expiresIn: 86400, // 1 day in seconds
            user: userResponse
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during login'
        });
    }
}
async function getProfile(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        // Import db here to avoid circular dependencies
        const db = require('../db/knex');
        // Fetch complete user data from database
        const user = await db('users')
            .select(['id', 'name', 'email', 'role', 'phone', 'department', 'employeeId', 'studentId', 'roomNumber', 'enrollmentDate'])
            .where({ id: userId })
            .first();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('Returning user profile:', user);
        res.json(user); // Return user directly, not wrapped in { user: ... }
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function updateProfile(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const { name, email, phone, department, employeeId, studentId, roomNumber, enrollmentDate } = req.body;
        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        // Import db here to avoid circular dependencies
        const db = require('../db/knex');
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
        console.log('Profile updated successfully for user:', userId, updatedUser[0]);
        res.json(updatedUser[0]); // Return user directly, not wrapped in { user: ... }
    }
    catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
