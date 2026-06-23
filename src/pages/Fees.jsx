import React, { useState } from 'react';

const statusColor = s => s === 'Paid' ? 'badge-green' : s === 'Partial' ? 'badge-amber' : 'badge-red';

const INVOICES = [
  {no:'INV-2026-11201',student:'Aisha Rahman',  cls:'8-A', due:4500,paid:4500,balance:0,   date:'May 10',status:'Paid',   risk:8 },
  {no:'INV-2026-11202',student:'Karim Ahmed',   cls:'9-B', due:4500,paid:0,   balance:4500,date:'May 10',status:'Overdue',risk:78},
  {no:'INV-2026-11203',student:'Fatema Begum',  cls:'7-A', due:4500,paid:0,   balance:4500,date:'Apr 10',status:'Overdue',risk:91},
  {no:'INV-2026-11204',student:'Mehedi Islam',  cls:'6-B', due:4500,paid:4500,balance:0,   date:'May 10',status:'Paid',   risk:5 },
  {no:'INV-2026-11205',student:'Sadia Akter',   cls:'7-C', due:4500,paid:2000,balance:2500,date:'May 10',status:'Partial',risk:55},
  {no:'INV-2026-11206',student:'Rafiq Hossain', cls:'9-A', due:4500,paid:0,   balance:4500,date:'Mar 10',status:'Overdue',risk:95},
  {no:'INV-2026-11207',student:'Nadia Karim',   cls:'8-A', due:4500,paid:2250,balance:2250,date:'May 10',status:'Partial',risk:42},
  {no:'INV-2026-11208',student:'Tanvir Hassan', cls:'10-A',due:4500,paid:4500,balance:0,   date:'May 10',status:'Paid',   risk:3 },
];

const METHODS = [['💵','Cash'],['🏦','Bank'],['📱','bKash'],['📲','Nagad'],['💳','Card'],['🔄','Other']];

