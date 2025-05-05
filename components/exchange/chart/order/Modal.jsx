import { useState } from 'react';
import { useSelector } from 'react-redux';
import History from './History';
import Panel from './Panel';

export default function ModalProvider({ handleClose }) {
  const [activeTab, setActiveTab] = useState('1');
  const [orders, setOrders] = useState([]);
  const open = useSelector(state => state.chart.open);

  const createOrder = newOrder =>
    setOrders(prevOrders => [...prevOrders, newOrder]);

  const removeOrder = index =>
    setOrders(prevOrders => prevOrders.filter((order, i) => i !== index));

  if (!open) return null;

  const tabs = [
    { id: '1', label: '매수' },
    { id: '2', label: '매도' },
    { id: '3', label: '거래내역' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="relative max-sm:w-[18.75rem] max-h-[90vh] w-[500px] p-4 border-[0.5rem] border-main-dark shadow-2xl overflow-y-auto bg-white"
        role="dialog"
        aria-labelledby="주문하기"
        aria-describedby="차트에서 주문하기를 누르면 열립니다."
        onClick={e => e.stopPropagation()}
      >
        <div role="tablist" className="border-b border-divider">
          <div className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 font-ng transition-colors duration-200
                  ${
                    activeTab === tab.id
                      ? 'text-main-dark border-b-2 border-main-dark font-medium'
                      : 'text-gray-500 hover:text-main-dark hover:bg-gray-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          {activeTab === '1' && (
            <div aria-labelledby="tab-1">
              <Panel value="1" createOrder={createOrder} />
            </div>
          )}

          {activeTab === '2' && (
            <div aria-labelledby="tab-2">
              <Panel value="2" createOrder={createOrder} />
            </div>
          )}

          {activeTab === '3' && (
            <div aria-labelledby="tab-3">
              <History value="3" orders={orders} removeOrder={removeOrder} />
            </div>
          )}
        </div>
      </div>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-40"
        aria-hidden="true"
      />
    </div>
  );
}
