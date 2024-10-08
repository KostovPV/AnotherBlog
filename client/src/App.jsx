
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from './pages/UserProfile'
import CreatePosts from "./pages/CreatePosts";
import EditPost from "./pages/EditPost";
import Authors from "./pages/Authors";
import Dashboard from "./pages/Dashboard";
import CategoryPosts from "./pages/CategoryPosts";
import Logout from "./pages/Logout";
import AuthorPosts from './pages/AuthorPosts';
import DeletePost from './pages/DeletePost';
import UserProvider from './context/userContext';
import Test from './components/Test';


const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layout /></UserProvider>,
    errorElement: < ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "profile/:id", element: < UserProfile /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "posts/users/:id", element: <AuthorPosts /> },
      { path: "posts/categories/:category", element: <CategoryPosts /> },
      { path: "create", element: <CreatePosts /> },
      { path: "authors", element: <Authors /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "logout", element: <Logout /> },
      { path: "test", element: <Test /> },


    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  )
}

export default App
