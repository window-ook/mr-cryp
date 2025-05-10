import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setKeyword } from '@/utils/redux/chartSlice';
import { signOut } from 'next-auth/react';
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

  const HOME_PAGE = router.pathname === '/';

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
    await signOut({ callbackUrl: '/auth' });
    // 테스트 계정 생성 후에는 아래 로직 삭제
    localStorage.removeItem('userId');
    sessionStorage.removeItem('activePage');
  };

  /** 페이지 이동 (MD 미만: 메뉴 드롭다운 닫기 추가) */
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
  };

  /** 키워드 검색 */
  const handleKeywordSearch = () => {
    dispatch(setKeyword(newKeyword));
    setActivePage('거래소');
    router.push('/exchange');
  };

  /** MD 미만 화면 드롭다운 열기 */
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
    activePage,
    submenuActive,
    dropdownActive,
    open,
    imgUrl,
    nickname,
    HOME_PAGE,
  };

  return <NavBarUI {...props} />;
}
