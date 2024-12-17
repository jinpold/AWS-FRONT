import { Link } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { PG } from '@/app/component/common/enums/PG';
import { IUser } from '../model/user.model';
import { MyTypography } from '../../common/style/cell';


export default function userColumns(): GridColDef[] {

    interface CellType {
        row: IUser;
    }


    return [
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id',
            headerName: 'No.',
            renderCell: ({ row }: CellType) => MyTypography(row.id, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'username',
            headerName: 'USERNAME',
            renderCell: ({ row }: CellType) =>
                MyTypography(
                    <Link href={`${PG.USER}/detail/${row.id}`}> {row.username} </Link>
                    , "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'password',
            headerName: 'PASSWORD',
            renderCell: ({ row }: CellType) => {
                MyTypography(row.password, "1.5rem")
                return MyTypography('********', "1.5rem")
            }
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'name',
            headerName: 'NAME',
            renderCell: ({ row }: CellType) => MyTypography(row.name, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'age',
            headerName: 'AGE',
            renderCell: ({ row }: CellType) => MyTypography(row.age, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'sex',
            headerName: 'sex',
            renderCell: ({ row }: CellType) => MyTypography(row.sex, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'email',
            headerName: 'EMAIL',
            renderCell: ({ row }: CellType) => MyTypography(row.email, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'phone',
            headerName: 'PHONE',
            renderCell: ({ row }: CellType) => MyTypography(row.phone, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'address',
            headerName: 'ADDRESS',
            renderCell: ({ row }: CellType) => MyTypography(row.address, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'asset',
            headerName: 'ASSET',
            renderCell: ({ row }: CellType) => MyTypography(row.asset, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'mbti',
            headerName: 'MBTI',
            renderCell: ({ row }: CellType) => MyTypography(row.mbti, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'investmentPropensity',
            headerName: 'INVESTMENTPROPERSITY',
            renderCell: ({ row }: CellType) => MyTypography(row.investmentPropensity, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'role',
            headerName: 'role',
            renderCell: ({ row }: CellType) => MyTypography(row.role, "1.5rem")
        }
    ]
}