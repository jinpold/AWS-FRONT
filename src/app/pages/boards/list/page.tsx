'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { findAllBoards } from "@/app/component/boards/service/board.service";
import { getAllBoards } from "@/app/component/boards/service/board.slice";
import CardButton from "@/app/atoms/button/CardButton";
import { CallIcon, ChartIcon, ListIcon, NewsIcon } from "@/app/atoms/icon/icons";
import { IBoards } from "@/app/component/boards/model/board.model";

export default function BoardCards() {
  const router = useRouter();
  const dispatch = useDispatch();


  const allBoards = [
    { id: 1, title: "스터디모집", description: "스터디 모집 게시판 목록으로 갑니다. ", src:"http://localhost:3000/pages/articles/mylist/1", img: <CallIcon /> },
    { id: 2, title: "Q&A게시판", description: "QnA 게시판 목록으로 갑니다. ", src:"http://localhost:3000/pages/articles/mylist/2", img: <NewsIcon /> },
    { id: 3, title: "NEWS", description: "교육관련내용 입니다 ", src:"http://localhost:3000/pages/jusik/SE/news", img: <ListIcon /> },
  ];

  useEffect(() => {
    dispatch(findAllBoards(1)); 
  }, [dispatch]);

  return (
    <div className="h-screen">
      <div className="w-screen h-[20%] mb-5">
        <ul className="flex w-screen h-full">
          <li className="bg-[#3a2712] w-1/5 hover:w-2/5 transition-all duration-300 ease-in-out"></li>
          <li className="bg-[#7a5330] w-1/5 hover:w-2/5 transition-all duration-300 ease-in-out"></li>
          <li className="bg-[#6a4e23] w-1/5 hover:w-2/5 transition-all duration-300 ease-in-out"></li>
          <li className="bg-[#5a3f1b] w-1/5 hover:w-2/5 transition-all duration-300 ease-in-out"></li>
          <li className="bg-[#3a2712] w-1/5 hover:w-2/5 transition-all duration-300 ease-in-out"></li>
        </ul>
      </div><br /><br /><br /><br /><br />

      <div className="flex flex-row ml-5 gap-5 items-center justify-center text-center">
        {allBoards && allBoards.map((elem: IBoards) => (
          <CardButton key={elem.id} id={elem.id || 0} title={elem.title || ""} src={elem.src||""} description={elem.description || ""} img={elem.img || ""} />
        ))}
      </div>
      <div className="flex flex-row ml-5 gap-5 items-center justify-center text-center"></div>
    </div>
  );
}