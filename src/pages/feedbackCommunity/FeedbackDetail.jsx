import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';
import { useAuth } from '../../context/AuthContext';

const FeedbackDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { state } = useAuth();
  const { isAuthenticated, user } = state;
  const [likedComments, setLikedComments] = useState({});
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [error, setError] = useState(null);

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
    if (location.state && location.state.postData) {
      const data = location.state.postData;
      console.log(data);

      setPost(data);
      setLikes(data.likes);
      setIsLiked(data.liked);
      setComments(data.comments || []);
    } else {
      setError('게시물 데이터를 찾을 수 없습니다.');
    }
  }, [location.state]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLoginMessage(true);
    } else {
      submitComment();
    }
  };

  const submitComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObj = {
      commentId: comments.length + 1,
      postId: postId,
      userId: user?.id ? parseInt(user.id, 10) : 0,
      user: user?.name || '익명',
      master: user?.master || false,
      content: newComment,
      likes: 0,
      date: new Date().toISOString().split('T')[0],
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const handleLike = (commentId) => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
    } else {
      setComments(
        comments.map((comment) => {
          if (comment.commentId === commentId) {
            const newLikes = likedComments[commentId] ? comment.likes - 1 : comment.likes + 1;
            return { ...comment, likes: newLikes };
          }
          return comment;
        })
      );
      setLikedComments((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
      }));
    }
  };

  const handlePostLike = () => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
    } else {
      setIsLiked(!isLiked);
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
      // 여기에 서버로 좋아요 상태를 업데이트하는 로직을 추가
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // 슬라이더 세팅
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (error) return <div>오류 발생: {error}</div>;
  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white pb-16">
      <Header isAuthenticated={isAuthenticated} />
      <div className="mt-8">
        <button onClick={handleGoBack} className="text-[#2EC4B6] mb-4 block font-GmarketMedium">
          &lt; 돌아가기
        </button>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-GmarketBold">{post.title}</h1>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-GmarketMedium text-[#2EC4B6]">{getCategoryInKorean(post.category)}</span>
          <div>
            <span className="mr-2 text-sm font-GmarketLight">{post.user}</span>
            <span className="text-sm font-GmarketLight">{post.date}</span>
          </div>
        </div>
        {post.attachments && post.attachments.length > 0 && (
          <div className="mb-10">
            <Slider {...settings}>
              {post.attachments.map((attachment, index) => (
                <div key={index}>
                  <img src={attachment.filePath} alt={`게시물 이미지 ${index + 1}`} className="w-full rounded-lg" />
                </div>
              ))}
            </Slider>
          </div>
        )}
        <p className="mb-8 text-base font-GmarketLight">{post.content}</p>

        {/* 좋아요 버튼 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handlePostLike}
            className={`flex items-center px-4 py-2 rounded-full ${
              isLiked ? 'bg-[#FF6B6B] text-white' : 'bg-gray-200 text-gray-800'
            } transition duration-200`}
          >
            <span className="mr-2">{isLiked ? '❤️' : '🤍'}</span>
            <span>{likes}</span>
          </button>
        </div>

        {/* 댓글 */}
        <div className="mt-8">
          <h2 className="mb-4 text-md font-GmarketBold">댓글</h2>
          {comments.map((comment) => (
            <div key={comment.commentId} className="px-3 py-2 mb-4 bg-gray-100 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-sm font-GmarketMedium">{comment.user}</span>
                  {comment.master && (
                    <span className="ml-2 px-1 py-1 text-[10px] font-GmarketMedium bg-[#2EC4B6] text-white rounded-full">
                      고수
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 font-GmarketLight">{comment.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="mb-2 text-xs font-GmarketLight">{comment.content}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => handleLike(comment.commentId)}
                    className={`text-md mr-2 ${likedComments[comment.commentId] ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    {likedComments[comment.commentId] ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* 새 댓글 폼 */}
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="font-GmarketLight text-sm w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#2EC4B6] focus:border-[#2EC4B6] transition duration-200"
              rows="3"
              placeholder={isAuthenticated ? '댓글을 작성해주세요...' : '댓글을 작성하려면 로그인이 필요합니다.'}
              disabled={!isAuthenticated}
            ></textarea>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className={`mt-2 px-4 py-2 ${
                  isAuthenticated ? 'bg-[#2EC4B6] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } rounded-lg transition duration-200 ease-in-out font-GmarketMedium`}
                disabled={!isAuthenticated}
              >
                댓글 작성
              </button>
            </div>
          </form>
        </div>
      </div>
      {showLoginMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-sm font-GmarketBold text-[#FF6B6B]">로그인이 필요한 서비스입니다.</h2>
            <button
              className="px-3 py-2 text-[#2EC4B6] border border-[#2EC4B6] rounded hover:text-white hover:bg-[#2EC4B6] active:text-[#2EC4B6] active:bg-white transition-colors duration-200 rounded-lg font-GmarketMedium text-xs"
              onClick={() => setShowLoginMessage(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
      <AppBar />
    </div>
  );
};

export default FeedbackDetail;
