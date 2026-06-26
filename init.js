/**
 * Initialization Script for Portfolio Backend
 * Creates default admin account if it doesn't exist
 * 
 * Run: node init.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const initializeDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cybersecurity-portfolio', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✓ Connected to MongoDB');

        // Check if admin exists
        const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

        if (adminExists) {
            console.log('✓ Admin account already exists');
            await mongoose.disconnect();
            return;
        }

        // Create default admin
        const admin = new Admin({
            username: 'admin',
            email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            role: 'superadmin'
        });

        await admin.save();

        console.log('✓ Default admin account created successfully');
        console.log('  Email:', admin.email);
        console.log('  Username: admin');
        console.log('  Password: ****');
        console.log('\n⚠️  Please change the password after first login!');

        await mongoose.disconnect();
    } catch (error) {
        console.error('✗ Initialization error:', error.message);
        process.exit(1);
    }
};

// Run initialization
initializeDatabase();
