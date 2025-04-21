import { useMemo } from 'react';
import { styled } from '@mui/system';
import { globalColors } from '@/globalColors';
import { TableContainer, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StyledTableContainer = styled(TableContainer)(() => ({
  maxWidth: '100%',
  height: 'calc(58rem - 3.438rem)',
  overflowY: 'auto',
  overflowX: 'hidden',
  margin: 0,
  padding: 0,
  backgroundColor: globalColors.white,
}));

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
    <section>
      <TextField
        aria-label="마켓 검색"
        label="마켓 검색"
        id="outlined"
        fullWidth
        value={keyword}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ bgcolor: 'white', borderRadius: 1 }}
      />
      <StyledTableContainer>
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-main">
            <tr>
              <th className="w-[6.75rem] py-[0.25rem]">
                <span className="font-ng font-bold text-white text-xs max-[900px]:text-[0.5rem]">
                  코인
                </span>
              </th>
              <th className="w-[4rem] py-[0.25rem]">
                <span className="font-ng font-bold text-white text-xs max-[900px]:text-[0.5rem]">
                  현재가
                </span>
              </th>
              <th className="w-[4rem] py-[0.25rem]">
                <span className="font-ng font-bold text-white text-xs max-[900px]:text-[0.5rem]">
                  전일대비
                </span>
              </th>
              <th className="w-[4rem] py-[0.25rem]">
                <span className="font-ng font-bold text-white text-xs max-[900px]:text-[0.5rem]">
                  거래대금
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTickers &&
              filteredTickers.map(ticker => (
                <tr
                  className="hover:bg-list_hover cursor-pointer"
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
                  <td className="table-cell w-[6.75rem] border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid">
                    <div className="flex flex-col">
                      <span className="font-ng font-bold text-xs">
                        {codeMap[ticker.code] || codeMap[ticker.market]}
                      </span>
                      <span className="text-market_code text-xs">
                        {ticker.code || ticker.market}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`table-cell w-[4rem] border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid text-right ${
                      ticker.signed_change_rate > 0
                        ? 'text-color_pos'
                        : ticker.signed_change_rate < 0
                          ? 'text-color_neg'
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
                    className={`table-cell w-[4rem] border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid text-right ${
                      ticker.signed_change_rate > 0
                        ? 'text-color_pos'
                        : ticker.signed_change_rate < 0
                          ? 'text-color_neg'
                          : 'text-black'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-onetitle font-bold text-[0.6rem]">
                        {(ticker.signed_change_rate * 100).toFixed(2)}%
                      </span>
                      <span className="font-onetitle text-market_code text-[0.6rem]">
                        {ticker.signed_change_price.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell w-[4rem] border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid whitespace-nowrap">
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
      </StyledTableContainer>
    </section>
  );
}
