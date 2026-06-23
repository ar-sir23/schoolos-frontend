import React, { useState, useEffect } from 'react';
import { getStudents, chatWithAI } from '../services/api';

const feeColor  = f => f === 'Paid' ? 'badge-green' : f === 'Partial' ? 'badge-amber' : 'badge-red';
const attColor  = a => a >= 80 ? 'up' : a >= 70 ? 'warn' : 'danger';
const riskColor = r => r === 'Low' ? 'badge-green' : r === 'Medium' ? 'badge-amber' : 'badge-red';

const avColors = [
  {bg:'#1E3A5F',color:'#3B82F6'},{bg:'#451A03',color:'#F59E0B'},
  {bg:'#450A0A',color:'#EF4444'},{bg:'#2E1065',color:'#8B5CF6'},
  {bg:'#064E3B',color:'#10B981'},
];

const SEED = [
  {id:'STU-001',name:'Aisha Rahman',  initials:'AR',cls:'Class 8', sec:'A',gender:'Female',dob:'2011-03-15',parent:'Mrs. Fatema Rahman', phone:'01711-111111',att:95,fee:'Paid',   risk:'Low',   results:[{sub:'English',marks:82,grade:'A+'},{sub:'Math',marks:74,grade:'A'},{sub:'Science',marks:69,grade:'B'},{sub:'Bengali',marks:78,grade:'A'}]},
  {id:'STU-002',name:'Karim Ahmed',   initials:'KA',cls:'Class 9', sec:'B',gender:'Male',  dob:'2010-07-22',parent:'Mr. Abdul Karim',    phone:'01711-222222',att:78,fee:'Partial',risk:'Medium',results:[{sub:'English',marks:65,grade:'B'},{sub:'Math',marks:58,grade:'C'},{sub:'Science',marks:71,grade:'A'},{sub:'Bengali',marks:60,grade:'B'}]},
  {id:'STU-003',name:'Fatema Begum',  initials:'FB',cls:'Class 7', sec:'A',gender:'Female',dob:'2012-01-10',parent:'Mr. Rafiq Begum',     phone:'01711-333333',att:61,fee:'Overdue',risk:'High',  results:[{sub:'English',marks:45,grade:'C'},{sub:'Math',marks:38,grade:'D'},{sub:'Science',marks:50,grade:'C'},{sub:'Bengali',marks:42,grade:'C'}]},
  {id:'STU-004',name:'Mehedi Islam',  initials:'MI',cls:'Class 6', sec:'B',gender:'Male',  dob:'2013-05-28',parent:'Mr. Nurul Islam',     phone:'01711-444444',att:92,fee:'Paid',   risk:'Low',   results:[{sub:'English',marks:88,grade:'A+'},{sub:'Math',marks:91,grade:'A+'},{sub:'Science',marks:85,grade:'A+'},{sub:'Bengali',marks:82,grade:'A+'}]},
  {id:'STU-005',name:'Sadia Akter',   initials:'SA',cls:'Class 7', sec:'C',gender:'Female',dob:'2012-09-14',parent:'Mrs. Rashida Akter',  phone:'01711-555555',att:74,fee:'Partial',risk:'Medium',results:[{sub:'English',marks:70,grade:'A'},{sub:'Math',marks:62,grade:'B'},{sub:'Science',marks:68,grade:'B'},{sub:'Bengali',marks:75,grade:'A'}]},
  {id:'STU-006',name:'Rafiq Hossain', initials:'RH',cls:'Class 9', sec:'A',gender:'Male',  dob:'2010-11-03',parent:'Mr. Jalal Hossain',   phone:'01711-666666',att:55,fee:'Overdue',risk:'High',  results:[{sub:'English',marks:40,grade:'D'},{sub:'Math',marks:35,grade:'D'},{sub:'Science',marks:45,grade:'C'},{sub:'Bengali',marks:38,grade:'D'}]},
  {id:'STU-007',name:'Nadia Karim',   initials:'NK',cls:'Class 8', sec:'A',gender:'Female',dob:'2011-06-19',parent:'Mrs. Sumaiya Karim',  phone:'01711-777777',att:88,fee:'Paid',   risk:'Low',   results:[{sub:'English',marks:79,grade:'A'},{sub:'Math',marks:72,grade:'A'},{sub:'Science',marks:76,grade:'A'},{sub:'Bengali',marks:80,grade:'A+'}]},
  {id:'STU-008',name:'Tanvir Hassan', initials:'TH',cls:'Class 10',sec:'A',gender:'Male',  dob:'2009-02-25',parent:'Mr. Belal Hassan',    phone:'01711-888888',att:96,fee:'Paid',   risk:'Low',   results:[{sub:'English',marks:91,grade:'A+'},{sub:'Math',marks:88,grade:'A+'},{sub:'Science',marks:90,grade:'A+'},{sub:'Bengali',marks:85,grade:'A+'}]},
];

