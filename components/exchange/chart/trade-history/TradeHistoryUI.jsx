import CircularProgress from '@/components/shared/ui/CircularProgress';

export default function TradeHistory({ tradeData }) {
  const timestampToTime = timestamp => {
    const time = new Date(timestamp);
    const timeStr = time.toLocaleTimeString();
    return timeStr;
  };

  return (
    <section className="max-w-[62.5rem] h-[26rem] overflow-y-scroll bg-white">
      <table className="w-full">
        <thead className="h-[2.5rem] sticky top-0 z-10 bg-main">
          <tr>
            <th className="py-[0.25rem] w-1/4">
              <span className="font-head">체결 시간</span>
            </th>
            <th className="py-[0.25rem] w-1/4">
              <span className="font-head">체결 가격</span>
            </th>
            <th className="py-[0.25rem] w-1/4">
              <span className="font-head">체결량</span>
            </th>
            <th className="py-[0.25rem] w-1/4">
              <span className="font-head">체결금액</span>
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
                  <span className="font-ng text-xs lg:text-sm">
                    {timestampToTime(data.timestamp)}
                  </span>
                </td>
                <td className="table-cell w-1/4 border-b border-b-[#e0e0e0] text-center">
                  <span className="font-price text-xs lg:text-sm">
                    {Number(data.trade_price).toLocaleString()}원
                  </span>
                </td>
                <td className="table-cell w-1/4 border-b border-b-[#e0e0e0] text-center">
                  <span
                    className={`font-price text-xs lg:text-sm ${
                      data.ask_bid === 'ASK' ? 'text-positive' : 'text-negative'
                    }`}
                  >
                    {data.trade_volume}
                  </span>
                </td>
                <td className="table-cell w-1/4 border-b border-b-[#e0e0e0] text-center">
                  <span
                    className={`font-price text-xs lg:text-sm ${
                      data.ask_bid === 'ASK' ? 'text-positive' : 'text-negative'
                    }`}
                  >
                    {Math.round(
                      data.trade_volume * data.trade_price,
                    ).toLocaleString()}
                    원
                  </span>
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