function PaymentModal({ onClose }) {
  const [method, setMethod] = useState('bKash');
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={onClose}>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:16,padding:28,width:440,maxHeight:'90vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <span style={{fontSize:16,fontWeight:600,color:'var(--text)'}}>💰 Record payment</span>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',cursor:'pointer',color:'var(--text2)',fontSize:16}}>✕</button>
        </div>
        {[{label:'Student',type:'text',placeholder:'Search student name or ID…'},{label:'Invoice',type:'select'}].map((f,i)=>(
          <div key={i} style={{marginBottom:16}}>
            <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>{f.label}</label>
            {f.type==='select'?(
              <select style={{width:'100%',padding:'10px 14px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg3)',color:'var(--text)',fontSize:13,outline:'none'}}>
                <option>INV-2026-11202 — Karim Ahmed — ৳4,500 overdue</option>
                <option>INV-2026-11205 — Sadia Akter — ৳2,500 partial</option>
              </select>
            ):(
              <input placeholder={f.placeholder} style={{width:'100%',padding:'10px 14px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg3)',color:'var(--text)',fontSize:13,outline:'none'}}/>
            )}
          </div>
        ))}
        <div style={{background:'var(--bg3)',borderRadius:10,padding:14,marginBottom:16}}>
          {[{l:'Amount due',v:'৳4,500'},{l:'Already paid',v:'৳0',cls:'up'},{l:'Balance',v:'৳4,500',cls:'danger',bold:true}].map(r=>(
            <div key={r.l} style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:r.bold?0:6,paddingTop:r.bold?6:0,borderTop:r.bold?'1px solid var(--border)':undefined,fontWeight:r.bold?600:400}}>
              <span style={{color:'var(--text2)'}}>{r.l}</span><span className={r.cls||''}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Payment amount (৳)</label>
          <input type="number" defaultValue="4500" style={{width:'100%',padding:'10px 14px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg3)',color:'var(--text)',fontSize:13,outline:'none'}}/>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Payment method</label>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
            {METHODS.map(([icon,m])=>(
              <div key={m} onClick={()=>setMethod(m)} style={{padding:'10px 8px',border:`1px solid ${method===m?'var(--blue)':'var(--border)'}`,borderRadius:8,cursor:'pointer',textAlign:'center',fontSize:12,color:method===m?'var(--blue)':'var(--text2)',background:method===m?'var(--blue-dim)':'var(--bg3)',transition:'all .15s'}}>
                {icon} {m}
              </div>
            ))}
          </div>
        </div>
        {[{label:'Transaction ID (optional)',placeholder:'e.g. bKash TxID…'},{label:'Note',placeholder:'Optional note…'}].map((f,i)=>(
          <div key={i} style={{marginBottom:16}}>
            <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>{f.label}</label>
            <input placeholder={f.placeholder} style={{width:'100%',padding:'10px 14px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg3)',color:'var(--text)',fontSize:13,outline:'none'}}/>
          </div>
        ))}
        <div style={{display:'flex',gap:8}}>
          <button onClick={onClose} style={{flex:1,padding:11,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--text2)',fontSize:13,cursor:'pointer'}}>Cancel</button>
          <button onClick={onClose} style={{flex:2,padding:11,borderRadius:8,background:'var(--green)',border:'none',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer'}}>✅ Record payment</button>
        </div>
      </div>
    </div>
  );
}

export default function Fees() {
  const [tab, setTab]       = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal]   = useState(false);

  const filtered = INVOICES.filter(inv => {
    const matchTab    = tab === 'all' || inv.status.toLowerCase() === tab;
    const matchSearch = inv.student.toLowerCase().includes(search.toLowerCase()) || inv.no.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const riskColor = r => r > 60 ? 'badge-red' : r > 30 ? 'badge-amber' : 'badge-green';
  const riskBg    = r => r > 60 ? 'var(--red)'  : r > 30 ? 'var(--amber)' : 'var(--green)';

  const inp = {padding:'8px 12px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg2)',color:'var(--text2)',fontSize:13,outline:'none',cursor:'pointer'};

  return (
    <div className="main">
      {modal && <PaymentModal onClose={() => setModal(false)} />}

      <div className="page-header">
        <div><div className="page-title">Fee Management</div><div className="page-sub">Term 2, 2026 · ৳21.2L total due</div></div>
        <div className="btn-group">
          <button className="btn">🧠 AI risk scan</button>
          <button className="btn" style={{color:'var(--red)',borderColor:'var(--red-dim)'}}>📢 Send reminders</button>
          <button className="btn btn-primary" onClick={() => setModal(true)}>+ Record payment</button>
        </div>
      </div>

      {/* Metrics */}
      <div className="metrics">
        {[
          {icon:'💰',label:'Total due',     value:'৳21.2L',sub:'Term 2 target',    subCls:'info',  bg:'var(--blue-dim)',  color:'var(--blue)'},
          {icon:'✅',label:'Collected',     value:'৳18.4L',sub:'↑ 87% of target', subCls:'up',    bg:'var(--green-dim)', color:'var(--green)'},
          {icon:'⚠️',label:'Overdue',       value:'৳2.8L', sub:'41 students',      subCls:'danger',bg:'var(--red-dim)',   color:'var(--red)'},
          {icon:'🧠',label:'AI flagged',    value:'12',    sub:'high risk',         subCls:'warn',  bg:'var(--purple-dim)',color:'var(--purple)'},
        ].map(m=>(
          <div key={m.label} className="metric">
            <div className="metric-icon" style={{background:m.bg,color:m.color}}>{m.icon}</div>
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
            <div className={`metric-sub ${m.subCls}`}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:18,marginBottom:20}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <span style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>Collection progress</span>
          <span style={{fontSize:13,color:'var(--green)',fontWeight:600}}>87% collected</span>
        </div>
        <div style={{height:8,background:'var(--bg3)',borderRadius:4,overflow:'hidden',marginBottom:8}}>
          <div style={{height:'100%',width:'87%',borderRadius:4,background:'linear-gradient(90deg,#3B82F6,#10B981)'}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--text3)',marginBottom:16}}>
          <span>৳0</span><span>৳18.4L collected</span><span>৳21.2L target</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
          {[['bKash','৳8.2L','39%','#8B5CF6'],['Cash','৳5.1L','24%','#3B82F6'],['Bank','৳3.8L','18%','#10B981'],['Nagad','৳1.3L','6%','#F59E0B']].map(([m,a,p,c])=>(
            <div key={m} style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px'}}>
              <div style={{fontSize:11,color:'var(--text3)',marginBottom:4}}>{m}</div>
              <div style={{fontSize:15,fontWeight:600,color:'var(--text)'}}>{a}</div>
              <div style={{fontSize:10,color:c,marginTop:2}}>{p} of total</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:4,marginBottom:16,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:4,width:'fit-content'}}>
        {[['all','All invoices'],['overdue','Overdue'],['partial','Partial'],['paid','Paid']].map(([v,l])=>(
          <button key={v} onClick={()=>setTab(v)} style={{padding:'7px 18px',borderRadius:8,fontSize:13,cursor:'pointer',border:'none',background:tab===v?'var(--bg4)':'transparent',color:tab===v?'var(--text)':'var(--text2)',fontWeight:tab===v?500:400,transition:'all .15s'}}>{l}</button>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16,flexWrap:'wrap'}}>
        <div style={{position:'relative',flex:1,minWidth:200}}>
          <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text3)'}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by student or invoice…"
            style={{width:'100%',padding:'9px 12px 9px 36px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg2)',color:'var(--text)',fontSize:13,outline:'none'}}/>
        </div>
        <select style={inp}><option>All grades</option><option>Class 6</option><option>Class 7</option><option>Class 8</option></select>
        <select style={inp}><option>All months</option><option>May 2026</option><option>Apr 2026</option></select>
      </div>

      {/* Table */}
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead style={{background:'var(--bg3)'}}>
            <tr>{['','Invoice','Student','Class','Amount due','Paid','Balance','Due date','Status','AI risk','Actions'].map(h=>(
              <th key={h} style={{textAlign:'left',fontWeight:600,color:'var(--text3)',padding:'12px 16px',fontSize:11,textTransform:'uppercase',letterSpacing:'.04em',borderBottom:'1px solid var(--border)'}}>
                {h===''?<input type="checkbox" style={{accentColor:'var(--blue)'}}/>:h}
              </th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map((inv,i)=>(
              <tr key={inv.no} onMouseEnter={e=>[...e.currentTarget.cells].forEach(c=>c.style.background='var(--bg3)')} onMouseLeave={e=>[...e.currentTarget.cells].forEach(c=>c.style.background='')}>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}><input type="checkbox" style={{accentColor:'var(--blue)'}}/></td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',fontSize:12,color:'var(--text3)'}}>{inv.no}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',fontWeight:500}}>{inv.student}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',color:'var(--text3)'}}>{inv.cls}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>৳{inv.due.toLocaleString()}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}} className="up">৳{inv.paid.toLocaleString()}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}} className={inv.balance>0?'danger':'up'}>৳{inv.balance.toLocaleString()}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',color:'var(--text3)',fontSize:12}}>{inv.date}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}><span className={`badge ${statusColor(inv.status)}`}>{inv.status}</span></td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <span className={`badge ${riskColor(inv.risk)}`} style={{fontSize:10}}>{inv.risk}</span>
                    <div style={{width:40,height:4,background:'var(--bg3)',borderRadius:2,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${inv.risk}%`,background:riskBg(inv.risk),borderRadius:2}}/>
                    </div>
                  </div>
                </td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>
                  <div style={{display:'flex',gap:6}}>
                    <button onClick={()=>setModal(true)} style={{padding:'4px 10px',borderRadius:6,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--green)'}}>Pay</button>
                    <button style={{padding:'4px 10px',borderRadius:6,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--text2)'}}>Alert</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px',borderTop:'1px solid var(--border)'}}>
          <span style={{fontSize:12,color:'var(--text3)'}}>Showing 1–{filtered.length} of {filtered.length} invoices</span>
          <div style={{display:'flex',gap:4}}>
            {['‹','1','2','3','›'].map((p,i)=>(
              <button key={i} style={{width:30,height:30,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,cursor:'pointer',border:'1px solid var(--border)',background:p==='1'?'var(--blue)':'transparent',color:p==='1'?'#fff':'var(--text2)'}}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
