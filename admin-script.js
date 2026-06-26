// Admin Control Panel JavaScript

// Configuration
const DEFAULT_ADMIN_PASSWORD = 'admin123';
const DEFAULT_ADMIN_USERNAME = 'admin';
let currentUser = null;
let editingId = null;
let editingType = null;
let deleteTargetId = null;
let deleteTargetType = null;

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    setupEventListeners();
    loadDashboardData();
});

// Login functionality
function checkLoginStatus() {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
        currentUser = storedUser;
        showDashboard();
    } else {
        showLoginScreen();
    }
}

function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'flex';
    document.getElementById('current-user').textContent = currentUser;
}

// Event Listeners Setup
function setupEventListeners() {
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', handleNavigation);
    });

    // Projects section
    document.getElementById('add-project-btn').addEventListener('click', showProjectForm);
    document.getElementById('cancel-project').addEventListener('click', hideProjectForm);
    document.getElementById('project-edit-form').addEventListener('submit', saveProject);

    // Blog section
    document.getElementById('add-blog-btn').addEventListener('click', showBlogForm);
    document.getElementById('cancel-blog').addEventListener('click', hideBlogForm);
    document.getElementById('blog-edit-form').addEventListener('submit', saveBlog);

    // Testimonials section
    document.getElementById('add-testimonial-btn').addEventListener('click', showTestimonialForm);
    document.getElementById('cancel-testimonial').addEventListener('click', hideTestimonialForm);
    document.getElementById('testimonial-edit-form').addEventListener('submit', saveTestimonial);

    // Skills section
    document.getElementById('add-skill-btn').addEventListener('click', showSkillForm);
    document.getElementById('cancel-skill').addEventListener('click', hideSkillForm);
    document.getElementById('skill-edit-form').addEventListener('submit', saveSkill);

    // Settings
    document.getElementById('settings-form').addEventListener('submit', updatePassword);
    document.getElementById('export-data-btn').addEventListener('click', exportData);
    document.getElementById('import-data-btn').addEventListener('click', () => document.getElementById('import-file').click());
    document.getElementById('import-file').addEventListener('change', importData);
    document.getElementById('clear-data-btn').addEventListener('click', clearAllData);

    // Modal
    document.getElementById('confirm-delete-btn').addEventListener('click', confirmDelete);
    document.getElementById('cancel-delete-btn').addEventListener('click', closeDeleteModal);

    // Mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', toggleSidebar);
}

// Login handler
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === DEFAULT_ADMIN_USERNAME && password === DEFAULT_ADMIN_PASSWORD) {
        currentUser = username;
        localStorage.setItem('adminUser', username);
        showDashboard();
        showAlert('Login successful!', 'success');
    } else {
        showAlert('Invalid username or password', 'error');
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminUser');
        currentUser = null;
        document.getElementById('login-form').reset();
        showLoginScreen();
        showAlert('Logged out successfully', 'success');
    }
}

