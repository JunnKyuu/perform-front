import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';

const RoutineNutritionCommunity = () => {
  const { state } = useAuth();
  const { user, isAuthenticated } = state;
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');

  const categories = ['전체', '루틴', '영양'];

  useEffect(() => {
    // 데이터 가져오기
    const samplePosts = [
      {
        postId: 1,
        category: '루틴',
        title: '초보자를 위한 전신 운동 루틴',
        user: '헬스마스터',
        userId: 1,
        date: '2024-07-24',
        likes: 15,
      },
      {
        postId: 2,
        category: '영양',
        title: '근육 증가를 위한 식단 공유',
        user: '단백질왕',
        userId: 2,
        date: '2024-07-25',
        likes: 20,
      },
      {
        postId: 3,
        category: '루틴',
        title: '홈트레이닝 루틴 추천',
        user: '홈트의신',
        userId: 3,
        date: '2024-07-26',
        likes: 10,
      },
    ];
    setPosts(samplePosts);
  }, []);

  const getCategoryPath = (category) => {
    switch (category) {
      case '루틴':
        return 'routine';
      case '영양':
        return 'nutrition';
      default:
        return category.toLowerCase();
    }
  };

  const filteredPosts =
    selectedCategory === '전체' ? posts : posts.filter((post) => post.category === selectedCategory);

  const sortPosts = (posts) => {
    if (sortBy === '최신순') {
      return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === '인기순') {
      return [...posts].sort((a, b) => b.likes - a.likes);
    }
    return posts;
  };

  const sortedAndFilteredPosts = sortPosts(filteredPosts);

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header isAuthenticated={isAuthenticated} />
      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-GmarketBold">루틴/영양 게시글 목록</h1>
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
          {sortedAndFilteredPosts.map((post) => (
            <Link
              key={post.postId}
              to={`/routine-nutrition/${getCategoryPath(post.category)}/${post.postId}`}
              className="block"
            >
              <div className="px-3 py-2 border rounded-lg shadow-sm border-[#DDDDDD] cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#2EC4B6] active:bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center">
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

export default RoutineNutritionCommunity;
