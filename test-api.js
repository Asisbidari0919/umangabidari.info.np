/**
 * API Testing Utility
 * Test backend endpoints without frontend
 * 
 * Run: node test-api.js
 */

require('dotenv').config();

const BASE_URL = `http://localhost:${process.env.PORT || 5000}/api`;

// Helper function for API calls
async function apiCall(method, endpoint, body = null, token = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const data = await response.json();

        return {
            status: response.status,
            data
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}

// Test scenarios
async function runTests() {
    console.log(`
    ╔═══════════════════════════════════╗
    ║   Portfolio Backend API Tests     ║
    ╚═══════════════════════════════════╝
    `);

    let token = null;

    // Test 1: Health check
    console.log('\n📋 Test 1: Health Check');
    let result = await apiCall('GET', '/health');
    console.log(result.data);

    // Test 2: Register (if needed)
    console.log('\n📋 Test 2: Register Admin (First time setup)');
    result = await apiCall('POST', '/auth/register', {
        username: 'admin',
        email: 'admin@portfolio.com',
        password: 'admin123',
        confirmPassword: 'admin123'
    });
    console.log(result.data);

    // Test 3: Login
    console.log('\n📋 Test 3: Admin Login');
    result = await apiCall('POST', '/auth/login', {
        email: 'admin@portfolio.com',
        password: 'admin123'
    });
    
    if (result.data.success) {
        token = result.data.token;
        console.log('✓ Login successful');
        console.log('Token:', token.substring(0, 20) + '...');
    } else {
        console.log('✗ Login failed:', result.data.message);
        return;
    }

    // Test 4: Get current admin
    console.log('\n📋 Test 4: Get Current Admin');
    result = await apiCall('GET', '/auth/current', null, token);
    console.log(result.data);

    // Test 5: Create project
    console.log('\n📋 Test 5: Create Project');
    result = await apiCall('POST', '/projects', {
        title: 'Security Penetration Testing Tool',
        description: 'A comprehensive tool for penetration testing and vulnerability assessment',
        image: 'https://via.placeholder.com/400x250?text=Pen+Testing',
        tags: ['Python', 'Security', 'CLI'],
        demoLink: 'https://demo.example.com',
        githubLink: 'https://github.com/example/project',
        featured: true
    }, token);
    
    let projectId = null;
    if (result.data.success) {
        projectId = result.data.project._id;
        console.log('✓ Project created:', projectId);
    } else {
        console.log('✗ Failed:', result.data.message);
    }

    // Test 6: Get all projects
    console.log('\n📋 Test 6: Get All Projects');
    result = await apiCall('GET', '/projects');
    console.log(`✓ Found ${result.data.count} projects`);

    // Test 7: Create blog post
    console.log('\n📋 Test 7: Create Blog Post');
    result = await apiCall('POST', '/blog', {
        title: 'Introduction to Cybersecurity',
        content: 'Detailed content about cybersecurity basics and best practices...',
        excerpt: 'Learn the fundamentals of cybersecurity',
        tags: ['security', 'tutorial', 'beginner'],
        featured: true,
        published: true
    }, token);

    let blogId = null;
    if (result.data.success) {
        blogId = result.data.blog._id;
        console.log('✓ Blog created:', blogId);
    } else {
        console.log('✗ Failed:', result.data.message);
    }

    // Test 8: Get all blogs
    console.log('\n📋 Test 8: Get All Blog Posts');
    result = await apiCall('GET', '/blog');
    console.log(`✓ Found ${result.data.count} blog posts`);

    // Test 9: Create testimonial
    console.log('\n📋 Test 9: Submit Testimonial');
    result = await apiCall('POST', '/testimonials', {
        text: 'Umanga is an exceptional cybersecurity professional with deep expertise',
        author: 'John Doe',
        role: 'Security Manager',
        rating: 5
    });
    console.log(result.data);

    // Test 10: Get approved testimonials
    console.log('\n📋 Test 10: Get Approved Testimonials');
    result = await apiCall('GET', '/testimonials');
    console.log(`✓ Found ${result.data.count} approved testimonials`);

    // Test 11: Create skill category
    console.log('\n📋 Test 11: Create Skill Category');
    result = await apiCall('POST', '/skills', {
        category: 'Penetration Testing',
        skills: [
            { name: 'Metasploit', proficiency: 90 },
            { name: 'Burp Suite', proficiency: 85 },
            { name: 'Nmap', proficiency: 95 }
        ],
        order: 1
    }, token);
    console.log(result.data);

    // Test 12: Get all skills
    console.log('\n📋 Test 12: Get All Skills');
    result = await apiCall('GET', '/skills');
    console.log(`✓ Found ${result.data.count} skill categories`);

    // Test 13: Submit contact message
    console.log('\n📋 Test 13: Submit Contact Message');
    result = await apiCall('POST', '/contact', {
        name: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Project Collaboration Request',
        message: 'I\'m interested in collaborating on security projects...',
        phone: '+1234567890'
    });
    console.log(result.data);

    // Test 14: Get all messages (admin)
    console.log('\n📋 Test 14: Get Contact Messages (Admin)');
    result = await apiCall('GET', '/contact', null, token);
    if (result.data.success) {
        console.log(`✓ Found ${result.data.count} messages`);
    } else {
        console.log('✗ Failed:', result.data.message);
    }

    // Test 15: Get statistics
    console.log('\n📋 Test 15: Get Portfolio Statistics');
    result = await apiCall('GET', '/stats', null, token);
    if (result.data.success) {
        console.log(JSON.stringify(result.data.stats, null, 2));
    } else {
        console.log('✗ Failed:', result.data.message);
    }

    console.log(`
    
    ╔═══════════════════════════════════╗
    ║     Tests Completed ✓             ║
    ╚═══════════════════════════════════╝
    `);
}

// Run tests
runTests().catch(console.error);
