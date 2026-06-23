import React, { useState } from 'react';

function Toggle({ value, onChange }) {
  return (
    <div onClick={()=>onChange(!value)} style={{width:40,height:22,borderRadius:11,background:value?'var(--blue)':'var(--bg4)',cursor:'pointer',position:'relative',transition:'background .2s',flexShrink:0}}>
      <div style={{position:'absolute',top:3,left:value?20:3,width:16,height:16,borderRadius:'50%',background:'#fff',transition:'left .2s'}}/>
    </div>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState({
    emailAlerts:    true,
    smsAlerts:      false,
    feeReminders:   true,
    attendanceAlerts:true,
    aiReports:      true,
    darkMode:       true,
    language:       'English',
    timezone:       'Asia/Dhaka',
    currency:       'BDT (৳)',
    dateFormat:     'DD/MM/YYYY',
  });

  const set = (key, val) => setSettings(s => ({...s,[key]:val}));
  const inp = {padding:'8px 12px',border:'1px solid var(--border)',borderRadius:8,background:'var(--bg3)',color:'var(--text)',fontSize:13,outline:'none',width:'100%'};

  const Section = ({title, children}) => (
    <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:14,padding:20,marginBottom:14}}>
      <div style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:16,paddingBottom:12,borderBottom:'1px solid var(--border)'}}>{title}</div>
      {children}
    </div>
  );

  const ToggleRow = ({label, desc, k}) => (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
      <div>
        <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{label}</div>
        {desc && <div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>{desc}</div>}
      </div>
      <Toggle value={settings[k]} onChange={v=>set(k,v)}/>
    </div>
  );

  return (
    <div className="main">
      <div className="page-header">
        <div><div className="page-title">Settings</div><div className="page-sub">Manage your school preferences</div></div>
        <button className="btn btn-primary">Save all changes</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <div>
          <Section title="🔔 Notifications">
            <ToggleRow label="Email alerts"      desc="Receive alerts via email"        k="emailAlerts"/>
            <ToggleRow label="SMS alerts"        desc="Receive alerts via SMS"          k="smsAlerts"/>
            <ToggleRow label="Fee reminders"     desc="Auto reminders for overdue fees" k="feeReminders"/>
            <ToggleRow label="Attendance alerts" desc="Parent alerts for low attendance"k="attendanceAlerts"/>
            <ToggleRow label="AI report cards"   desc="Auto-generate with Claude AI"    k="aiReports"/>
          </Section>

          <Section title="🎨 Appearance">
            <ToggleRow label="Dark mode" desc="Use dark theme (recommended)" k="darkMode"/>
            <div style={{padding:'12px 0',borderBottom:'1px solid var(--border)'}}>
              <div style={{fontSize:13,fontWeight:500,color:'var(--text)',marginBottom:8}}>Language</div>
              <select value={settings.language} onChange={e=>set('language',e.target.value)} style={inp}>
                <option>English</option><option>বাংলা (Bengali)</option>
              </select>
            </div>
            <div style={{padding:'12px 0'}}>
              <div style={{fontSize:13,fontWeight:500,color:'var(--text)',marginBottom:8}}>Date format</div>
              <select value={settings.dateFormat} onChange={e=>set('dateFormat',e.target.value)} style={inp}>
                <option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option>
              </select>
            </div>
          </Section>
        </div>

        <div>
          <Section title="🏫 School profile">
            {[{l:'School name',v:'Lakefield Global School'},{l:'Address',v:'Dhaka, Bangladesh'},{l:'Phone',v:'01711-000000'},{l:'Email',v:'info@lakefield.edu.bd'},{l:'Principal',v:'Dr. Rahman'},{l:'Est. year',v:'2005'}].map(f=>(
              <div key={f.l} style={{marginBottom:12}}>
                <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>{f.l}</label>
                <input defaultValue={f.v} style={inp}/>
              </div>
            ))}
          </Section>

          <Section title="💰 Finance settings">
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Currency</label>
              <select value={settings.currency} onChange={e=>set('currency',e.target.value)} style={inp}>
                <option>BDT (৳)</option><option>USD ($)</option>
              </select>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Fee due day</label>
              <select style={inp}><option>10th of each month</option><option>1st of each month</option><option>15th of each month</option></select>
            </div>
            <div>
              <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Late fee penalty (%)</label>
              <input type="number" defaultValue="5" style={inp}/>
            </div>
          </Section>

          <Section title="🤖 AI settings">
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>AI model</label>
              <select style={inp}><option>Claude Sonnet (recommended)</option><option>Claude Haiku (faster)</option></select>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',fontWeight:600,display:'block',marginBottom:6}}>Attendance alert threshold</label>
              <select style={inp}><option>Below 75%</option><option>Below 80%</option><option>Below 70%</option></select>
            </div>
            <div style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px',fontSize:12,color:'var(--text2)'}}>
              🤖 AI credits: Add credits at <span style={{color:'var(--blue)'}}>console.anthropic.com</span> to enable all AI features.
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
