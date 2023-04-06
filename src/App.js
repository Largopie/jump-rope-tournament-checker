import './App.css';
import Main from './main';
import Header from './header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Print from './printFile';

function App() {
  return (
    <BrowserRouter basename="jump-rope-tournament-checker">
      
      <Routes>
        <Route path="*" element={<><Header /><Main /></>} />
        <Route path="/print" element={<Print />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
