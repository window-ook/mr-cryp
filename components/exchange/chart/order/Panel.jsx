import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IoRefreshCircle } from 'react-icons/io5';

export default function Panel({ value, createOrder }) {
  const code = useSelector(state => state.chart.code);
  const currPrice = useSelector(state => state.chart.currPrice);

  const [selectedValue, setSelectedValue] = useState('a');
  const [bidableCash, setBidableCash] = useState(3000000);
  const [price, setPrice] = useState(currPrice || 0);
  const [balance, setBalance] = useState(1);
  const [accPrice, setAccPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState('');

  const handleRadio = event => setSelectedValue(event.target.value);

  const handlePriceIncrement = () => {
    setPrice(prevPrice => {
      const incrementedPrice = Math.max(1, parseFloat(prevPrice) + price * 0.1);
      const maxPrice = currPrice * 1.1;
      return Math.min(incrementedPrice, maxPrice);
    });
  };

  const handlePriceDecrement = () => {
    setPrice(prevPrice => {
      const decrementedPrice = Math.max(1, parseFloat(prevPrice) - price * 0.1);
      const minPrice = currPrice * 0.9;
      return Math.max(decrementedPrice, minPrice);
    });
  };

  const handlePriceChange = event => {
    if (!isNaN(event.target.value)) {
      const inputPrice = Math.max(0, parseFloat(event.target.value));
      const minPrice = currPrice * 0.9;
      const maxPrice = currPrice * 1.1;
      setPrice(Math.min(Math.max(inputPrice, minPrice), maxPrice));
    }
    if (event.target.value.length === 0) setPrice(0);
  };

  const handleBalanceIncrement = () =>
    setBalance(prevBalance => Math.max(0, prevBalance + 1));

  const handleBalanceDecrement = () =>
    setBalance(prevBalance => Math.max(0, prevBalance - 1));

  const handleBalanceChange = event => {
    let input = event.target.value;
    if (!isNaN(input) && /^(\d+(\.\d*)?|\.\d+)?$/.test(input))
      setBalance(input);
    if (input.length === 0) setBalance(0);
  };

  const handleAlertOpen = () => {
    if (bidableCash > accPrice && accPrice > 0) setSuccess('success');
    else setSuccess('error');
    setOpen(true);
  };

  const handleAlertClose = reason => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleBidableCash = () => setBidableCash(bidableCash - accPrice);

  const handleReset = () => {
    setPrice(currPrice);
    setBalance(1);
  };

  const handleOrder = () => {
    try {
      if (bidableCash > accPrice && accPrice > 0) {
        const orderType = value === '1' ? '매수' : '매도';
        const newOrder = {
          orderTime: new Date().toLocaleString(),
          marketName: code,
          type: orderType,
          unitPrice: price,
          orderPrice: accPrice,
          orderQuantity: balance,
          unfilledQuantity: balance,
        };
        createOrder(newOrder);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    handleOrder();
    handleAlertOpen();
    handleBidableCash();
    handleReset();
  };

  useEffect(() => {
    setAccPrice(price * balance);
  }, [price, balance]);

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={`${value === '1' || value === '2' ? 'block' : 'hidden'}`}
    >
      <div className="flex flex-col gap-3">
        {/* 모바일 주문유형 */}
        <div className="hidden max-sm:block">
          <div className="flex flex-col items-center">
            <div className="flex gap-2">
              <span className="font-ng text-sm">지정가</span>
              <span className="font-ng text-sm">시장가</span>
              <span className="font-ng text-sm">예약-지정가</span>
            </div>
            <div className="flex gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={selectedValue === 'a'}
                  onChange={handleRadio}
                  value="a"
                  name="radio-buttons"
                  aria-label="지정가"
                  className="mr-2"
                />
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={selectedValue === 'b'}
                  onChange={handleRadio}
                  value="b"
                  name="radio-buttons"
                  aria-label="시장가"
                  className="mr-2"
                />
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={selectedValue === 'c'}
                  onChange={handleRadio}
                  value="c"
                  name="radio-buttons"
                  aria-label="예약-지정가"
                  className="mr-2"
                />
              </label>
            </div>
          </div>
        </div>

        {/* 데스크탑 주문유형 */}
        <div className="flex gap-2 items-center max-sm:hidden">
          <span className="font-ng text-sm">주문유형</span>
          <div className="flex items-center">
            <label className="flex items-center mr-4">
              <input
                type="radio"
                checked={selectedValue === 'a'}
                onChange={handleRadio}
                value="a"
                name="radio-buttons"
                aria-label="지정가"
                className="mr-2"
              />
              <span className="font-ng text-sm">지정가</span>
            </label>
            <label className="flex items-center mr-4">
              <input
                type="radio"
                checked={selectedValue === 'b'}
                onChange={handleRadio}
                value="b"
                name="radio-buttons"
                aria-label="시장가"
                className="mr-2"
              />
              <span className="font-ng">시장가</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={selectedValue === 'c'}
                onChange={handleRadio}
                value="c"
                name="radio-buttons"
                aria-label="예약-지정가"
                className="mr-2"
              />
              <span className="font-ng">예약-지정가</span>
            </label>
          </div>
        </div>

        {/* 주문가능 금액 */}
        <div className="flex items-center justify-between">
          <span className="font-ng text-sm">주문가능</span>
          <span className="font-ng text-sm">
            {value === '1' ? parseFloat(bidableCash).toLocaleString() : 0} KRW
          </span>
        </div>

        {/* 매수가격 / 매도가격 */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-ng text-sm">
              {value === '1' ? '매수가격' : '매도가격'}
            </span>
            <span className="font-ng text-sm">(KRW)</span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              className="w-[9.375rem] max-sm:w-20 px-3 py-2 border rounded"
            />
            <button
              aria-label="주문하기: 가격 줄이기"
              onClick={handlePriceDecrement}
              className="px-3 py-2 ml-1 hover:bg-gray-100 rounded"
            >
              -
            </button>
            <button
              aria-label="주문하기: 가격 늘리기"
              onClick={handlePriceIncrement}
              className="px-3 py-2 hover:bg-gray-100 rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* 주문수량 */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-ng text-sm">주문수량</span>
            <span className="font-ng text-sm">({code})</span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={balance}
              onChange={handleBalanceChange}
              className="w-[9.375rem] max-sm:w-20 px-3 py-2 border rounded"
            />
            <button
              aria-label="주문하기: 주문수량 줄이기"
              onClick={handleBalanceDecrement}
              className="px-3 py-2 ml-1 hover:bg-gray-100 rounded"
            >
              -
            </button>
            <button
              aria-label="주문하기: 주문수량 늘리기"
              onClick={handleBalanceIncrement}
              className="px-3 py-2 hover:bg-gray-100 rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* 주문총액 */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-ng text-sm">주문총액</span>
            <span className="font-ng text-sm">(KRW)</span>
          </div>
          <input
            type="text"
            value={accPrice}
            readOnly
            className="w-[7.5rem] sm:w-[12.5rem] px-3 py-2 border rounded bg-gray-50"
          />
        </div>

        {/* 안내문 */}
        <div className="flex justify-end gap-3">
          <span className="font-ng text-xs">최소주문 금액: 5,000 KRW</span>
          <span className="font-ng text-xs">수수료(부가세 포함): 0.05%</span>
        </div>

        {/* 버튼 */}
        <div className="flex items-center justify-between gap-2">
          <button
            className="w-20 sm:w-[6.25rem] px-4 py-3 rounded bg-main-dark hover:bg-main-light flex justify-center text-white transition-colors duration-200"
            aria-label="주문하기: 폼 초기화"
            onClick={handleReset}
          >
            <IoRefreshCircle />
          </button>
          <button
            className="w-20 sm:w-[15.625rem] px-4 py-2 rounded bg-main-dark hover:bg-main-light flex justify-center text-white transition-colors duration-200"
            aria-label="주문하기: 주문 완료"
            onClick={handleSubmit}
          >
            <span className="font-ng font-bold">
              {value === '1' ? '매수' : '매도'}
            </span>
          </button>
        </div>

        {/* 알림 */}
        {open && (
          <div className="fixed bottom-4 left-4 z-50">
            <div
              className={`${
                success === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}
            >
              <span className="font-ng">
                {success === 'success'
                  ? '주문했습니다'
                  : '주문총액을 다시 확인해주세요'}
              </span>
              <button
                onClick={handleAlertClose}
                className="ml-4 text-white hover:text-gray-200"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
