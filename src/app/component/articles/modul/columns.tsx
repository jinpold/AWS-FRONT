import { GridColDef } from "@mui/x-data-grid";
import { ArticleColumn } from "../model/article-column";
import { Typography, getFormControlLabelUtilityClasses } from "@mui/material";
import Link from "next/link";
import { PG } from "../../common/enums/PG";
import { useDispatch } from "react-redux";
import { findDeleteById } from "../service/article.service";


interface CellType{
    row : ArticleColumn
}

export default function ArticleColumns(): GridColDef[] {

    
    const dispatch = useDispatch();

    return [
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id', 
            headerName: 'No.',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.id}</Typography>
            }
        ,
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'title',
            headerName: '제목',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>
            <Link href={`${PG.ARTICLE}/detail/${row.id}`} className="underline" >{row.title}</Link>
            </Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'content',
            headerName: '내용',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.content}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'registerDate',
            headerName: '작성일자',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.regDate}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'modifyDate',
            headerName: '수정일자',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.modDate}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'delete',
            headerName: 'DELETE',
            renderCell: ({ row }: CellType) =>
                <button className="btn overflow-hidden relative w-20 h-10 bg-blue-950 text-white rounded-md font-medium uppercase shadow-md transition-transform duration-200 transform hover:scale-105"
                    onClick={() => {
                        alert("article을 삭제합니다.")
                        console.log("delete article id : {}", row.id)
                        dispatch(findDeleteById(row.id))
                        location.reload();
                    }
                    }>DELETE</button>
        }
    ]
}