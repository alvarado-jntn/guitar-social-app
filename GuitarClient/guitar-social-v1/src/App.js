import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import NotFound from './Components/NotFound/NotFound';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Posts from './Components/Posts/Posts';
import Logout from './Components/Logout/Logout';
import AddNewPost from './Components/Posts/AddNewPost';
import ViewOnePost from './Components/Posts/ViewOnePost';
import Profile from './Components/Profile/Profile';
import MyPosts from './Components/Posts/MyPosts';
import EditPost from './Components/Posts/EditPost';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/newPost" element={<AddNewPost />} />
          <Route path="/viewOnePost/:postId" element={<ViewOnePost />} />
          <Route path='/myProfile/:userId' element={<Profile />} />
          <Route path='/myPosts/:userId' element={<MyPosts />} />
          <Route path='/editPost/:postId' element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
