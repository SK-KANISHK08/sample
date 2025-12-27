import React, { useState, useRef } from 'react';
import { 
  Upload, FileText, Mic, Play, ChevronRight, 
  Download, CheckCircle, ArrowLeft, Home, 
  Settings, User, Globe, Printer, PlayCircle 
} from 'lucide-react';
import './LandingPage.css';

export default function App() {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState('Tamil');
  const [progress, setProgress] = useState(0);
  const fileRef = useRef(null);

  // Core Logic Handlers
  const handleProcess = () => {
    let val = 0;
    const interval = setInterval(() => {
      val += 1;
      setProgress(val);
      if (val >= 67) { // Matches your specific design requirements
        clearInterval(interval);
        setTimeout(() => setStep(4), 1000);
      }
    }, 50);
  };

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = lang === 'Tamil' ? 'ta-IN' : 'en-US';
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="bureau-container">
      {/* Left Sidebar - Consistent across laptop/desktop view */}
      <div className="hero-side">
        <div className="logo-box">
          <div className="logo-icon"><FileText size={24} /></div>
          <div><h1>BureauClear AI</h1><p>Your Bureaucracy Translator</p></div>
        </div>
        <div className="hero-main-content">
          <h2>Simplifying Government Documents, Step-by-Step</h2>
          <p>We convert complex PDFs into easy steps with voice guidance in your language.</p>
        </div>
        <div className="footer-label">AI for Citizens - Easy, Accessible, Helpful</div>
      </div>

      {/* Right Action Side - Dynamic Page Switcher */}
      <div className="action-side">
        <nav className="top-nav">
          <div className="nav-links"><span>Home</span><span>Pricing</span><span>Applets</span></div>
          <button className="btn-login" onClick={() => setStep(6)}>Log IN</button>
        </nav>

        <div className="content-viewport">
          {/* PAGE 1: INITIAL LANDING */}
          {step === 1 && (
            <div className="card-ui animate-fade">
              <div className="hero-illustration">
                <img src="https://img.freepik.com/free-vector/legal-advisers-concept-illustration_114360-20703.jpg" alt="hero" />
              </div>
              <div className="btn-group">
                <button className="btn-primary" onClick={() => setStep(2)}><Upload size={18}/> Upload Document</button>
                <button className="btn-outline" onClick={() => speak("Demo loading")}>Try Demo Document</button>
              </div>
              <div className="lang-preview">🇮🇳 Tamil | English | Hindi | Local Dialect</div>
            </div>
          )}

          {/* PAGE 2: LANGUAGE SELECTION */}
          {step === 2 && (
            <div className="card-ui animate-fade">
              <button className="back-link" onClick={() => setStep(1)}><ArrowLeft size={16}/> Back</button>
              <h3>Select Language Output</h3>
              <div className="grid-3">
                {['Tamil', 'English', 'Hindi'].map(l => (
                  <div key={l} className={`option-item ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>
                    <div className="icon-circle"><Globe size={20}/></div>
                    <p>{l}</p>
                  </div>
                ))}
              </div>
              <button className="btn-primary w-100 mt-20" onClick={() => setStep(3)}>Next Step <ChevronRight size={18}/></button>
            </div>
          )}

          {/* PAGE 4: PROCESSING & UPLOAD */}
          {step === 3 && (
            <div className="card-ui animate-fade">
              <h3>Upload Document (PDF/DOC)</h3>
              <div className="drop-zone" onClick={() => fileRef.current.click()}>
                <Upload size={40} color="#0056b3"/>
                <p>Choose File</p>
                <input type="file" ref={fileRef} hidden />
              </div>
              <div className="info-row">
                <div className="lang-tag">🇮🇳 {lang} Local Dialect</div>
                <div className="icon-row"><span>📄 Pension</span><span>🏥 Health</span></div>
              </div>
              <button className="btn-primary w-100" onClick={handleProcess} disabled={progress > 0}>
                <Mic size={18}/> {progress > 0 ? 'Analyzing...' : 'Process Document'}
              </button>
              <div className="progress-bar"><div className="fill" style={{width: `${progress}%`}}></div></div>
              <p className="center-text">{progress}% Completed</p>
            </div>
          )}

          {/* PAGE 4: SIMPLIFIED STEPS (Matches Image 3/4) */}
          {step === 4 && (
            <div className="card-ui animate-fade wide-card">
              <div className="flex-between">
                <h3>Pension Scheme Application</h3>
                <span className="badge">Simplified Steps</span>
              </div>
              <div className="step-list">
                <div className="step-card" onClick={() => speak("Bring Aadhaar Card and Ration Card")}>
                  <div className="step-num">1</div>
                  <p>Bring Aadhaar Card & Ration Card</p>
                  <ChevronRight size={16}/>
                </div>
                <div className="step-card">
                  <div className="step-num">2</div>
                  <p>Go to the Taluk Office</p>
                  <ChevronRight size={16}/>
                </div>
                <div className="step-card">
                  <div className="step-num">3</div>
                  <p>Submit Form at Counter 3</p>
                  <ChevronRight size={16}/>
                </div>
              </div>
              <button className="btn-primary w-100 mt-20" onClick={() => setStep(5)}>View Voice Guide</button>
            </div>
          )}

          {/* PAGE 5: VOICE GUIDE & PRINTING */}
          {step === 5 && (
            <div className="card-ui animate-fade">
              <h3><Mic size={20}/> Play Voice Guide</h3>
              <button className="btn-voice-large" onClick={() => speak("Your application requires 3 documents. Fee is zero.")}>
                <PlayCircle size={40}/>
                <span>Play Voice Guide</span>
              </button>
              <div className="details-grid">
                <div className="detail-item"><span>Time</span><p>13 Days</p></div>
                <div className="detail-item"><span>Fees</span><p>No Fees</p></div>
              </div>
              <div className="btn-group-vert">
                <button className="btn-outline w-100"><Download size={18}/> Download Guide</button>
                <button className="btn-primary w-100"><Printer size={18}/> Print Storyboard</button>
              </div>
            </div>
          )}

          {/* PAGE 6: ADMIN DASHBOARD */}
          {step === 6 && (
            <div className="card-ui animate-fade">
              <div className="dashboard-header">
                <h3>Amim Dashboard</h3>
                <Home size={18} className="clickable" onClick={() => setStep(1)}/>
              </div>
              <div className="stats-container">
                <div className="stat-box"><h4>525</h4><p>Translated</p></div>
                <div className="stat-box"><h4>1,200+</h4><p>Users</p></div>
              </div>
              <div className="recent-list">
                <label>Recent Document Types</label>
                <div className="list-item"><span>Pension</span><span>280</span></div>
                <div className="list-item"><span>Ration Card</span><span>105</span></div>
              </div>
              <button className="btn-outline w-100 mt-20" onClick={() => setStep(1)}>Start New Session</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}