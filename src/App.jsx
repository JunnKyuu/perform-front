import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Callback from './components/Login/Callback';
import Board from './pages/Board';
import ProtectedRoute from './components/ProtectedRoute';
import MyPage from './pages/MyPage';
import Alarm from './pages/Alarm';
import Notfound from './pages/Notfound';

const App = () => {
  return (
    <AuthProvider>
      <div className="w-[100vw] h-[auto] bg-gray-200 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/kakao/callback" element={<Callback />} />
          <Route path="/board" element={<ProtectedRoute element={<Board />} />} />
          <Route path="/myPage" element={<ProtectedRoute element={<MyPage />} />} />
          <Route path="/alarm" element={<ProtectedRoute element={<Alarm />} />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
