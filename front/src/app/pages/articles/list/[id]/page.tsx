'use client'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from "next";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import React from "react";
import MoveButton from "@/app/atoms/button/MoveButton";
import { getAllArticles, getCount } from "@/app/component/articles/service/article.slice";
import { findAllArticles, findCount } from "@/app/component/articles/service/article.service";
import { PG } from "@/app/component/common/enums/PG";
import ArticleColumns from "@/app/component/articles/modul/columns";

const cards = [
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/mountain-nightview.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/autumn.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/babypinetree.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/beach.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/purpleflowers.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/starrysky.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/lake.jpg",
];


export default function ArticlesPage ({data}:any) {
    const dispatch = useDispatch()
    const allArticles: [] = useSelector(getAllArticles) 
    const countArticles = useSelector(getCount)

    if(allArticles !== undefined){ 
        console.log('allArticles is not undefined')

        console.log('length is '+ allArticles.length)
        for(let i=0; i< allArticles.length; i++){
            console.log(JSON.stringify(allArticles[i]))
        }
    }else{
        console.log('allArticles is undefined')
    }
 
    useEffect(() => { 
        dispatch(findAllArticles(1))  
        dispatch(findCount())
    }, [dispatch]) 
    

    return (<>
    <div className="flex flex-col  items-center justify-center w-full bg-white-300">
       
      <div className="flex overflow-x-scroll snap-x snap-mandatory max-w-6xl no-scrollbar">
        {cards.map((data, index) => {
          return (

            <section
              className="flex-shrink-0 w-full snap-center justify-center items-center"
              key={index}
            >
            </section>
            
          );
        })}
      </div>
      <td>
        <MoveButton text={"게시글 쓰기"} path={`${PG.ARTICLE}/save`}/>
        </td>
    </div>
        <h2> 게시글 수 :{countArticles} </h2> 
        <Box sx={{ height: "100%", width: '100%' }}>
      {allArticles && <DataGrid
        rows={allArticles}
        columns={ArticleColumns()}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]} 
        checkboxSelection
        disableRowSelectionOnClick
      />}
    </Box>
    </>)
}