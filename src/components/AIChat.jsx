import React, { useState } from 'react';
import { chatWithAI } from '../services/api';

export default function AIChat({ studentId }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I can help with fees, attendance, results, and more.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const res = await chatWithAI(input, studentId, history);
      setMessages(m => [...m, { role: 'assistant', content: res.data.reply }]);
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Sorry, I could not connect to the AI. Please check your API key.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#185FA5', color: '#fff', padding: '10px 14px', fontSize: 13, fontWeight: 500 }}>
        🤖 SchoolOS AI Assistant
      </div>
      <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 200, overflowY: 'auto' }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            padding: '8px 10px', borderRadius: 8, fontSize: 12, lineHeight: 1.5,
            maxWidth: '85%', alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            background: m.role === 'user' ? '#185FA5' : '#E6F1FB',
            color: m.role === 'user' ? '#fff' : '#0C447C',
          }}>{m.content}</div>
        ))}
        {loading && <div style={{ fontSize: 12, color: '#999' }}>AI is thinking...</div>}
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '8px 12px', borderTop: '1px solid #f0f0f0' }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask anything..."
          style={{ flex: 1, padding: '7px 10px', border: '1px solid #ddd', borderRadius: 8, fontSize: 12 }} />
        <button onClick={send} disabled={loading}
          style={{ padding: '7px 14px', background: '#185FA5', color: '#fff',
          border: 'none', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>Send</button>
      </div>
    </div>
  );
}
