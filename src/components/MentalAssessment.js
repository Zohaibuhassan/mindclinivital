import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Assessment Questions Data
const assessmentData = {
  PHQ9: {
    name: 'Depression',
    description: 'Depression Assessment',
    questions: [
      { id: 1, text: 'Little interest or pleasure in doing things' },
      { id: 2, text: 'Feeling down, depressed, or hopeless' },
      { id: 3, text: 'Trouble falling or staying asleep, or sleeping too much' },
      { id: 4, text: 'Feeling tired or having little energy' },
      { id: 5, text: 'Poor appetite or overeating' },
      { id: 6, text: 'Feeling bad about yourself' },
      { id: 7, text: 'Trouble concentrating on things' },
      { id: 8, text: 'Moving or speaking so slowly that other people could have noticed' },
      { id: 9, text: 'Thoughts that you would be better off dead or hurting yourself in some way' },
    ]
  },
  GAD7: {
    name: 'Anxiety',
    description: 'Anxiety Assessment',
    questions: [
      { id: 1, text: 'Feeling nervous, anxious, or on edge' },
      { id: 2, text: 'Not being able to stop or control worrying' },
      { id: 3, text: 'Worrying too much about different things' },
      { id: 4, text: 'Trouble relaxing' },
      { id: 5, text: 'Being so restless that it is hard to sit still' },
      { id: 6, text: 'Becoming easily annoyed or irritable' },
      { id: 7, text: 'Feeling afraid as if something awful might happen' },
    ]
  },
  PSS10: {
    name: 'Stress',
    description: 'Stress Assessment',
    questions: [
      { id: 1, text: 'In the last month, how often have you felt upset because of something that happened unexpectedly?' },
      { id: 2, text: 'In the last month, how often have you felt unable to control the important things in your life?' },
      { id: 3, text: 'In the last month, how often have you felt confident about your ability to handle personal problems?' },
      { id: 4, text: 'In the last month, how often have you felt that things were going your way?' },
      { id: 5, text: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?' },
    ]
  },
  WHO5: {
    name: 'Well-being',
    description: 'Well-being Assessment',
    questions: [
      { id: 1, text: 'I have felt cheerful and in good spirits' },
      { id: 2, text: 'I have felt calm and relaxed' },
      { id: 3, text: 'I have felt active and vigorous' },
      { id: 4, text: 'I woke up feeling fresh and rested' },
      { id: 5, text: 'My daily life has been filled with interesting things' },
    ]
  }
};

const answerOptions = [
  { value: 0, label: 'Not at all', emoji: '😐' },
  { value: 1, label: 'Several days', emoji: '🙂' },
  { value: 2, label: 'More than half the days', emoji: '😔' },
  { value: 3, label: 'Nearly every day', emoji: '😞' },
];

const MentalAssessment = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState('landing'); // landing, assessment, results, emergency
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voicePaused, setVoicePaused] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState(null);
  
  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length > 0 && !selectedVoice) {
        const preferredVoice = availableVoices.find(v => v.lang.includes('en')) || availableVoices[0];
        setSelectedVoice(preferredVoice);
      }
    };
    
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  // Text-to-Speech function
  const speak = (text) => {
    if (!voiceEnabled || voicePaused) return;
    
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voiceSpeed;
    utterance.pitch = 1;
    utterance.volume = 1;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    speechSynthesis.speak(utterance);
  };

  // Get all questions in order
  const getAllQuestions = () => {
    const order = ['PHQ9', 'GAD7', 'PSS10', 'WHO5'];
    const allQuestions = [];
    order.forEach(key => {
      assessmentData[key].questions.forEach((q) => {
        allQuestions.push({
          assessment: key,
          questionId: q.id,
          text: q.text
        });
      });
    });
    return allQuestions;
  };

  const allQuestions = getAllQuestions();
  const totalQuestions = allQuestions.length;

  // Handle answer selection
  const handleAnswer = (value) => {
    const currentQ = allQuestions[currentQuestionIndex];
    const answerKey = `${currentQ.assessment}_${currentQ.questionId}`;
    
    const newAnswers = {
      ...answers,
      [answerKey]: value
    };
    setAnswers(newAnswers);

    // Move to next question
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('results');
    }
  };

  // Calculate scores
  const calculateScores = () => {
    const scores = {};
    
    Object.keys(assessmentData).forEach(key => {
      const questions = assessmentData[key].questions;
      let total = 0;
      questions.forEach(q => {
        const answerKey = `${key}_${q.id}`;
        total += answers[answerKey] || 0;
      });
      
      if (key === 'WHO5') {
        scores[key] = Math.round((total / 25) * 100); // WHO-5 is inverted (0-100 scale)
      } else {
        scores[key] = total;
      }
    });
    
    return scores;
  };

  // Get severity level
  const getSeverity = (score, type) => {
    if (type === 'WHO5') {
      if (score >= 50) return { level: 'Good', color: 'text-green-400' };
      if (score >= 25) return { level: 'Moderate', color: 'text-yellow-400' };
      return { level: 'Low', color: 'text-red-400' };
    }
    
    if (type === 'PHQ9') {
      if (score <= 4) return { level: 'Minimal', color: 'text-green-400' };
      if (score <= 9) return { level: 'Mild', color: 'text-yellow-400' };
      if (score <= 14) return { level: 'Moderate', color: 'text-orange-400' };
      if (score <= 19) return { level: 'Moderately Severe', color: 'text-red-400' };
      return { level: 'Severe', color: 'text-red-500' };
    }
    
    if (type === 'GAD7') {
      if (score <= 4) return { level: 'Minimal', color: 'text-green-400' };
      if (score <= 9) return { level: 'Mild', color: 'text-yellow-400' };
      if (score <= 14) return { level: 'Moderate', color: 'text-orange-400' };
      return { level: 'Severe', color: 'text-red-500' };
    }
    
    if (type === 'PSS10') {
      if (score <= 12) return { level: 'Low', color: 'text-green-400' };
      if (score <= 20) return { level: 'Moderate', color: 'text-yellow-400' };
      return { level: 'High', color: 'text-red-400' };
    }
    
    return { level: 'Unknown', color: 'text-gray-400' };
  };

  // Speak current question
  useEffect(() => {
    if (currentStep === 'assessment' && voiceEnabled) {
      const currentQ = allQuestions[currentQuestionIndex];
      const questionText = `Question ${currentQuestionIndex + 1} of ${totalQuestions}. ${currentQ.text}`;
      speak(questionText);
    }
  }, [currentQuestionIndex, currentStep, voiceEnabled, voicePaused]);

  // Landing Page
  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,212,200,0.08)_0%,transparent_60%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <button 
          onClick={onBack}
          className="absolute top-24 left-6 md:left-12 flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="font-medium">Back</span>
        </button>

        <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[clamp(32px,5vw,48px)] font-black tracking-tight mb-6 text-white">
              Welcome to your <span className="text-accent">Mental Health Assessment</span>
            </h1>
            
            <p className="text-[16px] text-[#9ca3af] mb-4 leading-relaxed">
              This assessment takes around 8–10 minutes.
            </p>
            
            <p className="text-[16px] text-[#9ca3af] mb-12 leading-relaxed">
              We'll ask a few questions to better understand your mental wellbeing.
            </p>

            <div className="bg-bg-card border border-white/10 rounded-2xl p-8 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </div>
              <p className="text-[14px] text-[#9ca3af]">
                Our AI assistant will guide you through each question with a friendly voice.
              </p>
            </div>

            <button
              onClick={() => setCurrentStep('assessment')}
              className="bg-gradient-to-br from-accent to-accent-2 text-black text-[16px] font-bold px-8 py-4 rounded-xl font-sans transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            >
              Start Assessment
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Emergency Screen
  if (currentStep === 'emergency') {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center pt-24 pb-12 px-6">
        <div className="w-full max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 2.26-3L13.732 4c-.247-.825-1.32-.825-1.567 0L4.28 16c-.54.825.159 2 1.22 2z"/>
              </svg>
            </div>
            
            <h2 className="text-[28px] font-bold text-red-400 mb-4">I'm concerned about your safety</h2>
            
            <p className="text-[16px] text-[#9ca3af] mb-8 leading-relaxed">
              It sounds like you may be having thoughts of self-harm. Please reach out for help immediately.
            </p>

            <div className="grid gap-4 max-w-md mx-auto">
              <a
                href="tel:988"
                className="bg-red-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-4.15-1.29 15.37 15.37 0 0 1-6.2-4.25 15.37 15.37 0 0 1-4.25-6.2A19.79 19.79 0 0 1 4 2.18 2 2 0 0 1 7.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 2.61 7.45 2 2 0 0 1 1.72 3z"/>
                </svg>
                Call Now (988)
              </a>
              
              <button
                onClick={onBack}
                className="bg-bg-card border border-white/10 text-white py-4 px-6 rounded-xl font-semibold hover:bg-white/5 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Assessment Screen
  if (currentStep === 'assessment') {
    const currentQ = allQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const assessmentName = assessmentData[currentQ.assessment].name;

    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center pt-20 pb-12 px-6">
        <button 
          onClick={onBack}
          className="absolute top-20 left-6 md:left-12 flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="font-medium">Back</span>
        </button>

        <div className="w-full max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[14px] text-[#9ca3af]">{assessmentName} Assessment</span>
              <span className="text-[14px] text-accent font-medium">{currentQuestionIndex + 1} of {totalQuestions}</span>
            </div>
            <div className="h-2 bg-bg-card rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-2"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Voice Controls */}
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-lg transition-colors ${voiceEnabled ? 'bg-accent/20 text-accent' : 'bg-bg-card text-[#9ca3af]'}`}
              title={voiceEnabled ? 'Mute Voice' : 'Unmute Voice'}
            >
              {voiceEnabled ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 19 13 21 13 19 17 19 17 13 19 13 19 11 21 11 21 13 19 13 19 11 15 11 15 9 15 9 9 13 5 9 5 9"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="1" y1="1" x2="23" y2="23"/>
                  <path d="M9.536 3.385A12.024 12.024 0 0112 3c1.93 0 3.786.44 5.472 1.229M15 10.5V9c0-1.66-1.34-3-3-3-.552 0-1.076.144-1.56.395M3 12c0-1.66 1.34-3 3-3l6 6c0 1.66-1.34 3-3 3-.552 0-1.076-.144-1.56-.395"/>
                </svg>
              )}
            </button>
            <button
              onClick={() => {
                if (voicePaused) {
                  speechSynthesis.resume();
                } else {
                  speechSynthesis.pause();
                }
                setVoicePaused(!voicePaused);
              }}
              className="p-2 rounded-lg bg-bg-card text-[#9ca3af] hover:text-white transition-colors"
              title={voicePaused ? 'Resume Voice' : 'Pause Voice'}
            >
              {voicePaused ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              )}
            </button>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-bg-card border border-white/10 rounded-2xl p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </div>
                <span className="text-[14px] text-accent font-medium">AI Assistant</span>
              </div>

              <p className="text-[20px] text-white text-center leading-relaxed font-medium">
                {currentQ.text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Answer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {answerOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.value)}
                className="bg-bg-card border border-white/10 rounded-xl p-5 text-left hover:border-accent/50 hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[24px]">{option.emoji}</span>
                  <span className="text-[15px] text-white font-medium">{option.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (currentStep === 'results') {
    const scores = calculateScores();
    const isEmergency = answers['PHQ9_9'] > 0;
    
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center pt-20 pb-12 px-6">
        <button 
          onClick={onBack}
          className="absolute top-20 left-6 md:left-12 flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="font-medium">Back</span>
        </button>

        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isEmergency && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 mb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 2.26-3L13.732 4c-.247-.825-1.32-.825-1.567 0L4.28 16c-.54.825.159 2 1.22 2z"/>
                  </svg>
                </div>
                <h2 className="text-[24px] font-bold text-red-400 mb-2">I'm concerned about your safety</h2>
                <p className="text-[15px] text-white mb-6">
                  It sounds like you may be having thoughts of self-harm. Please reach out for help immediately.
                </p>
                <a
                  href="tel:988"
                  className="inline-flex items-center gap-2 bg-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-4.15-1.29 15.37 15.37 0 0 1-6.2-4.25 15.37 15.37 0 0 1-4.25-6.2A19.79 19.79 0 0 1 4 2.18 2 2 0 0 1 7.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 2.61 7.45 2 2 0 0 1 1.72 3z"/>
                  </svg>
                  Call Now (988)
                </a>
              </div>
            )}
            <h1 className="text-[32px] font-bold text-center mb-12">
              Your <span className="text-accent">Mental Health</span> Results
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {Object.entries(assessmentData).map(([key, data]) => {
                const severity = getSeverity(scores[key], key);
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-bg-card border border-white/10 rounded-2xl p-6 text-center"
                  >
                    <h3 className="text-[16px] font-bold text-white mb-2">{data.name}</h3>
                    <p className={`text-[14px] font-medium mb-3 ${severity.color}`}>{severity.level}</p>
                    <div className="text-[36px] font-black text-accent mb-2">{scores[key]}</div>
                    <p className="text-[12px] text-[#9ca3af]">Score</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="bg-bg-card border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-[18px] font-bold text-white mb-4">AI Summary</h3>
              <p className="text-[15px] text-[#9ca3af] leading-relaxed">
                You reported {getSeverity(scores.PHQ9, 'PHQ9').level.toLowerCase()} symptoms of depression with {getSeverity(scores.GAD7, 'GAD7').level.toLowerCase()} anxiety and {getSeverity(scores.PSS10, 'PSS10').level.toLowerCase()} stress levels. Your wellbeing score suggests that self-care strategies and professional consultation may be beneficial.
              </p>
            </div>

            <div className="bg-bg-card border border-white/10 rounded-2xl p-8">
              <h3 className="text-[18px] font-bold text-white mb-4">Recommendations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Sleep Improvement', 'Exercise', 'Meditation', 'Breathing', 'Journaling', 'Hydration', 'Professional Therapy', 'Support Groups'].map((rec, i) => (
                  <div key={i} className="flex items-center gap-3 bg-bg-secondary/50 rounded-lg p-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <span className="text-[14px] text-white">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default MentalAssessment;