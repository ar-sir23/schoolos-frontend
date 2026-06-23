import React from 'react';

const S = {
  nav:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 40px',borderBottom:'1px solid #1E2A3D',background:'rgba(10,13,20,.9)',position:'sticky',top:0,zIndex:100},
  logo:{display:'flex',alignItems:'center',gap:10,fontSize:16,fontWeight:700,color:'#F0F4FF'},
  logoMark:{width:32,height:32,borderRadius:8,background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:14,fontWeight:700},
  hero:{padding:'80px 40px 60px',textAlign:'center',background:'#0A0D14'},
  badge:{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:20,background:'rgba(59,130,246,.1)',border:'1px solid rgba(59,130,246,.2)',fontSize:12,color:'#3B82F6',marginBottom:24},
  title:{fontSize:40,fontWeight:700,lineHeight:1.2,marginBottom:16,background:'linear-gradient(135deg,#F0F4FF 0%,#8B9BB8 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'},
  sub:{fontSize:16,color:'#8B9BB8',maxWidth:560,margin:'0 auto 32px',lineHeight:1.6},
  btnPrimary:{padding:'12px 28px',borderRadius:10,fontSize:14,fontWeight:600,cursor:'pointer',background:'linear-gradient(135deg,#3B82F6,#2563EB)',color:'#fff',border:'none',boxShadow:'0 4px 20px rgba(59,130,246,.3)',marginRight:12},
  btnGhost:{padding:'12px 28px',borderRadius:10,fontSize:14,fontWeight:600,cursor:'pointer',background:'transparent',color:'#8B9BB8',border:'1px solid #1E2A3D'},
};

const FEATURES=[
  ['👨‍🎓','Student Management','Complete profiles, academic history, attendance tracking, and parent portal.','#1E3A5F','#3B82F6'],
  ['💰','Fee Management','Invoices, bKash/Nagad payments, automated reminders, and financial reports.','#064E3B','#10B981'],
  ['✅','Attendance Tracking','Mark attendance digitally, track trends, and auto-alert parents of absences.','#451A03','#F59E0B'],
  ['📋','AI Report Cards','AI writes personalised student comments in seconds for every student.','#2E1065','#8B5CF6'],
  ['🧠','Fee Risk Prediction','Predict which families are likely to default before it happens.','#450A0A','#EF4444'],
  ['📢','Parent Communication','SMS, email, and in-app notifications in Bengali or English.','#1E3A5F','#3B82F6'],
  ['🏫','Multi-school SaaS','One platform, unlimited schools, each with their own subdomain.','#064E3B','#10B981'],
  ['📊','Analytics & Reports','Real-time dashboards and exportable reports for principals.','#2E1065','#8B5CF6'],
];

const PLANS=[
  {name:'Free',price:'৳0',sub:'Up to 100 students',features:['Student management','Basic attendance','Fee tracking','Admin panel'],primary:false},
  {name:'Starter',price:'৳2,500',sub:'Up to 500 students/mo',features:['Everything in Free','Parent portal','SMS alerts','Email support'],primary:false},
  {name:'Growth',price:'৳6,000',sub:'Up to 2,000 students/mo',features:['Everything in Starter','AI chatbot','AI report cards','Fee risk prediction'],primary:true},
  {name:'Scale',price:'৳12,000',sub:'Unlimited students/mo',features:['Everything in Growth','Multi-branch','Custom domain','Dedicated support'],primary:false},
];

