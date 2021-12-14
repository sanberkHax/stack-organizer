import { Public } from './pages/Public/Public';
import { Private } from './pages/Private/Private';
import { Footer } from './components/Footer';
function App() {
  const isLoggedIn = true;

  return (
    <div className="app">
      {isLoggedIn ? <Private /> : <Public />}
      <Footer />
    </div>
  );
}

export default App;
