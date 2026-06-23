import React, { useState } from 'react';

const BarChart = ({ data, maxVal }) => (
  <div style={{display:'flex',alignItems:'flex-end',gap:8,height:120,paddingTop:10}}>
    {data.map(([label, value, color]) => (
      <div key={label} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
        <div style={{fontSize:10,fontWeight:600,color:'var(--text2)'}}>{value}</div>
        <div style={{width:'100%',borderRadius:'4px 4px 0 0',background:color,height:`${(parseFloat(value)/maxVal)*100}%`,minHeight:4,cursor:'pointer',transition:'opacity .15s'}} onMouseEnter={e=>e.target.style.opacity='.8'} onMouseLeave={e=>e.target.style.opacity='1'}/>
        <div style={{fontSize:10,color:'var(--text3)',textAlign:'center'}}>{label}</div>
      </div>
    ))}
  </div>
);

const DonutChart = ({ segments, center, sub }) => {
  let offset = 0;
  const r = 35, circ = 2*Math.PI*r;
  return (
    <div style={{display:'flex',alignItems:'center',gap:20}}>
      <div style={{position:'relative',width:100,height:100,flexShrink:0}}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{transform:'rotate(-90deg)'}}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--bg3)" strokeWidth="12"/>
          {segments.map(([pct,color],i) => {
            const dash = (pct/100)*circ;
            const el = <circle key={i} cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="12" strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-offset}/>;
            offset += dash;
            return el;
          })}
        </svg>
        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <div style={{fontSize:18,fontWeight:700,color:'var(--text)'}}>{center}</div>
          <div style={{fontSize:10,color:'var(--text3)',marginTop:2}}>{sub}</div>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {segments.map(([pct,color,label,count]) => (
          <div key={label} style={{display:'flex',alignItems:'center',gap:8,fontSize:12}}>
            <div style={{width:10,height:10,borderRadius:3,background:color,flexShrink:0}}/>
            <div><div style={{fontWeight:500,color:'var(--text)'}}>{label} — {pct}%</div><div style={{fontSize:10,color:'var(--text3)'}}>{count}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BarRow = ({ label, value, max, color }) => (
  <div style={{marginBottom:8}}>
    <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:3}}>
      <span style={{color:'var(--text2)'}}>{label}</span>
      <span style={{fontWeight:600,color}}>{value}%</span>
    </div>
    <div style={{height:5,background:'var(--bg3)',borderRadius:3,overflow:'hidden'}}>
      <div style={{height:'100%',width:`${value}%`,background:color,borderRadius:3}}/>
    </div>
  </div>
);

export default function Reports() {
  const [tab, setTab] = useState('overview');

  const card = (children, style={}) => (
    <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:18,...style}}>{children}</div>
  );

  const cardHead = (title, badge, badgeColor='badge-green') => (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
      <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{title}</div>
      {badge && <span className={`badge ${badgeColor}`}>{badge}</span>}
    </div>
  );

  const TABS = [['overview','Overview'],['fees','Fee reports'],['attendance','Attendance'],['academic','Academic']];

  const renderOverview = () => (
    <>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:20}}>
        {[{icon:'📊',label:'Total students',value:'1,248',sub:'↑ +34 this term',cls:'up',bg:'var(--blue-dim)',c:'var(--blue)'},{icon:'✅',label:'Avg attendance',value:'91.3%',sub:'↑ +2.1% vs last',cls:'up',bg:'var(--green-dim)',c:'var(--green)'},{icon:'💰',label:'Fee collection',value:'87%',sub:'৳18.4L collected',cls:'up',bg:'var(--purple-dim)',c:'var(--purple)'},{icon:'🏆',label:'Pass rate',value:'94.2%',sub:'↑ +1.3% vs last',cls:'up',bg:'var(--amber-dim)',c:'var(--amber)'}].map(m=>(
          <div key={m.label} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,padding:'14px 16px'}}>
            <div style={{width:36,height:36,borderRadius:10,background:m.bg,color:m.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,marginBottom:10}}>{m.icon}</div>
            <div style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',marginBottom:4}}>{m.label}</div>
            <div style={{fontSize:20,fontWeight:600,color:'var(--text)'}}>{m.value}</div>
            <div className={m.cls} style={{fontSize:10,marginTop:3}}>{m.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:16}}>
        {card(<>
          {cardHead('Monthly fee collection','On track','badge-green')}
          <BarChart data={[['Jan','14.2L','var(--blue)'],['Feb','15.8L','var(--blue)'],['Mar','16.1L','var(--blue)'],['Apr','17.2L','var(--blue)'],['May','18.4L','var(--green)'],['Jun','8.1L','var(--text3)']]} maxVal={18.4}/>
        </>)}
        {card(<>
          {cardHead('Fee status')}
          <DonutChart segments={[[87,'var(--green)','Paid','1,089 students'],[9.5,'var(--amber)','Partial','118 students'],[3.5,'var(--red)','Overdue','41 students']]} center="87%" sub="paid"/>
        </>)}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
        {card(<>
          {cardHead('Attendance by class')}
          {[['Class 10-A',98,'var(--green)'],['Class 9-B',91,'var(--green)'],['Class 8-C',76,'var(--amber)'],['Class 7-A',62,'var(--red)'],['Class 6-B',88,'var(--green)']].map(([c,p,col])=>(
            <BarRow key={c} label={c} value={p} color={col}/>
          ))}
        </>)}
        {card(<>
          {cardHead('Top performers')}
          {[['Mehedi Islam','6-B','94%'],['Tanvir Hassan','10-A','91%'],['Aisha Rahman','8-A','78%'],['Nadia Karim','8-A','77%'],['Sadia Akter','7-C','69%']].map(([n,c,s],i)=>(
            <div key={n} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:'1px solid var(--border)'}}>
              <div style={{width:20,fontSize:11,fontWeight:600,color:i===0?'var(--amber)':'var(--text3)'}}>{i+1}</div>
              <div style={{flex:1,fontSize:12,fontWeight:500,color:'var(--text)'}}>{n}</div>
              <div style={{fontSize:11,color:'var(--text3)',marginRight:8}}>{c}</div>
              <div style={{fontSize:12,fontWeight:600,color:'var(--green)'}}>{s}</div>
            </div>
          ))}
        </>)}
        {card(<>
          {cardHead('Quick reports')}
          {[['📊','Monthly summary','var(--blue-dim)','var(--blue)'],['💰','Fee collection','var(--green-dim)','var(--green)'],['✅','Attendance','var(--amber-dim)','var(--amber)'],['📋','Report cards','var(--purple-dim)','var(--purple)'],['🧠','AI insights','var(--red-dim)','var(--red)']].map(([i,n,bg,c])=>(
            <div key={n} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:'var(--bg3)',borderRadius:8,marginBottom:6,cursor:'pointer',transition:'all .15s'}} onMouseEnter={e=>e.currentTarget.style.background='var(--bg4)'} onMouseLeave={e=>e.currentTarget.style.background='var(--bg3)'}>
              <div style={{width:32,height:32,borderRadius:8,background:bg,color:c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>{i}</div>
              <div style={{flex:1,fontSize:13,fontWeight:500,color:'var(--text)'}}>{n}</div>
              <div style={{fontSize:12,color:'var(--text3)'}}>↗</div>
            </div>
          ))}
        </>)}
      </div>
    </>
  );

  const renderFees = () => (
    <>
      {card(<>
        {cardHead('Fee collection by month')}
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
          <thead><tr style={{background:'var(--bg3)'}}>{['Month','Target','Collected','Pending','%','Status'].map(h=><th key={h} style={{textAlign:'left',padding:'8px 12px',fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',borderBottom:'1px solid var(--border)'}}>{h}</th>)}</tr></thead>
          <tbody>{[['January','৳18.0L','৳14.2L','৳3.8L','79%','warn'],['February','৳18.0L','৳15.8L','৳2.2L','88%','up'],['March','৳18.0L','৳16.1L','৳1.9L','89%','up'],['April','৳18.0L','৳17.2L','৳0.8L','96%','up'],['May','৳21.2L','৳18.4L','৳2.8L','87%','up'],['June','৳21.2L','৳8.1L','৳13.1L','38%','warn']].map(([m,t,c,p,pct,cls])=>(
            <tr key={m}>{[m,t,c,p].map((v,i)=><td key={i} style={{padding:'9px 12px',borderBottom:'1px solid var(--border)',fontWeight:i===0?500:400,color:i===2?'var(--green)':i===3?'var(--red)':'var(--text)'}}>{v}</td>)}
            <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)'}} className={cls}>{pct}</td>
            <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)'}}><span className={`badge badge-${cls==='up'?'green':'amber'}`}>{cls==='up'?'On track':'Behind'}</span></td></tr>
          ))}</tbody>
        </table>
      </>,{marginBottom:16})}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        {card(<>
          {cardHead('Payment methods')}
          {[['📱','bKash','৳8.2L','45%','var(--purple)'],['💵','Cash','৳5.1L','28%','var(--blue)'],['🏦','Bank','৳3.8L','21%','var(--green)'],['📲','Nagad','৳1.3L','6%','var(--amber)']].map(([i,m,a,p,c])=>(
            <div key={m} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
              <div style={{fontSize:20}}>{i}</div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{m}</div><div style={{fontSize:10,color:'var(--text3)',marginTop:2}}>{p} of total</div></div>
              <div style={{fontSize:14,fontWeight:600,color:c}}>{a}</div>
            </div>
          ))}
        </>)}
        {card(<>
          {cardHead('Top defaulter classes')}
          {[['Class 9-A',18,'red'],['Class 7-A',12,'red'],['Class 8-C',7,'amber'],['Class 6-B',4,'amber']].map(([c,n,t])=>(
            <div key={c} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
              <span style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{c}</span>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:12,fontWeight:600,color:`var(--${t})`}}>{n} students</span>
                <span className={`badge badge-${t}`}>{t==='red'?'High':'Medium'}</span>
              </div>
            </div>
          ))}
        </>)}
      </div>
    </>
  );

  const renderAttendance = () => (
    <>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        {card(<>
          {cardHead('Monthly attendance trend')}
          <BarChart data={[['Jan','88','var(--blue)'],['Feb','90','var(--blue)'],['Mar','92','var(--blue)'],['Apr','89','var(--blue)'],['May','91','var(--green)'],['Jun','94','var(--green)']]} maxVal={94}/>
        </>)}
        {card(<>
          {cardHead('Attendance status today')}
          <DonutChart segments={[[94.2,'var(--green)','Present','1,174 students'],[4.3,'var(--amber)','Late','54 students'],[1.5,'var(--red)','Absent','20 students']]} center="94%" sub="present"/>
        </>)}
      </div>
      {card(<>
        {cardHead('Chronic absentees (below 75%)','12 students','badge-red')}
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
          <thead><tr style={{background:'var(--bg3)'}}>{['Student','Class','Attendance','Days absent','Parent alerted','Action'].map(h=><th key={h} style={{textAlign:'left',padding:'8px 12px',fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',borderBottom:'1px solid var(--border)'}}>{h}</th>)}</tr></thead>
          <tbody>{[['Fatema Begum','7-A','61%',14,'Yes'],['Rafiq Hossain','9-A','55%',17,'Yes'],['Sadia Akter','7-C','74%',6,'No'],['Jamal Uddin','8-B','70%',7,'No']].map(([n,c,a,d,al])=>(
            <tr key={n}>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)',fontWeight:500}}>{n}</td>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)',color:'var(--text3)'}}>{c}</td>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)',color:'var(--red)',fontWeight:600}}>{a}</td>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)',color:'var(--red)'}}>{d} days</td>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)'}}><span className={`badge badge-${al==='Yes'?'green':'amber'}`}>{al}</span></td>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)'}}><button style={{padding:'4px 10px',borderRadius:6,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--blue)'}}>Alert ↗</button></td>
            </tr>
          ))}</tbody>
        </table>
      </>)}
    </>
  );

  const renderAcademic = () => (
    <>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        {card(<>
          {cardHead('Grade distribution')}
          <BarChart data={[['A+','280','var(--green)'],['A','412','var(--blue)'],['B','298','var(--purple)'],['C','180','var(--amber)'],['D','62','var(--red)'],['F','16','var(--red)']]} maxVal={412}/>
        </>)}
        {card(<>
          {cardHead('Subject pass rates')}
          {[['English',94,'var(--green)'],['Mathematics',87,'var(--blue)'],['Science',91,'var(--green)'],['Bengali',96,'var(--green)'],['Social Studies',89,'var(--blue)']].map(([s,p,c])=>(
            <BarRow key={s} label={s} value={p} color={c}/>
          ))}
        </>)}
      </div>
      {card(<>
        {cardHead('Class-wise academic performance')}
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
          <thead><tr style={{background:'var(--bg3)'}}>{['Class','Students','Avg marks','Pass rate','Top student','Grade'].map(h=><th key={h} style={{textAlign:'left',padding:'8px 12px',fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',borderBottom:'1px solid var(--border)'}}>{h}</th>)}</tr></thead>
          <tbody>{[['Class 10-A',42,82,'98%','Tanvir Hassan','A+'],['Class 9-B',44,74,'94%','Karim Ahmed','A'],['Class 8-A',45,78,'96%','Aisha Rahman','A'],['Class 7-A',43,65,'88%','Fatema Begum','B'],['Class 6-B',44,85,'97%','Mehedi Islam','A+']].map(([c,n,m,p,t,g])=>(
            <tr key={c}>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)',fontWeight:500}}>{c}</td>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)',color:'var(--text3)'}}>{n}</td>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)',fontWeight:600,color:'var(--blue)'}}>{m}%</td>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)',color:'var(--green)'}}>{p}</td>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)',color:'var(--text2)'}}>{t}</td>
              <td style={{padding:'9px 12px',borderBottom:'1px solid var(--border)'}}><span className={`badge badge-${g==='A+'||g==='A'?'green':'blue'}`}>{g}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </>)}
    </>
  );

  const renderPage = () => {
    switch(tab) {
      case 'overview':   return renderOverview();
      case 'fees':       return renderFees();
      case 'attendance': return renderAttendance();
      case 'academic':   return renderAcademic();
      default:           return renderOverview();
    }
  };

  return (
    <div className="main">
      <div className="page-header">
        <div><div className="page-title">Reports & Analytics</div><div className="page-sub">Term 2, 2026 · Real-time school insights</div></div>
        <div className="btn-group">
          <button className="btn">⬇ Export PDF</button>
          <button className="btn btn-primary">🤖 AI summary</button>
        </div>
      </div>

      <div style={{display:'flex',gap:4,marginBottom:20,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:4,width:'fit-content'}}>
        {TABS.map(([v,l])=>(
          <button key={v} onClick={()=>setTab(v)} style={{padding:'7px 18px',borderRadius:8,fontSize:13,cursor:'pointer',border:'none',background:tab===v?'var(--bg4)':'transparent',color:tab===v?'var(--text)':'var(--text2)',fontWeight:tab===v?500:400,transition:'all .15s'}}>{l}</button>
        ))}
      </div>

      {renderPage()}
    </div>
  );
}
