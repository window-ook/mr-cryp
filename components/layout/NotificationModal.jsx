export default function NotificationModal({ open, handleClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-gray-300/75 transition-opacity"
          aria-labelledby="알림 정보"
          aria-describedby="주문 체결 관련 알림이 표시되는 모달입니다."
        >
          <div className="modal-box md:w-[30rem]">
            <div className="flex flex-col justify-center mr-[0.3rem] gap-4">
              <span className="text-sm">
                KRW-BTC <span className="text-red-500">0.0023</span>
                (₩3414599.04) 주문 체결되었습니다. (2025-01-31 17:07:25)
              </span>
              <div className={`bg-gray-100 h-1 w-full rounded-3xl`}></div>
              <button
                onClick={handleClose}
                className="p-4 rounded-md bg-main text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
