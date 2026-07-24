import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Stroke Assessment Questions
const strokeQuestions = [
  // Section 1: Personal Information
  { id: 1, section: 'Personal Information', text: 'What is your age?', type: 'age' },
  { id: 2, section: 'Personal Information', text: 'What is your biological sex?', type: 'sex' },
  { id: 3, section: 'Personal Information', text: 'Enter your height', type: 'height' },
  { id: 4, section: 'Personal Information', text: 'Enter your weight', type: 'weight' },
  
  // Section 2: Medical History
  { id: 5, section: 'Medical History', text: 'Have you ever been diagnosed with high blood pressure?', type: 'yesno' },
  { id: 6, section: 'Medical History', text: 'Have you ever been diagnosed with diabetes?', type: 'diabetes' },
  { id: 7, section: 'Medical History', text: 'Have you ever been diagnosed with heart disease?', type: 'yesno' },
  { id: 8, section: 'Medical History', text: 'Have you ever experienced a stroke or mini-stroke (TIA)?', type: 'yesno' },
  { id: 9, section: 'Medical History', text: 'Does your family have a history of stroke?', type: 'yesno' },
  
  // Section 3: Lifestyle
  { id: 10, section: 'Lifestyle', text: 'Do you smoke?', type: 'smoke' },
  { id: 11, section: 'Lifestyle', text: 'How often do you drink alcohol?', type: 'alcohol' },
  { id: 12, section: 'Lifestyle', text: 'How physically active are you?', type: 'activity' },
  { id: 13, section: 'Lifestyle', text: 'How many servings of fruits and vegetables do you eat daily?', type: 'diet' },
  { id: 14, section: 'Lifestyle', text: 'How often do you eat fast food?', type: 'fastfood' },
  
  // Section 4: Health Conditions
  { id: 15, section: 'Health Conditions', text: 'Do you have high cholesterol?', type: 'yesno' },
  { id: 16, section: 'Health Conditions', text: 'Have you been diagnosed with kidney disease?', type: 'yesno' },
  { id: 17, section: 'Health Conditions', text: 'Have you been diagnosed with atrial fibrillation?', type: 'yesno' },
  { id: 18, section: 'Health Conditions', text: 'Have you been diagnosed with sleep apnea?', type: 'yesno' },
  
  // Section 5: Symptoms
  { id: 19, section: 'Symptoms', text: 'Have you recently experienced weakness on one side of your body?', type: 'symptom' },
  { id: 20, section: 'Symptoms', text: 'Have you recently experienced difficulty speaking?', type: 'symptom' },
  { id: 21, section: 'Symptoms', text: 'Have you recently experienced sudden vision loss?', type: 'symptom' },
  { id: 22, section: 'Symptoms', text: 'Have you recently experienced dizziness or loss of balance?', type: 'symptom' },
  { id: 23, section: 'Symptoms', text: 'Have you recently experienced an unusually severe headache?', type: 'symptom' },
  
  // Section 6: General Health
  { id: 24, section: 'General Health', text: 'How would you describe your stress level?', type: 'stress' },
  { id: 25, section: 'General Health', text: 'How many hours do you usually sleep?', type: 'sleep' },
  { id: 26, section: 'General Health', text: 'Do you regularly monitor your blood pressure?', type: 'yesno' },
  { id: 27, section: 'General Health', text: 'Do you take your prescribed medicines regularly?', type: 'meds' },
  { id: 28, section: 'General Health', text: 'How often do you visit your doctor?', type: 'doctor' },
  
  // Section 7: Overall Health
  { id: 29, section: 'Overall Health', text: 'How would you rate your overall health?', type: 'health' },
  { id: 30, section: 'Overall Health', text: 'Is there anything else about your health you\'d like to share?', type: 'text' },
];

