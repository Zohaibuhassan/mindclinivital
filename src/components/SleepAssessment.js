import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sleep Assessment Questions
const sleepQuestions = [
  // Section 1: Sleep Duration
  { id: 1, section: 'Sleep Duration', text: 'How many hours do you usually sleep each night?', type: 'hours' },
  { id: 2, section: 'Sleep Duration', text: 'Do you usually get enough sleep to feel rested?', type: 'frequency' },
  { id: 3, section: 'Sleep Duration', text: 'Do you wake up earlier than you intended?', type: 'frequency' },
  
  // Section 2: Falling Asleep
  { id: 4, section: 'Falling Asleep', text: 'How often do you have difficulty falling asleep?', type: 'frequency' },
  { id: 5, section: 'Falling Asleep', text: 'How long does it usually take you to fall asleep?', type: 'time' },
  { id: 6, section: 'Falling Asleep', text: 'Do you feel anxious or restless before going to bed?', type: 'frequency' },
  
  // Section 3: Staying Asleep
  { id: 7, section: 'Staying Asleep', text: 'Do you wake up during the night?', type: 'frequency' },
  { id: 8, section: 'Staying Asleep', text: 'If you wake up, do you struggle to fall asleep again?', type: 'frequency' },
  { id: 9, section: 'Staying Asleep', text: 'Do dreams or nightmares interrupt your sleep?', type: 'frequency' },
  
  // Section 4: Sleep Quality
  { id: 10, section: 'Sleep Quality', text: 'How would you rate your sleep quality?', type: 'quality' },
  { id: 11, section: 'Sleep Quality', text: 'Do you wake up feeling refreshed?', type: 'frequency' },
  { id: 12, section: 'Sleep Quality', text: 'Do you feel your sleep is deep and restful?', type: 'frequency' },
  
  // Section 5: Daytime Effects
  { id: 13, section: 'Daytime Effects', text: 'Do you feel sleepy during the day?', type: 'frequency' },
  { id: 14, section: 'Daytime Effects', text: 'Do you struggle to concentrate because of poor sleep?', type: 'frequency' },
  { id: 15, section: 'Daytime Effects', text: 'Has poor sleep affected your work or studies?', type: 'frequency' },
  { id: 16, section: 'Daytime Effects', text: 'Have you accidentally fallen asleep during the day?', type: 'frequency' },
  
  // Section 6: Lifestyle
  { id: 17, section: 'Lifestyle', text: 'Do you use your phone before sleeping?', type: 'frequency' },
  { id: 18, section: 'Lifestyle', text: 'Do you drink coffee or tea late in the evening?', type: 'frequency' },
  { id: 19, section: 'Lifestyle', text: 'Do you exercise regularly?', type: 'frequency' },
  { id: 20, section: 'Lifestyle', text: 'Do you maintain a regular bedtime?', type: 'frequency' },
  
  // Section 7: Stress
  { id: 21, section: 'Stress', text: 'Does stress affect your sleep?', type: 'frequency' },
  { id: 22, section: 'Stress', text: 'Do you think too much while trying to sleep?', type: 'frequency' },
  { id: 23, section: 'Stress', text: 'Do you wake feeling worried or anxious?', type: 'frequency' },
  
  // Section 8: Sleep Environment
  { id: 24, section: 'Sleep Environment', text: 'Is your bedroom quiet?', type: 'frequency' },
  { id: 25, section: 'Sleep Environment', text: 'Is your room dark enough for good sleep?', type: 'frequency' },
  { id: 26, section: 'Sleep Environment', text: 'Does someone disturb your sleep?', type: 'frequency' },
  
  // Section 9: Possible Sleep Disorders
  { id: 27, section: 'Sleep Disorders', text: 'Has anyone told you that you snore loudly?', type: 'frequency' },
  { id: 28, section: 'Sleep Disorders', text: 'Has anyone noticed pauses in your breathing during sleep?', type: 'frequency' },
  { id: 29, section: 'Sleep Disorders', text: 'Do you wake gasping for air?', type: 'frequency' },
  { id: 30, section: 'Sleep Disorders', text: 'Do your legs move uncontrollably while sleeping?', type: 'frequency' },
  { id: 31, section: 'Sleep Disorders', text: 'Do nightmares disturb your sleep?', type: 'frequency' },
  
  // Section 10: Overall Satisfaction
  { id: 32, section: 'Overall', text: 'Overall, how satisfied are you with your sleep?', type: 'satisfaction' },
];

