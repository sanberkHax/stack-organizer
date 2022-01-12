import { Routes, Route } from 'react-router-dom';
import { Home } from './Home/Home';
import { Search } from './Search/Search';
import { NotFound } from '../NotFound';
import { Header } from '../../components/Header';
import { HomepageHeader } from '../../components/HomepageHeader';
export const Private = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomepageHeader />} />
        <Route path="*" element={<Header />} />
      </Routes>

      <Routes>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
