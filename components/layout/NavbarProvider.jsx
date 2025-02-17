import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setKeyword } from '@/utils/redux/chartSlice';
import { useMediaQuery } from '@mui/system';
import { logoutGoogle } from '@/utils/firebase';
import axios from 'axios';
import NavBar from './Navbar';

export default function NavBarProvider() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorSignout, setAnchorSignout] = useState(null);
  const [activePage, setActivePage] = useState('홈');
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const [open, setOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [nickname, setNickname] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  const router = useRouter();

  const dispatch = useDispatch();

  const isOverMd = useMediaQuery('(min-width:900px)');

  const navbarMenu = ['홈', '비전', '거래'];
  const subNavbarMenu = ['오더북', '거래 내역', '차트'];

  const getActivePage = () => {
    if (router.pathname.startsWith('/vision')) return '비전';
    if (router.pathname.startsWith('/trade')) return '거래';
    return '홈';
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setImgUrl(localStorage.getItem('imgUrl'));
      setNickname(localStorage.getItem('nickname'));
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignout = async () => {
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
      sessionStorage.removeItem('activePage');
      router.push('/');
    } catch (error) {
      console.error('로그아웃 에러');
    }
  };

  /** 로그아웃 드롭다운 닫기 */
  const handleCloseSignout = () => setAnchorSignout(null);

  /** 페이지 이동 (XS: 메뉴 드롭다운 닫기 추가) */
  const handleCloseNavMenu = page => {
    setAnchorElNav(null);
    setActivePage(page);
    sessionStorage.setItem('activePage', page);
    if (page === '홈') router.push('/home');
    if (page === '비전') router.push('/vision');
    if (page === '거래') router.push('/trade');
  };

  /** 거래 서브 메뉴 */
  const handleToggleSubMenu = subMenu => {
    setActiveSubMenu(subMenu);
    if (subMenu === '거래 내역') router.push('/trade/trade-history');
    if (subMenu === '오더북') router.push('/trade/orderbook');
    if (subMenu === '차트') router.push('/trade/chart');
  };

  /** 키워드 검색 */
  const handleKeywordSearch = () => {
    dispatch(setKeyword(newKeyword));
    setActivePage('거래');
    router.push('/trade/chart');
  };

  /** XS 메뉴 드롭다운 열기 */
  const handleOpenNavMenu = event => setAnchorElNav(event.currentTarget);

  /** 로그아웃 드롭다운 열기 */
  const handleOpenSignout = event => setAnchorSignout(event.currentTarget);

  const props = {
    getActivePage,
    setNewKeyword,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleOpenSignout,
    handleSignout,
    handleCloseSignout,
    handleOpen,
    handleClose,
    handleToggleSubMenu,
    handleKeywordSearch,
    navbarMenu,
    subNavbarMenu,
    activePage,
    activeSubMenu,
    anchorElNav,
    anchorSignout,
    open,
    imgUrl,
    nickname,
    newKeyword,
    isOverMd,
  };

  return <NavBar {...props} />;
}
