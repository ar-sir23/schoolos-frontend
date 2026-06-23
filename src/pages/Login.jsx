import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSchoolConfig } from '../config/schools';

export default function Login() {
  const { signIn } = useAuth();
  const [form, setForm]       = useState({ username: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [school, setSchool]   = useState(null);

  useEffect(() => {
    setSchool(getSchoolConfig());
  }, []);

  const handleSubmit = async () => {
    if (!form.username || !form.password) { setError('Please enter both fields.'); return; }
    setLoading(true); setError('');
    try { await signIn(form.username, form.password); }
    catch { setError('Invalid username or password. Please try again.'); }
    setLoading(false);
  };

  if (!school) return null;

  const inp = {
    width: '100%', padding: '11px 14px', borderRadius: 9,
    border: '1px solid #2A3347', background: '#161B25',
    color: '#E8EDF5', fontSize: 13, outline: 'none', display: 'block',
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', background:'#0A0D14', color:'#F0F4FF', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>

      {/* Left — Login form */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 32px' }}>
        <div style={{ width:'100%', maxWidth:360 }}>

          {/* School logo */}
          <div style={{ width:64, height:64, borderRadius:16, background: school.logo ? '#fff' : school.gradient, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, fontWeight:700, color:'#fff', margin:'0 auto 16px', overflow:'hidden', boxShadow: school.logo ? '0 4px 14px rgba(0,0,0,.2)' : 'none' }}>
            {school.logo ? <img src={school.logo} alt={school.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : school.initials}
          </div>

          <div style={{ fontSize:22, fontWeight:700, color:'#F0F4FF', textAlign:'center', marginBottom:6 }}>{school.name}</div>
          <div style={{ fontSize:13, color:'#8B9BB8', textAlign:'center', marginBottom:32 }}>{school.tagline}</div>

          {error && (
            <div style={{ background:'#450A0A', border:'1px solid #EF4444', borderRadius:8, padding:'10px 14px', fontSize:13, color:'#EF4444', marginBottom:16 }}>{error}</div>
          )}

          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:11, color:'#8B96A8', display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600 }}>Username</label>
            <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
              placeholder="Enter your username" style={inp}
              onFocus={e => e.target.style.borderColor='#3B82F6'}
              onBlur={e => e.target.style.borderColor='#2A3347'}/>
          </div>

          <div style={{ marginBottom:20 }}>
            <label style={{ fontSize:11, color:'#8B96A8', display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600 }}>Password</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password" onKeyDown={e => e.key==='Enter' && handleSubmit()} style={inp}
              onFocus={e => e.target.style.borderColor='#3B82F6'}
              onBlur={e => e.target.style.borderColor='#2A3347'}/>
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{
            width:'100%', padding:12, borderRadius:9, fontSize:14, fontWeight:600,
            cursor: loading ? 'not-allowed' : 'pointer', border:'none', color:'#fff',
            background: loading ? '#1D4ED8' : school.gradient,
            boxShadow: `0 4px 14px ${school.shadow}`, transition:'all .2s',
          }}>
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>

          <div style={{ textAlign:'center', marginTop:14, fontSize:12, color:'#5A6478' }}>
            Forgot password? Contact your school admin.
          </div>

          <div style={{ textAlign:'center', marginTop:24, fontSize:11, color:'#4A5568' }}>
            Powered by <span style={{ color:'#3B82F6', fontWeight:600 }}>SchoolOS</span> · AI-Powered School Management
          </div>
        </div>
      </div>

      {/* Right — School info panel */}
      <div style={{ width:380, background:'#0F1520', borderLeft:'1px solid #1E2A3D', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 32px' }}>
        <div style={{ fontSize:11, color:'#4A5568', textTransform:'uppercase', letterSpacing:'.08em', fontWeight:600, marginBottom:16, textAlign:'center' }}>{school.name}</div>
        <div style={{ fontSize:18, fontWeight:600, color:'#F0F4FF', textAlign:'center', marginBottom:8 }}>Welcome to your school portal</div>
        <div style={{ fontSize:13, color:'#8B9BB8', textAlign:'center', marginBottom:28, lineHeight:1.6 }}>
          Manage students, fees, attendance and more — all powered by AI.
        </div>

        {school.features.map(f => (
          <div key={f.title} style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderRadius:10, background:'#0A0D14', border:'1px solid #1E2A3D', marginBottom:8 }}>
            <div style={{ fontSize:22 }}>{f.icon}</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:'#F0F4FF', marginBottom:2 }}>{f.title}</div>
              <div style={{ fontSize:11, color:'#8B9BB8' }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
