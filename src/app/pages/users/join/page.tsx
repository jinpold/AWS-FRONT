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

// 전역 선언 추가
declare global {
  interface Window {
    kakao: any;
  }
}

export default function Join2() {
  const router = useRouter();
  const dispatch = useDispatch();
  const join = useSelector(getSingleUser);
  const [user, setUser] = useState({} as IUser);
  const [address, setAddress] = useState<string>("");

  const handleUsername = (e: any) => {
    const {
      target: { value, name }
    } = e;
    setUser(dto => ({ ...dto, [name]: value }));
  };

  const handleAddressChange = (address: string) => {
    setAddress(address);
    setUser(dto => ({ ...dto, address }));
  };

  const handleSubmit = () => {
    console.log(user);
    dispatch(joinUser(user));
    router.push(`${PG.USER}/login`);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=e65fac7af0bc030e561f33a1d5fa86e3&libraries=services";
    script.async = true;
    script.onload = () => {
      console.log("카카오 API 로드 성공");
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const openAddressSearch = () => {
    if (!window.kakao || !window.kakao.maps) {
      alert("카카오 API가 로드되지 않았습니다.");
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    const address = prompt("주소를 입력해주세요");
    if (!address) return;

    geocoder.addressSearch(address, function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const selectedAddress = result[0].road_address?.address_name || result[0].address_name;
        handleAddressChange(selectedAddress);
        console.log("주소 검색 결과:", selectedAddress);
      } else {
        alert("주소 검색에 실패했습니다.");
      }
    });
  };

  return (
    <Card sx={{ padding: '1rem', maxWidth: '600px', margin: 'auto', marginTop: '7rem', height: '700px', borderRadius: '12px', border: '2px solid #8B4513' }}>
      <div className="min-h-[750px] flex justify-center px-3 lg:px-0 py-5">
        <div className="max-w-screen-xl bg-white border h-full shadow sm:rounded-lg flex justify-center flex-1">
          <div className="w-1/3 bg-red-950 text-center hidden md:flex"
            style={{
              backgroundImage: "url('https://i.namu.wiki/i/Jq3BxfdptAuvp5RMaFlWs1X7NPb6IJCsnQA6sDzqeUrT8gzyWR3unU8hOW3XEfyhpCnG5qSCEDxopRlfgPyiNg.webp')",
            }}>
          </div>
          <div className="w-2/3 p-4 sm:p-8">
            <div className="flex flex-col items-center">
              <h1 className="text-xl xl:text-2xl font-extrabold text-red-950">
                Sign up
              </h1>
              <p className="text-[10px] text-gray-500">Hey enter your details to create your account</p>
              <div className="w-full flex-1 mt-4">
                <div className="mx-auto max-w-sm flex flex-col gap-3">
                  <input className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200" type="text" placeholder="Enter your ID" name="username" onChange={handleUsername} />
                  <input className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200" type="Password" placeholder="Enter your password" name="password" onChange={handleUsername} />
                  <input className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200" type="text" placeholder="Enter your name" name="name" onChange={handleUsername} />

                  {/* 카카오 주소 검색 */}
                  <div className="flex gap-2">
                    <input className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200" type="text" placeholder="주소 검색" value={address} readOnly />
                    <button className="px-4 py-2 bg-red-950 text-white rounded" onClick={openAddressSearch}>주소 검색</button>
                  </div>

                  <button className="mt-4 tracking-wide font-semibold bg-red-950 text-gray-100 w-full py-3 rounded-lg hover:bg-pink-700 transition-all duration-300" onClick={handleSubmit}>
                    <span>Sign Up</span>
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
  );
}
