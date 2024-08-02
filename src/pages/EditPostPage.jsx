import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import AppBar from '../components/AppBar';
import { useAuth } from '../context/AuthContext';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [media, setMedia] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);
  const {
    state: { isAuthenticated },
  } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/edit-post/${id}` } });
    } else {
      fetchPost();
    }
  }, [isAuthenticated, navigate, id]);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      // 실제 API 호출로 대체
      // const response = await axios.get(`/api/posts/${id}`);
      // const post = response.data;
      const samplePost = {
        postId: id,
        userId: 'user123',
        user: '헬스초보',
        category: '복근',
        title: '복근 운동 피드백 부탁드려요',
        content: '복근 운동을 시작한 지 얼마 안 됐는데, 제 자세가 맞는지 봐주세요. 어떤 점을 개선해야 할까요?',
        date: '2024-07-24',
        images: [
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
          'https://cdn.eyesmag.com/content/uploads/sliderImages/2024/07/05/KakaoTalk_20240705_152931486_07-5f31a62b-2969-433a-97a3-d1c59f6f8a93.jpg',
        ],
        likes: 15,
      };
      setTitle(samplePost.title);
      setContent(samplePost.content);
      setCategory(samplePost.category);
      setPreviews(samplePost.images);
      setIsLoading(false);
    } catch (error) {
      console.error('게시글 불러오기 중 오류 발생:', error);
      setError('게시글을 불러오는 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setError('카테고리를 선택해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      media.forEach((file, index) => {
        formData.append(`media${index}`, file);
      });

      await axios.put(`/api/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('게시글이 성공적으로 수정되었습니다.');
      navigate('/mypage');
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
      setError('게시글 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMedia((prevMedia) => [...prevMedia, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (index) => {
    setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return <div>게시글을 불러오는 중...</div>;
  }

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header isAuthenticated={isAuthenticated} />
      <div className="flex items-center justify-between mt-8 mb-4">
        <h1 className="text-xl font-GmarketBold">게시글 수정</h1>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="font-GmarketMedium p-1 text-xs sm:text-sm text-[#2EC4B6] border border-[#2EC4B6] rounded hover:text-white hover:bg-[#2EC4B6] active:text-[#2EC4B6] active:bg-white transition-colors duration-200"
        >
          파일 첨부
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*, video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          multiple
        />
        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img src={preview} alt={`미리보기 ${index + 1}`} className="h-auto max-w-full rounded" />
                <button
                  type="button"
                  onClick={() => removeMedia(index)}
                  className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setError('');
          }}
          className="w-full p-2 mb-4 border rounded font-GmarketMedium"
          required
        >
          <option value="">카테고리 선택</option>
          <option value="복근">복근</option>
          <option value="팔">팔</option>
          <option value="등">등</option>
          <option value="가슴">가슴</option>
          <option value="하체">하체</option>
          <option value="어깨">어깨</option>
          <option value="심사">심사</option>
          <option value="루틴">루틴</option>
          <option value="영양">영양</option>
        </select>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full p-2 mb-4 border rounded font-GmarketMedium"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          className="w-full h-40 p-2 mb-4 border rounded resize-none font-GmarketLight"
          required
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/my-page')}
            className="font-GmarketMedium w-[48%] p-2 text-gray-600 border border-gray-300 rounded hover:bg-[#FF6B6B] hover:text-white transition-colors duration-200"
          >
            취소
          </button>
          <button
            type="submit"
            className="font-GmarketMedium w-[48%] p-2 text-[#2EC4B6] border border-[#2EC4B6] rounded hover:text-white hover:bg-[#2EC4B6] active:text-[#2EC4B6] active:bg-white transition-colors duration-200"
          >
            수정하기
          </button>
        </div>
      </form>
      <AppBar />
    </div>
  );
};

export default EditPostPage;
