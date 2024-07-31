import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';

const CategoryRoutineNutrition = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const { state } = useAuth();
  const { isAuthenticated } = state;

  // 카테고리를 한글로
  const getCategoryKorean = (category) => {
    switch (category) {
      case 'routine':
        return '루틴';
      case 'nutrition':
        return '영양';
      default:
        return category;
    }
  };

  useEffect(() => {
    // API 불러오기
    const fetchPosts = async () => {
      setPosts([
        {
          id: 1,
          category: category,
          title: '초보자를 위한 전신 운동 루틴',
          author: '헬스마스터',
          date: '2024-07-24',
        },
        {
          id: 2,
          category: category,
          title: '근육 증가를 위한 식단 공유',
          author: '단백질왕',
          date: '2024-07-25',
        },
        {
          id: 3,
          category: category,
          title: '다이어트 식단 추천해주세요',
          author: '다이어터',
          date: '2024-07-26',
        },
      ]);
    };

    fetchPosts();
  }, [category]);

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

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header isAuthenticated={isAuthenticated} />
      {isAuthenticated ? (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl font-GmarketBold">{getCategoryKorean(category)} 게시글 목록</h1>
            <Link
              to="/write-post"
              className="inline-block px-4 py-2 text-sm text-black rounded-lg font-GmarketMedium hover:text-[#2EC4B6] active:text-black"
            >
              글쓰기
            </Link>
          </div>
          <div className="grid gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/routine-nutrition/${getCategoryPath(post.category)}/${post.id}`}
                className="block"
              >
                <div className="px-3 py-2 border rounded-lg shadow-sm border-[#DDDDDD] cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#2EC4B6] active:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-GmarketMedium text-[#2EC4B6] w-8">
                        {getCategoryKorean(post.category)}
                      </span>
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
      ) : (
        <div className="py-8 text-center">
          <h2 className="mb-4 text-xl font-GmarketBold">로그인이 필요한 서비스입니다.</h2>
          <Link to="/login" className="bg-[#2EC4B6] text-white px-4 py-2 rounded-lg">
            로그인하기
          </Link>
        </div>
      )}
      <AppBar />
    </div>
  );
};

export default CategoryRoutineNutrition;