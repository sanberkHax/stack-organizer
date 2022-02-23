import { Routes, Route } from 'react-router-dom';
import { Home } from './Home/Home';
import { Search } from './Search/Search';
import { NotFound } from '../NotFound';
import { Header } from '../../components/Header';
import { HomepageHeader } from '../../components/HomepageHeader';
import { QuestionDetails } from './QuestionDetails/QuestionDetails';
import { Organize } from './Organize/Organize';
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
        <Route path="questions/:questionId" element={<QuestionDetails />} />
        <Route path="organize" element={<Organize />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
