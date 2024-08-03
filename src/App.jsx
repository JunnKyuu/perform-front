import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Callback from './components/Login/Callback';
import MyPage from './pages/MyPage';
import Notfound from './pages/Notfound';

import FeedbackCommunity from './pages/feedbackCommunity/FeedbackCommunity';
import FeedbackDetail from './pages/feedbackCommunity/FeedbackDetail';
import CategoryFeedback from './pages/feedbackCommunity/CategoryFeedback';
import EvaluationDetail from './pages/feedbackCommunity/EvaluationDetail';
import WritePost from './pages/WritePost';
import EditPostPage from './pages/\bEditPostPage';

import RoutineNutritionCommunity from './pages/routineNutritionCommunity/RoutineNutritionCommunity';
import RoutineNutritionDetail from './pages/routineNutritionCommunity/RoutineNutritionDetail';
import CategoryRoutineNutrition from './pages/routineNutritionCommunity/CategoryRoutineNutrition';

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
          <Route path="/feedback" element={<FeedbackCommunity />} />
          <Route path="/feedback/:postId" element={<FeedbackDetail />} />
          <Route path="/feedback/evaluation/:postId" element={<EvaluationDetail />} />
          <Route path="/feedback/category/:category" element={<CategoryFeedback />} />
          <Route path="/write-post" element={<ProtectedRoute element={<WritePost />} />} />
          <Route path="/my-page" element={<ProtectedRoute element={<MyPage />} />} />
          <Route path="/edit-post/:postId" element={<ProtectedRoute element={<EditPostPage />} />} />
          <Route path="/routine-nutrition" element={<RoutineNutritionCommunity />} />
          <Route path="/routine-nutrition/:category/:postId" element={<RoutineNutritionDetail />} />
          <Route path="/routine-nutrition/:category" element={<CategoryRoutineNutrition />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
