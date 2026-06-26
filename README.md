# Professional Portfolio

A modern, responsive dark-mode portfolio website with all essential sections for showcasing your work and skills.

## Features

✨ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
🌙 **Dark Theme** - Professional dark mode optimized for viewing comfort
⚡ **Fast & Lightweight** - Pure HTML, CSS, and JavaScript with no dependencies
🎨 **Modern UI** - Clean, professional design with smooth animations
📱 **Mobile-Friendly** - Fully responsive with mobile navigation menu
🚀 **Smooth Scrolling** - Elegant navigation with smooth scroll effects
📧 **Contact Form** - Functional contact form with validation
🔗 **Social Links** - Easy integration with your social media profiles

## Sections Included

1. **Navigation Bar** - Sticky navigation with smooth scrolling
2. **Hero Section** - Eye-catching introduction with call-to-action buttons
3. **About Me** - Personal introduction and key statistics
4. **Skills** - Showcase your technical skills organized by category
5. **Projects** - Display your featured work with images, descriptions, and links
6. **Experience** - Timeline view of your professional background
7. **Blog** - Latest articles and blog posts
8. **Testimonials** - Client or colleague testimonials with ratings
9. **Contact** - Contact information and functional contact form
10. **Social Links** - Connect with your audience on various platforms

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Interactive features and animations

## How to Use

### 1. **Edit Your Information**

Open `index.html` and find and replace the following placeholders:

- `[Your Name]` - Replace with your actual name
- `[your field]` - Your professional field or specialization
- `[X years]` - Years of experience
- `[your tech stack]` - Technologies you work with
- `[your hobbies]` - Your personal interests
- `your.email@example.com` - Your email address
- `+1 (234) 567-890` - Your phone number
- `City, Country` - Your location
- `[Your Name]` in footer - Your name in the footer

### 2. **Add Your Projects**

Edit the Projects section:
- Replace project titles and descriptions
- Update project images (replace placeholder URLs with your actual image paths)
- Update technology tags
- Update GitHub and demo links

### 3. **Update Skills**

Modify the Skills section:
- Edit skill categories (Frontend, Backend, Tools)
- Add or remove skill tags as needed

### 4. **Add Your Experience**

Update the Experience section:
- Edit job titles and company names
- Update dates and descriptions
- Add your actual work experience

### 5. **Add Blog Articles**

Update the Blog section:
- Replace article titles and descriptions
- Update dates
- Add links to your actual blog posts

### 6. **Update Testimonials**

Edit the Testimonials section:
- Replace with actual client or colleague testimonials
- Update names and roles

### 7. **Add Social Media Links**

Find the Social Links section and update the URLs to point to your profiles:
- GitHub
- LinkedIn
- Twitter
- Instagram
- CodePen (or other platforms)

### 8. **Contact Form**

The contact form is ready to use but currently shows a browser alert. To make it actually send emails, you'll need to:

**Option A: Use a third-party service (Recommended)**
- Sign up for a service like Formspree (https://formspree.io/)
- Replace the form action with your Formspree endpoint

**Option B: Use a backend server**
- Set up a backend endpoint to handle form submissions
- Modify the form submission in `script.js` to send data to your backend

## Customization Tips

### Change Colors

The color scheme is defined using CSS variables at the top of `styles.css`:

```css
:root {
    --primary-color: #00d4ff;      /* Cyan - main accent */
    --secondary-color: #9d4edd;    /* Purple - secondary accent */
    --dark-bg: #0a0e27;            /* Dark background */
    --card-bg: #1a1f3a;            /* Card background */
    --text-primary: #e0e0e0;       /* Primary text color */
    --text-secondary: #a0a0a0;     /* Secondary text color */
    --border-color: #2a2f4a;       /* Border color */
    --accent: #ff006e;             /* Accent color */
}
```

Simply change these hex values to customize the entire color scheme!

### Add Custom Images

1. Create a folder called `images` in your portfolio directory
2. Add your project images, profile picture, etc.
3. Replace the placeholder image URLs in the HTML with your actual image paths

Example:
```html
<!-- Old -->
<img src="https://via.placeholder.com/400x250?text=Project+1" alt="Project 1">

<!-- New -->
<img src="images/my-project-1.jpg" alt="Project 1">
```

### Add More Projects or Blog Posts

Simply duplicate the project card or blog card HTML and modify the content:

```html
<!-- Copy this entire div and modify -->
<div class="project-card">
    <!-- Project content -->
</div>
```

### Modify Fonts

All fonts are defined at the top of `styles.css`. You can change the font family:

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

Or import custom fonts from Google Fonts.

## Deployment

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository called `yourusername.github.io`
2. Push your portfolio files to the repository
3. Your portfolio will be live at `https://yourusername.github.io`

### Option 2: Netlify (Free)

1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop your portfolio folder or connect your GitHub repository
3. Your portfolio will be live instantly

### Option 3: Vercel (Free)

1. Go to [Vercel](https://vercel.com/)
2. Import your GitHub repository or upload your files
3. Your portfolio will be deployed

### Option 4: Web Hosting

1. Purchase a domain and hosting plan
2. Upload your files via FTP or your hosting provider's file manager
3. Access your portfolio via your domain

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. **Optimize Images** - Compress your project images to reduce file size
2. **Minify CSS/JS** - Use tools like UglifyCSS and UglifyJS for production
3. **CDN for Fonts** - Font Awesome is loaded from CDN for better performance
4. **Lazy Loading** - Images are lazy-loaded for better page speed

## SEO Optimization

Add the following meta tags to your `<head>` section for better SEO:

```html
<meta name="description" content="Your portfolio description here">
<meta name="keywords" content="web developer, portfolio, projects">
<meta name="author" content="Your Name">
<meta property="og:title" content="Your Name - Web Developer">
<meta property="og:description" content="Your portfolio description">
<meta property="og:image" content="path/to/preview-image.jpg">
```

## Mobile Optimization

- ✅ Responsive images
- ✅ Touch-friendly navigation
- ✅ Fast load times
- ✅ Mobile menu toggle
- ✅ Optimized font sizes

## Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Color contrast compliance
- ✅ Alt text for images

## Troubleshooting

**Portfolio looks broken on mobile?**
- Clear your browser cache (Ctrl+Shift+Delete)
- Check that all CSS and JS files are properly linked

**Images not showing?**
- Verify image paths are correct (relative to HTML file)
- Check image file names and extensions
- Ensure images are in the correct folder

**Form not working?**
- You need to set up a backend or use a service like Formspree
- Check browser console (F12) for JavaScript errors

**Navigation not scrolling smoothly?**
- Some older browsers may not support smooth scrolling
- Check that JavaScript is enabled

## Getting Help

- Check the comments in the HTML/CSS/JS files
- Review the customization tips section above
- Visit the Font Awesome documentation for icon options

## License

Feel free to use this portfolio template for your personal projects. You're welcome to modify and customize it as needed.

## Credits

- Font Awesome for icons
- Placeholder service for demo images

---

**Ready to showcase your work?** Start customizing your portfolio now and make it your own! 🚀
