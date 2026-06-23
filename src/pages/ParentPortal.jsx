import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/api';

const CHILD = {
  name:'Aisha Rahman', initials:'AR', id:'STU-001', cls:'Class 8-A', roll:'01',
  teacher:'Ms. Fatema Khanom', nextExam:'July 1, 2026',
  att:95, attDays:19, totalDays:20, rank:4,
  balance:0, totalPaid:27000, nextDue:'June 10',
  results:[{sub:'English',marks:82,grade:'A+'},{sub:'Mathematics',marks:74,grade:'A'},{sub:'Science',marks:69,grade:'B'},{sub:'Bengali',marks:78,grade:'A'},{sub:'Social Studies',marks:85,grade:'A+'}],
  comment:'Aisha demonstrates exceptional dedication and a genuine love for learning. Her outstanding performance in English and Social Studies reflects her strong analytical thinking. With continued focus on Science, she is well-positioned for even greater results.',
  notices:[{title:'Annual sports day — June 15',time:'2 days ago'},{title:'Term 2 exams begin July 1',time:'5 days ago'},{title:'Fee due date extended to June 15',time:'1 week ago'}],
  fees:[{no:'INV-2026-001',month:'May 2026',amount:'৳4,500',date:'May 8',method:'bKash'},{no:'INV-2026-002',month:'Apr 2026',amount:'৳4,500',date:'Apr 9',method:'bKash'},{no:'INV-2026-003',month:'Mar 2026',amount:'৳4,500',date:'Mar 7',method:'Cash'},{no:'INV-2026-004',month:'Feb 2026',amount:'৳4,500',date:'Feb 10',method:'Nagad'}],
  attendance:[['Jan',92],['Feb',88],['Mar',95],['Apr',90],['May',95]],
  calData:[null,null,'p','p','p','p',null,'p','a','p','p','p','p',null,'p','p','p','p','p','p',null,'p','p','p','p','p','p',null,'p','p','p'],
};

const gradeColor = g => g==='A+'||g==='A'?'var(--green)':g==='B'?'var(--blue)':'var(--amber)';
const gradeBg    = g => g==='A+'||g==='A'?'var(--green-dim)':g==='B'?'var(--blue-dim)':'var(--amber-dim)';
const avg = arr => Math.round(arr.reduce((a,r)=>a+r.marks,0)/arr.length);

