import './App.css';
import Header from './Components/Header/Header.jsx';
// import Footer from './Components/Footer/Footer.jsx';
import Home from './Components/Home.jsx';
import DescriptionCard from './Components/DescriptionCard/DescriptionCard.jsx';
function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <DescriptionCard />
    </div>
  );
}

export default App;
