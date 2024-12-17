'use client'

import { PG } from "@/app/component/common/enums/PG"
import { MyTypography } from "@/app/component/common/style/cell"
import { IUser } from "@/app/component/users/model/user.model";
import { deleteUserById, joinUser, modifyUserById } from "@/app/component/users/service/user.service"
import { getAllUsers } from "@/app/component/users/service/user.slice";
import { Card } from "@mui/material";
import { jwtDecode } from "jwt-decode";

import { useRouter } from 'next/navigation';
import { parseCookies } from "nookies"
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux"

export default function UserDetailPage({params}:any) {
  const dispatch = useDispatch()
  const router = useRouter();

  const user: IUser = useSelector(getAllUsers).find((user: IUser) => user.id === params.id);

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const userInfo = jwtDecode<any>(parseCookies().accessToken);

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data));
  
    data.id = userInfo.userId;
    dispatch(modifyUserById(data))
      .then((res:any)=>{
        alert('user information modify success.' + res.payload.id)
        location.reload();
      })
      .catch((error:any)=>{
        alert('user information modify fail.')
      })
  }

  
  return (
    <Card sx={{ padding: '1.5rem', height: 'auto', maxWidth: '600px', margin: 'auto', marginTop: '2rem', borderRadius: '12px', border: '2px solid #003366' }}>
      <div className="mb-4 text-center">
      </div>
  
      <div className="items-center flex justify-center px-4 lg:px-0 py-4">
        <div className="max-w-screen-lg bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="w-1/4 bg-indigo-950 text-center hidden md:flex">
            <div
              className="m-6 xl:m-8 w-full bg-contain bg-center bg-no-repeat"
              style={{
              }}
            ></div>
          </div>
          <div className="w-3/4 p-4 sm:p-6">
            <div className="flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-xl xl:text-2xl font-extrabold text-indigo-950">
                  {MyTypography(jwtDecode<any>(parseCookies().accessToken).username, "1.5rem")}
                  My Page
                </h1>
                <p className="text-[10px] text-gray-500 mt-1">변경사항을 기입하세요</p>
              </div>
              <div className="w-full flex-1 mt-4">
                <form className="mx-auto max-w-md flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                  <input className="block mb-2 text-gray-900 dark:text-white" type="hidden" value={userInfo.id} readOnly />
                  <div>
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2">Name</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      {...register('name', { required: true })}
                      placeholder="Real Name"
                      name="name"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2">Password</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      {...register('password', { required: true })}
                      placeholder="Password"
                      name="password"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2">Re Password</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      placeholder="Re Password"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2">Street Address</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      {...register('address', { required: true })}
                      placeholder="555 Roadrunner Lane"
                      name="address"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2">Phone</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      {...register('phone', { required: true })}
                      placeholder="(555) 555-5555"
                      name="phone"
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      className="btn bg-indigo-950 text-gray-100 py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      onClick={() => router.back()}
                      type="button"
                    >
                      CANCEL
                    </button>
                    <button
                      className="btn bg-indigo-950 text-gray-100 py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      type="submit"
                    >
                      SUBMIT
                    </button>
                    <button
                      className="btn bg-indigo-950 text-gray-100 py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      onClick={() => {
                        alert("user를 삭제합니다.");
                        console.log("delete user id & username : {}, {}", userInfo.userId, userInfo.username);
                        dispatch(deleteUserById(userInfo.userId));
                        location.reload();
                      }}
                      type="button"
                    >
                      DELETE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
