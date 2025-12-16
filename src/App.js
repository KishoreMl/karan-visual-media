import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Components/Header/Header.jsx';
import Home from './Components/Home/Home.jsx';
import Works from './Components/Works/Works.jsx';
import WorkDetail from './Components/Works/WorkDetail.jsx';
import Services from './Components/Services/Services.jsx';
import AboutUs from './Components/AboutUs/AboutUs.jsx';
import Contact from './Components/Contact/Contact.jsx';
import Footer from './Components/Footer/Footer.jsx';
import CustomCursor from './Components/CustomCursor/CustomCursor.jsx';
import ThemeToggleButton from './Components/Header/ThemeToggleButton.jsx';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className="App" data-theme={isDarkMode ? 'dark' : 'light'}>
        <CustomCursor />
        <Header isDarkMode={isDarkMode} />
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/works" element={<Works />} />
            <Route path="/works/:workSlug" element={<WorkDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        <Footer />
        
        <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </Router>
  );
}

export default App;
