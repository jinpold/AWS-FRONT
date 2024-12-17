import { GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { BoardColumn } from "../model/board-column";
import Link from "next/link";
import { PG } from "../../common/enums/PG";

interface CellType{
    row : BoardColumn
}

export default function BoardColumns(): GridColDef[] {
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
            headerName: '게시판이름',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>
            <Link href={`${PG.BOARD}/detail/${row.id}`} className="underline" >{row.title}</Link>
            </Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'description',
            headerName: '게시판종류',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.description}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'regDate',
            headerName: '작성일자',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.regDate}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'modDate',
            headerName: '수정일자',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.modDate}</Typography>
        }
    ]
}