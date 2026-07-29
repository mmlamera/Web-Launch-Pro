# 📸 How to Add Project Screenshots

## 📁 **Step 1: Take Screenshots**

For each project, take these types of screenshots:

### **For the Biscuit Company Project:**
1. **Homepage** - Full homepage view
2. **Product Catalog** - Products page with items
3. **Shopping Cart** - Cart functionality 
4. **Admin Panel** - Admin dashboard (if applicable)
5. **Mobile View** - Mobile responsive design

### **For the Air Suspension Project:**
1. **Homepage** - Professional homepage with hero section
2. **Services Page** - Service descriptions and pricing
3. **Gallery** - Work showcase and before/after photos
4. **Contact/Quote Forms** - Contact and quote request pages
5. **Mobile View** - Mobile responsive design

## 📂 **Step 2: Save Screenshots**

Save your screenshots in the `images/` folder with these names:

```
images/
# Biscuit Company Screenshots
├── biscuit-homepage.jpg     # Homepage screenshot
├── biscuit-products.jpg     # Products page
├── biscuit-cart.jpg         # Shopping cart
├── biscuit-admin.jpg        # Admin panel
├── biscuit-mobile.jpg       # Mobile view

# Air Suspension Screenshots
├── airflow-homepage.jpg     # Homepage screenshot
├── airflow-services.jpg     # Services page
├── airflow-gallery.jpg      # Work gallery
├── airflow-contact.jpg      # Contact/quote forms
└── airflow-mobile.jpg       # Mobile view
```

## 🎯 **Step 3: Add New Projects**

To add more projects, edit `script.js` and add to the `projectData` object:

```javascript
const projectData = {
    'biscuit-company': { ... },
    'your-new-project': {
        title: 'Your Project Name',
        screenshots: [
            {
                src: 'images/project-homepage.jpg',
                title: 'Homepage Design',
                description: 'Description of this screenshot'
            },
            // Add more screenshots...
        ]
    }
};
```

## 🔧 **Step 4: Update Portfolio HTML**

In `index.html`, add the button:

```html
<button class="portfolio-btn" onclick="openProjectModal('your-new-project')">
    <i class="fas fa-images"></i> View Screenshots
</button>
```

## 📱 **Recommended Screenshot Sizes:**
- **Width**: 1200-1920px
- **Height**: 800-1080px
- **Format**: JPG or PNG
- **File Size**: Under 500KB each

## 🎨 **Tips for Good Screenshots:**
- Take full-page screenshots
- Show key functionality
- Include both desktop and mobile views
- Highlight unique features
- Use consistent browser/window styling 