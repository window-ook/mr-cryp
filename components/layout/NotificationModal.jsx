import { theme } from '@/defaultTheme';
import { styled } from '@mui/system';
import { Box, Modal } from '@mui/material';

const ModalBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '31.25rem',
  '@media (max-width:1000px)': {
    width: '80%',
  },
  backgroundColor: '#fff',
  border: '0.25rem solid',
  borderColor: `${theme.palette.primary.main}`,
  padding: '2rem 4rem 2rem 4rem',
  boxShadow: '1rem',
}));

const ProfileBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center ',
  marginRight: '0.3rem',
  gap: '0.25rem',
}));

export default function NotificationModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <ProfileBox>
          <span className="text-sm">
            KRW-BTC <span className="text-red-500">0.0023</span>
            (₩3414599.04) 주문 체결되었습니다. (2025-01-31 17:07:25)
          </span>
          <div className={`bg-[#e1e3e1] h-1 w-full rounded-3xl`}></div>
        </ProfileBox>
      </ModalBox>
    </Modal>
  );
}
