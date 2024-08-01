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
import EvaluationDetail from './pages/feedbackCommunity/EvaluationDetail';
import WritePost from './pages/WritePost';

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
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/kakao/callback" element={<Callback />} />
          <Route path="/feedback" element={<ProtectedRoute element={<FeedbackCommunity />} />} />
          <Route path="/feedback/:category/:id" element={<ProtectedRoute element={<FeedbackDetail />} />} />
          <Route path="/feedback/evaluation/:id" element={<ProtectedRoute element={<EvaluationDetail />} />} />
          <Route path="/feedback/:category" element={<ProtectedRoute element={<CategoryFeedback />} />} />
          <Route path="/write-post" element={<ProtectedRoute element={<WritePost />} />} />
          <Route path="/my-page" element={<ProtectedRoute element={<MyPage />} />} />
          <Route path="/alarm" element={<ProtectedRoute element={<Alarm />} />} />
          <Route path="/routine-nutrition" element={<ProtectedRoute element={<RoutineNutritionCommunity />} />} />
          <Route
            path="/routine-nutrition/:category/:id"
            element={<ProtectedRoute element={<RoutineNutritionDetail />} />}
          />
          <Route
            path="/routine-nutrition/:category"
            element={<ProtectedRoute element={<CategoryRoutineNutrition />} />}
          />
          <Route path="*" element={<ProtectedRoute element={<Notfound />} />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
