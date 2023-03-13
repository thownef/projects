import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './userList.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { deleteUser, getUsers } from '../../redux/apiCalls'

export default function UserList() {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.user.users).map(
        (item, index) => ({ id: index + 1, ...item })
    )
    useEffect(() => {
        getUsers(dispatch)
    }, [dispatch])

    const handleDelete = (id) => {
        deleteUser(id, dispatch)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        {
            field: 'user',
            headerName: 'User',
            width: 400,
            renderCell: (params) => {
                return (
                    <div className='userListUser'>
                        <img
                            className='userListImg'
                            src={params.row.image}
                            alt=''
                        />
                        {params.row.username}
                    </div>
                )
            },
        },

        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={'/user/' + params.row._id}>
                            <button className='userListEdit'>Edit</button>
                        </Link>
                        <DeleteOutline
                            className='userListDelete'
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                )
            },
        },
    ]

    return (
        <div className='userList'>
            <div className='userListCreate'>
                <Link to='/newUser'>
                    <button className='userAddButton'>Create</button>
                </Link>
            </div>
            <DataGrid
                rows={users}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                getRowId={(row) => row._id}
            />
        </div>
    )
}