// ── Pages ─────────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:14}}>
        {[{icon:'✅',value:`${CHILD.att}%`,label:'Attendance',cls:'up'},{icon:'💰',value:'৳0',label:'Balance',cls:'up'},{icon:'📊',value:'A',label:'Last result',cls:''},{icon:'🏆',value:`${CHILD.rank}th`,label:'Class rank',cls:'info'}].map(s=>(
          <div key={s.label} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,padding:'12px 14px',textAlign:'center'}}>
            <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div>
            <div className={s.cls} style={{fontSize:18,fontWeight:600,color:s.cls?undefined:'var(--text)'}}>{s.value}</div>
            <div style={{fontSize:10,color:'var(--text3)',marginTop:2}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
          <div style={{width:52,height:52,borderRadius:14,background:'#1E3A5F',color:'#3B82F6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:700}}>{CHILD.initials}</div>
          <div>
            <div style={{fontSize:16,fontWeight:600,color:'var(--text)'}}>{CHILD.name}</div>
            <div style={{fontSize:12,color:'var(--text3)',marginTop:3}}>{CHILD.id} · {CHILD.cls} · Roll {CHILD.roll}</div>
            <span className="badge badge-green" style={{marginTop:5,display:'inline-block'}}>Active</span>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {[{l:'Class teacher',v:CHILD.teacher},{l:'Next exam',v:CHILD.nextExam}].map(x=>(
            <div key={x.l} style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px'}}>
              <div style={{fontSize:10,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',marginBottom:3}}>{x.l}</div>
              <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{x.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:16}}>
        <div style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:12}}>📢 School notices</div>
        {CHILD.notices.map(n=>(
          <div key={n.title} style={{background:'var(--bg3)',borderLeft:'3px solid var(--blue)',padding:'10px 12px',borderRadius:'0 8px 8px 0',marginBottom:8}}>
            <div style={{fontSize:13,fontWeight:500,color:'var(--text)',marginBottom:3}}>{n.title}</div>
            <div style={{fontSize:10,color:'var(--text3)'}}>{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttendancePage() {
  return (
    <div>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
          <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>Attendance summary</div>
          <span className="badge badge-green">{CHILD.att}% — Excellent</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
          {[{v:CHILD.attDays,l:'Present',c:'var(--green)'},{v:CHILD.totalDays-CHILD.attDays,l:'Absent',c:'var(--red)'},{v:0,l:'Late',c:'var(--amber)'},{v:CHILD.totalDays,l:'Total days',c:'var(--blue)'}].map(s=>(
            <div key={s.l} style={{background:'var(--bg3)',borderRadius:8,padding:10,textAlign:'center'}}>
              <div style={{fontSize:18,fontWeight:600,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:'var(--text3)',marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:12,fontWeight:600,color:'var(--text2)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>May 2026</div>
        <div style={{display:'flex',gap:10,marginBottom:8,fontSize:10,color:'var(--text3)'}}>
          {[['var(--green)','Present'],['var(--red)','Absent'],['var(--amber)','Late']].map(([c,l])=>(
            <span key={l}><span style={{display:'inline-block',width:8,height:8,borderRadius:2,background:c,marginRight:3}}></span>{l}</span>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3}}>
          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=><div key={d} style={{aspectRatio:1,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'var(--text3)',fontWeight:600}}>{d}</div>)}
          {CHILD.calData.map((d,i)=>(
            <div key={i} style={{aspectRatio:1,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,background:d==='p'?'var(--green-dim)':d==='a'?'var(--red-dim)':d==='l'?'var(--amber-dim)':'transparent',color:d==='p'?'var(--green)':d==='a'?'var(--red)':d==='l'?'var(--amber)':'transparent'}}>{d?i+1:''}</div>
          ))}
        </div>
      </div>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:16}}>
        <div style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:12}}>Monthly trend</div>
        {CHILD.attendance.map(([m,p])=>(
          <div key={m} style={{marginBottom:10}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:3}}>
              <span style={{color:'var(--text2)'}}>{m}</span>
              <span style={{fontWeight:600,color:p>=80?'var(--green)':p>=70?'var(--amber)':'var(--red)'}}>{p}%</span>
            </div>
            <div style={{height:6,background:'var(--bg3)',borderRadius:3,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${p}%`,background:p>=80?'var(--green)':p>=70?'var(--amber)':'var(--red)',borderRadius:3}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeesPage() {
  return (
    <div>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
          <div><div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>Fee status</div><div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>Term 2, 2026</div></div>
          <span className="badge badge-green">All paid ✓</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
          {[{l:'Total paid',v:'৳27,000',c:'var(--green)'},{l:'Balance due',v:'৳0',c:'var(--text)'},{l:'Next due',v:'June 10',c:'var(--blue)'}].map(x=>(
            <div key={x.l} style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px'}}>
              <div style={{fontSize:10,color:'var(--text3)',marginBottom:3}}>{x.l}</div>
              <div style={{fontSize:15,fontWeight:600,color:x.c}}>{x.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:16}}>
        <div style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:12}}>Payment history</div>
        {CHILD.fees.map(f=>(
          <div key={f.no} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
            <div>
              <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{f.month}</div>
              <div style={{fontSize:10,color:'var(--text3)',marginTop:2}}>{f.no} · {f.method} · {f.date}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:13,fontWeight:600,color:'var(--green)'}}>{f.amount}</div>
              <span className="badge badge-green">Paid</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsPage() {
  return (
    <div>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
          <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>Term 2 results</div>
          <span className="badge badge-green">Overall A</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:16}}>
          {[{v:`${avg(CHILD.results)}%`,l:'Average',c:'var(--green)'},{v:`${CHILD.rank}th`,l:'Class rank',c:'var(--blue)'},{v:'5/5',l:'Passed',c:'var(--green)'}].map(s=>(
            <div key={s.l} style={{background:'var(--bg3)',borderRadius:8,padding:10,textAlign:'center'}}>
              <div style={{fontSize:18,fontWeight:600,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:'var(--text3)',marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
        {CHILD.results.map(r=>(
          <div key={r.sub} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--border)',fontSize:13}}>
            <span style={{color:'var(--text2)'}}>{r.sub}</span>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{color:'var(--text)'}}>{r.marks}/100</span>
              <div style={{width:28,height:28,borderRadius:8,background:gradeBg(r.grade),color:gradeColor(r.grade),display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700}}>{r.grade}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:16}}>
        <div style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:12}}>AI Teacher comment</div>
        <div style={{background:'var(--bg3)',border:'1px solid var(--border2)',borderRadius:10,padding:12}}>
          <div style={{fontSize:10,color:'var(--blue)',fontWeight:600,marginBottom:6}}>🤖 CLASS TEACHER</div>
          <div style={{fontSize:12,color:'var(--text2)',lineHeight:1.7,fontStyle:'italic'}}>"{CHILD.comment}"</div>
        </div>
      </div>
    </div>
  );
}

function AIChatPage() {
  const [messages, setMessages] = useState([{role:'assistant',content:`Hello! I'm your SchoolOS assistant. I can help you with ${CHILD.name.split(' ')[0]}'s attendance, fees, results, and school notices. How can I help?`}]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const QUICK = ['Fee balance?','Attendance this month?','Next exam date?','Latest results?'];

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}); },[messages]);

  const send = async (msg) => {
    const text = msg || input.trim();
    if (!text || loading) return;
    setMessages(m=>[...m,{role:'user',content:text}]);
    setInput('');
    setLoading(true);
    try {
      const context = {
        student_name: CHILD.name, class: CHILD.cls,
        attendance_rate: CHILD.att, fee_balance: CHILD.balance,
        recent_results: CHILD.results.map(r=>`${r.sub}: ${r.marks}/100 ${r.grade}`).join(', '),
        next_exam: CHILD.nextExam,
      };
      const history = messages.map(m=>({role:m.role,content:m.content}));
      const res = await chatWithAI(text, null, [{role:'user',content:`Student context: ${JSON.stringify(context)}`},{role:'assistant',content:'I have the student context. How can I help?'},...history]);
      setMessages(m=>[...m,{role:'assistant',content:res.data.reply}]);
    } catch {
      const FALLBACK = {
        'Fee balance?':`${CHILD.name.split(' ')[0]} has no outstanding balance. All fees for Term 2 are fully paid. Next payment of ৳4,500 is due on June 10.`,
        'Attendance this month?':`${CHILD.name.split(' ')[0]} attended ${CHILD.attDays} of ${CHILD.totalDays} days this month — ${CHILD.att}% attendance. Excellent!`,
        'Next exam date?':`Term 2 final exams begin on ${CHILD.nextExam}. Please ensure ${CHILD.name.split(' ')[0]} is well prepared.`,
        'Latest results?':`${CHILD.name.split(' ')[0]} achieved an average of ${avg(CHILD.results)}% with overall grade A. Best subject: Social Studies (85%). Well done! 🎉`,
      };
      setMessages(m=>[...m,{role:'assistant',content:FALLBACK[text]||`Based on ${CHILD.name.split(' ')[0]}'s records: ${CHILD.att}% attendance, ৳${CHILD.balance} balance, overall grade A. Add Anthropic credits to enable full AI responses.`}]);
    }
    setLoading(false);
  };

  return (
    <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden',display:'flex',flexDirection:'column',height:440}}>
      <div style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:8,background:'var(--bg2)'}}>
        <div style={{width:7,height:7,background:'var(--green)',borderRadius:'50%'}}/>
        <span style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>SchoolOS AI Assistant</span>
        <span className="badge badge-blue" style={{fontSize:9,marginLeft:4}}>Claude</span>
      </div>
      <div style={{flex:1,padding:14,display:'flex',flexDirection:'column',gap:8,overflowY:'auto',background:'var(--bg)'}}>
        {messages.map((m,i)=>(
          <div key={i} style={{padding:'9px 12px',borderRadius:12,fontSize:12,lineHeight:1.6,maxWidth:'85%',alignSelf:m.role==='user'?'flex-end':'flex-start',background:m.role==='user'?'var(--blue)':'var(--bg3)',color:m.role==='user'?'#fff':'var(--text2)',border:m.role!=='user'?'1px solid var(--border)':'none'}}>{m.content}</div>
        ))}
        {loading&&<div style={{padding:'9px 12px',borderRadius:12,fontSize:12,background:'var(--bg3)',color:'var(--text3)',alignSelf:'flex-start',border:'1px solid var(--border)'}}>Thinking…</div>}
        <div ref={bottomRef}/>
      </div>
      <div style={{padding:'8px 14px',borderTop:'1px solid var(--border)',background:'var(--bg3)',display:'flex',gap:6,flexWrap:'wrap'}}>
        {QUICK.map(q=><button key={q} onClick={()=>send(q)} style={{padding:'4px 10px',borderRadius:20,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'var(--bg4)',color:'var(--text2)'}}>{q}</button>)}
      </div>
      <div style={{display:'flex',gap:8,padding:'10px 14px',borderTop:'1px solid var(--border)',background:'var(--bg2)'}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask about fees, attendance, results…" style={{flex:1,padding:'8px 12px',border:'1px solid var(--border2)',borderRadius:8,fontSize:12,background:'var(--bg3)',color:'var(--text)',outline:'none'}}/>
        <button onClick={()=>send()} disabled={loading} style={{padding:'8px 14px',background:'var(--blue)',color:'#fff',border:'none',borderRadius:8,fontSize:12,cursor:'pointer',fontWeight:600}}>Send ↗</button>
      </div>
    </div>
  );
}

// ── Main Portal ───────────────────────────────────────────────────────────────
export default function ParentPortal() {
  const [tab, setTab] = useState('home');
  const TABS = [['home','🏠','Home'],['attendance','✅','Attendance'],['fees','💰','Fees'],['results','📊','Results'],['ai','🤖','Ask AI']];

  const renderPage = () => {
    switch(tab) {
      case 'home':       return <HomePage/>;
      case 'attendance': return <AttendancePage/>;
      case 'fees':       return <FeesPage/>;
      case 'results':    return <ResultsPage/>;
      case 'ai':         return <AIChatPage/>;
      default:           return <HomePage/>;
    }
  };

  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100vh',background:'var(--bg)'}}>
      {/* Nav */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',background:'var(--bg2)',borderBottom:'1px solid var(--border)',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:8,fontSize:14,fontWeight:600,color:'var(--text)'}}>
          <div style={{width:28,height:28,borderRadius:7,background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12,fontWeight:700}}>S</div>
          SchoolOS Parent
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'5px 12px 5px 5px',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:20,cursor:'pointer'}}>
            <div style={{width:26,height:26,borderRadius:'50%',background:'var(--blue-dim)',color:'var(--blue)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700}}>{CHILD.initials}</div>
            <span style={{fontSize:12,color:'var(--text2)'}}>{CHILD.name}</span>
            <span style={{fontSize:12,color:'var(--text3)'}}>▾</span>
          </div>
          <div style={{width:28,height:28,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:14}}>🔔</div>
        </div>
      </div>

      {/* Content */}
      <div style={{flex:1,padding:'16px 20px',overflowY:'auto'}}>{renderPage()}</div>

      {/* Bottom tabs */}
      <div style={{display:'flex',background:'var(--bg2)',borderTop:'1px solid var(--border)',position:'sticky',bottom:0}}>
        {TABS.map(([id,icon,label])=>(
          <div key={id} onClick={()=>setTab(id)} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'10px 4px',cursor:'pointer',color:tab===id?'var(--blue)':'var(--text3)',fontSize:10,gap:3,borderTop:`2px solid ${tab===id?'var(--blue)':'transparent'}`,transition:'all .15s'}}>
            <div style={{fontSize:20}}>{icon}</div>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
