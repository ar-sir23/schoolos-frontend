import AddTeacherModal from '../components/AddTeacherModal';
import React, { useState } from 'react';

const TEACHERS = [
  {id:'TCH-001',name:'Dr. Nasrin Sultana',initials:'NS',dept:'Science',       subjects:['Biology','Chemistry'], cls:3,students:124,exp:'12 yrs',joined:'2012',status:'Present',rating:4.8,avBg:'#1E3A5F',avColor:'#3B82F6',classes:[{name:'Class 10-A',sub:'Biology',time:'8:00 AM'},{name:'Class 9-B',sub:'Chemistry',time:'10:00 AM'}]},
  {id:'TCH-002',name:'Mr. Kamal Hossain', initials:'KH',dept:'Mathematics',   subjects:['Math','Statistics'],   cls:4,students:168,exp:'8 yrs', joined:'2016',status:'Present',rating:4.6,avBg:'#2E1065',avColor:'#8B5CF6',classes:[{name:'Class 10-A',sub:'Math',time:'9:00 AM'},{name:'Class 9-A',sub:'Statistics',time:'11:00 AM'}]},
  {id:'TCH-003',name:'Ms. Fatema Khanom', initials:'FK',dept:'Languages',     subjects:['English','Bengali'],   cls:3,students:132,exp:'6 yrs', joined:'2018',status:'Present',rating:4.9,avBg:'#064E3B',avColor:'#10B981',classes:[{name:'Class 8-B',sub:'English',time:'8:00 AM'},{name:'Class 7-A',sub:'Bengali',time:'11:00 AM'}]},
  {id:'TCH-004',name:'Mr. Rahim Uddin',   initials:'RU',dept:'Social Studies',subjects:['History','Civics'],    cls:2,students:88, exp:'15 yrs',joined:'2009',status:'Absent', rating:4.3,avBg:'#451A03',avColor:'#F59E0B',classes:[{name:'Class 9-B',sub:'History',time:'10:00 AM'}]},
  {id:'TCH-005',name:'Ms. Shirina Begum', initials:'SB',dept:'Science',       subjects:['Physics','Math'],      cls:3,students:110,exp:'4 yrs', joined:'2020',status:'Present',rating:4.7,avBg:'#450A0A',avColor:'#EF4444',classes:[{name:'Class 10-B',sub:'Physics',time:'9:00 AM'}]},
  {id:'TCH-006',name:'Mr. Belal Ahmed',   initials:'BA',dept:'Languages',     subjects:['Arabic','Islamic'],    cls:4,students:156,exp:'10 yrs',joined:'2014',status:'Present',rating:4.5,avBg:'#2E1065',avColor:'#8B5CF6',classes:[{name:'Class 6-A',sub:'Arabic',time:'8:00 AM'}]},
];

