import React, { useState } from 'react';

export default function AddTeacherModal({ onClose }) {
  const [form, setForm] = useState({
    full_name:'', employee_id:'', gender:'M', date_of_birth:'',
    department:'', phone:'', email:'', joining_date:'',
    subjects:'', address:'',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inp = {
    width:'100%', padding:'10px 14px', border:'1px solid var(--border)',
    borderRadius:8, background:'var(--bg3)', color:'var(--text)',
    fontSize:13, outline:'none',
  };

  const handleSubmit = async () => {
    if (!form.full_name || !form.employee_id) {
      alert('Please fill in teacher name and employee ID');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={onClose}>
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:16,padding:28,width:560,maxHeight:'90vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <div>
            <div style={{fontSize:16,fontWeight:600,color:'var(--text)'}}>👨‍🏫 Add new teacher</div>
            <div style={{fontSize:11,color:'var(--text3)',marginTop:3}}>Fill in the teacher details below</div>
          </div>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',cursor:'pointer',color:'var(--text2)',fontSize:16}}>✕</button>
        </div>

        {success && (
          <div style={{background:'var(--green-dim)',border:'1px solid var(--green)',borderRadius:10,padding:'12px 16px',marginBottom:16,fontSize:13,color:'var(--green)',textAlign:'center'}}>
            ✅ Teacher added successfully!
          </div>
        )}

        <div style={{fontSize:12,fontWeight:600,color:'var(--text2)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:12}}>Teacher information</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
          {[
            {l:'Full name *',k:'full_name',placeholder:'e.g. Dr. Nasrin Sultana'},
            {l:'Employee ID *',k:'employee_id',placeholder:'e.g. TCH-001'},
            {l:'Phone number',k:'phone',placeholder:'e.g. 01711-000000'},
            {l:'Email address',k:'email',placeholder:'e.g. teacher@school.edu.bd'},
            {l:'Joining date',k:'joining_date',type:'date'},
            {l:'Date of birth',k:'date_of_birth',type:'date'},
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
            </select>
          </div>
          <div>
            <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Department</label>
            <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})} style={inp}>
              <option value="">Select department</option>
              {['Science','Mathematics','Languages','Social Studies','Arts','Physical Education'].map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
          <div style={{gridColumn:'span 2'}}>
            <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Subjects (comma separated)</label>
            <input value={form.subjects} onChange={e=>setForm({...form,subjects:e.target.value})} placeholder="e.g. Biology, Chemistry, Science" style={inp}/>
          </div>
          <div style={{gridColumn:'span 2'}}>
            <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Address</label>
            <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="e.g. Dhaka, Bangladesh" style={inp}/>
          </div>
        </div>

        <div style={{display:'flex',gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:11,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--text2)',fontSize:13,cursor:'pointer'}}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading||success}
            style={{flex:2,padding:11,borderRadius:8,background:'var(--blue)',border:'none',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer',opacity:loading?0.7:1}}>
            {loading?'Adding teacher...':success?'✅ Added!':'Add teacher ↗'}
          </button>
        </div>
      </div>
    </div>
  );
}
