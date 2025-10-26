import './App.css';
import Header from './Components/Header/Header.jsx';
// import Footer from './Components/Footer/Footer.jsx';
import Content from './Components/Content.jsx';
import DescriptionCard from './Components/DescriptionCard/DescriptionCard.jsx';
function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <DescriptionCard />
    </div>
  );
}

export default App;
