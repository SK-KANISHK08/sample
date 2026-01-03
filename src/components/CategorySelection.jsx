import React from 'react';
import { Typography, Card } from 'antd';
import { TranslationOutlined, AudioOutlined, FormOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const CategorySelection = ({ setUserType, setCurrentStep, t }) => {
  const options = [
    { id: 'literacy', icon: <TranslationOutlined />, title: t.opt1, desc: t.opt1Desc, color: '#1890ff', step: 3 }, // Summary (Page 4)
    { id: 'blind', icon: <AudioOutlined />, title: t.opt2, desc: t.opt2Desc, color: '#52c41a', step: 4 },    // Audio (Page 5)
    { id: 'fill', icon: <FormOutlined />, title: t.opt4, desc: t.opt4Desc, color: '#722ed1', step: 5 }       // Form (Page 6)
  ];

  return (
    <div style={{ width: '100%' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>{t.question}</Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {options.map(item => (
          <Card key={item.id} hoverable onClick={() => { setUserType(item.id); setCurrentStep(item.step); }} style={{ borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', color: item.color, marginBottom: '10px' }}>{item.icon}</div>
            <Title level={4}>{item.title}</Title>
            <Text type="secondary">{item.desc}</Text>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CategorySelection;