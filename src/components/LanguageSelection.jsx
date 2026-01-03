import React from 'react';
import { Typography, Radio, Space } from 'antd';
const { Title } = Typography;

const LanguageSelection = ({ language, setLanguage, t }) => (
  <div style={{ textAlign: 'center' }}>
    <Title level={3} style={{ marginBottom: '30px' }}>{t.selectLang}</Title>
    <Radio.Group value={language} onChange={(e) => setLanguage(e.target.value)}>
      <Space size="large">
        <Radio.Button value="en" style={{ height: '80px', width: '160px', fontSize: '20px', lineHeight: '80px', borderRadius: '15px' }}>English</Radio.Button>
        <Radio.Button value="ta" style={{ height: '80px', width: '160px', fontSize: '20px', lineHeight: '80px', borderRadius: '15px' }}>தமிழ்</Radio.Button>
        <Radio.Button value="hi" style={{ height: '80px', width: '160px', fontSize: '20px', lineHeight: '80px', borderRadius: '15px' }}>हिन्दी</Radio.Button>
      </Space>
    </Radio.Group>
  </div>
);
export default LanguageSelection;