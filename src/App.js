import './App.css';
import Main from './main';
import Header from './header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="jump-rope-tournament-checker">
      <Header />
      <Main />
    </BrowserRouter>
  );
}

export default App;
