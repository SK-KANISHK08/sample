import React from 'react';
import { Typography, Tag } from 'antd';
const { Title, Text } = Typography;

const LandingPage = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
    <div style={{ flex: 1.2 }}>
      <Tag color="blue" style={{ marginBottom: '10px' }}>Trusted AI</Tag>
      <Title style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1, margin: 0 }}>
        BUREAUCRACY <span style={{ color: '#1890ff' }}>AI</span>
      </Title>
      <Text style={{ fontSize: '20px', color: '#434343', display: 'block', marginTop: '15px' }}>
        Bridging the gap between complex legal documents and common citizens.
      </Text>
    </div>
    <div style={{ flex: 1, textAlign: 'right' }}>
      <img src="https://illustrations.popsy.co/blue/manager.svg" alt="AI Logo" style={{ width: '100%', maxHeight: '300px' }} />
    </div>
  </div>
);
export default LandingPage;