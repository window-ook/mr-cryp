import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setKeyword } from '@/utils/redux/chartSlice';
import { logoutGoogle } from '@/utils/firebase';
import axios from 'axios';
import NavBarUI from './NavbarUI';

export default function NavBar() {
  const [activePage, setActivePage] = useState('트렌드');
  const [dropdownActive, setDropdownActive] = useState(null);
  const [submenuActive, setSubmenuActive] = useState('');
  const [open, setOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [nickname, setNickname] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  const router = useRouter();

  const dispatch = useDispatch();

  const navbarMenu = ['트렌드', '거래소', '마이페이지'];
  const subNavbarMenu = ['차트', 'AI 포트폴리오'];

  const isRoot = router.pathname === '/';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setImgUrl(localStorage.getItem('imgUrl'));
      setNickname(localStorage.getItem('nickname'));
    }
  }, []);

  const handleActivePage = () => {
    if (router.pathname.startsWith('/trends')) return '트렌드';
    if (router.pathname.startsWith('/exchange')) return '거래소';
    return '마이페이지';
  };

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
      router.replace('/auth');
    } catch (error) {
      console.error('로그아웃 에러');
    }
  };

  /** 페이지 이동 (XS: 메뉴 드롭다운 닫기 추가) */
  const handleCloseNavMenu = page => {
    setActivePage(page);
    sessionStorage.setItem('activePage', page);
    if (page === '마이페이지') router.push('/mypage');
    if (page === '트렌드') router.push('/trends');
    if (page === '거래소') router.push('/exchange');
  };

  /** 거래 서브 메뉴 */
  const handleToggleSubMenu = subMenu => {
    setSubmenuActive(subMenu);
    if (subMenu === '차트') router.push('/exchange');
    if (subMenu === 'AI 포트폴리오') router.push('/exchange/ai-portfoilo');
  };

  /** 키워드 검색 */
  const handleKeywordSearch = () => {
    dispatch(setKeyword(newKeyword));
    setActivePage('거래소');
    router.push('/exchange');
  };

  /** XS 메뉴 드롭다운 열기 */
  const handleOpenNavMenu = event => setDropdownActive(event.currentTarget);

  const props = {
    setNewKeyword,
    handleActivePage,
    handleOpen,
    handleClose,
    handleSignout,
    handleCloseNavMenu,
    handleToggleSubMenu,
    handleKeywordSearch,
    handleOpenNavMenu,
    navbarMenu,
    subNavbarMenu,
    activePage,
    submenuActive,
    dropdownActive,
    open,
    imgUrl,
    nickname,
    isRoot,
  };

  return <NavBarUI {...props} />;
}
