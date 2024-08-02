import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import AdvertiseButton from '../components/AdvertiseButton';
import AppBar from '../components/AppBar';
import defaultImage from '../assets/images/default.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchResults from '../components/SearchResults';

const categories = [
  { name: '등', path: '/back', icon: 'M4 12h16M6 8v8M18 8v8M9 8v8M15 8v8' },
  { name: '가슴', path: '/chest', icon: 'M4 12h16M6 8v8M18 8v8M9 8v8M15 8v8' },
  { name: '어깨', path: '/shoulder', icon: 'M4 12h16M6 8v8M18 8v8M9 8v8M15 8v8' },
  { name: '팔', path: '/arm', icon: 'M4 12h16M6 8v8M18 8v8M9 8v8M15 8v8' },
  { name: '하체', path: '/leg', icon: 'M4 12h16M6 8v8M18 8v8M9 8v8M15 8v8' },
  { name: '복근', path: '/abs', icon: 'M4 12h16M6 8v8M18 8v8M9 8v8M15 8v8' },
  { name: '심사', path: '/evaluation', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  {
    name: '루틴',
    path: '/routine',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    name: '영양',
    path: '/nutrition',
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
  },
];

const master = [
  {
    img: 'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
    name: '신봉동고양이',
    sns: 'ddoruruk_jun',
  },
  { img: null, name: '신봉동고양이', sns: 'ddoruruk_jun' },
  { img: null, name: '신봉동고양이', sns: 'ddoruruk_jun' },
  {
    img: 'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
    name: '신봉동고양이',
    sns: 'ddoruruk_jun',
  },
  { img: null, name: '신봉동고양이', sns: 'ddoruruk_jun' },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

const Home = () => {
  const {
    state: { isAuthenticated },
  } = useAuth();
  const navigate = useNavigate();
  const [feedbackPosts, setFeedbackPosts] = useState([]);
  const [routineNutritionPosts, setRoutineNutritionPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    // 실제 API 호출로 대체해야 함
    const sampleFeedbackPosts = [
      {
        postId: 1,
        category: '복근',
        title: '복근 운동 피드백 부탁드려요',
        user: '헬스초보',
        userId: 'user1',
        date: '2023-04-01',
        image:
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
      },
      {
        postId: 2,
        category: '팔',
        title: '팔 운동 폼 체크해주세요',
        user: '근육맨',
        userId: 'user2',
        date: '2023-04-02',
        image: null,
      },
      {
        postId: 3,
        category: '등',
        title: '등 운동 루틴 어떤가요?',
        user: '등근육킹',
        userId: 'user3',
        date: '2023-04-03',
        image:
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
      },
      {
        postId: 4,
        category: '가슴',
        title: '벤치프레스 자세 봐주세요',
        user: '가슴만백날',
        userId: 'user4',
        date: '2023-04-04',
        image: null,
      },
    ];
    setFeedbackPosts(sampleFeedbackPosts);

    const sampleRoutineNutritionPosts = [
      {
        postId: 1,
        category: '루틴',
        title: '헬린이 전신 운동 루틴',
        user: '헬스마스터',
        userId: 'user5',
        date: '2024-07-31',
        image:
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
      },
      {
        postId: 2,
        category: '영양',
        title: '근육 증가를 위한 식단 공유',
        user: '단백질왕',
        userId: 'user6',
        date: '2024-07-31',
        image: null,
      },
    ];
    setRoutineNutritionPosts(sampleRoutineNutritionPosts);
  };

  const getCategoryPath = (category) => {
    const categoryMap = {
      복근: 'abs',
      팔: 'arm',
      등: 'back',
      가슴: 'chest',
      심사: 'evaluation',
      하체: 'leg',
      어깨: 'shoulder',
    };
    return categoryMap[category] || category.toLowerCase();
  };

  const showLoginRequiredMessage = () => {
    setShowLoginMessage(true);
  };

  const handleCategoryClick = (path) => {
    if (path === '/routine' || path === '/nutrition') {
      navigate(`/routine-nutrition${path}`);
    } else {
      navigate(`/feedback${path}`);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
    } else {
      const results = filterPosts([...feedbackPosts, ...routineNutritionPosts], term);
      setSearchResults(results);
    }
  };

  const filterPosts = (posts, term) => {
    return posts.filter((post) => post.title.toLowerCase().includes(term.toLowerCase()));
  };

  const handlePostClick = (post, category) => {
    if (isAuthenticated) {
      const path =
        category === 'routine' || category === 'nutrition'
          ? `/routine-nutrition/${category}/${post.postId}`
          : `/feedback/${getCategoryPath(post.category)}/${post.postId}`;
      navigate(path);
    } else {
      showLoginRequiredMessage();
    }
  };

  // 컴포넌트 렌더링 함수
  const renderSearchBar = () => (
    <form className="w-[90%] p-3">
      <input
        className="w-[100%] border-solid border-2 border-[#dddddd] rounded-[20px] px-5 py-[3px] text-[15px] font-GmarketLight focus:outline-none focus:border-[#2EC4B6]"
        type="text"
        placeholder="원하는 키워드를 입력해주세요."
        value={searchTerm}
        onChange={handleSearch}
      />
    </form>
  );

  const renderCategories = () => (
    <div className="flex flex-wrap justify-between w-full p-2">
      {categories.map((category) => (
        <button
          key={category.name}
          className="cursor-pointer w-[5%] min-w-[40px] aspect-square flex flex-col justify-center items-center m-1 transition-all duration-200 ease-in-out hover:bg-gray-50 active:bg-gray-100 rounded-lg group"
          onClick={() => handleCategoryClick(category.path)}
        >
          <svg
            className="flex flex-col w-[80%] text-black transition-colors duration-200 ease-in-out group-hover:text-[#2EC4B6]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
          </svg>
          <span className="flex justify-center items-center font-GmarketMedium text-gray-600 text-[10px] h-[40%] truncate group-hover:text-[#2EC4B6]">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );

  const renderMasterBanner = () => (
    <div className="px-5 py-3 mt-5">
      <h2 className="text-xl font-GmarketBold mb-4 text-[#2EC4B6]">고수 추천</h2>
      <div className="relative">
        <Slider {...sliderSettings}>
          {master.map((item, index) => (
            <div key={index} className="px-2">
              <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
                <img
                  src={item.img || defaultImage}
                  alt={item.name}
                  className="w-16 h-16 mb-2 rounded-full sm:w-20 sm:h-20 md:w-24 md:h-24"
                />
                <h3 className="text-xs sm:text-sm font-GmarketMedium">{item.name}</h3>
                <p className="text-xs text-gray-600 sm:text-sm">@{item.sns}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );

  const renderPostSection = (title, posts, linkTo, category) => {
    return (
      <div className="px-5 py-3 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm sm:text-xl font-GmarketBold text-[#2EC4B6]">{title}</h2>
          <Link
            to={linkTo}
            className="text-xs sm:text-sm text-black font-GmarketMedium hover:text-[#2EC4B6] active:text-black"
          >
            전체보기
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {posts.map((post) => (
              <div
                key={post.postId}
                className="overflow-hidden border rounded-lg shadow-sm cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#2EC4B6] active:bg-gray-100"
                onClick={() => handlePostClick(post, category)}
              >
                <div className="flex items-center px-1 sm:p-2">
                  <img
                    src={post.image || defaultImage}
                    alt={post.title}
                    className="object-cover mr-2 rounded-lg w-14 h-14 sm:w-20 sm:h-20"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-xs sm:text-xs font-GmarketMedium text-[#2EC4B6]">{post.category}</span>
                      <h3 className="text-xs truncate sm:text-sm font-GmarketMedium">{post.title}</h3>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-GmarketLight">{post.user}</p>
                      <p className="text-xs text-gray-400 font-GmarketLight">{post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">게시물이 없습니다.</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-[600px] min-h-screen ml-auto mr-auto bg-white font-bold text-3xl pb-14">
      <Header isAuthenticated={isAuthenticated} />
      <div className="flex flex-col justify-center items-center p-[10px]">
        <h1 className="text-3xl font-GmarketBold mb-[10px] text-[#2EC4B6]">Per-form</h1>
        {renderSearchBar()}
        {renderCategories()}
      </div>
      {searchTerm.trim() === '' ? (
        <>
          {renderMasterBanner()}
          <div className="flex justify-center items-center w-[100%] p-3 mt-10">
            <AdvertiseButton />
          </div>
          {renderPostSection('피드백 커뮤니티', feedbackPosts, '/feedback', 'feedback')}
          {renderPostSection('루틴/영양 커뮤니티', routineNutritionPosts, '/routine-nutrition', 'routine-nutrition')}
        </>
      ) : (
        <SearchResults
          results={searchResults}
          navigate={navigate}
          getCategoryPath={getCategoryPath}
          isAuthenticated={isAuthenticated}
          showLoginMessage={showLoginRequiredMessage}
        />
      )}
      {showLoginMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-sm font-GmarketBold text-[#FF6B6B]">로그인이 필요한 서비스입니다.</h2>
            <button
              className="px-3 py-2 text-[#2EC4B6] border border-[#2EC4B6] rounded hover:text-white hover:bg-[#2EC4B6] active:text-[#2EC4B6] active:bg-white transition-colors duration-200 rounded-lg font-GmarketMedium text-xs "
              onClick={() => setShowLoginMessage(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
      <AppBar />
    </div>
  );
};

export default Home;
