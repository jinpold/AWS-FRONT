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
    { id: 1, title: "모집 게시판", description: "스터디 모집 게시판 목록으로 갑니다. ", src:"http://localhost:3000/pages/articles/mylist/1", img: <CallIcon /> },
    { id: 2, title: "Q&A게시판", description: "Q&A 게시판 목록으로 갑니다. ", src:"http://localhost:3000/pages/articles/mylist/2", img: <NewsIcon /> },
    { id: 3, title: "교육 NEWS", description: "교육&정보 뉴스 목록으로 갑니다. ", src:"http://localhost:3000/pages/jusik/SE/news", img: <ListIcon /> },
  ];

  useEffect(() => {
    dispatch(findAllBoards(1)); 
  }, [dispatch]);

  return (
    <div className="h-screen">
      <div className="w-screen h-[20%] mb-5">
        <ul className="flex w-screen h-full">
          <li className="bg-[#9fc9ed] w-1/5 hover:w-2/5 transition-all duration-300 ease-in-out"></li>
          <li className="bg-[#0f3469] w-1/5 hover:w-2/5 transition-all duration-300 ease-in-out"></li>
          <li className="bg-[#3F72AF] w-1/5 hover:w-2/5 transition-all duration-300 ease-in-out"></li>
          <li className="bg-[#DBE2EF] w-1/5 hover:w-2/5 transition-all duration-300 ease-in-out"></li>
          <li className="bg-[#F9F7F7] w-1/5 hover:w-2/5 transition-all duration-300 ease-in-out"></li>
        </ul>
      </div>

      <div className="flex flex-row ml-5 gap-5 items-center justify-center text-center">
        {allBoards && allBoards.map((elem: IBoards) => (
          <CardButton key={elem.id} id={elem.id || 0} title={elem.title || ""} src={elem.src||""} description={elem.description || ""} img={elem.img || ""} />
        ))}
      </div>
      <div className="flex flex-row ml-5 gap-5 items-center justify-center text-center"></div>
    </div>
  );
}