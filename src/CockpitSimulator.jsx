import React, { useState } from 'react';
import { Code2, Database, Globe, Wrench, Sparkles, TrendingUp, CheckCircle, Clock, Zap, Star } from 'lucide-react';

const skillsData = [
  // Core Skills - High Proficiency
  { 
    id: 'c', 
    name: 'C Language', 
    level: 90, 
    category: 'Core', 
    icon: Code2,
    color: 'from-blue-500 to-blue-600',
    description: 'High proficiency in low-level systems, pointers, and memory management architecture.'
  },
  { 
    id: 'cpp', 
    name: 'C++', 
    level: 95, 
    category: 'Core', 
    icon: Code2,
    color: 'from-blue-600 to-blue-700',
    description: 'Expertise in OOP, STL, and high-performance system design.'
  },
  { 
    id: 'html', 
    name: 'HTML/CSS', 
    level: 90, 
    category: 'Core', 
    icon: Globe,
    color: 'from-orange-500 to-red-500',
    description: 'Professional standard responsive layouts and semantic structure.'
  },
  
  // Learning Phase - Growing Skills
  { 
    id: 'js', 
    name: 'JavaScript', 
    level: 40, 
    category: 'Learning', 
    icon: Code2,
    color: 'from-yellow-400 to-yellow-500',
    description: 'Learning Phase: Building interactivity, understanding ES6+ features and DOM manipulation.'
  },
  { 
    id: 'react', 
    name: 'React', 
    level: 40, 
    category: 'Learning', 
    icon: Code2,
    color: 'from-cyan-400 to-cyan-500',
    description: 'Learning Phase: Understanding hooks, state management, and component lifecycles.'
  },
  { 
    id: 'py', 
    name: 'Python', 
    level: 45, 
    category: 'Learning', 
    icon: Code2,
    color: 'from-green-400 to-green-500',
    description: 'Learning Phase: Exploring automation scripts, backend logic, and data analysis libraries.'
  },
  { 
    id: 'sql', 
    name: 'SQL', 
    level: 35, 
    category: 'Learning', 
    icon: Database,
    color: 'from-purple-400 to-purple-500',
    description: 'Learning Phase: Writing basic queries, joins, and database schema design.'
  },
  
  // Tools & Technologies
  { 
    id: 'aws', 
    name: 'AWS Cloud', 
    level: 30, 
    category: 'Tools', 
    icon: Globe,
    color: 'from-orange-400 to-orange-500',
    description: 'Learning Phase: Basics of EC2, S3, and cloud deployment pipelines.'
  },
  { 
    id: 'postman', 
    name: 'Postman', 
    level: 40, 
    category: 'Tools', 
    icon: Wrench,
    color: 'from-orange-500 to-red-400',
    description: 'Learning Phase: Testing API endpoints and debugging request flows.'
  },
  { 
    id: 'tailwind', 
    name: 'Tailwind CSS', 
    level: 45, 
    category: 'Tools', 
    icon: Globe,
    color: 'from-teal-400 to-teal-500',
    description: 'Learning Phase: Implementing utility-first CSS for rapid UI development.'
  },
  
  // Special Skill
  { 
    id: 'vibe', 
    name: 'Vibe Coding', 
    level: 100, 
    category: 'Special', 
    icon: Sparkles,
    color: 'from-pink-500 to-purple-600',
    description: 'Maximum Flow State: Creative problem solving and adaptive coding mindset.'
  }
];

