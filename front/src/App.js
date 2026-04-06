import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './commponents/Header';
import Apartment from './commponents/Apartment';
import About from './commponents/About';
import House from './commponents/House';
import Lot from './commponents/Lot'
import Realtor from './commponents/Realtor';
import Contact from './commponents/Contact'
import Card from './commponents/Card';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/apartment" element={<Apartment />} />
        <Route path="/house" element={<House />} />
        <Route path='/lot' element={<Lot />} />
        <Route path='realtor' element={<Realtor />} />
        <Route path='contact' element={<Contact />} />
        <Route path='/card' element={<Card />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;