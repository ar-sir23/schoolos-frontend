import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/api';

const CONVERSATIONS = [
  { id:1, group:'Today',     title:'Fee defaulter analysis',  preview:'Show me students at risk...' },
  { id:2, group:'Today',     title:'Attendance report',       preview:"Generate this week's..." },
  { id:3, group:'Yesterday', title:'Report card comments',    preview:'Write comments for Class 8...' },
  { id:4, group:'Yesterday', title:'Parent message draft',    preview:'Draft a message about...' },
  { id:5, group:'This week', title:'School performance summary', preview:'Summarize Term 2 results...' },
];

const QUICK_ACTIONS = [
  { icon:'📋', label:'Generate report cards',    prompt:'Generate report cards for Class 8-A using AI' },
  { icon:'🧠', label:'Run fee risk scan',         prompt:'Run fee default risk scan for all students' },
  { icon:'🔔', label:'Send attendance alerts',    prompt:'Send attendance alerts to parents of students below 75%' },
  { icon:'📊', label:'Term summary',              prompt:'Summarize this term performance for the school' },
];

const QUICK_PROMPTS = [
  { icon:'📋', label:'Report cards', prompt:'Generate report cards for all students' },
  { icon:'✅', label:'Attendance',   prompt:'Show me students with low attendance this month' },
  { icon:'💰', label:'Fee summary',  prompt:'Summarize fee collection this month' },
  { icon:'📢', label:'Draft notice', prompt:'Draft a notice for parents about upcoming sports day' },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role:'assistant', content:"Hello Admin! I'm your SchoolOS AI assistant. I can help with students, fees, attendance, report cards, and more. What would you like to know?" }
  ]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages, loading]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setMessages(m => [...m, { role:'user', content: msg }]);
    setInput('');
    setLoading(true);
    try {
      const history = messages.map(m => ({ role:m.role, content:m.content }));
      const res = await chatWithAI(msg, null, history);
      setMessages(m => [...m, { role:'assistant', content: res.data.reply }]);
    } catch {
      setMessages(m => [...m, { role:'assistant', content: 'I could not connect to Claude AI. Please check your Anthropic API key and credits in Settings, then try again.' }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const groupedConvs = CONVERSATIONS.reduce((acc, c) => {
    (acc[c.group] = acc[c.group] || []).push(c);
    return acc;
  }, {});

  return (
    <div className="main" style={{ display:'flex', flexDirection:'column' }}>
      <div className="page-header">
        <div><div className="page-title">AI Assistant</div><div className="page-sub">Ask anything about your school · Powered by Claude</div></div>
        <span style={{ padding:'6px 14px', borderRadius:20, background:'var(--purple-dim)', color:'var(--purple)', fontSize:12, fontWeight:600 }}>🤖 Claude Sonnet</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'260px 1fr', gap:16, flex:1, minHeight:500 }}>

        {/* Sidebar */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <button onClick={() => setMessages([{ role:'assistant', content:'Hello! How can I help you with your school today?' }])}
            style={{ padding:10, borderRadius:10, background:'var(--blue)', color:'#fff', border:'none', fontSize:13, fontWeight:600, cursor:'pointer' }}>
            + New conversation
          </button>

          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:10, flex:1, overflowY:'auto' }}>
            {Object.entries(groupedConvs).map(([group, convs]) => (
              <div key={group}>
                <div style={{ fontSize:10, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600, padding:'8px 8px 6px' }}>{group}</div>
                {convs.map(c => (
                  <div key={c.id} style={{ padding:'10px 12px', borderRadius:8, cursor:'pointer', fontSize:12, color:'var(--text2)', marginBottom:2, transition:'all .15s' }}
                    onMouseEnter={e => e.currentTarget.style.background='var(--bg3)'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <div style={{ fontWeight:500, color:'var(--text)', marginBottom:2 }}>{c.title}</div>
                    <div style={{ fontSize:11, color:'var(--text3)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.preview}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:14 }}>
            <div style={{ fontSize:11, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600, marginBottom:10 }}>Quick actions</div>
            {QUICK_ACTIONS.map(a => (
              <div key={a.label} onClick={() => send(a.prompt)}
                style={{ display:'flex', alignItems:'center', gap:8, padding:8, borderRadius:8, cursor:'pointer', fontSize:12, color:'var(--text2)', marginBottom:2, transition:'all .15s' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--bg3)'; e.currentTarget.style.color='var(--text)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--text2)'; }}>
                {a.icon} {a.label}
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ fontSize:14, fontWeight:600, color:'var(--text)', display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:7, height:7, background:'var(--green)', borderRadius:'50%' }}/>
              SchoolOS Assistant
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button style={{ padding:'5px 10px', borderRadius:6, fontSize:11, cursor:'pointer', border:'1px solid var(--border)', background:'transparent', color:'var(--text2)' }}>📥 Export chat</button>
              <button onClick={() => setMessages([{ role:'assistant', content:'Hello! How can I help you with your school today?' }])}
                style={{ padding:'5px 10px', borderRadius:6, fontSize:11, cursor:'pointer', border:'1px solid var(--border)', background:'transparent', color:'var(--red)' }}>🗑️ Clear</button>
            </div>
          </div>

          <div style={{ flex:1, padding:20, overflowY:'auto', display:'flex', flexDirection:'column', gap:16 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display:'flex', gap:12, maxWidth:'85%', alignSelf: m.role==='user' ? 'flex-end' : 'flex-start', flexDirection: m.role==='user' ? 'row-reverse' : 'row' }}>
                <div style={{ width:30, height:30, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, flexShrink:0,
                  background: m.role==='user' ? 'var(--blue-dim)' : 'var(--purple-dim)', color: m.role==='user' ? 'var(--blue)' : 'var(--purple)' }}>
                  {m.role==='user' ? 'SA' : '🤖'}
                </div>
                <div>
                  <div style={{ padding:'11px 15px', borderRadius:12, fontSize:13, lineHeight:1.6, whiteSpace:'pre-wrap',
                    background: m.role==='user' ? 'var(--blue)' : 'var(--bg3)', color: m.role==='user' ? '#fff' : 'var(--text2)',
                    border: m.role==='user' ? 'none' : '1px solid var(--border)' }}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display:'flex', gap:12 }}>
                <div style={{ width:30, height:30, borderRadius:8, background:'var(--purple-dim)', color:'var(--purple)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>🤖</div>
                <div style={{ display:'flex', gap:4, padding:'11px 15px', background:'var(--bg3)', borderRadius:12, border:'1px solid var(--border)' }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width:6, height:6, background:'var(--text3)', borderRadius:'50%', animation:`bounce 1.2s infinite ${i*0.2}s` }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          <div style={{ padding:'14px 18px', borderTop:'1px solid var(--border)' }}>
            <div style={{ display:'flex', gap:6, marginBottom:10, flexWrap:'wrap' }}>
              {QUICK_PROMPTS.map(q => (
                <div key={q.label} onClick={() => send(q.prompt)}
                  style={{ padding:'6px 12px', borderRadius:20, fontSize:11, cursor:'pointer', border:'1px solid var(--border)', background:'var(--bg3)', color:'var(--text2)', transition:'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='var(--bg4)'; e.currentTarget.style.color='var(--text)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='var(--bg3)'; e.currentTarget.style.color='var(--text2)'; }}>
                  {q.icon} {q.label}
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
              <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                placeholder="Ask anything about your school…" rows={1}
                style={{ flex:1, padding:'10px 14px', border:'1px solid var(--border2)', borderRadius:10, fontSize:13, background:'var(--bg3)', color:'var(--text)', outline:'none', resize:'none', minHeight:42, maxHeight:120, fontFamily:'inherit' }}/>
              <button onClick={() => send()} disabled={loading}
                style={{ width:42, height:42, borderRadius:10, background:'var(--blue)', color:'#fff', border:'none', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, opacity: loading?0.6:1 }}>
                ↗
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-4px); } }
      `}</style>
    </div>
  );
}
