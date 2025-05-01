import CircularProgress from '@/components/shared/CircularProgress';
import { HeadTypo, NGTypo, PriceTypo } from '@/defaultTheme';
import { globalColors } from '@/globalColors';

export default function TradeHistory({ tradeData }) {
  const timestampToTime = timestamp => {
    const time = new Date(timestamp);
    const timeStr = time.toLocaleTimeString();
    return timeStr;
  };

  return (
    <section className="max-w-[62.5rem] h-[28.1rem] overflow-y-scroll bg-white">
      <table className="w-full">
        <thead className="h-[2.5rem] sticky top-0 z-10 bg-main">
          <tr>
            <th className="py-[0.25rem] w-1/4">
              <HeadTypo>체결 시간</HeadTypo>
            </th>
            <th className="py-[0.25rem] w-1/4">
              <HeadTypo>체결 가격</HeadTypo>
            </th>
            <th className="py-[0.25rem] w-1/4">
              <HeadTypo>체결량</HeadTypo>
            </th>
            <th className="py-[0.25rem] w-1/4">
              <HeadTypo>체결금액</HeadTypo>
            </th>
          </tr>
        </thead>
        {tradeData?.length && tradeData[0] !== 0 ? (
          <tbody className="min-h-[25.6rem]">
            {tradeData.slice().map(data => (
              <tr
                key={`${data.sequential_id}-${data.timestamp}-${Math.random()}`}
              >
                <td className="table-cell w-1/4 border-b border-b-[#e0e0e0] text-center">
                  <NGTypo fontSize={12}>
                    {timestampToTime(data.timestamp)}
                  </NGTypo>
                </td>
                <td className="table-cell w-1/4 border-b border-b-[#e0e0e0] text-center">
                  <NGTypo fontSize={12}>
                    {Number(data.trade_price).toLocaleString()}원
                  </NGTypo>
                </td>
                <td className="table-cell w-1/4 border-b border-b-[#e0e0e0] text-center">
                  <PriceTypo
                    fontSize={12}
                    color={
                      data.ask_bid === 'ASK'
                        ? globalColors.color_pos['400']
                        : globalColors.color_neg['400']
                    }
                  >
                    {data.trade_volume}
                  </PriceTypo>
                </td>
                <td className="table-cell w-1/4 border-b border-b-[#e0e0e0] text-center">
                  <PriceTypo
                    fontSize={12}
                    color={
                      data.ask_bid === 'ASK'
                        ? globalColors.color_pos['400']
                        : globalColors.color_neg['400']
                    }
                  >
                    {Math.round(
                      data.trade_volume * data.trade_price,
                    ).toLocaleString()}
                    원
                  </PriceTypo>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>
                <CircularProgress />
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </section>
  );
}
