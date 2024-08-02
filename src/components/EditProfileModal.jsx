import React, { useState, useRef, useEffect } from 'react';
import defaultImage from '../assets/images/default.png';

const EditProfileModal = ({ userInfo, onSave, onClose }) => {
  const [name, setName] = useState(userInfo.name);
  const [sns, setSns] = useState(userInfo.sns);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(userInfo.profileImage);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreviewImage(userInfo.profileImage);
  }, [userInfo.profileImage]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sns', sns);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-GmarketBold">프로필 수정</h2>
        <div className="mb-4 text-center">
          <img
            src={previewImage || defaultImage}
            alt="프로필 미리보기"
            className="object-cover w-32 h-32 mx-auto mb-2 rounded-full"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 text-sm text-[#2EC4B6] border border-[#2EC4B6] rounded hover:bg-[#2EC4B6] hover:text-white transition-colors duration-200"
          >
            이미지 변경
          </button>
          <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" ref={fileInputRef} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-GmarketMedium">
              이름
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-sm border rounded font-GmarketLight"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-GmarketMedium">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={userInfo.email}
              className="w-full p-2 text-sm bg-gray-100 border rounded font-GmarketLight"
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sns" className="block mb-2 font-GmarketMedium">
              SNS
            </label>
            <input
              type="text"
              id="sns"
              value={sns}
              onChange={(e) => setSns(e.target.value)}
              className="w-full p-2 text-sm border rounded font-GmarketLight"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              취소
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-[#2EC4B6] rounded hover:bg-[#2AB0A3]">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
