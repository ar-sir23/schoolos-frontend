import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import AIAssistant from './pages/AIAssistant';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Fees from './pages/Fees';
import Attendance from './pages/Attendance';
import Teachers from './pages/Teachers';
import ReportCards from './pages/ReportCards';
import Invoices from './pages/Invoices';
import Reports from './pages/Reports';
import RiskScoring from './pages/RiskScoring';
import SmartAlerts from './pages/SmartAlerts';
import ParentPortal from './pages/ParentPortal';
import './styles/dashboard.css';
import { Analytics } from '@vercel/analytics/react';
import { getSchoolConfig } from './config/schools';

const NOTIFICATIONS = [
  { id:1, icon:'💰', bg:'var(--red-dim)',    color:'var(--red)',    title:'Fee overdue — Rafiq Hossain',    desc:'3 months overdue · ৳13,500 balance', time:'2 min ago',  unread:true  },
  { id:2, icon:'✅', bg:'var(--amber-dim)',  color:'var(--amber)',  title:'Low attendance — Fatema Begum',  desc:'61% attendance this month',          time:'15 min ago', unread:true  },
  { id:3, icon:'🧠', bg:'var(--purple-dim)', color:'var(--purple)', title:'AI risk scan complete',          desc:'12 high-risk students flagged',      time:'1 hour ago', unread:true  },
  { id:4, icon:'📋', bg:'var(--blue-dim)',   color:'var(--blue)',   title:'Report cards generated',         desc:'42 students · Class 8-A',            time:'2 hours ago',unread:false },
  { id:5, icon:'👨‍🎓',bg:'var(--green-dim)', color:'var(--green)',  title:'New student enrolled',           desc:'Rina Begum · Class 6-A',             time:'Today',      unread:false },
];

// ── Notifications Dropdown ────────────────────────────────────────────────────
function NotifDropdown({ onClose }) {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const markAllRead = () => setNotifs(n => n.map(x => ({...x, unread:false})));
  return (
    <div style={{position:'absolute',top:46,right:0,width:320,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,boxShadow:'0 8px 32px rgba(0,0,0,.4)',zIndex:200,overflow:'hidden'}}>
      <div style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>Notifications</span>
        <span onClick={markAllRead} style={{fontSize:11,color:'var(--blue)',cursor:'pointer'}}>Mark all read</span>
      </div>
      {notifs.map(n=>(
        <div key={n.id} onClick={()=>setNotifs(ns=>ns.map(x=>x.id===n.id?{...x,unread:false}:x))}
          style={{display:'flex',alignItems:'flex-start',gap:10,padding:'12px 16px',borderBottom:'1px solid var(--border)',cursor:'pointer',background:n.unread?'rgba(59,130,246,.04)':'transparent',transition:'background .15s'}}
          onMouseEnter={e=>e.currentTarget.style.background='var(--bg3)'}
          onMouseLeave={e=>e.currentTarget.style.background=n.unread?'rgba(59,130,246,.04)':'transparent'}>
          <div style={{width:32,height:32,borderRadius:8,background:n.bg,color:n.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0}}>{n.icon}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:500,color:'var(--text)',marginBottom:2}}>{n.title}</div>
            <div style={{fontSize:11,color:'var(--text3)'}}>{n.desc}</div>
            <div style={{fontSize:10,color:'var(--text3)',marginTop:3}}>{n.time}</div>
          </div>
          {n.unread && <div style={{width:6,height:6,background:'var(--blue)',borderRadius:'50%',flexShrink:0,marginTop:4}}/>}
        </div>
      ))}
      <div style={{padding:'10px 16px',textAlign:'center',fontSize:12,color:'var(--blue)',cursor:'pointer'}}>View all notifications</div>
    </div>
  );
}

