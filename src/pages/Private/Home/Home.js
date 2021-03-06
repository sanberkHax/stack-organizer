import { useState } from 'react';
import { ReactComponent as StackOrganizerLogo } from '../../../assets/stack-organizer-logo.svg';
import { SearchBar } from '../../../components/SearchBar';
import { HelpIcon } from '../../../components/HelpIcon';
import { Backdrop } from '../../../components/Backdrop';
import { motion } from 'framer-motion/dist/framer-motion';

export const Home = () => {
  const [helpModal, setHelpModal] = useState();
  const helpModalHandler = () => {
    setHelpModal((prev) => !prev);
  };
  return (
    <main className="private-homepage">
      <section className="private-homepage__logo-ctn">
        <StackOrganizerLogo className="private-homepage__logo" />
        <SearchBar hasButton={true} className="private-homepage__search" />
      </section>
      {helpModal && (
        <>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="private-homepage__help"
          >
            <h2 className="heading-secondary private-homepage__help__heading">
              How To Use
            </h2>
            <ul>
              <li>Search your question through Stack Overflow</li>
              <li>Go the details page of the question you searched for</li>
              <li>
                Either save an answer that is helpful, or save the question
                itself by clicking "Save As" at the bottom
              </li>
              <li>Select a project and folder to save it to</li>
              <li>
                Enter a file name and write any additional note you want to add
              </li>
              <li>Hit save and manage your saved file in Organize page!</li>
            </ul>
          </motion.section>
          <Backdrop onClick={helpModalHandler} />
        </>
      )}
      <button
        className="private-homepage__help__btn"
        onClick={helpModalHandler}
      >
        <HelpIcon />
      </button>
    </main>
  );
};
