import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@/components/shared/CircularProgress';

export default function Orderbook({ orderbookData }) {
  const rate = useSelector(state => state.chart.rate);
  const prevPrice = useSelector(state => state.chart.prevPrice);

  const [numColor, setNumColor] = useState(
    rate === 0 ? 'text-black' : rate > 0 ? 'text-positive' : 'text-negative',
  );
  const [bidMaxSize, setBidMaxSize] = useState(0);
  const [askMaxSize, setAskMaxSize] = useState(0);

  const getMaxSize = useCallback(data => {
    if (!data || !data.orderbook_units) {
      return [0, 0];
    }
    const askSizes = data.orderbook_units.map(unit => unit.ask_size);
    const bidSizes = data.orderbook_units.map(unit => unit.bid_size);
    return [Math.max(...askSizes), Math.max(...bidSizes)];
  }, []);

  useEffect(() => {
    setNumColor(
      rate === 0 ? 'text-black' : rate > 0 ? 'text-positive' : 'text-negative',
    );
  }, [rate]);

  useEffect(() => {
    const [maxAskSize, maxBidSize] = getMaxSize(orderbookData);
    setAskMaxSize(maxAskSize);
    setBidMaxSize(maxBidSize);
  }, [getMaxSize, orderbookData]);

  return (
    <section className="w-full h-[28.1rem] overflow-y-scroll bg-white">
      <table className="w-full border-collapse">
        <thead className="h-[2.5rem] sticky top-0 z-10 bg-main">
          <tr>
            <th className="py-[0.25rem] w-1/3">
              <span className="font-head">매도 물량</span>
            </th>
            <th className="py-[0.25rem] w-1/3">
              <span className="font-head">가격</span>
            </th>
            <th className="py-[0.25rem] w-1/3">
              <span className="font-head">매수 물량</span>
            </th>
          </tr>
        </thead>
        {orderbookData?.orderbook_units && orderbookData[0] !== 0 ? (
          <tbody>
            {/* 매도 */}
            {[...orderbookData.orderbook_units]
              .reverse()
              .map((element, index) => (
                <tr key={`${element.ask_price}${index}`}>
                  <td className="table-cell w-1/3 py-1 bg-[#b6f5fa] h-[1rem] border-b-[0.063rem] border-b-[#e0e0e0]">
                    <div className="relative">
                      <span className="absolute top-[0.2rem] right-0 font-price text-3xs lg:text-2xs text-gray-500">
                        {Number(element.ask_size).toFixed(4)}
                      </span>
                      <div
                        className={`absolute opacity-50 max-w-[100%] right-0 -top-[0.4rem] h-[0.6rem] bg-[#42b3e3]`}
                        style={{
                          width: `${(element.ask_size / askMaxSize) * 100}%`,
                        }}
                      />
                    </div>
                  </td>
                  <td className="table-cell w-1/3 p-1 border-b-[0.063rem] border-b-[#e0e0e0]">
                    <div className="flex justify-between">
                      <span
                        className={`font-price font-bold text-xs lg:text-sm ${numColor}`}
                      >
                        {Number(element.ask_price).toLocaleString()}
                      </span>
                      <span
                        className={`font-price font-bold text-xs lg:text-sm ${numColor}`}
                      >
                        {Number(rate) > 0 ? '+' : ''}
                        {prevPrice &&
                          Number(
                            ((element.ask_price - prevPrice) / prevPrice) * 100,
                          ).toFixed(2)}
                        {prevPrice && '%'}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell w-1/3 p-1 border-b-[0.063rem] border-b-[#e0e0e0]" />
                </tr>
              ))}

            {/* 매수 */}
            {[...orderbookData.orderbook_units].map((element, index) => (
              <tr key={`bid_${index}`}>
                <td className="table-cell w-1/3 p-1 border-b-[0.063rem] border-b-[#e0e0e0]" />
                <td className="table-cell w-1/3 p-1 border-b-[0.063rem] border-b-[#e0e0e0]">
                  <div className="flex justify-between">
                    <span
                      className={`font-price font-bold text-xs lg:text-sm ${numColor}`}
                    >
                      {Number(element.bid_price).toLocaleString()}
                    </span>
                    <span
                      className={`font-price font-bold text-xs lg:text-sm ${numColor}`}
                    >
                      {Number(rate) > 0 ? '+' : ''}
                      {prevPrice &&
                        Number(
                          ((element.bid_price - prevPrice) / prevPrice) * 100,
                        ).toFixed(2)}
                      {prevPrice && '%'}
                    </span>
                  </div>
                </td>
                <td className="table-cell w-1/3 py-1 bg-[#f5bfd0] h-[1rem] border-b-[0.063rem] border-b-[#e0e0e0]">
                  <div className="relative">
                    <span className="absolute top-[0.2rem] left-0 font-price text-3xs lg:text-2xs text-gray-500">
                      {Number(element.bid_size).toFixed(4)}
                    </span>
                    <div
                      className={`absolute opacity-50 max-w-[100%] left-0 -top-[0.5rem] h-[0.6rem] bg-[#b567b0]`}
                      style={{
                        width: `${(element.bid_size / bidMaxSize) * 100}%`,
                      }}
                    />
                  </div>
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
