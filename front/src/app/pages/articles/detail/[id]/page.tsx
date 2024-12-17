'use client'
import { IArticle } from "@/app/component/articles/model/article.model";
import { findArticleById, findDeleteById, findModify } from "@/app/component/articles/service/article.service";
import { contentHandler, getArticleById, titleHandler } from "@/app/component/articles/service/article.slice";
import { PG } from "@/app/component/common/enums/PG";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function ArticleDetailPage (props:any){

    const dispatch = useDispatch()
    const article:IArticle = useSelector(getArticleById)
    const router = useRouter()
    
    useEffect(()=>{
        dispatch(findArticleById(props.params.id))
    },[dispatch, props.params.id])

    const handleDelete = () => {
        dispatch(findDeleteById(props.params.id))
        router.replace(`${PG.ARTICLE}/mylist/${article.boardId}`)
      }

    const handleClickTitle  = (e:any) => dispatch(titleHandler(e.target.value))
    const handleClickContent = (e:any) => dispatch(contentHandler(e.target.value))
    const handleModify = () => {
        dispatch(findModify(article))
        router.replace(`${PG.ARTICLE}/mylist/${article.boardId}`)
    }

    const handleSubmit = (e:any) => {
      e.preventDefault();
    };

    return (
      <Card sx={{ padding: '1rem', maxWidth: '600px', margin: 'auto', marginTop: '1.5rem', borderRadius: '12px', border: '2px solid #003366' }}>
      <form className="max-w-md mx-auto my-6 p-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
        <div className="mb-4 text-center">
          <Typography variant="h5" component="h3" textAlign="center" gutterBottom>
            Board Details
          </Typography>
        </div>
    
        <fieldset className="mb-6">
          <legend className="block uppercase tracking-wide text-sm mb-3 text-center">Board Information</legend>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block uppercase tracking-wide text-xs font-bold mb-1">No.</label>
              <Typography className="w-full shadow-inner p-2 border border-gray-300 rounded-md bg-gray-100">
                {article.id}
              </Typography>
            </div>
    
            <div>
              <label className="block uppercase tracking-wide text-xs font-bold mb-1">Title</label>
              <input
                className="w-full shadow-inner p-2 border border-gray-300 rounded-md"
                type="text"
                placeholder={article.title}
                name="title"
                onChange={handleClickTitle}
              />
            </div>
    
            <div>
              <label className="block uppercase tracking-wide text-xs font-bold mb-1">Content</label>
              <textarea
                className="w-full shadow-inner p-2 border border-gray-300 rounded-md h-32"
                placeholder={article.content}
                name="content"
                onChange={handleClickContent}
              />
            </div>
    
            <div>
              <label className="block uppercase tracking-wide text-xs font-bold mb-1">Created Date</label>
              <Typography className="w-full shadow-inner p-2 border border-gray-300 rounded-md bg-gray-100">
                {article.regDate}
              </Typography>
            </div>
    
            <div>
              <label className="block uppercase tracking-wide text-xs font-bold mb-1">Modified Date</label>
              <Typography className="w-full shadow-inner p-2 border border-gray-300 rounded-md bg-gray-100">
                {article.modDate}
              </Typography>
            </div>
          </div>
        </fieldset>
    
        <div className="flex justify-between mt-4">
          <button
            className="btn bg-indigo-950 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            type="button"
          >
            CANCEL
          </button>
    
          <button
            className="btn bg-indigo-950 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              handleModify();
            }}
            type="button"
          >
            UPDATE
          </button>
    
          <button
            className="btn bg-indigo-950 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            type="button"
          >
            DELETE
          </button>
        </div>
      </form>
    </Card>
    )
};