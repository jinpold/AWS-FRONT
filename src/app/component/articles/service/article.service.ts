import { createAsyncThunk } from "@reduxjs/toolkit";

import { IArticle } from "../model/article.model";
import { findAllArticlesAPI, findArticleByIdAPI, findArticlePostAPI, findBoardMyListAPI, findCountAPI, findDeleteByIdAPI, findModifyAPI } from "./article.api";



export const findAllArticles: any = createAsyncThunk( 
    'articles/findAllArticles',                        
    async (page: number) => {
        console.log('findAllArticles page : ' + page)
        const data: any = await findAllArticlesAPI(page); 

        const { message, result }: any = data;

    
        return data
    }
)
export const findArticleById: any = createAsyncThunk( 
    'articles/findArticleById',                      
    async (id: number) => (await findArticleByIdAPI(id))
   
)

export const findModify: any = createAsyncThunk( 
    'articles/findModify',                      
    async (article: IArticle) => {
        console.log('findModify : ' + article)
        const data: any = await findModifyAPI(article); 

        return data
    }
)

export const findDeleteById: any = createAsyncThunk( 
    'articles/findDeleteById',                      
    async (id: number) => (await findDeleteByIdAPI(id))
   
)
export const findCount: any = createAsyncThunk( 
    'articles/findCount',                      
    async () => (await findCountAPI())
)

export const findBoardMyList: any = createAsyncThunk( 
    'articles/findBoardMyList',                      
    async (id:number) => (await findBoardMyListAPI(id))
)

export const findArticlePost: any = createAsyncThunk(  
    'articles/findArticlePost',                      
    async (article:IArticle) => {
        console.log(JSON.stringify(article))
        return await findArticlePostAPI(article)}
)