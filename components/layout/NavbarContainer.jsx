import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setKeyword } from '@/utils/redux/chartSlice';
import { useMediaQuery } from '@mui/system';
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
  const [newKeyword, setNewKeyword] = useState('');

  const router = useRouter();

  const dispatch = useDispatch();

  const isOverMd = useMediaQuery('(min-width:900px)');

  const navbarMenu = ['홈', '비전', '거래'];
  const subNavbarMenu = ['오더북', '거래 내역', '차트'];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setImgUrl(localStorage.getItem('imgUrl'));
      setNickname(localStorage.getItem('nickname'));
      setActivePage(localStorage.getItem('activePage'));
    }
  }, []);

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
      localStorage.removeItem('activePage');
      router.push('/');
    } catch (error) {
      console.error('로그아웃 에러');
    }
  };

  /** 로그아웃 혹은 프로필 정보 모달 열기 */
  const handleCloseSignout = () => setAnchorSignout(null);

  /** 페이지 이동 */
  const handleCloseNavMenu = page => {
    setAnchorElNav(null);
    setActivePage(page);
    localStorage.setItem('activePage', page);
    if (page === '홈') router.push('/home');
    if (page === '비전') router.push('/vision');
    if (page === '거래') router.push('/trade');
  };

  /** 서브메뉴 토글 */
  const handleToggleSubMenu = subMenu => {
    setActiveSubMenu(subMenu);
    if (subMenu === '거래 내역') router.push('/trade/tradeHistory');
    if (subMenu === '오더북') router.push('/trade/orderbook');
    if (subMenu === '차트') router.push('/trade/chart');
  };

  /** 네브바에서 키워드로 검색 */
  const handleKeywordSearch = () => {
    dispatch(setKeyword(newKeyword));
    setActivePage('거래');
    router.push('/trade/chart');
  };

  /** XS 크기일 때 네브바 활성화 드롭다운 */
  const handleOpenNavMenu = event => setAnchorElNav(event.currentTarget);

  /** 로그아웃 버튼 활성화 드롭다운 */
  const handleOpenSignout = event => setAnchorSignout(event.currentTarget);

  const props = {
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleOpenSignout,
    handleSignout,
    handleCloseSignout,
    handleOpen,
    handleClose,
    handleToggleSubMenu,
    handleKeywordSearch,
    setNewKeyword,
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
