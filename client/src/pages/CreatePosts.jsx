import { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreatePosts() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //redirect to login page for any user who is nod logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': "bullet" }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', "bullet", 'indent',
    'link', 'image'
  ]

  const POST_CATEGORIES = [
    "Agriculture", "Buisiness", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"
  ];

  const createPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      if(response.status == 201) {
        return navigate('/');
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }


  return (
    <section className='create-post' onSubmit={createPost}>
      <div className="container">
        <h2>Create post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post__form">
          <input type="text" name='title' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <select name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription}></ReactQuill>
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' />
          <button type='submit' className='btn primary'>Create</button>
        </form>
      </div>
    </section>
  )
}
