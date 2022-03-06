import { useState } from 'react';
import { ReactComponent as StackOrganizerLogo } from '../../../assets/stack-organizer-logo.svg';
import { SearchBar } from '../../../components/SearchBar';
import { motion } from 'framer-motion/dist/framer-motion';

export const Home = () => {
  const [showAccordion, setShowAccordion] = useState();
  const accordionHandler = () => {
    setShowAccordion((prev) => !prev);
  };
  return (
    <main className="private-homepage">
      <section className="private-homepage__logo-ctn">
        <StackOrganizerLogo className="private-homepage__logo" />
        <SearchBar hasButton={true} className="private-homepage__search" />
      </section>
      <section className="private-homepage__help">
        <button
          onClick={accordionHandler}
          className="private-homepage__accordion-btn"
        >
          How to Use
          {showAccordion ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 22h-24l12-20z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 21l-12-18h24z" />
            </svg>
          )}
        </button>
        {showAccordion && (
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <li>Search your question through Stack Overflow</li>
            <li>Go the details page of the question you searched for</li>
            <li>
              Either save an answer that is helpful, or save the question itself
              by clicking "Save As" at the bottom
            </li>
            <li>Select a project and folder to save it to</li>
            <li>
              Enter a file name and write any additional note you want to add
            </li>
            <li>Hit save and manage your saved file in Organize page!</li>
          </motion.ul>
        )}
      </section>
    </main>
  );
};
