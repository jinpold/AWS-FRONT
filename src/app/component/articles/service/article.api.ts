import instance from "../../common/configs/axios-config"
import { IArticle } from "../model/article.model"



export const findAllArticlesAPI = async (page: number) =>{   
    try{                                                       
        const response = await instance().get('/articles/list',{
            params: {page, size:20, limit: 20}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}

export const findArticleByIdAPI = async (id: number) =>{ 
    try{                                                       
        const response = await instance().get('/articles/detail',{
            params: {id}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const findModifyAPI = async (article: IArticle) => {
    try{
        const response = (await instance().put('/articles/modify', article))
            
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}
export const findDeleteByIdAPI = async (id: number) =>{    
    try{                                                        
        const response = await instance().delete('/articles/delete',{
            params: {id}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}
export const findCountAPI = async () =>{    
    try{                                                        
        const response = await instance().get('/articles/count',{
            params: {}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }

}
export const findBoardMyListAPI = async (id:number) =>{    
    try{                                                        
        const response = await instance().get('/articles/myList',{
            params: {id}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }   
}

export const findArticlePostAPI = async (article:IArticle) =>{    
    try{                                                        
        const response = await instance().post('/articles/save', article)

        return response.data
    }catch(error){
        console.log(error)
        return error
    }   
}