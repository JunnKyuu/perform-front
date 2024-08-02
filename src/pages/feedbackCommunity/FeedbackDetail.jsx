import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';
import { useAuth } from '../../context/AuthContext';

const FeedbackDetail = () => {
  const { category, postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { state } = useAuth();
  const { isAuthenticated, user } = state;
  const [likedComments, setLikedComments] = useState({});
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [images, setImages] = useState([]);

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
        postId: postId,
        category: category,
        title: '복근 운동 피드백 부탁드려요',
        user: '헬스초보',
        userId: 'user123',
        date: '2024-07-24',
        content: '복근 운동을 시작한 지 얼마 안 됐는데, 제 자세가 맞는지 봐주세요. 어떤 점을 개선해야 할까요?',
        images: [
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
        ],
        likes: 15,
      };
      setPost(samplePost);
      setLikes(samplePost.likes);
      setImages(samplePost.images);

      // 수정된 임시 댓글 데이터
      const sampleComments = [
        {
          commentId: 1,
          postId: postId,
          userId: 'user456',
          user: '헬스마스터',
          master: true,
          content: '자세가 좋아 보입니다. 계속 유지하세요!',
          likes: 5,
          date: '2024-07-25',
        },
        {
          commentId: 2,
          postId: postId,
          userId: 'user789',
          user: '운동전문가',
          master: false,
          content: '복부에 더 집중해보세요. 좋은 시작입니다!',
          likes: 3,
          date: '2024-07-26',
        },
      ];
      setComments(sampleComments);
    };

    fetchPost();
  }, [category, postId]);

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
      commentId: comments.length + 1,
      postId: postId,
      userId: user?.id || 'anonymous',
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
  };

  const handlePostLike = () => {
    setIsLiked(!isLiked);
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    // 여기에 서버로 좋아요 상태를 업데이트하는 로직을 추가
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

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white pb-16">
      <Header isAuthenticated={isAuthenticated} />
      <div className="mt-8">
        <Link to="/feedback" className="text-[#2EC4B6] mb-4 block font-GmarketMedium">
          &lt; 돌아가기
        </Link>
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
        {images.length > 0 && (
          <div className="mb-10">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`게시물 이미지 ${index + 1}`} className="w-full rounded-lg" />
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
              onKeyDown={handleKeyDown}
              className="font-GmarketLight text-sm w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#2EC4B6] focus:border-[#2EC4B6] transition duration-200"
              rows="3"
              placeholder="댓글을 작성해주세요..."
            ></textarea>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-[#2EC4B6] text-white rounded-lg hover:bg-[#25a093] transition duration-200 ease-in-out font-GmarketMedium"
              >
                댓글 작성
              </button>
            </div>
          </form>
        </div>
      </div>
      <AppBar />
    </div>
  );
};

export default FeedbackDetail;
