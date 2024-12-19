'use client';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import HomeIcon from '@mui/icons-material/Home';
import LinkButton, { linkButtonTitles } from '@/app/atoms/button/LinkButton';
import { destroyCookie, parseCookies } from 'nookies';
import { useDispatch, useSelector } from "react-redux";
import { findUserById, logout } from '../../users/service/user.service';
import { jwtDecode } from 'jwt-decode';
import { setToken, clearToken } from '../../users/service/user.slice';

function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: any) => state.user.auth?.Token);

  // 환경변수로부터 프론트엔드 URL 가져오기
  const frontendUrl = process.env.NEXT_PUBLIC_API_URL2;

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.accessToken) {
      dispatch(setToken(cookies.accessToken)); // 토큰 저장
      dispatch(findUserById(jwtDecode<any>(cookies.accessToken).userId)); // 사용자 정보 로드
    }
  }, []);

  useEffect(() => {
    setShowProfile(!!token);
  }, [token]);

  const logoutHandler = async () => {
    try {
      await dispatch(logout());
      destroyCookie(null, 'accessToken');
      dispatch(clearToken());
      router.replace('/');
    } catch (err) {
      console.error('header: logout error', err);
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Home 버튼 */}
        <HomeIcon fontSize="large" onClick={() => router.push(`${frontendUrl}/`)} />
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {showProfile ? (
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-20 h-20 rounded-full"
                src="/img/user/profile.jpg"
                data-popover-target="profile-menu"
                onClick={() => router.push(`${frontendUrl}/`)}
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push(`${frontendUrl}/pages/users/login`)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Login
            </button>
          )}

          {showProfile && (
            <div className="px-4 py-3 visible float-end">
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <span
                    onClick={logoutHandler}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {showProfile &&
              linkButtonTitles.map((elem) => (
                <ul key={elem.id}>
                  <LinkButton id={elem.id} title={elem.title} path={`${frontendUrl}${elem.path}`} />
                </ul>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
