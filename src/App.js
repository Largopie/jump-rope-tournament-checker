import './App.css';
import Main from './main';
import Header from './header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrintPrize from './printPrize';
import PrintPlayer from './printPlayer';

function App() {
  return (
    <BrowserRouter basename="/jump-rope-tournament-checker/">
      
      <Routes>
        <Route path="*" element={<><Header /><Main /></>} />
        <Route path="printPrize" element={<PrintPrize />} />
        <Route path="/print/player" element={<PrintPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
