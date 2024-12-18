'use client'
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import './globals.css'
import { PG } from "./component/common/enums/PG";
import { Component } from "react";


const Home:NextPage=()=> {
  const router = useRouter();

  return (
    <div>
      <div className="w-screen h-screen justify-center content-center bg-gray-950">
        <div className="text-center content-center bg-center bg-bg_img bg-cover h-[100%]">

          <span className="text-gray-300 text-7xl font-bold font-['Inter'] ">Study Log<br /></span><br />
          <span className="text-gray-400 text-2xl font-['Inter']">Welcome</span><br />

          <div className="mt-[15%]">
            <button className="w-44 h-16 bg-gray-950 rounded-lg hover:bg-pink-700" onClick={()=>router.push(PG.USER+"/login")}>
              <div className="text-white font-medium font-['Inter'] leading-normal">LOGIN </div>
            </button>

            <button className="w-44 h-16 bg-gray-950 rounded-lg hover:bg-pink-700" onClick={()=>router.push(PG.SE+"/news")}>
              <div className="text-white font-medium font-['Inter'] leading-normal">NEWS</div>
            </button>
         

          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;