// Navigation handler
function handleNavigation(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    e.currentTarget.classList.add('active');

    const section = e.currentTarget.dataset.section;
    document.querySelectorAll('.admin-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(section).classList.add('active');
    document.getElementById('section-title').textContent = e.currentTarget.querySelector('span').textContent;

    // Load section specific data
    if (section === 'projects') loadProjects();
    if (section === 'blog') loadBlogs();
    if (section === 'testimonials') loadTestimonials();
    if (section === 'skills') loadSkills();
    if (section === 'contact-messages') loadMessages();

    // Close sidebar on mobile
    document.getElementById('admin-sidebar').classList.remove('active');
}

// Projects Management
function showProjectForm() {
    editingId = null;
    document.getElementById('project-edit-form').reset();
    document.getElementById('project-form').style.display = 'block';
}

function hideProjectForm() {
    document.getElementById('project-form').style.display = 'none';
    editingId = null;
}

function saveProject(e) {
    e.preventDefault();
    
    const project = {
        id: editingId || Date.now(),
        title: document.getElementById('project-title').value,
        image: document.getElementById('project-image').value || 'https://via.placeholder.com/400x250?text=Project',
        description: document.getElementById('project-description').value,
        tags: document.getElementById('project-tags').value.split(',').map(t => t.trim()),
        demoLink: document.getElementById('project-demo').value,
        githubLink: document.getElementById('project-github').value
    };

    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    if (editingId) {
        projects = projects.map(p => p.id === editingId ? project : p);
        showAlert('Project updated successfully!', 'success');
    } else {
        projects.push(project);
        showAlert('Project added successfully!', 'success');
    }

    localStorage.setItem('projects', JSON.stringify(projects));
    hideProjectForm();
    loadProjects();
    loadDashboardData();
}

function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const list = document.getElementById('projects-list');

    if (projects.length === 0) {
        list.innerHTML = '<p class="empty-message">No projects yet. Click "Add New Project" to get started.</p>';
        return;
    }

    list.innerHTML = projects.map(project => `
        <div class="item-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${project.tags.length > 0 ? `<div class="tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
            <div class="item-actions">
                <button class="btn-edit" onclick="editProject(${project.id})"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn-delete" onclick="deleteItem(${project.id}, 'projects')"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </div>
    `).join('');
}

function editProject(id) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = projects.find(p => p.id === id);
    
    if (project) {
        editingId = id;
        document.getElementById('project-title').value = project.title;
        document.getElementById('project-image').value = project.image;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-tags').value = project.tags.join(', ');
        document.getElementById('project-demo').value = project.demoLink || '';
        document.getElementById('project-github').value = project.githubLink || '';
        document.getElementById('project-form').style.display = 'block';
    }
}

// Blog Management
function showBlogForm() {
    editingId = null;
    document.getElementById('blog-edit-form').reset();
    document.getElementById('blog-date').valueAsDate = new Date();
    document.getElementById('blog-form').style.display = 'block';
}

function hideBlogForm() {
    document.getElementById('blog-form').style.display = 'none';
    editingId = null;
}

function saveBlog(e) {
    e.preventDefault();
    
    const blog = {
        id: editingId || Date.now(),
        title: document.getElementById('blog-title').value,
        date: document.getElementById('blog-date').value,
        content: document.getElementById('blog-content').value
    };

    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    
    if (editingId) {
        blogs = blogs.map(b => b.id === editingId ? blog : b);
        showAlert('Blog post updated successfully!', 'success');
    } else {
        blogs.push(blog);
        showAlert('Blog post added successfully!', 'success');
    }

    localStorage.setItem('blogs', JSON.stringify(blogs));
    hideBlogForm();
    loadBlogs();
    loadDashboardData();
}

function loadBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const list = document.getElementById('blog-list');

    if (blogs.length === 0) {
        list.innerHTML = '<p class="empty-message">No blog posts yet. Click "Add New Post" to get started.</p>';
        return;
    }

    list.innerHTML = blogs.map(blog => `
        <div class="item-card">
            <h3>${blog.title}</h3>
            <div class="meta"><i class="fas fa-calendar"></i> ${blog.date}</div>
            <p>${blog.content.substring(0, 100)}...</p>
            <div class="item-actions">
                <button class="btn-edit" onclick="editBlog(${blog.id})"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn-delete" onclick="deleteItem(${blog.id}, 'blogs')"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </div>
    `).join('');
}

function editBlog(id) {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs.find(b => b.id === id);
    
    if (blog) {
        editingId = id;
        document.getElementById('blog-title').value = blog.title;
        document.getElementById('blog-date').value = blog.date;
        document.getElementById('blog-content').value = blog.content;
        document.getElementById('blog-form').style.display = 'block';
    }
}

// Testimonials Management
function showTestimonialForm() {
    editingId = null;
    document.getElementById('testimonial-edit-form').reset();
    document.getElementById('testimonial-form').style.display = 'block';
}

function hideTestimonialForm() {
    document.getElementById('testimonial-form').style.display = 'none';
    editingId = null;
}

function saveTestimonial(e) {
    e.preventDefault();
    
    const testimonial = {
        id: editingId || Date.now(),
        text: document.getElementById('testimonial-text').value,
        author: document.getElementById('testimonial-author').value,
        role: document.getElementById('testimonial-role').value,
        rating: document.getElementById('testimonial-rating').value
    };

    let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    
    if (editingId) {
        testimonials = testimonials.map(t => t.id === editingId ? testimonial : t);
        showAlert('Testimonial updated successfully!', 'success');
    } else {
        testimonials.push(testimonial);
        showAlert('Testimonial added successfully!', 'success');
    }

    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    hideTestimonialForm();
    loadTestimonials();
    loadDashboardData();
}

function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    const list = document.getElementById('testimonials-list');

    if (testimonials.length === 0) {
        list.innerHTML = '<p class="empty-message">No testimonials yet. Click "Add New Testimonial" to get started.</p>';
        return;
    }

    list.innerHTML = testimonials.map(testimonial => `
        <div class="item-card">
            <div style="color: var(--warning-color); margin-bottom: 0.5rem;">
                ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5-testimonial.rating)}
            </div>
            <p>"${testimonial.text}"</p>
            <div class="meta"><strong>${testimonial.author}</strong> - ${testimonial.role}</div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editTestimonial(${testimonial.id})"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn-delete" onclick="deleteItem(${testimonial.id}, 'testimonials')"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </div>
    `).join('');
}

function editTestimonial(id) {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    const testimonial = testimonials.find(t => t.id === id);
    
    if (testimonial) {
        editingId = id;
        document.getElementById('testimonial-text').value = testimonial.text;
        document.getElementById('testimonial-author').value = testimonial.author;
        document.getElementById('testimonial-role').value = testimonial.role;
        document.getElementById('testimonial-rating').value = testimonial.rating;
        document.getElementById('testimonial-form').style.display = 'block';
    }
}

// Skills Management
function showSkillForm() {
    editingId = null;
    document.getElementById('skill-edit-form').reset();
    document.getElementById('skill-form').style.display = 'block';
}

function hideSkillForm() {
    document.getElementById('skill-form').style.display = 'none';
    editingId = null;
}

function saveSkill(e) {
    e.preventDefault();
    
    const skill = {
        id: editingId || Date.now(),
        category: document.getElementById('skill-category').value,
        tags: document.getElementById('skill-tags').value.split(',').map(t => t.trim())
    };

    let skills = JSON.parse(localStorage.getItem('skills')) || [];
    
    if (editingId) {
        skills = skills.map(s => s.id === editingId ? skill : s);
        showAlert('Skill category updated successfully!', 'success');
    } else {
        skills.push(skill);
        showAlert('Skill category added successfully!', 'success');
    }

    localStorage.setItem('skills', JSON.stringify(skills));
    hideSkillForm();
    loadSkills();
}

function loadSkills() {
    const skills = JSON.parse(localStorage.getItem('skills')) || [];
    const list = document.getElementById('skills-list');

    if (skills.length === 0) {
        list.innerHTML = '<p class="empty-message">No skill categories yet. Click "Add New Skill Category" to get started.</p>';
        return;
    }

    list.innerHTML = skills.map(skill => `
        <div class="item-card">
            <h3>${skill.category}</h3>
            <div class="tags">${skill.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editSkill(${skill.id})"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn-delete" onclick="deleteItem(${skill.id}, 'skills')"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </div>
    `).join('');
}

function editSkill(id) {
    const skills = JSON.parse(localStorage.getItem('skills')) || [];
    const skill = skills.find(s => s.id === id);
    
    if (skill) {
        editingId = id;
        document.getElementById('skill-category').value = skill.category;
        document.getElementById('skill-tags').value = skill.tags.join(', ');
        document.getElementById('skill-form').style.display = 'block';
    }
}

// Contact Messages
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const list = document.getElementById('messages-list');

    if (messages.length === 0) {
        list.innerHTML = '<p class="empty-message">No messages yet.</p>';
        return;
    }

    list.innerHTML = messages.map((msg, idx) => `
        <div class="item-card">
            <h3>${msg.subject}</h3>
            <div class="meta"><strong>From:</strong> ${msg.name} (${msg.email})</div>
            <p>${msg.message}</p>
            <div class="meta" style="font-size: 0.8rem; color: var(--cyber-green);">${msg.date}</div>
        </div>
    `).join('');
}

// Delete functionality
function deleteItem(id, type) {
    deleteTargetId = id;
    deleteTargetType = type;
    document.getElementById('delete-modal').style.display = 'flex';
}

function confirmDelete() {
    if (!deleteTargetId || !deleteTargetType) return;

    let items = JSON.parse(localStorage.getItem(deleteTargetType)) || [];
    items = items.filter(item => item.id !== deleteTargetId);
    localStorage.setItem(deleteTargetType, JSON.stringify(items));

    closeDeleteModal();
    showAlert('Item deleted successfully!', 'success');
    
    if (deleteTargetType === 'projects') loadProjects();
    if (deleteTargetType === 'blogs') loadBlogs();
    if (deleteTargetType === 'testimonials') loadTestimonials();
    if (deleteTargetType === 'skills') loadSkills();
    
    loadDashboardData();
}

function closeDeleteModal() {
    document.getElementById('delete-modal').style.display = 'none';
    deleteTargetId = null;
    deleteTargetType = null;
}

// Dashboard data loading
function loadDashboardData() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    document.getElementById('total-projects').textContent = projects.length;
    document.getElementById('total-blogs').textContent = blogs.length;
    document.getElementById('total-testimonials').textContent = testimonials.length;
    document.getElementById('total-messages').textContent = messages.length;
}

// Settings - Password
function updatePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const storedPassword = localStorage.getItem('adminPassword') || DEFAULT_ADMIN_PASSWORD;

    if (currentPassword !== storedPassword) {
        showAlert('Current password is incorrect', 'error');
        return;
    }

    if (newPassword && newPassword !== confirmPassword) {
        showAlert('New passwords do not match', 'error');
        return;
    }

    if (newPassword) {
        localStorage.setItem('adminPassword', newPassword);
        showAlert('Password updated successfully!', 'success');
    }

    document.getElementById('settings-form').reset();
}

// Export data
function exportData() {
    const data = {
        projects: JSON.parse(localStorage.getItem('projects')) || [],
        blogs: JSON.parse(localStorage.getItem('blogs')) || [],
        testimonials: JSON.parse(localStorage.getItem('testimonials')) || [],
        skills: JSON.parse(localStorage.getItem('skills')) || [],
        messages: JSON.parse(localStorage.getItem('contactMessages')) || []
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().getTime()}.json`;
    link.click();
    
    showAlert('Data exported successfully!', 'success');
}

