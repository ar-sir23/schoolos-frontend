import React, { useState } from 'react';

export default function AddStudentModal({ onClose }) {
  const [form, setForm] = useState({
    full_name:'', student_id:'', gender:'M', date_of_birth:'',
    grade:'', section:'', roll_number:'', parent_name:'',
    parent_phone:'', parent_email:'', address:'',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inp = {
    width:'100%', padding:'10px 14px', border:'1px solid var(--border)',
    borderRadius:8, background:'var(--bg3)', color:'var(--text)',
    fontSize:13, outline:'none',
  };

  const handleSubmit = async () => {
    if (!form.full_name || !form.student_id) {
      alert('Please fill in student name and ID');
      return;
    }
    setLoading(true);
    try {
      const { addStudent } = await import('../services/api');
      const res = await addStudent(form);
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => { onClose(true); }, 1500);
      } else {
        alert('Error: ' + (res.data.error || 'Could not add student'));
      }
    } catch(e) {
      alert('Connection error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={onClose}>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:16,padding:28,width:560,maxHeight:'90vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <div>
            <div style={{fontSize:16,fontWeight:600,color:'var(--text)'}}>👨‍🎓 Add new student</div>
            <div style={{fontSize:11,color:'var(--text3)',marginTop:3}}>Fill in the student details below</div>
          </div>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',cursor:'pointer',color:'var(--text2)',fontSize:16}}>✕</button>
        </div>

        {success && (
          <div style={{background:'var(--green-dim)',border:'1px solid var(--green)',borderRadius:10,padding:'12px 16px',marginBottom:16,fontSize:13,color:'var(--green)',textAlign:'center'}}>
            ✅ Student added successfully!
          </div>
        )}

        {/* Student info */}
        <div style={{fontSize:12,fontWeight:600,color:'var(--text2)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:12}}>Student information</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
          {[
            {l:'Full name *',k:'full_name',placeholder:'e.g. Aisha Rahman'},
            {l:'Student ID *',k:'student_id',placeholder:'e.g. STU-001'},
            {l:'Date of birth',k:'date_of_birth',type:'date'},
            {l:'Roll number',k:'roll_number',placeholder:'e.g. 01'},
          ].map(f=>(
            <div key={f.k}>
              <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>{f.l}</label>
              <input type={f.type||'text'} value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} placeholder={f.placeholder} style={inp}/>
            </div>
          ))}
          <div>
            <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Gender</label>
            <select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} style={inp}>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
          <div>
            <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Grade</label>
            <select value={form.grade} onChange={e=>setForm({...form,grade:e.target.value})} style={inp}>
              <option value="">Select grade</option>
              {['Class 6','Class 7','Class 8','Class 9','Class 10'].map(g=><option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Section</label>
            <select value={form.section} onChange={e=>setForm({...form,section:e.target.value})} style={inp}>
              <option value="">Select section</option>
              {['A','B','C','D'].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Parent info */}
        <div style={{fontSize:12,fontWeight:600,color:'var(--text2)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:12,paddingTop:12,borderTop:'1px solid var(--border)'}}>Parent / Guardian information</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
          {[
            {l:'Parent name',k:'parent_name',placeholder:'e.g. Mrs. Fatema Rahman'},
            {l:'Phone number',k:'parent_phone',placeholder:'e.g. 01711-000000'},
            {l:'Email address',k:'parent_email',placeholder:'e.g. parent@gmail.com'},
          ].map(f=>(
            <div key={f.k}>
              <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>{f.l}</label>
              <input value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} placeholder={f.placeholder} style={inp}/>
            </div>
          ))}
          <div>
            <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Address</label>
            <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="e.g. Dhaka, Bangladesh" style={inp}/>
          </div>
        </div>

        <div style={{display:'flex',gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:11,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--text2)',fontSize:13,cursor:'pointer'}}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading||success}
            style={{flex:2,padding:11,borderRadius:8,background:'var(--blue)',border:'none',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer',opacity:loading?0.7:1}}>
            {loading?'Adding student...':success?'✅ Added!':'Add student ↗'}
          </button>
        </div>
      </div>
    </div>
  );
}
