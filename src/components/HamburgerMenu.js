import { Divide as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';
import { Link } from 'react-router-dom';
import { ReactComponent as OrganizeIcon } from '../assets/organize-button.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout-button.svg';
export const HamburgerMenu = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleHandler = (toggled) => {
    if (toggled) {
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
    }
  };
  const clickHandler = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };
  const logOutHandler = () => {
    dispatch(logOut());
  };
  return (
    <div className="hamburger-menu">
      <Hamburger
        onToggle={toggleHandler}
        toggle={setMenuOpen}
        toggled={menuOpen}
        size="36"
        color="#1C5274"
        easing="ease-out"
      />
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="hamburger-menu__sidebar"
            exit={{ opacity: 0, x: 20 }}
          >
            <Link
              className="organize-link"
              onClick={clickHandler}
              to="organize"
            >
              <OrganizeIcon />
              <p>Organize</p>
            </Link>
            <Link className="logout-link" onClick={logOutHandler} to="/">
              <LogoutIcon />
              <p>Logout</p>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
