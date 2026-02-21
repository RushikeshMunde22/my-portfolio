import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Moon, Sun, Menu, X, ArrowRight, Printer, Download, Phone, Flashlight, MessageCircle, Briefcase, Award, Maximize2, XCircle, ZoomIn, Send, User, MessageSquare, Sparkles, Loader2, Camera } from 'lucide-react';
import PixelProfile from './PixelProfile.jsx';
import SkillsSection from './CockpitSimulator.jsx';
import CameraGallery from './CameraGallery.jsx';

// --- 1. DATA CONSTANTS ---
const RESUME_DATA = {
  header: {
    name: "RUSHIKESH BALAJI MUNDE",
    role: "Computer Engineering Student (2028)",
    summary: "Computer Engineering student (2028) with strong skills in Full Stack Development and AI integration. Top 5 Finalist in Inverse Hackathon.",
    contact: {
      email: "munderushikesh66@gmail.com",
      phone: "+91-7720824756",
      location: "Nanded / Pune, India",
      github: "https://github.com/RushikeshMunde22",
      linkedin: "https://www.linkedin.com/in/munderushikesh/",
      portfolio: "https://rushikeshmunde22.github.io/"
    }
  },
  education: [
    {
      degree: "B.Tech in Computer Engineering",
      inst: "Zeal College of Engineering, Pune",
      year: "Expected 2028",
    },
    {
      degree: "HSC Science (12th Grade)",
      inst: "Shri Shivaji Mahavidyalaya, Digras bk, Nanded",
      year: "Passed 2025"
    }
  ],
  skills: {
    languages: ["C++", "C", "HTML", "CSS", "Java (Basic)", "Python (Basic)"],
    concepts: ["Data Structures", "OOPS", "Web Architecture", "DOM Manipulation"],
    tools: ["VS Code", "Git", "GitHub", "Gemini API", "Prompt Engineering"]
  },
  projects: [
    {
      title: "Veda AI",
      status: "Amazon AI for Bharat",
      desc: "AI tool to convert DR prescriptions into audio explanations in regional languages. Currently working on this research-based project.",
      tags: ["Python", "Generative AI", "Speech API", "Regional Lang"],
      link: "https://github.com/RushikeshMunde22/Veda-AI-Healthcare",
      github: "https://github.com/RushikeshMunde22/Veda-AI-Healthcare"
    },
    {
      title: "Healthcare AI Platform (Codex App)",
      status: "Inverse Hackathon Top 5",
      desc: "Built a medical assistance platform integrating Google Gemini API for real-time symptom analysis. Led a team of 4 to develop the prototype in 24 hours.",
      tags: ["HTML", "CSS", "Java", "Gemini API"],
      link: "https://github.com/ShardulDesai10/Codex-Hackathon-App",
      github: "https://github.com/ShardulDesai10/Codex-Hackathon-App"
    },
    {
      title: "Interactive Exhibition Portfolio",
      status: "Live Project",
      desc: "Designed a highly interactive portfolio simulation mimicking the WhatsApp interface. Engineered a chatbot-style navigation system to showcase skills dynamically.",
      tags: ["HTML5", "CSS3", "JavaScript", "DOM"],
      link: "https://rushikeshmunde22.github.io/whatsappproject.rm/",
      github: "https://github.com/RushikeshMunde22/whatsappproject.rm"
    },
    {
      title: "Grampanchayat Digital Initiative",
      status: "Deployed",
      desc: "Developed official digital presence for Umarga Khojan village. A centralized hub for government schemes and local news.",
      tags: ["HTML", "CSS", "GovTech", "Accessibility"],
      link: "http://rushikeshmunde22.github.io/grampanchayat-umarga-khojan/",
      github: "https://github.com/RushikeshMunde22/grampanchayat-umarga-khojan"
    }
  ],
  certificates: ["Oracle Certified Foundations Associate"],
  achievements: [
    "Hackathon Winner: Secured Top 5 rank in ZCOER Inverse 2.0 Hackathon (Healthcare Track).",
    "Leadership: Team Leader for Code Relay Competition.",
    "Participant: AI for Bharat Hackathon organized by Amazon.",
    "Member: Pune Cafe Club startup club."
  ]
};

const milestones = [
  { year: "2025", title: "HSC 12th Grade Passed", subtitle: "Shri Shivaji Mahavidyalaya", type: "start-line" },
  { year: "2025", title: "Inverse Hackathon", subtitle: "Healthcare AI Project (Top 5)", type: "checkpoint" },
  { year: "2025", title: "AI for Bharat", subtitle: "Veda AI Project Participant", type: "checkpoint" },
  { year: "2025", title: "Pune Open Coffee Club", subtitle: "Active Member | Startup Enthusiast", type: "checkpoint" },
  { year: "2028", title: "Engineering Journey", subtitle: "B.Tech Computer Engineering, Zeal College", type: "checkpoint" },
  { year: "Future", title: "To Be Continued...", subtitle: "The journey never ends", type: "finish-line" }
];

const SWAY_AMPLITUDE = 120;
const SWAY_FREQUENCY = 0.002;
const SEGMENT_HEIGHT = 800;

// --- 2. AUDIO & AI UTILITIES ---
// PRE-DEFINED Q&A DATABASE
const QA_DATABASE = {
  // Skills and Technical Questions
  "skills": "I have strong skills in programming including C++, C, HTML, CSS, Java (Basic), and Python (Basic). I'm experienced with web development and AI integration.",
  "what skills do you have": "I specialize in programming with expertise in C++, C, HTML, CSS, Java (Basic), and Python (Basic). I also work with modern web technologies and frameworks.",
  "programming languages": "I'm proficient in C++, C, HTML, CSS, Java (Basic level), and Python (Basic level). I also work with modern web technologies and frameworks.",
  "technologies": "I work with VS Code, Git, GitHub, Gemini API, and focus on web architecture, DOM manipulation, and data structures using OOP concepts.",
  
  // Projects
  "veda ai": "Veda AI is my research project for Amazon AI for Bharat - an AI tool that converts doctor prescriptions into audio explanations in regional languages. It uses Python, Generative AI, and Speech APIs.",
  "projects": "I've built several projects including Veda AI (healthcare AI), Healthcare AI Platform (Hackathon winner), Interactive Portfolio, and Grampanchayat Digital Initiative for rural digitization.",
  "hackathon": "I secured Top 5 position in ZCOER Inverse 2.0 Hackathon in the Healthcare Track. I led a team of 4 to develop a medical assistance platform using Google Gemini API in just 24 hours.",
  "healthcare": "I've worked on two major healthcare projects: Veda AI for prescription audio conversion and a Healthcare AI Platform that won Top 5 in a hackathon for real-time symptom analysis.",
  
  // Education and Background
  "education": "I'm currently pursuing B.Tech in Computer Engineering from Zeal College of Engineering, Pune (Expected 2028). I completed HSC Science from Shri Shivaji Mahavidyalaya in 2025.",
  "college": "I study at Zeal College of Engineering, Pune, pursuing Computer Engineering. I'm expected to graduate in 2028.",
  "background": "I'm a Computer Engineering student with a passion for Full Stack Development and AI integration. I've participated in multiple hackathons and research projects.",
  
  // Experience and Achievements
  "achievements": "I'm a Hackathon Winner (Top 5 in ZCOER Inverse 2.0), Team Leader for Code Relay Competition, AI for Bharat participant, and active member of Pune Cafe Club startup community.",
  "experience": "I have hands-on experience in web development, AI integration, team leadership, and have worked on real-world projects including government digitization initiatives.",
  "certificates": "I'm Oracle Certified Foundations Associate with expertise in database concepts and design.",
  
  // Personal and Contact
  "contact": "You can reach me at munderushikesh66@gmail.com or +91-7720824756. I'm also active on GitHub and LinkedIn.",
  "location": "I'm based in Nanded/Pune, India and open to opportunities across the country.",
  "internship": "Yes! I'm actively seeking internship opportunities where I can apply my Full Stack and AI skills. I'm particularly interested in web development and AI integration roles.",
  "hire": "I'm available for internships and entry-level positions in Full Stack Development, AI integration, or web development. I bring strong technical skills and proven hackathon experience.",
  
  // Specific Technical Topics
  "react": "I work with React for building interactive user interfaces. This portfolio itself is built with React, Vite, and Tailwind CSS with advanced animations and AI integration.",
  "javascript": "JavaScript is one of my core skills. I use it for both frontend development and working with APIs. I'm comfortable with modern ES6+ features and async programming.",
  "ai": "I have experience integrating AI APIs, particularly Google Gemini API. I've built AI-powered applications for healthcare and developed smart chatbot interfaces.",
  "web development": "I specialize in modern web development using HTML5, CSS3, JavaScript, and React. I focus on responsive design, user experience, and performance optimization.",
  
  // Default responses
  "hello": "Hello! I'm Rushikesh, a Computer Engineering student passionate about Full Stack Development and AI. Feel free to ask me about my skills, projects, or experience!",
  "hi": "Hi there! I'm Rushikesh Munde. I love building web applications and working with AI technologies. What would you like to know about me?",
  "help": "You can ask me about:\n• My skills and technologies\n• Projects like Veda AI or Healthcare platforms\n• Education and achievements\n• Internship opportunities\n• Contact information\n\nTry asking: 'What skills do you have?' or 'Tell me about your projects'",
  "default": "That's an interesting question! I'm Rushikesh, a Full Stack Developer and AI enthusiast. You can ask me about my skills, projects, education, or internship opportunities. Type 'help' to see what I can tell you about!"
};

