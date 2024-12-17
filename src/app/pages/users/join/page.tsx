'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/app/component/users/model/user.model";
import { useDispatch } from "react-redux";
import { joinUser } from "@/app/component/users/service/user.service";
import { useSelector } from "react-redux";
import { getSingleUser } from "@/app/component/users/service/user.slice";
import { PG } from "@/app/component/common/enums/PG";
import { Card } from "@mui/material";

export default function Join2() {


  const router = useRouter();

  const dispatch = useDispatch();
  const join = useSelector(getSingleUser);
  const [user, setUser] = useState({} as IUser)


  const handleUsername = (e: any) => {
    const {
      target: { value, name }
    } = e;
    setUser(dto => ({ ...dto, [name]: value }));
  }

  const handleSubmit = () => {
    console.log(user)
    dispatch(joinUser(user))
    router.push(`${PG.USER}/login`)
  }

  const [rrn, setRrn] = useState('');



  
    return (
      <Card sx={{ padding: '1rem', maxWidth: '600px', margin: 'auto', marginTop: '1rem', height:'700px', borderRadius: '12px', border: '2px solid #003366' }}>
        <div className="min-h-[750px] flex justify-center px-3 lg:px-0 py-5">
          <div className="max-w-screen-xl bg-white border h-full shadow sm:rounded-lg flex justify-center flex-1">
            <div className="w-1/3 bg-indigo-950 text-center hidden md:flex">
              <div
                className="m-8 xl:m-12 w-full bg-contain bg-center bg-no-repeat"
                style={{
                }}
              ></div>
            </div>
            <div className="w-2/3 p-4 sm:p-8">
              <div className="flex flex-col items-center">
                <div className="text-center">
                  <h1 className="text-xl xl:text-2xl font-extrabold text-indigo-950">
                    Sign up
                  </h1>
                  <p className="text-[10px] text-gray-500">
                    Hey enter your details to create your account
                  </p>
                </div>
                <div className="w-full flex-1 mt-4">
                  <div className="mx-auto max-w-sm flex flex-col gap-3">
                    <input
                      className="w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your ID" name="username" onChange={handleUsername}
                    />
                    <input
                      className="w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="Password"
                      placeholder="Enter your password" name="password" onChange={handleUsername}
                    />
                    <input
                      className="w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your name" name="name" onChange={handleUsername}
                    />
                    <input
                      className="w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your 주민번호 기입 (특수 기호 생략)" name="age" onChange={handleUsername}
                    />
                    <input
                      className="w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your email" name="email" onChange={handleUsername}
                    />
                    <input
                      className="w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your address" name="address" onChange={handleUsername}
                    />
                    <input
                      className="w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="tel"
                      placeholder="Enter your phone" name="phone" onChange={handleUsername}
                    />
                    <select
                     className="w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 text-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white"
                     name="mbti" onChange={handleUsername}>
                     <option value="">Select your MBTI</option>
                     <option value="ISTJ">ISTJ</option>
                     <option value="ENFP">ENFP</option>
                     <option value="INTP">INTP</option>
                     <option value="ISFJ">ISFJ</option>
                     <option value="ESTP">ESTP</option>
                    </select>
                    <button className="mt-4 tracking-wide font-semibold bg-indigo-950 text-gray-100 w-full py-3 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleSubmit}>
                      <span className="ml-3">Sign Up</span>
                    </button>
                    <p className="mt-4 text-xs text-gray-600 text-center">
                      Already have an account?{" "}
                      <Link href={`/`}>
                        <span className="text-blue-900 font-semibold">Sign in</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
}