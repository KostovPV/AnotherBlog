// import { useContext, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/userContext';

// export default function Logout() {
//   const { setCurrentUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   setCurrentUser(null);
//   navigate('/login')
//   return (
//     <>
//     </>
//   )
// }
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export default function Logout() {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout actions after component has mounted
    setCurrentUser(null);
    navigate('/login');
  }, []); // Empty dependency array ensures this runs once after the component mounts

  return null;
}
