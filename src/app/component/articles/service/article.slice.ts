import { createSlice } from "@reduxjs/toolkit";
import { findAllArticles, findArticleById, findCount, findDeleteById, findModify, findBoardMyList, findArticlePost } from "./article.service";
import { IArticle } from "../model/article.model";


const articleThunks = [findAllArticles]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

interface articleState{
    json?:IArticle,
    array?:Array<IArticle>,
    message?:string,
    count?:number,
}
export const initialState:articleState={
    json:{} as IArticle,
    array:[] as Array<IArticle>,
    message:"",
    count:0,
}

const handlePending = (state:any) => {
}

const handleRejected = (state:any) => {
}



export const articleSlice = createSlice({   
    name: "articles",
    initialState,
    reducers: {
        titleHandler: (state:any, {payload}) => {state.json.title = payload},
        contentHandler: (state:any, {payload}) => {state.json.content= payload}
    }, // reducers 내부 
    extraReducers:builder =>{ 
        const {pending, rejected} = status;

        builder                                      
        .addCase(findAllArticles.fulfilled, (state:any, {payload}:any)=>{state.array = payload})
        .addCase(findArticleById.fulfilled, (state:any, {payload}:any)=>{state.json = payload})   
                                                   
        .addCase(findDeleteById.fulfilled, (state:any, {payload}:any)=>{state.json = payload}) 
        .addCase(findCount.fulfilled, (state:any, {payload}:any)=>{state.count = payload})
        .addCase(findModify.fulfilled, (state:any, {payload}:any) => {state.array = payload})
        .addCase(findBoardMyList.fulfilled, (state:any, {payload}:any) => {state.array = payload})
        .addCase(findArticlePost.fulfilled, (state:any, {payload}:any) => {state.message= payload})
          
    }

})

export const getAllArticles = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.article.array)) 
    return state.article.array;  
}

export const getArticleById = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.article.json))
    console.log("값 불러오기")
    return state.article.json; 

} 

export const getModify = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.article.array))
    console.log("값 불러오기")
    return state.article.array; 
}
export const getDeleteById = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.article.json))
    console.log("값 불러오기")
    return state.article.json; 

}
export const getCount = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.article.count))
    console.log("값 불러오기")
    return state.article.count; 
}

export const getArticlePost = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.article.message))
    console.log("값 불러오기")
    return state.article.message; 
}

export const {titleHandler, contentHandler} = articleSlice.actions

export default articleSlice.reducer; 