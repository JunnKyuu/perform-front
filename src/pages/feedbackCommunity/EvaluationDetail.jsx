import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';
import { useAuth } from '../../context/AuthContext';

const EvaluationDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [votes, setVotes] = useState({ agree: 0, disagree: 0 });
  const [userVote, setUserVote] = useState(null);
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  useEffect(() => {
    // 실제 데이터 가져오기
    const fetchPost = async () => {
      // 임시 데이터
      const samplePost = {
        id: id,
        category: 'evaluation',
        title: '고수 신청합니다.',
        author: '헬스고수',
        date: '2024-07-28',
        content: '운동경력 5년차이고, 3대 700입니다. 자세 봐주시고 찬성 부탁드립니다!',
        image:
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
      };
      setPost(samplePost);

      // 임시 댓글 데이터
      const sampleComments = [
        {
          id: 1,
          author: '헬스마스터',
          content: '무릎이 발끝을 약간 넘어가는데 자세 괜찮은 것 같아요. 찬성합니다!',
          date: '2024-07-29',
        },
        { id: 2, author: '운동전문가', content: '3대 700이라니 찬성합니다.', date: '2024-07-29' },
      ];
      setComments(sampleComments);

      // 임시 투표 데이터
      setVotes({ agree: 15, disagree: 5 });
    };

    fetchPost();
  }, [id]);

  const handleVote = (voteType) => {
    if (userVote === voteType) {
      // 이미 투표한 경우 취소
      setVotes((prev) => ({
        ...prev,
        [voteType]: prev[voteType] - 1,
      }));
      setUserVote(null);
    } else {
      // 새로운 투표 또는 투표 변경
      if (userVote) {
        setVotes((prev) => ({
          ...prev,
          [userVote]: prev[userVote] - 1,
        }));
      }
      setVotes((prev) => ({
        ...prev,
        [voteType]: prev[voteType] + 1,
      }));
      setUserVote(voteType);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
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
          <span className="text-sm font-GmarketMedium text-[#2EC4B6]">심사</span>
          <div>
            <span className="mr-2 text-sm font-GmarketLight">{post.author}</span>
            <span className="text-sm font-GmarketLight">{post.date}</span>
          </div>
        </div>
        {post.image && <img src={post.image} alt="게시물 이미지" className="w-full mb-4 rounded-lg" />}
        <p className="mb-8 text-base font-GmarketLight">{post.content}</p>

        {/* 투표 버튼 */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => handleVote('agree')}
            className={`px-6 py-2 rounded-[10px] ${
              userVote === 'agree' ? 'bg-[#2EC4B6] text-white' : 'bg-gray-200 text-gray-800'
            } font-GmarketMedium transition duration-200`}
          >
            찬성 ({votes.agree})
          </button>
          <button
            onClick={() => handleVote('disagree')}
            className={`px-6 py-2 rounded-[10px] ${
              userVote === 'disagree' ? 'bg-[#FF6B6B] text-white' : 'bg-gray-200 text-gray-800'
            } font-GmarketMedium transition duration-200`}
          >
            반대 ({votes.disagree})
          </button>
        </div>

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

export default EvaluationDetail;