// Import data
function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            
            if (data.projects) localStorage.setItem('projects', JSON.stringify(data.projects));
            if (data.blogs) localStorage.setItem('blogs', JSON.stringify(data.blogs));
            if (data.testimonials) localStorage.setItem('testimonials', JSON.stringify(data.testimonials));
            if (data.skills) localStorage.setItem('skills', JSON.stringify(data.skills));
            if (data.messages) localStorage.setItem('contactMessages', JSON.stringify(data.messages));

            showAlert('Data imported successfully!', 'success');
            loadDashboardData();
        } catch (error) {
            showAlert('Error importing data. Please check the file format.', 'error');
        }
    };
    reader.readAsText(file);

    // Reset file input
    document.getElementById('import-file').value = '';
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This action cannot be undone.')) {
        localStorage.removeItem('projects');
        localStorage.removeItem('blogs');
        localStorage.removeItem('testimonials');
        localStorage.removeItem('skills');
        localStorage.removeItem('contactMessages');
        
        showAlert('All data cleared successfully!', 'success');
        loadDashboardData();
    }
}

// Alert message
function showAlert(message, type = 'info') {
    const alert = document.getElementById('alert-message');
    alert.textContent = message;
    alert.className = `alert-message ${type}`;
    alert.style.display = 'block';

    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

// Mobile sidebar toggle
function toggleSidebar() {
    document.getElementById('admin-sidebar').classList.toggle('active');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('admin-sidebar');
    const toggle = document.getElementById('menu-toggle');
    
    if (!sidebar.contains(e.target) && !toggle.contains(e.target) && window.innerWidth <= 768) {
        sidebar.classList.remove('active');
    }
});
