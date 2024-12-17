'use client'
import { NextPage } from "next";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Button, Typography } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IBoards } from "@/app/component/boards/model/board.model";
import { findBoardById, findDeleteById, findModify } from "@/app/component/boards/service/board.service";
import { BoardNameHandler, BoardTypeHandler, getSingleBoard } from "@/app/component/boards/service/board.slice";
import { PG } from "@/app/component/common/enums/PG";


export default function BoardDetailPage (props:any){


    const dispatch = useDispatch()
    const board:IBoards = useSelector(getSingleBoard)
    const router = useRouter()


    const handleDelete = () => {
        dispatch(findDeleteById(props.params.id))
        router.replace(`${PG.BOARD}/list`)
      }

    const handleClickBN  = (e:any) => dispatch(BoardNameHandler(e.target.value))
    const handleClickBT = (e:any) => dispatch(BoardTypeHandler(e.target.value))
    const handleModify = () => {
        dispatch(findModify(board))
        router.replace(`${PG.BOARD}/list`)
    }
    
    useEffect(()=>{
        dispatch(findBoardById(props.params.id))
    },[dispatch, props.params.id])

    
    return(<>
    
    <h3>게시판 상세</h3>
    <span>ID : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{props.params.id}</Typography>
    <span>게시판이름 : </span><input type="text" placeholder={board.title} name="BoardName" onChange={handleClickBN} /><br /><br />
    <span>게시판타입 : </span><input type="text" placeholder={board.description} name="BoardType" onChange={handleClickBT} /><br /><br />
    <span>동록일 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{board.regDate}</Typography>
    <span>수정일 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{board.modDate}</Typography>
    <Button onClick={handleModify}>Update</Button>
    <Button onClick={handleDelete}>delete</Button>
    </>)
}