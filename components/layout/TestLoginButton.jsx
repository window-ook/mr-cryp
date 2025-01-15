import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import { NGTypo } from '@/defaultTheme';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(() => ({
  marginTop: '1rem',
  gap: '1rem',
  display: 'flex',
  alignItems: 'center',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
}));

const Typo = styled(NGTypo)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
}));

export default function TestLoginButton() {
  const router = useRouter();
  const handleTest = async () => {
    localStorage.setItem('userId', 'test-user');
    router.push('/home');
    console.log('테스트 시작');
  };

  return (
    <StyledButton variant="contained" onClick={handleTest}>
      <Typo>테스트 로그인</Typo>
    </StyledButton>
  );
}
