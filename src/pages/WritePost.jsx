import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import AppBar from '../components/AppBar';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const {
    state: { isAuthenticated },
  } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/write-post' } });
    }
  }, [isAuthenticated, navigate]);

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
      if (media) {
        formData.append('media', media);
      }

      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('게시글이 성공적으로 저장되었습니다.');
      navigate('/feedback');
    } catch (error) {
      console.error('게시글 제출 중 오류 발생:', error);
      setError('게시글 제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header isAuthenticated={isAuthenticated} />
      <div className="flex items-center justify-between mt-8 mb-4">
        <h1 className="text-xl font-GmarketBold">새 게시글 작성</h1>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="p-1 text-xs sm:text-sm text-[#2EC4B6] border border-[#2EC4B6] rounded hover:text-white hover:bg-[#2EC4B6] active:text-[#2EC4B6] active:bg-white transition-colors duration-200"
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
        />
        {preview && (
          <div className="mb-4">
            {media.type.startsWith('image/') ? (
              <img src={preview} alt="미리보기" className="h-auto max-w-full" />
            ) : (
              <video src={preview} controls className="h-auto max-w-full" />
            )}
          </div>
        )}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setError('');
          }}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="">카테고리 선택</option>
          <option value="복근">복근</option>
          <option value="팔">팔</option>
          <option value="등">등</option>
          <option value="가슴">가슴</option>
          <option value="심사">심사</option>
          <option value="하체">하체</option>
          <option value="어깨">어깨</option>
        </select>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          className="w-full h-40 p-2 mb-4 border rounded resize-none"
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-[#2EC4B6] border border-[#2EC4B6] rounded hover:text-white hover:bg-[#2EC4B6] active:text-[#2EC4B6] active:bg-white transition-colors duration-200"
        >
          게시하기
        </button>
      </form>
      <AppBar />
    </div>
  );
};

export default WritePost;
