import React, { useState } from 'react';

const INITIAL_ALERTS = [
  {id:1,type:'fee',icon:'💰',title:'Fee default warning — Rafiq Hossain',desc:'3 months overdue · ৳13,500 balance · AI risk score: 91/100',msg:'Dear Parent, Rafiq\'s fee is significantly overdue. Please contact us urgently.',status:'pending',bg:'var(--red-dim)',color:'var(--red)'},
  {id:2,type:'attendance',icon:'✅',title:'Low attendance alert — Fatema Begum',desc:'61% attendance this month · 8 absences · Below 75% threshold',msg:'Dear Mrs. Begum, Fatema\'s attendance has dropped significantly. Please ensure regular attendance.',status:'pending',bg:'var(--amber-dim)',color:'var(--amber)'},
  {id:3,type:'fee',icon:'💰',title:'Partial payment pattern — Sadia Akter',desc:'3 consecutive partial payments · AI predicts default risk · Score: 55/100',msg:'Dear Parent, we noticed Sadia\'s fee payments have been partial. Please clear the balance.',status:'pending',bg:'var(--amber-dim)',color:'var(--amber)'},
  {id:4,type:'attendance',icon:'✅',title:'Chronic absence — Rafiq Hossain',desc:'55% attendance · 17 absences this term · Immediate action required',msg:'Dear Parent, Rafiq has been absent frequently. This may affect his academic performance.',status:'sent',bg:'var(--red-dim)',color:'var(--red)'},
  {id:5,type:'result',icon:'📊',title:'Academic concern — Fatema Begum',desc:'Average marks dropped to 46% · Below passing threshold in 2 subjects',msg:'Dear Parent, we are concerned about Fatema\'s academic performance. Please schedule a meeting.',status:'sent',bg:'var(--purple-dim)',color:'var(--purple)'},
];

export default function SmartAlerts() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  const sendAlert = (id) => setAlerts(a => a.map(x => x.id===id ? {...x,status:'sent'} : x));
  const sendAll   = ()   => setAlerts(a => a.map(x => ({...x,status:'sent'})));

  const pending = alerts.filter(a => a.status === 'pending');
  const sent    = alerts.filter(a => a.status === 'sent');

  return (
    <div className="main">
      <div className="page-header">
        <div><div className="page-title">Smart Alerts</div><div className="page-sub">AI-drafted parent notifications · SMS & Email</div></div>
        <div className="btn-group">
          <button className="btn">📊 Alert history</button>
          {pending.length > 0 && <button className="btn btn-primary" onClick={sendAll}>📤 Send all {pending.length} alerts</button>}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20}}>
        {[{icon:'⏳',label:'Pending',value:pending.length,sub:'awaiting send',cls:'warn',bg:'var(--amber-dim)',c:'var(--amber)'},{icon:'✅',label:'Sent today',value:sent.length,sub:'delivered',cls:'up',bg:'var(--green-dim)',c:'var(--green)'},{icon:'📢',label:'Total this week',value:alerts.length,sub:'all channels',cls:'info',bg:'var(--blue-dim)',c:'var(--blue)'}].map(m=>(
          <div key={m.label} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,padding:'14px 16px'}}>
            <div style={{width:36,height:36,borderRadius:10,background:m.bg,color:m.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,marginBottom:10}}>{m.icon}</div>
            <div style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',marginBottom:4}}>{m.label}</div>
            <div style={{fontSize:20,fontWeight:600,color:'var(--text)'}}>{m.value}</div>
            <div className={m.cls} style={{fontSize:10,marginTop:3}}>{m.sub}</div>
          </div>
        ))}
      </div>

      {pending.length > 0 && (
        <>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>⏳ Pending alerts</div>
            <button onClick={sendAll} style={{padding:'7px 16px',borderRadius:8,background:'var(--blue)',color:'#fff',border:'none',fontSize:12,cursor:'pointer',fontWeight:500}}>Send all {pending.length} alerts ↗</button>
          </div>
          {pending.map(a=>(
            <div key={a.id} style={{display:'flex',alignItems:'flex-start',gap:12,padding:14,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,marginBottom:10}}>
              <div style={{width:36,height:36,borderRadius:10,background:a.bg,color:a.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{a.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500,color:'var(--text)',marginBottom:4}}>{a.title}</div>
                <div style={{fontSize:11,color:'var(--text3)',marginBottom:8}}>{a.desc}</div>
                <div style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,padding:'8px 12px',marginBottom:10}}>
                  <div style={{fontSize:10,color:'var(--blue)',fontWeight:600,marginBottom:4}}>🤖 AI DRAFTED MESSAGE</div>
                  <div style={{fontSize:12,color:'var(--text2)',fontStyle:'italic'}}>"{a.msg}"</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>sendAlert(a.id)} style={{padding:'6px 14px',borderRadius:7,fontSize:12,cursor:'pointer',border:'none',background:'var(--blue)',color:'#fff',fontWeight:500}}>📤 Send now</button>
                  <button style={{padding:'6px 14px',borderRadius:7,fontSize:12,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--text2)'}}>✏️ Edit</button>
                  <button style={{padding:'6px 14px',borderRadius:7,fontSize:12,cursor:'pointer',border:'1px solid var(--red-dim)',background:'transparent',color:'var(--red)'}}>🗑️ Dismiss</button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {sent.length > 0 && (
        <>
          <div style={{fontSize:14,fontWeight:600,color:'var(--text)',margin:'16px 0 12px'}}>✅ Sent alerts</div>
          {sent.map(a=>(
            <div key={a.id} style={{display:'flex',alignItems:'center',gap:12,padding:12,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,marginBottom:8,opacity:.6}}>
              <div style={{width:36,height:36,borderRadius:10,background:a.bg,color:a.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{a.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500,color:'var(--text)',marginBottom:2}}>{a.title} <span className="badge badge-green">Sent</span></div>
                <div style={{fontSize:11,color:'var(--text3)'}}>{a.desc}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
