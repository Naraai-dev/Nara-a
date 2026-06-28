export interface IntegrationItem {
  name: string;
  description: string;
}

export interface IntegrationCategory {
  id: string;
  name: string;
  iconName: string;
  items: IntegrationItem[];
}

export const INTEGRATIONS_DATA: IntegrationCategory[] = [
  {
    id: 'productivity',
    name: 'Productivity',
    iconName: 'Layers',
    items: [
      { name: 'Gmail', description: 'Read, organize, summarize, and draft emails.' },
      { name: 'Outlook', description: 'Manage Microsoft email and calendar workflows.' },
      { name: 'Google Calendar', description: 'Plan your schedule, meetings, and daily routines.' },
      { name: 'Apple Calendar', description: 'Keep your personal events synchronized.' },
      { name: 'Google Drive', description: 'Search, summarize, and organize your documents.' },
      { name: 'OneDrive', description: 'Access and understand your Microsoft files.' },
      { name: 'Dropbox', description: 'Retrieve and manage cloud documents.' },
      { name: 'Notion', description: 'Understand your notes, projects, and knowledge base.' },
      { name: 'Todoist', description: 'Track tasks and personal productivity.' },
      { name: 'Trello', description: 'Manage boards and project progress.' },
      { name: 'Asana', description: 'Coordinate work and team projects.' },
      { name: 'ClickUp', description: 'Monitor goals, documents, and workflows.' }
    ]
  },
  {
    id: 'communication',
    name: 'Communication',
    iconName: 'MessageSquare',
    items: [
      { name: 'WhatsApp', description: 'Organize conversations, reminders, and shared information.' },
      { name: 'Telegram', description: 'Manage chats and important messages.' },
      { name: 'Signal', description: 'Support secure personal communication.' },
      { name: 'Messenger', description: 'Keep track of conversations and follow-ups.' },
      { name: 'Slack', description: 'Summarize team discussions and workspace updates.' },
      { name: 'Discord', description: 'Monitor communities and collaborative spaces.' },
      { name: 'Microsoft Teams', description: 'Support meetings, collaboration, and communication.' },
      { name: 'Zoom', description: 'Prepare for meetings and summarize discussions.' }
    ]
  },
  {
    id: 'social',
    name: 'Social Media',
    iconName: 'Globe',
    items: [
      { name: 'Instagram', description: 'Plan content, analyze engagement, and organize conversations.' },
      { name: 'X (Twitter)', description: 'Monitor trends, summarize discussions, and assist with posting.' },
      { name: 'LinkedIn', description: 'Manage professional networking and content.' },
      { name: 'Facebook', description: 'Organize pages, communities, and messaging.' },
      { name: 'TikTok', description: 'Track content performance and creative ideas.' },
      { name: 'YouTube', description: 'Summarize videos, organize subscriptions, and assist creators.' },
      { name: 'Reddit', description: 'Research communities and summarize discussions.' },
      { name: 'Threads', description: 'Follow conversations and discover trends.' },
      { name: 'Pinterest', description: 'Organize inspiration and visual collections.' }
    ]
  },
  {
    id: 'web',
    name: 'Web & Browsers',
    iconName: 'Compass',
    items: [
      { name: 'Google Chrome', description: 'Bring Nara directly into your browsing experience.' },
      { name: 'Microsoft Edge', description: 'Assist while researching, reading, and working online.' },
      { name: 'Mozilla Firefox', description: 'Summarize pages and answer questions in real time.' },
      { name: 'Safari', description: 'Support research across Apple devices.' },
      { name: 'Brave Browser', description: 'Browse privately with AI assistance.' },
      { name: 'Opera', description: 'Access Nara while exploring the web.' }
    ]
  },
  {
    id: 'search',
    name: 'Search & Research',
    iconName: 'Search',
    items: [
      { name: 'Google Search', description: 'Research topics with intelligent summaries.' },
      { name: 'Bing', description: 'Compare information across multiple sources.' },
      { name: 'DuckDuckGo', description: 'Private web research with AI assistance.' },
      { name: 'Brave Search', description: 'Privacy-focused search and knowledge discovery.' },
      { name: 'Perplexity', description: 'Combine conversational research with your personal AI.' }
    ]
  },
  {
    id: 'learning',
    name: 'Learning & Knowledge',
    iconName: 'BookOpen',
    items: [
      { name: 'Google Docs', description: 'Write, summarize, and collaborate intelligently.' },
      { name: 'Microsoft Word', description: 'Improve writing and document creation.' },
      { name: 'Kindle', description: 'Remember books, highlights, and reading progress.' },
      { name: 'Obsidian', description: 'Connect your personal knowledge network.' },
      { name: 'Evernote', description: 'Search and organize notes.' },
      { name: 'Readwise', description: 'Review highlights and learning history.' }
    ]
  },
  {
    id: 'creativity',
    name: 'Creativity',
    iconName: 'Palette',
    items: [
      { name: 'Canva', description: 'Generate ideas and accelerate content creation.' },
      { name: 'Figma', description: 'Review designs and organize creative projects.' },
      { name: 'Adobe Photoshop', description: 'Support creative workflows and editing tasks.' },
      { name: 'Adobe Premiere Pro', description: 'Assist with video editing and production.' },
      { name: 'CapCut', description: 'Generate captions, edits, and publishing workflows.' },
      { name: 'Blender', description: 'Support 3D creative projects.' }
    ]
  },
  {
    id: 'developer',
    name: 'Developer',
    iconName: 'Code',
    items: [
      { name: 'GitHub', description: 'Understand repositories, commits, and documentation.' },
      { name: 'GitLab', description: 'Manage development workflows.' },
      { name: 'Visual Studio Code', description: 'Assist with coding and debugging.' },
      { name: 'Cursor', description: 'Enhance AI-assisted software development.' },
      { name: 'Replit', description: 'Build and test projects from anywhere.' }
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    iconName: 'DollarSign',
    items: [
      { name: 'Bank Accounts', description: 'Monitor balances, budgets, and financial habits.' },
      { name: 'Credit Cards', description: 'Track spending and payment reminders.' },
      { name: 'Stripe', description: 'Understand business revenue and payments.' },
      { name: 'PayPal', description: 'Manage transactions and activity.' },
      { name: 'Wise', description: 'Monitor international transfers.' },
      { name: 'Binance', description: 'Track cryptocurrency portfolios.' },
      { name: 'Coinbase', description: 'View digital asset performance.' }
    ]
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    iconName: 'Heart',
    items: [
      { name: 'Apple Health', description: 'Connect health information securely.' },
      { name: 'Google Fit', description: 'Track movement and activity.' },
      { name: 'Samsung Health', description: 'Monitor wellness and daily health metrics.' },
      { name: 'Fitbit', description: 'Analyze fitness and recovery.' },
      { name: 'Garmin', description: 'Support training and performance insights.' },
      { name: 'Oura', description: 'Understand sleep, recovery, and readiness.' }
    ]
  },
  {
    id: 'travel',
    name: 'Travel & Mobility',
    iconName: 'MapPin',
    items: [
      { name: 'Google Maps', description: 'Plan routes and remember places.' },
      { name: 'Apple Maps', description: 'Navigate seamlessly across Apple devices.' },
      { name: 'Uber', description: 'Manage rides and travel history.' },
      { name: 'Airbnb', description: 'Organize trips and reservations.' },
      { name: 'Booking.com', description: 'Track accommodation plans.' },
      { name: 'Expedia', description: 'Coordinate travel itineraries.' },
      { name: 'Skyscanner', description: 'Monitor flights and travel opportunities.' }
    ]
  },
  {
    id: 'smart_home',
    name: 'Smart Home',
    iconName: 'Home',
    items: [
      { name: 'Google Home', description: 'Control connected devices naturally.' },
      { name: 'Amazon Alexa', description: 'Manage routines and smart home automation.' },
      { name: 'Apple Home', description: 'Coordinate your Apple smart home ecosystem.' },
      { name: 'Philips Hue', description: 'Automate lighting based on your preferences.' },
      { name: 'Google Nest', description: 'Manage climate, cameras, and home intelligence.' }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    iconName: 'Music',
    items: [
      { name: 'Spotify', description: 'Organize playlists and discover music.' },
      { name: 'Apple Music', description: 'Enjoy personalized listening experiences.' },
      { name: 'Netflix', description: 'Track shows and receive recommendations.' },
      { name: 'Disney+', description: 'Manage family entertainment.' },
      { name: 'Audible', description: 'Remember books and listening progress.' }
    ]
  },
  {
    id: 'education',
    name: 'Education',
    iconName: 'GraduationCap',
    items: [
      { name: 'Coursera', description: 'Support structured online learning.' },
      { name: 'Udemy', description: 'Track courses and learning goals.' },
      { name: 'Khan Academy', description: 'Personalize educational support.' },
      { name: 'Duolingo', description: 'Practice languages with long-term progress tracking.' }
    ]
  }
];