function StudentDrawer({student,idx,onClose}){
  const[aiLoading,setAiLoading]=useState(false);
  const[aiMsg,setAiMsg]=useState('');
  const av=avColors[idx%avColors.length];
  const avgMark=Math.round(student.results.reduce((a,r)=>a+r.marks,0)/student.results.length);

  const generateReport=async()=>{
    setAiLoading(true);
    try{
      const prompt=`Generate a brief personalised report card comment for ${student.name}, ${student.cls}-${student.sec}. Results: ${student.results.map(r=>`${r.sub}: ${r.marks}/100`).join(', ')}. Attendance: ${student.att}%.`;
      const res=await chatWithAI(prompt,null,[]);
      setAiMsg(res.data.reply);
    }catch{setAiMsg('Could not generate report. Please check your API key and credits.');}
    setAiLoading(false);
  };

  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:200,display:'flex',justifyContent:'flex-end'}} onClick={onClose}>
      <div style={{width:400,background:'var(--bg2)',borderLeft:'1px solid var(--border)',height:'100%',overflowY:'auto',padding:24}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <span style={{fontSize:16,fontWeight:600,color:'var(--text)'}}>Student profile</span>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',cursor:'pointer',color:'var(--text2)',fontSize:16}}>✕</button>
        </div>
        <div style={{width:64,height:64,borderRadius:16,background:av.bg,color:av.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:700,margin:'0 auto 12px'}}>{student.initials}</div>
        <div style={{fontSize:18,fontWeight:600,color:'var(--text)',textAlign:'center'}}>{student.name}</div>
        <div style={{fontSize:13,color:'var(--text3)',textAlign:'center',margin:'4px 0 16px'}}>{student.id} · {student.cls}-{student.sec}</div>
        <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:20}}>
          <span className={`badge ${feeColor(student.fee)}`}>{student.fee}</span>
          <span className={`badge ${riskColor(student.risk)}`}>{student.risk} risk</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
          {[{label:'Date of birth',value:student.dob},{label:'Attendance',value:student.att+'%',cls:attColor(student.att)},{label:'Parent',value:student.parent},{label:'Phone',value:student.phone},{label:'Avg marks',value:avgMark+'/100'},{label:'Gender',value:student.gender}].map(({label,value,cls})=>(
            <div key={label} style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px'}}>
              <div style={{fontSize:10,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.04em',marginBottom:3}}>{label}</div>
              <div className={cls||''} style={{fontSize:13,fontWeight:500,color:cls?undefined:'var(--text)'}}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:12,fontWeight:600,color:'var(--text2)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:10}}>Attendance by month</div>
        {[['Jan',92],['Feb',88],['Mar',student.att],['Apr',85],['May',student.att-5]].map(([m,v])=>(
          <div key={m} style={{marginBottom:8}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:3}}>
              <span style={{color:'var(--text2)'}}>{m}</span><span className={attColor(v)}>{v}%</span>
            </div>
            <div style={{height:5,background:'var(--bg4)',borderRadius:3,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${v}%`,borderRadius:3,background:v>=80?'var(--green)':v>=70?'var(--amber)':'var(--red)'}}/>
            </div>
          </div>
        ))}
        <div style={{fontSize:12,fontWeight:600,color:'var(--text2)',textTransform:'uppercase',letterSpacing:'.06em',margin:'20px 0 10px'}}>Exam results</div>
        {student.results.map(r=>(
          <div key={r.sub} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 0',borderBottom:'1px solid var(--border)',fontSize:13}}>
            <span style={{color:'var(--text2)'}}>{r.sub}</span>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{color:'var(--text)'}}>{r.marks}/100</span>
              <span className={`badge ${r.marks>=80?'badge-green':r.marks>=60?'badge-blue':r.marks>=33?'badge-amber':'badge-red'}`}>{r.grade}</span>
            </div>
          </div>
        ))}
        {aiMsg&&<div style={{margin:'16px 0',background:'var(--blue-dim)',border:'1px solid var(--blue)',borderRadius:10,padding:'12px 14px',fontSize:12,color:'var(--text)',lineHeight:1.6}}><div style={{fontSize:10,color:'var(--blue)',fontWeight:600,marginBottom:6}}>🤖 AI REPORT COMMENT</div>{aiMsg}</div>}
        <div style={{marginTop:20,display:'flex',flexDirection:'column',gap:8}}>
          <button onClick={generateReport} disabled={aiLoading} style={{width:'100%',padding:10,borderRadius:8,background:'var(--blue)',color:'#fff',border:'none',fontSize:13,fontWeight:600,cursor:'pointer'}}>{aiLoading?'Generating...':'🤖 Generate AI report card ↗'}</button>
          <button style={{width:'100%',padding:10,borderRadius:8,background:'var(--bg3)',color:'var(--text2)',border:'1px solid var(--border)',fontSize:13,cursor:'pointer'}}>📢 Send parent alert</button>
          <button style={{width:'100%',padding:10,borderRadius:8,background:'transparent',color:'var(--red)',border:'1px solid var(--red-dim)',fontSize:13,cursor:'pointer'}}>✏️ Edit student</button>
        </div>
      </div>
    </div>
  );
}

export default function Students(){
  const[students,setStudents]=useState(SEED);
  const[filtered,setFiltered]=useState(SEED);
  const[view,setView]=useState('table');
  const[selected,setSelected]=useState(null);
  const[selectedIdx,setSelectedIdx]=useState(0);
  const[search,setSearch]=useState('');
  const[gradeFilter,setGradeFilter]=useState('');
  const[statusFilter,setStatusFilter]=useState('');

  useEffect(()=>{getStudents().then(r=>{if(r.data.results?.length)setStudents(r.data.results);}).catch(()=>{});},[]);

  useEffect(()=>{
    let f=[...students];
    if(search)f=f.filter(s=>s.name?.toLowerCase().includes(search.toLowerCase())||s.id?.toLowerCase().includes(search.toLowerCase()));
    if(gradeFilter)f=f.filter(s=>s.cls===gradeFilter);
    if(statusFilter==='paid')f=f.filter(s=>s.fee==='Paid');
    if(statusFilter==='overdue')f=f.filter(s=>s.fee==='Overdue');
    if(statusFilter==='low-att')f=f.filter(s=>s.att<75);
    setFiltered(f);
  },[search,gradeFilter,statusFilter,students]);

  const openStudent=(s,i)=>{setSelected(s);setSelectedIdx(i);};
  const inp={padding:'8px 12px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg2)',color:'var(--text2)',fontSize:13,outline:'none',cursor:'pointer'};

  return(
    <div className="main">
      {selected&&<StudentDrawer student={selected} idx={selectedIdx} onClose={()=>setSelected(null)}/>}
      <div className="page-header">
        <div><div className="page-title">Students</div><div className="page-sub">{students.length} total students · Term 2, 2026</div></div>
        <div className="btn-group">
          <button className="btn">⬇ Export</button>
          <button className="btn">📢 Bulk message</button>
          <button className="btn btn-primary">+ Add student</button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,marginBottom:20}}>
        {[{label:'Total',value:students.length,sub:'All students',cls:''},{label:'Active',value:students.length,sub:'98.6%',cls:'info'},{label:'Good attendance',value:students.filter(s=>s.att>=80).length,sub:'≥80%',cls:'up'},{label:'Fee defaulters',value:students.filter(s=>s.fee==='Overdue').length,sub:'AI flagged',cls:'danger'},{label:'New this term',value:34,sub:'admissions',cls:'up'}].map(m=>(
          <div key={m.label} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,padding:'14px 16px'}}>
            <div style={{fontSize:11,color:'var(--text3)',marginBottom:4,textTransform:'uppercase',letterSpacing:'.04em'}}>{m.label}</div>
            <div style={{fontSize:20,fontWeight:600,color:'var(--text)'}}>{m.value}</div>
            <div className={m.cls} style={{fontSize:10,marginTop:3}}>{m.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16,flexWrap:'wrap'}}>
        <div style={{position:'relative',flex:1,minWidth:200}}>
          <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text3)'}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, ID, parent…" style={{width:'100%',padding:'9px 12px 9px 36px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg2)',color:'var(--text)',fontSize:13,outline:'none'}}/>
        </div>
        <select value={gradeFilter} onChange={e=>setGradeFilter(e.target.value)} style={inp}>
          {[['','All grades'],['Class 6','Class 6'],['Class 7','Class 7'],['Class 8','Class 8'],['Class 9','Class 9'],['Class 10','Class 10']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
        </select>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={inp}>
          {[['','All status'],['paid','Fee paid'],['overdue','Overdue'],['low-att','Low attendance']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
        </select>
        <div style={{display:'flex',gap:2,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:3}}>
          {[['table','☰'],['grid','⊞']].map(([v,icon])=>(
            <button key={v} onClick={()=>setView(v)} style={{padding:'5px 10px',borderRadius:6,cursor:'pointer',fontSize:13,border:'none',background:view===v?'var(--bg4)':'transparent',color:view===v?'var(--text)':'var(--text3)'}}>{icon}</button>
          ))}
        </div>
      </div>
      {view==='table'&&(
        <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
            <thead style={{background:'var(--bg3)'}}>
              <tr>{['','Student','Class','Gender','Attendance','Fee','AI risk','Parent','Actions'].map(h=>(
                <th key={h} style={{textAlign:'left',fontWeight:600,color:'var(--text3)',padding:'12px 16px',fontSize:11,textTransform:'uppercase',letterSpacing:'.04em',borderBottom:'1px solid var(--border)'}}>
                  {h===''?<input type="checkbox" style={{accentColor:'var(--blue)'}}/>:h}
                </th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map((s,i)=>{
                const av=avColors[i%avColors.length];
                return(
                  <tr key={s.id} onClick={()=>openStudent(s,i)} style={{cursor:'pointer'}}
                    onMouseEnter={e=>[...e.currentTarget.cells].forEach(c=>c.style.background='var(--bg3)')}
                    onMouseLeave={e=>[...e.currentTarget.cells].forEach(c=>c.style.background='')}>
                    <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}} onClick={e=>e.stopPropagation()}><input type="checkbox" style={{accentColor:'var(--blue)'}}/></td>
                    <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}><div style={{display:'flex',alignItems:'center',gap:10}}><div style={{width:32,height:32,borderRadius:10,background:av.bg,color:av.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,flexShrink:0}}>{s.initials}</div><div><div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{s.name}</div><div style={{fontSize:11,color:'var(--text3)'}}>{s.id}</div></div></div></td>
                    <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',color:'var(--text2)'}}>{s.cls}-{s.sec}</td>
                    <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',color:'var(--text2)'}}>{s.gender}</td>
                    <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}><span className={attColor(s.att)}>{s.att}%</span></td>
                    <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}><span className={`badge ${feeColor(s.fee)}`}>{s.fee}</span></td>
                    <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}><span className={`badge ${riskColor(s.risk)}`}>{s.risk}</span></td>
                    <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',color:'var(--text2)',fontSize:12}}>{s.parent}</td>
                    <td style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}} onClick={e=>e.stopPropagation()}><div style={{display:'flex',gap:6}}><button onClick={()=>openStudent(s,i)} style={{padding:'4px 10px',borderRadius:6,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--text2)'}}>View</button><button style={{padding:'4px 10px',borderRadius:6,fontSize:11,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--blue)'}}>Report</button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px',borderTop:'1px solid var(--border)'}}>
            <span style={{fontSize:12,color:'var(--text3)'}}>Showing 1–{filtered.length} of {filtered.length} students</span>
            <div style={{display:'flex',gap:4}}>
              {['‹','1','2','3','›'].map((p,i)=>(
                <button key={i} style={{width:30,height:30,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,cursor:'pointer',border:'1px solid var(--border)',background:p==='1'?'var(--blue)':'transparent',color:p==='1'?'#fff':'var(--text2)'}}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      )}
      {view==='grid'&&(
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
          {filtered.map((s,i)=>{
            const av=avColors[i%avColors.length];
            return(
              <div key={s.id} onClick={()=>openStudent(s,i)} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,padding:16,cursor:'pointer',transition:'all .15s'}} onMouseEnter={e=>{e.currentTarget.style.background='var(--bg3)';e.currentTarget.style.borderColor='var(--border2)';}} onMouseLeave={e=>{e.currentTarget.style.background='var(--bg2)';e.currentTarget.style.borderColor='var(--border)';}}>
                <div style={{width:44,height:44,borderRadius:12,background:av.bg,color:av.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,marginBottom:10}}>{s.initials}</div>
                <div style={{fontSize:13,fontWeight:600,color:'var(--text)',marginBottom:3}}>{s.name}</div>
                <div style={{fontSize:11,color:'var(--text3)',marginBottom:10}}>{s.id} · {s.cls}-{s.sec}</div>
                <div style={{marginBottom:10}}><span className={`badge ${feeColor(s.fee)}`}>{s.fee}</span><span className={`badge ${riskColor(s.risk)}`} style={{marginLeft:6}}>{s.risk}</span></div>
                <div style={{display:'flex',gap:8}}>
                  {[{val:`${s.att}%`,lbl:'Attend.',cls:attColor(s.att)},{val:s.results[0].grade,lbl:'English'},{val:s.results[1].grade,lbl:'Math'}].map(st=>(
                    <div key={st.lbl} style={{flex:1,textAlign:'center',background:'var(--bg3)',borderRadius:6,padding:5}}>
                      <div className={st.cls||''} style={{fontSize:12,fontWeight:600,color:st.cls?undefined:'var(--text)'}}>{st.val}</div>
                      <div style={{fontSize:10,color:'var(--text3)'}}>{st.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
