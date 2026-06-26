# 🚀 QUICK START GUIDE - Portfolio Backend Setup

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies

**Windows:**
```bash
setup.bat
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Manual:**
```bash
npm install
cp .env.example .env
node init.js
```

---

### Step 2: Configure MongoDB

#### Option A: Local MongoDB
**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
- Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Run installer and follow instructions

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

#### Option B: MongoDB Atlas (Cloud)
1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cybersecurity-portfolio
```

---

### Step 3: Configure Email (Optional for Contact Form)

#### Gmail Setup
1. Enable 2-factor authentication on Gmail
2. Generate App Password:
   - Visit [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Copy the generated password
3. Update `.env`:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_TO=your_email@gmail.com
```

#### Other Services
- **SendGrid**: Get API key from sendgrid.com
- **Mailgun**: Get API key from mailgun.com

---

### Step 4: Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on: **http://localhost:5000**

---

### Step 5: Test the Backend

Run test suite:
```bash
node test-api.js
```

This will test all endpoints and create sample data.

---

## 📋 Default Admin Credentials

After setup, admin account is created with:
- **Email:** admin@portfolio.com
- **Password:** admin123

⚠️ **Change password immediately after first login!**

---

## 🔗 Frontend Integration

### Update Admin Panel to Use Backend

In `admin-script.js`, replace localStorage with API calls:

```javascript
// Set your API base URL
const API_BASE_URL = 'http://localhost:5000/api';
let authToken = localStorage.getItem('adminToken');

// Example: Get projects from backend
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        const data = await response.json();
        
        if (data.success) {
            displayProjects(data.projects);
        }
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Example: Save project to backend
async function saveProject(e) {
    e.preventDefault();
    
    const projectData = {
        title: document.getElementById('project-title').value,
        description: document.getElementById('project-description').value,
        // ... other fields
    };
    
    const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(projectData)
    });
    
    const result = await response.json();
    if (result.success) {
        alert('Project saved successfully!');
        loadProjects();
    }
}
```

### Update Contact Form

In `script.js`, submit to backend:

```javascript
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('input[placeholder="Your Name"]').value,
            email: this.querySelector('input[placeholder="Your Email"]').value,
            subject: this.querySelector('input[placeholder="Subject"]').value,
            message: this.querySelector('textarea').value
        };
        
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert(result.message);
                this.reset();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            alert('Error sending message: ' + error.message);
        }
    });
}
```

---

## 📚 API Quick Reference

### Authentication
```bash
# Login
POST /api/auth/login
{
    "email": "admin@portfolio.com",
    "password": "admin123"
}

# Response includes token to use in headers
Authorization: Bearer {token}
```

### Create Project
```bash
POST /api/projects
Authorization: Bearer {token}
{
    "title": "Project Name",
    "description": "Project description",
    "tags": ["python", "security"],
    "demoLink": "https://...",
    "githubLink": "https://..."
}
```

### Get All Projects
```bash
GET /api/projects
```

### Submit Contact Form
```bash
POST /api/contact
{
    "name": "Your Name",
    "email": "your@email.com",
    "subject": "Subject",
    "message": "Your message"
}
```

### Get Contact Messages (Admin)
```bash
GET /api/contact
Authorization: Bearer {token}
```

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb

# Windows
net start MongoDB
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:** Change port in `.env`
```
PORT=5001
```

### JWT Token Expired
**Solution:** Login again to get new token
```bash
POST /api/auth/login
```

### Email Not Sending
- Check EMAIL_USER and EMAIL_PASSWORD in `.env`
- For Gmail, use App Password (not regular password)
- Ensure SMTP is enabled

### CORS Error
**Solution:** Update `.env`
```
CORS_ORIGIN=http://localhost:3000
```

---

## 📂 Project Structure

```
Portfolio/
├── models/           # Database schemas
├── routes/           # API endpoints
├── controllers/      # Business logic
├── middleware/       # Authentication & validation
├── config/           # Configuration
├── .env              # Environment variables
├── .env.example      # Template
├── server.js         # Main server
├── init.js           # Database initialization
├── test-api.js       # API test suite
├── setup.sh/bat      # Setup script
├── package.json      # Dependencies
└── BACKEND_README.md # Full documentation
```

---

## 🚀 Next Steps

1. ✅ Install and run backend
2. ✅ Configure .env with real credentials
3. ✅ Update frontend admin panel to use API
4. ✅ Update contact form to use API
5. ✅ Deploy to production (Heroku, Railway, etc.)

---

## 📊 API Statistics Endpoint

Get portfolio stats:
```bash
GET /api/stats
Authorization: Bearer {token}

Response:
{
    "success": true,
    "stats": {
        "projects": { "total": 5 },
        "blogs": { "total": 3, "published": 2 },
        "testimonials": { "total": 4, "approved": 3 },
        "messages": { "total": 2, "unread": 1 }
    }
}
```

---

## 💾 Backup & Export

Export all your data:
```bash
# From admin panel or via API
GET /api/contact
GET /api/projects
GET /api/blog
GET /api/testimonials
GET /api/skills
```

---

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Update JWT_SECRET in .env
- [ ] Use strong EMAIL_PASSWORD
- [ ] Enable HTTPS in production
- [ ] Set proper CORS_ORIGIN
- [ ] Use MongoDB Atlas with network restrictions
- [ ] Never commit .env to git

---

## 📞 Support Resources

- **Backend Docs:** See BACKEND_README.md
- **MongoDB Docs:** [docs.mongodb.com](https://docs.mongodb.com)
- **Express Docs:** [expressjs.com](https://expressjs.com)
- **JWT Guide:** [jwt.io](https://jwt.io)

---

**Happy coding! 🔐**

For detailed API documentation, see `BACKEND_README.md`
