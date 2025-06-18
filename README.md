# Sarah Mathew - Personal Portfolio

A modern, responsive portfolio website built with React, TypeScript, and GSAP animations.

## 🌟 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Timeline**: Animated journey timeline with paper airplane
- **Dark/Light Theme**: Toggle between themes
- **Smooth Animations**: GSAP-powered animations throughout the site
- **Contact Form**: Functional contact form with email integration
- **Project Showcase**: Detailed project portfolio with filtering

## 🚀 Live Demo

Visit the live site: [https://NightingaleX03.github.io/Portfolio](https://NightingaleX03.github.io/Portfolio)

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: CSS3, CSS Variables for theming
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: React Icons, Lucide React
- **Routing**: React Router DOM
- **Deployment**: GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/NightingaleX03/Portfolio.git
cd Portfolio/personal-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🚀 Deployment

### Quick Deploy

1. **Update the homepage URL** in `package.json`:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
}
```

2. **Deploy to GitHub Pages**:
```bash
npm run deploy
```

### Detailed Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for a comprehensive deployment guide.

## 📁 Project Structure

```
personal-portfolio/
├── public/
│   ├── index.html          # Main HTML file
│   ├── 404.html           # 404 redirect for GitHub Pages
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── data/             # Static data (projects, journey events)
│   ├── images/           # Image assets
│   ├── styles/           # Global styles
│   ├── context/          # React context (theme)
│   └── App.tsx           # Main app component
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🎨 Customization

### Adding New Projects

1. Edit `src/data/projects.json`
2. Add your project details following the existing format
3. Include images in `src/images/`

### Updating Journey Timeline

1. Edit `src/data/journeyEvents.json`
2. Add new events with dates, descriptions, and links
3. The timeline will automatically update

### Changing Colors/Themes

1. Edit CSS variables in `src/styles/global.css`
2. Update theme colors in the ThemeContext

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run deploy` - Deploys to GitHub Pages
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: [Your Email]
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [@NightingaleX03](https://github.com/NightingaleX03)

## 🙏 Acknowledgments

- GSAP for amazing animations
- React Icons for beautiful icons
- Create React App for the development setup
- GitHub Pages for hosting

---

Made with ❤️ by Sarah Mathew