const answerOptions = {
  frequency: [
    { value: 0, label: 'Never', emoji: '😴' },
    { value: 1, label: 'Rarely', emoji: '😐' },
    { value: 2, label: 'Sometimes', emoji: '😔' },
    { value: 3, label: 'Often', emoji: '😟' },
    { value: 4, label: 'Always', emoji: '😩' },
  ],
  hours: [
    { value: 0, label: 'Less than 4 hours', emoji: '😴' },
    { value: 1, label: '4-5 hours', emoji: '😐' },
    { value: 2, label: '6-7 hours', emoji: '🙂' },
    { value: 3, label: '7-9 hours', emoji: '😊' },
    { value: 4, label: 'More than 9 hours', emoji: '😴' },
  ],
  time: [
    { value: 0, label: 'Less than 15 minutes', emoji: '😊' },
    { value: 1, label: '15-30 minutes', emoji: '🙂' },
    { value: 2, label: '30-60 minutes', emoji: '😐' },
    { value: 3, label: 'More than 1 hour', emoji: '😔' },
    { value: 4, label: 'More than 2 hours', emoji: '😩' },
  ],
  quality: [
    { value: 4, label: 'Excellent', emoji: '😊' },
    { value: 3, label: 'Good', emoji: '🙂' },
    { value: 2, label: 'Average', emoji: '😐' },
    { value: 1, label: 'Poor', emoji: '😔' },
    { value: 0, label: 'Very Poor', emoji: '😩' },
  ],
  satisfaction: [
    { value: 4, label: 'Very Satisfied', emoji: '😊' },
    { value: 3, label: 'Satisfied', emoji: '🙂' },
    { value: 2, label: 'Neutral', emoji: '😐' },
    { value: 1, label: 'Dissatisfied', emoji: '😔' },
    { value: 0, label: 'Very Dissatisfied', emoji: '😩' },
  ],
};

