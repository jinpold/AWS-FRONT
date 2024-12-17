'use client';

import { AttachFile, FmdGood, ThumbUpAlt } from "@mui/icons-material";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {jwtDecode} from "jwt-decode";
import { parseCookies } from "nookies";
import { getArticlePost } from "@/app/component/articles/service/article.slice";
import { IArticle } from "@/app/component/articles/model/article.model";
import { findArticlePost } from "@/app/component/articles/service/article.service";
import { PG } from "@/app/component/common/enums/PG";
import { findAllBoards } from "@/app/component/boards/service/board.service";
import { MyTypography } from "@/app/component/common/style/cell";
import { Card } from "@mui/material";

const WriterArticlePage: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const saveMsg = useSelector(getArticlePost);
  const [newPost, setNewPost] = useState({} as IArticle);

  const options = [
    { id: 1, title: "REVIEW", content: "고객센터" },
    { id: 2, title: "QNA", content: "Q&A게시판" },
  ];

  const onSubmit = (data: any) => {
    console.log('폼 데이터:', data); 
    alert(JSON.stringify(data));
    dispatch(findArticlePost(data))
      .then((res: any) => {
        console.log('서버에서 넘어오는 save 메신저 값', res.payload);
        alert('게시글 작성 완료');
        router.push(`${PG.ARTICLE}/mylist/${res.payload.id}`);
        router.refresh();
      })
      .catch((err: any) => {
        console.error('게시글 작성 오류:', err); 
      });
  };

  const cancelHandler = () => {
    alert("취소 완료");
    router.back();
  };

  useEffect(() => {
    dispatch(findAllBoards());
  }, [dispatch]);

  return (
    <Card sx={{ padding: '1rem', maxWidth: '600px', margin: 'auto', marginTop: '1.5rem', borderRadius: '12px', border: '2px solid #003366' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select an option
        </label>
        <select
          {...register('boardId', { required: true, maxLength: 5 })}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
        >
          <option selected>게시글 목록</option>
          {options.map((elem) => (
            <option value={elem.id} key={elem.id} title={elem.title}>{elem.content}</option>
          ))}
        </select>

        <div className="editor mx-auto w-full flex flex-col text-gray-800 border border-gray-300 p-6 shadow-lg mb-8">
          {MyTypography('글을 작성하세요', '1.5rem')}
          <input
            type="hidden"
            value={jwtDecode<any>(parseCookies().accessToken).userId}
            {...register('writerId', { required: true, maxLength: 40 })}
            readOnly
          />
          <input
            {...register('title', { required: true, maxLength: 40 })}
            className="title bg-gray-100 border border-gray-300 p-3 mb-4 outline-none text-lg rounded-md"
            placeholder="Title"
            type="text"
            name="title"
          />
          <textarea
            {...register('content', { required: true, maxLength: 300 })}
            className="content bg-gray-100 sec p-4 h-48 border border-gray-300 outline-none text-lg rounded-md"
            placeholder="Describe everything about this post here"
            name="content"
          ></textarea>
          <div className="icons flex text-gray-500 m-2">
            <ThumbUpAlt className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" />
            <FmdGood className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" />
            <AttachFile className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" />
            <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
          </div>
          <div className="buttons flex justify-between mt-4">
            <button
              type="button"
              className="btn bg-blue-950 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-blue-950 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default WriterArticlePage;