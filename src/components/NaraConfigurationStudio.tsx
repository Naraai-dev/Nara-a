import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Calendar,
  Check,
  Upload,
  Lock,
  Unlock,
  Database,
  RefreshCw,
  CheckCircle2,
  Settings,
  Info,
  LockKeyhole,
  Key,
  Mail,
  Cpu,
  User,
  Phone,
  Globe,
  Languages,
  Shield,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.ts';
import PhilosophyView from './PhilosophyView.tsx';
import SolutionsView from './SolutionsView.tsx';
import TrustView from './TrustView.tsx';
import IntegrationsView from './IntegrationsView.tsx';
import AboutView from './AboutView.tsx';
import SecurityPolicyView from './SecurityPolicyView.tsx';
import ConsultationSlaView from './ConsultationSlaView.tsx';
import EthicalCovenantView from './EthicalCovenantView.tsx';

// Application Types & Definitions
interface NaraConfig {
  id?: string;
  nara_name: string;
  companion_type: string;
  plan_tier: string;
  avatar_level: number;
  goals: string[];
  personality: string;
  conversation_style: string;
  connected_services: string[];
  created_at?: string;
}

interface Booking {
  id?: string;
  name: string;
  email: string;
  booking_date: string;
  booking_time: string;
  session_type: string;
  nara_name: string;
  created_at?: string;
}