function TeacherDrawer({teacher,onClose}){
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:200,display:'flex',justifyContent:'flex-end'}} onClick={onClose}>
      <div style={{width:420,background:'var(--bg2)',borderLeft:'1px solid var(--border)',height:'100%',overflowY:'auto',padding:24}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <span style={{fontSize:16,fontWeight:600,color:'var(--text)'}}>Teacher profile</span>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',cursor:'pointer',color:'var(--text2)',fontSize:16}}>✕</button>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16}}>
          <div style={{width:64,height:64,borderRadius:16,background:teacher.avBg,color:teacher.avColor,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:700}}>{teacher.initials}</div>
          <div>
            <div style={{fontSize:18,fontWeight:600,color:'var(--text)'}}>{teacher.name}</div>
            <div style={{fontSize:12,color:'var(--text3)',marginTop:4}}>{teacher.id} · {teacher.dept}</div>
            <div style={{marginTop:6}}><span className={`badge badge-${teacher.status==='Present'?'green':'red'}`}>{teacher.status}</span><span style={{fontSize:11,color:'var(--amber)',marginLeft:8}}>⭐ {teacher.rating}</span></div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
          {[{l:'Employee ID',v:teacher.id},{l:'Department',v:teacher.dept},{l:'Experience',v:teacher.exp},{l:'Joined',v:teacher.joined},{l:'Classes',v:teacher.cls},{l:'Students',v:teacher.students}].map(x=>(
            <div key={x.l} style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px'}}>
              <div style={{fontSize:10,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',marginBottom:3}}>{x.l}</div>
              <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{x.v}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:12,fontWeight:600,color:'var(--text2)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:10}}>Subjects</div>
        <div style={{display:'flex',gap:6,marginBottom:20}}>{teacher.subjects.map(s=><span key={s} className="badge badge-blue">{s}</span>)}</div>
        <div style={{fontSize:12,fontWeight:600,color:'var(--text2)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:10}}>Today's schedule</div>
        {teacher.classes.map(c=>(
          <div key={c.name} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:'var(--bg3)',borderRadius:8,marginBottom:6}}>
            <span style={{fontSize:18}}>📚</span>
            <div><div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{c.name} — {c.sub}</div><div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>{c.time}</div></div>
          </div>
        ))}
        <div style={{marginTop:20,display:'flex',flexDirection:'column',gap:8}}>
          <button style={{width:'100%',padding:10,borderRadius:8,background:'var(--blue)',color:'#fff',border:'none',fontSize:13,fontWeight:600,cursor:'pointer'}}>📊 Generate AI performance report ↗</button>
          <button style={{width:'100%',padding:10,borderRadius:8,background:'var(--bg3)',color:'var(--text2)',border:'1px solid var(--border)',fontSize:13,cursor:'pointer'}}>✏️ Edit teacher</button>
        </div>
      </div>
    </div>
  );
}

export default function Teachers(){
  const[view,setView]=useState('grid');
  const[addTeacher,setAddTeacher]=useState(false);
  const[search,setSearch]=useState('');
  const[selected,setSelected]=useState(null);
  const filtered=TEACHERS.filter(t=>t.name.toLowerCase().includes(search.toLowerCase())||t.dept.toLowerCase().includes(search.toLowerCase())||t.subjects.some(s=>s.toLowerCase().includes(search.toLowerCase())));
  const inp={padding:'8px 12px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg2)',color:'var(--text2)',fontSize:13,outline:'none',cursor:'pointer'};
  return(
    <div className="main">
      {addTeacher&&<AddTeacherModal onClose={()=>setAddTeacher(false)}/>}
      {selected&&<TeacherDrawer teacher={selected} onClose={()=>setSelected(null)}/>}
      <div className="page-header">
        <div><div className="page-title">Teachers</div><div className="page-sub">{TEACHERS.length} staff members · Term 2, 2026</div></div>
        <div className="btn-group"><button className="btn">⬇ Export</button><button className="btn">📊 Performance</button><button className="btn btn-primary" onClick={()=>setAddTeacher(true)}>+ Add teacher</button></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:20}}>
        {[{icon:'👨‍🏫',label:'Total staff',value:TEACHERS.length,sub:'active',cls:'info',bg:'var(--blue-dim)',color:'var(--blue)'},{icon:'✅',label:'Present',value:TEACHERS.filter(t=>t.status==='Present').length,sub:'today',cls:'up',bg:'var(--green-dim)',color:'var(--green)'},{icon:'📚',label:'Classes',value:124,sub:'scheduled',cls:'info',bg:'var(--purple-dim)',color:'var(--purple)'},{icon:'📋',label:'Reports',value:12,sub:'pending',cls:'warn',bg:'var(--amber-dim)',color:'var(--amber)'}].map(m=>(
          <div key={m.label} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,padding:'14px 16px'}}>
            <div style={{width:36,height:36,borderRadius:10,background:m.bg,color:m.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,marginBottom:10}}>{m.icon}</div>
            <div style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',marginBottom:4}}>{m.label}</div>
            <div style={{fontSize:20,fontWeight:600,color:'var(--text)'}}>{m.value}</div>
            <div className={m.cls} style={{fontSize:10,marginTop:3}}>{m.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16,flexWrap:'wrap'}}>
        <div style={{position:'relative',flex:1,minWidth:200}}>
          <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text3)'}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, subject, department…" style={{width:'100%',padding:'9px 12px 9px 36px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg2)',color:'var(--text)',fontSize:13,outline:'none'}}/>
        </div>
        <select style={inp}><option>All departments</option><option>Science</option><option>Mathematics</option><option>Languages</option></select>
        <div style={{display:'flex',gap:2,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:3}}>
          {[['grid','⊞'],['table','☰']].map(([v,icon])=>(
            <button key={v} onClick={()=>setView(v)} style={{padding:'5px 10px',borderRadius:6,cursor:'pointer',fontSize:13,border:'none',background:view===v?'var(--bg4)':'transparent',color:view===v?'var(--text)':'var(--text3)'}}>{icon}</button>
          ))}
        </div>
      </div>
      {view==='grid'&&(
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
          {filtered.map(t=>(
            <div key={t.id} onClick={()=>setSelected(t)} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:20,cursor:'pointer',transition:'all .15s'}} onMouseEnter={e=>{e.currentTarget.style.background='var(--bg3)';e.currentTarget.style.borderColor='var(--border2)';}} onMouseLeave={e=>{e.currentTarget.style.background='var(--bg2)';e.currentTarget.style.borderColor='var(--border)';}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:12}}>
                <div style={{width:52,height:52,borderRadius:14,background:t.avBg,color:t.avColor,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:700}}>{t.initials}</div>
                <span className={`badge badge-${t.status==='Present'?'green':'red'}`}>{t.status}</span>
              </div>
              <div style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:3}}>{t.name}</div>
              <div style={{fontSize:11,color:'var(--text3)',marginBottom:10}}>{t.id} · {t.dept}</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginBottom:12}}>
                {[{val:t.cls,lbl:'Classes'},{val:t.students,lbl:'Students'},{val:`⭐${t.rating}`,lbl:'Rating'}].map(s=>(
                  <div key={s.lbl} style={{background:'var(--bg3)',borderRadius:6,padding:'6px 8px',textAlign:'center'}}>
                    <div style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{s.val}</div>
                    <div style={{fontSize:10,color:'var(--text3)',marginTop:1}}>{s.lbl}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4}}>{t.subjects.map(s=><span key={s} style={{fontSize:10,padding:'2px 8px',borderRadius:20,background:'var(--bg3)',color:'var(--text2)',border:'1px solid var(--border)'}}>{s}</span>)}</div>
            </div>
          ))}
        </div>
      )}
      {view==='table'&&(
        <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
            <thead style={{background:'var(--bg3)'}}><tr>{['Teacher','ID','Department','Subjects','Classes','Students','Status','Actions'].map(h=><th key={h} style={{textAlign:'left',fontWeight:600,color:'var(--text3)',padding:'12px 16px',fontSize:11,textTransform:'uppercase',letterSpacing:'.04em',borderBottom:'1px solid var(--border)'}}>{h}</th>)}</tr></thead>
            <tbody>{filtered.map(t=>(
              <tr key={t.id} onClick={()=>setSelected(t)} style={{cursor:'pointer'}} onMouseEnter={e=>[...e.currentTarget.cells].forEach(c=>c.style.background='var(--bg3)')} onMouseLeave={e=>[...e.currentTarget.cells].forEach(c=>c.style.background='')}>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}><div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:32,height:32,borderRadius:8,background:t.avBg,color:t.avColor,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700}}>{t.initials}</div><div><div style={{fontWeight:500}}>{t.name}</div><div style={{fontSize:11,color:'var(--text3)'}}>{t.dept}</div></div></div></td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',color:'var(--text3)',fontSize:12}}>{t.id}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',color:'var(--text2)'}}>{t.dept}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>{t.subjects.map(s=><span key={s} style={{fontSize:10,padding:'2px 8px',borderRadius:20,background:'var(--bg3)',color:'var(--text2)',border:'1px solid var(--border)',marginRight:4}}>{s}</span>)}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',color:'var(--text2)'}}>{t.cls}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',color:'var(--text2)'}}>{t.students}</td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}><span className={`badge badge-${t.status==='Present'?'green':'red'}`}>{t.status}</span></td>
                <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}} onClick={e=>e.stopPropagation()}><div style={{display:'flex',gap:6}}><button onClick={()=>setSelected(t)} style={{padding:'4px 10px',borderRadius:6,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--text2)'}}>View</button><button style={{padding:'4px 10px',borderRadius:6,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--blue)'}}>Report</button></div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