// SMART Q&A SYSTEM
const getSmartResponse = (userInput) => {
  const input = userInput.toLowerCase().trim();
  
  // Direct matches
  if (QA_DATABASE[input]) {
    return QA_DATABASE[input];
  }
  
  // Keyword matching
  const keywords = {
    skills: ['skill', 'technology', 'tech', 'programming', 'code', 'development'],
    projects: ['project', 'work', 'built', 'created', 'portfolio'],
    'veda ai': ['veda', 'ai project', 'healthcare ai', 'prescription'],
    hackathon: ['hackathon', 'competition', 'contest', 'winner'],
    education: ['education', 'study', 'college', 'degree', 'student'],
    achievements: ['achievement', 'award', 'certificate', 'accomplishment'],
    contact: ['contact', 'email', 'phone', 'reach', 'connect'],
    internship: ['internship', 'job', 'opportunity', 'hire', 'work', 'position'],
    react: ['react', 'frontend', 'ui', 'interface'],
    javascript: ['javascript', 'js', 'programming'],
    ai: ['artificial intelligence', 'machine learning', 'gemini', 'api'],
    hello: ['hello', 'hi', 'hey', 'greetings']
  };
  
  // Find best match based on keywords
  for (const [topic, keywordList] of Object.entries(keywords)) {
    if (keywordList.some(keyword => input.includes(keyword))) {
      return QA_DATABASE[topic] || QA_DATABASE.default;
    }
  }
  
  // Special question patterns
  if (input.includes('who are you') || input.includes('about you')) {
    return "I'm Rushikesh Munde, a Computer Engineering student (2028) with strong skills in Full Stack Development and AI integration. I'm a Top 5 Finalist in Inverse Hackathon and actively seeking internship opportunities.";
  }
  
  if (input.includes('what do you do') || input.includes('your work')) {
    return "I'm a Full Stack Developer specializing in web applications with AI integration. I build interactive websites, work on healthcare AI projects, and participate in hackathons. Currently working on Veda AI for Amazon AI for Bharat.";
  }
  
  if (input.includes('experience') || input.includes('background')) {
    return QA_DATABASE.experience;
  }
  
  return QA_DATABASE.default;
};

// ENHANCED GEMINI API REPLACEMENT
const callGeminiAPI = async (userPrompt, systemContext) => {
  // Simulate API delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  console.log("Processing question:", userPrompt);
  
  // Get smart response based on user input
  const response = getSmartResponse(userPrompt);
  
  console.log("Generated response:", response);
  return response;
};

// Test function to verify Q&A system is working (you can call this in browser console)
window.testQASystem = async () => {
  console.log("Testing Q&A System...");
  
  const testQuestions = [
    "What skills do you have?",
    "Tell me about your projects",
    "What is Veda AI?",
    "Are you looking for internships?",
    "What's your background?"
  ];
  
  for (const question of testQuestions) {
    console.log(`\nQ: ${question}`);
    const answer = await callGeminiAPI(question, "");
    console.log(`A: ${answer}`);
  }
  
  return "Q&A System test completed! Check console for results.";
};

// Quick test function
window.testAI = async () => {
  const result = await callGeminiAPI("Hello, what skills do you have?", "");
  console.log("AI Test Result:", result);
  return result;
};

// Global Audio Context Singleton for Beeps
let globalAudioCtx = null;

const initAudio = () => {
  if (!globalAudioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    globalAudioCtx = new AudioContext();
  }
  if (globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
};

class CheckpointAudioManager {
  constructor() {
    this.ctx = null;
  }

  playCheckpointSound() {
    this.ctx = initAudio();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // High pitched "Bee" / Beep sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }
}

const audioManager = new CheckpointAudioManager();

const usePrinterSound = () => {
  const ctxRef = useRef(null);
  const masterGainRef = useRef(null);

  const playSound = () => {
    const ctx = initAudio();
    if (!ctx) return;

    ctxRef.current = ctx;
    masterGainRef.current = ctx.createGain();
    masterGainRef.current.gain.value = 1.0;
    masterGainRef.current.connect(ctx.destination);

    const duration = 2.5;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;

    const gain = ctx.createGain();
    const now = ctx.currentTime;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.4);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.6);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.8);
    gain.gain.linearRampToValueAtTime(0.3, now + 1.0);
    gain.gain.linearRampToValueAtTime(0, now + 2.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);

    noise.start();
  };

  return playSound;
};

const useWindSound = (active) => {
  const gainRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    if (active) {
      const ctx = initAudio();
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400;

      const gain = ctx.createGain();
      gain.gain.value = 0;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      sourceRef.current = noise;
      gainRef.current = gain;

      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2);
    } else {
      if (gainRef.current && globalAudioCtx) {
        try {
          gainRef.current.gain.linearRampToValueAtTime(0, globalAudioCtx.currentTime + 1);
          setTimeout(() => {
            if (sourceRef.current) {
              sourceRef.current.stop();
              sourceRef.current = null;
            }
          }, 1000);
        } catch(e) { }
      }
    }

    return () => {
      if (sourceRef.current) try { sourceRef.current.stop(); } catch(e) {}
    };
  }, [active]);
};

// --- 3. MATH HELPERS ---
const getRoadX = (y) => Math.sin(y * SWAY_FREQUENCY) * SWAY_AMPLITUDE;

const getRoadRotation = (y) => {
  const delta = 10;
  const x1 = getRoadX(y);
  const x2 = getRoadX(y + delta);
  const angle = Math.atan2(x2 - x1, delta);
  return -angle * (180 / Math.PI);
};
// --- 4. COMPONENTS ---
// Profile Photo Component
const ProfilePhoto = ({ darkMode, mousePos }) => {
  const x = mousePos.x * 0.5;
  const y = mousePos.y * 0.5;

  return (
    <div 
      className="relative w-48 h-64 md:w-64 md:h-80 z-20 group ml-auto mr-auto lg:mr-0"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <div className={`w-full h-full rounded-2xl border-4 overflow-hidden shadow-2xl transition-all duration-150 relative
        ${darkMode ? 'border-indigo-500 shadow-indigo-500/50 bg-slate-900' : 'border-orange-400 shadow-orange-400/50 bg-amber-50'}`}
      >
        {/* Day Photo */}
        <img 
          src="https://via.placeholder.com/300x400/CCCCCC/000000?text=Photo+With+Glasses"
          alt="Rushikesh Day" 
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-150 ${
            darkMode ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Night Photo */}
        <img 
          src="https://via.placeholder.com/300x400/111111/FFFFFF?text=Photo+No+Glasses"
          alt="Rushikesh Night" 
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-150 ${
            darkMode ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      
      <div className={`absolute -inset-4 border-2 border-dashed rounded-2xl opacity-30 pointer-events-none transition-colors duration-150
        ${darkMode ? 'border-indigo-400' : 'border-orange-400'}`}
      ></div>
    </div>
  );
};

const SmokeParticles = ({ isActive }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const id = Math.random();
        setParticles(prev => [...prev.slice(-15), { id, x: (Math.random() - 0.5) * 20 }]);
        setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 1000);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="absolute bottom-[90%] left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none z-10">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bottom-0 left-1/2 -ml-2 w-4 h-4 rounded-full bg-blue-500/20 blur-sm animate-exhaust"
          style={{ transform: `translateX(${p.x}px)` }}
        />
      ))}
    </div>
  );
};

