'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import nookies, { parseCookies, setCookie } from 'nookies'
import { jwtDecode } from "jwt-decode";
import { getAuth, getflag } from "@/app/component/users/service/user.slice";
import { IUser } from "@/app/component/users/model/user.model";
import { existsByUsername, loginUser } from "@/app/component/users/service/user.service";
import { PG } from "@/app/component/common/enums/PG";
import { NextPage } from "next"

const SERVER = 'http://localhost:8080'

const Login: NextPage = () => {

    const router = useRouter();

    const dispatch = useDispatch();
    const auth:any = useSelector(getAuth);
    const existusername: boolean = useSelector(getflag);

    const [user, setUser] = useState({ username: '' } as IUser)

    const [isWrongId, setIsWrongId] = useState('');
    const [isWrongPw, setIsWrongPw] = useState('');

    const [len, setLen] = useState(false);
    const [msg, setMsg] = useState('');

    const formRef = useRef<HTMLInputElement>(null)

    const handleUsername = (e: any) => {
    
        const ID_CHECK = /^[a-zA-Z0-9][a-zA-Z0-9]{5,19}$/g;

        ID_CHECK.test(user.username + "") ? setIsWrongId('false') : setIsWrongId('true');

        setUser({
            ...user,
            username: e.target.value
        })

        setLen(false)
    }
    const handlePassword = (e: any) => {
        const PW_CHECK = /^[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,20}$/g;
        PW_CHECK.test(user.password + "") ? setIsWrongPw('false') : setIsWrongPw('true');
        setUser({
            ...user,
            password: e.target.value
        })
        setLen(false)
    }
    const handleSubmit = () => {
        console.log('login page 입력받은 내용 ' + JSON.stringify(user))
        setLen(true)
        dispatch(existsByUsername(user.username))
            .then((res: any) => {
                if (res.payload == true) {
                    setMsg("* 있는 아이디입니다.")
                    dispatch(loginUser(user))
                        .then((resp: any) => {
                            setCookie({}, 'message', resp.payload.message, { httpOnly: false, path: '/' })
                            setCookie({}, 'accessToken', resp.payload.accessToken, { httpOnly: false, path: '/' })
                            console.log("서버에서 넘어온 message " + parseCookies().message)
                            console.log("서버에서 넘어온 token " + parseCookies().accessToken)
                            console.log("token decoding 내용 " + jwtDecode<any>(parseCookies().accessToken).username)
                            // router.push(`${PG.USER}/detail/0`)
                            location.replace(`${PG.USER}/detail/0`);
                        })
                        .catch((err: any) => {
                            alert("Wrong password. 시도하세요")
                        })
                } else {
                    setMsg('* 회원가입을 진행해주세요.')
                }
            })

            .catch((err: any) => {
            })
            .finally(() => {
                console.log('최종적으로 반드시 이뤄져야할 로직')
                console.log("existusername " + existusername)
            })

        if (formRef.current) {
            formRef.current.value = "";
        }
    }
        return (
            <div className="flex justify-center content-center w-screen items-center h-screen ">
                <div className=" flex rounded-lg shadow-lg border w-[70%] h-[60%] ">
                    <div
                        className="hidden md:block lg:w-1/2 bg-cover bg-indigo-950"
                        style={{
                        }}
                    ></div>
                    <div className="w-full p-8 lg:w-1/2">
                        <p className="text-xl text-gray-600 text-center">Welcome!</p>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                ID
                                <br />
                            </label>
                            <input
                                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:   outline-2 focus:outline-blue-700"
                                type="text" name="username" onChange={handleUsername}
                                required />


                            {len === false ?
                                user.username?.length === 0 || user.username === undefined ? <pre></pre> :
                                    (isWrongId === 'true' ?
                                        (<pre><h6 className='text-red-500'>* Wrong username form.</h6></pre>) :
                                        (<pre><h6 className='text-green-500'>* good username form.</h6></pre>)
                                    )
                                : <pre><h6 className='text-red-500'>{msg}</h6></pre>}

                        </div>
                        <div className="mt-4 flex flex-col justify-between">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                    <br />
                                </label>
                            </div>
                            <input
                                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                type="text" name="password" onChange={handlePassword} ref={formRef}
                            />

                            {user.password?.length === 0 || user.password === undefined ? <pre></pre> :
                                (isWrongPw === 'true' ?
                                    user.password.length > 15 ?
                                        (<pre><h6 className='text-orange-500'>* password가 15자를 넘었습니다..</h6></pre>) :
                                        (<pre><h6 className='text-red-500'>* Wrong password form.<br />영어 소문자, 대문자, #?!@$ %^&*- 포함<br />6자이상 </h6></pre>) :
                                    (<pre><h6 className='text-green-500'>* good password form.</h6></pre>)
                                )
                            }

                            <a
                                href="#"
                                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                            >
                                Forget Password?
                            </a>
                        </div>
                        <div className="mt-8">
                            <button className="bg-indigo-950 text-white font-bold py-2 px-4 w-full rounded hover:bg-pink-700"
                                onClick={handleSubmit}>
                                Login
                            </button>
                        </div>
                        <a
                            href="#"
                            className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
                        >
                            <div className="flex px-5 justify-center w-full py-3">
                                <div className="min-w-[30px]">
                                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                                        <path
                                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                            fill="#FFC107"
                                        />
                                        <path
                                            d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                            fill="#FF3D00"
                                        />
                                        <path
                                            d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                            fill="#4CAF50"
                                        />
                                        <path
                                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                            fill="#1976D2"
                                        />
                                    </svg>
                                </div>
                                <div className="flex w-full justify-center">
                                    <h1 className="whitespace-nowrap text-gray-600 font-bold">
                                        Sign in with Google
                                    </h1>
                                </div>
                            </div>
                        </a>
                        <div className="mt-4 flex items-center w-full text-center">
                            <Link
                                href={`${PG.USER}/join`}
                                className="text-xs text-gray-500 capitalize text-center w-full"
                            >
                                Dont have any account yet?
                                <span className="text-blue-700"> Sign Up</span>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

export default Login;