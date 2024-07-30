import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';
import { useAuth } from '../../context/AuthContext';

const FeedbackDetail = () => {
  const { category, id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  const getCategoryInKorean = (category) => {
    const categoryMap = {
      abs: '복근',
      chest: '가슴',
      arm: '팔',
      back: '등',
      evaluation: '심사',
      leg: '하체',
      shoulder: '어깨',
    };
    return categoryMap[category] || category;
  };

  useEffect(() => {
    // 실제 데이터 가져오기
    const fetchPost = async () => {
      // 임시 데이터
      const samplePost = {
        id: id,
        category: category,
        title: '복근 운동 피드백 부탁드려요',
        author: '헬스초보',
        date: '2024-07-24',
        content: '복근 운동을 시작한 지 얼마 안 됐는데, 제 자세가 맞는지 봐주세요. 어떤 점을 개선해야 할까요?',
        image:
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
      };
      setPost(samplePost);

      // 임시 댓글 데이터
      const sampleComments = [
        { id: 1, author: '헬스마스터', content: '자세가 좋아 보입니다. 계속 유지하세요!', date: '2024-07-25' },
        { id: 2, author: '운동전문가', content: '복부에 더 집중해보세요. 좋은 시작입니다!', date: '2024-07-26' },
      ];
      setComments(sampleComments);
    };

    fetchPost();
  }, [category, id]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitComment();
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    submitComment();
  };

  const submitComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObj = {
      id: comments.length + 1,
      author: user?.name || '익명',
      content: newComment,
      date: new Date().toISOString().split('T')[0],
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white pb-16">
      <Header isAuthenticated={isAuthenticated} />
      <div className="mt-8">
        <Link to="/feedback" className="text-[#2EC4B6] mb-4 block">
          &lt; 돌아가기
        </Link>
        <h1 className="mb-4 text-2xl font-GmarketBold">{post.title}</h1>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-GmarketMedium text-[#2EC4B6]">{getCategoryInKorean(post.category)}</span>
          <div>
            <span className="mr-2 text-sm font-GmarketLight">{post.author}</span>
            <span className="text-sm font-GmarketLight">{post.date}</span>
          </div>
        </div>
        {post.image && <img src={post.image} alt="게시물 이미지" className="w-full mb-4 rounded-lg" />}
        <p className="mb-8 text-base font-GmarketLight">{post.content}</p>

        {/* 댓글 */}
        <div className="mt-8">
          <h2 className="mb-4 text-md font-GmarketBold">댓글</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="p-3 mb-4 bg-gray-100 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-GmarketMedium">{comment.author}</span>
                <span className="text-xs text-gray-500">{comment.date}</span>
              </div>
              <p className="text-xs font-GmarketLight">{comment.content}</p>
            </div>
          ))}

          {/* 새 댓글 폼 */}
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#2EC4B6] focus:border-[#2EC4B6] transition duration-200 ease-in-out"
              rows="3"
              placeholder="댓글을 작성해주세요..."
            ></textarea>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-[#2EC4B6] text-white rounded-lg hover:bg-[#25a093] transition duration-200 ease-in-out"
            >
              댓글 작성
            </button>
          </form>
        </div>
      </div>
      <AppBar />
    </div>
  );
};

export default FeedbackDetail;
