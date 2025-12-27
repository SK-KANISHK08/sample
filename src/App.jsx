import React, { useState } from 'react';
import { Button, Card, Radio, Typography, Space, Layout, Upload, ConfigProvider, List, Tag } from 'antd';
import { 
  ArrowRightOutlined, ArrowLeftOutlined, AudioOutlined, 
  EyeInvisibleOutlined, TranslationOutlined, RobotOutlined, 
  InboxOutlined, FormOutlined, FileTextOutlined, CheckCircleFilled
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState('en');
  const [userType, setUserType] = useState(null);

  const translations = {
    en: { 
        next: "Next", back: "Back", start: "Get Started", 
        selectLang: "Select Your Language", 
        question: "How can we assist you today?",
        opt1: "Simple Summary", opt1Desc: "Reduce 20 pages to 1 easy page.",
        opt2: "Voice Assistant", opt2Desc: "Listen to the document audio.",
        opt3: "Visual Storyboard", opt3Desc: "Step-by-step images of actions.",
        opt4: "Fill Up Form", opt4Desc: "AI helps you fill government forms.",
        formListTitle: "Select a Form to Fill",
        forms: ["Aadhar Card Application", "PAN Card Request", "Voter ID Registration", "Ration Card Update", "Income Certificate"],
        uploadTitle: "Upload Document", uploadHint: "Drag your Government PDF here",
        active: "Desktop Accessibility: ON"
    },
    ta: { 
        next: "அடுத்து", back: "பின்னால்", start: "தொடங்கவும்", 
        selectLang: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்", 
        question: "இன்று நாங்கள் உங்களுக்கு எப்படி உதவலாம்?",
        opt1: "எளிய சுருக்கம்", opt1Desc: "20 பக்கங்களை 1 எளிய பக்கமாகக் குறைக்கவும்.",
        opt2: "குரல் உதவியாளர்", opt2Desc: "ஆவணத்தின் ஆடியோவைக் கேளுங்கள்.",
        opt3: "காட்சி கதைப்பலகை", opt3Desc: "செயல்களின் படிப்படியான படங்கள்.",
        opt4: "படிவம் நிரப்பவும்", opt4Desc: "அரசு படிவங்களை நிரப்ப AI உதவும்.",
        formListTitle: "நிரப்ப வேண்டிய படிவத்தைத் தேர்ந்தெடுக்கவும்",
        forms: ["ஆதார் கார்டு விண்ணப்பம்", "பான் கார்டு கோரிக்கை", "வாக்காளர் அடையாள அட்டை", "ரேஷன் கார்டு புதுப்பிப்பு", "வருமான சான்றிதழ்"],
        uploadTitle: "ஆவணத்தைப் பதிவேற்றவும்", uploadHint: "உங்கள் அரசு PDF-ஐ இங்கே இழுக்கவும்",
        active: "டெஸ்க்டாப் அணுகல்தன்மை: உள்ளது"
    },
    hi: { 
        next: "अगला", back: "पीछे", start: "शुरू करें", 
        selectLang: "अपनी भाषा चुनें", 
        question: "आज हम आपकी कैसे सहायता कर सकते हैं?",
        opt1: "सरल सारांश", opt1Desc: "20 पृष्ठों को 1 आसान पृष्ठ में बदलें।",
        opt2: "वॉइस असिस्टेंट", opt2Desc: "दस्तावेज़ का ऑडियो सुनें।",
        opt3: "विजुअल स्टोरीबोर्ड", opt3Desc: "कार्यों के चरण-दर-चरण चित्र।",
        opt4: "फॉर्म भरें", opt4Desc: "AI आपको सरकारी फॉर्म भरने में मदद करेगा।",
        formListTitle: "भरने के लिए एक फॉर्म चुनें",
        forms: ["आधार कार्ड आवेदन", "पैन कार्ड अनुरोध", "मतदाता पहचान पत्र पंजीकरण", "राशन कार्ड अपडेट", "आय प्रमाण पत्र"],
        uploadTitle: "दस्तावेज़ अपलोड करें", uploadHint: "अपना सरकारी PDF यहाँ खींचें",
        active: "डेस्कटॉप एक्सेसिबिलिटी: चालू"
    }
  };

  const t = translations[language];

  // --- Styled Components (Glassmorphism) ---
  const mainWrapperStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    display: 'flex',
    flexDirection: 'column'
  };

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(10px)',
    borderRadius: '30px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '1100px',
    margin: 'auto'
  };

  // --- Page Renderers ---

  const Page1Landing = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
      <div style={{ flex: 1 }}>
        <Tag color="blue" icon={<CheckCircleFilled />} style={{ marginBottom: '15px' }}>Trusted AI Assistant</Tag>
        <Title style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1 }}>BUREAUCRACY <span style={{ color: '#1890ff' }}>AI</span></Title>
        <Text style={{ fontSize: '24px', color: '#434343', display: 'block', marginTop: '20px' }}>
          We bridge the gap between complex legal documents and common citizens.
        </Text>
      </div>
      <div style={{ flex: 1, textAlign: 'right' }}>
  <img 
    src="https://illustrations.popsy.co/blue/manager.svg" 
    alt="Bureaucracy AI Manager Illustration" 
    style={{ 
      width: '100%', 
      maxWidth: '500px', 
      height: 'auto',
      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' 
    }} 
  />
