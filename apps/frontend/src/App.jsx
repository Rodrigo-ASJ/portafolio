import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import ProjectDetailPage from './pages/ProjectDetailPage.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminNewProject from './pages/AdminNewProject.jsx'
import AdminEditProject from './pages/AdminEditProject.jsx'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/projects" element={<AdminDashboard />} />
            <Route path="/admin/projects/new" element={<AdminNewProject />} />
            <Route path="/admin/projects/:id/edit" element={<AdminEditProject />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
