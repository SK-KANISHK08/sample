import React, { useState } from 'react';
import { Typography, Upload, Button, Card, Space, message, Spin } from 'antd';
import { InboxOutlined, AudioOutlined, StopOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AudioAction = ({ file, setFile, language, t }) => {
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleVoiceProcess = async () => {
    if (!file) return message.error("Please upload a file first");
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:5000/summarize?lang=${language}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      // Use Browser Speech Synthesis to read the result
      const utterance = new SpeechSynthesisUtterance(data.summary);
      utterance.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      message.success("Reading document aloud...");
    } catch (err) {
      message.error("Audio Processing Failed");
    } finally {
      setLoading(false);
    }
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <Title level={3}><AudioOutlined /> {t.opt2}</Title>
      <Text type="secondary">{t.opt2Desc}</Text>
      
      <div style={{ marginTop: '30px' }}>
        <Upload.Dragger 
          multiple={false} 
          beforeUpload={(f) => { setFile(f); return false; }}
          onRemove={() => { setFile(null); stopAudio(); }}
        >
          <p><InboxOutlined style={{ fontSize: '48px', color: '#52c41a' }} /></p>
          <Text>{t.uploadTitle}</Text>
        </Upload.Dragger>
      </div>

      <Space style={{ marginTop: '20px' }}>
        <Button 
          type="primary" 
          size="large" 
          icon={<AudioOutlined />} 
          loading={loading}
          onClick={handleVoiceProcess}
          disabled={!file || isSpeaking}
          style={{ background: '#52c41a', borderColor: '#52c41a' }}
        >
          Listen to Document
        </Button>
        
        {isSpeaking && (
          <Button type="primary" danger size="large" icon={<StopOutlined />} onClick={stopAudio}>
            Stop
          </Button>
        )}
      </Space>
    </div>
  );
};

export default AudioAction;