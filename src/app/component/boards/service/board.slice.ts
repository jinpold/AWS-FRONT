import { createSlice } from "@reduxjs/toolkit";

import { IBoards } from "../model/board.model";
import { findAllBoards, findBoardById, findCount, findDeleteById, findModify } from "./board.service";


interface BoardState{
    json: IBoards,
    array: Array<IBoards>
}

export const initialState:BoardState = {
    json : {} as IBoards, 
    array : []
}

const boardThunks = [findAllBoards]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

const handlePending = (state:any) => {
}


const handleRejected = (state:any) => {
}

export const boardSlice = createSlice({  
    name: "boards",
    initialState,
    reducers: {
        BoardNameHandler: (state:any, {payload}) => {state.json.boardName = payload},
        BoardTypeHandler: (state:any, {payload}) => {state.json.boardType= payload}
    },
    extraReducers:builder =>{
        const {pending, rejected} = status;

        builder                                                 
        .addCase(findAllBoards.fulfilled, (state:any, {payload}:any)=>{state.array = payload})  
        .addCase(findBoardById.fulfilled, (state:any, {payload}:any)=>{state.json = payload})
        .addCase(findModify.fulfilled, (state:any, {payload}:any) => {state.array = payload})
        .addCase(findDeleteById.fulfilled, (state:any, {payload}:any)=>{state.json = payload}) 
        .addCase(findCount.fulfilled, (state:any, {payload}:any)=>{state.count = payload}) 
    }                                                        
})

export const getAllBoards = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.board.array))
    return state.board.array;  
}
export const getSingleBoard = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.board.json))
    console.log("값 불러오기")
    return state.board.json; 

}
export const getModify = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.board.array))
    console.log("값 불러오기")
    return state.board.array; 
}
export const getDeleteById = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.board.json))
    console.log("값 불러오기")
    return state.board.json; 
}
export const getCount = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.board.count))
    console.log("값 불러오기")
    return state.board.count; 
}

export const {BoardNameHandler, BoardTypeHandler} = boardSlice.actions

export default boardSlice.reducer;