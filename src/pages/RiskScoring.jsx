import React, { useState } from 'react';

const STUDENTS = [
  {id:'STU-002',name:'Rafiq Hossain', initials:'RH',cls:'9-B',score:91,risk:'High',  reason:'3 months overdue, pattern of late payments',  rec:'Call parent immediately',avBg:'#450A0A',avColor:'#EF4444'},
  {id:'STU-003',name:'Fatema Begum',  initials:'FB',cls:'7-A',score:78,risk:'High',  reason:'2 months overdue, low attendance correlation', rec:'Send formal notice',      avBg:'#450A0A',avColor:'#EF4444'},
  {id:'STU-005',name:'Sadia Akter',   initials:'SA',cls:'7-C',score:55,risk:'Medium',reason:'Partial payments for 3 consecutive months',     rec:'Send reminder SMS',      avBg:'#064E3B',avColor:'#10B981'},
  {id:'STU-007',name:'Nadia Karim',   initials:'NK',cls:'8-A',score:42,risk:'Medium',reason:'Payment delay pattern detected',                 rec:'Send payment reminder',  avBg:'#1E3A5F',avColor:'#3B82F6'},
  {id:'STU-004',name:'Mehedi Islam',  initials:'MI',cls:'6-B',score:8, risk:'Low',   reason:'Consistent on-time payments',                   rec:'No action needed',       avBg:'#2E1065',avColor:'#8B5CF6'},
  {id:'STU-001',name:'Aisha Rahman',  initials:'AR',cls:'8-A',score:5, risk:'Low',   reason:'Perfect payment history',                       rec:'No action needed',       avBg:'#1E3A5F',avColor:'#3B82F6'},
];

const riskColor = r => r==='High'?'var(--red)':r==='Medium'?'var(--amber)':'var(--green)';
const riskBadge = r => r==='High'?'badge-red':r==='Medium'?'badge-amber':'badge-green';

export default function RiskScoring() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned]   = useState(false);

  const runScan = async () => {
    setScanning(true);
    await new Promise(r => setTimeout(r, 2500));
    setScanning(false);
    setScanned(true);
  };

  const high   = STUDENTS.filter(s => s.risk === 'High').length;
  const medium = STUDENTS.filter(s => s.risk === 'Medium').length;
  const low    = STUDENTS.filter(s => s.risk === 'Low').length;

  if (scanning) return (
    <div className="main" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:400}}>
      <div style={{textAlign:'center',color:'var(--text3)'}}>
        <div style={{fontSize:48,marginBottom:16}}>🧠</div>
        <div style={{fontSize:18,fontWeight:500,color:'var(--text2)',marginBottom:8}}>Running AI risk scan...</div>
        <div style={{fontSize:13}}>Claude is analysing payment patterns for all 1,248 students</div>
      </div>
    </div>
  );

  return (
    <div className="main">
      <div className="page-header">
        <div><div className="page-title">AI Risk Scoring</div><div className="page-sub">Fee default prediction · Powered by Claude AI</div></div>
        <div className="btn-group">
          <button className="btn" style={{background:'var(--purple)',color:'#fff',borderColor:'var(--purple)'}} onClick={runScan}>🧠 Run AI scan</button>
          {scanned && <span className="badge badge-green" style={{padding:'6px 12px',fontSize:12}}>✓ Last scan: just now</span>}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20}}>
        {[{icon:'🔴',label:'High risk',value:high,sub:'immediate action',cls:'danger',bg:'var(--red-dim)',c:'var(--red)'},{icon:'🟡',label:'Medium risk',value:medium,sub:'monitor closely',cls:'warn',bg:'var(--amber-dim)',c:'var(--amber)'},{icon:'🟢',label:'Low risk',value:low,sub:'all good',cls:'up',bg:'var(--green-dim)',c:'var(--green)'}].map(m=>(
          <div key={m.label} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,padding:'14px 16px'}}>
            <div style={{width:36,height:36,borderRadius:10,background:m.bg,color:m.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,marginBottom:10}}>{m.icon}</div>
            <div style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',marginBottom:4}}>{m.label}</div>
            <div style={{fontSize:20,fontWeight:600,color:'var(--text)'}}>{m.value}</div>
            <div className={m.cls} style={{fontSize:10,marginTop:3}}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 18px',borderBottom:'1px solid var(--border)'}}>
          <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>Student risk scores</div>
          <span className="badge badge-purple">Claude AI</span>
        </div>
        <div style={{padding:'0 18px'}}>
          {STUDENTS.map(s=>(
            <div key={s.id} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 0',borderBottom:'1px solid var(--border)'}}>
              <div style={{width:34,height:34,borderRadius:10,background:s.avBg,color:s.avColor,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,flexShrink:0}}>{s.initials}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500,color:'var(--text)',marginBottom:2}}>{s.name}</div>
                <div style={{fontSize:11,color:'var(--text3)'}}>{s.id} · {s.cls}</div>
                <div style={{fontSize:11,color:'var(--text3)',marginTop:3,fontStyle:'italic'}}>{s.reason}</div>
              </div>
              <div style={{width:100}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:3}}>
                  <span style={{color:'var(--text3)'}}>Risk</span>
                  <span style={{fontWeight:600,color:riskColor(s.risk)}}>{s.score}/100</span>
                </div>
                <div style={{height:6,background:'var(--bg3)',borderRadius:3,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${s.score}%`,background:riskColor(s.risk),borderRadius:3}}/>
                </div>
              </div>
              <span className={`badge ${riskBadge(s.risk)}`}>{s.risk}</span>
              <button style={{padding:'5px 12px',borderRadius:6,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--blue)'}}>Action ↗</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
