import  { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Loader from '../components/Loader';

export default function DeletePost({postId: id}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //redirect to login page for any user who is nod logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  const removePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {withCredentials:true, headers: {Authorization: `Bearer ${token}`}});
      if(response.status == 200) {
        if(location.pathname == `/myposts/${currentUser.id}`) {
            navigate(0)
        } else {
          navigate('/')
        }
      }
    } catch (error) {
      
    }
    setIsLoading(false);

  }
  if(isLoading) {
    return < Loader />
  }

  return (
    <Link className='btn sm danger' onClick={() =>removePost(id) }>Delete</Link>
  )
}
