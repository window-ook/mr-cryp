import { globalColors } from '@/globalColors';
import { LogoTypo } from '@/defaultTheme';
import { styled } from '@mui/system';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import Image from 'next/image';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNoneSharp';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationModal from './NotificationModal';

const NavTypo = styled(Typography)(() => ({
  fontFamily: 'SBAggroB',
  fontWeight: 500,
}));

const NavbarButton = styled(Button)(() => ({
  color: 'white',
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  border: 'none',
  boxShadow: 'none',
  padding: '6px 8px',
  minWidth: 'fit-content',
}));

const NavbarButtonTypo = styled(NavTypo)(({}) => ({
  textShadow: globalColors.shadow_text,
  fontSize: '1rem',
  '&:hover': {
    textShadow: 'none',
  },
}));

const NavbarUnderline = styled('div')(({ isActive }) => ({
  height: '4px',
  width: '100%',
  borderRadius: '12px',
  boxShadow: isActive ? '0 2px 4px rgba(0, 0, 0, 0.5)' : '',
  backgroundColor: isActive ? '#fff' : 'transparent',
  transition: 'background-color 0.2s ease-in-out',
}));

const OverMdBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexGrow: 1,
  paddingLeft: '1rem',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const OverMdLogoTypo = styled(LogoTypo)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  marginRight: '0.5rem',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  letterSpacing: '.3rem',
  color: globalColors.white,
  textShadow: globalColors.shadow_text,
  textDecoration: 'none',

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const UnderMdBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const UnderMdLogoTypo = styled(LogoTypo)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  fontSize: '1.5rem',
  marginRight: '0.5rem',
  letterSpacing: '.3rem',
  color: globalColors.white,
  textShadow: globalColors.shadow_text,
  textDecoration: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const SubNavbar = styled(Box)(({}) => ({
  display: 'flex',
  gap: '0.5rem',
  paddingLeft: '14rem',
  '@media (max-width:900px)': {
    marginLeft: 0,
    justifyContent: 'center',
  },
}));

const SubNavbarButton = styled(Button)(({}) => ({
  display: 'block',
  border: 'none',
  boxShadow: 'none',
}));

const SubNavbarButtonTypo = styled(NavTypo)(({}) => ({
  fontSize: '1rem',
  color: globalColors.white,
  textShadow: globalColors.shadow_text,
  '&:hover': {
    textShadow: 'none',
  },
  '@media (max-width:450px)': {
    fontSize: '0.875rem',
  },
}));

const UserMenuTypo = styled(NavTypo)(({ theme }) => ({
  padding: 0,
  color: globalColors.white,
  textShadow: globalColors.shadow_text,
  fontSize: '1rem',
  minHeight: '1.5rem',

  '&:hover': {
    opacity: '50%',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
  },
  '@media (max-width:1220px)': {
    fontSize: '1rem',
  },
  '@media (max-width:500px)': {
    display: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
    lineHeight: '1rem',
    minHeight: '1rem',
  },
}));

const NotificationIcon = styled(NotificationsNoneIcon)(() => ({
  fontSize: '2rem',
  color: globalColors.white,
  transition: 'color ease 200ms',
  '@media (max-width:1220px)': {
    fontSize: '1.5rem',
  },
  '&:hover': {
    color: globalColors.vanilla[400],
    cursor: 'pointer',
  },
}));

const ProfileImage = styled(Avatar)(() => ({
  width: '2.5rem',
  height: '2.5rem',
  '@media (max-width:450px)': {
    width: '1.5rem',
    height: '1.5rem',
  },
  '@media (max-width:175px)': {
    display: 'none',
  },
}));

