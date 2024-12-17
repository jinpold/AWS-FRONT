import instance from "../../common/configs/axios-config"
import { IBoards } from "../model/board.model"


export const findAllBoardsAPI = async (page: number) =>{     // axios = 동기식, 
    try{                                                        // axios를 thunk로 감싸면 비동기가 된다
        const response = await instance().get('/boards/list',{
            params: {page, size:10, limit: 10}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}

export const findBoardByIdAPI = async (id: number) =>{      
    try{                                                      
        const response = await instance().get('/boards/detail',{params: {id}})
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const findModifyAPI = async (board: IBoards) => {
    try{
        const response = (await instance().put('/boards/modify', board))
            
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}
export const findDeleteByIdAPI = async (deleteId: IBoards) =>{    
    try{                                                        
        const response = await instance().delete('/boards/delete',{
            params: {deleteId}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findCountAPI = async () =>{    
    try{                                                        
        const response = await instance().get('/boards/count',{
            params: {}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}