export default function Landing(){
  return(
    <div style={{background:'#0A0D14',color:'#F0F4FF',minHeight:'100vh',fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'}}>

      {/* Nav */}
      <div style={S.nav}>
        <div style={S.logo}><div style={S.logoMark}>S</div>SchoolOS</div>
        <div style={{display:'flex',gap:28,fontSize:13,color:'#8B9BB8'}}>
          {['Features','Pricing','Demo','Contact'].map(l=><span key={l} style={{cursor:'pointer'}}>{l}</span>)}
        </div>
        <div style={{display:'flex',gap:10}}>
          <button style={{padding:'7px 16px',borderRadius:8,fontSize:13,cursor:'pointer',border:'1px solid #1E2A3D',background:'transparent',color:'#8B9BB8'}}>Sign in</button>
          <button style={{padding:'7px 18px',borderRadius:8,fontSize:13,cursor:'pointer',border:'none',background:'#3B82F6',color:'#fff',fontWeight:500}}>Get started free ↗</button>
        </div>
      </div>

      {/* Hero */}
      <div style={S.hero}>
        <div style={S.badge}>🤖 Powered by Claude AI · Anthropic</div>
        <div style={S.title}>The AI-Powered School<br/>Management Platform</div>
        <div style={S.sub}>Run your entire school from one dashboard. AI handles attendance alerts, fee predictions, report cards, and parent communication — automatically.</div>
        <div style={{marginBottom:48}}>
          <button style={S.btnPrimary}>Start free trial ↗</button>
          <button style={S.btnGhost}>Watch demo</button>
        </div>
        <div style={{display:'flex',gap:40,justifyContent:'center',fontSize:13,color:'#8B9BB8'}}>
          {[['2,400+','Schools using SchoolOS'],['1.2M+','Students managed'],['৳48Cr+','Fees collected'],['99.9%','Uptime guarantee']].map(([v,l])=>(
            <div key={l}><div style={{fontSize:22,fontWeight:700,color:'#F0F4FF',marginBottom:2}}>{v}</div>{l}</div>
          ))}
        </div>
      </div>

      {/* Preview bar */}
      <div style={{margin:'0 40px 60px',borderRadius:16,border:'1px solid #1E2A3D',overflow:'hidden',background:'#0F1520',boxShadow:'0 20px 60px rgba(0,0,0,.4)'}}>
        <div style={{padding:'12px 16px',background:'#141C2B',borderBottom:'1px solid #1E2A3D',display:'flex',alignItems:'center',gap:8}}>
          {['#EF4444','#F59E0B','#10B981'].map(c=><div key={c} style={{width:10,height:10,borderRadius:'50%',background:c}}/>)}
          <span style={{marginLeft:8,fontSize:11,color:'#4A5568'}}>lakefield.schoolos.com/dashboard</span>
        </div>
        <div style={{padding:20,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
          {[['👨‍🎓','Total Students','1,248','↑ +34 this term','#10B981'],['✅','Attendance Today','94.2%','72 absent','#F59E0B'],['💰','Fees Collected','৳18.4L','87% of target','#10B981'],['🧠','AI Flagged','12','fee defaulters','#EF4444']].map(([i,l,v,s,c])=>(
            <div key={l} style={{background:'#0A0D14',border:'1px solid #1E2A3D',borderRadius:10,padding:14}}>
              <div style={{fontSize:20,marginBottom:8}}>{i}</div>
              <div style={{fontSize:10,color:'#4A5568',textTransform:'uppercase',letterSpacing:'.04em',marginBottom:4}}>{l}</div>
              <div style={{fontSize:18,fontWeight:600}}>{v}</div>
              <div style={{fontSize:10,color:c,marginTop:3}}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{padding:'60px 40px'}}>
        <div style={{fontSize:12,color:'#3B82F6',textTransform:'uppercase',letterSpacing:'.1em',fontWeight:600,textAlign:'center',marginBottom:12}}>Everything you need</div>
        <div style={{fontSize:30,fontWeight:700,textAlign:'center',marginBottom:12}}>Built for Bangladeshi schools</div>
        <div style={{fontSize:15,color:'#8B9BB8',textAlign:'center',maxWidth:500,margin:'0 auto 48px',lineHeight:1.6}}>From single-campus schools to multi-branch institutions — SchoolOS scales with you.</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
          {FEATURES.map(([i,t,d,bg,c])=>(
            <div key={t} style={{background:'#0F1520',border:'1px solid #1E2A3D',borderRadius:14,padding:20,transition:'all .2s',cursor:'default'}} onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(59,130,246,.3)'} onMouseLeave={e=>e.currentTarget.style.borderColor='#1E2A3D'}>
              <div style={{width:42,height:42,borderRadius:12,background:bg,color:c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,marginBottom:14}}>{i}</div>
              <div style={{fontSize:14,fontWeight:600,color:'#F0F4FF',marginBottom:8}}>{t}</div>
              <div style={{fontSize:12,color:'#8B9BB8',lineHeight:1.6}}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{padding:'60px 40px',background:'#0F1520',borderTop:'1px solid #1E2A3D',borderBottom:'1px solid #1E2A3D'}}>
        <div style={{fontSize:12,color:'#3B82F6',textTransform:'uppercase',letterSpacing:'.1em',fontWeight:600,textAlign:'center',marginBottom:12}}>Simple pricing</div>
        <div style={{fontSize:30,fontWeight:700,textAlign:'center',marginBottom:12}}>One price per school</div>
        <div style={{fontSize:15,color:'#8B9BB8',textAlign:'center',maxWidth:400,margin:'0 auto 48px',lineHeight:1.6}}>No per-student fees. No hidden charges. Cancel anytime.</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,maxWidth:960,margin:'0 auto'}}>
          {PLANS.map(p=>(
            <div key={p.name} style={{background:'#0A0D14',border:`1px solid ${p.primary?'#3B82F6':'#1E2A3D'}`,borderRadius:16,padding:24,position:'relative',background:p.primary?'linear-gradient(180deg,rgba(59,130,246,.05) 0%,#0A0D14 100%)':'#0A0D14'}}>
              {p.primary&&<div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#3B82F6',color:'#fff',fontSize:10,fontWeight:700,padding:'3px 12px',borderRadius:20}}>MOST POPULAR</div>}
              <div style={{fontSize:13,fontWeight:600,color:'#8B9BB8',marginBottom:8,textTransform:'uppercase',letterSpacing:'.06em'}}>{p.name}</div>
              <div style={{fontSize:28,fontWeight:700,color:'#F0F4FF',marginBottom:4}}>{p.price}<span style={{fontSize:13,fontWeight:400,color:'#4A5568'}}>/mo</span></div>
              <div style={{fontSize:11,color:'#4A5568',marginBottom:20}}>{p.sub}</div>
              <div style={{marginBottom:24}}>{p.features.map(f=>(
                <div key={f} style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:'#8B9BB8',marginBottom:8}}>
                  <span style={{color:'#10B981',fontWeight:600}}>✓</span>{f}
                </div>
              ))}</div>
              <button style={{width:'100%',padding:10,borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer',background:p.primary?'#3B82F6':'#141C2B',color:p.primary?'#fff':'#8B9BB8',border:`1px solid ${p.primary?'#3B82F6':'#1E2A3D'}`}}>
                {p.primary?'Get started ↗':'Start free ↗'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{padding:'60px 40px',textAlign:'center'}}>
        <div style={{background:'linear-gradient(135deg,rgba(59,130,246,.1),rgba(139,92,246,.1))',border:'1px solid rgba(59,130,246,.2)',borderRadius:20,padding:48,maxWidth:680,margin:'0 auto'}}>
          <div style={{fontSize:28,fontWeight:700,marginBottom:12}}>Ready to modernise your school?</div>
          <div style={{fontSize:15,color:'#8B9BB8',marginBottom:28,lineHeight:1.6}}>Join 2,400+ schools already using SchoolOS. Set up in 15 minutes. No technical knowledge needed.</div>
          <button style={{...S.btnPrimary,marginRight:12}}>Start free trial — no credit card ↗</button>
          <button style={S.btnGhost}>Book a demo</button>
        </div>
      </div>

      {/* Footer */}
      <div style={{padding:'32px 40px',borderTop:'1px solid #1E2A3D',display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:12,color:'#4A5568'}}>
        <div style={S.logo}><div style={{...S.logoMark,width:24,height:24,fontSize:11}}>S</div>SchoolOS</div>
        <div>© 2026 SchoolOS · Built for Bangladeshi schools · Powered by Claude AI</div>
        <div style={{display:'flex',gap:16}}>{['Privacy','Terms','Contact'].map(l=><span key={l} style={{cursor:'pointer'}}>{l}</span>)}</div>
      </div>
    </div>
  );
}
