import { IoSearch, IoNotifications, IoMenu } from 'react-icons/io5';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Image from 'next/image';
import NotificationModal from './NotificationModal';

export default function NavBar({
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
}) {
  return (
    <nav className="sticky top-0 z-50 bg-main shadow-md">
      <div className="max-w-[75rem] mx-auto flex flex-col justify-center">
        <div className="flex justify-between px-4 py-2">
          {/* MD 이상 크기 */}
          <div className="hidden md:block">
            <div className="flex items-center">
              <div className="flex">
                <Image
                  alt="navbar logo image"
                  src="/images/mustachetrans.webp"
                  width={60}
                  height={30}
                  className="p-2"
                />
                <span className="font-navbar-mrcryp">Mr.Cryp</span>
              </div>
              <div className="flex items-center gap-1 grow pl-4">
                {navbarMenu.map(page => (
                  <button
                    type="button"
                    key={page}
                    className="min-w-fit py-6 px-4 whitespace-nowrap inline-flex shrink-0 flex-col items-center gap-2 text-white cursor-pointer hover:opacity-50 transition-all duration-200 ease-in-out"
                    onClick={() => handleCloseNavMenu(page)}
                  >
                    <span className="font-navbar-button">{page}</span>
                    <div
                      className={`h-1 w-full rounded-lg ${
                        handleActivePage() === page
                          ? 'bg-white shadow-md'
                          : 'bg-transparent'
                      }`}
                    />
                  </button>
                ))}
                <div className="hidden lg:flex lg:items-center gap-2">
                  <label
                    htmlFor="search"
                    className="font-ng font-bold text-xl text-white"
                  >
                    <button
                      onClick={handleKeywordSearch}
                      className="cursor-pointer"
                    >
                      <IoSearch />
                    </button>
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
                    className="w-44 h-8 pl-3 rounded-lg bg-white text-black placeholder:font-ng font-ng"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* MD 이하 크기 */}
          <div className="block md:hidden">
            <div className="flex justify-center items-center">
              <div className="flex grow">
                <button
                  type="button"
                  className="p-2 text-white"
                  aria-label="화면 크기 md 이하 네브바 메뉴 열기"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                >
                  <IoMenu className="text-2xl" />
                </button>
                <div
                  className={`absolute top-16 left-0 bg-white shadow-lg rounded-md ${
                    Boolean(dropdownActive) ? 'block' : 'hidden'
                  } md:hidden`}
                >
                  {navbarMenu.map(page => (
                    <button
                      key={page}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <span className="font-navbar-button">{page}</span>
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
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="relative hidden md:block">
                <div className="absolute left-4 bottom-5 lg:bottom-6 w-1 h-1 lg:w-2 lg:h-2 rounded-full bg-red-500 flex items-center justify-center" />
                <button
                  className="text-white text-2xl cursor-pointer"
                  onClick={handleOpen}
                >
                  <IoNotifications />
                </button>
              </div>
              <Image
                alt="프로필 이미지"
                src={imgUrl || '/images/user-logos/logo_default_profile.avif'}
                width={30}
                height={30}
                className="rounded-full"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:ring-0">
                <span className="font-aggro text-xl text-white text-shadow-black max-[1220px]:text-xl max-[500px]:hidden hover:opacity-50 cursor-pointer transition-all duration-200 ease-in-out">
                  {nickname || 'TESTER'}, hi!
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onClick={() => {
                  handleSignout();
                }}
                className="flex items-center justify-center cursor-pointer"
              >
                <span className="font-pretendard text-xl">로그아웃</span>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* 서브 네브바*/}
        {!isRoot && activePage === '거래소' && (
          <div className="flex gap-2 pl-[14rem] max-[900px]:justify-center max-[900px]:pl-0">
            {subNavbarMenu.map(page => (
              <button
                type="button"
                className="min-w-fit pr-4 whitespace-nowrap inline-flex shrink-0 flex-col items-center gap-2 text-white cursor-pointer hover:opacity-50 transition-all duration-200 ease-in-out"
                aria-label="서브 네브바 메뉴 버튼"
                key={page}
                onClick={() => handleToggleSubMenu(page)}
              >
                <span className="font-aggro text-xl text-shadow-black">
                  {page}
                </span>
                <div
                  className={`h-1 w-full rounded-lg mb-2 ${
                    submenuActive === page
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
