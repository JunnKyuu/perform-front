import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const EvaluationDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`base_url/api/reviewpost/${postId}`);
        setPost(response.data);
        // 사용자의 투표 여부 확인
        const userVoteData = response.data.vote.userVotes.find((vote) => vote.user === user.id);
        setUserVote(userVoteData ? (userVoteData.isAgree ? 'agree' : 'disagree') : null);
      } catch (error) {
        console.error('게시물 불러오기 실패:', error);
      }
    };

    fetchPost();
  }, [postId, user.id]);

  const handleVote = async (voteType) => {
    if (!isAuthenticated) {
      alert('투표하려면 로그인이 필요합니다.');
      return;
    }

    try {
      // 투표 API 호출 (실제 엔드포인트로 수정 필요)
      await axios.post(`base_url/api/vote/${post.vote.id}`, {
        isAgree: voteType === 'agree',
      });

      // 투표 상태 업데이트
      setPost((prevPost) => ({
        ...prevPost,
        vote: {
          ...prevPost.vote,
          agreeNum: voteType === 'agree' ? prevPost.vote.agreeNum + 1 : prevPost.vote.agreeNum,
          disagreeNum: voteType === 'disagree' ? prevPost.vote.disagreeNum + 1 : prevPost.vote.disagreeNum,
        },
      }));
      setUserVote(voteType);
    } catch (error) {
      console.error('투표 실패:', error);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('좋아요를 누르려면 로그인이 필요합니다.');
      return;
    }

    try {
      // 좋아요 API 호출 (실제 엔드포인트로 수정 필요)
      await axios.post(`base_url/api/like/${postId}`);

      // 좋아요 상태 업데이트
      setPost((prevPost) => ({
        ...prevPost,
        likes: prevPost.likes.some((like) => like.user === user.id)
          ? prevPost.likes.filter((like) => like.user !== user.id)
          : [...prevPost.likes, { user: user.id }],
      }));
    } catch (error) {
      console.error('좋아요 실패:', error);
    }
  };

  if (!post) return <div>로딩 중...</div>;

  const isLiked = post.likes.some((like) => like.user === user.id);

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
            <span className="mr-2 text-sm font-GmarketLight">{post.user.username}</span>
            <span className="text-sm font-GmarketLight">{new Date(post.createdDate).toLocaleDateString()}</span>
          </div>
        </div>
        {post.attachments.length > 0 && (
          <img src={post.attachments[0].path} alt="게시물 이미지" className="w-full mb-4 rounded-lg" />
        )}
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
            <span>{post.likes.length}</span>
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
            찬성 ({post.vote.agreeNum})
          </button>
          <button
            onClick={() => handleVote('disagree')}
            className={`px-6 py-2 rounded-[10px] ${
              userVote === 'disagree' ? 'bg-[#FF6B6B] text-white' : 'bg-gray-200 text-gray-800'
            } font-GmarketMedium transition duration-200`}
          >
            반대 ({post.vote.disagreeNum})
          </button>
        </div>
      </div>
      <AppBar />
    </div>
  );
};

export default EvaluationDetail;
