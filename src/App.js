import React from 'react';
import './App.css';
import BookPage from './BookMain/BookPage';
import Service from './ServiceMain/Service';
import About from './AboutMain/About';
import Contact from './ContactMain/Contact';
import Home from './HomeMain/Home';
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/service" element={<Service/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/booking/:tripcode/:classService/:viaRoute/:routeNo/:deptTime/:servicePoint/:destination/:adultFare/:childFare/:selectedDatetime" element={<BookPage/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
