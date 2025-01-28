import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { logoutGoogle } from '@/utils/firebase';
import axios from 'axios';
import NavBar from './Navbar';

export default function NavBarContainer() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorSignout, setAnchorSignout] = useState(null);
  const [activePage, setActivePage] = useState('홈');
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const [open, setOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [nickname, setNickname] = useState('');

  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setImgUrl(localStorage.getItem('imgUrl'));
      setNickname(localStorage.getItem('nickname'));
      setActivePage(localStorage.getItem('activePage'));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const socialType = localStorage.getItem('socialType');
      const accessToken = localStorage.getItem('accessToken');

      if (socialType === 'Google') logoutGoogle();
      if (socialType === 'Kakao') {
        await axios.post(
          'https://kapi.kakao.com/v1/user/logout',
          {},
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('socialType');
      localStorage.removeItem('userId');
      localStorage.removeItem('imgUrl');
      localStorage.removeItem('nickname');
      localStorage.removeItem('activePage');
      router.push('/');
    } catch (error) {
      console.error('로그아웃 에러');
    }
  };

  /** 로그아웃 혹은 프로필 정보 모달 열기 */
  const handleCloseSignout = () => {
    setAnchorSignout(null);
    handleLogout();
  };

  /** 페이지 이동 */
  const handleCloseNavMenu = page => {
    setAnchorElNav(null);
    setActivePage(page);
    localStorage.setItem('activePage', page);
    if (page === '홈') router.push('/home');
    if (page === '거래') router.push('/trade');
    if (page === '비전') router.push('/vision');
  };

  /** 서브메뉴 토글 */
  const handleToggleSubMenu = subMenu => {
    setActiveSubMenu(subMenu);
    if (subMenu === '거래 내역') router.push('/trade/tradeHistory');
    if (subMenu === '오더북') router.push('/trade/orderbook');
    if (subMenu === '차트') router.push('/trade/chart');
  };

  /** XS 크기일 때 네브바 활성화 드롭다운 */
  const handleOpenNavMenu = event => setAnchorElNav(event.currentTarget);

  /** 로그아웃 버튼 활성화 드롭다운 */
  const handleOpenSignout = event => setAnchorSignout(event.currentTarget);

  const props = {
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleOpenSignout,
    handleCloseSignout,
    handleOpen,
    handleClose,
    handleToggleSubMenu,
    activePage,
    activeSubMenu,
    anchorElNav,
    anchorSignout,
    open,
    imgUrl,
    nickname,
  };

  return <NavBar {...props} />;
}