const SleepAssessment = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voicePaused, setVoicePaused] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voices, setVoices] = useState([]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
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
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    speechSynthesis.speak(utterance);
  };

  // Handle answer selection
  const handleAnswer = (value) => {
    const currentQ = sleepQuestions[currentQuestionIndex];
    
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: value
    }));

    if (currentQuestionIndex < sleepQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('results');
    }
  };

  // Calculate scores
  const calculateScores = () => {
    const scores = {
      overall: 0,
      duration: 0,
      quality: 0,
      hygiene: 0,
      stress: 0,
      fatigue: 0,
      disorderRisk: 0,
    };

    // Calculate overall score (0-100)
    let totalScore = 0;
    sleepQuestions.forEach(q => {
      totalScore += answers[q.id] || 0;
    });
    scores.overall = Math.round((totalScore / (sleepQuestions.length * 4)) * 100);

    // Calculate section scores
    const sections = {
      'Sleep Duration': 'duration',
      'Falling Asleep': 'hygiene',
      'Staying Asleep': 'quality',
      'Sleep Quality': 'quality',
      'Daytime Effects': 'fatigue',
      'Lifestyle': 'hygiene',
      'Stress': 'stress',
      'Sleep Environment': 'hygiene',
      'Sleep Disorders': 'disorderRisk',
    };

    Object.entries(sections).forEach(([sectionName, scoreKey]) => {
      const sectionQuestions = sleepQuestions.filter(q => q.section === sectionName);
      let sectionScore = 0;
      sectionQuestions.forEach(q => {
        sectionScore += answers[q.id] || 0;
      });
      scores[scoreKey] = Math.round((sectionScore / (sectionQuestions.length * 4)) * 100);
    });

    return scores;
  };

  // Speak current question
  useEffect(() => {
    if (currentStep === 'assessment' && voiceEnabled) {
      const currentQ = sleepQuestions[currentQuestionIndex];
      const questionText = `Question ${currentQuestionIndex + 1} of ${sleepQuestions.length}. ${currentQ.text}`;
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
              🌙 AI <span className="text-accent">Sleep Assessment</span>
            </h1>
            
            <p className="text-[16px] text-[#9ca3af] mb-4 leading-relaxed">
              Let's understand your sleep habits and identify areas that may affect your sleep quality.
            </p>
            
            <p className="text-[16px] text-[#9ca3af] mb-12 leading-relaxed">
              This assessment takes about 5–7 minutes.
            </p>

            <div className="bg-bg-card border border-white/10 rounded-2xl p-8 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12a8 8 0 0 1 16 0c0 4-4 6-8 6s-8-2-8-6"/>
                  <path d="M12 2v4"/>
                </svg>
              </div>
              <p className="text-[14px] text-[#9ca3af]">
                Our AI sleep coach will guide you through each question with a friendly voice.
              </p>
            </div>

            <button
              onClick={() => setCurrentStep('assessment')}
              className="bg-gradient-to-br from-accent to-accent-2 text-black text-[16px] font-bold px-8 py-4 rounded-xl font-sans transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            >
              Start Sleep Assessment
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Assessment Screen
  if (currentStep === 'assessment') {
    const currentQ = sleepQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / sleepQuestions.length) * 100;
    const options = answerOptions[currentQ.type] || answerOptions.frequency;

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
              <span className="text-[14px] text-[#9ca3af]">{currentQ.section}</span>
              <span className="text-[14px] text-accent font-medium">{currentQuestionIndex + 1} of {sleepQuestions.length}</span>
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
                    <path d="M2 12a8 8 0 0 1 16 0c0 4-4 6-8 6s-8-2-8-6"/>
                    <path d="M12 2v4"/>
                  </svg>
                </div>
                <span className="text-[14px] text-accent font-medium">AI Sleep Assistant</span>
              </div>

              <p className="text-[20px] text-white text-center leading-relaxed font-medium">
                {currentQ.text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Answer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((option) => (
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
            <h1 className="text-[32px] font-bold text-center mb-12">
              Your <span className="text-accent">Sleep</span> Results
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-bg-card border border-white/10 rounded-2xl p-6 text-center"
              >
                <h3 className="text-[16px] font-bold text-white mb-2">Overall Sleep Score</h3>
                <div className="text-[36px] font-black text-accent mb-2">{scores.overall}</div>
                <p className="text-[12px] text-[#9ca3af]">out of 100</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-bg-card border border-white/10 rounded-2xl p-6 text-center"
              >
                <h3 className="text-[16px] font-bold text-white mb-2">Sleep Quality</h3>
                <div className="text-[36px] font-black text-accent mb-2">{scores.quality}</div>
                <p className="text-[12px] text-[#9ca3af]">Quality Score</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-bg-card border border-white/10 rounded-2xl p-6 text-center"
              >
                <h3 className="text-[16px] font-bold text-white mb-2">Sleep Apnea Risk</h3>
                <div className="text-[36px] font-black text-accent mb-2">{scores.disorderRisk}</div>
                <p className="text-[12px] text-[#9ca3af]">Apnea Score</p>
              </motion.div>
            </div>

            <div className="bg-bg-card border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-[18px] font-bold text-white mb-4">AI Summary</h3>
              <p className="text-[15px] text-[#9ca3af] leading-relaxed">
                Based on your responses, your sleep quality appears to be {scores.quality < 50 ? 'fair' : 'good'}. 
                You may have difficulty {scores.hygiene < 50 ? 'falling asleep' : 'maintaining sleep'} and 
                experience {scores.fatigue > 50 ? 'daytime tiredness' : 'good energy levels'}. 
                Improving your bedtime routine and reducing evening screen time could help improve your sleep.
              </p>
            </div>

            <div className="bg-bg-card border border-white/10 rounded-2xl p-8">
              <h3 className="text-[18px] font-bold text-white mb-4">Recommendations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Maintain a consistent sleep schedule',
                  'Reduce screen time before bed',
                  'Limit caffeine in the evening',
                  'Exercise regularly',
                  'Practice relaxation techniques',
                  'Keep your bedroom cool, dark, and quiet',
                ].map((rec, i) => (
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

export default SleepAssessment;