import './productList.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProducts } from '../../redux/apiCalls'

export default function ProductList() {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.product.products).map(
        (item, index) => ({ id: index + 1, ...item })
    )

    useEffect(() => {
        getProducts(dispatch)
    }, [dispatch])

    const handleDelete = (id) => {
        deleteProduct(id, dispatch)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        {
            field: 'product',
            headerName: 'Product',
            width: 400,
            renderCell: (params) => {
                return (
                    <div className='productListItem'>
                        <img
                            className='productListImg'
                            src={params.row.image}
                            alt=''
                        />
                        {params.row.title}
                    </div>
                )
            },
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 220,
            renderCell: (params) => {
                return <>{params.row.price.toLocaleString()}</>
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={'/product/' + params.row._id}>
                            <button className='productListEdit'>Edit</button>
                        </Link>
                        <DeleteOutline
                            className='productListDelete'
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                )
            },
        },
    ]

    return (
        <div className='productList'>
            <div className='productListContainer'>
                <Link to='/newproduct'>
                    <button className='productAddButton'>Create</button>
                </Link>
            </div>
            <DataGrid
                style={{ marginBottom: '20px' }}
                rows={products}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                getRowId={(row) => row._id}
                pagination='center'
                autoHeight={true}
                headerAlign='center'
            ></DataGrid>
        </div>
    )
}
