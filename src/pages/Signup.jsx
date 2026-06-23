import React, { useState } from 'react';

const PLANS = [
  { id:'free',    name:'Free Trial', price:0,     period:'14 days', students:'Up to 100 students',  popular:false },
  { id:'starter', name:'Starter',    price:2500,  period:'month',   students:'Up to 500 students',  popular:false },
  { id:'growth',  name:'Growth 🔥',  price:6000,  period:'month',   students:'Up to 2,000 · AI included', popular:true },
  { id:'scale',   name:'Scale',      price:12000, period:'month',   students:'Unlimited students',  popular:false },
];

const API_URL = process.env.REACT_APP_API_URL || 'https://schoolos-backend-production.up.railway.app';

export default function Signup() {
  const [step, setStep]   = useState(1);
  const [plan, setPlan]   = useState('growth');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [result, setResult]   = useState(null);
  const [form, setForm] = useState({
    school_name:'', admin_name:'', admin_email:'', admin_password:'', phone:'',
  });

  const inp = { width:'100%', padding:'12px 16px', border:'1px solid #1E2A3D', borderRadius:10, background:'#141C2B', color:'#F0F4FF', fontSize:14, outline:'none' };

  const handleSubmit = async () => {
    if (!form.school_name || !form.admin_name || !form.admin_email || !form.admin_password || !form.phone) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, plan }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setStep(4);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (e) {
      setError('Connection error. Please check your internet and try again.');
    }
    setLoading(false);
  };

  const StepIndicator = () => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:40 }}>
      {[['1','School info'],['2','Choose plan'],['3','Account'],['4','Done']].map(([num,label],i) => (
        <React.Fragment key={num}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700,
              border: step > i+1 ? 'none' : '2px solid #1E2A3D',
              background: step > i+1 ? '#10B981' : step === i+1 ? '#3B82F6' : 'transparent',
              borderColor: step === i+1 ? '#3B82F6' : '#1E2A3D',
              color: step >= i+1 ? '#fff' : '#4A5568' }}>
              {step > i+1 ? '✓' : num}
            </div>
            <div style={{ fontSize:12, color: step >= i+1 ? '#F0F4FF' : '#4A5568' }}>{label}</div>
          </div>
          {i < 3 && <div style={{ width:40, height:2, background:'#1E2A3D' }}/>}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'#0A0D14', color:'#F0F4FF', fontFamily:'-apple-system,sans-serif', padding:'40px 20px' }}>
      <div style={{ maxWidth:560, margin:'0 auto' }}>

        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:32 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#3B82F6,#8B5CF6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:700, color:'#fff' }}>S</div>
          <span style={{ fontSize:18, fontWeight:700 }}>SchoolOS</span>
        </div>

        <StepIndicator/>

        <div style={{ background:'#0F1520', border:'1px solid #1E2A3D', borderRadius:16, padding:32 }}>

          {/* Step 1: School info */}
          {step === 1 && (
            <>
              <div style={{ fontSize:22, fontWeight:700, textAlign:'center', marginBottom:8 }}>Tell us about your school</div>
              <div style={{ fontSize:13, color:'#8B9BB8', textAlign:'center', marginBottom:28 }}>We'll set up your dedicated school portal</div>

              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:11, color:'#4A5568', textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600, display:'block', marginBottom:6 }}>School name *</label>
                <input value={form.school_name} onChange={e=>setForm({...form,school_name:e.target.value})} placeholder="e.g. Green Valley Academy" style={inp}/>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:11, color:'#4A5568', textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600, display:'block', marginBottom:6 }}>Phone number *</label>
                <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="01711-000000" style={inp}/>
              </div>

              <button onClick={()=>setStep(2)} disabled={!form.school_name||!form.phone}
                style={{ width:'100%', padding:14, borderRadius:10, background:'linear-gradient(135deg,#3B82F6,#2563EB)', color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer', boxShadow:'0 4px 14px rgba(59,130,246,.3)', opacity: (!form.school_name||!form.phone)?0.5:1 }}>
                Continue →
              </button>
            </>
          )}

          {/* Step 2: Choose plan */}
          {step === 2 && (
            <>
              <div style={{ fontSize:22, fontWeight:700, textAlign:'center', marginBottom:8 }}>Choose your plan</div>
              <div style={{ fontSize:13, color:'#8B9BB8', textAlign:'center', marginBottom:28 }}>Start with a free trial. Upgrade anytime.</div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
                {PLANS.map(p => (
                  <div key={p.id} onClick={()=>setPlan(p.id)}
                    style={{ border: `2px solid ${plan===p.id ? '#3B82F6' : '#1E2A3D'}`, borderRadius:12, padding:16, cursor:'pointer', background: plan===p.id ? 'rgba(59,130,246,.08)' : 'transparent', transition:'all .15s' }}>
                    <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>{p.name}</div>
                    <div style={{ fontSize:20, fontWeight:700 }}>৳{p.price.toLocaleString()}<span style={{ fontSize:11, color:'#4A5568', fontWeight:400 }}>/{p.period}</span></div>
                    <div style={{ fontSize:11, color:'#4A5568', marginTop:4 }}>{p.students}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', gap:10 }}>
                <button onClick={()=>setStep(1)} style={{ flex:1, padding:12, borderRadius:10, background:'transparent', color:'#8B9BB8', border:'1px solid #1E2A3D', fontSize:13, cursor:'pointer' }}>← Back</button>
                <button onClick={()=>setStep(3)} style={{ flex:2, padding:12, borderRadius:10, background:'linear-gradient(135deg,#3B82F6,#2563EB)', color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer' }}>Continue →</button>
              </div>
            </>
          )}

          {/* Step 3: Account */}
          {step === 3 && (
            <>
              <div style={{ fontSize:22, fontWeight:700, textAlign:'center', marginBottom:8 }}>Create your admin account</div>
              <div style={{ fontSize:13, color:'#8B9BB8', textAlign:'center', marginBottom:28 }}>You'll use this to log into your school dashboard</div>

              {error && <div style={{ background:'#450A0A', border:'1px solid #EF4444', borderRadius:8, padding:'10px 14px', fontSize:13, color:'#EF4444', marginBottom:16 }}>{error}</div>}

              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:11, color:'#4A5568', textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600, display:'block', marginBottom:6 }}>Your full name *</label>
                <input value={form.admin_name} onChange={e=>setForm({...form,admin_name:e.target.value})} placeholder="e.g. Dr. Rahman" style={inp}/>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:11, color:'#4A5568', textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600, display:'block', marginBottom:6 }}>Email address *</label>
                <input type="email" value={form.admin_email} onChange={e=>setForm({...form,admin_email:e.target.value})} placeholder="admin@yourschool.edu.bd" style={inp}/>
              </div>
              <div style={{ marginBottom:24 }}>
                <label style={{ fontSize:11, color:'#4A5568', textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600, display:'block', marginBottom:6 }}>Password *</label>
                <input type="password" value={form.admin_password} onChange={e=>setForm({...form,admin_password:e.target.value})} placeholder="Min 8 characters" style={inp}/>
              </div>

              <div style={{ display:'flex', gap:10 }}>
                <button onClick={()=>setStep(2)} style={{ flex:1, padding:12, borderRadius:10, background:'transparent', color:'#8B9BB8', border:'1px solid #1E2A3D', fontSize:13, cursor:'pointer' }}>← Back</button>
                <button onClick={handleSubmit} disabled={loading}
                  style={{ flex:2, padding:12, borderRadius:10, background:'linear-gradient(135deg,#3B82F6,#2563EB)', color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer', opacity:loading?0.7:1 }}>
                  {loading ? 'Creating your school...' : 'Create my school ↗'}
                </button>
              </div>
            </>
          )}

          {/* Step 4: Success */}
          {step === 4 && result && (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
              <div style={{ fontSize:22, fontWeight:700, marginBottom:8 }}>Welcome to SchoolOS!</div>
              <div style={{ fontSize:13, color:'#8B9BB8', marginBottom:24 }}>Your school portal is ready. Save these details:</div>

              <div style={{ background:'#141C2B', border:'1px solid #1E2A3D', borderRadius:10, padding:16, marginBottom:20, textAlign:'left' }}>
                <div style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #1E2A3D', fontSize:13 }}>
                  <span style={{ color:'#8B9BB8' }}>School</span><span style={{ fontWeight:600 }}>{form.school_name}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #1E2A3D', fontSize:13 }}>
                  <span style={{ color:'#8B9BB8' }}>Login email</span><span style={{ fontWeight:600 }}>{form.admin_email}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', fontSize:13 }}>
                  <span style={{ color:'#8B9BB8' }}>Plan</span><span style={{ fontWeight:600, textTransform:'capitalize' }}>{plan}</span>
                </div>
              </div>

              <button onClick={() => window.location.href = '/'}
                style={{ width:'100%', padding:14, borderRadius:10, background:'linear-gradient(135deg,#3B82F6,#2563EB)', color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer', boxShadow:'0 4px 14px rgba(59,130,246,.3)' }}>
                Go to login →
              </button>
            </div>
          )}
        </div>

        <div style={{ textAlign:'center', marginTop:20, fontSize:12, color:'#4A5568' }}>
          Already have an account? <a href="/" style={{ color:'#3B82F6' }}>Sign in</a>
        </div>
      </div>
    </div>
  );
}
