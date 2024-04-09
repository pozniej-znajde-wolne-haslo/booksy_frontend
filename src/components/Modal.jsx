import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../context/Context';
import { PiShoppingCartSimple, PiShoppingCartSimpleBold } from 'react-icons/pi';
import PropTypes from 'prop-types';

export default function Modal({
  toggleModal,
  basketLinkActive,
  setBasketLinkActive,
}) {
  const {
    user,
    setUser,
    setBasket,
    hideUpdateDeleteBookForms,
    handleBooksDisplay,
  } = useContext(Context);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
    setBasket(null);
    localStorage.removeItem('basket');
    setBasketLinkActive(false);
  };

  return (
    <div className='overlay' onClick={toggleModal}>
      <div className='modal'>
        <p className='closeBtn' onClick={toggleModal}>
          &times;
        </p>

        <ul className='modal-links'>
          <li
            onClick={() => {
              hideUpdateDeleteBookForms;
              setBasketLinkActive(false);
            }}
          >
            <NavLink to='/'>Home</NavLink>
          </li>
          <li
            onClick={() => {
              handleBooksDisplay;
              setBasketLinkActive(false);
            }}
          >
            <NavLink to='/books/selection'>Books</NavLink>
          </li>
          <li
            onClick={() => {
              hideUpdateDeleteBookForms;
              setBasketLinkActive(true);
            }}
          >
            <NavLink to='/cart'>
              {basketLinkActive ? (
                <PiShoppingCartSimpleBold size={26} />
              ) : (
                <PiShoppingCartSimple /* fa-5x='true' */ size={24} />
              )}
            </NavLink>
          </li>

          {!user ? (
            <>
              <li onClick={() => setBasketLinkActive(false)}>
                <NavLink to='/register'>Register</NavLink>
              </li>
              <li onClick={() => setBasketLinkActive(false)}>
                <NavLink to='/login'>Login</NavLink>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  hideUpdateDeleteBookForms;
                  setBasketLinkActive(false);
                }}
              >
                <NavLink to='/profile'>Profile</NavLink>
              </li>

              <li onClick={logout}>
                <NavLink to='/login'>Logout</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  basketLinkActive: PropTypes.bool,
  setBasketLinkActive: PropTypes.func,
};
