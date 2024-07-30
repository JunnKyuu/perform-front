import coin from '../assets/images/coin.png';

const AdvertiseButton = () => {
  return (
    <button className="text-[10px] sm:text-xs w-full flex flex-nowrap justify-center items-center bg-[#5AE3D6] hover:bg-[#38948B] active:bg-[#235F5A] p-1 sm:py-3 sm:px-4 rounded-[5px]">
      <div className="flex items-center flex-shrink-0 mr-1 space-x-1 sm:mr-2">
        <span className="text-white font-GmarketMedium whitespace-nowrap">신규 가입하고</span>
        <span className="text-[#FEE502] font-GmarketBold whitespace-nowrap">최대 1만 코인</span>
        <span className="text-white font-GmarketMedium whitespace-nowrap">받기</span>
      </div>
      <img src={coin} className="w-4 h-4 sm:w-6 sm:h-6" alt="코인" />
    </button>
  );
};

export default AdvertiseButton;
