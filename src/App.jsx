import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Navbar from './components/UI/Navbar'
import HeroSplit from './components/Hero/HeroSplit'
import StatsMarcador from './components/Stats/StatsMarcador'
import VideosPaneles from './components/Videos/VideosPaneles'
import GalleryCarriles from './components/Gallery/GalleryCarriles'
import PressRecortes from './components/Press/PressRecortes'
import ContactTarjetas from './components/Contact/ContactTarjetas'
import Footer from './components/UI/Footer'

const AdminPage = lazy(() => import('./pages/AdminPage'))

function Landing() {
  return (
    <>
      <Navbar />
      <Box as="main" bg="brand.dark" overflowX="clip">
        <HeroSplit />
        <StatsMarcador />
        <VideosPaneles />
        <GalleryCarriles />
        <PressRecortes />
        <ContactTarjetas />
      </Box>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<Suspense fallback={null}><AdminPage /></Suspense>} />
    </Routes>
  )
}
