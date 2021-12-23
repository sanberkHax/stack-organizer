import { Public } from '../pages/Public/Public';
import { Private } from '../pages/Private/Private';
import { Footer } from '../components/Footer';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="app">
      {isLoggedIn ? <Private /> : <Public />}
      <Footer />
    </div>
  );
}

export default App;
