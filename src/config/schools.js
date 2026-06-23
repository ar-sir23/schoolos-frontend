const SCHOOLS = {
  'www': {
    name:     'Lakefield Global School',
    tagline:  'To Strive Success In The Here & Hereafter',
    initials: 'LG',
    logo:     '/logos/lakefield-logo.jpg',
    gradient: 'linear-gradient(135deg, #0F5132, #10B981)',
    shadow:   'rgba(16, 185, 129, 0.3)',
    features: [
      { icon: '👨‍🎓', title: 'Student management', desc: 'Complete profiles & academic history' },
      { icon: '💰',   title: 'Fee management',     desc: 'bKash, Nagad & cash payments' },
      { icon: '🤖',   title: 'AI assistant',       desc: 'Powered by Claude · Anthropic' },
      { icon: '📋',   title: 'Auto report cards',  desc: 'AI-generated student comments' },
    ],
  },
  'lgsedu': {
    name:     'Lakefield Global School',
    tagline:  'To Strive Success In The Here & Hereafter',
    initials: 'LG',
    logo:     '/logos/lakefield-logo.jpg',
    gradient: 'linear-gradient(135deg, #0F5132, #10B981)',
    shadow:   'rgba(16, 185, 129, 0.3)',
    features: [
      { icon: '👨‍🎓', title: 'Student management', desc: 'Complete profiles & academic history' },
      { icon: '💰',   title: 'Fee management',     desc: 'bKash, Nagad & cash payments' },
      { icon: '🤖',   title: 'AI assistant',       desc: 'Powered by Claude · Anthropic' },
      { icon: '📋',   title: 'Auto report cards',  desc: 'AI-generated student comments' },
    ],
  },
  'lakefield-global-school-1': {
    name:     'Lakefield Global School',
    tagline:  'To Strive Success In The Here & Hereafter',
    initials: 'LG',
    logo:     '/logos/lakefield-logo.jpg',
    gradient: 'linear-gradient(135deg, #0F5132, #10B981)',
    shadow:   'rgba(16, 185, 129, 0.3)',
    features: [
      { icon: '👨‍🎓', title: 'Student management', desc: 'Complete profiles & academic history' },
      { icon: '💰',   title: 'Fee management',     desc: 'bKash, Nagad & cash payments' },
      { icon: '🤖',   title: 'AI assistant',       desc: 'Powered by Claude · Anthropic' },
      { icon: '📋',   title: 'Auto report cards',  desc: 'AI-generated student comments' },
    ],
  },
  'default': {
    name:     'SchoolOS',
    tagline:  'AI-Powered School Management',
    initials: 'S',
    logo:     null,
    gradient: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
    shadow:   'rgba(139, 92, 246, 0.3)',
    features: [
      { icon: '👨‍🎓', title: 'Student management', desc: 'Complete profiles & academic history' },
      { icon: '💰',   title: 'Fee management',     desc: 'bKash, Nagad & cash payments' },
      { icon: '🤖',   title: 'AI assistant',       desc: 'Powered by Claude · Anthropic' },
      { icon: '📋',   title: 'Auto report cards',  desc: 'AI-generated student comments' },
    ],
  },
};

export function getSchoolConfig() {
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];
  return SCHOOLS[subdomain] || SCHOOLS['default'];
}

export default SCHOOLS;