</div>
    </div>
  );

  const Page2Language = () => (
    <div style={{ textAlign: 'center' }}>
      <Title level={2}>{t.selectLang}</Title>
      <Radio.Group value={language} onChange={(e) => setLanguage(e.target.value)} size="large" style={{ marginTop: '30px' }}>
        <Space size="large">
          {['en', 'ta', 'hi'].map(lang => (
            <Radio.Button key={lang} value={lang} style={{ height: '100px', width: '200px', fontSize: '24px', lineHeight: '100px', borderRadius: '20px' }}>
              {lang === 'en' ? 'English' : lang === 'ta' ? 'தமிழ்' : 'हिन्दी'}
            </Radio.Button>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );

  const Page3Options = () => (
    <div>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>{t.question}</Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {[
          { id: 'literacy', icon: <TranslationOutlined />, title: t.opt1, desc: t.opt1Desc, color: '#1890ff' },
          { id: 'blind', icon: <AudioOutlined />, title: t.opt2, desc: t.opt2Desc, color: '#52c41a' },
          { id: 'deaf', icon: <EyeInvisibleOutlined />, title: t.opt3, desc: t.opt3Desc, color: '#f5222d' },
          { id: 'fill', icon: <FormOutlined />, title: t.opt4, desc: t.opt4Desc, color: '#722ed1' }
        ].map(item => (
          <Card 
            key={item.id} hoverable 
            onClick={() => setUserType(item.id)}
            style={{ 
                borderRadius: '20px', 
                border: userType === item.id ? `3px solid ${item.color}` : '1px solid #f0f0f0',
                background: userType === item.id ? `${item.color}05` : '#fff'
            }}
          >
            <div style={{ fontSize: '40px', color: item.color }}>{item.icon}</div>
            <Title level={4}>{item.title}</Title>
            <Text type="secondary">{item.desc}</Text>
          </Card>
        ))}
      </div>
    </div>
  );

  const Page4Action = () => (
    <div style={{ textAlign: 'center' }}>
      {userType === 'fill' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Title level={3}><FormOutlined /> {t.formListTitle}</Title>
          <List
            bordered
            dataSource={t.forms}
            renderItem={item => (
              <List.Item style={{ background: '#fff', marginBottom: '10px', borderRadius: '10px', cursor: 'pointer' }} className="form-item-hover">
                <Space><FileTextOutlined style={{ color: '#1890ff' }} /> <Text strong>{item}</Text></Space>
                <Button type="link">Fill Now</Button>
              </List.Item>
            )}
            style={{ marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}
          />
        </motion.div>
      ) : (
        <>
          <Title level={2}>{t.uploadTitle}</Title>
          <Upload.Dragger style={{ background: '#fff', borderRadius: '20px', padding: '60px' }}>
            <p className="ant-upload-drag-icon"><InboxOutlined style={{ fontSize: '64px' }} /></p>
            <Title level={4}>{t.uploadHint}</Title>
          </Upload.Dragger>
        </>
      )}
    </div>
  );

  const pages = [<Page1Landing />, <Page2Language />, <Page3Options />, <Page4Action />];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff', borderRadius: 15 } }}>
      <div style={mainWrapperStyle}>
        <Header style={{ background: 'transparent', display: 'flex', justifyContent: 'space-between', padding: '20px 60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <RobotOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
            <b style={{ fontSize: '24px', color: '#001529' }}>BUREAUCRACY AI</b>
          </div>
          <Text strong style={{ color: '#1890ff' }}>{t.active}</Text>
        </Header>

        <Content style={{ padding: '0 50px', display: 'flex', alignItems: 'center' }}>
          <motion.div style={glassCardStyle}>
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}>
                {pages[currentStep]}
              </motion.div>
            </AnimatePresence>

            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
              <Button size="large" shape="round" icon={<ArrowLeftOutlined />} onClick={() => setCurrentStep(prev => prev - 1)} disabled={currentStep === 0} style={{ width: '180px', height: '50px' }}>
                {t.back}
              </Button>
              <Button size="large" type="primary" shape="round" onClick={() => setCurrentStep(prev => prev + 1)} disabled={currentStep === pages.length - 1} style={{ width: '180px', height: '50px' }}>
                {currentStep === 0 ? "Get Started" : t.next} <ArrowRightOutlined />
              </Button>
            </div>
          </motion.div>
        </Content>
      </div>
    </ConfigProvider>
  );
};

export default App;