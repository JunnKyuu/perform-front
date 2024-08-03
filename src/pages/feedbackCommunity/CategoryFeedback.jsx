import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';
import axios from 'axios';

const CategoryFeedback = () => {
  const { category } = useParams();
  const [allPosts, setAllPosts] = useState([]);
  const [sortBy, setSortBy] = useState('최신순');
  const { state } = useAuth();
  const { isAuthenticated } = state;

  // 카테고리 매핑
  const categoryMapping = {
    abs: '복근',
    arm: '팔',
    back: '등',
    chest: '가슴',
    evaluation: '심사',
    leg: '하체',
    shoulder: '어깨',
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get('http://ec2-54-180-248-238.ap-northeast-2.compute.amazonaws.com:8080/api/post');
      // const formattedPosts = response.data.map((post) => ({
      //   postId: post.id,
      //   category: post.category,
      //   title: post.title,
      //   user: post.username,
      //   userId: post.userId,
      //   date: new Date(post.createdDate).toLocaleDateString(),
      //   likes: post.likesNum,
      // }));
      const formattedPosts = response.data.map((post) => ({
        postId: post.id,
        category: post.category,
        title: post.title,
        user: post.username,
        userId: post.userId,
        content: post.content,
        date: new Date(post.createdDate).toLocaleDateString(),
        likes: post.likesNum,
        attachments: post.attachments,
        liked: post.liked,
      }));
      setAllPosts(formattedPosts);
    } catch (error) {
      console.error('게시물을 가져오는 중 오류 발생:', error);
    }
  };

  const filteredPosts = allPosts.filter((post) => post.category === categoryMapping[category]);

  const sortPosts = (posts) => {
    if (sortBy === '최신순') {
      return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === '인기순') {
      return [...posts].sort((a, b) => b.likes - a.likes);
    }
    return posts;
  };

  const sortedPosts = sortPosts(filteredPosts);

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header isAuthenticated={isAuthenticated} />
      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-GmarketBold">{categoryMapping[category]} 게시글 목록</h1>
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
            <Link key={post.postId} to={`/feedback/${post.postId}`} state={{ postData: post }} className="block">
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

export default CategoryFeedback;
