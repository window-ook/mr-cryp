import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: 'KRW-BTC',
  intervalTime: 5000,
  rate: 0,
  prevPrice: null,
  currPrice: null,
  open: false,
};

/**
  @method setCode 마켓 코드
  @method setRate 등락율
  @method setPrevPrice 전날 종가
  @method setCurrPrice 현재가
  @method setOpen 모달 오픈
 */
const chartSlice = createSlice({
  name: 'chartSlice',
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setCallTime: (state, action) => {
      state.intervalTime = action.payload;
    },
    setRate: (state, action) => {
      state.rate = action.payload;
    },
    setPrevPrice: (state, action) => {
      state.prevPrice = action.payload;
    },
    setCurrPrice: (state, action) => {
      state.currPrice = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setCode, setRate, setPrevPrice, setCurrPrice, setOpen } =
  chartSlice.actions;
export default chartSlice.reducer;
