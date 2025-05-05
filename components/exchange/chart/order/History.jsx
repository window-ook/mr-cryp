import { useState, Fragment } from 'react';

export default function History({ value, orders, removeOrder }) {
  const [selectedValue, setSelectedValue] = useState('a');
  const [open, setOpen] = useState(false);

  const handleRadio = event => setSelectedValue(event.target.value);

  const handleOpen = () => setOpen(true);

  const handleClose = reason => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleCancel = index => {
    removeOrder(index);
    handleOpen();
  };

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={`${value === '3' ? 'block' : 'hidden'}`}
    >
      <div className="flex flex-col">
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer mr-4">
            <input
              type="radio"
              checked={selectedValue === 'a'}
              onChange={handleRadio}
              value="a"
              name="radio-buttons"
              aria-label="미체결"
              className="mr-2"
            />
            <span className="font-ng">미체결</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              checked={selectedValue === 'b'}
              onChange={handleRadio}
              value="b"
              name="radio-buttons"
              aria-label="체결"
              className="mr-2"
            />
            <span className="font-ng">체결</span>
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th
                  rowSpan={2}
                  className="text-center p-2 border font-ng max-sm:text-xs"
                >
                  주문시간
                </th>
                <th className="text-center p-2 border font-ng max-sm:text-xs">
                  마켓명
                </th>
                <th className="text-center p-2 border font-ng max-sm:text-xs">
                  단위가격
                </th>
                <th className="text-center p-2 border font-ng max-sm:text-xs">
                  주문량
                </th>
                <th
                  rowSpan={2}
                  className="text-center p-2 border font-ng max-sm:text-xs"
                >
                  취소
                </th>
              </tr>
              <tr>
                <th className="text-center p-2 border font-ng max-sm:text-xs">
                  구분
                </th>
                <th className="text-center p-2 border font-ng max-sm:text-xs">
                  주문가격
                </th>
                <th className="text-center p-2 border font-ng max-sm:text-xs">
                  미체결량
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const spliting = order.orderTime.indexOf('오');
                const date = order.orderTime.substring(0, spliting - 1);
                const time = order.orderTime.substring(spliting);
                return (
                  <Fragment key={index}>
                    <tr>
                      <td
                        rowSpan={2}
                        className="text-center p-2 border font-ng max-sm:text-xs"
                      >
                        {date}
                        <br />
                        {time}
                      </td>
                      <td className="text-center p-2 border font-ng max-sm:text-xs">
                        {order.marketName}
                      </td>
                      <td className="text-center p-2 border font-ng max-sm:text-xs">
                        {order.unitPrice}
                      </td>
                      <td className="text-center p-2 border font-ng max-sm:text-xs">
                        {order.orderQuantity}
                      </td>
                      <td rowSpan={2} className="text-center p-2 border">
                        <button
                          className="px-4 py-2 bg-white text-main-dark hover:text-secondary-main rounded transition-colors font-ng"
                          aria-label="주문하기:거래내역 취소 버튼"
                          onClick={() => handleCancel(index)}
                        >
                          취소
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td
                        className={`text-center p-2 border font-ng max-sm:text-xs ${
                          order.type === '매도'
                            ? 'text-neg-400'
                            : 'text-pos-400'
                        }`}
                      >
                        {order.type}
                      </td>
                      <td className="text-center p-2 border font-ng max-sm:text-xs">
                        {order.orderPrice}
                      </td>
                      <td className="text-center p-2 border font-ng max-sm:text-xs">
                        {order.unfilledQuantity}
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {open && (
          <div className="fixed bottom-4 left-4 z-50">
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
              <span className="font-ng">주문을 취소했습니다</span>
              <button
                onClick={handleClose}
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
