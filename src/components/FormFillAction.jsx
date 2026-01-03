import React, { useState } from 'react';
import { Typography, List, Space, Card, Tag } from 'antd';
import { FileTextOutlined, YoutubeOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const FormFillAction = ({ language, t }) => {
  const [selectedForm, setSelectedForm] = useState(null);

  const guideData = {
    en: {
      "Aadhar Card Application": { vid: "https://www.youtube.com/embed/S2pEUPB9D-o", img: "https://images.sampleforms.com/wp-content/uploads/2017/03/Aadhar-Card-Application-Form.jpg" },
      "PAN Card Request": { vid: "https://www.youtube.com/embed/69C44H6M9Fw", img: "https://www.pdffiller.com/preview/100/381/100381667.png" }
    },
    ta: {
      "ஆதார் கார்டு விண்ணப்பம்": { vid: "https://www.youtube.com/embed/E-6R87m_M-I", img: "https://via.placeholder.com/400x500?text=Tamil+Aadhar+Sample" }
    },
    hi: {
      "आधार कार्ड आवेदन": { vid: "https://www.youtube.com/embed/RkS_jXl0AQU", img: "https://via.placeholder.com/400x500?text=Hindi+Aadhar+Sample" }
    }
  };

  const currentForms = t.forms || [];

  return (
    <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
      {/* Left Side: List of Forms */}
      <div style={{ flex: 1, borderRight: '1px solid #f0f0f0', paddingRight: '20px' }}>
        <Title level={4}>{t.formListTitle}</Title>
        <List
          dataSource={currentForms}
          renderItem={(item) => (
            <List.Item 
              onClick={() => setSelectedForm(item)}
              style={{ 
                cursor: 'pointer', 
                background: selectedForm === item ? '#e6f7ff' : 'transparent',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '5px'
              }}
            >
              <Space><FileTextOutlined style={{ color: '#722ed1' }} /> <Text strong>{item}</Text></Space>
            </List.Item>
          )}
        />
      </div>

      {/* Right Side: Visual Guide */}
      <div style={{ flex: 2, paddingLeft: '10px', overflowY: 'auto', maxHeight: '500px' }}>
        {selectedForm ? (
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Card title={<Space><YoutubeOutlined color="red" /> Video Tutorial</Space>} size="small">
              <iframe 
                width="100%" 
                height="250" 
                src={guideData[language]?.[selectedForm]?.vid} 
                title="YouTube guide" 
                frameBorder="0" 
                allowFullScreen 
                style={{ borderRadius: '8px' }}
              />
            </Card>
            
            <Card title={<Space><EyeOutlined /> Sample Reference</Space>} size="small">
              <img 
                src={guideData[language]?.[selectedForm]?.img} 
                alt="Form Sample" 
                style={{ width: '100%', borderRadius: '8px' }} 
              />
            </Card>
          </Space>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <img src="https://illustrations.popsy.co/blue/choose-your-path.svg" alt="Select" style={{ width: '200px' }} />
            <Title level={5} type="secondary">Please select a form from the left to see the guide</Title>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormFillAction;