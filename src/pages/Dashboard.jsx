import AddStudentModal from '../components/AddStudentModal';
import React,{useState,useEffect,useRef} from 'react';
import '../styles/dashboard.css';
import{getStudents,runFeeRiskScan,sendAttendanceAlerts,chatWithAI}from'../services/api';

function MetricCard({icon,label,value,trend,trendType,iconBg,iconColor}){
  return(
    <div className="metric">
      <div className="metric-icon" style={{background:iconBg,color:iconColor}}>{icon}</div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {trend&&<div className={`metric-trend ${trendType}`}>{trend}</div>}
    </div>
  );
}

function BarChart({data}){
  return(
    <div>{data.map(({label,value,color})=>(
      <div className="bar-item" key={label}>
        <div className="bar-meta"><span className="label">{label}</span><span className="value">{value}%</span></div>
        <div className="bar-track"><div className="bar-fill" style={{width:`${value}%`,background:color}}/></div>
      </div>
    ))}</div>
  );
}

function AIChat(){
  const[messages,setMessages]=useState([{role:'assistant',content:'Hello Admin! I can help you manage students, analyse attendance, predict fee defaulters, and generate report cards.'}]);
  const[input,setInput]=useState('');
  const[loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:'smooth'})},[messages]);

  const send=async()=>{
    if(!input.trim()||loading)return;
    const userMsg={role:'user',content:input};
    setMessages(m=>[...m,userMsg]);setInput('');setLoading(true);
    try{
      const history=messages.map(m=>({role:m.role,content:m.content}));
      const res=await chatWithAI(input,null,history);
      setMessages(m=>[...m,{role:'assistant',content:res.data.reply}]);
    }catch{setMessages(m=>[...m,{role:'assistant',content:'Could not connect to AI. Please check your API key and credits.'}]);}
    setLoading(false);
  };

  return(
    <div className="ai-chat">
      <div className="ai-chat-header">
        <div className="ai-chat-title"><div className="online-dot"/>SchoolOS AI Assistant<span className="badge badge-blue" style={{fontSize:9}}>Claude</span></div>
        <span style={{fontSize:11,color:'var(--text3)'}}>Powered by Anthropic</span>
      </div>
      <div className="ai-chat-body">
        {messages.map((m,i)=><div key={i} className={`msg ${m.role==='user'?'msg-user':'msg-ai'}`}>{m.content}</div>)}
        {loading&&<div className="msg msg-ai" style={{opacity:.6}}>Thinking...</div>}
        <div ref={bottomRef}/>
      </div>
      <div className="ai-chat-footer">
        <input className="ai-input" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask anything — students, fees, attendance, reports…"/>
        <button className="ai-send" onClick={send} disabled={loading}>{loading?'...':'Send ↗'}</button>
      </div>
    </div>
  );
}

export default function Dashboard(){
  const[students,setStudents]=useState([]);
  const[toast,setToast]=useState('');
  const[addStudent,setAddStudent]=useState(false);
  useEffect(()=>{getStudents().then(r=>setStudents(r.data.results||[])).catch(()=>{});},[]);
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(''),4000);};

  const handleRiskScan=async()=>{
    showToast('🧠 Running AI fee risk scan...');
    try{const r=await runFeeRiskScan();showToast(`✅ AI scored ${r.data.scored} students.`);}
    catch{showToast('❌ Error running scan.');}
  };
  const handleAlerts=async()=>{
    showToast('📨 Sending AI attendance alerts...');
    try{const r=await sendAttendanceAlerts(75);showToast(`✅ Sent ${r.data.alerts_sent} alerts.`);}
    catch{showToast('❌ Error sending alerts.');}
  };

  const attData=[{label:'Class 10-A',value:98,color:'var(--green)'},{label:'Class 9-B',value:91,color:'var(--green)'},{label:'Class 8-C',value:76,color:'var(--amber)'},{label:'Class 7-A',value:62,color:'var(--red)'},{label:'Class 6-B',value:88,color:'var(--green)'}];
  const studentRows=[
    {name:'Aisha Rahman',initials:'AR',cls:'8-A',att:95,attC:'up',fee:'Paid',feeC:'badge-green',risk:'Low',riskC:'badge-green'},
    {name:'Karim Ahmed',initials:'KA',cls:'9-B',att:78,attC:'warn',fee:'Partial',feeC:'badge-amber',risk:'Med',riskC:'badge-amber'},
    {name:'Fatema Begum',initials:'FB',cls:'7-A',att:61,attC:'danger',fee:'Overdue',feeC:'badge-red',risk:'High',riskC:'badge-red'},
    {name:'Mehedi Islam',initials:'MI',cls:'6-B',att:92,attC:'up',fee:'Paid',feeC:'badge-green',risk:'Low',riskC:'badge-green'},
    {name:'Sadia Akter',initials:'SA',cls:'7-C',att:74,attC:'warn',fee:'Partial',feeC:'badge-amber',risk:'Med',riskC:'badge-amber'},
  ];

  return(
    <div className="main">
      {addStudent&&<AddStudentModal onClose={(added)=>{setAddStudent(false);if(added)getStudents().then(r=>setStudents(r.data.results||[])).catch(()=>{});}}/>}
      {toast&&<div style={{position:'fixed',top:70,right:24,background:'var(--bg3)',border:'1px solid var(--border2)',borderRadius:10,padding:'12px 18px',fontSize:13,color:'var(--text)',zIndex:999,boxShadow:'0 4px 20px rgba(0,0,0,.4)'}}>{toast}</div>}
      <div className="page-header">
        <div><div className="page-title">Good evening, Admin 👋</div><div className="page-sub">{new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})} · Term 2</div></div>
        <div className="btn-group"><button className="btn" onClick={handleAlerts}>Send AI alerts ↗</button><button className="btn btn-primary" onClick={handleRiskScan}>Run risk scan ↗</button><button className="btn btn-primary" onClick={()=>setAddStudent(true)}>+ Add student</button></div>
      </div>
      <div className="metrics">
        <MetricCard icon="👨‍🎓" label="Total Students" value={students.length||'1,248'} trend="↑ +34 this term" trendType="up" iconBg="var(--blue-dim)" iconColor="var(--blue)"/>
        <MetricCard icon="✅" label="Attendance Today" value="94.2%" trend="⚠ 72 absent" trendType="warn" iconBg="var(--green-dim)" iconColor="var(--green)"/>
        <MetricCard icon="💰" label="Fees Collected" value="৳18.4L" trend="↑ 87% of target" trendType="up" iconBg="var(--purple-dim)" iconColor="var(--purple)"/>
        <MetricCard icon="🧠" label="AI Flagged" value="12" trend="⚠ fee defaulters" trendType="danger" iconBg="var(--red-dim)" iconColor="var(--red)"/>
      </div>
      <div className="grid-2-3">
        <div className="card">
          <div className="card-header"><div><div className="card-title">Student overview</div><div className="card-sub">Attendance & fee status</div></div><button className="btn" style={{fontSize:11,padding:'5px 12px'}}>View all</button></div>
          <table className="data-table">
            <thead><tr><th>Student</th><th>Class</th><th>Attendance</th><th>Fee</th><th>AI risk</th></tr></thead>
            <tbody>{studentRows.map(s=>(
              <tr key={s.name}>
                <td><div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:28,height:28,borderRadius:8,background:'var(--bg3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'var(--text2)',flexShrink:0}}>{s.initials}</div>{s.name}</div></td>
                <td style={{color:'var(--text3)'}}>{s.cls}</td>
                <td><span className={s.attC}>{s.att}%</span></td>
                <td><span className={`badge ${s.feeC}`}>{s.fee}</span></td>
                <td><span className={`badge ${s.riskC}`}>{s.risk}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="card">
            <div className="card-header"><div className="card-title">Class attendance</div><span className="badge badge-green">Live</span></div>
            <BarChart data={attData}/>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">Quick actions</div></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {[{icon:'📋',label:'Report cards',sub:'AI generated',bg:'var(--purple-dim)'},{icon:'🧠',label:'Risk scan',sub:'Fee prediction',bg:'var(--red-dim)'},{icon:'✅',label:'Attendance',sub:'Mark today',bg:'var(--green-dim)'},{icon:'📢',label:'Send notice',sub:'All parents',bg:'var(--amber-dim)'}].map(q=>(
                <div key={q.label} style={{padding:12,border:'1px solid var(--border)',borderRadius:10,cursor:'pointer',background:'var(--bg3)',transition:'all .15s'}} onMouseEnter={e=>e.currentTarget.style.background='var(--bg4)'} onMouseLeave={e=>e.currentTarget.style.background='var(--bg3)'}>
                  <div style={{width:30,height:30,borderRadius:8,background:q.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,marginBottom:6}}>{q.icon}</div>
                  <div style={{fontSize:11,fontWeight:600,color:'var(--text)'}}>{q.label}</div>
                  <div style={{fontSize:10,color:'var(--text3)',marginTop:2}}>{q.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AIChat/>
    </div>
  );
}