// ── Profile Dropdown ──────────────────────────────────────────────────────────
function ProfileDropdown({ onClose, setPage, setProfileOpen }) {
  const { signOut } = useAuth();
  return (
    <div style={{position:'absolute',top:46,right:0,width:240,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,boxShadow:'0 8px 32px rgba(0,0,0,.4)',zIndex:200,overflow:'hidden'}}>
      <div style={{padding:16,borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:44,height:44,borderRadius:12,background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:700,color:'#fff'}}>SA</div>
        <div>
          <div style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>School Admin</div>
          <div style={{fontSize:11,color:'var(--text3)'}}>admin@lakefield.edu.bd</div>
          <span className="badge badge-blue" style={{marginTop:4,display:'inline-block'}}>Starter plan</span>
        </div>
      </div>
      {[['👤','View profile','profile'],['⚙️','Settings','settings'],['🏫','School profile','school'],['🎨','Appearance','appearance'],['❓','Help & support','help']].map(([i,l,id])=>(
        <div key={l} onClick={()=>{setPage(id);setProfileOpen(false);}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',cursor:'pointer',fontSize:13,color:'var(--text2)',transition:'background .15s'}}
          onMouseEnter={e=>e.currentTarget.style.background='var(--bg3)'}
          onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
          <span style={{fontSize:16}}>{i}</span>{l}
        </div>
      ))}
      <div style={{borderTop:'1px solid var(--border)'}}>
        <div onClick={signOut} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',cursor:'pointer',fontSize:13,color:'var(--red)',transition:'background .15s'}}
          onMouseEnter={e=>e.currentTarget.style.background='var(--bg3)'}
          onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
          <span style={{fontSize:16}}>🚪</span>Sign out
        </div>
      </div>
    </div>
  );
}

// ── Topbar ────────────────────────────────────────────────────────────────────
function Topbar({ page, setPage, sidebarExpanded, setSidebarExpanded }) {
  const school = getSchoolConfig();
  const [notifOpen, setNotifOpen]     = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadCount = NOTIFICATIONS.filter(n=>n.unread).length;
  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handler = e => {
      if (notifRef.current && !notifRef.current.contains(e.target))   setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const TABS = [['dashboard','Dashboard'],['students','Students'],['fees','Fees'],['ai','AI Tools']];

  return (
    <div className="topbar">
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <button onClick={()=>setSidebarExpanded(s=>!s)}
          style={{width:30,height:30,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',cursor:'pointer',color:'var(--text2)',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>
          {sidebarExpanded?'⟨':'⟩'}
        </button>
        <div className="logo">
          {school.logo ? (
            <img src={school.logo} alt={school.name} style={{ width:30, height:30, borderRadius:8, objectFit:'cover' }}/>
          ) : (
            <div className="logo-mark">S</div>
          )}
          <div><div className="logo-text">{school.name}</div><div className="logo-sub">Management Platform</div></div>
        </div>
      </div>

      <nav className="topbar-nav">
        {TABS.map(([id,label])=>(
          <a key={id} href="#!" className={page===id?'active':''} onClick={e=>{e.preventDefault();setPage(id);}}>
            {label}
          </a>
        ))}
      </nav>

      <div className="topbar-right">
        {/* Search */}
        <div style={{display:'flex',alignItems:'center',gap:8,padding:'6px 12px',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,cursor:'pointer'}}
          onClick={()=>{}}>
          <span style={{fontSize:13,color:'var(--text3)'}}>🔍</span>
          <span style={{fontSize:12,color:'var(--text3)'}}>Search…</span>
          <span style={{fontSize:10,color:'var(--text3)',background:'var(--bg4)',padding:'2px 6px',borderRadius:4}}>⌘K</span>
        </div>

        {/* Notifications */}
        <div ref={notifRef} style={{position:'relative'}}>
          <div className="icon-btn" onClick={()=>{setNotifOpen(o=>!o);setProfileOpen(false);}}>
            🔔
            {unreadCount > 0 && (
              <div style={{position:'absolute',top:-4,right:-4,width:16,height:16,background:'var(--red)',borderRadius:'50%',fontSize:9,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,border:'2px solid var(--bg2)'}}>{unreadCount}</div>
            )}
          </div>
          {notifOpen && <NotifDropdown onClose={()=>setNotifOpen(false)}/>}
        </div>

        {/* Profile */}
        <div ref={profileRef} style={{position:'relative'}}>
          <div className="user-chip" onClick={()=>{setProfileOpen(o=>!o);setNotifOpen(false);}}>
            <div className="user-av">SA</div>
            <span className="user-name">School Admin</span>
            <span style={{fontSize:11,color:'var(--text3)'}}>▾</span>
          </div>
          {profileOpen && <ProfileDropdown onClose={()=>setProfileOpen(false)} setPage={setPage} setProfileOpen={setProfileOpen}/>}
        </div>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage, expanded }) {
  const school = getSchoolConfig();
  const NAV = [
    { section:'Overview', items:[
      {id:'dashboard',icon:'🏠',label:'Dashboard'},
      {id:'students', icon:'👨‍🎓',label:'Students',badge:'1.2k'},
      {id:'teachers', icon:'👨‍🏫',label:'Teachers'},
      {id:'attendance',icon:'✅',label:'Attendance'},
    ]},
    { section:'Finance', items:[
      {id:'fees',    icon:'💰',label:'Fee management'},
      {id:'invoices',icon:'🧾',label:'Invoices',badge:'41'},
      {id:'reports', icon:'📊',label:'Reports'},
    ]},
    { section:'AI Powered', items:[
      {id:'ai',     icon:'🤖',label:'AI Assistant'},
      {id:'cards',  icon:'📋',label:'Report cards'},
      {id:'alerts', icon:'🔔',label:'Smart alerts',badge:'5'},
      {id:'risk',   icon:'🧠',label:'Risk scoring'},
    ]},
  ];

  return (
    <div className="sidebar" style={{width:expanded?220:56,transition:'width .2s',overflow:'hidden',flexShrink:0}}>
      <div style={{padding:'0 8px 12px',borderBottom:'1px solid var(--border)',marginBottom:12,overflow:'hidden',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:8}}>
        {school.logo && <img src={school.logo} alt={school.name} style={{width:32,height:32,borderRadius:8,objectFit:'cover',flexShrink:0}}/>}
        {expanded && <div>
          <div style={{fontSize:12,fontWeight:600,color:'var(--text)'}}>{school.name}</div>
          <div style={{display:'inline-block',fontSize:10,padding:'2px 8px',background:'var(--blue-dim)',color:'var(--blue)',borderRadius:20,marginTop:4}}>Starter Plan</div>
        </div>}
      </div>

      {NAV.map(({section,items})=>(
        <div key={section} className="nav-section">
          {expanded && <div className="nav-section-label">{section}</div>}
          {items.map(item=>(
            <div key={item.id}
              className={`nav-link ${page===item.id?'active':''}`}
              title={!expanded?item.label:undefined}
              onClick={()=>setPage(item.id)}
              style={{justifyContent:expanded?'flex-start':'center',padding:expanded?'8px 10px':'8px'}}>
              <span style={{fontSize:16,flexShrink:0}}>{item.icon}</span>
              {expanded && <>{item.label}{item.badge&&<span className="nav-badge">{item.badge}</span>}</>}
            </div>
          ))}
        </div>
      ))}

      <div className="sidebar-footer">
        {[['⚙️','Settings'],['❓','Help']].map(([icon,label])=>(
          <div key={label} className="nav-link" title={!expanded?label:undefined}
            style={{justifyContent:expanded?'flex-start':'center',padding:expanded?'8px 10px':'8px'}}>
            <span style={{fontSize:16}}>{icon}</span>
            {expanded && label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Placeholder ───────────────────────────────────────────────────────────────

// ── App Shell ─────────────────────────────────────────────────────────────────
function AppShell() {
  const [page, setPage]                   = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const renderPage = () => {
    switch(page){
      case 'dashboard':  return <Dashboard/>;
      case 'students':   return <Students/>;
      case 'teachers':   return <Teachers/>;
      case 'attendance': return <Attendance/>;
      case 'fees':       return <Fees/>;
      case 'invoices':   return <Invoices/>;
      case 'reports':    return <Reports/>;
      case 'ai':         return <AIAssistant/>;
      case 'cards':      return <ReportCards/>;
      case 'alerts':     return <SmartAlerts/>;
      case 'risk':       return <RiskScoring/>;
      case 'parent':     return <ParentPortal/>;
      default:           return <Dashboard/>;
    }
  };

  return (
    <div className="app">
      <Topbar page={page} setPage={setPage} sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <div className="layout">
        <Sidebar page={page} setPage={setPage} expanded={sidebarExpanded}/>
        {renderPage()}
      </div>
    </div>
  );
}

function AppContent(){const{user}=useAuth();return user?<AppShell/>:<Login/>;}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="*" element={<AuthProvider><AppContent/></AuthProvider>} /><Analytics/>
      </Routes>
    </BrowserRouter>
  );
}
