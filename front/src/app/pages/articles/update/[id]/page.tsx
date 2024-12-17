'use client'
import { AttachFile, FmdGood, ThumbUpAlt } from "@mui/icons-material";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";
import { getArticlePost } from "@/app/component/articles/service/article.slice";
import { findArticlePost } from "@/app/component/articles/service/article.service";
import { MyTypography } from "@/app/component/common/style/cell";
import { IArticle } from "@/app/component/articles/model/article.model";
import { PG } from "@/app/component/common/enums/PG";


const UpdateArticlePage:NextPage = () => {
  
  const {register, handleSubmit, formState: { errors },} = useForm();

  const dispatch = useDispatch()
  const router = useRouter()
  const saveMsg = useSelector(getArticlePost)
  const [newPost, setNewPost] = useState({} as IArticle)

  const options = [
    {id:1, title:"REVIEW", content: "리뷰게시판"},
    {id:2, title:"QNA", content: "Q&A게시판"},
    {id:3, title:"free", content: "자유게시판"},
  ]

  const onSubmit = (data:any) => {
    alert(JSON.stringify(data))
    dispatch(findArticlePost(data))
    .then((res:any)=>{
      console.log('서버에서 넘어오는 save 메신저 값' + res.payload)
      alert('게시글 작성 완료' )
      router.push(`${PG.ARTICLE}/myList/${data.boardId}`);
      router.refresh()
    })
    .catch((err: any)=>{
    })
  }

  const cancelHandler = () => {
    alert("취소 완료")
    router.back();
  }

   useEffect(()=>{},[]) 


    return(<>
    <form onSubmit={handleSubmit(onSubmit)} className= "max-w-sm mx-auto">
    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
    <select {...register('boardId', {required: true})}
    id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>게시글 목록</option>
    {options.map((elem)=>(<option value={elem.id} key={elem.id} title={elem.title}>{elem.content}</option>
    ))}
    </select>
  
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      {MyTypography('Article 작성', "1.5rem")}
      <input type="hidden" value={jwtDecode<any>(parseCookies().accessToken).id} readOnly/>
      <input {...register('title', {required: true, maxLength:40})}
      className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder="Title" type="text" name="title" />
      <textarea 
      {...register('content', {required: true, maxLength:300})}
      className="content bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" placeholder="Describe everything about this post here" name="content" ></textarea>
      {/* <!-- icons --> */}
      <div className="icons flex text-gray-500 m-2">
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <ThumbUpAlt component={ThumbUpAlt}></ThumbUpAlt>
        </svg>
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <FmdGood component={FmdGood}></FmdGood>
        </svg>
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <AttachFile component={AttachFile}></AttachFile>
        </svg>
        <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
      </div>
       {/* <!-- buttons --> */}
       <div className="buttons flex">
        <div className="btn  overflow-hidden relative w-30 bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
          onClick={cancelHandler}>Cancel</div>
          <input type="submit" value="SUBMIT"/>
      </div>
    </div>
    </form>

  </> )
}
export default UpdateArticlePage