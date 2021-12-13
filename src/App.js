import { Home } from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