const Realistic3DCar = ({ isActive }) => (
  <div className={`relative w-[60px] md:w-[90px] h-[100px] md:h-[160px] filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)] transition-transform duration-100 ${
    isActive ? 'animate-rumble' : ''
  }`}>
    <svg width="100%" height="100%" viewBox="0 0 90 160" className="overflow-visible">
      <g transform="rotate(180, 45, 80)">
        <defs>
          <linearGradient id="paintBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="20%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="80%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <pattern id="carbon" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="#171717"/>
            <rect width="2" height="2" fill="#262626"/>
          </pattern>
        </defs>

        {isActive && (
          <ellipse cx="45" cy="70" rx="40" ry="70" fill="rgba(239, 68, 68, 0.4)" filter="blur(15px)" className="animate-pulse" />
        )}

        {isActive && (
          <g className="mix-blend-screen opacity-90">
            <path d="M25 10 L-10 -200 L40 -200 L35 10 Z" fill="url(#lightBeam)" />
            <path d="M65 10 L50 -200 L100 -200 L55 10 Z" fill="url(#lightBeam)" />
            <defs>
              <linearGradient id="lightBeam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                <stop offset="100%" stopColor="#fef08a" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </g>
        )}

        <g fill="#0f172a">
          <rect x="0" y="25" width="16" height="30" rx="4" />
          <rect x="74" y="25" width="16" height="30" rx="4" />
          <rect x="0" y="105" width="16" height="30" rx="4" />
          <rect x="74" y="105" width="16" height="30" rx="4" />
        </g>

        <path d="M45 5 Q 70 5, 80 25 L 82 120 Q 82 140, 45 140 Q 8 140, 8 120 L 10 25 Q 20 5, 45 5 Z" fill="url(#paintBody)" stroke="#450a0a" strokeWidth="1" />
        <path d="M35 25 L55 25 L55 35 L35 35 Z" fill="url(#carbon)" />
        <path d="M22 45 Q 45 40, 68 45 L 64 75 Q 45 70, 26 75 Z" fill="url(#glass)" />
        <path d="M24 70 L66 70 L66 95 L24 95 Z" fill="#7f1d1d" />
        <path d="M26 95 L64 95 L68 110 L22 110 Z" fill="#0f172a" />

        <g transform="translate(0, -2)">
          <rect x="25" y="125" width="5" height="10" fill="#333" />
          <rect x="60" y="125" width="5" height="10" fill="#333" />
          <path d="M12 130 L78 130 L78 140 L12 140 Z" fill="url(#carbon)" stroke="#333" strokeWidth="1"/>
        </g>
      </g>
    </svg>
  </div>
);
const MapMilestone = ({ milestone, isActive, index }) => {
  const yPos = (index + 0.8) * SEGMENT_HEIGHT;
  const xOffset = getRoadX(yPos);
  const isRightSide = xOffset < 0;

  return (
    <div className="absolute w-full flex justify-center pointer-events-none" style={{ top: yPos }}>
      <div className={`absolute w-6 h-6 rounded-full border-4 border-slate-950 z-20 shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-500
        ${isActive ? 'bg-yellow-400 scale-150' : 'bg-blue-500 scale-100'}`}
        style={{ left: `calc(50% + ${xOffset}px - 12px)` }}
      />
      
      <div className={`absolute flex flex-col p-4 md:p-6 rounded-xl border backdrop-blur-md w-64 md:w-96 pointer-events-auto transition-all duration-700
        ${isRightSide ? 'left-[calc(50%+60px)] md:left-[calc(50%+100px)] text-left origin-left' : 'right-[calc(50%+60px)] md:right-[calc(50%+100px)] text-right origin-right'}
        ${isActive ? 'bg-slate-900/95 border-yellow-500 shadow-[0_0_30px_rgba(250,204,21,0.2)] opacity-100 translate-y-0' : 'bg-slate-900/60 border-slate-700 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 translate-y-4'}`}
        style={{ top: '-4rem' }}
      >
        <div className={`absolute top-1/2 w-10 md:w-20 h-[1px] bg-blue-500/50
          ${isRightSide ? '-left-10 md:-left-20' : '-right-10 md:-right-20'}`}
        />
        
        <div className={`flex flex-col gap-1 ${!isRightSide && 'items-end'}`}>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">{milestone.year}</span>
          <h3 className={`text-lg md:text-xl font-black uppercase italic leading-none ${
            isActive ? 'text-white' : 'text-slate-300'
          }`}>{milestone.title}</h3>
          <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium leading-relaxed">{milestone.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const RoadSvg = ({ totalHeight }) => {
  const pathData = useMemo(() => {
    let d = `M ${getRoadX(0)} 0 `;
    for (let y = 0; y <= totalHeight; y += 10) {
      d += `L ${getRoadX(y)} ${y} `;
    }
    return d;
  }, [totalHeight]);

  return (
    <svg className="absolute top-0 left-1/2 -translate-x-1/2 overflow-visible" width={600} height={totalHeight}>
      <defs>
        <linearGradient id="pathGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      {/* The Track Base (Darker background line) */}
      <path d={pathData} stroke="#0f172a" strokeWidth="100" fill="none" strokeLinecap="round" opacity="0.8" />

      {/* The Racing Line (Center Glow) */}
      <path d={pathData} stroke="url(#pathGradient)" strokeWidth="6" fill="none" strokeLinecap="round" 
        style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))' }} />

      {/* Start Line Graphic */}
      <g transform={`translate(${getRoadX(100)}, 100)`}>
        <line x1="-80" y1="0" x2="80" y2="0" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 4" />
        <text y="25" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold" letterSpacing="4">START</text>
      </g>

      {/* Finish Line Graphic */}
      <g transform={`translate(${getRoadX(totalHeight - 100)}, ${totalHeight - 100})`}>
        <line x1="-80" y1="0" x2="80" y2="0" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
        <text y="-15" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold" letterSpacing="4">CONTINUE</text>
      </g>
    </svg>
  );
};

const CoffeeSteam = () => (
  <div className="absolute -top-8 left-2 w-full h-full pointer-events-none">
    <div className="steam" style={{ left: '0px', animationDelay: '0s' }} />
    <div className="steam" style={{ left: '8px', animationDelay: '0.5s' }} />
    <div className="steam" style={{ left: '4px', animationDelay: '1s' }} />
  </div>
);

const SunRays = () => (
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-20">
    <div className="absolute top-10 -left-10 w-[500px] h-[300px] bg-gradient-to-r from-white via-white/10 to-transparent transform rotate-[35deg] blur-2xl origin-top-left opacity-10 animate-pulse"></div>
    <div className="absolute top-20 left-0 w-[400px] h-[200px] bg-gradient-to-r from-yellow-100 via-white/5 to-transparent transform rotate-[40deg] blur-xl origin-top-left opacity-5 animate-pulse delay-75"></div>
  </div>
);

