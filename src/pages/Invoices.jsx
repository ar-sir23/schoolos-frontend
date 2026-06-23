import React, { useState } from 'react';

const INVOICES = [
  {no:'INV-2026-11201',student:'Aisha Rahman',  cls:'8-A', amount:4500,paid:4500,balance:0,   date:'May 10',status:'Paid',   method:'bKash'},
  {no:'INV-2026-11202',student:'Karim Ahmed',   cls:'9-B', amount:4500,paid:0,   balance:4500,date:'May 10',status:'Overdue',method:'—'},
  {no:'INV-2026-11203',student:'Fatema Begum',  cls:'7-A', amount:4500,paid:0,   balance:4500,date:'Apr 10',status:'Overdue',method:'—'},
  {no:'INV-2026-11204',student:'Mehedi Islam',  cls:'6-B', amount:4500,paid:4500,balance:0,   date:'May 10',status:'Paid',   method:'Cash'},
  {no:'INV-2026-11205',student:'Sadia Akter',   cls:'7-C', amount:4500,paid:2000,balance:2500,date:'May 10',status:'Partial',method:'Nagad'},
  {no:'INV-2026-11206',student:'Rafiq Hossain', cls:'9-A', amount:4500,paid:0,   balance:4500,date:'Mar 10',status:'Overdue',method:'—'},
  {no:'INV-2026-11207',student:'Nadia Karim',   cls:'8-A', amount:4500,paid:2250,balance:2250,date:'May 10',status:'Partial',method:'bKash'},
  {no:'INV-2026-11208',student:'Tanvir Hassan', cls:'10-A',amount:4500,paid:4500,balance:0,   date:'May 10',status:'Paid',   method:'Bank'},
  {no:'INV-2026-11209',student:'Rina Begum',    cls:'6-A', amount:4500,paid:4500,balance:0,   date:'May 10',status:'Paid',   method:'bKash'},
  {no:'INV-2026-11210',student:'Jamal Uddin',   cls:'8-B', amount:4500,paid:0,   balance:4500,date:'May 10',status:'Pending',method:'—'},
];

const statusColor = s => s==='Paid'?'badge-green':s==='Partial'?'badge-amber':s==='Overdue'?'badge-red':'badge-blue';

