import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Aperture, Battery, Wifi, Sliders, Play, Pause } from 'lucide-react';

/* --- GALLERY IMAGES AND VIDEOS FROM PUBLIC FOLDER --- */
const GALLERY_ITEMS = [
  // Photos
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.42 PM (1).jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.42 PM.jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.43 PM (1).jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.43 PM.jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.44 PM (1).jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.44 PM (2).jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.44 PM.jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.45 PM (1).jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.45 PM.jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.46 PM.jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.47 PM (1).jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.47 PM.jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.48 PM (1).jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.48 PM.jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.49 PM (1).jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.38.49 PM.jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.39.23 PM.jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.39.24 PM (1).jpeg' },
  { type: 'image', src: '/certificates/WhatsApp Image 2026-02-06 at 3.39.24 PM.jpeg' },
  // Videos (muted)
  { type: 'video', src: '/certificates/WhatsApp Video 2026-02-06 at 3.39.23 PM.mp4' },
  { type: 'video', src: '/certificates/WhatsApp Video 2026-02-06 at 3.39.24 PM.mp4' },
];

/* --- FILM SIMULATIONS --- */
const FILM_MODES = [
  { name: 'STD', label: 'Standard', style: {} },
  { name: 'B&W', label: 'Monochrome', style: { filter: 'grayscale(100%) contrast(1.1)' } },
  { name: 'VIVID', label: 'Vivid Color', style: { filter: 'saturate(150%) contrast(1.1)' } },
  { name: 'VINTAGE', label: 'Retro 80s', style: { filter: 'sepia(40%) contrast(0.9) brightness(1.1)' } },
  { name: 'CYBER', label: 'Cyberpunk', style: { filter: 'hue-rotate(180deg) contrast(1.2)' } },
];

/* --- SOUND ENGINE --- */
const playNavSound = (type = 'click') => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  if (type === 'click') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } else if (type === 'dial') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }
};

