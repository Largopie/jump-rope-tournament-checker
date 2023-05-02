import './App.css';
import Main from './main';
import Header from './header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrintPrize from './printPrize';
import PrintPlayer from './printPlayer';
import PrintOrgPlayers from './printOrg-players';
import UpdatePlayer from './components/player/updatePlayer';
import PrintPrizeFilter from './printPrizeFilter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<><Header /><Main /></>} />
        <Route path="printPrize" element={<PrintPrize />} />
        <Route path="printPrizeFilter" element={<PrintPrizeFilter />} />
        <Route path="printPlayer" element={<PrintPlayer />} />
        <Route path="printOrg-players" element={<PrintOrgPlayers />} />
        <Route path="updatePlayer" element={<UpdatePlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