const WindParticles = () => (
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-30 opacity-60">
    <div className="absolute top-20 left-0 w-32 h-0.5 bg-white/60 rounded-full blur-[1px] animate-wind-1"></div>
    <div className="absolute top-32 -left-10 w-48 h-0.5 bg-white/40 rounded-full blur-[1px] animate-wind-2"></div>
    <div className="absolute top-40 left-10 w-24 h-0.5 bg-white/50 rounded-full blur-[1px] animate-wind-3"></div>
  </div>
);
const MonitorScreen = ({ view, isLightOn, onViewChange }) => {
  const [history, setHistory] = useState([
    { type: 'output', text: "Welcome to RushiOS v1.0" },
    { type: 'output', text: "Type a question about Rushikesh..." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (!cmd) return;

      const newHistory = [...history, { type: 'input', text: cmd }];
      setHistory(newHistory);
      setInput('');
      setIsLoading(true);

      let response = "";
      if (cmd.toLowerCase() === 'help') {
        response = "Ask anything! Example: 'What skills do you have?', 'Tell me about Veda AI'.";
      } else if (cmd.toLowerCase() === 'clear') {
        setHistory([]);
        setIsLoading(false);
        return;
      } else {
        // Call Gemini API
        const systemPrompt = `You are a CLI assistant for Rushikesh Munde. Resume Data: ${JSON.stringify(RESUME_DATA)}. Answer questions briefly (max 2 sentences) and technically.`;
        response = await callGeminiAPI(cmd, systemPrompt);
      }

      setHistory(prev => [...prev, { type: 'output', text: response }]);
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full h-full rounded overflow-hidden cursor-text transition-colors duration-100 relative ${
      isLightOn ? 'bg-gray-900' : 'bg-black shadow-[0_0_15px_rgba(34,197,94,0.3)]'
    }`}
      onClick={() => { if(view !== 'terminal') onViewChange('certificates') }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white to-transparent opacity-5 pointer-events-none rounded-bl-full z-10"></div>
      
      {view === 'terminal' ? (
        <div className="p-4 font-mono text-green-500 text-[10px] md:text-xs h-full flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar" ref={scrollRef}>
            {history.map((line, i) => (
              <div key={i} className={`mb-1 ${line.type === 'input' ? 'text-white' : 'opacity-80'}`}>
                {line.type === 'input' ? '> ' : ''}{line.text}
              </div>
            ))}
            {isLoading && <div className="animate-pulse">_ processing...</div>}
          </div>
          
          <div className="mt-2 flex items-center border-t border-gray-700 pt-2">
            <span className="mr-2 text-blue-400">$</span>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none text-white w-full font-mono text-xs"
              autoFocus
              placeholder="Ask AI..."
            />
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onViewChange('certificates'); }}
            className="absolute top-2 right-2 text-[8px] bg-gray-800 hover:bg-gray-700 text-gray-400 px-2 py-1 rounded"
          >
            VIEW CERTS
          </button>
        </div>
      ) : (
        <div className="p-4 h-full flex flex-col bg-gray-900 animate-in slide-in-from-bottom-10 fade-in">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-700">
            <h3 className="text-white text-xs font-bold">Awards & Certs</h3>
            <button 
              onClick={(e) => { e.stopPropagation(); onViewChange('terminal'); }}
              className="text-[9px] bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded transition-colors"
            >
              X
            </button>
          </div>
          
          <div className="overflow-y-auto custom-scrollbar flex-1 space-y-2">
            <div className="bg-gray-800 p-2 rounded border-l-2 border-green-500">
              <div className="text-white text-[10px] font-bold">Oracle Certified Foundations</div>
              <div className="text-gray-400 text-[8px]">Associate</div>
            </div>
            
            {RESUME_DATA.achievements.map((ach, i) => (
              <div key={i} className="bg-gray-800 p-2 rounded border-l-2 border-indigo-500">
                <div className="text-white text-[10px] leading-tight">{ach}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const NatureWindow = ({ onClose, darkMode }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in zoom-in duration-200">
      <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border-8 border-slate-800 shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors"
        >
          <XCircle size={32} />
        </button>
        
        <div className={`absolute inset-0 transition-colors duration-150 ${
          darkMode ? 'bg-gradient-to-b from-[#0f172a] via-[#312e81] to-[#4c1d95]' : 'bg-gradient-to-b from-sky-400 via-sky-300 to-orange-200'
        }`}>
          <div className={`absolute top-10 right-20 transition-all duration-150 ${
            darkMode ? 'w-24 h-24 bg-slate-100 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.5)]' : 'w-32 h-32 bg-yellow-400 rounded-full shadow-[0_0_80px_rgba(250,204,21,0.6)]'
          }`}>
            {darkMode && <div className="absolute top-2 left-4 w-20 h-20 bg-slate-200 rounded-full opacity-20"></div>}
          </div>

          {darkMode ? (
            <>
              <div className="absolute top-10 left-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-24 left-60 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-75"></div>
              <div className="absolute top-16 right-60 w-1 h-1 bg-white rounded-full animate-pulse delay-150"></div>
            </>
          ) : (
            <>
              <div className="absolute top-20 left-20 w-32 h-10 bg-white/40 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-40 right-40 w-48 h-12 bg-white/30 rounded-full blur-xl animate-pulse delay-1000"></div>
            </>
          )}

          <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-end">
            <div className={`w-1/3 h-[80%] bg-slate-700/80 clip-mountain-1 transform translate-y-10 ${darkMode ? 'brightness-50' : ''}`}></div>
            <div className={`w-1/2 h-full bg-slate-600/90 clip-mountain-2 -ml-20 z-10 ${darkMode ? 'brightness-50' : ''}`}></div>
            <div className={`w-1/2 h-[70%] bg-slate-500 clip-mountain-3 -ml-20 z-0 ${darkMode ? 'brightness-50' : ''}`}></div>
          </div>

          <div className="absolute top-1/3 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-10 left-1/4 animate-fly-1 opacity-80">
              <div className="w-4 h-2 border-b-2 border-r-2 border-slate-800 dark:border-slate-300 transform rotate-45"></div>
            </div>
            <div className="absolute top-20 left-1/3 animate-fly-2 opacity-60">
              <div className="w-3 h-1.5 border-b-2 border-r-2 border-slate-800 dark:border-slate-300 transform rotate-45"></div>
            </div>
          </div>

          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent opacity-60 z-20"></div>
        </div>
      </div>
    </div>
  );
};
const CertificateGallery = ({ onClose }) => {
  const certificates = [
    {
      title: "Oracle Certified Foundations Associate",
      image: "/certificates/oracle-certificate.jpeg",
      desc: "Database concepts & design certification.",
      fallback: "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Oracle+Certified+Foundations+Associate"
    },
    {
      title: "INNOVERSE 2.0 Hackathon Winner",
      image: "/certificates/innoverse-hackathon-certificate.jpeg",
      desc: "Top 5 Achievement in Healthcare AI Track.",
      fallback: "https://via.placeholder.com/400x300/EC4899/FFFFFF?text=INNOVERSE+2.0+Hackathon+Winner"
    },
    {
      title: "INNOVERSE 2.0 Code Relay Winner", 
      image: "/certificates/innoverse-code-relay-certificate.jpeg",
      desc: "Team Leadership and Coding Excellence Award.",
      fallback: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=INNOVERSE+2.0+Code+Relay+Winner"
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-800 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-100 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 font-mono text-sm text-slate-500">/home/user/certificates</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-500 hover:text-red-500 transition-colors"
          >
            <XCircle size={24} />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div key={index} className="group relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="aspect-video bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = cert.fallback
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 dark:text-white mb-1">{cert.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WorkstationScene = ({ darkMode }) => {
  const [isLightOn, setIsLightOn] = useState(true);
  const [isBlindOpen, setIsBlindOpen] = useState(true);
  const [natureView, setNatureView] = useState('day');
  const [screenView, setScreenView] = useState('terminal');
  const [showCertificates, setShowCertificates] = useState(false);
  const [showNature, setShowNature] = useState(false);

  useWindSound(isBlindOpen);

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsBlindOpen(false);
          setIsLightOn(false);
        } else {
          if (rect.top > window.innerHeight * 0.9) {
            setIsBlindOpen(true);
            setIsLightOn(true);
          }
        }
      } else {
        if (window.scrollY > window.innerHeight * 0.6) {
          setIsBlindOpen(false);
          setIsLightOn(false);
        } else {
          if (window.scrollY < 100) {
            setIsBlindOpen(true);
            setIsLightOn(true);
          }
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  const toggleBlind = () => setIsBlindOpen(!isBlindOpen);
  const toggleNature = () => {
    if (isBlindOpen) {
      setNatureView(prev => prev === 'day' ? 'sunset' : 'day');
    }
  };

  const wallColor = isBlindOpen ? 'bg-[#e2e8f0]' : 'bg-[#1e293b]';
  const overlayOpacity = isBlindOpen ? 'opacity-0' : 'opacity-80';
  const showSpotlight = isLightOn;

  return (
    <div className={`relative w-full h-[500px] rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-150 ${wallColor}`}>
      <div className="absolute bottom-0 w-full h-1/4 bg-[#5d4037] border-t-8 border-[#3e2723] transition-colors duration-150"></div>
      
      <div className={`absolute top-0 right-10 w-full h-full pointer-events-none z-0 transition-opacity duration-150 ${showSpotlight ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'radial-gradient(circle at 70% 30%, rgba(252, 211, 77, 0.25) 0%, rgba(255, 235, 120, 0.15) 30%, rgba(255, 245, 180, 0.08) 50%, transparent 70%)' }}
      />

      {/* Window */}
      <div className="absolute left-4 top-12 w-32 md:w-48 h-40 md:h-56 z-10 hidden sm:block">
        {isBlindOpen && <SunRays />}
        {isBlindOpen && <WindParticles />}
        
        <div className="relative w-full h-full bg-white border-4 md:border-8 border-white shadow-xl rounded-xl overflow-hidden group m-2">
          <div className={`w-full h-full cursor-pointer transition-all duration-150 absolute inset-2 rounded-lg
            ${natureView === 'day' ? 'bg-gradient-to-b from-sky-300 to-sky-100' : 'bg-gradient-to-b from-orange-400 via-red-300 to-purple-800'}`}
          >
            <div className={`absolute top-4 right-4 w-6 h-6 md:w-10 md:h-10 bg-yellow-300 rounded-full blur-sm opacity-90 transition-all duration-150 ${
              natureView === 'day' ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} />
            
            <div className="absolute top-8 left-2 w-8 h-3 md:w-12 md:h-4 bg-white opacity-60 rounded-full blur-[2px]" />
            <div className="absolute top-16 right-4 w-10 h-4 md:w-16 md:h-6 bg-white opacity-40 rounded-full blur-[2px]" />
            
            <div className={`absolute bottom-0 w-full h-8 md:h-12 transition-colors duration-150 ${
              natureView === 'day' ? 'bg-green-600' : 'bg-purple-900'
            }`} 
              style={{clipPath: 'polygon(0% 100%, 10% 80%, 20% 100%, 30% 60%, 40% 100%, 50% 70%, 60% 100%, 70% 50%, 80% 100%, 90% 80%, 100% 100%)'}}
            ></div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowNature(true);
              }}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity"
            >
              <ZoomIn size={24} />
              <span className="text-[10px] font-bold mt-1">View</span>
            </button>
          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-white to-transparent opacity-20 pointer-events-none"></div>

          <div className="absolute top-0 left-0 w-full bg-[#d6bcfa] border-b-4 border-[#9f7aea] z-20 shadow-md flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out"
            style={{ height: isBlindOpen ? '15%' : '100%' }}
          >
            <div className="absolute inset-0 w-full h-full opacity-10 bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[length:4px_4px]"></div>
            <div className={`z-10 text-black font-sans font-bold text-[8px] md:text-xs opacity-80 tracking-wide mt-8 transition-opacity duration-300 ${
              isBlindOpen ? 'opacity-0' : 'opacity-80'
            }`}>Rushikesh</div>
          </div>
        </div>

        <div className="absolute -right-4 top-0 h-full w-8 flex flex-col items-center z-50 group cursor-pointer" onClick={toggleBlind}>
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-0.5 bg-gray-400 transition-all duration-700" style={{ height: isBlindOpen ? '85%' : '20%' }}></div>
            <div className="w-1.5 h-3 md:w-2 md:h-4 rounded-full bg-white border border-gray-300 shadow-sm transform transition-transform group-hover:scale-110 group-active:translate-y-2"></div>
          </div>
        </div>

        <div className="absolute -bottom-2 -left-1 w-[105%] h-2 bg-gray-200 rounded shadow-md z-30"></div>
      </div>

      {/* Lamp */}
      <div className="absolute top-8 right-8 md:right-32 flex flex-col items-center z-10">
        <div className="relative">
          {/* Enhanced light glow with multiple layers */}
          <div className={`absolute -top-12 -left-12 w-52 h-52 bg-yellow-200 rounded-full blur-[120px] pointer-events-none z-0 transition-all duration-500 ${
            isLightOn ? 'opacity-100 scale-125' : 'opacity-0 scale-75'
          }`}/>
          <div className={`absolute -top-8 -left-8 w-36 h-36 bg-yellow-300 rounded-full blur-[80px] pointer-events-none z-0 transition-all duration-500 ${
            isLightOn ? 'opacity-90 scale-110' : 'opacity-0 scale-75'
          }`}/>
          <div className={`absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full blur-[40px] pointer-events-none z-0 transition-all duration-500 ${
            isLightOn ? 'opacity-80 scale-105' : 'opacity-0 scale-75'
          }`}/>
          
          <svg width="80" height="60" viewBox="0 0 100 80" className="drop-shadow-lg relative z-10">
            {isLightOn && (
              <>
                <circle cx="50" cy="70" r="35" className="fill-yellow-50 blur-lg opacity-90" />
                <circle cx="50" cy="70" r="25" className="fill-yellow-100 blur-md opacity-95" />
                <circle cx="50" cy="70" r="15" className="fill-yellow-200 blur-sm opacity-100" />
              </>
            )}
            <line x1="50" y1="0" x2="50" y2="20" stroke="#333" strokeWidth="2" />
            <path d="M20 80 L35 20 L65 20 L80 80 Z" fill={isLightOn ? "#fcd34d" : "#475569"} stroke="#334155" strokeWidth="2" />
          </svg>

          {/* Enhanced light cone with stronger intensity */}
          <div className={`absolute top-[60px] left-1/2 -translate-x-1/2 w-56 h-56 pointer-events-none transition-opacity duration-500 ${
            isLightOn ? 'opacity-100' : 'opacity-0'
          }`}
            style={{ 
              background: 'conic-gradient(from 180deg at 50% 0%, rgba(255,255,150,0.6) -25deg, rgba(255,255,200,0.4) -15deg, rgba(255,255,220,0.2) 0deg, transparent 25deg)', 
              filter: 'blur(15px)' 
            }}
          />
          
          {/* Additional bright center cone */}
          <div className={`absolute top-[65px] left-1/2 -translate-x-1/2 w-32 h-32 pointer-events-none transition-opacity duration-500 ${
            isLightOn ? 'opacity-100' : 'opacity-0'
          }`}
            style={{ 
              background: 'conic-gradient(from 180deg at 50% 0%, rgba(255,255,100,0.8) -20deg, rgba(255,255,150,0.6) -10deg, transparent 20deg)', 
              filter: 'blur(8px)' 
            }}
          />
        </div>

        <div className="mt-8 bg-white p-1.5 rounded shadow-md border border-gray-200 cursor-pointer w-8 h-12" onClick={() => setIsLightOn(!isLightOn)}>
          <div className={`w-full h-full rounded bg-gray-100 border border-gray-300 relative overflow-hidden transition-colors ${
            !isLightOn ? 'bg-gray-300' : ''
          }`}>
            <div className={`w-full h-1/2 border-b border-gray-300 shadow-inner transition-transform duration-200 ${
              isLightOn ? 'bg-white translate-y-0' : 'bg-gray-100 translate-y-full'
            }`}></div>
          </div>
        </div>
      </div>

      {/* Monitor */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 h-40 sm:w-80 sm:h-48 z-10 group">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-16 bg-gray-800 shadow-md"></div>
        
        <div className="w-full h-full bg-[#333] p-2 rounded-lg shadow-2xl relative border border-gray-700 transition-transform duration-300 hover:scale-[1.02]">
          <MonitorScreen 
            view={screenView} 
            isLightOn={isLightOn} 
            onViewChange={(view) => {
              if (view === 'certificates') setShowCertificates(true);
              setScreenView(view);
            }} 
          />
          
          <div className={`absolute bottom-2 right-4 w-1 h-1 rounded-full transition-colors ${
            isLightOn ? 'bg-green-500 shadow-[0_0_5px_lime]' : 'bg-red-500'
          } `}></div>
        </div>
      </div>

      {/* Desk */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-[350px] flex items-end justify-center px-4 z-20 pointer-events-none">
        <div className="absolute bottom-0 left-10 md:left-24 w-4 h-24 bg-[#3e2723]"></div>
        <div className="absolute bottom-0 right-10 md:right-24 w-4 h-24 bg-[#3e2723]"></div>
        
        <div className="relative w-full h-8 bg-[#8d6e63] rounded-sm shadow-xl z-20 flex items-end justify-center mb-24">
          <div className="absolute top-0 w-full h-2 bg-[#5d4037] opacity-50"></div>
        </div>

        <div className="absolute bottom-32 w-full max-w-3xl z-30 flex items-end justify-center px-8 md:px-16 pointer-events-auto">
          <div className="flex items-end justify-between w-full">
            <div className="w-16"></div>
            
            <div className="relative bottom-0 bg-[#e2e8f0] w-48 md:w-64 h-3 rounded shadow-md transform skew-x-12 flex justify-center items-center gap-0.5 overflow-hidden px-1 mx-2">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-full h-1 bg-gray-400 rounded-sm"></div>
              ))}
            </div>
            
            <div className="flex items-end gap-4">
              <div className="w-8 h-10 bg-amber-700 rounded-b-xl relative shadow-md flex items-center justify-center border-2 border-white group">
                <div className="absolute -right-2 top-2 w-2 h-4 border-2 border-white rounded-r-lg"></div>
                <div className="w-5 h-2 bg-[#4e342e] rounded-full mt-2 opacity-80"></div>
                <CoffeeSteam />
              </div>
              
              <div className="w-10 h-14 relative hidden sm:block">
                <div className="absolute bottom-0 w-10 h-10 bg-orange-300 rounded-b-lg border-t-4 border-orange-200 shadow-sm"></div>
                <div className="absolute bottom-10 left-1 w-3 h-8 bg-green-600 rounded-full origin-bottom animate-sway-1"></div>
                <div className="absolute bottom-10 left-4 w-4 h-10 bg-green-500 rounded-full origin-bottom animate-sway-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute inset-0 bg-[#0f172a] mix-blend-multiply pointer-events-none transition-opacity duration-150 z-40 ${overlayOpacity}`}></div>

      {showCertificates && (
        <CertificateGallery 
          onClose={() => {
            setShowCertificates(false);
            setScreenView('terminal');
          }} 
        />
      )}

      {showNature && (
        <NatureWindow 
          onClose={() => setShowNature(false)} 
          darkMode={darkMode} 
        />
      )}
    </div>
  );
};
const ProjectCard = ({ title, desc, tags, link, github, type }) => (
  <div className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full z-10">
    <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    
    <div className="p-8 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] md:text-xs font-bold tracking-wider text-indigo-500 uppercase bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
          {type}
        </span>
        
        <div className="flex gap-3">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" 
              className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors" 
              title="View Code"
            >
              <Github size={20} />
            </a>
          )}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" 
              className="text-slate-400 hover:text-indigo-500 transition-colors" 
              title="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
      
      <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">
        {title}
      </h3>
      
      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
        {desc}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const NavLink = ({ href, children, mobile = false, onClick }) => (
  <a href={href} onClick={onClick}
    className={`font-medium transition-colors duration-200 cursor-pointer
      ${mobile ? 'block w-full py-4 text-2xl hover:text-indigo-500 border-b border-gray-100 dark:border-gray-800' : 'hover:text-indigo-500 relative group'}`}
  >
    {children}
    {!mobile && (
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
    )}
  </a>
);

