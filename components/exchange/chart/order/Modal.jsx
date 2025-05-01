import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import History from './History';
import Panel from './Panel';

export default function ModalProvider({ handleClose }) {
  const [value, setValue] = useState('1'); // 주문수량
  const [orders, setOrders] = useState([]); // 주문내역
  const open = useSelector(state => state.chart.open);

  const addOrder = newOrder =>
    setOrders(prevOrders => [...prevOrders, newOrder]);

  const removeOrder = index =>
    setOrders(prevOrders => prevOrders.filter((order, i) => i !== index));

  const handleChange = (event, newValue) => setValue(newValue);

  const askablePrice = orders
    .filter(order => order.type === '매수')
    .reduce((acc, order) => acc + parseFloat(order.orderPrice), 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="relative max-sm:w-[18.75rem] max-h-[90vh] w-[500px] p-1 border-[0.5rem] border-main-dark shadow-2xl overflow-y-auto bg-white"
        role="dialog"
        aria-labelledby="주문하기"
        aria-describedby="차트에서 주문하기를 누르면 열립니다."
      >
        <TabContext value={value}>
          <div className="border-b border-divider">
            <TabList onChange={handleChange} aria-label="매수 매도 주문">
              <Tab fontFamily="NEXON Lv1 Gothic OTF" label="매수" value="1" />
              <Tab fontFamily="NEXON Lv1 Gothic OTF" label="매도" value="2" />
              <Tab
                fontFamily="NEXON Lv1 Gothic OTF"
                label="거래내역"
                value="3"
              />
            </TabList>
          </div>
          <Panel value="1" addOrder={addOrder} />
          <Panel value="2" addOrder={addOrder} askablePrice={askablePrice} />
          <History value="3" orders={orders} removeOrder={removeOrder} />
        </TabContext>
      </div>
      <div
        className="fixed inset-0 z-40"
        onClick={handleClose}
        aria-hidden="true"
      />
    </div>
  );
}
