import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Navigation from './components/Navigation'
import HeroVideo from './components/HeroVideo'
import About from './components/About'
import AnimatedStats from './components/AnimatedStats'
import Objectives from './components/Objectives'
import Commitments from './components/Commitments'
import CoreValues from './components/CoreValues'
import InteractiveShowcase from './components/InteractiveShowcase'
import Solutions from './components/Solutions'
import VideoGallery from './components/VideoGallery'
import CivilWorks from './components/CivilWorks'
import Services from './components/Services'
import Projects from './components/Projects'
import FAQ from './components/FAQ'
import Partners from './components/Partners'
import Contact from './components/Contact'
import Chatbot from './components/Chatbot'

// Admin Pages
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './pages/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminSettings from './pages/AdminSettings'
import AdminAbout from './pages/AdminAbout'
import AdminObjectives from './pages/AdminObjectives'
import AdminCommitments from './pages/AdminCommitments'
import AdminCoreValues from './pages/AdminCoreValues'
import AdminServices from './pages/AdminServices'
import AdminProjects from './pages/AdminProjects'
import AdminVideos from './pages/AdminVideos'
import AdminFAQs from './pages/AdminFAQs'
import AdminPartners from './pages/AdminPartners'
import AdminContact from './pages/AdminContact'
import AdminMessages from './pages/AdminMessages'

function HomePage() {
  // Log to help debug deployment issues
  console.log('HomePage component rendering')

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroVideo />
      <About />
      <AnimatedStats />
      <Objectives />
      <Commitments />
      <CoreValues />
      <InteractiveShowcase />
      <Solutions />
      <VideoGallery />
      <CivilWorks />
      <Services />
      <Projects />
      <FAQ />
      <Partners />
      <Contact />
      <Chatbot />
    </div>
  )
}

function App() {
  console.log('App component rendering')
  console.log('Environment:', {
    hasSupabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
    hasSupabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
  })

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
        <Route path="/admin/about" element={<AdminLayout><AdminAbout /></AdminLayout>} />
        <Route path="/admin/objectives" element={<AdminLayout><AdminObjectives /></AdminLayout>} />
        <Route path="/admin/commitments" element={<AdminLayout><AdminCommitments /></AdminLayout>} />
        <Route path="/admin/core-values" element={<AdminLayout><AdminCoreValues /></AdminLayout>} />
        <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
        <Route path="/admin/projects" element={<AdminLayout><AdminProjects /></AdminLayout>} />
        <Route path="/admin/videos" element={<AdminLayout><AdminVideos /></AdminLayout>} />
        <Route path="/admin/faqs" element={<AdminLayout><AdminFAQs /></AdminLayout>} />
        <Route path="/admin/partners" element={<AdminLayout><AdminPartners /></AdminLayout>} />
        <Route path="/admin/contact" element={<AdminLayout><AdminContact /></AdminLayout>} />
        <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />

        {/* Redirect /admin to /admin/login */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* 404 - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
