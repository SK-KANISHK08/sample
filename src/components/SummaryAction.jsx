import React from 'react';
import { Upload, Button, Card, Typography, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Title } = Typography;

const SummaryAction = ({ file, setFile, setFilePreview, summary, loading, handleSummarize, t }) => (
  <div style={{ maxWidth: '600px', margin: '0 auto' }}>
    <Upload.Dragger beforeUpload={(f) => { setFile(f); setFilePreview(URL.createObjectURL(f)); return false; }} onRemove={() => setFile(null)}>
      <p><InboxOutlined style={{ fontSize: '48px', color: '#1890ff' }} /></p>
      <Title level={4}>{t.uploadTitle}</Title>
    </Upload.Dragger>
    {file && <Button type="primary" block size="large" onClick={handleSummarize} loading={loading} style={{ marginTop: '20px', background: '#52c41a' }}>Summarize to One Page</Button>}
    {summary && <Card title="Summary Result" style={{ marginTop: '20px', border: '2px solid #52c41a' }}>{summary}</Card>}
  </div>
);
export default SummaryAction;