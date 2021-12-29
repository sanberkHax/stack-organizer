import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from '../NotFound';
import { Header } from '../../components/Header';
export const Private = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header page="home" />} />
        <Route path="*" element={<Header />} />
      </Routes>

      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
