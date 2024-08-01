import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppBar from '../components/AppBar';
import defalutImage from '../assets/images/default.png';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '사용자 이름',
    snsHandle: '@user_sns',
    profileImage: null,
    master: null,
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 실제 데이터 호출해야함
    setUserInfo({
      name: '헬스왕',
      snsHandle: '@health_king',
      profileImage:
        'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
      master: true,
    });

    setPosts([
      { id: 1, title: '오늘의 운동 루틴', category: '루틴', date: '2024-07-28' },
      { id: 2, title: '벤치프레스 자세 피드백 부탁드려요', category: '심사', date: '2024-07-29' },
      { id: 3, title: '단백질 보충제 추천', category: '영양', date: '2024-07-31' },
    ]);
  }, []);

  const getCategoryInEnglish = (category) => {
    const categoryMap = {
      루틴: 'routine',
      심사: 'evaluation',
      영양: 'nutrition',
      등: 'back',
      가슴: 'chest',
      어깨: 'shoulder',
      팔: 'arm',
      하체: 'leg',
      복근: 'abs',
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white">
      <Header isAuthenticated={true} />
      <div className="p-4">
        <div className="flex items-center mb-8">
          <img
            src={userInfo.profileImage || defalutImage}
            alt="프로필 사진"
            className="object-cover w-24 h-24 mr-4 rounded-full"
          />
          <div>
            <div>
              <h1 className="flex items-center text-2xl font-GmarketBold">
                {userInfo.name}
                {userInfo.master && (
                  <span className="px-1 py-0.5 ml-2 text-xs text-white bg-[#2EC4B6] rounded-[10px] font-GmarketMedium">
                    고수
                  </span>
                )}
              </h1>
              <p className="text-black font-GmarketMedium">{userInfo.snsHandle}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-md font-GmarketBold text-[#2EC4B6]">내 게시글</h2>
          {posts.length > 0 ? (
            <ul className="space-y-2">
              {posts.map((post) => {
                const feedbackCategories = ['등', '가슴', '어깨', '팔', '하체', '복근', '심사'];
                const routineNutritionCategories = ['루틴', '영양'];

                const englishCategory = getCategoryInEnglish(post.category);

                let linkPath;
                if (feedbackCategories.includes(post.category)) {
                  linkPath = `/feedback/${englishCategory}/${post.id}`;
                } else if (routineNutritionCategories.includes(post.category)) {
                  linkPath = `/routine-nutrition/${englishCategory}/${post.id}`;
                } else {
                  linkPath = `/post/${post.id}`;
                }

                return (
                  <li key={post.id} className="pb-2 border-b">
                    <Link to={linkPath} className="block p-2 rounded hover:bg-gray-100">
                      <div className="flex justify-between text-xs text-gray-600 font-GmarketLight mb-[5px]">
                        <span className="text-[#2EC4B6] font-GmarketMedium">{post.category}</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-sm font-GmarketLight">{post.title}</h3>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">작성한 게시글이 없습니다.</p>
          )}
        </div>
        <div className="flex justify-center">
          <button className="bg-[#2EC4B6] text-white px-4 py-2 rounded font-GmarketMedium hover:bg-[#2AB0A3]">
            프로필 수정
          </button>
        </div>
      </div>
      <AppBar />
    </div>
  );
};

export default MyPage;
