# Creative Knacks - Portfolio Website

A modern, interactive portfolio website for Creative Knacks, a creative studio specializing in branding, design, motion graphics, social media handling, and digital marketing. Built with React and featuring smooth animations, dark/light theme support, and a fully responsive design.

## 🚀 Features

### Core Features
- **Dark/Light Theme Toggle** - Seamless theme switching with smooth transitions
- **Splash Screen** - Engaging loading animation on initial page load
- **Custom Cursor** - Interactive custom cursor for enhanced user experience
- **Smooth Scroll Animations** - GSAP-powered scroll-triggered animations throughout
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Interactive Hero Section** - Animated text with hover effects and scroll-to-explore CTA

### Pages & Sections
- **Home Page** - Showcase of services, client testimonials, and portfolio highlights
- **Services Page** - Detailed service offerings with interactive cards
- **Works Page** - Dynamic portfolio gallery with detailed project pages
- **About Us Page** - Studio story and team information
- **Contact Page** - Contact form with EmailJS integration

### Key Components
- **Poster Section** - Video-based hero section with scroll-triggered animations
- **Logo Section** - Animated logo with scroll progress indicator
- **Description Cards** - Service cards with hover effects
- **Client Carousel** - Infinite scrolling client logo carousel
- **Client Reviews** - Testimonial carousel with animated text
- **Horizontal Text Scroll** - Horizontal scrolling text animation
- **Scale Up Screen** - Interactive screen scaling animation

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **React Router DOM 7.9.4** - Client-side routing
- **GSAP 3.14.2** - Animation library for scroll-triggered animations
- **Framer Motion 12.23.26** - Additional animation capabilities
- **SASS 1.93.2** - CSS preprocessor for styling
- **EmailJS** - Contact form email service
- **React Scripts 5.0.1** - Build tooling

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd karan-visual-media
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🎯 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## 📁 Project Structure

```
src/
├── Components/
│   ├── Home/              # Home page components
│   │   ├── HeroSection    # Hero section with logo and animated text
│   │   ├── PosterSection  # Video-based poster section
│   │   ├── LogoSection    # Animated logo section
│   │   ├── DescriptionCard # Service description cards
│   │   ├── ClientCarousel # Client logo carousel
│   │   ├── ClientsReview  # Client testimonials
│   │   ├── HorizontalText # Horizontal scrolling text
│   │   └── CtaSection     # Call-to-action section
│   ├── Works/             # Portfolio/work showcase
│   ├── Services/          # Services page
│   ├── AboutUs/           # About page
│   ├── Contact/           # Contact form
│   ├── Header/            # Navigation header
│   ├── Footer/            # Footer component
│   ├── CustomCursor/      # Custom cursor component
│   └── SplashScreen/      # Loading splash screen
├── App.js                 # Main app component with routing
├── App.css                # Global styles and theme variables
└── index.js               # Entry point
```

## 🎨 Theme System

The application features a comprehensive theme system with:
- **Dark Theme** (Default) - Dark background with light text
- **Light Theme** - Light background with dark text
- CSS custom properties for easy theme customization
- Smooth transitions between themes

## ✨ Key Animations

- **Scroll-Triggered Animations** - GSAP ScrollTrigger for scroll-based animations
- **Logo Animation** - Progress-based logo animation with pinning
- **Text Animations** - Character-by-character hover effects
- **Parallax Effects** - Background parallax scrolling
- **Horizontal Scroll** - Horizontal text scrolling animation
- **Fade Transitions** - Smooth page transitions

## 📱 Responsive Breakpoints

- **Large Screens**: > 1024px
- **Medium Screens**: 768px - 1024px
- **Small Screens**: < 768px
- **Mobile**: < 480px

## 🔧 Configuration

### Environment Variables
If using EmailJS for contact forms, configure your EmailJS service ID, template ID, and public key in the Contact component.

### Theme Customization
Edit `src/App.css` to customize theme colors and variables:
- `--primary-yellow`: Primary brand color
- `--bg-primary`: Background color
- `--text-primary`: Primary text color
- And more...

## 🚀 Deployment

Build the production-ready app:
```bash
npm run build
```

The `build` folder contains the optimized production build ready for deployment to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## 📝 License

This project is private and proprietary.

## 👥 Credits

Developed for Creative Knacks - A creative studio specializing in:
- Branding & Design
- Social Media Handling
- Website Development
- Motion Graphics
- Digital Marketing
- Visual Effects
- 3D Animation

---

**Note**: This is a portfolio website showcasing Creative Knacks' services and work. For inquiries, please use the contact form on the website.
