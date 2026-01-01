import React, { useState } from 'react';
import { Button, Card, Radio, Typography, Space, Layout, Upload, ConfigProvider, List, Tag, message } from 'antd';
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
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
const [filePreview, setFilePreview] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);

  const guideData = {
    en: {
      "Aadhar Card Application": { vid: "https://www.youtube.com/embed/S2pEUPB9D-o", img: "https://images.sampleforms.com/wp-content/uploads/2017/03/Aadhar-Card-Application-Form.jpg" },
      "PAN Card Request": { vid: "https://www.youtube.com/embed/69C44H6M9Fw", img: "https://www.pdffiller.com/preview/100/381/100381667.png" },
      "Voter ID Registration": { vid: "https://www.youtube.com/embed/dQw4w9WgXcQ", img: "https://via.placeholder.com/400x500?text=Voter+ID+Sample+EN" }
    },
    ta: {
      "ஆதார் கார்டு விண்ணப்பம்": { vid: "https://www.youtube.com/embed/E-6R87m_M-I", img: "https://via.placeholder.com/400x500?text=Tamil+Aadhar+Sample" },
      "பான் கார்டு கோரிக்கை": { vid: "https://www.youtube.com/embed/8-9-oF-m69M", img: "https://via.placeholder.com/400x500?text=Tamil+PAN+Sample" },
      "வாக்காளர் அடையாள அட்டை": { vid: "https://www.youtube.com/embed/dQw4w9WgXcQ", img: "https://via.placeholder.com/400x500?text=Voter+ID+Tamil" }
    },
    hi: {
      "आधार कार्ड आवेदन": { vid: "https://www.youtube.com/embed/RkS_jXl0AQU", img: "https://via.placeholder.com/400x500?text=Hindi+Aadhar+Sample" },
      "पैन कार्ड अनुरोध": { vid: "https://www.youtube.com/embed/m7W6-p9XW1A", img: "https://via.placeholder.com/400x500?text=Hindi+PAN+Sample" },
      "मतदाता पहचान पत्र पंजीकरण": { vid: "https://www.youtube.com/embed/dQw4w9WgXcQ", img: "https://via.placeholder.com/400x500?text=Voter+ID+Hindi" }
    }
  };

  const translations = {
    en: { next: "Next", back: "Back", start: "Get Started", selectLang: "Select Language", question: "How can we assist you?", opt1: "Summary", opt1Desc: "20 pages to 1.", opt2: "Voice", opt2Desc: "Listen to audio.", opt3: "Visual", opt3Desc: "Step-by-step images.", opt4: "Form Fill", opt4Desc: "AI helps you fill.", formListTitle: "Select Form", forms: ["Aadhar Card Application", "PAN Card Request", "Voter ID Registration", "Ration Card Update", "Income Certificate"], uploadTitle: "Upload Document", uploadHint: "Drag PDF here", active: "Desktop Ready", processing: "Analyzing...", referenceTitle: "Guide" },
    ta: { next: "அடுத்து", back: "பின்னால்", start: "தொடங்க", selectLang: "மொழியைத் தேர்ந்தெடுக்கவும்", question: "நாங்கள் எப்படி உதவலாம்?", opt1: "சுருக்கம்", opt1Desc: "எளிய பக்கம்.", opt2: "குரல்", opt2Desc: "ஆடியோ கேளுங்கள்.", opt3: "காட்சி", opt3Desc: "படிப்படியான படங்கள்.", opt4: "படிவம்", opt4Desc: "AI உதவும்.", formListTitle: "படிவத்தைத் தேர்வு செய்க", forms: ["ஆதார் கார்டு விண்ணப்பம்", "பான் கார்டு கோரிக்கை", "வாக்காளர் அடையாள அட்டை", "ரேஷன் கார்டு புதுப்பிப்பு", "வருமான சான்றிதழ்"], uploadTitle: "பதிவேற்றவும்", uploadHint: "PDF இழுக்கவும்", active: "இயக்கத்தில் உள்ளது", processing: "பகுப்பாய்வு...", referenceTitle: "வழிகாட்டி" },
    hi: { next: "अगला", back: "पीछे", start: "शुरू करें", selectLang: "भाषा चुनें", question: "हम कैसे मदद कर सकते हैं?", opt1: "सारांश", opt1Desc: "1 पृष्ठ में बदलें।", opt2: "वॉइस", opt2Desc: "ऑडियो सुनें।", opt3: "विजुअल", opt3Desc: "चित्र गाइड।", opt4: "फॉर्म", opt4Desc: "AI मदद करेगा।", formListTitle: "फॉर्म चुनें", forms: ["आधार कार्ड आवेदन", "पैन कार्ड अनुरोध", "मतदाता पहचान पत्र पंजीकरण", "राशन कार्ड अपडेट", "आय प्रमाण पत्र"], uploadTitle: "अपलोड करें", uploadHint: "PDF यहाँ लाएँ", active: "डेस्कटॉप सक्रिय", processing: "विश्लेषण...", referenceTitle: "गाइड" }
  };

  const t = translations[language];

  // --- HEIGHT OPTIMIZED STYLES ---
  const mainWrapperStyle = {
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden', // Prevents body scroll
  };

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    padding: '30px 50px', 
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: '1100px',
    margin: 'auto',
    height: '80vh', // Fixed height to ensure it fits on one screen
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden'
  };

  const Page1Landing = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
      <div style={{ flex: 1.2 }}>
        <Tag color="blue" style={{ marginBottom: '10px' }}>Trusted AI</Tag>
        <Title style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1, margin: 0 }}>BUREAUCRACY <span style={{ color: '#1890ff' }}>AI</span></Title>
        <Text style={{ fontSize: '20px', color: '#434343', display: 'block', marginTop: '15px' }}>
          Bridging the gap between complex legal documents and common citizens.
        </Text>
      </div>
      <div style={{ flex: 1, textAlign: 'right' }}>
        <img src="https://illustrations.popsy.co/blue/manager.svg" alt="Manager" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
      </div>
    </div>
  );

  const Page2Language = () => (
    <div style={{ textAlign: 'center' }}>
      <Title level={3} style={{ marginBottom: '30px' }}>{t.selectLang}</Title>
      <Radio.Group value={language} onChange={(e) => { setLanguage(e.target.value); setSelectedForm(null); }}>
        <Space size="large">
          {['en', 'ta', 'hi'].map(lang => (
            <Radio.Button key={lang} value={lang} style={{ height: '80px', width: '160px', fontSize: '20px', lineHeight: '80px', borderRadius: '15px' }}>
              {lang === 'en' ? 'English' : lang === 'ta' ? 'தமிழ்' : 'हिन्दी'}
            </Radio.Button>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );

  const Page3Options = () => (
    <div style={{ width: '100%' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>{t.question}</Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        {[
          { id: 'literacy', icon: <TranslationOutlined />, title: t.opt1, desc: t.opt1Desc, color: '#1890ff' },
          { id: 'blind', icon: <AudioOutlined />, title: t.opt2, desc: t.opt2Desc, color: '#52c41a' },
          { id: 'deaf', icon: <EyeInvisibleOutlined />, title: t.opt3, desc: t.opt3Desc, color: '#f5222d' },
          { id: 'fill', icon: <FormOutlined />, title: t.opt4, desc: t.opt4Desc, color: '#722ed1' }
        ].map(item => (
          <Card key={item.id} hoverable onClick={() => setUserType(item.id)} size="small" style={{ borderRadius: '15px', textAlign: 'center', border: userType === item.id ? `2px solid ${item.color}` : '1px solid #f0f0f0' }}>
            <div style={{ fontSize: '32px', color: item.color, marginBottom: '5px' }}>{item.icon}</div>
            <Title level={5} style={{ margin: 0 }}>{item.title}</Title>
            <Text type="secondary" style={{ fontSize: '12px' }}>{item.desc}</Text>
          </Card>
        ))}
      </div>
    </div>
  );

const Page4Action = () => (
  <div style={{ height: '100%', overflow: 'hidden' }}>

    {userType === 'fill' ? (
      // -------- your existing FORM UI (unchanged) --------
      <div style={{ display: 'flex', gap: '20px', height: '100%', maxHeight: '450px' }}>
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
          <Title level={4}>{t.formListTitle}</Title>
          <List
            bordered
            dataSource={t.forms}
            renderItem={item => (
              <List.Item
                onClick={() => setSelectedForm(item)}
                style={{
                  cursor: 'pointer',
                  padding: '8px',
                  background: selectedForm === item ? '#e6f7ff' : '#fff',
                  borderRadius: '8px',
                  marginBottom: '5px'
                }}
              >
                <Space><FileTextOutlined /> <Text strong>{item}</Text></Space>
              </List.Item>
            )}
          />
        </div>

        <div style={{ flex: 2, background: '#f9f9f9', padding: '15px', borderRadius: '15px', overflowY: 'auto' }}>
          {selectedForm ? (
            <div key={selectedForm}>
              <Title level={5}>{t.referenceTitle}: {selectedForm}</Title>
              <iframe width="100%" height="200" src={guideData[language]?.[selectedForm]?.vid} />
              <img src={guideData[language]?.[selectedForm]?.img} alt="Sample" style={{ width: '100%', marginTop: '10px' }} />
            </div>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>Select form to view guide</div>
          )}
        </div>
      </div>
    ) : (

      // -------- UPLOAD + PREVIEW UI --------
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <Upload.Dragger
          style={{ padding: '20px', background: '#fff' }}
          multiple={false}
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"

          beforeUpload={(file) => {

            message.success(`${file.name} selected`);

            setFile(file);

            const url = URL.createObjectURL(file);
            setFilePreview(url);

            return false;   // 🔥 STOP AUTO UPLOAD
          }}

          showUploadList={{
            showRemoveIcon: true,
            showPreviewIcon: false
          }}

          onRemove={() => {
            setFile(null);
            setFilePreview(null);
          }}
        >

          <p><InboxOutlined style={{ fontSize: '48px', color: '#1890ff' }} /></p>
          <Title level={4}>{t.uploadTitle}</Title>

        </Upload.Dragger>


        {/* -------- DOCUMENT PREVIEW -------- */}

        {filePreview && (
          <div
            style={{
              marginTop: '20px',
              background: '#fff',
              padding: '10px',
              borderRadius: '12px',
              border: '1px solid #eee'
            }}
          >
            <Title level={5}>Preview</Title>

            {/* PDF */}
            {file?.type === "application/pdf" && (
              <iframe
                src={filePreview}
                width="100%"
                height="400px"
                title="PDF Preview"
                style={{ borderRadius: '10px' }}
              />
            )}

            {/* IMAGE */}
            {file?.type.startsWith("image/") && (
              <img
                src={filePreview}
                alt="Preview"
                style={{ width: '100%', borderRadius: '10px' }}
              />
            )}

            {/* OTHER */}
            {!file?.type.includes("pdf") &&
             !file?.type.startsWith("image/") && (
              <Text>Preview not available. File ready: {file.name}</Text>
            )}
          </div>
        )}

      </div>
    )}

  </div>
);



  const pages = [<Page1Landing />, <Page2Language />, <Page3Options />, <Page4Action />];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff', borderRadius: 10 } }}>
      <div style={mainWrapperStyle}>
        <Header style={{ background: 'transparent', display: 'flex', justifyContent: 'space-between', padding: '10px 60px', height: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <RobotOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <b style={{ fontSize: '18px' }}>BUREAUCRACY AI</b>
          </div>
          <Text strong style={{ color: '#1890ff' }}>{t.active}</Text>
        </Header>

        <Content style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={glassCardStyle}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div key={currentStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%' }}>
                  {pages[currentStep]}
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: '15px' }}>
              <Button size="large" onClick={() => setCurrentStep(prev => prev - 1)} disabled={currentStep === 0}>
                {t.back}
              </Button>
              <Button size="large" type="primary" onClick={() => setCurrentStep(prev => prev + 1)} disabled={currentStep === pages.length - 1}>
                {currentStep === 0 ? t.start : t.next} <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </Content>
      </div>
    </ConfigProvider>
  );
};

export default App;