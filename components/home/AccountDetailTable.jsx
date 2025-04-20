import { NGTypo } from '@/defaultTheme';

function HoldingAmount({ balance, price }) {
  return (
    <div className="flex flex-col">
      <NGTypo>보유수량(평가금액)</NGTypo>
      <NGTypo fontWeight={'bold'}>
        {parseFloat(parseFloat(price) * balance).toLocaleString()} KRW
      </NGTypo>
    </div>
  );
}

function HoldingRatio({ percentage }) {
  return (
    <div className="flex flex-col">
      <NGTypo>보유비중</NGTypo>
      <NGTypo fontWeight={'bold'}>{percentage.toFixed(2)}%</NGTypo>
    </div>
  );
}

export default function AccountDetailTable({ balance }) {
  const totalBalance = balance.reduce(
    (sum, item) => sum + parseFloat(item.balance) * item.avg_buy_price,
    0,
  );

  return (
    <div className="w-full h-full m-0 rounded-t-none bg-white shadow-md max-[700px]:w-full max-[500px]:w-full">
      <table className="w-full">
        <thead>
          <tr className="bg-main text-left">
            <th className="p-4">
              <span className="text-lg font-pretendard font-bold">자산</span>
            </th>
            <th className="text-left">
              <span className="text-lg font-pretendard font-bold">통화</span>
            </th>
            <th className="text-center">
              <span className="text-lg font-pretendard font-bold">
                보유 비율
              </span>
            </th>
            <th className="text-left">
              <span className="text-lg font-pretendard font-bold">
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
                    <NGTypo fontWeight={'bold'}>원화</NGTypo>
                  ) : item.currency === 'ETH' ? (
                    <NGTypo fontWeight={'bold'}>이더리움</NGTypo>
                  ) : (
                    <NGTypo fontWeight={'bold'}>리플</NGTypo>
                  )}
                </td>
                <td className="text-left">
                  <NGTypo fontWeight={'bold'} color="primary">
                    {item.currency}
                  </NGTypo>
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
              <NGTypo fontWeight={'bold'}>총액</NGTypo>
            </td>
            <td />
            <td />
            <td className="text-left">
              <NGTypo fontWeight={'bold'}>
                {parseFloat(totalBalance).toLocaleString()} {' KRW'}
              </NGTypo>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
