import coin from '../assets/images/coin.png';

const AdvertiseButton = () => {
  return (
    <button className="text-sm w-[100%] flex justify-center items-center bg-[#5AE3D6] hover:bg-[#38948B] active:bg-[#235F5A] p-[5px] rounded-[5px]">
      <div className="w-[40%] flex justify-between mr-[10px]">
        <span className="text-white font-GmarketMedium">신규 가입하고</span>
        <span className="text-[#FEE502] font-GmarketBold">최대 1만 코인</span>
        <span className="text-white font-GmarketMedium">받기</span>
      </div>
      <img src={coin} />
    </button>
  );
};

export default AdvertiseButton;
