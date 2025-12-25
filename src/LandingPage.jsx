import React, { useState, useRef } from 'react';
import { Upload, FileText, Mic, Globe, FolderOpen, Play, CheckCircle, ChevronRight, Volume2 } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  // Navigation State: 'language' or 'upload'
  const [currentPage, setCurrentPage] = useState('language');
  const [selectedLang, setSelectedLang] = useState('English');
  
  // Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Ready");
  const fileInputRef = useRef(null);

  const speak = (text, langCode) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = langCode || (selectedLang === 'Tamil' ? 'ta-IN' : selectedLang === 'Hindi' ? 'hi-IN' : 'en-US');
    window.speechSynthesis.speak(msg);
  };

  const handleProcess = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setProgress(0);
    setStatus("Reading PDF...");
    speak("Processing your document. Please stay on this page.");

    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setStatus("Task Completed!");
          speak("Document processed successfully. Check your tasks below.");
          return 100;
        }
        if (prev === 40) setStatus("Translating to " + selectedLang + "...");
        return prev + 5;
      });
    }, 150);
  };

  // --- PAGE 1: LANGUAGE SELECTION ---
  const LanguageSelection = () => (
    <div className="action-section">
      <div className="upload-card">
        <h3 className="center-text">Choose Your Language</h3>
        <p className="center-text subtitle">Select to hear a greeting</p>
        
        <div className="lang-grid-display">
          {[
            { name: 'Tamil', native: 'தமிழ்', img: 'https://flagpedia.net/data/flags/h80/in.png', greet: 'வணக்கம்', code: 'ta-IN' },
            { name: 'English', native: 'English', img: 'https://flagpedia.net/data/flags/h80/us.png', greet: 'Hello', code: 'en-US' },
            { name: 'Hindi', native: 'हिन्दी', img: 'https://flagpedia.net/data/flags/h80/in.png', greet: 'नमस्ते', code: 'hi-IN' }
          ].map((lang) => (
            <div 
              key={lang.name}
              className={`lang-card-item ${selectedLang === lang.name ? 'active' : ''}`}
              onClick={() => {
                setSelectedLang(lang.name);
                speak(lang.greet, lang.code);
              }}
            >
              <img src={lang.img} alt={lang.name} className="flag-img" />
              <h4>{lang.native}</h4>
              <p>{lang.name}</p>
            </div>
          ))}
        </div>

        <button className="btn-process" onClick={() => setCurrentPage('upload')}>
          Next Step <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  // --- PAGE 2: DOCUMENT UPLOAD ---
  const DocumentUpload = () => (
    <div className="action-section">
      <div className="upload-card">
        <div className="card-header">
            <button className="btn-back" onClick={() => setCurrentPage('language')}>← Back</button>
            <h3>{status}</h3>
        </div>
        
        <div className="file-selector" onClick={() => fileInputRef.current.click()}>
          <div className="select-box">
            <Upload size={20} color="#007bff" />
            <span>Click to Select PDF</span>
          </div>
        </div>

        <div className="doc-type-grid">
            <div className="type-column">
              <label>Document Type</label>
              <div className="type-card selected"><FileText size={18} /> Pension</div>
            </div>
            <div className="icon-features">
               <div className="feat-item"><div className="icon-bg yellow">📄</div><span>Ration</span></div>
               <div className="feat-item"><div className="icon-bg green">🏥</div><span>Health</span></div>
            </div>
        </div>

        <button className={`btn-process ${isProcessing ? 'loading' : ''}`} onClick={handleProcess} disabled={isProcessing}>
          <Mic size={20} /> {isProcessing ? "Processing..." : "Process Document"}
        </button>

        <div className="progress-area">
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${progress}%`}}></div>
          </div>
          <div className="progress-status">
            <button className="btn-listen" onClick={() => speak("Please upload your document to begin.")}>
                <Play size={16} /> Listen!
            </button>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bureau-container">
      {/* Left side remains the same for both pages */}
      <div className="hero-section">
        <div className="logo-area">
          <div className="logo-icon">📄</div>
          <div>
            <h1>BureauClear AI</h1>
            <p className="subtitle">Your Bureaucracy Translator</p>
          </div>
        </div>
        <div className="hero-content">
          <h2>Simplifying Government Documents</h2>
          <p>We convert complex paperwork into easy steps with voice guidance in <b>{selectedLang}</b>.</p>
        </div>
        <div className="footer-tag">AI for Citizens - Easy, Accessible, Helpful</div>
      </div>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={() => speak("File ready")} />
      
      {/* Right side switches based on state */}
      {currentPage === 'language' ? <LanguageSelection /> : <DocumentUpload />}
    </div>
  );
};

export default LandingPage;