const answerOptions = {
  age: [
    { value: 0, label: 'Under 18', emoji: '👶' },
    { value: 1, label: '18–30', emoji: '🧑' },
    { value: 2, label: '31–40', emoji: '👨' },
    { value: 3, label: '41–50', emoji: '👨‍🦳' },
    { value: 4, label: '51–60', emoji: '🧓' },
    { value: 5, label: '61–70', emoji: '👴' },
    { value: 6, label: 'Over 70', emoji: '🧓' },
  ],
  sex: [
    { value: 0, label: 'Male', emoji: '🚹' },
    { value: 1, label: 'Female', emoji: '🚺' },
    { value: 2, label: 'Prefer not to say', emoji: '⚪' },
  ],
  yesno: [
    { value: 0, label: 'No', emoji: '✅' },
    { value: 1, label: 'Yes', emoji: '⚠️' },
    { value: 2, label: 'Not Sure', emoji: '❓' },
  ],
  diabetes: [
    { value: 0, label: 'No', emoji: '✅' },
    { value: 1, label: 'Yes', emoji: '⚠️' },
    { value: 2, label: 'Prediabetes', emoji: '⚡' },
    { value: 3, label: 'Not Sure', emoji: '❓' },
  ],
  smoke: [
    { value: 0, label: 'Never', emoji: '🚭' },
    { value: 1, label: 'Former Smoker', emoji: '🚬' },
    { value: 2, label: 'Occasionally', emoji: '🌬️' },
    { value: 3, label: 'Daily', emoji: '🚬' },
  ],
  alcohol: [
    { value: 0, label: 'Never', emoji: '🚻' },
    { value: 1, label: 'Occasionally', emoji: '🍷' },
    { value: 2, label: 'Weekly', emoji: '🍺' },
    { value: 3, label: 'Daily', emoji: '🍸' },
  ],
  activity: [
    { value: 0, label: 'Very Active', emoji: '🏃‍♂️' },
    { value: 1, label: 'Moderately Active', emoji: '🚶‍♂️' },
    { value: 2, label: 'Lightly Active', emoji: '🧘' },
    { value: 3, label: 'Mostly Inactive', emoji: '🛋️' },
  ],
  diet: [
    { value: 0, label: 'None', emoji: '🍟' },
    { value: 1, label: '1–2', emoji: '🥗' },
    { value: 2, label: '3–4', emoji: '🥗' },
    { value: 3, label: '5+', emoji: '🥗' },
  ],
  fastfood: [
    { value: 0, label: 'Rarely', emoji: '🥗' },
    { value: 1, label: 'Weekly', emoji: '🍔' },
    { value: 2, label: 'Several Times Weekly', emoji: '🍟' },
    { value: 3, label: 'Daily', emoji: '🍕' },
  ],
  symptom: [
    { value: 0, label: 'No', emoji: '✅' },
    { value: 1, label: 'Yes', emoji: '⚠️' },
  ],
  stress: [
    { value: 0, label: 'Low', emoji: '😌' },
    { value: 1, label: 'Moderate', emoji: '😐' },
    { value: 2, label: 'High', emoji: '😟' },
    { value: 3, label: 'Very High', emoji: '😣' },
  ],
  sleep: [
    { value: 0, label: 'Less than 5', emoji: '😴' },
    { value: 1, label: '5–6', emoji: '😴' },
    { value: 2, label: '7–8', emoji: '😴' },
    { value: 3, label: 'More than 8', emoji: '😴' },
  ],
  meds: [
    { value: 0, label: 'Always', emoji: '💊' },
    { value: 1, label: 'Sometimes', emoji: '⏰' },
    { value: 2, label: 'Rarely', emoji: '⏭️' },
    { value: 3, label: 'Not Applicable', emoji: '🚫' },
  ],
  doctor: [
    { value: 0, label: 'Yearly', emoji: '📅' },
    { value: 1, label: 'Occasionally', emoji: '📆' },
    { value: 2, label: 'Rarely', emoji: '📉' },
    { value: 3, label: 'Never', emoji: '🚫' },
  ],
  health: [
    { value: 3, label: 'Excellent', emoji: '🌟' },
    { value: 2, label: 'Good', emoji: '😊' },
    { value: 1, label: 'Fair', emoji: '😐' },
    { value: 0, label: 'Poor', emoji: '😔' },
  ],
};

