import { FaHome } from 'react-icons/fa';
import './_NotFound.scss';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='notFound-container'>
      <h2 className='notFound-msg'> Oops!</h2>
      <p>404 - Page not found!</p>
      {/* stye as BTN !! */}
      <NavLink to='/'>
        <button>
          <FaHome size={18} />
          Back to Homepage
        </button>
      </NavLink>
    </div>
  );
}