// Helper to get API URLs referencing VITE_API_URL when set, falling back to relative paths
const getApiUrl = (endpoint: string): string => {
  const baseUrl = import.meta.env.VITE_API_URL || '';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${cleanBase}${cleanEndpoint}`;
};

export default function NaraConfigurationStudio() {
  // Application State
  const [mainTab, setMainTab] = useState<'philosophy' | 'solutions' | 'trust' | 'integrations' | 'about' | 'simulator'>('philosophy');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Backward compatibility shim mapping original tabs to sequential steps
  const setActiveTab = (tab: 'profile' | 'evolution' | 'integrations' | 'vault' | 'booking' | 'variables') => {
    if (tab === 'profile') {
      setCurrentStep(1);
    } else if (tab === 'evolution' || tab === 'integrations' || tab === 'vault') {
      setCurrentStep(2);
    } else if (tab === 'booking' || tab === 'variables') {
      setCurrentStep(3);
    }
  };
  
  // Modal Overlays state
  const [showSecurityPolicy, setShowSecurityPolicy] = useState<boolean>(false);
  const [showConsultationSla, setShowConsultationSla] = useState<boolean>(false);
  const [showEthicalCovenant, setShowEthicalCovenant] = useState<boolean>(false);

  // Slides configuration for bottom pagination
  const SLIDES = [
    { id: 'philosophy', num: '01', label: 'OUR PHILOSOPHY' },
    { id: 'solutions', num: '02', label: 'SOLUTION DIMENSIONS' },
    { id: 'trust', num: '03', label: 'TRUST MODEL' },
    { id: 'integrations', num: '04', label: 'INTEGRATED CHANNELS' },
    { id: 'about', num: '05', label: 'ABOUT NARA' },
    { id: 'simulator', num: '06', label: 'CONFIGURATION SIMULATOR' },
  ] as const;

  const activeSlideIndex = SLIDES.findIndex(s => s.id === mainTab);
  const activeSlide = activeSlideIndex >= 0 ? SLIDES[activeSlideIndex] : SLIDES[0];

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) {
      setMainTab(SLIDES[activeSlideIndex - 1].id);
    }
  };

  const handleNextSlide = () => {
    if (activeSlideIndex < SLIDES.length - 1) {
      setMainTab(SLIDES[activeSlideIndex + 1].id);
    }
  };
  
  // Companion Core Configuration
  const [naraName, setNaraName] = useState<string>('Nara');
  const [companionType, setCompanionType] = useState<string>('Creative Partner');
  const [planTier, setPlanTier] = useState<string>('Personal Professional');
  const [planCategory, setPlanCategory] = useState<'ALL' | 'INDIVIDUAL' | 'FAMILY' | 'ORGANIZATIONAL'>('ALL');
  const [avatarLevel, setAvatarLevel] = useState<number>(3);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Productivity', 'Knowledge Management']);
  const [personality, setPersonality] = useState<string>('Empathetic & Warm');
  const [conversationStyle, setConversationStyle] = useState<string>('Socratic');
  const [connectedServices, setConnectedServices] = useState<string[]>(['Google Calendar', 'Notion']);

  // Vault & File Upload State
  const [isVaultLocked, setIsVaultLocked] = useState<boolean>(true);
  const [secretKey, setSecretKey] = useState<string>('NARA-SECURE-KEY-2026');
  const [secureNotes, setSecureNotes] = useState<string>('Access authorized only for neural configuration sync.');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; url: string }[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Supabase Sync & User State
  const [user, setUser] = useState<any>(null);
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Booking Section State
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingEmail, setBookingEmail] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('14:00');
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);

  // Premium Multi-step Booking Onboarding State
  const [bookingOnboardingStep, setBookingOnboardingStep] = useState<number>(1);
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [bookingCountry, setBookingCountry] = useState<string>('United States');
  const [bookingLanguage, setBookingLanguage] = useState<string>('English');
  const [bookingTimeZone, setBookingTimeZone] = useState<string>('UTC-07:00 (Pacific Time)');
  const [bookingMeetingPlatform, setBookingMeetingPlatform] = useState<string>('Zoom');
  const [submittedDetails, setSubmittedDetails] = useState<any>(null);

  // Environment Settings Form State
  const [settingsUrl, setSettingsUrl] = useState<string>('');
  const [settingsAnonKey, setSettingsAnonKey] = useState<string>('');
  const [settingsServiceKey, setSettingsServiceKey] = useState<string>('');
  const [settingsSmtpHost, setSettingsSmtpHost] = useState<string>('smtp.gmail.com');
  const [settingsSmtpPort, setSettingsSmtpPort] = useState<string>('587');
  const [settingsSmtpUser, setSettingsSmtpUser] = useState<string>('');
  const [settingsSmtpPass, setSettingsSmtpPass] = useState<string>('');
  const [settingsGeminiKey, setSettingsGeminiKey] = useState<string>('');

  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(false);
  const [isSavingSettings, setIsSavingSettings] = useState<boolean>(false);
  const [settingsMessage, setSettingsMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Gemini Smart Blueprint Generation State
  const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState<boolean>(false);
  const [aiBlueprint, setAiBlueprint] = useState<string>('');

  // Static Configuration Constants
  const PLANS = [
    {
      category: 'PERSONAL INTELLIGENCE',
      name: 'Personal Essential',
      setupFee: '$299',
      price: '$29',
      period: '/month',
      desc: 'Perfect for first-time users.',
      badge: '',
      deploymentTime: '3–5 Business Days',
      included: [
        'Personal AI Companion',
        'Basic Long-Term Memory',
        'Daily Planning',
        'Smart Conversations',
        'Secure Cloud Profile'
      ]
    },
    {
      category: 'PERSONAL INTELLIGENCE',
      name: 'Personal Professional',
      setupFee: '$599',
      price: '$49',
      period: '/month',
      desc: 'Perfect for professionals, creators and entrepreneurs.',
      badge: 'Most Popular',
      deploymentTime: '5–7 Business Days',
      included: [
        'Everything in Essential',
        'Advanced Memory',
        'Research Assistant',
        'Writing Assistant',
        'Business Planning',
        'Priority Updates',
        'Cross-device Synchronization'
      ]
    },
    {
      category: 'PERSONAL INTELLIGENCE',
      name: 'Personal Signature',
      setupFee: '$999',
      price: '$79',
      period: '/month',
      desc: 'Your fully customized lifelong AI.',
      badge: '',
      deploymentTime: '7–10 Business Days',
      included: [
        'Everything in Professional',
        'Complete Personality Training',
        'Deep Context Memory',
        'Executive Intelligence',
        'Premium Integrations',
        'Priority Support',
        'Future Intelligence Upgrades'
      ]
    },
    {
      category: 'FAMILY INTELLIGENCE',
      name: 'Family Home',
      setupFee: '$1,499',
      price: '$99',
      period: '/month',
      desc: 'Designed for households.',
      badge: '',
      deploymentTime: '7–10 Business Days',
      included: [
        'Up to 5 Members',
        'Shared Family Memory',
        'Calendar Intelligence',
        'Family Planning',
        'Shared Knowledge'
      ]
    },
    {
      category: 'FAMILY INTELLIGENCE',
      name: 'Family Legacy',
      setupFee: '$2,999',
      price: '$149',
      period: '/month',
      desc: 'Designed for large families and long-term memory preservation.',
      badge: '',
      deploymentTime: '10–14 Business Days',
      included: [
        'Everything in Family Home',
        'Unlimited Family Profiles',
        'Memory Archive',
        'Personalized AI for Each Member',
        'Legacy Knowledge Vault',
        'Premium Support'
      ]
    },
    {
      category: 'ORGANIZATION INTELLIGENCE',
      name: 'Organization Intelligence',
      setupFee: 'Starting at $10,000',
      price: 'Starting at $499',
      period: '/month',
      desc: 'Enterprise Solution. Designed for companies, schools and organizations.',
      badge: 'Enterprise',
      deploymentTime: 'Custom Enterprise Rollout',
      included: [
        'Unlimited Team Members',
        'Department AI Systems',
        'Organization Knowledge Base',
        'Private AI Infrastructure',
        'Workspace Integrations',
        'Enterprise Security',
        'Dedicated Success Manager',
        'Employee Training',
        'Continuous Optimization'
      ]
    }
  ];
  const COMPANION_TYPES = ['Personal AI Companion', 'Family AI System', 'Organizational AI', 'Creative Partner', 'Analytical Mind', 'Personal Coach', 'Executive Assistant'];
  const PERSONALITY_STYLES = ['Empathetic & Warm', 'Direct & Logical', 'Witty & Sarcastic', 'Professional & Reserved'];
  const CONVERSATION_STYLES = ['Concise', 'Detailed', 'Socratic', 'Conversational'];
  const ALL_GOALS = ['Productivity', 'Mental Wellness', 'Knowledge Management', 'Creative Expression'];
  const SERVICES = [
    { name: 'Gmail', icon: '✉️', desc: 'Email digest & smart replies' },
    { name: 'Google Calendar', icon: '📅', desc: 'Auto scheduling & briefs' },
    { name: 'Slack', icon: '💬', desc: 'Instant messaging & alerts' },
    { name: 'Notion', icon: '📓', desc: 'Knowledge database queries' },
    { name: 'GitHub', icon: '💻', desc: 'Pull request reviews' },
    { name: 'Spotify', icon: '🎵', desc: 'Focus playlist generation' },
    { name: 'Zoom', icon: '📹', desc: 'Meeting summary extraction' }
  ];

  const EVOLUTION_STAGES = [
    { level: 1, name: 'Primal Core', desc: 'Initial neural pathway setup. Basic response generation and semantic understanding.', color: 'from-amber-100 to-amber-200 text-amber-800 border-amber-300' },
    { level: 2, name: 'Cognitive Synthesizer', desc: 'Multi-turn memory retention. Integrates context analysis with custom service indexing.', color: 'from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-300' },
    { level: 3, name: 'Socratic Dialogist', desc: 'Active meta-cognition. Challenges assumptions, highlights fallacies, and guides deep thinking.', color: 'from-blue-100 to-blue-200 text-blue-800 border-blue-300' },
    { level: 4, name: 'Symbiotic Empath', desc: 'Advanced emotional tone tracking. Calibrates support level dynamically based on context cues.', color: 'from-purple-100 to-purple-200 text-purple-800 border-purple-300' },
    { level: 5, name: 'Quantum Strategist', desc: 'Comprehensive scenario simulator. Formulates detailed workflows and execution paths.', color: 'from-pink-100 to-pink-200 text-pink-800 border-pink-300' },
    { level: 6, name: 'Transcendence Core', desc: 'Fully autonomous agent system. Continuous learning loop synchronized across all connected workspaces.', color: 'from-slate-800 to-slate-900 text-slate-100 border-slate-700' }
  ];

  // Load User and Data on Mount
  useEffect(() => {
    checkUser();
    loadLocalConfigs();
  }, []);

  const checkUser = async () => {
    if (isSupabaseConfigured && supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        loadCloudConfig(session.user.id);
        loadCloudBookings(session.user.email || '');
      }
    }
  };

  const fetchSettings = async () => {
    setIsLoadingSettings(true);
    setSettingsMessage(null);
    try {
      const res = await fetch(getApiUrl('/api/settings'));
      if (res.ok) {
        const data = await res.json();
        setSettingsUrl(data.SUPABASE_URL || '');
        setSettingsAnonKey(data.SUPABASE_ANON_KEY || '');
        setSettingsServiceKey(data.SUPABASE_SERVICE_ROLE_KEY || '');
        setSettingsSmtpHost(data.SMTP_HOST || 'smtp.gmail.com');
        setSettingsSmtpPort(data.SMTP_PORT || '587');
        setSettingsSmtpUser(data.SMTP_USER || '');
        setSettingsSmtpPass(data.SMTP_PASS || '');
        setSettingsGeminiKey(data.GEMINI_API_KEY || '');
      } else {
        throw new Error('Failed to retrieve environment variables from server.');
      }
    } catch (err: any) {
      setSettingsMessage({ type: 'error', text: err.message || 'Error loading environment variables.' });
    } finally {
      setIsLoadingSettings(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsMessage(null);
    try {
      const res = await fetch(getApiUrl('/api/settings'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          SUPABASE_URL: settingsUrl,
          SUPABASE_ANON_KEY: settingsAnonKey,
          SUPABASE_SERVICE_ROLE_KEY: settingsServiceKey,
          SMTP_HOST: settingsSmtpHost,
          SMTP_PORT: settingsSmtpPort,
          SMTP_USER: settingsSmtpUser,
          SMTP_PASS: settingsSmtpPass,
          GEMINI_API_KEY: settingsGeminiKey,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSettingsMessage({ type: 'success', text: data.message || 'Environment variables updated and applied successfully.' });
      } else {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update environment variables on server.');
      }
    } catch (err: any) {
      setSettingsMessage({ type: 'error', text: err.message || 'Error updating settings.' });
    } finally {
      setIsSavingSettings(false);
    }
  };

  useEffect(() => {
    if (currentStep === 3) {
      fetchSettings();
    }
  }, [currentStep]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage('Supabase is not configured yet. Set up environment variables in Settings.');
      return;
    }

    setSyncStatus('syncing');
    setErrorMessage('');

    try {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: emailInput,
          password: passwordInput,
        });
        if (error) throw error;
        setUser(data.user);
        setSyncStatus('success');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailInput,
          password: passwordInput,
        });
        if (error) throw error;
        setUser(data.user);
        if (data.user) {
          loadCloudConfig(data.user.id);
          loadCloudBookings(data.user.email || '');
        }
        setSyncStatus('success');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error.');
      setSyncStatus('error');
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setBookingHistory([]);
    setSyncStatus('idle');
  };

  // Cloud & Local State Synchronization
  const loadLocalConfigs = () => {
    const saved = localStorage.getItem('nara_config');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setNaraName(data.nara_name || 'Nara');
        setCompanionType(data.companion_type || 'Creative Partner');
        setPlanTier(data.plan_tier || 'Nara Professional');
        setAvatarLevel(data.avatar_level || 3);
        setSelectedGoals(data.goals || []);
        setPersonality(data.personality || 'Empathetic & Warm');
        setConversationStyle(data.conversation_style || 'Socratic');
        setConnectedServices(data.connected_services || []);
      } catch (e) {}
    }
    const savedBookings = localStorage.getItem('nara_bookings');
    if (savedBookings) {
      try {
        setBookingHistory(JSON.parse(savedBookings));
      } catch (e) {}
    }
  };

  const saveLocalConfigs = () => {
    const config: NaraConfig = {
      nara_name: naraName,
      companion_type: companionType,
      plan_tier: planTier,
      avatar_level: avatarLevel,
      goals: selectedGoals,
      personality,
      conversation_style: conversationStyle,
      connected_services: connectedServices,
    };
    localStorage.setItem('nara_config', JSON.stringify(config));
  };

  const loadCloudConfig = async (userId: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('user_configurations')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setNaraName(data.nara_name);
        setCompanionType(data.companion_type);
        setPlanTier(data.plan_tier);
        setAvatarLevel(data.avatar_level);
        setSelectedGoals(data.goals || []);
        setPersonality(data.personality);
        setConversationStyle(data.conversation_style);
        setConnectedServices(data.connected_services || []);
      }
    } catch (e) {}
  };

  const loadCloudBookings = async (email: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('email', email)
        .order('booking_date', { ascending: false });

      if (error) throw error;
      if (data) {
        setBookingHistory(data);
      }
    } catch (e) {}
  };

  const handleCloudSync = async () => {
    if (!user) {
      setErrorMessage('Please log in or sign up to sync with your Cloud Profile.');
      return;
    }
    if (!supabase) return;

    setSyncStatus('syncing');
    setErrorMessage('');

    const configPayload = {
      user_id: user.id,
      nara_name: naraName,
      companion_type: companionType,
      plan_tier: planTier,
      avatar_level: avatarLevel,
      goals: selectedGoals,
      personality,
      conversation_style: conversationStyle,
      connected_services: connectedServices,
      updated_at: new Date().toISOString(),
    };

    try {
      // Upsert current configuration
      const { error } = await supabase
        .from('user_configurations')
        .upsert(configPayload, { onConflict: 'user_id' });

      if (error) throw error;
      setSyncStatus('success');
    } catch (err: any) {
      setErrorMessage(err.message || 'Error syncing configuration to cloud database.');
      setSyncStatus('error');
    }
  };

  // Helper toggle handlers
  const toggleGoal = (goal: string) => {
    const updated = selectedGoals.includes(goal)
      ? selectedGoals.filter((g) => g !== goal)
      : [...selectedGoals, goal];
    setSelectedGoals(updated);
  };

  const toggleService = (service: string) => {
    const updated = connectedServices.includes(service)
      ? connectedServices.filter((s) => s !== service)
      : [...connectedServices, service];
    setConnectedServices(updated);
  };

  useEffect(() => {
    saveLocalConfigs();
  }, [naraName, companionType, planTier, avatarLevel, selectedGoals, personality, conversationStyle, connectedServices]);

  // secure file upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setErrorMessage('');

    const file = files[0];
    const sizeStr = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

    try {
      if (isSupabaseConfigured && supabase && user) {
        // Upload to avatars bucket
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        setUploadedFiles(prev => [...prev, { name: file.name, size: sizeStr, url: publicUrl }]);
      } else {
        // Mock client storage backup when offline
        const mockUrl = URL.createObjectURL(file);
        setUploadedFiles(prev => [...prev, { name: file.name, size: sizeStr, url: mockUrl }]);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to upload secure asset.');
    } finally {
      setIsUploading(false);
    }
  };

  // Scheduling & Booking Submission
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingDate) {
      setBookingStatus('error');
      setErrorMessage('Please fill in all required scheduling fields.');
      return;
    }

    setBookingStatus('loading');
    setErrorMessage('');

    const newBooking = {
      name: bookingName,
      email: bookingEmail,
      booking_date: bookingDate,
      booking_time: bookingTime,
      session_type: `${bookingMeetingPlatform} Onboarding Consultation`,
      nara_name: naraName,
    };

    try {
      // Call local backend endpoint to trigger email dispatch + write bookings.json
      const response = await fetch(getApiUrl('/api/book'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      });

      if (!response.ok) {
        throw new Error('Server returned error response for booking registration.');
      }

      const result = await response.json();

      // Sync into Supabase Bookings Table if user is logged in & Supabase is live
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from('bookings')
          .insert({
            ...newBooking,
            user_id: user?.id || null,
          });
        if (error) console.error('Database Sync Warning:', error.message);
      }

      // Add to local history list
      const updatedHistory = [result.booking, ...bookingHistory];
      setBookingHistory(updatedHistory);
      localStorage.setItem('nara_bookings', JSON.stringify(updatedHistory));

      // Save for elegant confirmation display
      setSubmittedDetails({
        name: bookingName,
        email: bookingEmail,
        phone: bookingPhone,
        country: bookingCountry,
        language: bookingLanguage,
        date: bookingDate,
        time: bookingTime,
        timeZone: bookingTimeZone,
        meetingPlatform: bookingMeetingPlatform,
        naraName: naraName,
        companionType: companionType,
        goals: selectedGoals,
        personality: personality,
        conversationStyle: conversationStyle,
        plan: planTier,
      });

      setBookingOnboardingStep(5);
      setBookingStatus('success');
      
      // Reset form primitive inputs (but we can keep them in submittedDetails for display)
      setBookingName('');
      setBookingEmail('');
      setBookingPhone('');
      setBookingDate('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to register your booking briefing.');
      setBookingStatus('error');
    }
  };

  // AI-powered Blueprint Generator (Gemini)
  const generateGeminiBlueprint = async () => {
    setIsGeneratingBlueprint(true);
    setAiBlueprint('');
    setErrorMessage('');

    const configurationPayload = {
      nara_name: naraName,
      companion_type: companionType,
      plan_tier: planTier,
      avatar_level: avatarLevel,
      goals: selectedGoals,
      personality,
      conversation_style: conversationStyle,
      connected_services: connectedServices,
    };

    try {
      const response = await fetch(getApiUrl('/api/gemini/generate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configuration: configurationPayload }),
      });

      if (!response.ok) {
        throw new Error('Gemini API call failed.');
      }

      const data = await response.json();
      setAiBlueprint(data.text);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to generate companion blueprint.');
    } finally {
      setIsGeneratingBlueprint(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1C1C1C] flex flex-col font-sans selection:bg-[#5A5A40]/20 selection:text-[#1C1C1C]" id="studio-root-container">
      {/* Main Brand Header */}
      <header className="bg-[#FAF9F5] border-b border-[#FAF9F5] py-5 px-4 md:px-8 select-none" id="nara-brand-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMainTab('philosophy')}>
            <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#1C1C1C]" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 36C12 20 18 12 24 12C30 12 28 36 34 36C40 36 42 20 42 20" />
            </svg>
            <span className="font-sans text-xl font-medium tracking-[0.25em] text-[#1C1C1C]">NARA</span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[#605F5A]">
            {(['philosophy', 'solutions', 'trust', 'integrations', 'about', 'simulator'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMainTab(tab)}
                className={`font-sans tracking-wide transition-all relative py-1 hover:text-[#1C1C1C] ${
                  mainTab === tab ? 'text-[#1C1C1C] font-medium' : ''
                }`}
              >
                {tab === 'philosophy' ? 'Philosophy' :
                 tab === 'solutions' ? 'Solutions' :
                 tab === 'trust' ? 'Trust Model' :
                 tab === 'integrations' ? 'Integrations' :
                 tab === 'about' ? 'About' :
                 'Simulator'}
                {mainTab === tab && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1C1C1C]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Start Consultation Button */}
          <button
            onClick={() => {
              setMainTab('simulator');
              setActiveTab('booking');
            }}
            className="border border-[#1C1C1C] px-6 py-2.5 text-xs font-mono tracking-wider text-[#1C1C1C] font-semibold hover:bg-[#1C1C1C] hover:text-white transition-all duration-300 active:scale-95"
          >
            START CONSULTATION
          </button>
        </div>
      </header>

      {/* Main View Area with AnimatePresence */}
      <main className="flex-1 w-full bg-[#FAF9F5]">
        <AnimatePresence mode="wait">
          {mainTab === 'philosophy' && (
            <PhilosophyView setMainTab={setMainTab} />
          )}

          {mainTab === 'solutions' && (
            <SolutionsView setMainTab={setMainTab} setActiveTab={setActiveTab} setCompanionType={setCompanionType} />
          )}

          {mainTab === 'trust' && (
            <TrustView setMainTab={setMainTab} setActiveTab={setActiveTab} secretKey={secretKey} />
          )}

          {mainTab === 'integrations' && (
            <IntegrationsView setMainTab={setMainTab} setActiveTab={setActiveTab} connectedServices={connectedServices} services={SERVICES} />
          )}

          {mainTab === 'about' && (
            <AboutView setMainTab={setMainTab} />
          )}

          {mainTab === 'simulator' && (
            <motion.div
              key="simulator-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16"
              id="simulator-section"
            >
              {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#E3DFD5] pb-8 mb-8" id="studio-header">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-xs px-2.5 py-1 bg-[#5A5A40]/10 text-[#5A5A40] rounded-full uppercase tracking-widest font-semibold">
              Vite + Express Production Stack
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-[#1C1C1C]" id="studio-title">
            Nara <span className="text-[#5A5A40] font-light">Configuration Studio</span>
          </h1>
          <p className="text-[#605F5A] mt-2 font-sans max-w-2xl text-sm leading-relaxed">
            Design, evolutionize, and synchronize the core cognitive architecture of your autonomous AI companion. Securely persistent in Cloud profiles.
          </p>
        </div>

        {/* Supabase Profile State Indicator */}
        <div className="mt-4 md:mt-0 flex flex-col items-end gap-2" id="sync-control-panel">
          {user ? (
            <div className="bg-[#EAE8E0] border border-[#DCD9CE] p-3 rounded-lg flex items-center gap-3 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-[#5A5A40] animate-pulse"></div>
              <div className="text-right">
                <p className="font-mono font-medium text-[#1C1C1C]">Cloud Profile Active</p>
                <p className="text-[#75736D] text-[10px]">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 font-mono uppercase tracking-wider text-[10px] text-[#A64B4B] hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="text-right">
              <span className="text-xs text-[#75736D] italic">Running in Local Standalone Guest Mode</span>
            </div>
          )}
        </div>
      </div>

      {/* Premium Luxury Progress Stepper */}
      <div className="border-b border-[#E3DFD5] pb-6 mb-8 select-none" id="simulator-stepper">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-3xl">
          <button 
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-semibold transition-all ${
              currentStep === 1 
                ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]' 
                : currentStep > 1 
                  ? 'bg-[#5A5A40] text-white border-[#5A5A40]' 
                  : 'bg-transparent text-[#75736D] border-[#E3DFD5] group-hover:border-[#75736D]'
            }`}>
              {currentStep > 1 ? '✓' : '01'}
            </div>
            <div>
              <p className={`text-xs font-mono font-bold uppercase tracking-wider ${currentStep === 1 ? 'text-[#1C1C1C]' : 'text-[#75736D]'}`}>Experience Tier</p>
              <p className="text-[10px] text-[#75736D] font-sans">Choose pricing and deployment</p>
            </div>
          </button>

          <div className="hidden md:block h-px bg-[#E3DFD5] flex-1 mx-4"></div>

          <button 
            onClick={() => { if (currentStep >= 2 || planTier) setCurrentStep(2) }}
            className={`flex items-center gap-3 text-left group ${currentStep < 2 && !planTier ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            disabled={currentStep < 2 && !planTier}
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-semibold transition-all ${
              currentStep === 2 
                ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]' 
                : currentStep > 2 
                  ? 'bg-[#5A5A40] text-white border-[#5A5A40]' 
                  : 'bg-transparent text-[#75736D] border-[#E3DFD5] group-hover:border-[#75736D]'
            }`}>
              {currentStep > 2 ? '✓' : '02'}
            </div>
            <div>
              <p className={`text-xs font-mono font-bold uppercase tracking-wider ${currentStep === 2 ? 'text-[#1C1C1C]' : 'text-[#75736D]'}`}>Customization</p>
              <p className="text-[10px] text-[#75736D] font-sans">Name, role & workspaces</p>
            </div>
          </button>

          <div className="hidden md:block h-px bg-[#E3DFD5] flex-1 mx-4"></div>

          <button 
            onClick={() => { if (currentStep >= 3) setCurrentStep(3) }}
            className={`flex items-center gap-3 text-left group ${currentStep < 3 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            disabled={currentStep < 3}
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-semibold transition-all ${
              currentStep === 3 
                ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]' 
                : 'bg-transparent text-[#75736D] border-[#E3DFD5] group-hover:border-[#75736D]'
            }`}>
              03
            </div>
            <div>
              <p className={`text-xs font-mono font-bold uppercase tracking-wider ${currentStep === 3 ? 'text-[#1C1C1C]' : 'text-[#75736D]'}`}>Consultation Booking</p>
              <p className="text-[10px] text-[#75736D] font-sans">Schedule briefing & onboarding</p>
            </div>
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="bg-[#FAF0F0] border border-[#EACDCD] p-4 rounded-lg flex items-start gap-3 mb-8" id="global-error-banner">
          <Info className="text-[#A64B4B] shrink-0 mt-0.5" size={16} />
          <div className="text-xs text-[#8A3B3B] leading-relaxed">
            {errorMessage}
          </div>
        </div>
      )}

      {/* Primary Panels Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="primary-grid">
        
        {/* Main Interface Content (Left/Center Column) */}
        <div className="lg:col-span-2 space-y-8" id="interface-main-panel">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: EXPERIENCE TIER SELECTION */}
            {currentStep === 1 && (
              <motion.div
                key="step-plans"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-[#E3DFD5] rounded-xl p-6 md:p-8 space-y-6"
                id="panel-plans-selection"
              >
                <div className="border-b border-[#FAF9F5] pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-serif font-medium text-[#1C1C1C]">Experience Tier Selection</h2>
                    <p className="text-xs text-[#75736D] mt-1 font-sans">Choose the experience tier that aligns with your scale.</p>
                  </div>
                  <Sparkles className="text-[#C5A880]" size={20} />
                </div>


                {/* Plan Tier Selection */}
                <div className="space-y-6 pt-6 border-t border-[#FAF9F5]">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-bold">Choose Your Nara Experience</label>
                      <p className="text-xs text-[#75736D]">
                        Each experience includes a one-time personalization setup followed by a monthly membership.
                      </p>
                    </div>
                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap gap-1 bg-[#FAF9F5] p-1 border border-[#E3DFD5] rounded-lg">
                      {(['ALL', 'INDIVIDUAL', 'FAMILY', 'ORGANIZATIONAL'] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setPlanCategory(cat)}
                          className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-all rounded cursor-pointer ${
                            planCategory === cat
                              ? 'bg-[#1C1C1C] text-white font-bold shadow-xs'
                              : 'text-[#605F5A] hover:bg-[#EAE7E1]/40'
                          }`}
                        >
                          {cat === 'ALL' ? 'All' : cat === 'INDIVIDUAL' ? 'Individual' : cat === 'FAMILY' ? 'Family' : 'Organization'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {PLANS.filter((plan) => {
                      if (planCategory === 'ALL') return true;
                      if (planCategory === 'INDIVIDUAL' && plan.category === 'PERSONAL INTELLIGENCE') return true;
                      if (planCategory === 'FAMILY' && plan.category === 'FAMILY INTELLIGENCE') return true;
                      if (planCategory === 'ORGANIZATIONAL' && plan.category === 'ORGANIZATION INTELLIGENCE') return true;
                      return false;
                    }).map((plan) => {
                      const isSelected = planTier === plan.name;
                      return (
                        <div
                          key={plan.name}
                          onClick={() => setPlanTier(plan.name)}
                          className={`flex flex-col justify-between rounded-xl border text-left transition-all cursor-pointer bg-white relative overflow-hidden group h-full shadow-xs ${
                            isSelected
                              ? 'border-[#5A5A40] ring-2 ring-[#5A5A40]/15'
                              : 'border-[#E3DFD5] hover:border-[#5A5A40]/65 hover:shadow-md'
                          }`}
                        >
                          {/* Card Content */}
                          <div className="p-6 space-y-6 flex-grow">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-[#75736D] uppercase tracking-widest block">
                                  {plan.category}
                                </span>
                                <h3 className="text-xl font-serif text-[#1C1C1C] font-semibold">{plan.name}</h3>
                              </div>
                              {plan.badge && (
                                <span className="text-[9px] font-mono uppercase bg-[#C5A880] text-white px-2 py-0.5 rounded-full font-bold shadow-2xs">
                                  {plan.badge}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-[#605F5A] leading-relaxed font-sans min-h-[32px]">
                              {plan.desc}
                            </p>

                            {/* Dual Pricing block */}
                            <div className="space-y-3 p-4 bg-[#FAF9F5] border border-[#E3DFD5]/60 rounded-xl">
                              <div className="flex justify-between items-center pb-2 border-b border-[#E3DFD5]/30">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] font-mono text-[#75736D] block uppercase font-semibold">Intelligence Creation Fee</span>
                                  <span className="text-[8px] text-[#75736D] font-mono block uppercase">(One-Time)</span>
                                </div>
                                <span className="text-sm font-mono font-bold text-[#1C1C1C]">{plan.setupFee}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] font-mono text-[#75736D] block uppercase font-semibold">Monthly Intelligence Subscription</span>
                                  <span className="text-[8px] text-[#75736D] font-mono block uppercase">(Continuous Update)</span>
                                </div>
                                <span className="text-sm font-mono font-bold text-[#5A5A40]">
                                  {plan.price === 'Starting at $499' ? 'Starting at $499/month' : `${plan.price}/month`}
                                </span>
                              </div>
                            </div>

                            {/* Deployment Time block */}
                            <div className="flex items-center justify-between py-2.5 px-3 bg-[#FAF9F5]/40 border border-[#E3DFD5]/40 rounded-lg text-[10px] font-mono text-[#75736D] uppercase">
                              <span>Deployment Time</span>
                              <span className="font-semibold text-[#1C1C1C]">{plan.deploymentTime}</span>
                            </div>

                            {/* What's included checklist */}
                            <div className="space-y-2 border-t border-[#FAF9F5] pt-4">
                              <span className="text-[9px] font-mono text-[#1C1C1C] block uppercase tracking-widest font-bold">Included</span>
                              <ul className="space-y-1.5">
                                {plan.included.map((inc) => (
                                  <li key={inc} className="flex items-start gap-2">
                                    <span className="text-[#5A5A40] text-xs font-mono select-none mt-0.5">•</span>
                                    <span className="text-xs text-[#605F5A] leading-normal font-sans">{inc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Selection Button State Footer */}
                          <div
                            className={`px-6 py-4 border-t flex items-center justify-between text-[11px] font-mono uppercase tracking-wider transition-colors ${
                              isSelected
                                ? 'bg-[#5A5A40]/5 border-[#5A5A40]/20 text-[#5A5A40] font-bold'
                                : 'bg-[#FAF9F5] border-[#E3DFD5]/40 text-[#75736D] group-hover:bg-[#EAE7E1]/20'
                            }`}
                          >
                            <span>Begin Intelligence Creation</span>
                            {isSelected ? (
                              <CheckCircle2 size={16} className="text-[#5A5A40]" />
                            ) : (
                              <span className="text-[14px] text-[#75736D] group-hover:text-[#1C1C1C] group-hover:translate-x-1 transition-transform">&rarr;</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Comparison Table Section */}
                  <div className="mt-12 space-y-6">
                    <div className="border-b border-[#E3DFD5] pb-4">
                      <h3 className="text-xl font-serif text-[#1C1C1C] font-semibold">Intelligence Capabilities Comparison</h3>
                      <p className="text-xs text-[#75736D] font-sans mt-1">A detailed matrix of the architectural and service dimensions for each experience tier.</p>
                    </div>
                    
                    <div className="overflow-x-auto border border-[#E3DFD5] rounded-xl bg-white shadow-xs">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="bg-[#FAF9F5] border-b border-[#E3DFD5] text-[10px] font-mono text-[#605F5A] uppercase tracking-wider">
                            <th className="p-4 font-semibold">Features / Dimensions</th>
                            <th className="p-4 font-semibold text-[#1C1C1C]">Personal Essential</th>
                            <th className="p-4 font-semibold text-[#1C1C1C] bg-[#5A5A40]/5">Personal Professional</th>
                            <th className="p-4 font-semibold text-[#1C1C1C]">Personal Signature</th>
                            <th className="p-4 font-semibold text-[#1C1C1C]">Family Home</th>
                            <th className="p-4 font-semibold text-[#1C1C1C]">Family Legacy</th>
                            <th className="p-4 font-semibold text-[#1C1C1C]">Organization Intelligence</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs text-[#605F5A] divide-y divide-[#FAF9F5] font-sans">
                          <tr>
                            <td className="p-4 font-mono text-[10px] uppercase font-semibold text-[#1C1C1C] bg-[#FAF9F5]/30">Memory Capacity</td>
                            <td className="p-4">Basic (1 Year)</td>
                            <td className="p-4 bg-[#5A5A40]/5 font-semibold text-[#1C1C1C]">Advanced (5 Years)</td>
                            <td className="p-4">Unlimited (Lifelong)</td>
                            <td className="p-4">Shared (5 Years)</td>
                            <td className="p-4">Unlimited Archive</td>
                            <td className="p-4">Unlimited Workspace</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono text-[10px] uppercase font-semibold text-[#1C1C1C] bg-[#FAF9F5]/30">AI Personalization</td>
                            <td className="p-4">Standard</td>
                            <td className="p-4 bg-[#5A5A40]/5 font-semibold text-[#1C1C1C]">Deep Adaptive</td>
                            <td className="p-4">Fully Bespoke</td>
                            <td className="p-4">Standard (Household)</td>
                            <td className="p-4">Custom Per Member</td>
                            <td className="p-4">Custom Federated</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono text-[10px] uppercase font-semibold text-[#1C1C1C] bg-[#FAF9F5]/30">Multi-user Support</td>
                            <td className="p-4">Single User</td>
                            <td className="p-4 bg-[#5A5A40]/5">Single User</td>
                            <td className="p-4">Single (+Delegates)</td>
                            <td className="p-4">Up to 5 Members</td>
                            <td className="p-4">Unlimited Members</td>
                            <td className="p-4">Unlimited Members</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono text-[10px] uppercase font-semibold text-[#1C1C1C] bg-[#FAF9F5]/30">Secure Cloud Storage</td>
                            <td className="p-4">✓ Standard Cloud</td>
                            <td className="p-4 bg-[#5A5A40]/5 font-semibold text-[#1C1C1C]">✓ Priority Sync</td>
                            <td className="p-4">✓ Encrypted Vault</td>
                            <td className="p-4">✓ Family Cloud</td>
                            <td className="p-4">✓ Archival Vault</td>
                            <td className="p-4">✓ Private Infrastructure</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono text-[10px] uppercase font-semibold text-[#1C1C1C] bg-[#FAF9F5]/30">Integrations</td>
                            <td className="p-4">Up to 10 Services</td>
                            <td className="p-4 bg-[#5A5A40]/5 font-semibold text-[#1C1C1C]">Unlimited</td>
                            <td className="p-4">Premium custom APIs</td>
                            <td className="p-4">Up to 15 Services</td>
                            <td className="p-4">Unlimited family accounts</td>
                            <td className="p-4">Custom Workspace APIs</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono text-[10px] uppercase font-semibold text-[#1C1C1C] bg-[#FAF9F5]/30">Priority Support</td>
                            <td className="p-4">Standard</td>
                            <td className="p-4 bg-[#5A5A40]/5 font-semibold text-[#1C1C1C]">Priority Email</td>
                            <td className="p-4">Concierge 24/7</td>
                            <td className="p-4">Priority Email</td>
                            <td className="p-4">Premium Concierge</td>
                            <td className="p-4">Dedicated 24/7 Hotline</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono text-[10px] uppercase font-semibold text-[#1C1C1C] bg-[#FAF9F5]/30">Security Level</td>
                            <td className="p-4">AES-256 Encrypted</td>
                            <td className="p-4 bg-[#5A5A40]/5">End-to-End Encrypted</td>
                            <td className="p-4">Zero-Knowledge</td>
                            <td className="p-4">End-to-End Encrypted</td>
                            <td className="p-4">Zero-Knowledge</td>
                            <td className="p-4">Private Cloud / SOC2</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono text-[10px] uppercase font-semibold text-[#1C1C1C] bg-[#FAF9F5]/30">Deployment Time</td>
                            <td className="p-4">3–5 Business Days</td>
                            <td className="p-4 bg-[#5A5A40]/5">5–7 Business Days</td>
                            <td className="p-4">7–10 Business Days</td>
                            <td className="p-4">7–10 Business Days</td>
                            <td className="p-4">10–14 Business Days</td>
                            <td className="p-4">Custom Enterprise</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono text-[10px] uppercase font-semibold text-[#1C1C1C] bg-[#FAF9F5]/30">Monthly Improvements</td>
                            <td className="p-4">Quarterly Updates</td>
                            <td className="p-4 bg-[#5A5A40]/5 font-semibold text-[#1C1C1C]">Monthly Upgrades</td>
                            <td className="p-4">Continuous Learning</td>
                            <td className="p-4">Monthly Upgrades</td>
                            <td className="p-4">Continuous Learning</td>
                            <td className="p-4">Continuous Custom Updates</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono text-[10px] uppercase font-semibold text-[#1C1C1C] bg-[#FAF9F5]/30">Dedicated Success Manager</td>
                            <td className="p-4 text-gray-400">&mdash;</td>
                            <td className="p-4 bg-[#5A5A40]/5 text-gray-400">&mdash;</td>
                            <td className="p-4">On-demand Advisor</td>
                            <td className="p-4 text-gray-400">&mdash;</td>
                            <td className="p-4">On-demand Advisor</td>
                            <td className="p-4 font-bold text-[#5A5A40]">Yes (Dedicated)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Every Nara Includes section */}
                  <div className="mt-10 border border-[#E3DFD5] bg-[#FAF9F5] rounded-xl p-6 md:p-8 space-y-6">
                    <div className="text-center space-y-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#5A5A40] uppercase font-bold block">Inclusive Core Architecture</span>
                      <h4 className="text-lg font-serif text-[#1C1C1C]">Every Nara Experience Includes</h4>
                      <div className="w-12 h-[1px] bg-[#5A5A40]/30 mx-auto"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                      {[
                        'Personalized AI Identity',
                        'Custom Name',
                        'Preferred Voice',
                        'Long-Term Memory',
                        'Continuous Learning',
                        'Secure Cloud Infrastructure',
                        'Encrypted Conversations',
                        'Cross-Device Sync',
                        'App Integrations',
                        'Regular Intelligence Updates'
                      ].map((item) => (
                        <div key={item} className="bg-white border border-[#E3DFD5]/70 p-3 rounded-lg flex items-center gap-2.5 shadow-2xs">
                          <CheckCircle2 size={14} className="text-[#5A5A40] shrink-0" />
                          <span className="text-xs text-[#1C1C1C] font-sans leading-tight font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* How Nara Pricing Works Section */}
                  <div className="mt-10 border border-[#C5A880]/30 bg-[#FAF9F5] rounded-xl p-6 md:p-8 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase font-bold block">Pricing Philosophy</span>
                      <h4 className="text-xl font-serif text-[#1C1C1C]">How Nara Pricing Works</h4>
                    </div>
                    <div className="text-xs text-[#605F5A] leading-relaxed font-sans space-y-3 max-w-3xl">
                      <p>
                        The Intelligence Creation Fee is a one-time investment that covers discovery, AI architecture, personality design, onboarding, deployment, and initial training of your intelligence.
                      </p>
                      <p>
                        The Monthly Intelligence Subscription keeps your intelligence continuously learning, securely synchronized, regularly updated, and fully supported throughout its lifetime.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Navigation for Step 1 */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-[#E3DFD5] gap-4 mt-10">
                    <p className="text-xs text-[#75736D] font-sans">
                      {planTier ? (
                        <span>Selected Tier: <strong className="text-[#1C1C1C]">{planTier}</strong></span>
                      ) : (
                        <span>Please select an experience tier card above to continue.</span>
                      )}
                    </p>
                    <button
                      type="button"
                      disabled={!planTier}
                      onClick={() => {
                        if (planTier) {
                          setCurrentStep(2);
                          document.getElementById('simulator-stepper')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`px-8 py-3 rounded-lg text-xs font-semibold font-mono uppercase flex items-center justify-center gap-2 transition-all ${
                        planTier
                          ? 'bg-[#1C1C1C] text-white hover:bg-[#1C1C1C]/90 cursor-pointer shadow-xs'
                          : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      <span>Customize Companion</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CUSTOMIZE YOUR AI COMPANION */}
            {currentStep === 2 && (
              <motion.div
                key="step-customization"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="bg-white border border-[#E3DFD5] rounded-xl p-6 md:p-8 space-y-6">
                  <div className="border-b border-[#FAF9F5] pb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-serif font-medium text-[#1C1C1C]">Intelligence Customization</h2>
                      <p className="text-xs text-[#75736D] mt-1 font-sans">Name, role, personality style and interaction preferences.</p>
                    </div>
                    <Sparkles className="text-[#C5A880]" size={20} />
                  </div>

                  {/* Selected Plan Summary card */}
                  <div className="p-4 bg-[#FAF9F5] border border-[#E3DFD5] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono tracking-widest text-[#75736D] uppercase block font-semibold">Selected Experience Tier</span>
                      <h4 className="text-sm font-serif font-semibold text-[#1C1C1C]">{planTier || 'None Selected'}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentStep(1);
                        document.getElementById('simulator-stepper')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-[#FAF9F5] text-[10px] font-mono text-[#5A5A40] border border-[#E3DFD5] rounded-lg transition-all font-semibold uppercase cursor-pointer"
                    >
                      Change Plan
                    </button>
                  </div>

                  {/* Name and Type Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-bold">Companion Custom Name</label>
                      <input
                        type="text"
                        id="input-nara-name"
                        value={naraName}
                        onChange={(e) => setNaraName(e.target.value)}
                        className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#5A5A40] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-bold">Cognitive Role</label>
                      <select
                        id="select-companion-type"
                        value={companionType}
                        onChange={(e) => setCompanionType(e.target.value)}
                        className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#5A5A40] transition-colors"
                      >
                        {COMPANION_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Goals Selector */}
                  <div className="space-y-3 pt-4 border-t border-[#FAF9F5]">
                    <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-bold">Target Optimization Goals</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ALL_GOALS.map((goal) => {
                        const isSelected = selectedGoals.includes(goal);
                        return (
                          <button
                            key={goal}
                            type="button"
                            id={`goal-btn-${goal.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => toggleGoal(goal)}
                            className={`flex items-center justify-between p-4 rounded-lg border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#5A5A40]/10 border-[#5A5A40] text-[#1C1C1C]'
                                : 'bg-[#FAF9F5] border-[#E3DFD5] text-[#605F5A] hover:border-[#5A5A40]/50'
                            }`}
                          >
                            <span className="text-sm font-sans">{goal}</span>
                            {isSelected && <Check size={16} className="text-[#5A5A40]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Personality & Conversation Style */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#FAF9F5]">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-bold">Personality Style</label>
                      <div className="grid grid-cols-1 gap-2">
                        {PERSONALITY_STYLES.map((style) => (
                          <button
                            key={style}
                            type="button"
                            onClick={() => setPersonality(style)}
                            className={`px-4 py-2.5 text-xs text-left rounded-lg border transition-all cursor-pointer ${
                              personality === style
                                ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                                : 'bg-[#FAF9F5] border-[#E3DFD5] text-[#605F5A] hover:bg-[#FAF9F5]/80'
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-bold">Conversation Style</label>
                      <div className="grid grid-cols-1 gap-2">
                        {CONVERSATION_STYLES.map((style) => (
                          <button
                            key={style}
                            type="button"
                            onClick={() => setConversationStyle(style)}
                            className={`px-4 py-2.5 text-xs text-left rounded-lg border transition-all cursor-pointer ${
                              conversationStyle === style
                                ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                                : 'bg-[#FAF9F5] border-[#E3DFD5] text-[#605F5A] hover:bg-[#FAF9F5]/80'
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ADVANCED PARAMETERS ACCORDIONS (PRESERVING DEEP CAPABILITIES) */}
                <div className="space-y-4">
                  <div className="border-b border-[#FAF9F5] pb-2">
                    <h3 className="text-xs font-mono text-[#605F5A] uppercase tracking-wider font-bold">Advanced Settings (Optional)</h3>
                  </div>

                  {/* Accordion 1: Neural Evolution Stages */}
                  <div className="bg-white border border-[#E3DFD5] rounded-xl overflow-hidden shadow-2xs">
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer select-none bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/80 transition-colors">
                        <div className="flex items-center gap-3">
                          <Cpu className="text-[#5A5A40]" size={18} />
                          <div className="text-left">
                            <h4 className="text-sm font-serif font-semibold text-[#1C1C1C]">Neural Evolution Stages</h4>
                            <p className="text-[10px] text-[#75736D] font-sans">Set active cognitive capability indexing limit.</p>
                          </div>
                        </div>
                        <span className="text-[#75736D] transition-transform group-open:rotate-180 font-mono text-xs font-bold">&darr;</span>
                      </summary>
                      <div className="p-6 border-t border-[#E3DFD5]/50 bg-white space-y-4">
                        <div className="space-y-4">
                          {EVOLUTION_STAGES.map((stage) => {
                            const isActive = avatarLevel === stage.level;
                            return (
                              <div
                                key={stage.level}
                                onClick={() => setAvatarLevel(stage.level)}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                                  isActive
                                    ? 'bg-[#5A5A40]/10 border-[#5A5A40]'
                                    : 'bg-[#FAF9F5] border-[#E3DFD5] hover:border-[#5A5A40]/40'
                                }`}
                              >
                                <div className="space-y-1 text-left">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[10px] font-semibold text-[#5A5A40]">STAGE {stage.level}</span>
                                    <span className="font-serif text-xs font-medium text-[#1C1C1C]">{stage.name}</span>
                                  </div>
                                  <p className="text-[11px] text-[#605F5A] leading-relaxed max-w-xl">{stage.desc}</p>
                                </div>
                                <div className="flex items-center justify-end">
                                  <span className={`text-[9px] font-mono font-semibold px-2.5 py-1 rounded border uppercase tracking-wider ${stage.color}`}>
                                    {isActive ? 'Active Target' : 'Select Stage'}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* Accordion 2: Connected Workspaces */}
                  <div className="bg-white border border-[#E3DFD5] rounded-xl overflow-hidden shadow-2xs">
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer select-none bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/80 transition-colors">
                        <div className="flex items-center gap-3">
                          <Database className="text-[#5A5A40]" size={18} />
                          <div className="text-left">
                            <h4 className="text-sm font-serif font-semibold text-[#1C1C1C]">Connected Workspaces</h4>
                            <p className="text-[10px] text-[#75736D] font-sans">Bridge system API integrations into Nara's active memory pool.</p>
                          </div>
                        </div>
                        <span className="text-[#75736D] transition-transform group-open:rotate-180 font-mono text-xs font-bold">&darr;</span>
                      </summary>
                      <div className="p-6 border-t border-[#E3DFD5]/50 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {SERVICES.map((service) => {
                            const isConnected = connectedServices.includes(service.name);
                            return (
                              <div
                                key={service.name}
                                onClick={() => toggleService(service.name)}
                                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                                  isConnected
                                    ? 'bg-[#5A5A40]/5 border-[#5A5A40]'
                                    : 'bg-[#FAF9F5] border-[#E3DFD5] hover:border-[#5A5A40]/40'
                                }`}
                              >
                                <span className="text-xl pt-1">{service.icon}</span>
                                <div className="space-y-1 select-none flex-1 text-left">
                                  <div className="flex items-center justify-between">
                                    <span className="font-serif text-xs font-medium text-[#1C1C1C]">{service.name}</span>
                                    <span className={`text-[8px] font-mono tracking-wider font-semibold uppercase px-1.5 py-0.5 rounded ${
                                      isConnected ? 'bg-[#5A5A40] text-white' : 'bg-[#E3DFD5] text-[#605F5A]'
                                    }`}>
                                      {isConnected ? 'Active' : 'Offline'}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-[#605F5A] leading-normal">{service.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* Accordion 3: Secure Credential Vault */}
                  <div className="bg-white border border-[#E3DFD5] rounded-xl overflow-hidden shadow-2xs">
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer select-none bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/80 transition-colors">
                        <div className="flex items-center gap-3">
                          <Lock className="text-[#5A5A40]" size={18} />
                          <div className="text-left">
                            <h4 className="text-sm font-serif font-semibold text-[#1C1C1C]">Secure Credential Vault</h4>
                            <p className="text-[10px] text-[#75736D] font-sans">Backup avatars and secrets to secure cloud storage containers.</p>
                          </div>
                        </div>
                        <span className="text-[#75736D] transition-transform group-open:rotate-180 font-mono text-xs font-bold">&darr;</span>
                      </summary>
                      <div className="p-6 border-t border-[#E3DFD5]/50 bg-white space-y-6">
                        {/* Vault Locking Mechanism */}
                        <div className="bg-[#FAF9F5] border border-[#E3DFD5] p-5 rounded-xl space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-left">
                              {isVaultLocked ? (
                                <LockKeyhole className="text-[#A64B4B]" size={20} />
                              ) : (
                                <Unlock className="text-[#5A5A40]" size={20} />
                              )}
                              <div>
                                <h3 className="font-serif text-sm font-medium text-[#1C1C1C]">Credential Vault {isVaultLocked ? 'Locked' : 'Unlocked'}</h3>
                                <p className="text-[10px] text-[#75736D] font-mono">ENCRYPTION LEVEL: AES-256 SYNC</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setIsVaultLocked(!isVaultLocked)}
                              className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                                isVaultLocked
                                  ? 'bg-[#5A5A40] text-white hover:bg-[#5A5A40]/90'
                                  : 'bg-[#A64B4B] text-white hover:bg-[#A64B4B]/90'
                              }`}
                            >
                              {isVaultLocked ? 'Unlock Key' : 'Lock Vault'}
                            </button>
                          </div>

                          {!isVaultLocked && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="space-y-4 pt-4 border-t border-[#E3DFD5] text-xs text-left"
                            >
                              <div className="space-y-2">
                                <label className="font-mono uppercase tracking-wider text-[10px] text-[#605F5A] block">Secure System Key</label>
                                <input
                                  type="text"
                                  value={secretKey}
                                  onChange={(e) => setSecretKey(e.target.value)}
                                  className="w-full bg-white border border-[#E3DFD5] rounded-lg px-3 py-2 font-mono text-xs"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="font-mono uppercase tracking-wider text-[10px] text-[#605F5A] block">Vault Secure Sync Notes</label>
                                <textarea
                                  value={secureNotes}
                                  onChange={(e) => setSecureNotes(e.target.value)}
                                  rows={3}
                                  className="w-full bg-white border border-[#E3DFD5] rounded-lg px-3 py-2 font-sans text-xs"
                                />
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Secure File Sync Container */}
                        <div className="space-y-4 pt-4 border-t border-[#FAF9F5] text-left">
                          <h3 className="font-serif text-sm font-medium text-[#1C1C1C]">Autonomous Avatar & Backup Uploads</h3>
                          <div className="border-2 border-dashed border-[#E3DFD5] rounded-xl p-6 hover:border-[#5A5A40]/40 transition-colors bg-[#FAF9F5] text-center space-y-4">
                            <Upload className="mx-auto text-[#75736D]" size={24} />
                            <div>
                              <p className="text-xs text-[#1C1C1C] font-semibold">Drag or select backup data package</p>
                              <p className="text-[10px] text-[#75736D] mt-1">Accepts system .json, avatars, or credentials up to 10MB</p>
                            </div>
                            <label className="inline-block px-4 py-2 bg-white border border-[#E3DFD5] hover:border-[#5A5A40] transition-colors rounded-lg text-xs font-medium cursor-pointer text-[#1C1C1C]">
                              {isUploading ? 'Encrypting & Syncing...' : 'Select File'}
                              <input
                                type="file"
                                onChange={handleFileUpload}
                                className="hidden"
                                disabled={isUploading}
                              />
                            </label>
                          </div>

                          {uploadedFiles.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-mono text-[#605F5A] uppercase tracking-wider">Synced Storage Elements</p>
                              <div className="space-y-2">
                                {uploadedFiles.map((f, i) => (
                                  <div key={i} className="flex items-center justify-between p-3 bg-[#FAF9F5] rounded-lg border border-[#E3DFD5] text-xs">
                                    <span className="font-serif font-medium truncate max-w-xs">{f.name}</span>
                                    <div className="flex items-center gap-3">
                                      <span className="font-mono text-[10px] text-[#75736D]">{f.size}</span>
                                      <a
                                        href={f.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-mono text-[10px] text-[#5A5A40] hover:underline uppercase font-bold"
                                      >
                                        View File
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </details>
                  </div>
                </div>

                {/* Bottom Navigation for Step 2 */}
                <div className="flex items-center justify-between pt-6 border-t border-[#E3DFD5] gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      document.getElementById('simulator-stepper')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-white border border-[#E3DFD5] hover:bg-[#FAF9F5] text-[#605F5A] transition-all rounded-lg text-xs font-semibold font-mono uppercase cursor-pointer"
                  >
                    &larr; Experience Tiers
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(3);
                      document.getElementById('simulator-stepper')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 py-3 bg-[#1C1C1C] text-white hover:bg-[#1C1C1C]/90 transition-all rounded-lg text-xs font-semibold font-mono uppercase flex items-center gap-2 cursor-pointer"
                  >
                    <span>Schedule Consultation</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: ZOOM BRIEFING & CONSULTATION BOOKING */}
            {currentStep === 3 && (
              <motion.div
                key="step-booking"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="bg-white border border-[#E3DFD5] rounded-xl p-6 md:p-8 space-y-6" id="panel-booking">
                  {/* Premium Onboarding Header & Progress Tracker */}
                  <div className="border-b border-[#FAF9F5] pb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                      <div>
                        <span className="font-mono text-[9px] tracking-[0.25em] text-[#C5A880] uppercase font-bold block mb-1">Onboarding Process</span>
                        <h2 className="text-xl md:text-2xl font-serif font-medium text-[#1C1C1C]">
                          {bookingOnboardingStep === 1 && "About You"}
                          {bookingOnboardingStep === 2 && "Configure Intelligence Core"}
                          {bookingOnboardingStep === 3 && "Scheduling & Consultation"}
                          {bookingOnboardingStep === 4 && "Review System Specification"}
                          {bookingOnboardingStep === 5 && "Onboarding Confirmed"}
                        </h2>
                        <p className="text-xs text-[#75736D] mt-1 font-sans">
                          {bookingOnboardingStep === 1 && "Let's capture your contact details to assign a dedicated systems architect."}
                          {bookingOnboardingStep === 2 && "Refine the neural profile, behavior, and main objectives of your companion."}
                          {bookingOnboardingStep === 3 && "Select your preferred briefing timeline, timezone, and meeting medium."}
                          {bookingOnboardingStep === 4 && "Verify your custom parameters and initial subscription terms before deployment."}
                          {bookingOnboardingStep === 5 && "Your personalized neural container is queued for secure compilation."}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#FAF9F5] px-3 py-1.5 rounded-lg border border-[#E3DFD5] font-mono text-[10px] font-bold text-[#5A5A40]">
                        <Cpu className="animate-pulse" size={12} />
                        <span>STEP {bookingOnboardingStep} OF 5</span>
                      </div>
                    </div>

                    {/* Stepper Navigation Tracker */}
                    <div className="grid grid-cols-5 gap-1.5 md:gap-3 text-center">
                      {[1, 2, 3, 4, 5].map((stepNum) => {
                        const isActive = bookingOnboardingStep === stepNum;
                        const isCompleted = bookingOnboardingStep > stepNum;
                        return (
                          <div
                            key={stepNum}
                            onClick={() => {
                              // Allow jumping back to previously completed steps or any step except step 5 if not succeeded
                              if (stepNum < 5 && bookingOnboardingStep < 5) {
                                // Simple validations before jumping forward
                                if (stepNum === 2 && (!bookingName || !bookingEmail || !bookingPhone)) return;
                                if (stepNum === 3 && (!bookingName || !bookingEmail || !bookingPhone || !naraName)) return;
                                if (stepNum === 4 && (!bookingName || !bookingEmail || !bookingPhone || !naraName || !bookingDate)) return;
                                setBookingOnboardingStep(stepNum);
                              }
                            }}
                            className={`pb-2 border-b-2 transition-all cursor-pointer select-none text-left ${
                              isActive
                                ? 'border-[#5A5A40] text-[#1C1C1C]'
                                : isCompleted
                                ? 'border-[#C5A880] text-[#C5A880]'
                                : 'border-[#E3DFD5]/50 text-[#75736D]'
                            }`}
                          >
                            <span className="block font-mono text-[9px] font-bold">0{stepNum}</span>
                            <span className="hidden md:block text-[10px] font-sans truncate tracking-tight font-medium">
                              {stepNum === 1 && 'About You'}
                              {stepNum === 2 && 'Intelligence'}
                              {stepNum === 3 && 'Consultation'}
                              {stepNum === 4 && 'Review'}
                              {stepNum === 5 && 'Activation'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 1: ABOUT YOU */}
                  {bookingOnboardingStep === 1 && (
                    <div className="space-y-6 text-left">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Full Name *</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#75736D]">
                              <User size={14} />
                            </span>
                            <input
                              type="text"
                              required
                              placeholder="Henok Mekonnen"
                              value={bookingName}
                              onChange={(e) => setBookingName(e.target.value)}
                              className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Email Address *</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#75736D]">
                              <Mail size={14} />
                            </span>
                            <input
                              type="email"
                              required
                              placeholder="client@studio-nara.net"
                              value={bookingEmail}
                              onChange={(e) => setBookingEmail(e.target.value)}
                              className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Phone Number *</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#75736D]">
                              <Phone size={14} />
                            </span>
                            <input
                              type="tel"
                              required
                              placeholder="+1 (555) 019-2834"
                              value={bookingPhone}
                              onChange={(e) => setBookingPhone(e.target.value)}
                              className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Country / Location *</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#75736D]">
                              <Globe size={14} />
                            </span>
                            <input
                              type="text"
                              required
                              placeholder="e.g. United States"
                              value={bookingCountry}
                              onChange={(e) => setBookingCountry(e.target.value)}
                              className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Preferred Language *</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#75736D]">
                              <Languages size={14} />
                            </span>
                            <select
                              value={bookingLanguage}
                              onChange={(e) => setBookingLanguage(e.target.value)}
                              className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans appearance-none cursor-pointer"
                            >
                              <option value="English">English</option>
                              <option value="Spanish">Español (Spanish)</option>
                              <option value="French">Français (French)</option>
                              <option value="German">Deutsch (German)</option>
                              <option value="Japanese">日本語 (Japanese)</option>
                              <option value="Mandarin">中文 (Mandarin)</option>
                              <option value="Arabic">العربية (Arabic)</option>
                              <option value="Amharic">አማርኛ (Amharic)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t border-[#FAF9F5]">
                        <button
                          type="button"
                          disabled={!bookingName || !bookingEmail || !bookingPhone || !bookingCountry}
                          onClick={() => setBookingOnboardingStep(2)}
                          className="px-6 py-3 bg-[#1C1C1C] text-white hover:bg-[#1C1C1C]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all rounded-lg text-xs font-semibold font-mono uppercase flex items-center gap-2 cursor-pointer"
                        >
                          <span>Step 2: About Intelligence</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: ABOUT YOUR INTELLIGENCE */}
                  {bookingOnboardingStep === 2 && (
                    <div className="space-y-6 text-left">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Intelligence Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Nara"
                            value={naraName}
                            onChange={(e) => setNaraName(e.target.value)}
                            className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Primary Purpose *</label>
                          <select
                            value={companionType}
                            onChange={(e) => setCompanionType(e.target.value)}
                            className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans cursor-pointer"
                          >
                            <option value="Creative Partner">Creative Partner & Co-thinker</option>
                            <option value="Personal Coach">Personal Health & Wisdom Coach</option>
                            <option value="Executive Assistant">Executive Workspace Assistant</option>
                            <option value="Lifelong Archivist">Lifelong Memory Archivist</option>
                            <option value="Enterprise Consultant">Enterprise Integration Node</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Preferred Personality *</label>
                          <select
                            value={personality}
                            onChange={(e) => setPersonality(e.target.value)}
                            className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans cursor-pointer"
                          >
                            <option value="Empathetic & Warm">Empathetic & Warm</option>
                            <option value="Analytical & Objective">Analytical & Objective</option>
                            <option value="Playful & Creative">Playful & Creative</option>
                            <option value="Direct & Professional">Direct & Professional</option>
                            <option value="Philosophical & Deep">Philosophical & Deep</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Preferred Communication Style *</label>
                          <select
                            value={conversationStyle}
                            onChange={(e) => setConversationStyle(e.target.value)}
                            className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans cursor-pointer"
                          >
                            <option value="Socratic">Socratic & Inquisitive</option>
                            <option value="Direct & Concise">Direct & Concise</option>
                            <option value="Narrative & Detailed">Narrative & Detailed</option>
                            <option value="Collaborative Brainstorming">Collaborative Brainstorming</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Select Intelligence Goals (Choose 1 or more)</label>
                        <div className="flex flex-wrap gap-2">
                          {['Productivity', 'Knowledge Management', 'Creative Writing', 'Decision Support', 'Family Coordination', 'Eldercare Assistance', 'Business Strategy', 'Legacy Archiving'].map((goal) => {
                            const isGoalSelected = selectedGoals.includes(goal);
                            return (
                              <button
                                key={goal}
                                type="button"
                                onClick={() => {
                                  if (isGoalSelected) {
                                    setSelectedGoals(selectedGoals.filter(g => g !== goal));
                                  } else {
                                    setSelectedGoals([...selectedGoals, goal]);
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-all font-sans cursor-pointer ${
                                  isGoalSelected
                                    ? 'bg-[#5A5A40] text-white font-medium border border-[#5A5A40] shadow-2xs'
                                    : 'bg-[#FAF9F5] hover:bg-[#E3DFD5]/40 border border-[#E3DFD5] text-[#605F5A]'
                                }`}
                              >
                                {goal}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#FAF9F5] gap-4">
                        <button
                          type="button"
                          onClick={() => setBookingOnboardingStep(1)}
                          className="px-5 py-3 bg-white border border-[#E3DFD5] hover:bg-[#FAF9F5] text-[#605F5A] transition-all rounded-lg text-xs font-semibold font-mono uppercase cursor-pointer flex items-center gap-2"
                        >
                          <ArrowLeft size={14} />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          disabled={!naraName || selectedGoals.length === 0}
                          onClick={() => setBookingOnboardingStep(3)}
                          className="px-6 py-3 bg-[#1C1C1C] text-white hover:bg-[#1C1C1C]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all rounded-lg text-xs font-semibold font-mono uppercase flex items-center gap-2 cursor-pointer"
                        >
                          <span>Step 3: Consultation</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: CONSULTATION */}
                  {bookingOnboardingStep === 3 && (
                    <div className="space-y-6 text-left">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Preferred Date *</label>
                          <div className="relative">
                            <input
                              type="date"
                              required
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Preferred Time *</label>
                          <div className="relative">
                            <input
                              type="time"
                              required
                              value={bookingTime}
                              onChange={(e) => setBookingTime(e.target.value)}
                              className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Your Time Zone *</label>
                          <select
                            value={bookingTimeZone}
                            onChange={(e) => setBookingTimeZone(e.target.value)}
                            className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans cursor-pointer"
                          >
                            <option value="UTC-08:00 (Pacific Time - PT)">UTC-08:00 (Pacific Time - PT)</option>
                            <option value="UTC-07:00 (Mountain Time - MT)">UTC-07:00 (Mountain Time - MT)</option>
                            <option value="UTC-06:00 (Central Time - CT)">UTC-06:00 (Central Time - CT)</option>
                            <option value="UTC-05:00 (Eastern Time - ET)">UTC-05:00 (Eastern Time - ET)</option>
                            <option value="UTC+00:00 (Greenwich Mean Time - GMT)">UTC+00:00 (Greenwich Mean Time - GMT)</option>
                            <option value="UTC+01:00 (Central European Time - CET)">UTC+01:00 (Central European Time - CET)</option>
                            <option value="UTC+03:00 (East Africa Time - EAT)">UTC+03:00 (East Africa Time - EAT)</option>
                            <option value="UTC+09:00 (Japan Standard Time - JST)">UTC+09:00 (Japan Standard Time - JST)</option>
                            <option value="UTC+10:00 (Australian Eastern Time - AEST)">UTC+10:00 (Australian Eastern Time - AEST)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block font-semibold">Preferred Meeting Platform *</label>
                          <select
                            value={bookingMeetingPlatform}
                            onChange={(e) => setBookingMeetingPlatform(e.target.value)}
                            className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#5A5A40] transition-colors font-sans cursor-pointer"
                          >
                            <option value="Zoom">Zoom Video Briefing</option>
                            <option value="Google Meet">Google Meet</option>
                            <option value="Microsoft Teams">Microsoft Teams</option>
                            <option value="Secure Encrypted Audio">Secure Encrypted Audio Call</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#FAF9F5] gap-4">
                        <button
                          type="button"
                          onClick={() => setBookingOnboardingStep(2)}
                          className="px-5 py-3 bg-white border border-[#E3DFD5] hover:bg-[#FAF9F5] text-[#605F5A] transition-all rounded-lg text-xs font-semibold font-mono uppercase cursor-pointer flex items-center gap-2"
                        >
                          <ArrowLeft size={14} />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          disabled={!bookingDate || !bookingTime}
                          onClick={() => setBookingOnboardingStep(4)}
                          className="px-6 py-3 bg-[#1C1C1C] text-white hover:bg-[#1C1C1C]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all rounded-lg text-xs font-semibold font-mono uppercase flex items-center gap-2 cursor-pointer"
                        >
                          <span>Step 4: Review specifications</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: REVIEW */}
                  {bookingOnboardingStep === 4 && (
                    <div className="space-y-6 text-left">
                      {/* Premium Summary Grid */}
                      <div className="bg-[#FAF9F5] border border-[#E3DFD5] rounded-xl p-6 space-y-6">
                        <div className="border-b border-[#E3DFD5] pb-4 flex items-center justify-between">
                          <div>
                            <span className="font-mono text-[8px] tracking-widest text-[#C5A880] uppercase block font-bold">Selected Subscription Plan</span>
                            <h3 className="font-serif text-lg text-[#1C1C1C] font-semibold">{planTier}</h3>
                          </div>
                          <span className="font-mono text-xs px-2.5 py-1 bg-[#5A5A40]/10 text-[#5A5A40] rounded-md font-bold uppercase">
                            Pre-Deployment
                          </span>
                        </div>

                        {/* Interactive Blueprint Pricing Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
                          <div className="bg-white p-4 rounded-lg border border-[#E3DFD5] space-y-1">
                            <span className="text-[9px] font-mono text-[#75736D] uppercase block tracking-wider">Creation & Setup Fee</span>
                            <p className="text-xl font-serif text-[#1C1C1C] font-bold">
                              {PLANS.find(p => p.name === planTier)?.setupFee || "$599"}
                            </p>
                            <span className="text-[9px] font-mono text-[#75736D] uppercase block">Bespoke architecture setup</span>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-[#E3DFD5] space-y-1">
                            <span className="text-[9px] font-mono text-[#75736D] uppercase block tracking-wider">Monthly Subscription</span>
                            <p className="text-xl font-serif text-[#1C1C1C] font-bold text-[#5A5A40]">
                              {PLANS.find(p => p.name === planTier)?.price || "$49"}/mo
                            </p>
                            <span className="text-[9px] font-mono text-[#75736D] uppercase block">Ongoing compute & secure storage</span>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-[#E3DFD5] space-y-1">
                            <span className="text-[9px] font-mono text-[#75736D] uppercase block tracking-wider">Estimated Deployment</span>
                            <p className="text-sm font-serif text-[#1C1C1C] font-semibold pt-1">
                              {PLANS.find(p => p.name === planTier)?.deploymentTime || "5–7 Business Days"}
                            </p>
                            <span className="text-[9px] font-mono text-[#75736D] uppercase block">Strict secure container provisioning</span>
                          </div>
                        </div>

                        {/* Double-column parameters blueprint */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E3DFD5]/70 text-xs leading-relaxed">
                          <div className="space-y-2">
                            <h4 className="font-mono text-[9px] uppercase tracking-wider text-[#C5A880] font-bold">Client Contact Blueprint</h4>
                            <div className="space-y-1 font-sans text-[#605F5A]">
                              <p><strong>Full Name:</strong> {bookingName}</p>
                              <p><strong>Secure Email:</strong> {bookingEmail}</p>
                              <p><strong>Mobile Hotline:</strong> {bookingPhone}</p>
                              <p><strong>Location:</strong> {bookingCountry} ({bookingLanguage})</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-mono text-[9px] uppercase tracking-wider text-[#C5A880] font-bold">Intelligence Neural Profile</h4>
                            <div className="space-y-1 font-sans text-[#605F5A]">
                              <p><strong>Designation Core:</strong> {naraName}</p>
                              <p><strong>Primary Model Class:</strong> {companionType}</p>
                              <p><strong>Cognitive Temperament:</strong> {personality}</p>
                              <p><strong>Comms Strategy:</strong> {conversationStyle}</p>
                              <p className="truncate"><strong>Primary Objectives:</strong> {selectedGoals.join(', ')}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-3.5 rounded-lg border border-[#E3DFD5] text-xs font-sans text-[#605F5A] flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="text-[#5A5A40]" size={14} />
                            <span><strong>Briefing Consultation:</strong> {bookingDate} at {bookingTime} ({bookingTimeZone})</span>
                          </div>
                          <span className="text-[10px] font-mono uppercase bg-[#C5A880]/15 text-[#8E7045] px-2 py-0.5 rounded font-bold">
                            via {bookingMeetingPlatform}
                          </span>
                        </div>
                      </div>

                      {errorMessage && (
                        <div className="bg-[#FAF0F0] border border-[#EACDCD] p-4 rounded-lg text-xs text-[#8A3B3B] font-mono" id="onboarding-error-banner">
                          {errorMessage}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-[#FAF9F5] gap-4">
                        <button
                          type="button"
                          onClick={() => setBookingOnboardingStep(3)}
                          className="px-5 py-3 bg-white border border-[#E3DFD5] hover:bg-[#FAF9F5] text-[#605F5A] transition-all rounded-lg text-xs font-semibold font-mono uppercase cursor-pointer flex items-center gap-2"
                        >
                          <ArrowLeft size={14} />
                          <span>Back</span>
                        </button>
                        
                        <button
                          type="button"
                          disabled={bookingStatus === 'loading'}
                          onClick={handleBooking}
                          className="px-8 py-3.5 bg-[#1C1C1C] text-white hover:bg-[#1C1C1C]/90 disabled:opacity-50 transition-all rounded-lg text-xs font-semibold font-mono uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          {bookingStatus === 'loading' ? (
                            <>
                              <RefreshCw className="animate-spin" size={14} />
                              <span>PROVISIONING INTELLECTUAL CONTAINER...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles size={14} />
                              <span>CONFIRM & INITIATE ONBOARDING</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: CONFIRMATION */}
                  {bookingOnboardingStep === 5 && (
                    <div className="space-y-8 py-4 text-center max-w-xl mx-auto">
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-[#F0FAF4] border border-[#CDEAE2] rounded-full flex items-center justify-center mx-auto text-[#5A5A40] shadow-sm">
                          <Check className="stroke-[3]" size={32} />
                        </div>
                        <div className="space-y-2">
                          <span className="font-mono text-[9px] tracking-[0.3em] text-[#C5A880] uppercase font-bold block">Secure Initialization Triggered</span>
                          <h1 className="text-3xl font-serif text-[#1C1C1C] tracking-tight leading-tight">
                            Your Intelligence<br />
                            <span className="italic">Journey Begins.</span>
                          </h1>
                        </div>
                        <p className="text-sm text-[#605F5A] max-w-md mx-auto leading-relaxed font-sans">
                          A senior Intelligence Architect has been assigned to your custom configuration code. We will review your systems specification and reach out to initiate direct deployment within 24 hours.
                        </p>
                      </div>

                      {/* Display beautiful compiled recipe details */}
                      {submittedDetails && (
                        <div className="bg-[#FAF9F5] border border-[#E3DFD5] p-5 rounded-xl text-left space-y-4 shadow-3xs max-w-lg mx-auto">
                          <div className="flex justify-between items-center border-b border-[#E3DFD5] pb-3">
                            <span className="font-mono text-[8px] uppercase text-[#75736D] tracking-widest font-bold">Encrypted Registration Docket</span>
                            <span className="font-mono text-[9px] text-[#5A5A40] font-bold">
                              ID: NARA-CONF-{Math.floor(100000 + (submittedDetails.name?.length || 0) * 4821) % 900000 + 100000}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-xs font-sans text-[#605F5A]">
                            <div>
                              <p className="text-[10px] font-mono uppercase text-[#75736D] tracking-wider mb-0.5">Assigned Partner</p>
                              <p className="font-semibold text-[#1C1C1C]">{submittedDetails.name}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-mono uppercase text-[#75736D] tracking-wider mb-0.5">Intelligence Core</p>
                              <p className="font-semibold text-[#1C1C1C]">{submittedDetails.naraName} ({submittedDetails.companionType})</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-mono uppercase text-[#75736D] tracking-wider mb-0.5">Briefing Session</p>
                              <p className="font-semibold text-[#1C1C1C]">{submittedDetails.date} @ {submittedDetails.time}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-mono uppercase text-[#75736D] tracking-wider mb-0.5">Meeting Medium</p>
                              <p className="font-semibold text-[#1C1C1C]">{submittedDetails.meetingPlatform}</p>
                            </div>
                          </div>

                          <div className="bg-white p-3 rounded-lg border border-[#E3DFD5] flex items-start gap-2.5">
                            <Shield className="text-[#C5A880] shrink-0 mt-0.5" size={14} />
                            <div className="text-[11px] text-[#75736D] leading-relaxed">
                              An encrypted system invitation holding your diagnostic container key and briefing link has been queued for dispatch to <strong className="text-[#1C1C1C]">{submittedDetails.email}</strong>.
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t border-[#FAF9F5] flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setBookingOnboardingStep(1);
                            setBookingStatus('idle');
                            setSubmittedDetails(null);
                          }}
                          className="px-6 py-3 bg-[#FAF9F5] border border-[#E3DFD5] hover:bg-[#E3DFD5]/20 text-[#1C1C1C] transition-all rounded-lg text-xs font-semibold font-mono uppercase cursor-pointer"
                        >
                          Configure Another Core
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Booking History Section for previously scheduled meetings */}
                  {bookingHistory.length > 0 && bookingOnboardingStep !== 5 && (
                    <div className="space-y-3 pt-6 border-t border-[#FAF9F5] text-left">
                      <p className="text-xs font-mono text-[#605F5A] uppercase tracking-wider font-bold">Scheduled System Briefings</p>
                      <div className="space-y-3">
                        {bookingHistory.map((booking, index) => (
                          <div key={index} className="p-4 bg-[#FAF9F5] rounded-lg border border-[#E3DFD5] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-serif text-sm font-semibold text-[#1C1C1C]">{booking.session_type}</span>
                              <span className="font-mono text-[10px] px-2 py-0.5 bg-[#5A5A40]/15 text-[#5A5A40] rounded font-semibold uppercase">
                                Scheduled
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11px] font-sans text-[#605F5A]">
                              <p><strong>Companion Name:</strong> {booking.nara_name}</p>
                              <p><strong>Scheduled For:</strong> {booking.name}</p>
                              <p><strong>Scheduled Date:</strong> {booking.booking_date}</p>
                              <p><strong>Scheduled Time:</strong> {booking.booking_time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ADVANCED STACK VARIABLES - ACCORDION IN STEP 3 */}
                <div className="bg-white border border-[#E3DFD5] rounded-xl overflow-hidden shadow-2xs">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer select-none bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <Cpu className="text-[#5A5A40]" size={18} />
                        <div className="text-left">
                          <h4 className="text-sm font-serif font-semibold text-[#1C1C1C]">Stack Environment Variables</h4>
                          <p className="text-[10px] text-[#75736D] font-sans">Configure database connections, SMTP credentials, and Gemini API keys.</p>
                        </div>
                      </div>
                      <span className="text-[#75736D] transition-transform group-open:rotate-180 font-mono text-xs font-bold">&darr;</span>
                    </summary>
                    <div className="p-6 border-t border-[#E3DFD5]/50 bg-white space-y-6">
                      {isLoadingSettings ? (
                        <div className="py-12 flex flex-col items-center justify-center space-y-3" id="settings-loader">
                          <RefreshCw className="animate-spin text-[#5A5A40]" size={28} />
                          <p className="text-xs font-mono text-[#605F5A]">Retrieving active stack environment...</p>
                        </div>
                      ) : (
                        <form onSubmit={handleSaveSettings} className="space-y-6 text-left">
                          {settingsMessage && (
                            <div className={`p-4 rounded-lg flex items-start gap-3 text-xs leading-relaxed border ${
                              settingsMessage.type === 'success'
                                ? 'bg-[#F0FAF4] border-[#CDEAE2] text-[#2E6A4F]'
                                : 'bg-[#FAF0F0] border-[#EACDCD] text-[#8A3B3B]'
                            }`} id="settings-response-banner">
                              <Info className="shrink-0 mt-0.5" size={16} />
                              <div>{settingsMessage.text}</div>
                            </div>
                          )}

                          {/* Section 1: Supabase Integration */}
                          <div className="space-y-4 border-b border-[#FAF9F5] pb-6">
                            <div className="flex items-center gap-2">
                              <Database className="text-[#5A5A40]" size={16} />
                              <h3 className="text-xs font-serif font-semibold text-[#1C1C1C]">Supabase Cloud Database & Storage</h3>
                            </div>
                            <p className="text-[11px] text-[#605F5A] leading-relaxed">
                              Used for persistent cloud configuration backups, file storage, and guest profile synchronizations.
                            </p>

                            <div className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block">Supabase Project URL</label>
                                  <input
                                    type="text"
                                    value={settingsUrl}
                                    onChange={(e) => setSettingsUrl(e.target.value)}
                                    placeholder="https://your-project.supabase.co"
                                    className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#5A5A40] transition-colors font-mono"
                                  />
                                </div>

                                <div className="space-y-1.5">
                                  <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block">Supabase Anon Key (Public)</label>
                                  <input
                                    type="password"
                                    value={settingsAnonKey}
                                    onChange={(e) => setSettingsAnonKey(e.target.value)}
                                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                    className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#5A5A40] transition-colors font-mono"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block">Supabase Service Role Key (Secret Backend Auth)</label>
                                <input
                                  type="password"
                                  value={settingsServiceKey}
                                  onChange={(e) => setSettingsServiceKey(e.target.value)}
                                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                  className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#5A5A40] transition-colors font-mono"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Section 2: Gemini Cognitive Engine */}
                          <div className="space-y-4 border-b border-[#FAF9F5] pb-6">
                            <div className="flex items-center gap-2">
                              <Key className="text-[#5A5A40]" size={16} />
                              <h3 className="text-xs font-serif font-semibold text-[#1C1C1C]">Gemini Cognitive AI Engine</h3>
                            </div>
                            <p className="text-[11px] text-[#605F5A] leading-relaxed">
                              Powers the Smart AI Cognitive Blueprint Generator and evolutionary companion audit templates.
                            </p>

                            <div className="space-y-1.5">
                              <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block">Gemini API Key (GEMINI_API_KEY)</label>
                              <input
                                type="password"
                                value={settingsGeminiKey}
                                onChange={(e) => setSettingsGeminiKey(e.target.value)}
                                placeholder="AIzaSy..."
                                className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#5A5A40] transition-colors font-mono"
                              />
                            </div>
                          </div>

                          {/* Section 3: Nodemailer SMTP Configuration */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Mail className="text-[#5A5A40]" size={16} />
                              <h3 className="text-xs font-serif font-semibold text-[#1C1C1C]">SMTP Email Notification Relay</h3>
                            </div>
                            <p className="text-[11px] text-[#605F5A] leading-relaxed">
                              Routes the scheduling briefs, conference links, and platform telemetry directly to users' email mailboxes.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block">SMTP Server Host</label>
                                <input
                                  type="text"
                                  value={settingsSmtpHost}
                                  onChange={(e) => setSettingsSmtpHost(e.target.value)}
                                  placeholder="smtp.gmail.com"
                                  className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#5A5A40] transition-colors font-mono"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block">Port</label>
                                <input
                                  type="text"
                                  value={settingsSmtpPort}
                                  onChange={(e) => setSettingsSmtpPort(e.target.value)}
                                  placeholder="587"
                                  className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#5A5A40] transition-colors font-mono"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block">SMTP Recipient Username (Gmail Address)</label>
                                <input
                                  type="email"
                                  value={settingsSmtpUser}
                                  onChange={(e) => setSettingsSmtpUser(e.target.value)}
                                  placeholder="naraartficalintel@gmail.com"
                                  className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#5A5A40] transition-colors font-mono"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#605F5A] uppercase tracking-wider block">SMTP App Password (Secret)</label>
                                <input
                                  type="password"
                                  value={settingsSmtpPass}
                                  onChange={(e) => setSettingsSmtpPass(e.target.value)}
                                  placeholder="abcd efgh ijkl mnop"
                                  className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#5A5A40] transition-colors font-mono"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Form Controls */}
                          <div className="flex gap-4 pt-4 border-t border-[#FAF9F5]">
                            <button
                              type="submit"
                              disabled={isSavingSettings}
                              className="flex-1 py-3 bg-[#5A5A40] text-white hover:bg-[#5A5A40]/90 disabled:opacity-50 transition-all rounded-lg text-xs font-semibold tracking-wider uppercase font-mono flex items-center justify-center gap-2 cursor-pointer"
                            >
                              {isSavingSettings ? (
                                <>
                                  <RefreshCw className="animate-spin" size={12} />
                                  <span>Updating Stack...</span>
                                </>
                              ) : (
                                <span>Save & Apply Stack Variables</span>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={fetchSettings}
                              disabled={isSavingSettings}
                              className="px-6 py-3 bg-white border border-[#E3DFD5] hover:bg-[#FAF9F5] text-[#1C1C1C] transition-all rounded-lg text-xs font-semibold font-mono cursor-pointer"
                            >
                              Refresh
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </details>
                </div>

                {/* Step 3 Back Navigation Button */}
                <div className="flex items-center justify-start pt-6 border-t border-[#E3DFD5]">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(2);
                      document.getElementById('simulator-stepper')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-white border border-[#E3DFD5] hover:bg-[#FAF9F5] text-[#605F5A] transition-all rounded-lg text-xs font-semibold font-mono uppercase cursor-pointer"
                  >
                    &larr; Back to Customization
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Panel (Configuration Summary & Gemini API Smart Engine) */}
        <div className="space-y-8" id="sidebar-panel">
          
          {/* COGNITIVE LAYER VISUALIZATION CARD */}
          <div className="bg-white border border-[#E3DFD5] rounded-xl p-4 space-y-3 shadow-2xs overflow-hidden group">
            <div className="relative h-44 rounded-lg overflow-hidden border border-[#E3DFD5]">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600"
                alt="Personalized AI Cognitive Core Landscape"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3">
                <span className="font-mono text-[8px] tracking-widest text-[#C5A880] uppercase block font-bold">COGNITIVE COMPANION ENGINE</span>
                <span className="text-white text-xs font-serif font-light block mt-0.5">Active Personalization Map</span>
              </div>
            </div>
            <p className="font-mono text-[9px] text-[#75736D] uppercase tracking-wider text-center">
              Active Module — Personalized Neural Architecture
            </p>
          </div>
          
          {/* CONFIGURATION LIVE STATE CARD */}
          <div className="bg-white border border-[#E3DFD5] rounded-xl p-6 space-y-4" id="config-live-state-card">
            <h3 className="font-serif font-medium text-[#1C1C1C] text-lg border-b border-[#FAF9F5] pb-3 flex items-center justify-between">
              <span>Nara Configuration State</span>
              <Settings size={16} className="text-[#75736D]" />
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center border-b border-[#FAF9F5] pb-2">
                <span className="font-mono text-[#605F5A] uppercase text-[10px] tracking-wider">Custom Identity</span>
                <span className="font-semibold text-[#1C1C1C]">{naraName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#FAF9F5] pb-2">
                <span className="font-mono text-[#605F5A] uppercase text-[10px] tracking-wider">Cognitive Index</span>
                <span className="font-medium text-[#1C1C1C]">{companionType}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#FAF9F5] pb-2">
                <span className="font-mono text-[#605F5A] uppercase text-[10px] tracking-wider">Level Index</span>
                <span className="font-mono px-2 py-0.5 bg-[#FAF9F5] border border-[#E3DFD5] rounded text-[10px] font-bold text-[#1C1C1C]">
                  L{avatarLevel} ({EVOLUTION_STAGES.find(s => s.level === avatarLevel)?.name})
                </span>
              </div>
              <div className="flex justify-between items-start border-b border-[#FAF9F5] pb-2">
                <span className="font-mono text-[#605F5A] uppercase text-[10px] tracking-wider mt-0.5">Plan Experience</span>
                <div className="text-right">
                  <span className="font-semibold text-[#C5A880] uppercase tracking-wide block text-xs">{planTier}</span>
                  <span className="text-[9px] text-[#75736D] font-mono block">
                    Creation Fee: {PLANS.find(p => p.name === planTier)?.setupFee || '$599'} (One-Time)
                  </span>
                  <span className="text-[9px] text-[#75736D] font-mono block">
                    Subscription: {PLANS.find(p => p.name === planTier)?.price === 'Starting at $499' ? 'Starting at $499/month' : `${PLANS.find(p => p.name === planTier)?.price || '$49'}/month`}
                  </span>
                </div>
              </div>
              <div className="space-y-1.5 border-b border-[#FAF9F5] pb-2">
                <span className="font-mono text-[#605F5A] uppercase text-[10px] tracking-wider block">Target Optimization Goals</span>
                <div className="flex flex-wrap gap-1">
                  {selectedGoals.map((g) => (
                    <span key={g} className="px-2 py-0.5 bg-[#5A5A40]/10 text-[#5A5A40] rounded text-[9px] font-medium font-sans">
                      {g}
                    </span>
                  ))}
                  {selectedGoals.length === 0 && <span className="text-[10px] text-[#75736D] italic">None selected</span>}
                </div>
              </div>
              <div className="space-y-1.5 pb-2">
                <span className="font-mono text-[#605F5A] uppercase text-[10px] tracking-wider block">Workspaces Bridged</span>
                <div className="flex flex-wrap gap-1">
                  {connectedServices.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-[#FAF9F5] border border-[#E3DFD5] rounded text-[9px] font-serif text-[#1C1C1C]">
                      {s}
                    </span>
                  ))}
                  {connectedServices.length === 0 && <span className="text-[10px] text-[#75736D] italic">No workspaces bridged</span>}
                </div>
              </div>
            </div>

            {/* Sync Status Button */}
            <button
              type="button"
              onClick={handleCloudSync}
              disabled={syncStatus === 'syncing'}
              className="w-full py-2.5 bg-[#5A5A40] hover:bg-[#5A5A40]/95 disabled:bg-[#5A5A40]/60 transition-all rounded-lg text-white font-mono text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
            >
              <RefreshCw className={syncStatus === 'syncing' ? 'animate-spin' : ''} size={12} />
              {syncStatus === 'syncing' ? 'Synchronizing traits...' : 'Sync Config Traits to Cloud'}
            </button>

            {syncStatus === 'success' && (
              <p className="text-[10px] text-center text-[#5A5A40] font-medium font-mono animate-pulse">✓ Cloud Profiles Synchronized</p>
            )}
          </div>

          {/* AI SMART COMPANION BLUEPRINT GENERATOR */}
          <div className="bg-white border border-[#E3DFD5] rounded-xl p-6 space-y-4" id="ai-blueprint-generator">
            <h3 className="font-serif font-medium text-[#1C1C1C] text-lg border-b border-[#FAF9F5] pb-3 flex items-center gap-2">
              <Sparkles className="text-[#C5A880]" size={18} />
              <span>AI Companion Audit</span>
            </h3>
            <p className="text-xs text-[#605F5A] leading-relaxed">
              Generate an audit and customized cognitive blueprint of your AI companion based on the current trait setup.
            </p>

            <button
              type="button"
              onClick={generateGeminiBlueprint}
              disabled={isGeneratingBlueprint}
              className="w-full py-2.5 border border-[#5A5A40] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white transition-all rounded-lg text-xs font-semibold"
            >
              {isGeneratingBlueprint ? 'Analysing with Gemini API...' : 'Generate Smart Blueprint'}
            </button>

            {aiBlueprint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg text-xs leading-relaxed space-y-2 max-h-96 overflow-y-auto"
              >
                <p className="font-mono uppercase tracking-wider text-[10px] text-[#5A5A40] font-bold">Gemini Audit Report</p>
                <div className="text-xs text-[#1C1C1C] whitespace-pre-wrap font-sans space-y-1">
                  {aiBlueprint}
                </div>
              </motion.div>
            )}
          </div>

          {/* DATABASE & STORAGE SETUP FORM */}
          {!user && (
            <div className="bg-white border border-[#E3DFD5] rounded-xl p-6 space-y-4" id="supabase-auth-card">
              <h3 className="font-serif font-medium text-[#1C1C1C] text-lg border-b border-[#FAF9F5] pb-3 flex items-center gap-2">
                <Database className="text-[#C5A880]" size={16} />
                <span>Cloud Profile Access</span>
              </h3>
              <p className="text-xs text-[#605F5A] leading-relaxed">
                Log in or register with Supabase Auth to save and synchronize your companion profiles.
              </p>

              <form onSubmit={handleAuth} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="email@studio-nara.net"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#5A5A40]"
                />
                <input
                  type="password"
                  required
                  placeholder="Enter secure password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#E3DFD5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#5A5A40]"
                />

                <div className="flex items-center justify-between gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    className="text-[10px] font-mono uppercase tracking-wider text-[#75736D] hover:underline text-left"
                  >
                    Switch to {authMode === 'login' ? 'Sign Up' : 'Log In'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#5A5A40] text-white hover:bg-[#5A5A40]/95 transition-all rounded-lg text-xs font-semibold"
                  >
                    {authMode === 'login' ? 'Log In' : 'Sign Up'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Slide Navigation Controls */}
      <div className="w-full bg-[#FAF9F5] select-none py-6 border-t border-[#E3DFD5]/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#75736D] font-bold">01</span>
            <div className="w-24 md:w-36 h-[1.5px] bg-[#E3DFD5] relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-[#1C1C1C]"
                animate={{ width: `${((activeSlideIndex + 1) / SLIDES.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="font-mono text-xs text-[#1C1C1C] font-bold">06</span>
          </div>

          {/* Active Label */}
          <div className="font-mono text-xs tracking-[0.15em] text-[#1C1C1C] font-bold uppercase select-none">
            ACTIVE SLIDE: <span className="text-[#75736D] font-medium">{activeSlide.num}</span> / {activeSlide.label}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrevSlide}
              disabled={activeSlideIndex === 0}
              className={`px-5 py-2.5 text-[10px] md:text-xs font-mono tracking-wider uppercase border transition-all duration-300 ${
                activeSlideIndex === 0
                  ? 'border-[#E3DFD5] text-[#1C1C1C]/20 cursor-not-allowed'
                  : 'border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white active:scale-95 cursor-pointer font-semibold'
              }`}
            >
              PREVIOUS
            </button>
            <button
              onClick={handleNextSlide}
              disabled={activeSlideIndex === SLIDES.length - 1}
              className={`px-5 py-2.5 text-[10px] md:text-xs font-mono tracking-wider uppercase border transition-all duration-300 ${
                activeSlideIndex === SLIDES.length - 1
                  ? 'border-[#E3DFD5] text-[#1C1C1C]/20 cursor-not-allowed'
                  : 'border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white active:scale-95 cursor-pointer font-semibold'
              }`}
            >
              NEXT SLIDE
            </button>
          </div>
        </div>
      </div>

      {/* Footer Branding & Social Channels */}
      <footer className="w-full bg-[#FAF9F5] border-t border-[#E3DFD5] pt-12 pb-6 px-4 md:px-8 select-none font-sans" id="nara-global-footer">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Main Footer Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Brand (Span 4) */}
            <div className="md:col-span-4 space-y-2">
              <h3 className="font-sans text-lg font-medium tracking-[0.2em] text-[#1C1C1C]">NARA</h3>
              <p className="font-serif italic text-xs text-[#75736D]">
                Personalized Intelligence for Every Human Journey.
              </p>
            </div>

            {/* Column 2: Social Channels (Span 5) */}
            <div className="md:col-span-5 space-y-3">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#75736D] uppercase font-bold block">
                Social Intelligence Channels
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] md:text-[11px] tracking-wider text-[#1C1C1C] font-semibold">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#75736D] transition-colors">
                  INSTAGRAM ↗
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#75736D] transition-colors">
                  FACEBOOK ↗
                </a>
                <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#75736D] transition-colors">
                  REDDIT ↗
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#75736D] transition-colors">
                  TIKTOK ↗
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#75736D] transition-colors">
                  X ↗
                </a>
              </div>
            </div>

            {/* Column 3: Legal Modals (Span 3) */}
            <div className="md:col-span-3 space-y-3 md:text-right">
              <div className="flex flex-wrap md:justify-end gap-x-6 gap-y-2 font-mono text-[10px] md:text-[11px] tracking-wider text-[#1C1C1C] font-semibold">
                <button 
                  onClick={() => setShowSecurityPolicy(true)} 
                  className="hover:underline hover:text-[#75736D] transition-all cursor-pointer text-left md:text-right uppercase"
                >
                  Security Policy
                </button>
                <button 
                  onClick={() => setShowConsultationSla(true)} 
                  className="hover:underline hover:text-[#75736D] transition-all cursor-pointer text-left md:text-right uppercase"
                >
                  Consultation SLA
                </button>
                <button 
                  onClick={() => setShowEthicalCovenant(true)} 
                  className="hover:underline hover:text-[#75736D] transition-all cursor-pointer text-left md:text-right uppercase"
                >
                  Ethical Covenant
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Metabar */}
          <div className="border-t border-[#E3DFD5]/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] font-mono tracking-[0.2em] text-[#75736D]">
            <div>NARA INC. © 2026. ALL DATA EMBARGOED.</div>
            <div className="uppercase">Humanity First. Designed for Alignment.</div>
          </div>

        </div>
      </footer>

      {/* Full Screen Overlays */}
      <AnimatePresence>
        {showSecurityPolicy && (
          <SecurityPolicyView onClose={() => setShowSecurityPolicy(false)} />
        )}
        {showConsultationSla && (
          <ConsultationSlaView onClose={() => setShowConsultationSla(false)} />
        )}
        {showEthicalCovenant && (
          <EthicalCovenantView onClose={() => setShowEthicalCovenant(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
