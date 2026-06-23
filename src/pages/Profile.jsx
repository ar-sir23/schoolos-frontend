import React, { useState } from 'react';

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: 'School Admin',
    email: 'admin@lakefield.edu.bd',
    phone: '01711-000000',
    role: 'Principal',
    school: 'Lakefield Global School',
    joined: 'January 2024',
  });

  const inp = { width:'100%', padding:'10px 14px', border:'1px solid var(--border)', borderRadius:8, background:'var(--bg3)', color:'var(--text)', fontSize:13, outline:'none' };

  return (
    <div className="main">
      <div className="page-header">
        <div><div className="page-title">My Profile</div><div className="page-sub">Manage your account details</div></div>
        <button className={`btn ${editing?'':'btn-primary'}`} onClick={() => setEditing(e=>!e)}>
          {editing ? '✕ Cancel' : '✏️ Edit profile'}
        </button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:20}}>

        {/* Left — Avatar card */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:24,textAlign:'center'}}>
            <div style={{width:80,height:80,borderRadius:20,background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:700,color:'#fff',margin:'0 auto 16px'}}>SA</div>
            <div style={{fontSize:16,fontWeight:600,color:'var(--text)',marginBottom:4}}>{form.name}</div>
            <div style={{fontSize:12,color:'var(--text3)',marginBottom:12}}>{form.role} · {form.school}</div>
            <span className="badge badge-blue">Starter Plan</span>
            {editing && (
              <button style={{display:'block',width:'100%',marginTop:14,padding:'8px',borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--text2)',fontSize:12,cursor:'pointer'}}>
                📷 Change photo
              </button>
            )}
          </div>

          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:16}}>
            <div style={{fontSize:13,fontWeight:600,color:'var(--text)',marginBottom:12}}>Account info</div>
            {[{l:'Member since',v:form.joined},{l:'Last login',v:'Today, 2:34 PM'},{l:'Role',v:form.role},{l:'Plan',v:'Starter'}].map(x=>(
              <div key={x.l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
                <span style={{color:'var(--text3)'}}>{x.l}</span>
                <span style={{color:'var(--text)',fontWeight:500}}>{x.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Details */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:20}}>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:16}}>Personal information</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              {[{l:'Full name',k:'name'},{l:'Email address',k:'email'},{l:'Phone number',k:'phone'},{l:'Role',k:'role'}].map(f=>(
                <div key={f.k}>
                  <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>{f.l}</label>
                  {editing ? (
                    <input value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} style={inp}/>
                  ) : (
                    <div style={{fontSize:13,color:'var(--text)',padding:'10px 0'}}>{form[f.k]}</div>
                  )}
                </div>
              ))}
            </div>
            {editing && (
              <button onClick={()=>setEditing(false)} style={{marginTop:16,padding:'10px 24px',borderRadius:8,background:'var(--blue)',color:'#fff',border:'none',fontSize:13,fontWeight:600,cursor:'pointer'}}>
                Save changes
              </button>
            )}
          </div>

          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:20}}>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:16}}>Change password</div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {['Current password','New password','Confirm new password'].map(l=>(
                <div key={l}>
                  <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>{l}</label>
                  <input type="password" placeholder="••••••••" style={inp}/>
                </div>
              ))}
              <button style={{padding:'10px 24px',borderRadius:8,background:'var(--blue)',color:'#fff',border:'none',fontSize:13,fontWeight:600,cursor:'pointer',alignSelf:'flex-start'}}>
                Update password
              </button>
            </div>
          </div>

          <div style={{background:'var(--red-dim)',border:'1px solid var(--red)',borderRadius:14,padding:20}}>
            <div style={{fontSize:14,fontWeight:600,color:'var(--red)',marginBottom:8}}>⚠️ Danger zone</div>
            <div style={{fontSize:12,color:'var(--text2)',marginBottom:14}}>Once you delete your account, there is no going back. Please be certain.</div>
            <button style={{padding:'8px 18px',borderRadius:8,background:'transparent',color:'var(--red)',border:'1px solid var(--red)',fontSize:13,cursor:'pointer'}}>
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
