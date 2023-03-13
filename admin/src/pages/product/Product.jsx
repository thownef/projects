import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './product.css'
import Chart from '../../components/chart/Chart'
import { productData } from '../../dummyData'
// import { Publish } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { updateProduct } from '../../redux/apiCalls'
import axios from 'axios'

export default function Product() {
    const param = useParams()
    const { productId: id } = param
    const [product, setProduct] = useState({})
    const [data, setData] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(
                'http://localhost:8888/api/products/find/' + id
            )
            setProduct(res.data)
        }
        fetchUser()
    }, [id])

    const handleClick = (e) => {
        updateProduct(data, id, dispatch)
    }

    return (
        <div className='product'>
            <div className='productTitleContainer'>
                <h1 className='productTitle'>Product</h1>
                <Link to='/newproduct'>
                    <button className='productAddButton'>Create</button>
                </Link>
            </div>
            <div className='productTop'>
                <div className='productTopLeft'>
                    <Chart
                        data={productData}
                        dataKey='Sales'
                        title='Sales Performance'
                    />
                </div>
                <div className='productTopRight'>
                    <div className='productInfoTop'>
                        <img
                            src={product.image}
                            alt=''
                            className='productInfoImg'
                        />
                        <span className='productName'>{product.title}</span>
                    </div>
                    <div className='productInfoBottom'>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>id:</span>
                            <span className='productInfoValue'>
                                {product._id}
                            </span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Giá:</span>
                            <span className='productInfoValue'>
                                {product.price}
                            </span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Loại:</span>
                            <span className='productInfoValue'>
                                {product.category}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='productBottom'>
                <form className='productForm'>
                    <div className='productFormLeft'>
                        <label>Tên sản phẩm</label>
                        <input
                            onChange={(e) =>
                                setData({ ...data, title: e.target.value })
                            }
                            type='text'
                            placeholder={product.title}
                        />
                        <label>Loại sản phẩm</label>
                        <input
                            onChange={(e) =>
                                setData({ ...data, category: e.target.value })
                            }
                            type='text'
                            placeholder={product.category}
                        />
                        <label>Giá</label>
                        <input
                            onChange={(e) =>
                                setData({ ...data, price: e.target.value })
                            }
                            type='text'
                            placeholder={product.price}
                        />
                    </div>
                    <div className='productFormRight'>
                        <div className='productUpload'>
                            <img
                                src={product.image}
                                alt=''
                                className='productUploadImg'
                            />
                            <label htmlFor='file'>{/* <Publish /> */}</label>
                            <input
                                type='file'
                                id='file'
                                style={{ display: 'none' }}
                            />
                        </div>
                        <button onClick={handleClick} className='productButton'>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
