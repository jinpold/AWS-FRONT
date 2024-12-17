'use client'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from "next";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import React from "react";
import MoveButton from "@/app/atoms/button/MoveButton";
import { IArticle } from "@/app/component/articles/model/article.model";
import { findBoardMyList } from "@/app/component/articles/service/article.service";
import ArticleColumns from "@/app/component/articles/modul/columns";
import { PG } from "@/app/component/common/enums/PG";
import { getAllArticles } from "@/app/component/articles/service/article.slice";

const cards = [
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/mountain-nightview.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/autumn.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/babypinetree.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/beach.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/purpleflowers.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/starrysky.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/lake.jpg",
];

export default function MyListPage (props:any) {
    const dispatch = useDispatch()
    
    const allArticles: IArticle[] = useSelector(getAllArticles) 
    
    useEffect(() => { 
        dispatch(findBoardMyList(props.params.id)) 
    }, [dispatch, props.params.id]) 
    
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
      
    </div>
        <h2> 게시글 수 :{allArticles.length} </h2> 
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
      />
      }
    </Box>
    <td>
        <MoveButton text={"글쓰기"} path={`${PG.ARTICLE}/save`}/>
        </td>
    </>)
}