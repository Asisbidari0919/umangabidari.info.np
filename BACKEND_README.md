# Cybersecurity Portfolio - Backend

Full-stack backend for the Cybersecurity & Ethical Hacker Portfolio website built with Node.js, Express, and MongoDB.

## 🚀 Features

### Authentication & Security
- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting on login attempts
- CORS protection
- Helmet security headers
- Admin role-based access control

### Content Management
- **Projects** - Add, edit, delete portfolio projects
- **Blog Posts** - Publish and manage blog articles
- **Testimonials** - Manage and approve testimonials
- **Skills** - Organize skills by category
- **Contact Messages** - Receive and manage contact form submissions

### Email Integration
- Contact form email notifications
- Automated confirmation emails
- Admin notification system

### API Features
- RESTful API design
- Input validation
- Error handling
- Pagination support
- Search & filter capabilities

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

## 🔧 Installation

1. **Clone or navigate to project directory**
   ```bash
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file from example**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in .env**
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cybersecurity-portfolio
   
   JWT_SECRET=your_super_secret_jwt_key_12345
   JWT_EXPIRE=7d
   
   ADMIN_EMAIL=admin@portfolio.com
   ADMIN_PASSWORD=admin123
   
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_TO=your_email@gmail.com
   
   FRONTEND_URL=http://localhost:3000
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Initialize database and create default admin**
   ```bash
   node init.js
   ```

6. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

Server will run on `http://localhost:5000`

## 🗄️ MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB Community Edition
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

### MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in .env

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Create App Password
3. Use App Password in `EMAIL_PASSWORD`

Or use other email services (SendGrid, Mailgun, etc.)

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin (first time setup)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/current` - Get current admin (protected)
- `POST /api/auth/update-password` - Update password (protected)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get single blog post
- `POST /api/blog` - Create blog post (protected)
- `PUT /api/blog/:id` - Update blog post (protected)
- `DELETE /api/blog/:id` - Delete blog post (protected)

### Testimonials
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials` - Submit testimonial
- `GET /api/testimonials/admin/all` - Get all testimonials (protected)
- `PUT /api/testimonials/:id` - Update testimonial (protected)
- `DELETE /api/testimonials/:id` - Delete testimonial (protected)

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get single skill category
- `POST /api/skills` - Create skill category (protected)
- `PUT /api/skills/:id` - Update skill category (protected)
- `DELETE /api/skills/:id` - Delete skill category (protected)

### Contact Messages
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get all messages (protected)
- `GET /api/contact/:id` - Get single message (protected)
- `PUT /api/contact/:id/toggle-read` - Mark as read/unread (protected)
- `DELETE /api/contact/:id` - Delete message (protected)

### Statistics
- `GET /api/stats` - Get portfolio statistics (protected)

## 🔐 Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Get token by logging in:
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": { ... }
}
```

## 📚 Example Requests

### Create Project
```bash
POST /api/projects
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Security Penetration Testing Tool",
  "description": "A comprehensive tool for penetration testing",
  "image": "https://example.com/image.jpg",
  "tags": ["Python", "Security", "CLI"],
  "demoLink": "https://demo.example.com",
  "githubLink": "https://github.com/example/project",
  "featured": true
}
```

### Submit Contact Message
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Collaboration",
  "message": "I'm interested in collaborating...",
  "phone": "+1234567890"
}
```

### Create Blog Post
```bash
POST /api/blog
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Introduction to Cybersecurity",
  "content": "Detailed blog content here...",
  "excerpt": "Brief summary...",
  "tags": ["security", "tutorial"],
  "featured": true,
  "published": true
}
```

## 📦 Project Structure

```
Portfolio/
├── models/              # MongoDB schemas
│   ├── Admin.js
│   ├── Project.js
│   ├── Blog.js
│   ├── Testimonial.js
│   ├── Skill.js
│   └── ContactMessage.js
├── routes/              # API routes
│   ├── auth.js
│   ├── projects.js
│   ├── blog.js
│   ├── testimonials.js
│   ├── skills.js
│   ├── contact.js
│   └── stats.js
├── controllers/         # Business logic
│   ├── authController.js
│   ├── projectController.js
│   ├── blogController.js
│   ├── testimonialController.js
│   ├── skillController.js
│   └── contactController.js
├── middleware/          # Custom middleware
│   ├── auth.js         # JWT verification
│   └── validation.js   # Input validation
├── config/              # Configuration files
│   └── database.js
├── .env.example         # Environment template
├── server.js            # Main server file
├── init.js              # Database initialization
└── package.json         # Dependencies
```

## 🔄 Frontend Integration

Update your frontend files to use the backend API:

### Updated admin-script.js
Replace localStorage calls with API requests:

```javascript
// Instead of localStorage
// const projects = JSON.parse(localStorage.getItem('projects')) || [];

// Use API call
const response = await fetch('/api/projects', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
const { projects } = await response.json();
```

### Update contact form
```javascript
// Instead of localStorage
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name, email, subject, message
    })
});
```

## 🛡️ Security Best Practices

1. **Environment Variables** - Never commit .env to git
2. **Change Passwords** - Update default admin password immediately
3. **JWT Secret** - Use a strong, unique JWT_SECRET
4. **HTTPS** - Use HTTPS in production
5. **CORS** - Restrict CORS to your frontend domain
6. **Rate Limiting** - Adjust rate limits based on your needs
7. **Database** - Use MongoDB Atlas with network access restrictions

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify network access in MongoDB Atlas

### Email Not Sending
- Check EMAIL_SERVICE and credentials in .env
- Enable "Less Secure Apps" if using Gmail
- Use App Password with 2FA

### CORS Issues
- Update CORS_ORIGIN in .env to match frontend URL
- Ensure frontend sends correct Origin header

## 📝 Environment Variables

```
NODE_ENV              - development/production
PORT                  - Server port (default: 5000)
MONGODB_URI           - MongoDB connection string
JWT_SECRET            - JWT signing secret
JWT_EXPIRE            - Token expiration (default: 7d)
ADMIN_EMAIL           - Default admin email
ADMIN_PASSWORD        - Default admin password
EMAIL_SERVICE         - Email service provider
EMAIL_USER            - Email sender address
EMAIL_PASSWORD        - Email service password
EMAIL_TO              - Admin email for notifications
FRONTEND_URL          - Frontend URL
CORS_ORIGIN           - Allowed CORS origin
BCRYPT_ROUNDS         - Password hash rounds (default: 10)
```

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
heroku addons:create mongolab
git push heroku main
heroku open
```

### Deploy to Railway, Render, or DigitalOcean
See their respective documentation for Node.js deployment

## 📞 Support

For issues or questions:
- Check the API documentation above
- Review error messages in server logs
- Ensure all environment variables are set correctly

## 📄 License

ISC

## 👨‍💻 Author

Umanga Bidari - Cybersecurity & Ethical Hacker

---

**Happy Coding! 🔐**