export default function CameraGallery({ darkMode = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [filmModeIndex, setFilmModeIndex] = useState(0);
  const [flashEffect, setFlashEffect] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = React.useRef(null);

  const currentItem = GALLERY_ITEMS[currentIndex];
  const currentFilm = FILM_MODES[filmModeIndex];

  // Handle video playback
  useEffect(() => {
    if (currentItem.type === 'video' && videoRef.current) {
      videoRef.current.load();
      setIsVideoPlaying(false);
    }
  }, [currentIndex]);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Navigation
  const handleNext = () => {
    playNavSound('click');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
      setIsTransitioning(false);
    }, 150);
  };

  const handlePrev = () => {
    playNavSound('click');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
      setIsTransitioning(false);
    }, 150);
  };

  // Film mode toggle
  const toggleFilmMode = () => {
    playNavSound('dial');
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 100);
    setFilmModeIndex((prev) => (prev + 1) % FILM_MODES.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`w-full py-12 flex items-center justify-center transition-colors duration-500 ${
      darkMode ? 'bg-neutral-900' : 'bg-gray-100'
    }`}>
      {/* CAMERA BODY CONTAINER */}
      <div className="relative w-full max-w-4xl transform transition-transform hover:scale-[1.01] duration-500 select-none">
        <div className="relative bg-[#1a1a1a] rounded-[32px] p-2 shadow-2xl overflow-hidden ring-1 ring-white/10 camera-texture">
          
          {/* Top Metallic Bar */}
          <div className="absolute top-0 left-0 right-0 h-16 brushed-metal rounded-t-[30px] z-10 border-b border-black/50">
            <div className="flex justify-between items-center h-full px-8">
              <div className="flex items-center gap-2 text-white/40 font-bold tracking-widest text-sm select-none">
                <Aperture size={18} /> MEMORIES <span className="text-[10px] font-normal border border-white/20 px-1 rounded">GAL</span>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-neutral-600 bg-neutral-800 shadow-inner flex items-center justify-center">
                  <div className="w-1 h-4 bg-neutral-600 transform rotate-45"></div>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#e0e0e0] to-[#999] shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-neutral-600"></div>
              </div>
            </div>
          </div>

          {/* Main Body */}
          <div className="relative mt-16 bg-[#1a1a1a] h-[400px] md:h-[500px] flex rounded-b-[30px] overflow-hidden">
            
            {/* Grip (Left) */}
            <div className="hidden md:block w-20 bg-[#151515] leather-texture h-full border-r border-white/5 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-64 bg-black/40 rounded-full blur-md"></div>
            </div>

            {/* Screen Area (Center) */}
            <div className="flex-1 p-4 md:p-8 flex flex-col relative bg-[#111]">
              
              {/* The LCD Screen */}
              <div className="relative flex-1 bg-black rounded border-[8px] border-[#222] shadow-[inset_0_0_20px_rgba(0,0,0,1)] overflow-hidden group">
                
                {/* Screen Overlay Effects */}
                <div className="absolute inset-0 pointer-events-none z-30 screen-pixelate opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-30"></div>
                {flashEffect && <div className="absolute inset-0 bg-white z-50 opacity-20 pointer-events-none animate-pulse"></div>}

                {/* HUD Overlay */}
                <div className="absolute top-4 left-4 z-20 text-green-400 font-mono text-xs flex gap-3 pointer-events-none items-center">
                  <span className="bg-black/40 px-1.5 py-0.5 rounded text-[10px]">
                    {currentItem.type === 'video' ? 'VIDEO' : 'PLAY'}
                  </span>
                  <span className="bg-black/40 px-1.5 py-0.5 rounded">
                    {currentIndex + 1}/{GALLERY_ITEMS.length}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 z-20 text-yellow-400 font-mono text-xs flex gap-2 pointer-events-none items-center">
                  <span className="bg-black/40 px-1.5 py-0.5 rounded border border-yellow-400/30 uppercase tracking-widest">
                    {currentFilm.name}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-20 text-white font-mono text-xs flex gap-2 pointer-events-none">
                  <Wifi size={14} />
                  <Battery size={14} className="text-green-400" />
                </div>

                {/* Media Display */}
                <div className="w-full h-full flex items-center justify-center bg-neutral-900 overflow-hidden">
                  {currentItem.type === 'image' ? (
                    <img 
                      src={currentItem.src} 
                      alt={`Memory ${currentIndex + 1}`}
                      style={currentFilm.style}
                      className={`max-w-full max-h-full object-contain transition-all duration-300 ${
                        isTransitioning ? 'opacity-50 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'
                      }`}
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <video 
                        ref={videoRef}
                        src={currentItem.src}
                        muted
                        loop
                        playsInline
                        style={currentFilm.style}
                        className={`max-w-full max-h-full object-contain transition-all duration-300 ${
                          isTransitioning ? 'opacity-50 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'
                        }`}
                      />
                      {/* Video Play/Pause Button */}
                      <button
                        onClick={toggleVideoPlayback}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition-all z-40 backdrop-blur-sm"
                      >
                        {isVideoPlaying ? <Pause size={32} /> : <Play size={32} />}
                      </button>
                    </div>
                  )}
                </div>

                {/* Navigation Controls */}
                <button 
                  onClick={handlePrev} 
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white/70 p-3 rounded-full hover:bg-black/60 hover:text-white transition-all z-40 backdrop-blur-sm active:scale-95"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button 
                  onClick={handleNext} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white/70 p-3 rounded-full hover:bg-black/60 hover:text-white transition-all z-40 backdrop-blur-sm active:scale-95"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* BRANDING AREA */}
              <div className="text-center mt-4 h-8 flex items-center justify-center">
                <span className="signature-text text-2xl md:text-3xl select-none rotate-[-2deg]">Rushikesh</span>
              </div>
            </div>

            {/* Physical Controls (Right) */}
            <div className="w-24 md:w-32 bg-[#181818] border-l border-white/5 h-full flex flex-col items-center py-8 gap-6 z-10 relative shadow-[-10px_0_20px_rgba(0,0,0,0.5)]">
              
              {/* Playback Mode LED */}
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>

              {/* D-Pad Navigation */}
              <div className="relative w-24 h-24 mt-4">
                <div className="absolute inset-0 bg-neutral-800 rounded-full shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] border border-white/5"></div>
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-6 bg-neutral-700 rounded-t opacity-50"></div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-6 bg-neutral-700 rounded-b opacity-50"></div>
                
                <button 
                  onClick={handlePrev}
                  className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-8 bg-neutral-700 rounded-l active:translate-x-[-2px] active:bg-neutral-600 hover:bg-neutral-600 flex items-center justify-center text-neutral-400 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                >
                  <ChevronLeft size={12} />
                </button>
                
                <button 
                  onClick={handleNext}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-8 bg-neutral-700 rounded-r active:translate-x-[2px] active:bg-neutral-600 hover:bg-neutral-600 flex items-center justify-center text-neutral-400 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                >
                  <ChevronRight size={12} />
                </button>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-neutral-900 rounded-full border border-neutral-700 shadow-md"></div>
              </div>

              {/* Film Simulation Toggle Button */}
              <div className="flex flex-col gap-2 mt-auto mb-4 items-center">
                <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-bold">Film Sim</p>
                <button 
                  onClick={toggleFilmMode}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 text-yellow-500 border border-white/10 flex items-center justify-center hover:text-yellow-400 hover:border-yellow-500/30 transition-all active:scale-95 shadow-[0_4px_10px_rgba(0,0,0,0.5)] group relative"
                  title="Change Film Simulation"
                >
                  <Sliders size={22} className="group-hover:rotate-90 transition-transform duration-500" />
                  <div className="absolute inset-0 rounded-full border border-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <p className="text-[10px] text-neutral-400 font-mono mt-1">{currentFilm.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
