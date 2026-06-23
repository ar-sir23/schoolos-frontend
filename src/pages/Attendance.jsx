import React, { useState } from 'react';

const STUDENTS = [
  {id:'STU-001',name:'Aisha Rahman', initials:'AR',cls:'8-A', monthly:95,streak:'12 days',status:'present',avBg:'#1E3A5F',avColor:'#3B82F6'},
  {id:'STU-002',name:'Karim Ahmed',  initials:'KA',cls:'9-B', monthly:78,streak:'3 days', status:'present',avBg:'#451A03',avColor:'#F59E0B'},
  {id:'STU-003',name:'Fatema Begum', initials:'FB',cls:'7-A', monthly:61,streak:'0 days', status:'absent', avBg:'#450A0A',avColor:'#EF4444'},
  {id:'STU-004',name:'Mehedi Islam', initials:'MI',cls:'6-B', monthly:92,streak:'8 days', status:'present',avBg:'#2E1065',avColor:'#8B5CF6'},
  {id:'STU-005',name:'Sadia Akter',  initials:'SA',cls:'7-C', monthly:74,streak:'1 day',  status:'late',   avBg:'#064E3B',avColor:'#10B981'},
  {id:'STU-006',name:'Rafiq Hossain',initials:'RH',cls:'9-A', monthly:55,streak:'0 days', status:'absent', avBg:'#450A0A',avColor:'#EF4444'},
  {id:'STU-007',name:'Nadia Karim',  initials:'NK',cls:'8-A', monthly:88,streak:'5 days', status:'present',avBg:'#1E3A5F',avColor:'#3B82F6'},
  {id:'STU-008',name:'Tanvir Hassan',initials:'TH',cls:'10-A',monthly:96,streak:'15 days',status:'present',avBg:'#2E1065',avColor:'#8B5CF6'},
];

const CLASSES = [['Class 10-A',98],['Class 9-B',91],['Class 8-C',76],['Class 7-A',62],['Class 6-B',88]];
const ALERTS  = [
  {initials:'FB',name:'Fatema Begum', sub:'7-A · 8 absences this month',bg:'#450A0A',color:'#EF4444'},
  {initials:'RH',name:'Rafiq Hossain',sub:'9-A · 6 absences this month',bg:'#450A0A',color:'#EF4444'},
  {initials:'SA',name:'Sadia Akter',  sub:'7-C · 5 absences this month',bg:'#064E3B',color:'#10B981'},
  {initials:'KA',name:'Karim Ahmed',  sub:'9-B · 4 absences this month',bg:'#451A03',color:'#F59E0B'},
];
const CAL_DATA = [null,null,'present','present','present','present',null,'present','absent','present','late','present','present',null,'present','present','absent','present','present','present',null,'absent','present','present','present','late','present',null,'present','present','absent'];

const monthColor = m => m >= 80 ? 'up' : m >= 70 ? 'warn' : 'danger';
const barColor   = p => p >= 80 ? 'var(--green)' : p >= 70 ? 'var(--amber)' : 'var(--red)';
const badgeColor = s => s === 'present' ? 'badge-green' : s === 'absent' ? 'badge-red' : 'badge-amber';

