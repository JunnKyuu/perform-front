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

  const categories = ['전체', '루틴', '영양'];

  useEffect(() => {
    // 데이터 가져오기
    const samplePosts = [
      {
        id: 1,
        category: '루틴',
        title: '초보자를 위한 전신 운동 루틴',
        author: '헬스마스터',
        date: '2024-07-24',
      },
      {
        id: 2,
        category: '영양',
        title: '근육 증가를 위한 식단 공유',
        author: '단백질왕',
        date: '2024-07-25',
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

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header isAuthenticated={isAuthenticated} />
      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-GmarketBold">루틴/영양 게시글 목록</h1>
          <Link
            to="/write-post"
            className="inline-block px-4 py-2 text-sm text-white bg-[#2EC4B6] rounded-lg font-GmarketMedium hover:bg-[#25A99D] active:bg-[#1F8C82]"
          >
            글쓰기
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
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
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/routine-nutrition/${getCategoryPath(post.category)}/${post.id}`}
              className="block"
            >
              <div className="px-3 py-2 border rounded-lg shadow-sm border-[#DDDDDD] cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#2EC4B6] active:bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center">
                    <span className="text-sm font-GmarketMedium text-[#2EC4B6] w-8">{post.category}</span>
                    <h3 className="flex ml-1 text-sm font-GmarketLight">{post.title}</h3>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="mx-2 text-[10px] text-black font-GmarketLight">{post.author}</p>
                    <p className="w-16 text-[10px] text-black font-GmarketLight">{post.date}</p>
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