const categories = {
  'Core': { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  'Learning': { icon: TrendingUp, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  'Tools': { icon: Wrench, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  'Special': { icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' }
};

export default function SkillsSection({ darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const filteredSkills = selectedCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);

  const getSkillIcon = (skill) => {
    const IconComponent = skill.icon;
    return <IconComponent size={24} />;
  };

  const getCategoryIcon = (category) => {
    const IconComponent = categories[category]?.icon || Code2;
    return <IconComponent size={16} />;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 transition-all duration-500 ${
          darkMode 
            ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-700/50' 
            : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
        }`}>
          <Zap size={16} className="animate-pulse" />
          Technical Arsenal
        </div>
        
        <h2 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight transition-colors duration-500 ${
          darkMode 
            ? 'text-white' 
            : 'text-slate-900'
        }`}>
          My <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
            darkMode 
              ? 'from-indigo-400 via-purple-400 to-pink-400' 
              : 'from-indigo-600 via-purple-600 to-pink-600'
          }`}>Skills</span>
        </h2>
        
        <p className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-500 ${
          darkMode 
            ? 'text-slate-400' 
            : 'text-slate-600'
        }`}>
          Explore my technical expertise and growing skill set across various technologies
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
            selectedCategory === 'All'
              ? darkMode
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                : 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
              : darkMode
                ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-sm'
          }`}
        >
          All Skills
        </button>
        
        {Object.entries(categories).map(([category, config]) => {
          const count = skillsData.filter(skill => skill.category === category).length;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category
                  ? darkMode
                    ? `bg-slate-800 ${config.color} shadow-lg border border-slate-700 scale-105`
                    : `bg-white ${config.color} shadow-lg border border-slate-200 scale-105`
                  : darkMode
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-sm'
              }`}
            >
              {getCategoryIcon(category)}
              {category}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <div
            key={skill.id}
            onClick={() => setSelectedSkill(skill)}
            style={{ animationDelay: `${index * 0.05}s` }}
            className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:scale-105 animate-fade-in-up ${
              darkMode
                ? 'bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10'
                : 'bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10'
            }`}
          >
            {/* Skill Icon & Level Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                {getSkillIcon(skill)}
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                skill.level >= 80
                  ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                  : skill.level >= 50
                    ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                    : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
              }`}>
                <Star size={12} className="fill-current" />
                {skill.level}%
              </div>
            </div>

            {/* Skill Name */}
            <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
              darkMode
                ? 'text-white group-hover:text-indigo-400'
                : 'text-slate-900 group-hover:text-indigo-600'
            }`}>
              {skill.name}
            </h3>

            {/* Category Badge */}
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-4 transition-all duration-300 ${
              darkMode
                ? `bg-slate-700/50 ${categories[skill.category]?.color}`
                : `${categories[skill.category]?.bg} ${categories[skill.category]?.color}`
            }`}>
              {getCategoryIcon(skill.category)}
              {skill.category}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className={`w-full rounded-full h-2 overflow-hidden transition-colors duration-300 ${
                darkMode ? 'bg-slate-700' : 'bg-slate-200'
              }`}>
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out shadow-lg`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>

            {/* Skill Level Indicator */}
            <div className="flex items-center gap-2">
              {skill.level >= 80 ? (
                <>
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm font-bold text-green-500">Expert</span>
                </>
              ) : skill.level >= 50 ? (
                <>
                  <TrendingUp size={16} className="text-blue-500" />
                  <span className="text-sm font-bold text-blue-500">Intermediate</span>
                </>
              ) : (
                <>
                  <Clock size={16} className="text-yellow-500" />
                  <span className="text-sm font-bold text-yellow-500">Learning</span>
                </>
              )}
            </div>

            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
              darkMode
                ? 'bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10'
                : 'bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5'
            }`} />
          </div>
        ))}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedSkill(null)}
        >
          <div 
            className={`rounded-3xl p-8 max-w-lg w-full shadow-2xl transition-all duration-500 animate-in zoom-in ${
              darkMode
                ? 'bg-slate-800 border border-slate-700'
                : 'bg-white border border-slate-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${selectedSkill.color} text-white shadow-xl`}>
                {getSkillIcon(selectedSkill)}
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  darkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                    : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <h3 className={`text-3xl font-black mb-3 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>{selectedSkill.name}</h3>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                darkMode
                  ? `bg-slate-700 ${categories[selectedSkill.category]?.color}`
                  : `${categories[selectedSkill.category]?.bg} ${categories[selectedSkill.category]?.color}`
              }`}>
                {getCategoryIcon(selectedSkill.category)}
                {selectedSkill.category} Skill
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className={`text-sm font-bold transition-colors duration-300 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>Proficiency Level</span>
                <span className={`text-2xl font-black transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>{selectedSkill.level}%</span>
              </div>
              <div className={`w-full rounded-full h-4 overflow-hidden transition-colors duration-300 shadow-inner ${
                darkMode ? 'bg-slate-700' : 'bg-slate-200'
              }`}>
                <div 
                  className={`h-full bg-gradient-to-r ${selectedSkill.color} transition-all duration-1000 ease-out shadow-lg`}
                  style={{ width: `${selectedSkill.level}%` }}
                />
              </div>
            </div>

            <p className={`text-base leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {selectedSkill.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
