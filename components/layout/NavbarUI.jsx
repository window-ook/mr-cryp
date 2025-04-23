import { globalColors } from '@/globalColors';
import { styled } from '@mui/system';
import { Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNoneSharp';
import NotificationModal from './NotificationModal';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

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
    <nav className="sticky top-0 z-50 bg-main shadow-md">
      <div className="max-w-[75rem] mx-auto flex flex-col justify-center">
        <div className="flex justify-between px-4 py-2">
          {isOverMd ? (
            <div className="flex items-center">
              <div className="flex">
                <Image
                  alt="navbar logo image"
                  src="/images/logo_mustachetrans.webp"
                  width={60}
                  height={30}
                  className="p-2"
                />
                <span className="font-aggro italic font-bold text-2xl text-white">
                  Mr.Cryp
                </span>
              </div>

              <div className="flex items-center gap-1 flex-grow pl-4">
                {navbarMenu.map(page => (
                  <button
                    type="button"
                    key={page}
                    className="min-w-fit py-6 px-4 whitespace-nowrap inline-flex flex-col flex-shrink-0 items-center text-white transition-all duration-200 ease-in-out"
                    onClick={() => handleCloseNavMenu(page)}
                  >
                    <span className="font-aggro text-xl text-shadow-black">
                      {page}
                    </span>
                    <div
                      className={`h-1 w-full rounded-lg ${
                        handleActivePage() === page
                          ? 'bg-white shadow-md'
                          : 'bg-transparent'
                      }`}
                    />
                  </button>
                ))}
                <div className="hidden select-1120:gap-1 select-1120:flex select-1120:items-center">
                  <label
                    htmlFor="search"
                    className="font-ng font-bold text-white pr-2 max-[1300px]:hidden"
                  >
                    <SearchIcon
                      className="text-white cursor-pointer"
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
                    className="w-44 h-8 pl-3 rounded-lg text-black"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="flex flex-grow">
                <button
                  type="button"
                  className="p-2 text-white"
                  aria-label="화면 크기 md 이하 네브바 메뉴 열기"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon className="text-2xl" />
                </button>
                <div
                  className={`absolute top-16 left-0 bg-white shadow-lg rounded-md ${
                    Boolean(anchorElNav) ? 'block' : 'hidden'
                  } md:hidden`}
                >
                  {navbarMenu.map(page => (
                    <button
                      key={page}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <span className="font-bold font-ng text-center text-xl">
                        {page}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-aggro italic font-bold text-2xl text-white">
                  Mr.Cryp
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <div className="absolute left-4 bottom-6 max-[1200px]:bottom-5 w-3 h-3 max-[1200px]:w-2 max-[1200px]:h-2 rounded-full bg-red-500 flex items-center justify-center" />
                <NotificationIcon onClick={handleOpen} />
              </div>
              <Image
                alt="프로필 이미지"
                src={imgUrl || '/images/default_profile_img.avif'}
                width={30}
                height={30}
                className="rounded-full"
              />
              <button
                type="button"
                className="font-aggro text-xl text-white text-shadow-black max-[1220px]:text-xl max-[500px]:hidden hover:opacity-50 cursor-pointer transition-all duration-200 ease-in-out"
                onClick={handleOpenSignout}
              >
                {nickname || 'TESTER'}, hi!
              </button>
            </div>
            <Menu
              anchorEl={anchorSignout}
              open={Boolean(anchorSignout)}
              onClose={handleCloseSignout}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleSignout();
                  handleCloseSignout();
                }}
              >
                <span className="font-pretendard text-xl">로그아웃</span>
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* 서브 네브바*/}
        {!isRoot && activePage === '거래소' && (
          <div className="flex gap-1 pl-[14rem] max-[900px]:justify-center max-[900px]:pl-0">
            {subNavbarMenu.map(page => (
              <button
                type="button"
                className="min-w-fit pr-4 whitespace-nowrap inline-flex flex-col flex-shrink-0 items-center text-white transition-all duration-200 ease-in-out"
                aria-label="서브 네브바 메뉴 버튼"
                key={page}
                onClick={() => handleToggleSubMenu(page)}
              >
                <span className="font-aggro text-xl text-shadow-black">
                  {page}
                </span>
                <div
                  className={`h-1 w-full rounded-lg ${
                    activeSubMenu === page
                      ? 'bg-white shadow-md'
                      : 'bg-transparent'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <NotificationModal open={open} handleClose={handleClose} />
    </nav>
  );
}
