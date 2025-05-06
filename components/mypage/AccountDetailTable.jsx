const HoldingAmount = ({ balance, price }) => {
  return (
    <div className="flex flex-col">
      <span className="font-pretendard font-bold">
        {parseFloat(parseFloat(price) * balance).toLocaleString()} KRW
      </span>
    </div>
  );
};

const HoldingRatio = ({ percentage }) => {
  return (
    <div className="flex flex-col">
      <span className="font-pretendard font-bold">
        {percentage.toFixed(2)}%
      </span>
    </div>
  );
};

export default function AccountDetailTable({ balance }) {
  const totalBalance = balance.reduce(
    (sum, item) => sum + parseFloat(item.balance) * item.avg_buy_price,
    0,
  );

  return (
    <div className="w-full h-full m-0 rounded-t-none bg-white shadow-md">
      <table className="w-full">
        <thead>
          <tr className="bg-main text-left">
            <th className="p-4">
              <span className="text-white text-lg font-pretendard font-bold">
                자산
              </span>
            </th>
            <th className="text-left">
              <span className="text-white text-lg font-pretendard font-bold">
                통화
              </span>
            </th>
            <th className="text-center">
              <span className="text-white text-lg font-pretendard font-bold">
                보유 비율
              </span>
            </th>
            <th className="text-left">
              <span className="text-white text-lg font-pretendard font-bold">
                보유 금액
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {balance &&
            balance.map((item, index) => (
              <tr key={item.currency} className="hover:bg-[#F5F5F5]">
                <td className="p-2">
                  {index === 0 ? (
                    <span className="font-ng font-bold">원화</span>
                  ) : item.currency === 'ETH' ? (
                    <span className="font-ng font-bold">이더리움</span>
                  ) : (
                    <span className="font-ng font-bold">리플</span>
                  )}
                </td>
                <td className="text-left">
                  <span className="font-ng font-bold text-main">
                    {item.currency}
                  </span>
                </td>
                <td className="text-center">
                  <HoldingRatio
                    percentage={
                      index === 0
                        ? (parseFloat(item.balance) / totalBalance) * 100
                        : ((parseFloat(item.avg_buy_price) * item.balance) /
                            totalBalance) *
                          100
                    }
                  />
                </td>
                <td className="text-left">
                  <HoldingAmount
                    balance={item.balance}
                    price={item.avg_buy_price}
                  />
                </td>
              </tr>
            ))}
          <tr>
            <td className="p-2">
              <span className="font-pretendard font-bold">총액</span>
            </td>
            <td />
            <td />
            <td className="text-left">
              <span className="font-pretendard font-bold">
                {parseFloat(totalBalance).toLocaleString()} {'KRW'}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