export default function NavBar({
  setNewKeyword,
  handleActivePage,
  handleOpen,
  handleClose,
  handleSignout,
  handleCloseSignout,
  handleCloseNavMenu,
  handleToggleSubMenu,
  handleKeywordSearch,
  handleOpenNavMenu,
  handleOpenSignout,
  navbarMenu,
  subNavbarMenu,
  activePage,
  activeSubMenu,
  anchorElNav,
  anchorSignout,
  open,
  imgUrl,
  nickname,
  isOverMd,
  isRoot,
}) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {isOverMd ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div className="flex">
                <Image
                  alt="navbar logo image"
                  src={'/images/logo_mustachetrans.webp'}
                  width="60"
                  height="30"
                  className="p-2"
                />
                <OverMdLogoTypo noWrap>Mr.Cryp</OverMdLogoTypo>
              </div>

              <OverMdBox>
                {navbarMenu.map(page => (
                  <NavbarButton
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                  >
                    <NavbarButtonTypo>{page}</NavbarButtonTypo>
                    <NavbarUnderline isActive={handleActivePage() === page} />
                  </NavbarButton>
                ))}
                <div className="hidden select-1120:gap-1 select-1120:flex select-1120:items-center">
                  <label
                    htmlFor="search"
                    className="font-ng font-bold text-white pr-2 max-[1300px]:hidden"
                  >
                    <SearchIcon
                      sx={{ color: globalColors.white, cursor: 'pointer' }}
                      onClick={handleKeywordSearch}
                    />
                  </label>
                  <input
                    type="text"
                    id="search"
                    alt="마켓 검색하기"
                    aria-label="마켓 검색하기"
                    placeholder="마켓 검색"
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleKeywordSearch();
                    }}
                    onChange={e => setNewKeyword(e.target.value)}
                    className="w-[11rem] h-[2rem] pl-3 rounded-lg text-black"
                  />
                </div>
              </OverMdBox>
            </Box>
          ) : (
            <Box
              sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}
            >
              <UnderMdBox>
                <IconButton
                  size="large"
                  aria-label="화면 크기 md 이하 네브바 메뉴 열기"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={e => handleOpenNavMenu(e)}
                  sx={{
                    color: globalColors.white,
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {navbarMenu.map(page => (
                    <MenuItem key={page}>
                      <button
                        type="button"
                        onClick={() => handleCloseNavMenu(page)}
                      >
                        <NavTypo textAlign="center" fontSize={'1.5rem'}>
                          {page}
                        </NavTypo>
                      </button>
                    </MenuItem>
                  ))}
                </Menu>
              </UnderMdBox>
              <Image
                alt="navbar logo image"
                src={'/images/logo_mustachetrans.webp'}
                width="60"
                height="30"
                className="p-2"
              />
              <UnderMdLogoTypo noWrap>Mr.Cryp</UnderMdLogoTypo>
            </Box>
          )}

          {/* 유저 메뉴 */}
          {!isRoot && (
            <Box sx={{ flexGrow: 0 }}>
              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <div className="absolute left-4 bottom-6 max-[1200px]:bottom-5 w-3 h-3 max-[1200px]:w-2 max-[1200px]:h-2 rounded-[100%] bg-red-500 flex items-center justify-center"></div>
                  <NotificationIcon onClick={handleOpen} />
                </div>
                <ProfileImage alt="프로필 이미지" src={imgUrl} />
                <Tooltip title="로그아웃">
                  <UserMenuTypo onClick={e => handleOpenSignout(e)}>
                    {nickname || 'TESTER'}, hi!
                  </UserMenuTypo>
                </Tooltip>
              </div>
              <Menu
                sx={{ mt: '2.5rem' }}
                id="menu-appbar"
                anchorEl={anchorSignout}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorSignout)}
                onClose={handleCloseSignout}
              >
                <MenuItem onClick={handleSignout}>
                  <Typography textAlign="center">로그아웃</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>

        {/* 서브 네브바*/}
        {!isRoot && activePage === '거래소' && (
          <SubNavbar>
            {subNavbarMenu.map(page => (
              <SubNavbarButton
                aria-label="서브 네브바 메뉴 버튼"
                key={page}
                onClick={() => handleToggleSubMenu(page)}
              >
                <SubNavbarButtonTypo>{page}</SubNavbarButtonTypo>
              </SubNavbarButton>
            ))}
          </SubNavbar>
        )}
      </Container>
      <NotificationModal open={open} handleClose={handleClose} />
    </AppBar>
  );
}
