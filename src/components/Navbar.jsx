import { useContext, useState } from 'react';
import { PiShoppingCartSimple, PiShoppingCartSimpleBold } from 'react-icons/pi';
import { FaBars } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import Modal from './Modal';
import BooksyLogo from '../assets/BooksyLogo';

export default function Navbar() {
  const navigate = useNavigate();
  const {
    user,
    setUser,
    setCurrentPage,
    hideUpdateDeleteBookForms,
    setBasket,
  } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [basketLinkActive, setBasketLinkActive] = useState(false);

  // (when Books-link clicked) - display all books again / go back to page 1 / hide update/delete book components
  const handleBooksDisplay = () => {
    setCurrentPage(1);
    hideUpdateDeleteBookForms();
    navigate('/books/selection');
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
    setBasket(null);
    localStorage.removeItem('basket');
    setBasketLinkActive(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <header>
      <nav>
        <div className='y' onClick={hideUpdateDeleteBookForms}>
          <p>
            <NavLink className='shop-logo' to='/'>
              Booksy
            </NavLink>
          </p>

          <div className='z'>
            <BooksyLogo />
          </div>
        </div>

        <FaBars
          size={24}
          color={'#3c4f58'}
          className='burger-menu'
          onClick={toggleModal}
        />

        {showModal && (
          <Modal
            /*    showModal={showModal}
            setShowModal={setShowModal} */
            toggleModal={toggleModal}
            basketLinkActive={basketLinkActive}
            setBasketLinkActive={setBasketLinkActive}
          />
        )}

        <ul className='desktop-links'>
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
                <PiShoppingCartSimpleBold size={22} />
              ) : (
                <PiShoppingCartSimple /* fa-5x='true'  */ size={20} />
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
      </nav>
    </header>
  );
}
