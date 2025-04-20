import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FlexCenterBox, NGTypo, theme } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import {
  Alert,
  Radio,
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { TabPanel } from '@mui/lab';
import { styled } from '@mui/system';
import RestoreIcon from '@mui/icons-material/Restore';

const MobileModalTypo = styled(Typography)(() => ({
  fontFamily: 'NEXON Lv1 Gothic OTF',
  '@media (max-width:500px)': {
    fontSize: '0.813rem',
  },
}));

const StyledTextField = styled(TextField)(() => ({
  width: '9.375rem',
  '@media (max-width:500px)': {
    width: '5rem',
  },
}));

const InformationBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  gap: 3,
}));

const ResetButton = styled(Button)(() => ({
  width: '6.25rem',
  '@media (max-width:500px)': {
    width: '5rem',
  },
  color: theme.palette.primary.main,
  backgroundColor: globalColors.white_retro,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
  },
}));

export default function ModalPanel({ value, addOrder, askablePrice }) {
  const code = useSelector(state => state.chart.code);
  const currPrice = useSelector(state => state.chart.currPrice); // 선택한 마켓의 현재가

  const [selectedValue, setSelectedValue] = useState('a');
  const [bidableCash, setBidableCash] = useState(3000000);
  const [price, setPrice] = useState(currPrice || 0); // 지정가 가격
  const [balance, setBalance] = useState(1); // 주문수량
  const [accPrice, setAccPrice] = useState(0); // 가격 * 주문수량
  const [open, setOpen] = useState(false); // 좌측 하단 알림 오픈
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
        addOrder(newOrder);
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
    <>
      <TabPanel value={value}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* 모바일 주문유형 */}
          <Box
            sx={{
              display: 'none',
              '@media (max-width:500px)': {
                display: 'block',
              },
            }}
          >
            <FlexCenterBox sx={{ flexDirection: 'column' }}>
              <FlexCenterBox sx={{ gap: 2 }}>
                <MobileModalTypo>지정가</MobileModalTypo>
                <MobileModalTypo>시장가</MobileModalTypo>
                <MobileModalTypo>예약-지정가</MobileModalTypo>
              </FlexCenterBox>
              <FlexCenterBox sx={{ gap: 2 }}>
                <Radio
                  checked={selectedValue === 'a'}
                  onChange={handleRadio}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': '지정가' }}
                />
                <Radio
                  checked={selectedValue === 'b'}
                  onChange={handleRadio}
                  value="b"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': '시장가' }}
                />
                <Radio
                  checked={selectedValue === 'c'}
                  onChange={handleRadio}
                  value="c"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': '예약-지정가' }}
                />
              </FlexCenterBox>
            </FlexCenterBox>
          </Box>
          {/* 데스크탑 주문유형 */}
          <FlexCenterBox
            sx={{
              gap: 2,
              '@media (max-width:500px)': {
                display: 'none',
              },
            }}
          >
            <NGTypo>주문유형</NGTypo>
            <FlexCenterBox>
              <Radio
                checked={selectedValue === 'a'}
                onChange={handleRadio}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': '지정가' }}
              />
              <NGTypo>지정가</NGTypo>
              <Radio
                checked={selectedValue === 'b'}
                onChange={handleRadio}
                value="b"
                name="radio-buttons"
                inputProps={{ 'aria-label': '시장가' }}
              />
              <NGTypo>시장가</NGTypo>
              <Radio
                checked={selectedValue === 'c'}
                onChange={handleRadio}
                value="c"
                name="radio-buttons"
                inputProps={{ 'aria-label': '예약-지정가' }}
              />
              <NGTypo>예약-지정가</NGTypo>
            </FlexCenterBox>
          </FlexCenterBox>
          {/* 주문가능 금액 */}
          <FlexCenterBox>
            <MobileModalTypo>주문가능</MobileModalTypo>
            <MobileModalTypo>
              {value === '1' ? parseFloat(bidableCash).toLocaleString() : 0} KRW
            </MobileModalTypo>
          </FlexCenterBox>
          {/* 매수가격 / 매도가격 */}
          <FlexCenterBox>
            <Box>
              <MobileModalTypo>
                {value === '1' ? '매수가격' : '매도가격'}
              </MobileModalTypo>
              <MobileModalTypo>(KRW)</MobileModalTypo>
            </Box>
            <FlexCenterBox>
              <StyledTextField value={price} onChange={handlePriceChange} />
              <IconButton
                aria-label="주문하기: 가격 줄이기"
                onClick={handlePriceDecrement}
              >
                -
              </IconButton>
              <IconButton
                aria-label="주문하기: 가격 늘리기"
                onClick={handlePriceIncrement}
              >
                +
              </IconButton>
            </FlexCenterBox>
          </FlexCenterBox>
          {/* 주문수량 */}
          <FlexCenterBox>
            <Box>
              <MobileModalTypo>주문수량</MobileModalTypo>
              <MobileModalTypo>({code})</MobileModalTypo>
            </Box>
            <FlexCenterBox>
              <StyledTextField value={balance} onChange={handleBalanceChange} />
              <IconButton
                aria-label="주문하기: 주문수량 줄이기"
                onClick={handleBalanceDecrement}
              >
                -
              </IconButton>
              <IconButton
                aria-label="주문하기: 주문수량 늘리기"
                onClick={handleBalanceIncrement}
              >
                +
              </IconButton>
            </FlexCenterBox>
          </FlexCenterBox>
          {/* 주문총액 */}
          <FlexCenterBox>
            <Box>
              <MobileModalTypo>주문총액</MobileModalTypo>
              <MobileModalTypo>(KRW)</MobileModalTypo>
            </Box>
            <TextField
              sx={{
                width: '12.5rem',
                '@media (max-width:500px)': {
                  width: '7.5rem',
                },
              }}
              value={accPrice}
            />
          </FlexCenterBox>
          {/* 안내문 */}
          <InformationBox>
            <NGTypo fontSize={12}>최소주문 금액: 5,000 KRW</NGTypo>
            <NGTypo fontSize={12}>수수료(부가세 포함): 0.05%</NGTypo>
          </InformationBox>
          {/* 버튼 */}
          <FlexCenterBox>
            <Tooltip title="초기화">
              <ResetButton
                aria-label="주문하기: 폼 초기화"
                onClick={handleReset}
              >
                <RestoreIcon />
              </ResetButton>
            </Tooltip>
            <Tooltip title="주문">
              <Button
                aria-label="주문하기: 주문 완료"
                sx={{
                  width: '15.625rem',
                  '@media (max-width:500px)': {
                    width: '5rem',
                  },
                }}
                onClick={handleSubmit}
              >
                {value === '1' ? (
                  <NGTypo fontWeight={'bold'}>매수</NGTypo>
                ) : (
                  <NGTypo fontWeight={'bold'}>매도</NGTypo>
                )}
              </Button>
            </Tooltip>
          </FlexCenterBox>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleAlertClose}
          >
            <Alert
              onClose={handleAlertClose}
              severity={success}
              variant="filled"
            >
              {success === 'success'
                ? '주문했습니다'
                : '주문총액을 다시 확인해주세요'}
            </Alert>
          </Snackbar>
        </Box>
      </TabPanel>
    </>
  );
}