const emergencySymptoms = [19, 20, 21, 22]; // weakness, speaking, vision, dizziness

const StrokeAssessment = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState('warning');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voicePaused, setVoicePaused] = useState(false);
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
    const currentQ = strokeQuestions[currentQuestionIndex];
    
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: value
    }));

    // Check for emergency symptoms
    if (emergencySymptoms.includes(currentQ.id) && value === 1) {
      setCurrentStep('emergency');
      return;
    }

    if (currentQuestionIndex < strokeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('results');
    }
  };

  // Calculate scores
  const calculateScores = () => {
    const scores = {
      overall: 0,
      risk: 0,
      lifestyle: 0,
      medical: 0,
      bmi: 0,
    };

    // Calculate overall risk score
    let totalScore = 0;
    strokeQuestions.forEach(q => {
      if (q.type !== 'text' && q.type !== 'height' && q.type !== 'weight') {
        totalScore += answers[q.id] || 0;
      }
    });
    scores.overall = Math.round((totalScore / 75) * 100); // Max score ~75

    // Calculate BMI
    const height = answers[3] || 0;
    const weight = answers[4] || 0;
    if (height > 0 && weight > 0) {
      const heightInM = height / 100;
      scores.bmi = Math.round(weight / (heightInM * heightInM));
    }

    return scores;
  };

  // Speak current question
  useEffect(() => {
    if (currentStep === 'assessment' && voiceEnabled) {
      const currentQ = strokeQuestions[currentQuestionIndex];
      const questionText = `Question ${currentQuestionIndex + 1} of ${strokeQuestions.length}. ${currentQ.text}`;
      speak(questionText);
    }
  }, [currentQuestionIndex, currentStep, voiceEnabled, voicePaused]);

  // Warning Screen
  if (currentStep === 'warning') {
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
              ⚠️ Important Notice
            </h1>
            
            <p className="text-[16px] text-[#9ca3af] mb-8 leading-relaxed">
              This assessment estimates your stroke risk based on your responses. It is NOT a medical diagnosis. 
              If you are experiencing sudden weakness, difficulty speaking, facial drooping, vision loss, or severe dizziness, 
              seek emergency medical care immediately.
            </p>

            <button
              onClick={() => setCurrentStep('landing')}
              className="bg-gradient-to-br from-accent to-accent-2 text-black text-[16px] font-bold px-8 py-4 rounded-xl font-sans transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            >
              I Understand
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

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
              🧠 Stroke Risk <span className="text-accent">Assessment</span>
            </h1>
            
            <p className="text-[16px] text-[#9ca3af] mb-4 leading-relaxed">
              Estimate your stroke risk using AI.
            </p>
            
            <p className="text-[16px] text-[#9ca3af] mb-12 leading-relaxed">
              This assessment takes approximately 5–7 minutes.
            </p>

            <div className="bg-bg-card border border-white/10 rounded-2xl p-8 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 0-5 17.6"/>
                  <path d="M12 2a10 10 0 0 1 5 17.6"/>
                  <path d="M2 12h20"/>
                </svg>
              </div>
              <p className="text-[14px] text-[#9ca3af]">
                Our AI health assistant will guide you through each question with a friendly voice.
              </p>
            </div>

            <button
              onClick={() => {
                speak("Hello. I am your AI Health Assistant. Today I'll ask you several questions about your health and lifestyle. Your answers will help estimate your stroke risk. Please answer honestly. Let's begin.");
                setCurrentStep('assessment');
              }}
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
            
            <h2 className="text-[28px] font-bold text-red-400 mb-4">🚨 Emergency Warning</h2>
            
            <p className="text-[16px] text-[#9ca3af] mb-8 leading-relaxed">
              You may be experiencing symptoms that require urgent medical attention. Please contact your local emergency services or go to the nearest emergency department immediately.
            </p>

            <div className="grid gap-4 max-w-md mx-auto">
              <a
                href="tel:911"
                className="bg-red-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-4.15-1.29 15.37 15.37 0 0 1-6.2-4.25 15.37 15.37 0 0 1-4.25-6.2A19.79 19.79 0 0 1 4 2.18 2 2 0 0 1 7.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 2.61 7.45 2 2 0 0 1 1.72 3z"/>
                </svg>
                Call Emergency (911)
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
    const currentQ = strokeQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / strokeQuestions.length) * 100;
    const options = answerOptions[currentQ.type] || answerOptions.yesno;

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
              <span className="text-[14px] text-accent font-medium">{currentQuestionIndex + 1} of {strokeQuestions.length}</span>
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
                    <path d="M12 2a10 10 0 0 0-5 17.6"/>
                    <path d="M12 2a10 10 0 0 1 5 17.6"/>
                    <path d="M2 12h20"/>
                  </svg>
                </div>
                <span className="text-[14px] text-accent font-medium">AI Health Assistant</span>
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
              Your <span className="text-accent">Stroke Risk</span> Results
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-bg-card border border-white/10 rounded-2xl p-6 text-center"
              >
                <h3 className="text-[16px] font-bold text-white mb-2">Stroke Risk Score</h3>
                <div className="text-[36px] font-black text-accent mb-2">{scores.overall}</div>
                <p className="text-[12px] text-[#9ca3af]">out of 100</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-bg-card border border-white/10 rounded-2xl p-6 text-center"
              >
                <h3 className="text-[16px] font-bold text-white mb-2">BMI</h3>
                <div className="text-[36px] font-black text-accent mb-2">{scores.bmi || '--'}</div>
                <p className="text-[12px] text-[#9ca3af]">Body Mass Index</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-bg-card border border-white/10 rounded-2xl p-6 text-center"
              >
                <h3 className="text-[16px] font-bold text-white mb-2">Risk Level</h3>
                <div className="text-[24px] font-bold text-accent mb-2">
                  {scores.overall < 30 ? 'Low' : scores.overall < 60 ? 'Moderate' : 'High'}
                </div>
                <p className="text-[12px] text-[#9ca3af]">Estimated Risk</p>
              </motion.div>
            </div>

            <div className="bg-bg-card border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-[18px] font-bold text-white mb-4">AI Summary</h3>
              <p className="text-[15px] text-[#9ca3af] leading-relaxed">
                Based on your responses, you currently appear to have a {scores.overall < 30 ? 'low' : scores.overall < 60 ? 'moderate' : 'high'} estimated risk of stroke. 
                Factors contributing to your score include {answers[5] ? 'hypertension' : 'blood pressure management'}, 
                {answers[10] > 1 ? ' smoking' : ' no smoking'}, and 
                {answers[12] < 2 ? ' good' : ' limited'} physical activity. 
                Improving these areas and consulting your healthcare provider may help reduce your overall risk.
              </p>
            </div>

            <div className="bg-bg-card border border-white/10 rounded-2xl p-8">
              <h3 className="text-[18px] font-bold text-white mb-4">Recommendations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Monitor blood pressure regularly',
                  'Exercise at least 150 minutes per week',
                  answers[10] > 0 ? 'Quit smoking' : 'Avoid smoking',
                  'Maintain a healthy weight',
                  'Limit alcohol consumption',
                  'Improve diet with more fruits and vegetables',
                  answers[6] ? 'Manage diabetes' : 'Maintain healthy blood sugar',
                  answers[15] ? 'Manage cholesterol' : 'Monitor cholesterol levels',
                  'Reduce stress',
                  'Improve sleep',
                  'Take prescribed medicines consistently',
                  'Schedule regular medical checkups',
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

export default StrokeAssessment;