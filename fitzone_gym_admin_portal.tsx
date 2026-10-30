import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, Flame, Trophy, Users, Calendar, ShieldCheck, Clock, MapPin, Phone, Mail, 
  ChevronRight, CheckCircle2, Star, ArrowRight, X, Search, Plus, Edit, Trash2, 
  ExternalLink, MessageSquare, LogIn, LogOut, Check, Sparkles, Filter, RefreshCw, 
  Database, Shield, ChevronDown, Award, Activity, AlertCircle, Eye, Copy, Menu
} from 'lucide-react';

// ==========================================
// INITIAL MOCK DATA (Dual-mode fallback data)
// ==========================================

const INITIAL_PROGRAMS = [
  {
    id: 'p1',
    title: 'Hypertrophy Strength Training',
    category: 'Strength',
    intensity: 'High',
    duration: '60 mins',
    description: 'Build raw muscle mass and progressive overload strength under expert biomechanical guidance using prime Olympic equipment.',
    features: ['Progressive Overload Tracking', 'Form & Technique Analysis', 'Custom Macro Nutrition Plan', 'Access to Heavy Lifting Zone'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    schedule: 'Mon, Wed, Fri - 7:00 AM & 6:00 PM'
  },
  {
    id: 'p2',
    title: 'High-Octane Cardio & HIIT',
    category: 'Cardio',
    intensity: 'Extreme',
    duration: '45 mins',
    description: 'Torch maximum calories, blast stubborn fat, and elevate your VO2 max with high-intensity interval training and sprint circuits.',
    features: ['Heart Rate Zone Monitoring', 'Metabolic Rate Boost', 'Agility & Endurance Drills', 'Burn up to 800+ kcal/session'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    schedule: 'Daily - 8:00 AM & 5:00 PM'
  },
  {
    id: 'p3',
    title: 'Functional Athletic Fitness',
    category: 'Functional',
    intensity: 'Medium-High',
    duration: '50 mins',
    description: 'Enhance your real-world movement, mobility, core stability, and balance through kettlebells, battle ropes, and plyometrics.',
    features: ['Joint Health & Mobility', 'Core Power Development', 'Injury Prevention Drills', 'Dynamic Athletic Movements'],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800',
    schedule: 'Tue, Thu, Sat - 6:30 AM & 7:00 PM'
  },
  {
    id: 'p4',
    title: '1-on-1 Elite Personal Coaching',
    category: 'Personal Training',
    intensity: 'Tailored',
    duration: '60 mins',
    description: 'Bespoke coaching with dedicated master trainers, custom body composition monitoring, and daily accountability checks.',
    features: ['100% Dedicated Master Trainer', '3D InBody Scanner Analysis', 'Custom Meal & Supplement Plan', 'Priority Slot Booking'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    schedule: 'Flexible - By Appointment'
  },
  {
    id: 'p5',
    title: 'Calisthenics & Bodyweight Mastery',
    category: 'Calisthenics',
    intensity: 'High',
    duration: '55 mins',
    description: 'Master your own bodyweight with muscle-ups, handstands, human flags, and core gymnastic strength principles.',
    features: ['Gymnastic Ring Work', 'Relative Strength Boost', 'Advanced Core Conditioning', 'Skill Progression Tracks'],
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=800',
    schedule: 'Tue, Thu - 6:00 PM'
  },
  {
    id: 'p6',
    title: 'Combat Boxing & Conditioning',
    category: 'Boxing',
    intensity: 'Extreme',
    duration: '60 mins',
    description: 'Combine heavy bag work, pad work, explosive footwork, and core resistance for ultimate self-defense and athletic conditioning.',
    features: ['Heavy Bag & Speed Bag Rounds', 'Pad Work with Pros', 'Explosive Stamina Build', 'Reflexes & Footwork Mastery'],
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=800',
    schedule: 'Mon, Wed, Sat - 5:30 PM'
  }
];

const INITIAL_TRAINERS = [
  {
    id: 't1',
    name: 'Marcus Vance',
    role: 'Head Strength Coach',
    specialty: 'Powerlifting & Hypertrophy',
    experience: '10+ Years',
    rating: 4.9,
    bio: 'Former national powerlifter dedicated to helping athletes achieve peak physical transformation with bio-mechanically safe strength protocols.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 't2',
    name: 'Elena Rostova',
    role: 'HIIT & Conditioning Lead',
    specialty: 'Fat Loss & Endurance',
    experience: '8 Years',
    rating: 5.0,
    bio: 'Specializes in high-intensity conditioning and body recomposition. Elena designs high-energy routines that keep metabolic burn elevated for 24 hours.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 't3',
    name: 'Jaxson Reed',
    role: 'Functional & Calisthenics Specialist',
    specialty: 'Mobility & Bodyweight Mastery',
    experience: '6 Years',
    rating: 4.8,
    bio: 'Passionate about athletic movement, gymnastics, and mobility. Helps clients unlock athletic movement without joint stress.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 't4',
    name: 'Samantha Drake',
    role: 'Nutrition & Personal Fitness Coach',
    specialty: 'Transformation & Wellness',
    experience: '7 Years',
    rating: 4.9,
    bio: 'Certified sports nutritionist and personal trainer creating tailored nutrition and lifting programs for sustainable lifestyle overhauls.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
  }
];

const INITIAL_PLANS = [
  {
    id: 'plan_basic',
    name: 'Basic Access',
    monthlyPrice: 29,
    annualPrice: 24,
    popular: false,
    description: 'Perfect for independent lifters seeking top-tier gym equipment and environment.',
    features: ['Unlimited Gym Floor Access', 'Locker Room & Sauna Access', 'FitZone Mobile App Access', '1 Free Trainer Consultation', 'Standard Peak Hours']
  },
  {
    id: 'plan_pro',
    name: 'Pro Performance',
    monthlyPrice: 59,
    annualPrice: 49,
    popular: true,
    description: 'Our most popular plan for active fitness enthusiasts seeking full studio variety.',
    features: ['24/7 Unlimited Gym Access', 'All Group Fitness & HIIT Classes', 'Monthly InBody 3D Scan', 'Sauna & Cryo Lounge Access', '2 Personal Training Credits/mo', 'Guest Pass (2/month)']
  },
  {
    id: 'plan_vip',
    name: 'Elite VIP Coaching',
    monthlyPrice: 119,
    annualPrice: 99,
    popular: false,
    description: 'Complete end-to-end fitness management with dedicated personal coaching.',
    features: ['Dedicated Personal Coach (4x/mo)', 'Custom Macro Nutrition Plan', '24/7 Unlimited Priority Access', 'Unlimited Recovery Lounge & Cryo', 'Free FitZone Apparel Kit', 'VIP Locker & Towel Service']
  }
];

const INITIAL_ENQUIRIES = [
  {
    id: 'enq-101',
    name: 'Alexander Wright',
    email: 'alex.wright@example.com',
    phone: '+1 (555) 234-5678',
    plan: 'Pro Performance',
    trainer: 'Marcus Vance',
    message: 'Interested in joining for strength goals. Would like to schedule a tour tomorrow.',
    status: 'New',
    createdAt: '2026-10-28 14:30'
  },
  {
    id: 'enq-102',
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    phone: '+1 (555) 876-5432',
    plan: 'Elite VIP Coaching',
    trainer: 'Elena Rostova',
    message: 'Looking for 1-on-1 personal training focused on fat loss before summer.',
    status: 'Contacted',
    createdAt: '2026-10-29 09:15'
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState('public'); // 'public' | 'admin'
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'programs', 'trainers', 'plans', 'enquiries', 'setup'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App Data States (Synchronized in local state + Supabase if configured)
  const [programs, setPrograms] = useState(INITIAL_PROGRAMS);
  const [trainers, setTrainers] = useState(INITIAL_TRAINERS);
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [enquiries, setEnquiries] = useState(INITIAL_ENQUIRIES);

  // Filter & Search States
  const [programFilter, setProgramFilter] = useState('All');
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  // Modals & Active Selections
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedPlanForJoin, setSelectedPlanForJoin] = useState(null);
  const [bookingTrainer, setBookingTrainer] = useState(null);
  const [setupModalOpen, setSetupModalOpen] = useState(false);

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminAuthInput, setAdminAuthInput] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Toast Notification System
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Smooth Scroll Helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (currentView !== 'public') {
      setCurrentView('public');
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(id);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open Join Modal with pre-selected defaults
  const handleOpenJoinModal = (planName = 'Pro Performance', trainerName = '') => {
    setSelectedPlanForJoin(planName);
    if (trainerName) setBookingTrainer(trainerName);
    setJoinModalOpen(true);
  };

  // Admin Login Handler (Demo mode fallback or Auth)
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminAuthInput.email === 'admin@fitzone.com' && adminAuthInput.password === 'admin123') {
      setIsAdminLoggedIn(true);
      setAuthError('');
      showToast('Admin logged in successfully!');
    } else if (adminAuthInput.email === '' && adminAuthInput.password === '') {
      // Demo bypass for easy previewing
      setIsAdminLoggedIn(true);
      showToast('Logged in under Demo Mode');
    } else {
      setAuthError('Invalid email or password. (Demo: admin@fitzone.com / admin123)');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F11] text-zinc-100 font-sans antialiased selection:bg-[#FF5722] selection:text-white flex flex-col">
      
      {/* ================= TOAST NOTIFICATION ================= */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-zinc-900 border border-[#FF5722]/50 text-white px-5 py-3.5 rounded-xl shadow-2xl animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#FF5722]" />
          <span className="font-medium text-sm">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-zinc-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ================= TOP ANNOUNCEMENT BAR ================= */}
      <div className="bg-gradient-to-r from-zinc-900 via-[#FF5722]/20 to-zinc-900 border-b border-zinc-800 text-xs py-2 px-4 text-center flex items-center justify-center gap-2">
        <span className="bg-[#FF5722] text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Special</span>
        <span className="text-zinc-300">Join FitZone today & get 1st Month 30% OFF + Free 3D Body Composition Scan!</span>
        <button onClick={() => handleOpenJoinModal('Pro Performance')} className="text-[#FF5722] underline font-bold hover:text-orange-400 ml-1">
          Claim Now
        </button>
      </div>

      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-40 bg-[#0F0F11]/90 backdrop-blur-md border-b border-zinc-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => { setCurrentView('public'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5722] to-orange-600 flex items-center justify-center shadow-lg shadow-[#FF5722]/30 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-6 h-6 text-white transform -rotate-45" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider text-white uppercase italic">
                FIT<span className="text-[#FF5722]">ZONE</span>
              </span>
              <span className="block text-[10px] text-zinc-400 font-semibold tracking-widest uppercase -mt-1">
                Elite Performance
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          {currentView === 'public' ? (
            <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide uppercase">
              <button onClick={() => scrollToSection('about')} className="text-zinc-300 hover:text-[#FF5722] transition-colors">About</button>
              <button onClick={() => scrollToSection('programs')} className="text-zinc-300 hover:text-[#FF5722] transition-colors">Programs</button>
              <button onClick={() => scrollToSection('trainers')} className="text-zinc-300 hover:text-[#FF5722] transition-colors">Trainers</button>
              <button onClick={() => scrollToSection('pricing')} className="text-zinc-300 hover:text-[#FF5722] transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('contact')} className="text-zinc-300 hover:text-[#FF5722] transition-colors">Contact</button>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2 text-sm text-zinc-400">
              <span className="bg-orange-500/10 text-[#FF5722] border border-[#FF5722]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Admin Control Portal
              </span>
            </div>
          )}

          {/* Action Buttons & Portal Switcher */}
          <div className="hidden md:flex items-center gap-4">
            {currentView === 'public' ? (
              <>
                <button 
                  onClick={() => setCurrentView('admin')} 
                  className="text-xs font-bold text-zinc-400 hover:text-white px-3 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 transition"
                  title="Switch to Admin Portal"
                >
                  Admin Portal
                </button>
                <button 
                  onClick={() => handleOpenJoinModal()} 
                  className="bg-gradient-to-r from-[#FF5722] to-orange-600 hover:from-orange-600 hover:to-[#FF5722] text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-[#FF5722]/25 hover:shadow-[#FF5722]/40 transition-all transform hover:-translate-y-0.5"
                >
                  Join FitZone
                </button>
              </>
            ) : (
              <button 
                onClick={() => setCurrentView('public')} 
                className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-zinc-700 transition flex items-center gap-2"
              >
                ← Back to Public Site
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white bg-zinc-900 rounded-lg border border-zinc-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-6 space-y-4">
            {currentView === 'public' && (
              <>
                <button onClick={() => scrollToSection('about')} className="block w-full text-left text-zinc-300 hover:text-[#FF5722] font-semibold py-2 border-b border-zinc-900">About</button>
                <button onClick={() => scrollToSection('programs')} className="block w-full text-left text-zinc-300 hover:text-[#FF5722] font-semibold py-2 border-b border-zinc-900">Programs</button>
                <button onClick={() => scrollToSection('trainers')} className="block w-full text-left text-zinc-300 hover:text-[#FF5722] font-semibold py-2 border-b border-zinc-900">Trainers</button>
                <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-zinc-300 hover:text-[#FF5722] font-semibold py-2 border-b border-zinc-900">Pricing</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-zinc-300 hover:text-[#FF5722] font-semibold py-2 border-b border-zinc-900">Contact</button>
              </>
            )}
            <div className="pt-2 flex flex-col gap-3">
              <button 
                onClick={() => { setMobileMenuOpen(false); setCurrentView(currentView === 'public' ? 'admin' : 'public'); }}
                className="w-full text-center bg-zinc-900 text-zinc-300 py-3 rounded-xl border border-zinc-800 font-bold text-xs uppercase"
              >
                {currentView === 'public' ? 'Switch to Admin Portal' : 'Switch to Public Website'}
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); handleOpenJoinModal(); }}
                className="w-full text-center bg-[#FF5722] text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider"
              >
                Join FitZone Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          MAIN CONTENT ROUTER (PUBLIC WEBSITE VS ADMIN PANEL)
      ========================================================= */}
      
      {currentView === 'public' ? (
        <main className="flex-1">
          
          {/* ================= 1. HERO SECTION ================= */}
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950 py-20">
            {/* Background Image with Dark Gradient Overlays */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=85&w=1920" 
                alt="Gym Hero Background" 
                className="w-full h-full object-cover object-center opacity-30 filter brightness-75 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-[#0F0F11]/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F11] via-transparent to-[#0F0F11]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-6">
                
                <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-4 py-2 rounded-full text-xs font-bold text-[#FF5722] uppercase tracking-widest shadow-lg backdrop-blur">
                  <Flame className="w-4 h-4 fill-current text-[#FF5722]" /> Premium Gym & Athletic Club
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase italic leading-none">
                  TRANSFORM YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] via-orange-400 to-amber-500">BODY</span>, ELEVATE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">MIND</span>.
                </h1>

                <p className="text-base sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed">
                  Join FitZone today and experience world-class Olympic equipment, custom nutrition tracking, elite certified trainers, and an unbeatable high-energy environment built for winners.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start">
                  <button 
                    onClick={() => handleOpenJoinModal()} 
                    className="w-full sm:w-auto bg-[#FF5722] hover:bg-orange-600 text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-xl shadow-[#FF5722]/30 hover:shadow-[#FF5722]/50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    Start Free Trial <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scrollToSection('programs')} 
                    className="w-full sm:w-auto bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-center gap-2 backdrop-blur"
                  >
                    Explore Programs
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="pt-8 flex items-center gap-6 text-zinc-400 text-xs font-semibold justify-center sm:justify-start border-t border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5722]" /> No Long-term Contracts
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5722]" /> Free Body Scan
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5722]" /> 24/7 Facility
                  </div>
                </div>

              </div>

              {/* Dynamic Quick Card */}
              <div className="lg:col-span-4 hidden lg:block">
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur relative">
                  <div className="absolute -top-3 -right-3 bg-[#FF5722] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow">
                    Top Rated
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#FF5722]" /> Why Choose FitZone?
                  </h3>
                  <ul className="space-y-3.5 text-xs text-zinc-300 mt-4">
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#FF5722]/20 text-[#FF5722] flex items-center justify-center shrink-0 font-bold text-[10px]">1</div>
                      <span><strong>State-of-the-Art Gear:</strong> Eleiko plates, Hammer Strength, and cardio bio-monitors.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#FF5722]/20 text-[#FF5722] flex items-center justify-center shrink-0 font-bold text-[10px]">2</div>
                      <span><strong>Certified Elite Coaches:</strong> Tailored training schedules for all fitness levels.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#FF5722]/20 text-[#FF5722] flex items-center justify-center shrink-0 font-bold text-[10px]">3</div>
                      <span><strong>Luxury Recovery Suite:</strong> Infrared saunas, cold plunge, and sports massage.</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-amber-400 flex items-center gap-1 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" /> 4.9 / 5.0 Rating
                      </div>
                      <span className="text-[10px] text-zinc-500">Based on 1,200+ Member Reviews</span>
                    </div>
                    <button 
                      onClick={() => handleOpenJoinModal('Pro Performance')}
                      className="text-xs text-[#FF5722] font-bold hover:underline"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ================= METRICS BAR ================= */}
          <section className="bg-zinc-900 border-y border-zinc-800 py-10 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-white italic">2,500+</div>
                <div className="text-xs uppercase font-bold text-[#FF5722] tracking-wider">Active Members</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-white italic">15+</div>
                <div className="text-xs uppercase font-bold text-[#FF5722] tracking-wider">Master Trainers</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-white italic">30+</div>
                <div className="text-xs uppercase font-bold text-[#FF5722] tracking-wider">Weekly Classes</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-white italic">99.4%</div>
                <div className="text-xs uppercase font-bold text-[#FF5722] tracking-wider">Goal Satisfaction</div>
              </div>
            </div>
          </section>

          {/* ================= 2. ABOUT SECTION ================= */}
          <section id="about" className="py-24 bg-[#0F0F11]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Images Mosaic */}
                <div className="grid grid-cols-2 gap-4 relative">
                  <div className="space-y-4">
                    <img 
                      src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600" 
                      alt="Gym Facility" 
                      className="rounded-2xl object-cover h-64 w-full shadow-2xl border border-zinc-800"
                    />
                    <div className="bg-gradient-to-br from-[#FF5722] to-orange-600 p-6 rounded-2xl text-white shadow-xl">
                      <div className="text-3xl font-black italic">10+ YEARS</div>
                      <div className="text-xs uppercase font-bold opacity-90 tracking-wider mt-1">Excellence in Athletic Coaching</div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <img 
                      src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600" 
                      alt="Personal Trainer" 
                      className="rounded-2xl object-cover h-80 w-full shadow-2xl border border-zinc-800"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5722] uppercase tracking-widest">
                    <Award className="w-4 h-4" /> About FitZone Gym
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic leading-tight">
                    BUILT FOR THOSE WHO REFUSE TO SETTLE FOR AVERAGE.
                  </h2>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    Founded in 2016, FitZone was created with a clear mission: to replace cookie-cutter gym routines with scientific athletic training, high-energy community support, and uncompromised facilities.
                  </p>
                  
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                      <div className="p-2.5 rounded-lg bg-[#FF5722]/10 text-[#FF5722]">
                        <Dumbbell className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm uppercase">Olympic-Grade Equipment</h4>
                        <p className="text-xs text-zinc-400 mt-1">Free weights, competition benches, functional turf zones, and cardio bio-monitors.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                      <div className="p-2.5 rounded-lg bg-[#FF5722]/10 text-[#FF5722]">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm uppercase">Sanitized & Safe Environment</h4>
                        <p className="text-xs text-zinc-400 mt-1">24/7 air filtration, continuous cleaning schedules, and spacious workout bays.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => scrollToSection('contact')} 
                      className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-zinc-700 transition"
                    >
                      Schedule a Facility Tour
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* ================= 3. PROGRAMS SECTION ================= */}
          <section id="programs" className="py-24 bg-zinc-950 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5722] uppercase tracking-widest">
                  <Activity className="w-4 h-4" /> Targeted Training Programs
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic">
                  TRAIN WITH PURPOSE. GOAL-ORIENTED WORKOUTS.
                </h2>
                <p className="text-zinc-400 text-sm">
                  Whether your target is maximum muscle growth, fast fat loss, or overall mobility, our tailored programs deliver guaranteed results.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-12">
                {['All', 'Strength', 'Cardio', 'Functional', 'Personal Training', 'Calisthenics', 'Boxing'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProgramFilter(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                      programFilter === cat
                        ? 'bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/30'
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Programs Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs
                  .filter(p => programFilter === 'All' || p.category === programFilter)
                  .map((program) => (
                    <div 
                      key={program.id}
                      className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#FF5722]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img 
                          src={program.image} 
                          alt={program.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                        <span className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur text-[#FF5722] text-[10px] font-black uppercase px-3 py-1 rounded-md border border-zinc-800">
                          {program.category}
                        </span>
                        <span className="absolute bottom-4 right-4 bg-[#FF5722] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                          {program.intensity} Intensity
                        </span>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#FF5722] transition-colors">
                            {program.title}
                          </h3>
                          <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                            {program.description}
                          </p>
                        </div>

                        <div className="space-y-2 border-t border-zinc-800/80 pt-4">
                          <div className="flex items-center justify-between text-xs text-zinc-400">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#FF5722]" /> {program.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#FF5722]" /> {program.schedule.split('-')[0]}
                            </span>
                          </div>
                        </div>

                        <button 
                          onClick={() => setSelectedProgram(program)}
                          className="w-full bg-zinc-800 hover:bg-[#FF5722] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl border border-zinc-700 hover:border-[#FF5722] transition-all flex items-center justify-center gap-2"
                        >
                          View Program Details <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          </section>

          {/* ================= 4. TRAINERS SECTION ================= */}
          <section id="trainers" className="py-24 bg-[#0F0F11]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5722] uppercase tracking-widest">
                  <Users className="w-4 h-4" /> World-Class Coaching Staff
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic">
                  MEET YOUR MASTER TRAINERS
                </h2>
                <p className="text-zinc-400 text-sm">
                  Certified coaches with proven track records ready to help you fix form, stay accountable, and blow past plateaus.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                {trainers.map((trainer) => (
                  <div key={trainer.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition">
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={trainer.image} 
                        alt={trainer.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
                      <div className="absolute top-3 right-3 bg-zinc-950/90 text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-zinc-800">
                        <Star className="w-3.5 h-3.5 fill-current" /> {trainer.rating}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">{trainer.name}</h3>
                        <p className="text-xs font-semibold text-[#FF5722]">{trainer.role}</p>
                      </div>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {trainer.bio}
                      </p>

                      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                        <span><strong>Specialty:</strong> {trainer.specialty}</span>
                        <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 font-medium">{trainer.experience}</span>
                      </div>

                      <button 
                        onClick={() => handleOpenJoinModal('Elite VIP Coaching', trainer.name)}
                        className="w-full mt-2 bg-zinc-800 hover:bg-[#FF5722] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg border border-zinc-700 transition"
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* ================= 5. MEMBERSHIP PRICING SECTION ================= */}
          <section id="pricing" className="py-24 bg-zinc-950 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5722] uppercase tracking-widest">
                  <Shield className="w-4 h-4" /> Transparent Membership Plans
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic">
                  INVEST IN YOUR ULTIMATE HEALTH
                </h2>
                <p className="text-zinc-400 text-sm">
                  Choose the plan that fits your athletic goals. No hidden sign-up fees or tricky cancellation policies.
                </p>

                {/* Billing Switcher Toggle */}
                <div className="pt-6 flex items-center justify-center gap-4">
                  <span className={`text-xs font-bold uppercase ${billingCycle === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
                  <button 
                    onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                    className="w-14 h-8 bg-zinc-800 rounded-full p-1 relative border border-zinc-700 transition"
                  >
                    <div className={`w-6 h-6 rounded-full bg-[#FF5722] transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                  <span className={`text-xs font-bold uppercase flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-white' : 'text-zinc-500'}`}>
                    Annual Billing <span className="bg-[#FF5722]/20 text-[#FF5722] text-[10px] px-2 py-0.5 rounded-full border border-[#FF5722]/30">SAVE 20%</span>
                  </span>
                </div>
              </div>

              {/* Plans Cards */}
              <div className="grid lg:grid-cols-3 gap-8 mt-16 items-stretch">
                {plans.map((plan) => {
                  const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
                  return (
                    <div 
                      key={plan.id}
                      className={`relative bg-zinc-900 rounded-2xl p-8 border flex flex-col justify-between transition duration-300 ${
                        plan.popular 
                          ? 'border-[#FF5722] shadow-2xl shadow-[#FF5722]/20 ring-1 ring-[#FF5722]/50 scale-105 z-10' 
                          : 'border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#FF5722] text-white text-[11px] font-black uppercase px-4 py-1 rounded-full tracking-wider shadow">
                          Most Popular Choice
                        </div>
                      )}

                      <div>
                        <h3 className="text-xl font-bold text-white uppercase">{plan.name}</h3>
                        <p className="text-xs text-zinc-400 mt-2 min-h-[36px]">{plan.description}</p>

                        <div className="my-6">
                          <span className="text-5xl font-black text-white italic">${price}</span>
                          <span className="text-zinc-400 text-xs font-semibold"> / month {billingCycle === 'annual' && '(billed yearly)'}</span>
                        </div>

                        <div className="space-y-3 border-t border-zinc-800 pt-6">
                          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">Included Features:</span>
                          {plan.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                              <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8">
                        <button 
                          onClick={() => handleOpenJoinModal(plan.name)}
                          className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider transition ${
                            plan.popular 
                              ? 'bg-[#FF5722] hover:bg-orange-600 text-white shadow-lg shadow-[#FF5722]/30' 
                              : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                          }`}
                        >
                          Select {plan.name}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* ================= 6. CONTACT & LOCATION SECTION ================= */}
          <section id="contact" className="py-24 bg-[#0F0F11]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid lg:grid-cols-12 gap-12">
                
                {/* Contact Information & WhatsApp Launcher */}
                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5722] uppercase tracking-widest">
                      <MapPin className="w-4 h-4" /> Reach Out
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white uppercase italic mt-2">
                      VISIT OUR HQ OR GET IN TOUCH
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-3">
                      Have questions regarding memberships, training schedules, or group bookings? Send us a message or pop in for a tour!
                    </p>
                  </div>

                  {/* Info Badges */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                      <MapPin className="w-6 h-6 text-[#FF5722] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white uppercase">Location Address</div>
                        <div className="text-xs text-zinc-400 mt-1">450 Fitness Boulevard, Metro District, NY 10001</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                      <Clock className="w-6 h-6 text-[#FF5722] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white uppercase">Facility Opening Hours</div>
                        <div className="text-xs text-zinc-400 mt-1">Mon - Fri: 5:00 AM – 11:00 PM</div>
                        <div className="text-xs text-zinc-400">Sat - Sun: 6:00 AM – 9:00 PM</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                      <Phone className="w-6 h-6 text-[#FF5722] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white uppercase">Phone & Email</div>
                        <div className="text-xs text-zinc-400 mt-1">+1 (800) 555-FITZONE</div>
                        <div className="text-xs text-zinc-400">support@fitzonegym.com</div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Launcher Button */}
                  <a 
                    href="https://wa.me/15552345678?text=Hi%20FitZone!%20I'm%20interested%20in%20learning%20more%20about%20a%20membership."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" /> Instant WhatsApp Enquiry
                  </a>

                </div>

                {/* Interactive Contact Form */}
                <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#FF5722]" /> Send an Enquiry
                  </h3>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const newEnquiry = {
                        id: `enq-${Date.now()}`,
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        plan: formData.get('plan') || 'General Enquiry',
                        trainer: 'None',
                        message: formData.get('message'),
                        status: 'New',
                        createdAt: new Date().toLocaleString()
                      };
                      setEnquiries([newEnquiry, ...enquiries]);
                      showToast('Enquiry submitted! Our team will contact you shortly.');
                      e.target.reset();
                    }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Your Name *</label>
                        <input 
                          required 
                          type="text" 
                          name="name" 
                          placeholder="e.g. John Doe"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Email Address *</label>
                        <input 
                          required 
                          type="email" 
                          name="email" 
                          placeholder="john@example.com"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Interested Plan</label>
                        <select 
                          name="plan"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                        >
                          <option value="General Enquiry">General Information</option>
                          <option value="Basic Access">Basic Access ($29/mo)</option>
                          <option value="Pro Performance">Pro Performance ($59/mo)</option>
                          <option value="Elite VIP Coaching">Elite VIP Coaching ($119/mo)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Message / Fitness Goals *</label>
                      <textarea 
                        required 
                        rows="4" 
                        name="message" 
                        placeholder="Tell us about your fitness targets or any questions..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#FF5722] hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-[#FF5722]/30 transition"
                    >
                      Submit Enquiry
                    </button>
                  </form>

                </div>

              </div>

              {/* Map Placeholder */}
              <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-2xl h-64 overflow-hidden relative flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="w-10 h-10 text-[#FF5722] mx-auto mb-2 animate-bounce" />
                  <span className="text-sm font-bold text-white uppercase">FitZone Olympic Flagship Location</span>
                  <p className="text-xs text-zinc-400 mt-1">450 Fitness Boulevard, Metro District, NY 10001</p>
                  <span className="inline-block mt-3 bg-zinc-950 text-zinc-400 border border-zinc-800 text-[10px] px-3 py-1 rounded-full">
                    Interactive Map Embed Ready
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* ================= FOOTER ================= */}
          <footer className="bg-zinc-950 border-t border-zinc-900 py-16 text-xs text-zinc-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-10">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FF5722] flex items-center justify-center text-white">
                    <Dumbbell className="w-5 h-5 transform -rotate-45" />
                  </div>
                  <span className="text-xl font-black text-white italic uppercase">FIT<span className="text-[#FF5722]">ZONE</span></span>
                </div>
                <p className="text-zinc-500 leading-relaxed">
                  The ultimate destination for strength, hypertrophy, and functional fitness. Certified coaches, premier gear, non-stop support.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-sm mb-4">Quick Links</h4>
                <ul className="space-y-2.5">
                  <li><button onClick={() => scrollToSection('about')} className="hover:text-[#FF5722] transition">About FitZone</button></li>
                  <li><button onClick={() => scrollToSection('programs')} className="hover:text-[#FF5722] transition">Training Programs</button></li>
                  <li><button onClick={() => scrollToSection('trainers')} className="hover:text-[#FF5722] transition">Coaching Staff</button></li>
                  <li><button onClick={() => scrollToSection('pricing')} className="hover:text-[#FF5722] transition">Membership Plans</button></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-sm mb-4">Admin & System</h4>
                <ul className="space-y-2.5">
                  <li><button onClick={() => { setCurrentView('admin'); setAdminTab('dashboard'); }} className="hover:text-[#FF5722] transition">Admin Dashboard</button></li>
                  <li><button onClick={() => { setCurrentView('admin'); setAdminTab('setup'); }} className="hover:text-[#FF5722] transition">Supabase Setup Guide</button></li>
                  <li><span className="text-zinc-600">Privacy Policy & Terms</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-sm mb-4">Newsletter</h4>
                <p className="text-zinc-500 mb-3">Get weekly fitness tips, macro guides, and class alerts.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5722] w-full"
                  />
                  <button 
                    onClick={() => showToast('Subscribed to FitZone newsletter!')}
                    className="bg-[#FF5722] text-white px-3 py-2 rounded-lg font-bold"
                  >
                    Join
                  </button>
                </div>
              </div>

            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-12 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>© 2026 FitZone Gym Inc. All rights reserved.</p>
              <p className="text-zinc-500">Engineered for Peak Athletic Performance</p>
            </div>
          </footer>

        </main>
      ) : (
        /* =========================================================
            ADMIN CONTROL PANEL VIEW
        ========================================================= */
        <main className="flex-1 bg-zinc-950 min-h-[calc(100vh-80px)] flex flex-col md:flex-row">
          
          {/* Admin Sidebar Navigation */}
          <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="pb-4 border-b border-zinc-800">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-white">
                    {isAdminLoggedIn ? 'Logged in as Admin' : 'Demo Preview Mode'}
                  </span>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard Stats', icon: Activity },
                  { id: 'programs', label: 'Programs Manager', icon: Dumbbell },
                  { id: 'trainers', label: 'Trainer Roster', icon: Users },
                  { id: 'plans', label: 'Pricing Plans', icon: Trophy },
                  { id: 'enquiries', label: 'Signups & Enquiries', icon: Mail, badge: enquiries.length },
                  { id: 'setup', label: 'Supabase & SQL Setup', icon: Database }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setAdminTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition ${
                        adminTab === item.id
                          ? 'bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/30'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="bg-zinc-950 text-white text-[10px] px-2 py-0.5 rounded-full border border-zinc-800">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <button 
                onClick={() => setCurrentView('public')}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Exit Admin View
              </button>
            </div>
          </aside>

          {/* Admin Main Body Area */}
          <div className="flex-1 p-6 md:p-10 overflow-y-auto">
            
            {/* LOGIN GATE FOR REAL AUTH PREVIEW */}
            {!isAdminLoggedIn && adminTab !== 'setup' && (
              <div className="max-w-md mx-auto my-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FF5722]/20 text-[#FF5722] flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase">Admin Authentication</h3>
                  <p className="text-xs text-zinc-400 mt-1">Sign in to manage FitZone backend data</p>
                </div>

                {authError && (
                  <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {authError}
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="admin@fitzone.com" 
                      value={adminAuthInput.email}
                      onChange={(e) => setAdminAuthInput({...adminAuthInput, email: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Password</label>
                    <input 
                      type="password" 
                      placeholder="admin123" 
                      value={adminAuthInput.password}
                      onChange={(e) => setAdminAuthInput({...adminAuthInput, password: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#FF5722] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition"
                  >
                    Authenticate Admin
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
                  <button 
                    onClick={() => { setIsAdminLoggedIn(true); showToast('Entered Admin Demo Mode'); }}
                    className="text-xs text-zinc-400 hover:text-white underline font-semibold"
                  >
                    Or Bypass with Demo Interactive Access →
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: DASHBOARD STATS */}
            {(isAdminLoggedIn || adminTab === 'setup') && adminTab === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-white uppercase italic">Dashboard Overview</h2>
                  <p className="text-xs text-zinc-400 mt-1">Live metrics and active gym statistics</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-xs font-bold uppercase">Total Members</span>
                      <Users className="w-5 h-5 text-[#FF5722]" />
                    </div>
                    <div className="text-3xl font-black text-white">2,540</div>
                    <div className="text-[11px] text-emerald-400 mt-2 font-semibold">↑ +12.4% from last month</div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-xs font-bold uppercase">Est. Monthly Revenue</span>
                      <Trophy className="w-5 h-5 text-[#FF5722]" />
                    </div>
                    <div className="text-3xl font-black text-white">$142,800</div>
                    <div className="text-[11px] text-emerald-400 mt-2 font-semibold">↑ +8.1% target reached</div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-xs font-bold uppercase">Active Programs</span>
                      <Dumbbell className="w-5 h-5 text-[#FF5722]" />
                    </div>
                    <div className="text-3xl font-black text-white">{programs.length}</div>
                    <div className="text-[11px] text-zinc-400 mt-2 font-semibold">Across 6 Fitness Categories</div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-xs font-bold uppercase">Pending Enquiries</span>
                      <Mail className="w-5 h-5 text-[#FF5722]" />
                    </div>
                    <div className="text-3xl font-black text-white">{enquiries.length}</div>
                    <div className="text-[11px] text-amber-400 mt-2 font-semibold">Requires follow-up call</div>
                  </div>
                </div>

                {/* Quick Enquiries Recent Table */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white uppercase mb-4">Recent Membership Enquiries</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-zinc-300">
                      <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px]">
                        <tr>
                          <th className="p-3">Name</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Plan</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800">
                        {enquiries.map(enq => (
                          <tr key={enq.id}>
                            <td className="p-3 font-semibold text-white">{enq.name}</td>
                            <td className="p-3 text-zinc-400">{enq.email}</td>
                            <td className="p-3 text-[#FF5722] font-semibold">{enq.plan}</td>
                            <td className="p-3">
                              <span className="bg-orange-500/10 text-[#FF5722] px-2 py-1 rounded text-[10px] font-bold">
                                {enq.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: PROGRAM MANAGER */}
            {(isAdminLoggedIn || adminTab === 'setup') && adminTab === 'programs' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase italic">Gym Programs Management</h2>
                    <p className="text-xs text-zinc-400 mt-1">Add, update or delete fitness programs shown on public site</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newP = {
                        id: `p-${Date.now()}`,
                        title: 'New Powerlifting Routine',
                        category: 'Strength',
                        intensity: 'High',
                        duration: '60 mins',
                        description: 'Custom added training routine for strength gain.',
                        features: ['Custom Routine', 'Master Coach'],
                        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
                        schedule: 'Mon, Fri - 8:00 AM'
                      };
                      setPrograms([newP, ...programs]);
                      showToast('New Program added!');
                    }}
                    className="bg-[#FF5722] text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl flex items-center gap-2 shadow"
                  >
                    <Plus className="w-4 h-4" /> Add Program
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {programs.map((p) => (
                    <div key={p.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={p.image} alt={p.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-bold text-white text-sm">{p.title}</h4>
                          <span className="text-[10px] text-[#FF5722] uppercase font-bold">{p.category} • {p.duration}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setPrograms(programs.filter(item => item.id !== p.id));
                          showToast('Program deleted from roster');
                        }}
                        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: TRAINERS MANAGER */}
            {(isAdminLoggedIn || adminTab === 'setup') && adminTab === 'trainers' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase italic">Trainer Roster</h2>
                    <p className="text-xs text-zinc-400 mt-1">Manage certified coaches and trainer profiles</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newT = {
                        id: `t-${Date.now()}`,
                        name: 'New Certified Coach',
                        role: 'Personal Fitness Specialist',
                        specialty: 'Hypertrophy',
                        experience: '5 Years',
                        rating: 5.0,
                        bio: 'Expert coach dedicated to body recomposition.',
                        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800'
                      };
                      setTrainers([...trainers, newT]);
                      showToast('Trainer added to roster!');
                    }}
                    className="bg-[#FF5722] text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Trainer
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trainers.map((t) => (
                    <div key={t.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center gap-4">
                      <img src={t.image} alt={t.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm">{t.name}</h4>
                        <p className="text-xs text-[#FF5722]">{t.role}</p>
                        <span className="text-[10px] text-zinc-500 block mt-1">Experience: {t.experience}</span>
                      </div>
                      <button 
                        onClick={() => {
                          setTrainers(trainers.filter(item => item.id !== t.id));
                          showToast('Trainer removed');
                        }}
                        className="text-zinc-500 hover:text-red-400 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: ENQUIRIES MANAGER */}
            {(isAdminLoggedIn || adminTab === 'setup') && adminTab === 'enquiries' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-white uppercase italic">Customer Enquiries & Signups</h2>
                  <p className="text-xs text-zinc-400 mt-1">Manage public membership applications</p>
                </div>

                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div key={enq.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white text-base">{enq.name}</span>
                          <span className="bg-[#FF5722]/20 text-[#FF5722] text-[10px] font-bold px-2 py-0.5 rounded border border-[#FF5722]/30">
                            {enq.plan}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">Email: {enq.email} | Phone: {enq.phone}</p>
                        <p className="text-xs text-zinc-300 italic mt-2">"{enq.message}"</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button 
                          onClick={() => {
                            setEnquiries(enquiries.map(item => item.id === enq.id ? { ...item, status: 'Enrolled' } : item));
                            showToast('Status updated to Enrolled');
                          }}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                        >
                          Mark Enrolled
                        </button>
                        <button 
                          onClick={() => {
                            setEnquiries(enquiries.filter(item => item.id !== enq.id));
                            showToast('Enquiry entry deleted');
                          }}
                          className="text-zinc-500 hover:text-red-400 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SUPABASE DATABASE & ENVIRONMENT SETUP */}
            {adminTab === 'setup' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h2 className="text-2xl font-black text-white uppercase italic flex items-center gap-2">
                    <Database className="w-6 h-6 text-[#FF5722]" /> Supabase Integration & Setup
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    FitZone is pre-configured to sync with Supabase PostgreSQL or run in standalone offline preview mode.
                  </p>
                </div>

                {/* Setup Instructions */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-white text-sm uppercase">1. Environment Variables (.env)</h3>
                  <p className="text-xs text-zinc-400">Create a <code className="bg-zinc-950 px-2 py-1 rounded text-orange-400">.env</code> file in your project root with your credentials:</p>
                  
                  <div className="bg-zinc-950 p-4 rounded-xl font-mono text-xs text-zinc-300 border border-zinc-800 relative group">
                    <pre>{`VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here`}</pre>
                  </div>
                </div>

                {/* SQL Schema Script */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm uppercase">2. PostgreSQL Schema & RLS Policies</h3>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`
CREATE TABLE public.programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  intensity TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  plan TEXT,
  message TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Allow Public Visitors to Read Programs
CREATE POLICY "Allow public read access to programs" ON public.programs FOR SELECT USING (true);

-- Allow Visitors to Submit Enquiries
CREATE POLICY "Allow public insert to enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
                        `);
                        showToast('SQL Schema copied to clipboard!');
                      }}
                      className="text-xs text-[#FF5722] font-bold flex items-center gap-1 hover:underline"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy SQL
                    </button>
                  </div>

                  <p className="text-xs text-zinc-400">Run this script inside your Supabase SQL Editor to initialize database tables:</p>

                  <div className="bg-zinc-950 p-4 rounded-xl font-mono text-[11px] text-emerald-400 border border-zinc-800 overflow-x-auto max-h-60">
                    <pre>{`-- FitZone Gym Supabase Schema Setup Script
CREATE TABLE public.programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  intensity TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  plan TEXT,
  message TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;`}</pre>
                  </div>
                </div>

              </div>
            )}

          </div>
        </main>
      )}

      {/* =========================================================
          MODALS & OVERLAYS
      ========================================================= */}

      {/* 1. PROGRAM DETAILS MODAL */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="relative h-64">
              <img src={selectedProgram.image} alt={selectedProgram.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
              <button 
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 bg-zinc-950/80 p-2 rounded-full text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-4 left-6 bg-[#FF5722] text-white text-xs font-bold px-3 py-1 rounded-md">
                {selectedProgram.category}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-black text-white uppercase italic">{selectedProgram.title}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">{selectedProgram.description}</p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-white uppercase">Key Program Highlights:</span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProgram.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5722]" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">Weekly Schedule</span>
                  <span className="text-xs text-white font-semibold">{selectedProgram.schedule}</span>
                </div>
                <button 
                  onClick={() => {
                    const progName = selectedProgram.title;
                    setSelectedProgram(null);
                    handleOpenJoinModal('Pro Performance');
                  }}
                  className="bg-[#FF5722] hover:bg-orange-600 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl shadow-lg"
                >
                  Register For Program
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. COMPREHENSIVE JOIN / ENQUIRY MODAL */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-8 relative shadow-2xl my-8">
            <button 
              onClick={() => setJoinModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#FF5722]/20 text-[#FF5722] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic">START YOUR FITZONE MEMBERSHIP</h3>
              <p className="text-xs text-zinc-400 mt-1">Complete your registration application in under 60 seconds.</p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newSignup = {
                  id: `enq-${Date.now()}`,
                  name: formData.get('fullName'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  plan: formData.get('selectedPlan'),
                  trainer: formData.get('preferredTrainer') || 'None',
                  message: 'Direct Online Membership Sign Up Application',
                  status: 'New',
                  createdAt: new Date().toLocaleString()
                };
                setEnquiries([newSignup, ...enquiries]);
                setJoinModalOpen(false);
                showToast(`Welcome ${formData.get('fullName')}! Membership confirmation sent to email.`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Selected Membership Tier</label>
                <select 
                  name="selectedPlan"
                  defaultValue={selectedPlanForJoin || 'Pro Performance'}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                >
                  <option value="Basic Access">Basic Access ($29/mo)</option>
                  <option value="Pro Performance">Pro Performance ($59/mo)</option>
                  <option value="Elite VIP Coaching">Elite VIP Coaching ($119/mo)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Preferred Personal Coach (Optional)</label>
                <select 
                  name="preferredTrainer"
                  defaultValue={bookingTrainer || 'None'}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                >
                  <option value="None">No Trainer Preference</option>
                  {trainers.map(t => (
                    <option key={t.id} value={t.name}>{t.name} ({t.role})</option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Full Name *</label>
                  <input 
                    required 
                    type="text" 
                    name="fullName"
                    placeholder="Alex Smith" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Phone Number *</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone"
                    placeholder="+1 (555) 000-0000" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Email Address *</label>
                <input 
                  required 
                  type="email" 
                  name="email"
                  placeholder="alex@example.com" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-400">First Month Special Discount:</span>
                <span className="text-emerald-400 font-bold">30% OFF Applied</span>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#FF5722] hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-[#FF5722]/30 transition"
              >
                Confirm Membership Signup
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}