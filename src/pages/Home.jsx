import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const Home = () => {
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  return (
    <div className="max-w-[600px] h-[200vh] ml-auto mr-auto bg-white font-bold text-3xl">
      <Header isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Home;
