import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AppBar from '../components/AppBar';
import EditProfileModal from '../components/EditProfileModal';
import defaultImage from '../assets/images/default.png';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    name: '사용자 이름',
    master: false,
    profileImage: null,
    email: 'user@example.com',
    sns: '@user_sns',
  });

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  useEffect(() => {
    setUserInfo({
      userId: 'user123',
      name: '헬스왕',
      master: true,
      profileImage:
        'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
      email: 'health_king@example.com',
      sns: '@health_king',
    });

    setPosts([
      {
        postId: 1,
        userId: 'user123',
        category: '루틴',
        title: '오늘의 운동 루틴',
        content: '오늘의 운동 루틴 내용...',
        user: '헬스왕',
        date: '2024-07-28',
        image: 'https://example.com/image1.jpg',
        likes: 10,
      },
      {
        postId: 2,
        userId: 'user123',
        category: '심사',
        title: '벤치프레스 자세 피드백 부탁드려요',
        content: '벤치프레스 자세 내용...',
        user: '헬스왕',
        date: '2024-07-29',
        image: 'https://example.com/image2.jpg',
        likes: 5,
      },
      {
        postId: 3,
        userId: 'user123',
        category: '영양',
        title: '단백질 보충제 추천',
        content: '단백질 보충제 추천 내용...',
        user: '헬스왕',
        date: '2024-07-31',
        image: 'https://example.com/image3.jpg',
        likes: 15,
      },
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

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      setPosts(posts.filter((post) => post.postId !== postId));
    }
  };

  const handleEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    if (updatedProfile instanceof FormData) {
      // FormData에서 이미지 파일 추출
      const imageFile = updatedProfile.get('profileImage');
      if (imageFile) {
        // 이미지 파일을 URL로 변환
        const imageUrl = URL.createObjectURL(imageFile);
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          name: updatedProfile.get('name'),
          sns: updatedProfile.get('sns'),
          profileImage: imageUrl,
        }));
      } else {
        // 이미지가 변경되지 않은 경우
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          name: updatedProfile.get('name'),
          sns: updatedProfile.get('sns'),
        }));
      }
    } else {
      // FormData가 아닌 경우 (기존 로직)
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        ...updatedProfile,
      }));
    }
    setIsEditProfileModalOpen(false);
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white">
      <Header isAuthenticated={true} />
      <div className="p-4 pb-16">
        <div className="flex items-center justify-between py-2 mb-6">
          <div className="flex items-center mb-8">
            <img
              src={userInfo.profileImage || defaultImage}
              alt="프로필 사진"
              className="object-cover w-24 h-24 mr-4 rounded-full"
            />
            <div>
              <div>
                <h1 className="flex items-center mb-1 text-2xl font-GmarketBold">
                  {userInfo.name}
                  {userInfo.master && (
                    <span className="px-1 py-0.5 ml-2 text-xs text-white bg-[#2EC4B6] rounded-[10px] font-GmarketMedium">
                      고수
                    </span>
                  )}
                </h1>
                <p className="mb-1 text-sm text-gray-600 font-GmarketMedium">{userInfo.email}</p>
                <p className="text-sm text-gray-600 font-GmarketMedium">{userInfo.sns}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleEditProfile}
              className="bg-[#2EC4B6] text-white px-3 py-2 rounded text-sm font-GmarketMedium hover:bg-[#2AB0A3]"
            >
              프로필 수정
            </button>
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
                  linkPath = `/feedback/${englishCategory}/${post.postId}`;
                } else if (routineNutritionCategories.includes(post.category)) {
                  linkPath = `/routine-nutrition/${englishCategory}/${post.postId}`;
                } else {
                  linkPath = `/post/${post.postId}`;
                }

                return (
                  <li key={post.postId} className="pb-2 border-b">
                    <div className="flex items-center justify-between">
                      <Link to={linkPath} className="flex-grow block p-2 rounded hover:bg-gray-100">
                        <div className="flex justify-between text-xs text-gray-600 font-GmarketLight mb-[5px]">
                          <span className="text-[#2EC4B6] font-GmarketMedium">{post.category}</span>
                          <span>{post.date}</span>
                        </div>
                        <h3 className="text-sm font-GmarketLight">{post.title}</h3>
                      </Link>
                      <div className="w-[16%] flex items-center justify-between ml-5">
                        <button
                          onClick={() => handleEdit(post.postId)}
                          className="px-2 py-1 text-xs text-[#2EC4B6] border border-[#2EC4B6] rounded hover:bg-[#2EC4B6] hover:text-white active:bg-white active:text-[#2EC4B6] transition-colors duration-200 font-GmarketMedium"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(post.postId)}
                          className="px-2 py-1 text-xs text-[#FF6B6B] border border-[#FF6B6B] rounded hover:bg-[#FF6B6B] hover:text-white active:bg-white active:text-[#FF6B6B] transition-colors duration-200 font-GmarketMedium"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">작성한 게시글이 없습니다.</p>
          )}
        </div>
      </div>
      {!isEditProfileModalOpen && <AppBar />}
      {isEditProfileModalOpen && (
        <EditProfileModal
          userInfo={userInfo}
          onSave={handleSaveProfile}
          onClose={() => setIsEditProfileModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyPage;
