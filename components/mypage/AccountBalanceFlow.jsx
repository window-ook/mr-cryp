export default function AccountBalanceFlow({ totalBalance, flowSize }) {
  return (
    <div className="flex flex-col w-full">
      <span className="font-pretendard font-bold text-xs sm:text-base">
        보유 자산 변동 (단위: 1000 KRW)
      </span>
    </div>
  );
}
