# Rushikesh Munde - Portfolio

A modern, interactive portfolio website built with React, Vite, and Tailwind CSS, featuring intelligent Q&A system and smart message templates.

## Features

- 🌓 Dark/Light mode toggle
- 🔦 Interactive torch mode
- 🤖 Smart Q&A system with pre-defined responses
- ✨ Professional message polishing templates
- 🎵 Audio effects and animations
- 📱 Fully responsive design
- 🚗 Interactive journey timeline with 3D car animation
- 🖨️ Interactive resume printer
- 📧 Smart contact form with message templates
- 🏆 Certificate gallery with real achievement images
- 📖 Interactive certificate book with page-turning animations and sound effects

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The portfolio will be available at `http://localhost:5173/` (or another port if 5173 is busy).

### 3. Build for Production
```bash
npm run build
```

## Smart Features

The portfolio includes several intelligent features:

1. **Terminal Q&A System**: Ask questions about Rushikesh and get intelligent responses
   - Skills and technologies
   - Project details
   - Education and background
   - Contact information
   - Internship opportunities

2. **Message Polishing**: Use the sparkle button in the contact form to generate professional messages
   - Internship inquiry templates
   - Collaboration proposals
   - Job opportunity messages
   - General professional outreach

3. **Smart Responses**: Get contextual answers based on keyword matching and intelligent parsing

### Testing the Q&A System

Open the browser console and run:
```javascript
testQASystem()
```

Or test individual questions:
```javascript
testAI()
```

### Example Questions to Try:
- "What skills do you have?"
- "Tell me about Veda AI"
- "Are you looking for internships?"
- "What's your background?"
- "Tell me about your projects"
- "What technologies do you use?"

## Project Structure

```
portfolio/
├── src/
│   ├── App.jsx          # Main application with Q&A system
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles and animations
├── public/
│   └── certificates/    # Certificate images
│       ├── oracle-certificate.jpg
│       ├── innoverse-hackathon-certificate.jpg
│       └── innoverse-code-relay-certificate.jpg
└── package.json         # Dependencies and scripts
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Smart Q&A System** - Pre-defined intelligent responses
- **Web Audio API** - Sound effects

## Q&A Database

The portfolio includes a comprehensive Q&A database covering:
- Technical skills and programming languages
- Project details and achievements
- Educational background
- Professional experience
- Contact information
- Career opportunities

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

This project is for portfolio purposes. Feel free to use as inspiration for your own portfolio!