export default function Attendance() {
  const [roster, setRoster]     = useState(STUDENTS.map(s => ({...s})));
  const [search, setSearch]     = useState('');
  const [clsFilter, setClsFilter] = useState('');
  const [saved, setSaved]       = useState(false);

  const filtered = roster.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (!clsFilter || s.cls === clsFilter)
  );

  const setStatus = (id, status) => {
    setRoster(r => r.map(s => s.id === id ? {...s, status} : s));
  };

  const saveAttendance = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const present = roster.filter(s => s.status === 'present').length;
  const absent  = roster.filter(s => s.status === 'absent').length;
  const late    = roster.filter(s => s.status === 'late').length;

  const inp = {padding:'8px 12px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg2)',color:'var(--text2)',fontSize:13,outline:'none',cursor:'pointer'};

  const AttBtn = ({current, status, label, id}) => (
    <button onClick={() => setStatus(id, status)}
      style={{
        padding:'5px 10px', borderRadius:6, fontSize:11, fontWeight:600,
        cursor:'pointer', border:'1px solid var(--border)', transition:'all .15s',
        background: current === status ? (status==='present'?'var(--green-dim)':status==='absent'?'var(--red-dim)':'var(--amber-dim)') : 'transparent',
        color: current === status ? (status==='present'?'var(--green)':status==='absent'?'var(--red)':'var(--amber)') : 'var(--text3)',
        borderColor: current === status ? (status==='present'?'var(--green-dim)':status==='absent'?'var(--red-dim)':'var(--amber-dim)') : 'var(--border)',
      }}>{label}</button>
  );

  return (
    <div className="main">
      {saved && (
        <div style={{position:'fixed',top:70,right:24,background:'var(--green-dim)',border:'1px solid var(--green)',borderRadius:10,padding:'12px 18px',fontSize:13,color:'var(--green)',zIndex:999}}>
          ✅ Attendance saved! Present: {present} · Absent: {absent} · Late: {late}
        </div>
      )}

      <div className="page-header">
        <div>
          <div className="page-title">Attendance</div>
          <div className="page-sub">{new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})} · Term 2</div>
        </div>
        <div className="btn-group">
          <button className="btn">📊 Export report</button>
          <button className="btn" style={{color:'var(--amber)'}}>🔔 Send AI alerts</button>
          <button className="btn btn-primary" onClick={saveAttendance}>✅ Save attendance</button>
        </div>
      </div>

      {/* Metrics */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,marginBottom:20}}>
        {[
          {label:'Total students',value:'1,248',  sub:'enrolled',          cls:'info'},
          {label:'Present today', value:present+1168,sub:`${((present+1168)/1248*100).toFixed(1)}%`,cls:'up'},
          {label:'Absent today',  value:absent+64,  sub:'needs attention',  cls:'danger'},
          {label:'Late arrivals', value:late+15,    sub:'this morning',     cls:'warn'},
          {label:'Monthly avg',   value:'91.3%',    sub:'↑ +2.1% vs last',  cls:'up'},
        ].map(m=>(
          <div key={m.label} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,padding:'14px 16px'}}>
            <div style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',marginBottom:4}}>{m.label}</div>
            <div style={{fontSize:20,fontWeight:600,color:'var(--text)'}}>{m.value}</div>
            <div className={m.cls} style={{fontSize:10,marginTop:3}}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:16}}>
        {/* Roster */}
        <div>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16,flexWrap:'wrap'}}>
            <div style={{position:'relative',flex:1,minWidth:180}}>
              <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text3)'}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student…"
                style={{width:'100%',padding:'9px 12px 9px 36px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg2)',color:'var(--text)',fontSize:13,outline:'none'}}/>
            </div>
            <select value={clsFilter} onChange={e=>setClsFilter(e.target.value)} style={inp}>
              <option value="">All classes</option>
              {['8-A','9-B','7-A','6-B','10-A'].map(c=><option key={c} value={c}>Class {c}</option>)}
            </select>
            <select style={inp}><option>Today</option><option>This week</option><option>This month</option></select>
          </div>

          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
            {/* Header */}
            <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr 140px',background:'var(--bg3)',borderBottom:'1px solid var(--border)'}}>
              {['Student','Class','Monthly %','Streak','Status','Mark'].map(h=>(
                <div key={h} style={{padding:'12px 16px',fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em'}}>{h}</div>
              ))}
            </div>

            {/* Rows */}
            {filtered.map((s,i) => (
              <div key={s.id} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr 140px',borderBottom:i<filtered.length-1?'1px solid var(--border)':'none',transition:'background .1s'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--bg3)'}
                onMouseLeave={e=>e.currentTarget.style.background=''}>
                <div style={{padding:'11px 16px',display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:30,height:30,borderRadius:8,background:s.avBg,color:s.avColor,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,flexShrink:0}}>{s.initials}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{s.name}</div>
                    <div style={{fontSize:10,color:'var(--text3)'}}>{s.id}</div>
                  </div>
                </div>
                <div style={{padding:'11px 16px',display:'flex',alignItems:'center',color:'var(--text3)',fontSize:13}}>{s.cls}</div>
                <div style={{padding:'11px 16px',display:'flex',alignItems:'center'}}><span className={monthColor(s.monthly)}>{s.monthly}%</span></div>
                <div style={{padding:'11px 16px',display:'flex',alignItems:'center',fontSize:12,color:'var(--text3)'}}>{s.streak}</div>
                <div style={{padding:'11px 16px',display:'flex',alignItems:'center'}}>
                  <span className={`badge ${badgeColor(s.status)}`}>{s.status}</span>
                </div>
                <div style={{padding:'11px 16px',display:'flex',alignItems:'center',gap:4}}>
                  <AttBtn current={s.status} status="present" label="P" id={s.id}/>
                  <AttBtn current={s.status} status="absent"  label="A" id={s.id}/>
                  <AttBtn current={s.status} status="late"    label="L" id={s.id}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>

          {/* Class bars */}
          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:18}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
              <span style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>Class overview</span>
              <span className="badge badge-blue">Today</span>
            </div>
            {CLASSES.map(([cls,pct])=>(
              <div key={cls} style={{marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:3}}>
                  <span style={{color:'var(--text2)'}}>{cls}</span>
                  <span className={pct>=80?'up':pct>=70?'warn':'danger'} style={{fontWeight:600}}>{pct}%</span>
                </div>
                <div style={{height:6,background:'var(--bg3)',borderRadius:3,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${pct}%`,background:barColor(pct),borderRadius:3}}/>
                </div>
              </div>
            ))}
          </div>

          {/* AI alerts */}
          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:18}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
              <span style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>AI alert queue</span>
              <span className="badge badge-red">4 pending</span>
            </div>
            {ALERTS.map(a=>(
              <div key={a.name} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                <div style={{width:32,height:32,borderRadius:8,background:a.bg,color:a.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,flexShrink:0}}>{a.initials}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{a.name}</div>
                  <div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>{a.sub}</div>
                </div>
                <button style={{padding:'4px 10px',borderRadius:6,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--blue)'}}>Alert</button>
              </div>
            ))}
            <button className="btn btn-primary" style={{width:'100%',marginTop:12}}>Send all alerts ↗</button>
          </div>

          {/* Mini calendar */}
          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:18}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
              <span style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>Attendance calendar</span>
              <span style={{fontSize:11,color:'var(--text3)'}}>Fatema Begum</span>
            </div>
            <div style={{display:'flex',gap:12,marginBottom:10,fontSize:10,color:'var(--text3)'}}>
              {[['var(--green)','Present'],['var(--red)','Absent'],['var(--amber)','Late']].map(([c,l])=>(
                <span key={l}><span style={{display:'inline-block',width:8,height:8,borderRadius:2,background:c,marginRight:3}}></span>{l}</span>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4}}>
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=>(
                <div key={d} style={{aspectRatio:1,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'var(--text3)',fontWeight:600}}>{d}</div>
              ))}
              {CAL_DATA.map((d,i)=>(
                <div key={i} style={{aspectRatio:1,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,cursor:d?'pointer':'default',
                  background:d==='present'?'var(--green-dim)':d==='absent'?'var(--red-dim)':d==='late'?'var(--amber-dim)':'transparent',
                  color:d==='present'?'var(--green)':d==='absent'?'var(--red)':d==='late'?'var(--amber)':'transparent',
                  border:i===30?'2px solid var(--blue)':'none',
                }}>{d?i+1:''}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