const TorchEffect = ({ active }) => {
  const torchRef = useRef(null);
  const cursorRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    if (!active) {
      document.body.style.cursor = 'auto';
      return;
    }

    document.body.style.cursor = 'none';
    
    const updatePosition = (e) => {
      // Store cursor position
      cursorRef.current = { x: e.clientX, y: e.clientY };
      
      // Instant update using transform for maximum performance
      if (torchRef.current) {
        torchRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        torchRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.style.cursor = 'auto';
    };
  }, [active]);

  if (!active) return null;

  return (
    <div 
      ref={torchRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{
        '--mouse-x': `${cursorRef.current.x}px`,
        '--mouse-y': `${cursorRef.current.y}px`,
        background: 'radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), transparent 0%, rgba(0,0,0,0.95) 100%)',
        mixBlendMode: 'multiply'
      }}
    />
  );
};

const ResumePrinter = () => {
  const [printing, setPrinting] = useState(false);
  const [printed, setPrinted] = useState(false);
  const playSound = usePrinterSound();

  const handlePrint = () => {
    if (printing || printed) return;
    
    playSound();
    setPrinting(true);
    
    setTimeout(() => {
      setPrinting(false);
      setPrinted(true);
    }, 2500);
  };

  const handleDownload = () => {
    const textContent = `RUSHIKESH BALAJI MUNDE
${RESUME_DATA.header.role}
--------------------------------------------------
Contact: ${RESUME_DATA.header.contact.phone} | ${RESUME_DATA.header.contact.email}
GitHub: ${RESUME_DATA.header.contact.github}
--------------------------------------------------
SUMMARY: ${RESUME_DATA.header.summary}

SKILLS: ${RESUME_DATA.skills.languages.join(", ")} | ${RESUME_DATA.skills.concepts.join(", ")}

KEY PROJECTS:
${RESUME_DATA.projects.map(p => `- ${p.title} (${p.status}): ${p.desc}`).join('\n')}

EDUCATION:
${RESUME_DATA.education.map(e => `- ${e.degree} (${e.year})`).join('\n')}`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Rushikesh_Munde_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 p-4 font-sans text-slate-900 relative z-10">
      <div className="bg-slate-800 rounded-t-xl p-4 border-b-8 border-black shadow-2xl relative z-20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center animate-pulse">
            <Printer className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-bold font-mono text-sm md:text-base">RESUME_PRINTER_5000</h3>
            <p className="text-xs text-indigo-300 font-mono">STATUS: {printed ? 'COMPLETE' : 'READY'}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            disabled={printing || printed}
            className={`px-4 md:px-6 py-2 font-mono font-bold rounded border transition-all text-sm md:text-base flex items-center gap-2
              ${printed ? 'bg-green-700 text-white border-green-500 cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400 active:scale-95'}`}
          >
            {printing ? 'PRINTING...' : printed ? 'EJECTED' : 'PRINT RESUME'}
          </button>
          
          <button 
            onClick={handleDownload}
            className="px-4 py-2 font-mono font-bold rounded border bg-slate-700 text-white border-slate-500 hover:bg-slate-600 active:scale-95 flex items-center gap-2"
            title="Download Copy"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">TXT</span>
          </button>
        </div>
      </div>

      <div className="h-3 bg-black w-[96%] mx-auto z-10 rounded-b-sm"></div>

      <div className="relative overflow-hidden h-[600px] -mt-1 z-0">
        <div className={`bg-white text-slate-900 p-8 shadow-xl w-[92%] mx-auto min-h-[550px] transition-transform duration-[2500ms] ease-linear origin-top border border-slate-200
          ${printed || printing ? 'translate-y-0' : '-translate-y-[110%]'}`}
        >
          <div className="border-b-2 border-slate-800 pb-4 mb-4 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold uppercase">{RESUME_DATA.header.name}</h1>
              <p className="font-mono text-xs text-slate-600">{RESUME_DATA.header.role}</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-mono">{RESUME_DATA.header.contact.phone}</p>
              <p className="text-xs font-mono">{RESUME_DATA.header.contact.email}</p>
            </div>
          </div>

          <div className="space-y-4 text-xs md:text-sm">
            <div>
              <h4 className="font-bold border-b border-gray-300 mb-2">SUMMARY</h4>
              <p>{RESUME_DATA.header.summary}</p>
            </div>

            <div>
              <h4 className="font-bold border-b border-gray-300 mb-2">PROJECTS</h4>
              {RESUME_DATA.projects.slice(0, 3).map((p,i) => (
                <div key={i} className="mb-2">
                  <span className="font-bold">{p.title}</span> - <span className="italic">{p.status}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 text-center text-xs text-slate-400 font-mono">
              * This is a simplified preview. Download for full details. *
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificateBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('');

  const certificates = [
    {
      title: "Oracle Certified Foundations Associate",
      image: "/certificates/oracle-certificate.jpeg",
      desc: "",
      date: "2025",
      issuer: "Oracle Corporation",
      skills: ["Database Design", "SQL", "Data Modeling", "Database Administration"]
    },
    {
      title: "INNOVERSE 2.0 Hackathon Winner",
      image: "/certificates/innoverse-hackathon-certificate.jpeg",
      desc: "",
      date: "2025",
      issuer: "ZCOER Innovation Hub",
      skills: ["Healthcare AI", "Machine Learning", "Team Leadership", "Innovation"]
    },
    {
      title: "INNOVERSE 2.0 Code Relay Winner", 
      image: "/certificates/innoverse-code-relay-certificate.jpeg",
      desc: "",
      date: "2025",
      issuer: "ZCOER Innovation Hub",
      skills: ["Competitive Programming", "Team Leadership", "Algorithm Design", "Problem Solving"]
    }
  ];

  const handleBookClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setCurrentPage(0);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    }
  };

  const handlePageTurn = (direction) => {
    if (isFlipping) return;
    
    const canGoNext = direction === 'next' && currentPage < certificates.length - 1;
    const canGoPrev = direction === 'prev' && currentPage > 0;
    
    if (!canGoNext && !canGoPrev) return;
    
    setIsFlipping(true);
    setFlipDirection(direction);
    
    // Start page transition with improved timing
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentPage(currentPage + 1);
      } else {
        setCurrentPage(currentPage - 1);
      }
    }, 350);
    
    // Reset animation state
    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection('');
    }, 700);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentPage(0);
    setIsFlipping(false);
    setFlipDirection('');
    // Unlock body scroll
    document.body.style.overflow = 'auto';
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        handlePageTurn('next');
      } else if (e.key === 'ArrowLeft') {
        handlePageTurn('prev');
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentPage, isFlipping]);

  return (
    <div className="w-full max-w-4xl mx-auto my-16 p-4 relative z-10">
      {/* Book Cover */}
      <div 
        className={`book-perspective cursor-pointer transition-all duration-500 ${isOpen ? 'scale-110' : 'hover:scale-105'}`}
        onClick={handleBookClick}
      >
        <div className={`relative w-80 h-60 mx-auto book-shadow rounded-lg transition-all duration-600 ${
          isOpen ? 'animate-book-open' : ''
        }`}>
          {/* Book Spine */}
          <div className="absolute left-0 top-0 w-8 h-full book-spine rounded-l-lg border-r-2 border-purple-800"></div>
          
          {/* Book Cover */}
          <div className="absolute left-8 top-0 right-0 bottom-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-r-lg border border-purple-700 flex flex-col items-center justify-center text-white p-6">
            <div className="text-center">
              <Award className="w-16 h-16 text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2 font-serif">CERTIFICATES</h3>
              <p className="text-sm opacity-80 mb-4">Achievement Portfolio</p>
              <div className="text-xs opacity-60">
                <p>Rushikesh Munde</p>
                <p>2024-2025</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-yellow-400 rounded opacity-30"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-yellow-400 rounded opacity-30"></div>
          </div>
          
          {!isOpen && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 rounded-lg pointer-events-none"></div>
          )}
        </div>
      </div>
      
      {!isOpen && (
        <div className="text-center mt-6">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Click to explore my achievements
          </p>
        </div>
      )}

      {/* Book Pages Modal */}
      {isOpen && (
        <>
          {/* Backdrop with highest z-index */}
          <div className="modal-backdrop bg-black/90 backdrop-blur-sm" onClick={handleClose}></div>
          
          {/* Modal Content */}
          <div className="modal-content flex items-center justify-center p-4 pointer-events-none">
            <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
              {/* Book Header */}
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-4 flex justify-between items-center flex-shrink-0 z-10">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h2 className="text-xl font-bold">Certificate Portfolio</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm opacity-80">Page {currentPage + 1} of {certificates.length}</p>
                      <div className="flex gap-1 ml-2">
                        {certificates.map((_, index) => (
                          <div 
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentPage ? 'bg-yellow-400 scale-125' : 'bg-slate-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleClose}
                  className="text-white hover:text-red-400 transition-colors z-20"
                >
                  <XCircle size={28} />
                </button>
              </div>

              {/* Certificate Page - Scrollable Content */}
              <div className="flex-1 p-8 overflow-y-auto relative bg-white">
                {/* Left Arrow */}
                <button 
                  onClick={() => handlePageTurn('prev')}
                  disabled={currentPage === 0 || isFlipping}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full transition-all duration-300 ${
                    currentPage === 0 || isFlipping 
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-50' 
                      : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl animate-arrow-pulse'
                  }`}
                  title="Previous Certificate"
                >
                  <ArrowRight className="w-8 h-8 rotate-180" />
                </button>

                {/* Right Arrow */}
                <button 
                  onClick={() => handlePageTurn('next')}
                  disabled={currentPage === certificates.length - 1 || isFlipping}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full transition-all duration-300 ${
                    currentPage === certificates.length - 1 || isFlipping
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-50' 
                      : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl animate-arrow-pulse'
                  }`}
                  title="Next Certificate"
                >
                  <ArrowRight className="w-8 h-8" />
                </button>

                <div className={`page-container w-full transition-all duration-700 ${
                  isFlipping 
                    ? flipDirection === 'next' 
                      ? 'animate-slide-out-left' 
                      : 'animate-slide-out-right'
                    : 'animate-slide-in-right'
                }`}>
                  <div className="certificate-page w-full bg-white rounded-xl border-4 border-yellow-400 shadow-2xl p-8 animate-certificate-zoom certificate-hover">
                    {/* Certificate Display */}
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="w-full max-w-4xl aspect-[4/3] bg-white rounded-lg shadow-xl border-4 border-yellow-400 overflow-hidden mb-6">
                        <img 
                          src={certificates[currentPage].image}
                          alt={certificates[currentPage].title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=${encodeURIComponent(certificates[currentPage].title.replace(/\s+/g, '+'))}`
                          }}
                        />
                      </div>
                      
                      {/* Certificate Info */}
                      <div className="text-center max-w-2xl">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">{certificates[currentPage].title}</h3>
                        <div className="flex justify-center gap-8 text-sm text-slate-500 mt-4">
                          <div>
                            <span className="font-semibold">Issued by:</span> {certificates[currentPage].issuer}
                          </div>
                          <div>
                            <span className="font-semibold">Date:</span> {certificates[currentPage].date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="bg-slate-100 p-4 flex justify-between items-center flex-shrink-0 z-10">
                <button 
                  onClick={() => handlePageTurn('prev')}
                  disabled={currentPage === 0 || isFlipping}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === 0 || isFlipping 
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                      : 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95'
                  }`}
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Previous
                </button>

                <div className="flex gap-2">
                  {certificates.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentPage ? 'bg-purple-600' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <button 
                  onClick={() => handlePageTurn('next')}
                  disabled={currentPage === certificates.length - 1 || isFlipping}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === certificates.length - 1 || isFlipping
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                      : 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95'
                  }`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [torchMode, setTorchMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({x: 0, y: 0});
  const [contactForm, setContactForm] = useState({ name: '', reason: '' });
  const [isPolishing, setIsPolishing] = useState(false);

  // JOURNEY STATE
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(-1);
  const [scrollY, setScrollY] = useState(0);
  const [isJourneyActive, setIsJourneyActive] = useState(false);

  const TOTAL_HEIGHT = (milestones.length + 1) * SEGMENT_HEIGHT;
  const viewportCenterOffset = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;

  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Audio Permission Handling
  useEffect(() => {
    const enableAudio = () => {
      initAudio();
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('scroll', enableAudio);
    };

    window.addEventListener('click', enableAudio);
    window.addEventListener('scroll', enableAudio);

    return () => {
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('scroll', enableAudio);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePos({ 
            x: (e.clientX / window.innerWidth) * 20, 
            y: (e.clientY / window.innerHeight) * 20 
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handlePolishMessage = async () => {
    if (!contactForm.reason) {
      alert("Please enter a reason first!");
      return;
    }

    setIsPolishing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Pre-defined professional message templates
    const messageTemplates = {
      internship: `Hi Rushikesh,\n\nI hope this message finds you well. I'm ${contactForm.name}, and I'm reaching out regarding potential internship opportunities.\n\nI've reviewed your impressive portfolio and am particularly interested in your work with Full Stack Development and AI integration. Your projects like Veda AI and your hackathon achievements demonstrate exactly the kind of innovative thinking we value.\n\nI'd love to discuss how your skills in React, JavaScript, and AI APIs could contribute to our team. Would you be available for a brief conversation about potential opportunities?\n\nBest regards,\n${contactForm.name}`,
      
      collaboration: `Dear Rushikesh,\n\nI'm ${contactForm.name}, and I'm impressed by your technical expertise and project portfolio.\n\nYour experience with Full Stack Development, particularly your work on healthcare AI projects and your Top 5 hackathon achievement, aligns perfectly with some exciting projects we're working on.\n\nI'd be interested in exploring potential collaboration opportunities. Your skills in React, AI integration, and web development could be valuable for our upcoming initiatives.\n\nLooking forward to connecting with you.\n\nBest regards,\n${contactForm.name}`,
      
      job: `Hello Rushikesh,\n\nI'm ${contactForm.name}, and I came across your portfolio showcasing your impressive work in Full Stack Development and AI integration.\n\nYour technical skills, combined with your proven track record in hackathons and real-world projects like Veda AI, make you an excellent candidate for opportunities in our organization.\n\nI'd love to schedule a conversation to discuss how your expertise in React, JavaScript, and AI technologies could contribute to our team's success.\n\nPlease let me know your availability for a brief discussion.\n\nBest regards,\n${contactForm.name}`,
      
      general: `Hi Rushikesh,\n\nI'm ${contactForm.name}, and I wanted to reach out after reviewing your excellent portfolio.\n\nYour work in Full Stack Development and AI integration is truly impressive, especially your healthcare projects and hackathon achievements. Your technical skills and innovative approach to problem-solving caught my attention.\n\nI'd be interested in connecting to discuss potential opportunities or collaborations that might align with your expertise.\n\nLooking forward to hearing from you.\n\nBest regards,\n${contactForm.name}`
    };
    
    // Determine the best template based on the original message
    const originalMessage = contactForm.reason.toLowerCase();
    let selectedTemplate;
    
    if (originalMessage.includes('internship') || originalMessage.includes('intern')) {
      selectedTemplate = messageTemplates.internship;
    } else if (originalMessage.includes('collaboration') || originalMessage.includes('project') || originalMessage.includes('work together')) {
      selectedTemplate = messageTemplates.collaboration;
    } else if (originalMessage.includes('job') || originalMessage.includes('position') || originalMessage.includes('hire') || originalMessage.includes('opportunity')) {
      selectedTemplate = messageTemplates.job;
    } else {
      selectedTemplate = messageTemplates.general;
    }
    
    setContactForm(prev => ({ ...prev, reason: selectedTemplate }));
    setIsPolishing(false);
  };

  const handleContactSubmit = (type) => {
    const { name, reason } = contactForm;
    if (!name || !reason) {
      alert("Please fill in your name and reason!");
      return;
    }

    if (type === 'whatsapp') {
      const text = `Hi Rushikesh, I'm ${name}. ${reason}`;
      window.open(`https://wa.me/${RESUME_DATA.header.contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      const subject = `Connection Request from ${name}`;
      const body = `Hi Rushikesh,\n\nI'm ${name}.\n\n${reason}`;
      window.open(`mailto:${RESUME_DATA.header.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }
  };

  const getCarStyle = () => {
    const journeySection = document.getElementById('journey');
    let carX = 0;
    let rot = 0;
    let opacity = 0;

    if (journeySection) {
      const rect = journeySection.getBoundingClientRect();
      const currentTrackY = -rect.top + viewportCenterOffset;

      if (currentTrackY >= 0 && currentTrackY <= TOTAL_HEIGHT) {
        opacity = 1;
        const clampedY = Math.max(0, Math.min(currentTrackY, TOTAL_HEIGHT));
        carX = getRoadX(clampedY);
        rot = getRoadRotation(clampedY);
      }
    }

    return {
      transform: `translate(calc(-50% + ${carX}px), -50%) rotate(${rot}deg)`,
      opacity: opacity,
      pointerEvents: 'none',
      transition: 'opacity 0.2s ease-out, transform 0.1s linear'
    };
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          
          const journeySection = document.getElementById('journey');
          if (journeySection) {
            const rect = journeySection.getBoundingClientRect();
            const center = window.innerHeight / 2;
            const currentTrackY = -rect.top + center;
            const isActive = currentTrackY >= -100 && currentTrackY <= TOTAL_HEIGHT + 100;
            setIsJourneyActive(isActive);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Throttle milestone checking for better performance
    let ticking = false;
    const checkMilestones = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const journeySection = document.getElementById('journey');
          if (!journeySection) {
            ticking = false;
            return;
          }

          const rect = journeySection.getBoundingClientRect();
          const relativeY = -rect.top + viewportCenterOffset;

          milestones.forEach((_, i) => {
            const milestoneY = (i + 0.8) * SEGMENT_HEIGHT;
            if (Math.abs(relativeY - milestoneY) < 150) {
              if (activeMilestoneIndex !== i) {
                setActiveMilestoneIndex(i);
                if (isJourneyActive) audioManager.playCheckpointSound();
              }
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    checkMilestones();
  }, [scrollY, isJourneyActive, activeMilestoneIndex]);

  return (
    <div className={`min-h-screen transition-colors duration-100 ${darkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      <TorchEffect active={torchMode} />

      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-24 right-4 z-50 p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
        title="Toggle Day/Night"
      >
        {darkMode ? <Sun size={24} className="text-amber-400" /> : <Moon size={24} className="text-slate-600" />}
      </button>

      {/* Global Audio Enable Overlay (Subtle) */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none" title="Click anywhere to enable audio"></div>

      <nav className="fixed w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-normal tracking-tighter flex items-center gap-1" style={{ fontFamily: '"Great Vibes", cursive' }}>
            <span className="text-indigo-600 dark:text-indigo-400 text-3xl">Rushikesh</span>
          </a>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <NavLink href="#hero">Home</NavLink>
            <NavLink href="#projects">My Work</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#journey">Journey</NavLink>
            <NavLink href="#certificates">Certificates</NavLink>
            <NavLink href="#gallery">Gallery</NavLink>
            <a href="/blogs.html" className="font-medium transition-colors duration-200 cursor-pointer hover:text-indigo-500 relative group">
              Blogs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <NavLink href="#resume">Resume</NavLink>
            
            <button 
              onClick={() => setTorchMode(!torchMode)}
              className={`p-2 rounded-full transition-all ${
                torchMode ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Toggle Torch Mode"
            >
              <Flashlight size={20} />
            </button>

            <div className="flex gap-3 ml-2">
              <a href={RESUME_DATA.header.contact.linkedin} target="_blank" rel="noreferrer" 
                className="text-slate-500 hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={RESUME_DATA.header.contact.github} target="_blank" rel="noreferrer" 
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>

            <a href="#contact" className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-xs hover:scale-105 transition-transform">
              Connect
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleMenu} className="text-slate-800 dark:text-white">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 pt-24 px-6 md:hidden">
          <div className="flex flex-col space-y-4 text-slate-800 dark:text-slate-200">
            <NavLink href="#hero" mobile onClick={toggleMenu}>Home</NavLink>
            <NavLink href="#projects" mobile onClick={toggleMenu}>My Work</NavLink>
            <NavLink href="#skills" mobile onClick={toggleMenu}>Skills</NavLink>
            <NavLink href="#journey" mobile onClick={toggleMenu}>Journey</NavLink>
            <NavLink href="#certificates" mobile onClick={toggleMenu}>Certificates</NavLink>
            <NavLink href="#gallery" mobile onClick={toggleMenu}>Gallery</NavLink>
            <a href="/blogs.html" onClick={toggleMenu} className="block w-full py-4 text-2xl hover:text-indigo-500 border-b border-gray-100 dark:border-gray-800">
              Blogs
            </a>
            <NavLink href="#resume" mobile onClick={toggleMenu}>Resume</NavLink>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span>Torch Mode</span>
              <button 
                onClick={() => {
                  setTorchMode(!torchMode); 
                  toggleMenu();
                }}
                className={`p-2 rounded-full ${torchMode ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                <Flashlight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="hero" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
        <div className="absolute inset-0 -z-10" style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}>
          <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 min-h-[80vh]">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-6 animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Available for Internships
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight animate-fade-in-up delay-100">
                Full Stack <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Developer</span> & <br/>
                AI Enthusiast
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl lg:max-w-none leading-relaxed animate-fade-in-up delay-200">
                Hi, I'm <strong className="text-slate-900 dark:text-white">Rushikesh</strong>. I build interactive web experiences and integrate AI models like Gemini to solve real-world problems.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-in-up delay-300">
                <a href="/blogs.html" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2">
                  Explore Blogs <ArrowRight size={20} />
                </a>
                <a href="#resume" className="px-8 py-4 border border-slate-300 dark:border-slate-700 rounded-full font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                  <Printer size={20} /> Resume
                </a>
              </div>
            </div>

            {/* 3D Pixel Profile */}
            <div className="flex-1 flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl animate-fade-in-up delay-400 relative">
                {/* Glow effect behind the profile */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative z-10">
                  <PixelProfile key="pixel-profile-main" />
                </div>
                {/* Interactive hint */}
                <div className="text-center mt-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
                    Move cursor quickly to explode pixels • Ultra-fast 0.5s reformation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WorkstationScene below */}
          <div className="w-full relative h-[500px] flex items-center justify-center mt-16">
            <WorkstationScene darkMode={darkMode} />
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-slate-100 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
              <Code size={28} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">My Work</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <ProjectCard 
              title="Veda AI"
              desc="AI tool to convert DR prescriptions into audio explanations in regional languages. Currently working on this research-based project."
              tags={["Python", "Generative AI", "Speech API", "Regional Lang"]}
              type="Amazon AI for Bharat"
              link="https://github.com/RushikeshMunde22/Veda-AI-Healthcare"
              github="https://github.com/RushikeshMunde22/Veda-AI-Healthcare"
            />
            
            <ProjectCard 
              title="Healthcare AI (Codex App)"
              desc="Built a medical assistance platform integrating Google Gemini API for real-time symptom analysis. Led a team of 4 to develop the prototype in 24 hours."
              tags={["HTML", "CSS", "Java", "Gemini API"]}
              type="Inverse Hackathon Top 5"
              link="https://github.com/ShardulDesai10/Codex-Hackathon-App"
              github="https://github.com/ShardulDesai10/Codex-Hackathon-App"
            />
            
            <ProjectCard 
              title="Interactive Exhibition Portfolio"
              desc="A highly interactive simulation mimicking the WhatsApp interface. Engineered a chatbot-style navigation system to showcase skills dynamically."
              tags={["HTML5", "CSS3", "JavaScript", "DOM"]}
              type="Live Project"
              link="https://rushikeshmunde22.github.io/whatsappproject.rm/"
              github="https://github.com/RushikeshMunde22/whatsappproject.rm"
            />
            
            <ProjectCard 
              title="Grampanchayat Digital Initiative"
              desc="Official digital presence for Umarga Khojan village. A centralized hub for government schemes and local news."
              tags={["HTML", "CSS", "GovTech", "Accessibility"]}
              type="Deployed"
              link="http://rushikeshmunde22.github.io/grampanchayat-umarga-khojan/"
              github="https://github.com/RushikeshMunde22/grampanchayat-umarga-khojan"
            />
          </div>
        </div>
      </section>

      {/* Skills Section with Day/Night Mode */}
      <section id="skills" className={`py-0 relative overflow-hidden transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-b from-blue-50 via-sky-50 to-indigo-50'
      }`}>
        <div className={`absolute inset-0 transition-opacity duration-700 ${
          darkMode 
            ? 'bg-gradient-to-b from-slate-900/50 via-slate-800/50 to-slate-900/50 opacity-100' 
            : 'bg-gradient-to-b from-white/20 via-blue-50/20 to-indigo-50/20 opacity-100'
        }`}></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {darkMode ? (
            <>
              {/* Dark Mode: Floating particles */}
              <div className="absolute top-20 left-10 w-2 h-2 bg-indigo-400 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>
              <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>
              <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-30"></div>
            </>
          ) : (
            <>
              {/* Day Mode: Subtle geometric shapes */}
              <div className="absolute top-16 right-16 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-20 left-20 w-48 h-48 bg-indigo-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </>
          )}
        </div>
        
        <div className="relative z-10">
          <SkillsSection darkMode={darkMode} />
        </div>
      </section>

      <section id="journey" className="relative min-h-[100vh] bg-slate-950 font-sans text-slate-200 overflow-hidden pb-20">
        {/* Road Container */}
        <div className="relative w-full overflow-hidden" style={{ height: TOTAL_HEIGHT }}>
          <div className="absolute inset-0 pointer-events-none z-0 opacity-20" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(15,23,42,0) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0) 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }} 
          />

          <RoadSvg totalHeight={TOTAL_HEIGHT} />

          {milestones.map((milestone, i) => (
            <MapMilestone 
              key={i} 
              index={i} 
              milestone={milestone} 
              isActive={i === activeMilestoneIndex} 
            />
          ))}
        </div>

        {/* The Racing Car - Visibility controlled by getCarStyle logic (strict bounds) */}
        <div className="fixed top-1/2 left-1/2 z-50 pointer-events-none transition-transform duration-100 ease-linear"
          style={getCarStyle()}
        >
          <div className={`relative transition-transform duration-100 ${isJourneyActive ? 'scale-105' : 'scale-100'}`}>
            <Realistic3DCar isActive={isJourneyActive} />
            <SmokeParticles isActive={isJourneyActive} />
          </div>
        </div>
      </section>

      <section id="resume" className="py-20 bg-slate-100 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Interactive Resume</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Print a copy of my credentials directly from your browser.</p>
          </div>
          <ResumePrinter />
        </div>
      </section>

      {/* Certificate Book Section */}
      <section id="certificates" className="py-20 bg-white dark:bg-slate-800 relative z-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              My <span className="text-purple-600">Certificates</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Explore my professional certifications and achievements through an interactive certificate book experience.
            </p>
          </div>
          
          <div className="text-center">
            <CertificateBook />
          </div>
        </div>
      </section>

      {/* Camera Gallery Section */}
      <section id="gallery" className={`py-20 relative z-10 transition-colors duration-500 ${
        darkMode ? 'bg-slate-900' : 'bg-slate-50'
      }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 transition-all duration-500 ${
              darkMode 
                ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-700/50' 
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              <Camera size={18} />
              Photo & Video Gallery
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              My <span className={`text-transparent bg-clip-text transition-all duration-500 ${
                darkMode 
                  ? 'bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400' 
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
              }`}>Memories</span> Gallery
            </h2>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-500 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Explore my journey through photos and videos captured during events, hackathons, and memorable moments.
            </p>
          </div>
          
          <CameraGallery darkMode={darkMode} />
        </div>
      </section>

      <footer id="contact" className="py-20 bg-white dark:bg-slate-900 relative border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mb-6">
                <Briefcase size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Recruiters & Collaborators</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">I am actively seeking internship opportunities where I can apply my Full Stack and AI skills. </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h3>
                  <p className="text-slate-600 dark:text-slate-400">Fill out the form to instantly generate a message.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                      <Mail className="text-indigo-500" /> {RESUME_DATA.header.contact.email}
                    </div>
                    <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                      <Phone className="text-green-500" /> {RESUME_DATA.header.contact.phone}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <a href={RESUME_DATA.header.contact.linkedin} className="p-3 bg-white dark:bg-slate-700 rounded-full shadow-sm hover:scale-110 transition-transform">
                      <Linkedin size={24} className="text-blue-600 dark:text-blue-400" />
                    </a>
                    <a href={RESUME_DATA.header.contact.github} className="p-3 bg-white dark:bg-slate-700 rounded-full shadow-sm hover:scale-110 transition-transform">
                      <Github size={24} className="text-slate-900 dark:text-white" />
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Recruiter Name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Reason to Connect</label>
                    <div className="relative">
                      <div className="absolute right-3 top-3 z-10">
                        <button
                          onClick={handlePolishMessage}
                          disabled={isPolishing}
                          className="text-indigo-500 hover:text-indigo-600 p-1 rounded-full transition-colors"
                          title="Polish with AI"
                        >
                          {isPolishing ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                        </button>
                      </div>
                      <MessageSquare className="absolute left-3 top-3 text-slate-400" size={18} />
                      <textarea 
                        value={contactForm.reason}
                        onChange={(e) => setContactForm({...contactForm, reason: e.target.value})}
                        placeholder="Internship Opportunity / Project Collaboration..."
                        rows="3"
                        className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Sparkles size={12} className="text-indigo-500" />
                      Click the sparkle icon to polish your message with AI
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button 
                      onClick={() => handleContactSubmit('whatsapp')}
                      className="flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-green-500/30"
                    >
                      <MessageCircle size={20} /> WhatsApp
                    </button>
                    <button 
                      onClick={() => handleContactSubmit('email')}
                      className="flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/30"
                    >
                      <Send size={20} /> Email
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-sm mt-12 text-center">
              © {new Date().getFullYear()} Rushikesh Munde. Designed with React & Tailwind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}