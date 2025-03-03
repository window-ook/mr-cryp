import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Snackbar, Alert } from '@mui/material';

export default function ProtectedRoute({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setOpen(true);
      setMessage('로그인이 필요합니다');
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    }
  }, [router]);

  const handleClose = reason => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <>
      {children}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={() => handleClose} severity="error" variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
