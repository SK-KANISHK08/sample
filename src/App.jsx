import React, { useState } from 'react';
import { Layout, ConfigProvider, Button, Space, Typography, message } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, RobotOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';

// Import your split files
import LandingPage from './components/LandingPage';
import LanguageSelection from './components/LanguageSelection';
import CategorySelection from './components/CategorySelection';
import SummaryAction from './components/SummaryAction';
import AudioAction from './components/AudioAction';
import FormFillAction from './components/FormFillAction';

const { Header, Content } = Layout;
const { Text } = Typography;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState('en');
  const [userType, setUserType] = useState(null); // 'literacy', 'blind', or 'fill'
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const translations = {
    en: { next: "Next", back: "Back", start: "Get Started", active: "Desktop Ready", uploadTitle: "Upload Document", opt1: "Summary", opt2: "Audio", opt4: "Form Fill", question: "How can we assist you?", selectLang: "Select Language" },
    ta: { next: "அடுத்து", back: "பின்னால்", start: "தொடங்க", active: "இயக்கத்தில் உள்ளது", uploadTitle: "பதிவேற்றவும்", opt1: "சுருக்கம்", opt2: "குரல்", opt4: "படிவம்", question: "நாங்கள் எப்படி உதவலாம்?", selectLang: "மொழியைத் தேர்ந்தெடுக்கவும்" },
    hi: { next: "अगला", back: "पीछे", start: "शुरू करें", active: "डेस्कटॉप सक्रिय", uploadTitle: "अपलोड करें", opt1: "सारांश", opt2: "वॉइस", opt4: "फॉर्म", question: "हम कैसे मदद कर सकते हैं?", selectLang: "भाषा चुनें" }
  };

  const t = translations[language];

  // Logic to determine which "Action" page to show based on Category Selection
  const renderActionPage = () => {
    if (userType === 'literacy') return <SummaryAction file={file} setFile={setFile} summary={summary} loading={loading} setSummary={setSummary} language={language} t={t} />;
    if (userType === 'blind') return <AudioAction file={file} setFile={setFile} language={language} t={t} />;
    if (userType === 'fill') return <FormFillAction language={language} t={t} />;
    return <div>Please go back and select a category.</div>;
  };

  const pages = [
    <LandingPage />,                               // Step 0
    <LanguageSelection language={language} setLanguage={setLanguage} t={t} />, // Step 1
    <CategorySelection setUserType={setUserType} setCurrentStep={setCurrentStep} t={t} />, // Step 2
    renderActionPage()                             // Step 3
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff', borderRadius: 12 } }}>
      <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Header style={{ background: 'transparent', display: 'flex', justifyContent: 'space-between', padding: '0 60px' }}>
          <Space><RobotOutlined style={{ color: '#1890ff', fontSize: '24px' }} /><b>BUREAUCRACY AI</b></Space>
          <Text strong style={{ color: '#1890ff' }}>{t.active}</Text>
        </Header>

        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '1100px', height: '80vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
            
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <AnimatePresence mode="wait">
                <motion.div key={currentStep} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  {pages[currentStep]}
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <Button size="large" icon={<ArrowLeftOutlined />} onClick={() => setCurrentStep(prev => prev - 1)} disabled={currentStep === 0}>
                {t.back}
              </Button>
              
              {/* Hide Next button on the last step or if no userType selected in Step 2 */}
              {currentStep < 3 && (
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={currentStep === 2 && !userType}
                >
                  {currentStep === 0 ? t.start : t.next} <ArrowRightOutlined />
                </Button>
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;