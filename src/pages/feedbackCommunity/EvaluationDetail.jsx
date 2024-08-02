import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';
import { useAuth } from '../../context/AuthContext';

const EvaluationDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [votes, setVotes] = useState({ agree: 0, disagree: 0 });
  const [userVote, setUserVote] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  useEffect(() => {
    // 실제 데이터 가져오기
    const fetchPost = async () => {
      const samplePost = {
        postId: postId,
        category: 'evaluation',
        title: '고수 신청합니다.',
        user: '헬스고수',
        userId: 'user123',
        date: '2024-07-28',
        content: '운동경력 5년차이고, 3대 700입니다. 자세 봐주시고 찬성 부탁드립니다!',
        image:
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
        likes: 10,
      };
      setPost(samplePost);
      setLikes(samplePost.likes);

      setVotes({ agree: 15, disagree: 5 });
    };

    fetchPost();
  }, [postId]);

  const handleVote = (voteType) => {
    if (!isAuthenticated) {
      alert('투표하려면 로그인이 필요합니다.');
      return;
    }

    if (userVote === voteType) {
      setUserVote(null);
      setVotes((prev) => ({
        ...prev,
        [voteType]: prev[voteType] - 1,
      }));
    } else {
      if (userVote) {
        setVotes((prev) => ({
          ...prev,
          [userVote]: prev[userVote] - 1,
        }));
      }
      setUserVote(voteType);
      setVotes((prev) => ({
        ...prev,
        [voteType]: prev[voteType] + 1,
      }));
    }

    // 여기에 서버로 투표 정보를 보내는 API 호출
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white pb-16">
      <Header isAuthenticated={isAuthenticated} />
      <div className="mt-8">
        <Link to="/feedback" className="font-GmarketMedium text-[#2EC4B6] mb-4 block">
          &lt; 돌아가기
        </Link>
        <h1 className="mb-4 text-2xl font-GmarketBold">{post.title}</h1>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-GmarketMedium text-[#2EC4B6]">심사</span>
          <div>
            <span className="mr-2 text-sm font-GmarketLight">{post.user}</span>
            <span className="text-sm font-GmarketLight">{post.date}</span>
          </div>
        </div>
        {post.image && <img src={post.image} alt="게시물 이미지" className="w-full mb-4 rounded-lg" />}
        <p className="mb-8 text-base font-GmarketLight">{post.content}</p>

        {/* 좋아요 버튼 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLike}
            className={`flex items-center px-4 py-2 rounded-full ${
              isLiked ? 'bg-[#FF6B6B] text-white' : 'bg-gray-200 text-gray-800'
            } transition duration-200`}
          >
            <span className="mr-2">{isLiked ? '❤️' : '🤍'}</span>
            <span>{likes}</span>
          </button>
        </div>

        {/* 투표 버튼 */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => handleVote('agree')}
            className={`px-6 py-2 rounded-[10px] ${
              userVote === 'agree' ? 'bg-[#2EC4B6] text-white' : 'bg-gray-200 text-gray-800'
            } font-GmarketMedium transition duration-200`}
          >
            찬성
          </button>
          <button
            onClick={() => handleVote('disagree')}
            className={`px-6 py-2 rounded-[10px] ${
              userVote === 'disagree' ? 'bg-[#FF6B6B] text-white' : 'bg-gray-200 text-gray-800'
            } font-GmarketMedium transition duration-200`}
          >
            반대
          </button>
        </div>
      </div>
      <AppBar />
    </div>
  );
};

export default EvaluationDetail;
