import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';

const FeedbackCommunity = () => {
  const { state } = useAuth();
  const { user, isAuthenticated } = state;
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');

  const categories = ['전체', '복근', '팔', '등', '가슴', '심사', '하체', '어깨'];

  useEffect(() => {
    // 데이터 가져오기
    const samplePosts = [
      {
        postId: 1,
        category: '복근',
        title: '복근 운동 피드백 부탁드려요',
        user: '헬스초보',
        userId: 'user1',
        date: '2024-07-24',
        likes: 15,
      },
      {
        postId: 2,
        category: '팔',
        title: '팔 운동 폼 체크해주세요',
        user: '근육맨',
        userId: 'user2',
        date: '2024-07-25',
        likes: 8,
      },
      {
        postId: 3,
        category: '등',
        title: '등 운동 루틴 어떤가요?',
        user: '등근육킹',
        userId: 'user3',
        date: '2024-07-26',
        likes: 12,
      },
      {
        postId: 4,
        category: '가슴',
        title: '벤치프레스 자세 봐주세요',
        user: '가슴만백날',
        userId: 'user4',
        date: '2024-07-27',
        likes: 20,
      },
      {
        postId: 5,
        category: '심사',
        title: '고수 신청합니다.',
        user: '헬스고수',
        userId: 'user5',
        date: '2024-07-28',
        likes: 5,
      },
      {
        postId: 6,
        category: '하체',
        title: '스쿼트 자세 확인 부탁드려요',
        user: '하체의신',
        userId: 'user6',
        date: '2024-07-29',
        likes: 18,
      },
      {
        postId: 7,
        category: '어깨',
        title: '어깨 운동 루틴 공유합니다',
        user: '넓은어깨',
        userId: 'user7',
        date: '2024-07-29',
        likes: 10,
      },
    ];
    setPosts(samplePosts);
  }, []);

  const getCategoryPath = (category) => {
    switch (category) {
      case '복근':
        return 'abs';
      case '팔':
        return 'arm';
      case '등':
        return 'back';
      case '가슴':
        return 'chest';
      case '심사':
        return 'evaluation';
      case '하체':
        return 'leg';
      case '어깨':
        return 'shoulder';
      default:
        return category.toLowerCase();
    }
  };

  const getPostLink = (post) => {
    if (post.category === '심사') {
      return `/feedback/evaluation/${post.postId}`;
    }
    return `/feedback/${getCategoryPath(post.category)}/${post.postId}`;
  };

  const sortPosts = (posts) => {
    if (sortBy === '최신순') {
      return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === '인기순') {
      return [...posts].sort((a, b) => b.likes - a.likes);
    }
    return posts;
  };

  const filteredPosts =
    selectedCategory === '전체' ? posts : posts.filter((post) => post.category === selectedCategory);

  const sortedPosts = sortPosts(filteredPosts);

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header isAuthenticated={isAuthenticated} />
      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-GmarketBold">피드백 게시글 목록</h1>
          <Link
            to="/write-post"
            className="inline-block px-3 py-1 text-sm text-white bg-[#2EC4B6] rounded-lg font-GmarketMedium hover:bg-[#25A99D] active:bg-[#1F8C82]"
          >
            글쓰기
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 font-GmarketMedium">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedCategory === category ? 'bg-[#2EC4B6] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mb-10 font-GmarketMedium">
          {['최신순', '인기순'].map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`px-3 py-1 text-sm rounded-full ${
                sortBy === sort ? 'bg-[#2EC4B6] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {sort}
            </button>
          ))}
        </div>
        <div className="grid gap-4">
          {sortedPosts.map((post) => (
            <Link key={post.postId} to={getPostLink(post)} className="block">
              <div className="px-3 py-2 border rounded-lg shadow-sm border-[#DDDDDD] cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#2EC4B6] active:bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start flex-grow">
                    <span className="text-sm font-GmarketMedium text-[#2EC4B6] w-8">{post.category}</span>
                    <h3 className="flex ml-1 text-sm font-GmarketLight">{post.title}</h3>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="mx-2 text-[10px] text-black font-GmarketLight">{post.user}</p>
                    <p className="w-16 text-[10px] text-black font-GmarketLight">{post.date}</p>
                    <p className="ml-2 text-[10px] text-red-500 font-GmarketLight">❤ {post.likes}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <AppBar />
    </div>
  );
};

export default FeedbackCommunity;
