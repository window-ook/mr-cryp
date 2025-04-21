import { memo, useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCode,
  setRate,
  setPrevPrice,
  setCurrPrice,
  setKeyword,
} from '@/utils/redux/chartSlice';
import { LinearProgress } from '@mui/material';
import axios from 'axios';
import MarketListUI from './MarketListUI';

function MarketList({ marketCodes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tickers, setTickers] = useState([]);

  const dispatch = useDispatch();

  const intervalTime = useSelector(state => state.chart.intervalTime);

  const keyword = useSelector(state => state.chart.keyword);

  const codeMap = useMemo(() => {
    const map = {};
    marketCodes.forEach(item => {
      map[item.market] = item.korean_name;
    });
    return map;
  }, [marketCodes]);

  useEffect(() => {
    if (marketCodes) {
      const fetchTickers = async () => {
        try {
          const codesString = marketCodes
            .filter(code => code.market.includes('KRW'))
            .map(code => code.market)
            .join(',');
          const response = await axios.get(`/api/tickers?codes=${codesString}`);
          const data = await response.data;
          setTickers(data);
        } catch (error) {
          console.error('마켓 리스트 다운로드 오류: ', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTickers();
      const interval = setInterval(fetchTickers, intervalTime);
      return () => clearInterval(interval);
    }
  }, [marketCodes, intervalTime]);

  const handleSearchChange = e => dispatch(setKeyword(e.target.value));

  const handleRowClick = (code, rate, prevPrice, currPrice) => {
    dispatch(setCode(code));
    dispatch(setRate(rate));
    dispatch(setPrevPrice(prevPrice));
    dispatch(setCurrPrice(currPrice));
  };

  const props = {
    keyword,
    tickers,
    codeMap,
    handleRowClick,
    handleSearchChange,
  };

  if (isLoading) return <LinearProgress color="primary" />;

  return <MarketListUI {...props} />;
}

export default memo(MarketList);
