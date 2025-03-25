import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page components
import Home from './pages/Home';
import About from './pages/About';
import VisionMission from './pages/VisionMission';
import PrincipalMessage from './pages/PrincipalMessage';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Events from './pages/Event';
import EventDetail from './pages/EventDetail';
import Gallery from './pages/Gallery';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import NotFound from './pages/NotFound';
import PrivateRoute from './context/PrivateRoute';
import UploadPhotos from './pages/admin/UploadPhotos';

// Admin pages with lazy loading
const AdminNews = React.lazy(() => import('./pages/admin/AdminNews'));
const AdminEvents = React.lazy(() => import('./pages/admin/AdminEvents'));
const AdminGallery = React.lazy(() => import('./pages/admin/AdminGallery'));
// const AdminAdmissions = React.lazy(() => import('./pages/admin/AdminAdmissions'));
const AdminGalleryUpload = React.lazy(() => import('./pages/admin/AdminGalleryUpload'));
const AdminGalleryView = React.lazy(() => import('./pages/admin/AdminGalleryView'));
const CreateNews = React.lazy(() => import('./pages/admin/CreateNews'));
const EditNews = React.lazy(() => import('./pages/admin/EditNews'));
const CreateEvent = React.lazy(() => import('./pages/admin/CreateEvent'));
const EditEvent = React.lazy(() => import('./pages/admin/EditEvent'));
const UploadPhotosLinks = React.lazy(() => import('./pages/admin/UploadPhotosLinks'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
          
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/vision-mission" element={<VisionMission />} />
              <Route path="/principal-message" element={<PrincipalMessage />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              "
              
              <Route path="/admin/dashboard" element={
                <PrivateRoute adminOnly={true}> 
                  <Dashboard />
                </PrivateRoute>
              } />
              
              
              <Route path="/admin/news" element={
                <PrivateRoute adminOnly={true}>
                <AdminNews />
                </PrivateRoute>
                } />
                <Route path="/admin/events" element={
                  <PrivateRoute adminOnly={true}>
                  <AdminEvents />
                  </PrivateRoute>
                  } />
               
              <Route path="/admin/gallery" element={
                <PrivateRoute adminOnly={true}>
                  <AdminGallery />
                </PrivateRoute>
              } />
              <Route path="/admin/admissions" element={
                <PrivateRoute adminOnly={true}>
                  {/* <AdminAdmissions /> */}
                </PrivateRoute>
              } />
              <Route path="/admin/gallery/create-album" element={
                <PrivateRoute adminOnly={true}>
                  <AdminGalleryUpload />
                </PrivateRoute>
              } />
              
              <Route path="/admin/gallery/view/:id" element={
                <PrivateRoute adminOnly={true}>
                  <AdminGalleryView />
                </PrivateRoute>
              } />
              <Route path="/admin/gallery/upload" element={
                <PrivateRoute adminOnly={true}>
                  <UploadPhotos />
                </PrivateRoute>
              } />
              <Route path="/admin/news/create" element={
                <PrivateRoute adminOnly={true}>
                  <CreateNews />
                </PrivateRoute>
              } />
              <Route path="admin/news/edit/:id" element={
                <PrivateRoute adminOnly={true}>
                  <EditNews />
                </PrivateRoute>
              } />
              <Route path="admin/events/create" element={
                <PrivateRoute adminOnly={true}>
                  <CreateEvent />
                </PrivateRoute>
              } />
              <Route path="admin/events/edit/:id" element={
                <PrivateRoute adminOnly={true}>
                  <EditEvent />
                </PrivateRoute>
              } />
              <Route path="/admin/gallery/uploadLinks" element={
                <PrivateRoute adminOnly={true}>
                  <UploadPhotosLinks />
                </PrivateRoute>
              } />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;