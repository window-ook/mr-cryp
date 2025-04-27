import { useMemo } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const TableHeader = ({ w, py = 'py-[0.25rem]', text }) => {
  return (
    <th className={`${w} ${py}`}>
      <span className="font-ng font-bold text-white text-xs max-[900px]:text-[0.5rem]">
        {text}
      </span>
    </th>
  );
};

export default function MarketList({
  keyword,
  codeMap,
  tickers,
  handleRowClick,
  handleSearchChange,
}) {
  const filteredTickers = useMemo(() => {
    return tickers.filter(ticker => {
      const marketName = codeMap[ticker.code] || codeMap[ticker.market];
      return (
        (marketName && marketName.includes(keyword.toLowerCase())) ||
        (ticker.code &&
          ticker.code.toLowerCase().includes(keyword.toLowerCase())) ||
        (ticker.market &&
          ticker.market.toLowerCase().includes(keyword.toLowerCase()))
      );
    });
  }, [tickers, keyword, codeMap]);

  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full">
        <input
          aria-label="마켓 검색"
          type="text"
          className="w-full h-[2.5rem] px-1 border border-none focus:outline-none focus:ring-1 focus:ring-main-dark bg-white"
          placeholder="마켓 검색"
          value={keyword}
          onChange={handleSearchChange}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <SearchIcon />
        </div>
      </div>
      <div className="max-w-full h-[calc(58rem-2.7rem)] overflow-y-auto overflow-x-hidden m-0 p-0 bg-white">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-main">
            <tr>
              <TableHeader w="w-[6.75rem]" text="코인" />
              <TableHeader w="w-[4rem]" text="현재가" />
              <TableHeader w="w-[4rem]" text="전일대비" />
              <TableHeader w="w-[4rem]" text="거래대금" />
            </tr>
          </thead>
          <tbody>
            {filteredTickers &&
              filteredTickers.map(ticker => (
                <tr
                  className="hover:bg-list-hover cursor-pointer transition-all duration-150 ease-in"
                  key={`${ticker.acc_trade_price} + ${ticker.signed_change_rate}`}
                  onClick={() => {
                    handleRowClick(
                      ticker.code || ticker.market,
                      ticker.signed_change_rate,
                      ticker.prev_closing_price,
                      ticker.trade_price,
                    );
                  }}
                >
                  <td className="table-cell w-[6.75rem] px-0.5 border-b-[0.063rem] border-b-[#e0e0e0]">
                    <div className="flex flex-col">
                      <span className="font-ng font-bold text-xs">
                        {codeMap[ticker.code] || codeMap[ticker.market]}
                      </span>
                      <span className="text-market-code text-xs">
                        {ticker.code || ticker.market}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`table-cell w-[4rem] px-0.5 border-b-[0.063rem] border-b-[#e0e0e0] text-right ${
                      ticker.signed_change_rate > 0
                        ? 'text-pos'
                        : ticker.signed_change_rate < 0
                          ? 'text-neg'
                          : 'text-black'
                    }`}
                  >
                    <span className="font-onetitle font-bold text-[0.6rem]">
                      {ticker.trade_price !== undefined &&
                      ticker.trade_price !== null
                        ? ticker.trade_price.toLocaleString()
                        : 0}
                    </span>
                  </td>
                  <td
                    className={`table-cell w-[4rem] px-0.5 border-b-[0.063rem] border-b-[#e0e0e0] text-right ${
                      ticker.signed_change_rate > 0
                        ? 'text-pos'
                        : ticker.signed_change_rate < 0
                          ? 'text-neg'
                          : 'text-black'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-onetitle font-bold text-[0.6rem]">
                        {(ticker.signed_change_rate * 100).toFixed(2)}%
                      </span>
                      <span className="font-onetitle text-market-code text-[0.6rem]">
                        {ticker.signed_change_price.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell w-[4rem] px-0.5 border-b-[0.063rem] border-b-[#e0e0e0] whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-onetitle text-[0.6rem]">
                        {Math.round(
                          parseInt(ticker.acc_trade_price_24h) / 1000000,
                        ).toLocaleString()}
                      </span>
                      <span className="font-onetitle text-[0.6rem]">백만</span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
