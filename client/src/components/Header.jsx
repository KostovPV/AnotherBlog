
import { Link } from 'react-router-dom';
import Logo from "../images/logo.jpeg";
import { FaBars} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';


export default function Header() {
  return (
    <nav>
      <div className='container nav__container'>
        <Link to="/" className='nav__logo'>
          <img src={Logo} alt='logo-image'/>
        </Link>
        <ul className="nav__menu">
          <li><Link to='/profile'>Sangare </Link></li>
          <li><Link to='/create'>Create post </Link></li>
          <li><Link to='/authors'>Authors </Link></li>
          <li><Link to='/logout'>Logout </Link></li>
        </ul>
        <button className="nav__toggle-btn">
          <AiOutlineClose />
        </button>
      </div>

    </nav>
  )
}
