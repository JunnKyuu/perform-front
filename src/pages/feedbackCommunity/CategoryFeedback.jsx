import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';

const CategoryFeedback = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('최신순');
  const { state } = useAuth();
  const { isAuthenticated } = state;

  // 카테고리를 한글로
  const getCategoryKorean = (category) => {
    switch (category) {
      case 'abs':
        return '복근';
      case 'arm':
        return '팔';
      case 'back':
        return '등';
      case 'chest':
        return '가슴';
      case 'evaluation':
        return '심사';
      case 'leg':
        return '하체';
      case 'shoulder':
        return '어깨';
      default:
        return category;
    }
  };

  useEffect(() => {
    // API 불러오기
    const fetchPosts = async () => {
      setPosts([
        {
          postId: 1,
          category: category,
          title: '운동 피드백 부탁드려요',
          user: '헬스초보',
          userId: 'user1',
          date: '2024-07-24',
          likes: 5,
        },
        {
          postId: 2,
          category: category,
          title: '운동 폼 체크해주세요',
          user: '근육맨',
          userId: 'user2',
          date: '2024-07-25',
          likes: 10,
        },
        {
          postId: 3,
          category: category,
          title: '운동 루틴 어떤가요?',
          user: '운동마니아',
          userId: 'user3',
          date: '2024-07-26',
          likes: 7,
        },
      ]);
    };

    fetchPosts();
  }, [category]);

  const sortPosts = (posts) => {
    if (sortBy === '최신순') {
      return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === '인기순') {
      return [...posts].sort((a, b) => b.likes - a.likes);
    }
    return posts;
  };

  const sortedPosts = sortPosts(posts);

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

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header isAuthenticated={isAuthenticated} />
      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-GmarketBold">{getCategoryKorean(category)} 게시글 목록</h1>
          <Link
            to="/write-post"
            className="inline-block px-3 py-1 text-sm text-white bg-[#2EC4B6] rounded-lg font-GmarketMedium hover:bg-[#25A99D] active:bg-[#1F8C82]"
          >
            글쓰기
          </Link>
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
            <Link key={post.postId} to={`/feedback/${getCategoryPath(post.category)}/${post.postId}`} className="block">
              <div className="px-3 py-2 border rounded-lg shadow-sm border-[#DDDDDD] cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#2EC4B6] active:bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center">
                    <span className="text-sm font-GmarketMedium text-[#2EC4B6] w-8">
                      {getCategoryKorean(post.category)}
                    </span>
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

export default CategoryFeedback;
