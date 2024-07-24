// src/pages/Board.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Board = () => {
  const { state } = useAuth();
  const { user } = state;

  return (
    <div className="board-container">
      <h1>게시판</h1>
      <p>로그인한 사용자만 글을 쓸 수 있습니다.</p>
      <div className="user-info">
        <h2>Welcome, {user.nickname}!</h2>
        <img src={user.profile_image} alt="Profile" />
      </div>
      {/* 글 작성 폼 등을 여기에 추가 */}
    </div>
  );
};

export default Board;
