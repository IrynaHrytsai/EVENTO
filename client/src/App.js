import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventsBoard from './components/EventsBoard';
import RegisterEvent from './components/RegisterEvent';
import Participants from './components/Participants';
import ParticipantDetail from './components/ParticipantDetail';
import Success from './components/Success';
import HomePage from './components/HomePage'; 
import Footer from './components/Footer'; 
import ContactUs from './components/ContactUs'; 
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-10">
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/events" element={<EventsBoard />} /> 
            <Route path="/register/:eventId" element={<RegisterEvent />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/participants/:eventId" element={<ParticipantDetail />} />
            <Route path="/success" element={<Success />} />
            <Route path="/contact" element={<ContactUs />} /> 
          </Routes>
        </main>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