function NewInvoiceModal({ onClose }) {
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={onClose}>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:16,padding:28,width:480}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <span style={{fontSize:16,fontWeight:600,color:'var(--text)'}}>🧾 New invoice</span>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',cursor:'pointer',color:'var(--text2)',fontSize:16}}>✕</button>
        </div>
        {[{label:'Student',type:'text',placeholder:'Search student name or ID…'},{label:'Fee type',type:'select',options:['Tuition fee','Transport fee','Library fee','Exam fee']},{label:'Amount (৳)',type:'number',placeholder:'Enter amount',value:'4500'},{label:'Due date',type:'date',value:'2026-06-10'},{label:'Note (optional)',type:'text',placeholder:'Any note…'}].map((f,i)=>(
          <div key={i} style={{marginBottom:14}}>
            <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>{f.label}</label>
            {f.type==='select'?(
              <select style={{width:'100%',padding:'10px 14px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg3)',color:'var(--text)',fontSize:13,outline:'none'}}>
                {f.options.map(o=><option key={o}>{o}</option>)}
              </select>
            ):(
              <input type={f.type} placeholder={f.placeholder} defaultValue={f.value} style={{width:'100%',padding:'10px 14px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg3)',color:'var(--text)',fontSize:13,outline:'none'}}/>
            )}
          </div>
        ))}
        <div style={{display:'flex',gap:8,marginTop:4}}>
          <button onClick={onClose} style={{flex:1,padding:11,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--text2)',fontSize:13,cursor:'pointer'}}>Cancel</button>
          <button onClick={onClose} style={{flex:2,padding:11,borderRadius:8,background:'var(--blue)',border:'none',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer'}}>Create invoice ↗</button>
        </div>
      </div>
    </div>
  );
}

function InvoiceDrawer({ invoice, onClose, onPay }) {
  return (
    <>
      <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.4)',zIndex:140}} onClick={onClose}/>
      <div style={{position:'fixed',right:0,top:0,width:440,height:'100%',background:'var(--bg2)',borderLeft:'1px solid var(--border)',padding:24,overflowY:'auto',zIndex:150}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <span style={{fontSize:16,fontWeight:600,color:'var(--text)'}}>Invoice detail</span>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',cursor:'pointer',color:'var(--text2)',fontSize:16}}>✕</button>
        </div>
        <div style={{background:'linear-gradient(135deg,var(--blue-dim),var(--purple-dim))',borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{fontSize:11,color:'#8B9BB8',marginBottom:4}}>Invoice number</div>
          <div style={{fontSize:16,fontWeight:700,color:'#F0F4FF',fontFamily:'monospace'}}>{invoice.no}</div>
          <div style={{marginTop:8}}><span className={`badge ${statusColor(invoice.status)}`}>{invoice.status}</span></div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
          {[{l:'Student',v:invoice.student},{l:'Class',v:invoice.cls},{l:'Amount due',v:`৳${invoice.amount.toLocaleString()}`},{l:'Amount paid',v:`৳${invoice.paid.toLocaleString()}`},{l:'Balance',v:`৳${invoice.balance.toLocaleString()}`},{l:'Due date',v:invoice.date},{l:'Payment method',v:invoice.method},{l:'Last updated',v:'Jun 3, 2026'}].map(x=>(
            <div key={x.l} style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px'}}>
              <div style={{fontSize:10,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',marginBottom:3}}>{x.l}</div>
              <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{x.v}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <button onClick={()=>{onPay();onClose();}} style={{width:'100%',padding:10,borderRadius:8,background:'var(--green)',color:'#fff',border:'none',fontSize:13,fontWeight:600,cursor:'pointer'}}>💰 Record payment</button>
          <button style={{width:'100%',padding:10,borderRadius:8,background:'var(--bg3)',color:'var(--text2)',border:'1px solid var(--border)',fontSize:13,cursor:'pointer'}}>📢 Send reminder</button>
          <button style={{width:'100%',padding:10,borderRadius:8,background:'transparent',color:'var(--red)',border:'1px solid var(--red-dim)',fontSize:13,cursor:'pointer'}}>🗑️ Cancel invoice</button>
        </div>
      </div>
    </>
  );
}

export default function Invoices() {
  const [search, setSearch]     = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modal, setModal]       = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = INVOICES.filter(inv => {
    const matchSearch = inv.student.toLowerCase().includes(search.toLowerCase()) || inv.no.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const inp = {padding:'8px 12px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg2)',color:'var(--text2)',fontSize:13,outline:'none',cursor:'pointer'};

  return (
    <div className="main">
      {modal && <NewInvoiceModal onClose={() => setModal(false)} />}
      {selected && <InvoiceDrawer invoice={selected} onClose={() => setSelected(null)} onPay={() => setModal(true)} />}

      <div className="page-header">
        <div><div className="page-title">Invoices</div><div className="page-sub">All fee invoices · Term 2, 2026</div></div>
        <div className="btn-group">
          <button className="btn">⬇ Export PDF</button>
          <button className="btn">📢 Send reminders</button>
          <button className="btn btn-primary" onClick={() => setModal(true)}>+ New invoice</button>
        </div>
      </div>

      {/* Metrics */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:20}}>
        {[
          {icon:'🧾',label:'Total invoices',value:'1,248',sub:'this term',cls:'info',bg:'var(--blue-dim)',color:'var(--blue)'},
          {icon:'✅',label:'Paid',value:'1,089',sub:'87.2%',cls:'up',bg:'var(--green-dim)',color:'var(--green)'},
          {icon:'⏳',label:'Partial',value:'118',sub:'9.5%',cls:'warn',bg:'var(--amber-dim)',color:'var(--amber)'},
          {icon:'⚠️',label:'Overdue',value:'41',sub:'3.3%',cls:'danger',bg:'var(--red-dim)',color:'var(--red)'},
        ].map(m=>(
          <div key={m.label} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,padding:'14px 16px'}}>
            <div style={{width:36,height:36,borderRadius:10,background:m.bg,color:m.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,marginBottom:10}}>{m.icon}</div>
            <div style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',marginBottom:4}}>{m.label}</div>
            <div style={{fontSize:20,fontWeight:600,color:'var(--text)'}}>{m.value}</div>
            <div className={m.cls} style={{fontSize:10,marginTop:3}}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16,flexWrap:'wrap'}}>
        <div style={{position:'relative',flex:1,minWidth:200}}>
          <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text3)'}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by student name or invoice number…"
            style={{width:'100%',padding:'9px 12px 9px 36px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg2)',color:'var(--text)',fontSize:13,outline:'none'}}/>
        </div>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={inp}>
          <option value="">All status</option>
          <option value="Paid">Paid</option>
          <option value="Partial">Partial</option>
          <option value="Overdue">Overdue</option>
          <option value="Pending">Pending</option>
        </select>
        <select style={inp}><option>All grades</option><option>Class 6</option><option>Class 7</option><option>Class 8</option></select>
        <select style={inp}><option>All months</option><option>May 2026</option><option>Apr 2026</option></select>
      </div>

      {/* Table */}
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead style={{background:'var(--bg3)'}}>
            <tr>{['','Invoice no','Student','Class','Amount','Paid','Balance','Due date','Status','Actions'].map(h=>(
              <th key={h} style={{textAlign:'left',fontWeight:600,color:'var(--text3)',padding:'12px 16px',fontSize:11,textTransform:'uppercase',letterSpacing:'.04em',borderBottom:'1px solid var(--border)'}}>
                {h===''?<input type="checkbox" style={{accentColor:'var(--blue)'}}/>:h}
              </th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map(inv=>(
              <tr key={inv.no} onClick={()=>setSelected(inv)} style={{cursor:'pointer'}}
                onMouseEnter={e=>[...e.currentTarget.cells].forEach(c=>c.style.background='var(--bg3)')}
                onMouseLeave={e=>[...e.currentTarget.cells].forEach(c=>c.style.background='')}>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}} onClick={e=>e.stopPropagation()}><input type="checkbox" style={{accentColor:'var(--blue)'}}/></td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',fontSize:12,color:'var(--text3)',fontFamily:'monospace'}}>{inv.no}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',fontWeight:500}}>{inv.student}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',color:'var(--text3)'}}>{inv.cls}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>৳{inv.amount.toLocaleString()}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}} className="up">৳{inv.paid.toLocaleString()}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}} className={inv.balance>0?'danger':'up'}>৳{inv.balance.toLocaleString()}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',color:'var(--text3)',fontSize:12}}>{inv.date}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}><span className={`badge ${statusColor(inv.status)}`}>{inv.status}</span></td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}} onClick={e=>e.stopPropagation()}>
                  <div style={{display:'flex',gap:6}}>
                    <button onClick={()=>setSelected(inv)} style={{padding:'4px 10px',borderRadius:6,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--text2)'}}>View</button>
                    <button onClick={()=>setModal(true)} style={{padding:'4px 10px',borderRadius:6,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--green)'}}>Pay</button>
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
