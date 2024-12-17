'use client'

import { PG } from '@/app/component/common/enums/PG';
import { Link } from '@mui/material';
import { JwtHeader, JwtPayload, jwtDecode } from 'jwt-decode';
import { parseCookies } from 'nookies';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ILinkButton {
    id: number,
    title: string,
    path: string
}

const token:string|null = parseCookies()?.accessToken;

export const linkButtonTitles = [
    {id: 0, title: 'Home', path: '/' },
    {id: 1, title: 'Join', path: `${PG.USER}/join` },
    {id: 2, title: 'Board', path: `${PG.BOARD}/list` },
    {id: 3, title: 'MyPage', path: `${PG.USER}/detail/${token ? jwtDecode<any>(token).id : 0}` }
];

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e3a8a', 
        },
    },
});

export default function LinkButton({ id, title, path }: ILinkButton) {
    return (
        <ThemeProvider theme={theme}>
            <li key={id}>
                <Link href={path}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent
                        md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500
                        dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                        dark:border-gray-700"
                    style={{ textDecoration: 'none', color: theme.palette.primary.main }}
                    aria-current="page">
                    {title}
                </Link>
            </li>
        </ThemeProvider>
    );
}