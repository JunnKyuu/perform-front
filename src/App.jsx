import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Callback from './components/Login/Callback';
import Alarm from './pages/Alarm';
import MyPage from './pages/MyPage';
import Notfound from './pages/Notfound';

import FeedbackCommunity from './pages/feedbackCommunity/FeedbackCommunity';
import FeedbackDetail from './pages/feedbackCommunity/FeedbackDetail';
import CategoryFeedback from './pages/feedbackCommunity/CategoryFeedback';
import WritePost from './pages/WritePost';

import RoutineNutritionCommunity from './pages/routineNutritionCommunity/RoutineNutritionCommunity';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <div className="w-[100vw] h-[auto] bg-gray-200 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/kakao/callback" element={<Callback />} />
          <Route path="/feedback" element={<ProtectedRoute element={<FeedbackCommunity />} />} />
          <Route path="/feedback/:category/:id" element={<FeedbackDetail />} />
          <Route path="/feedback/:category" element={<CategoryFeedback />} />
          <Route path="/write-post" element={<WritePost />} />
          <Route path="/myPage" element={<ProtectedRoute element={<MyPage />} />} />
          <Route path="/alarm" element={<ProtectedRoute element={<Alarm />} />} />
          <Route path="/routineNutrition" element={<RoutineNutritionCommunity />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
