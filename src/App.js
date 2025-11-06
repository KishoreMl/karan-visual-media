import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Home from './Components/Home.jsx';
import DescriptionCard from './Components/DescriptionCard/DescriptionCard.jsx';
import DescriptiveContent from './Components/DescriptiveContent/DescriptiveContent.jsx';
import Footer from './Components/Footer/Footer.jsx';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Home />
        <DescriptionCard />
        <DescriptiveContent />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
