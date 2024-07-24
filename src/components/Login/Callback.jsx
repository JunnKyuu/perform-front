import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import qs from 'qs';

// 인증 코드를 사용해서 엑세스 토큰을 얻고, 백엔드 서버에 전달
const Callback = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:5173/auth/kakao/callback';
  const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  const { dispatch } = useAuth(); // useAuth 훅을 사용하여 dispatch를 가져옴

  const getToken = async () => {
    // 인증 코드 추출
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });

    try {
      // 액세스 토큰 요청
      const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);
      const accessToken = res.data.access_token;

      // 백엔드 서버에 액세스 토큰 전달
      const API_ENDPOINT = 'api추가/users/signin';

      await axios.post(
        API_ENDPOINT,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 카카오 SDK 초기화 및 액세스 토큰 설정
      window.Kakao.init(REST_API_KEY);
      window.Kakao.Auth.setAccessToken(accessToken);

      // 유저 정보 가져오기
      const userInfo = await getUserInfo(accessToken);
      console.log(userInfo);

      // 유저 정보를 AuthContext에 저장
      dispatch({
        type: 'LOGIN',
        payload: {
          id: userInfo.id,
          nickname: userInfo.nickname,
          profile_image: userInfo.profile_image,
        },
      });

      // 토큰을 받으면 홈으로 리디렉션
      navigate('/');
    } catch (err) {
      console.error('Error getting token or signing in:', err);
    }
  };

  const getUserInfo = async (accessToken) => {
    try {
      const res = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const {
        id,
        properties: { nickname, profile_image },
      } = res.data;
      return { id, nickname, profile_image };
    } catch (err) {
      console.error('Error fetching userinfo:', err);
      return null;
    }
  };

  useEffect(() => {
    if (code) {
      console.log('Login success');
      getToken();
    } else {
      console.error('Authorization code error');
    }
  }, [code]);

  return null;
};

export default Callback;
