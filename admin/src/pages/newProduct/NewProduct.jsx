import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/apiCalls'
import './newProduct.css'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../../firebase'

export default function NewProduct() {
    const [data, setData] = useState({
        title: '',
        price: '',
        category: '',
    })

    const [file, setFile] = useState(null)

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const fileName = new Date().getTime() + file.name
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(progress + '%')
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                    default:
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const newProduct = { ...data, image: downloadURL }
                    addProduct(newProduct, dispatch)
                    setData({
                        title: '',
                        price: '',
                        category: '',
                    })
                })
            }
        )
    }

    return (
        <div className='newProduct'>
            <h1 className='addProductTitle'>New Product</h1>
            <form className='addProductForm'>
                <div className='addProductItem'>
                    <label>Image</label>
                    <input
                        onChange={(e) => {
                            setFile(e.target.files[0])
                        }}
                        type='file'
                        id='file'
                        accept='.png, .jpeg, .jpg'
                    />
                </div>
                <div className='addProductItem'>
                    <label>Title</label>
                    <input
                        onChange={(e) =>
                            setData({ ...data, title: e.target.value })
                        }
                        value={data.title}
                        name='title'
                        type='text'
                        placeholder='Tên sản phẩm'
                    />
                </div>
                <div className='addProductItem'>
                    <label>Price</label>
                    <input
                        onChange={(e) =>
                            setData({ ...data, price: e.target.value })
                        }
                        name='price'
                        value={data.price}
                        type='number'
                        placeholder='10000'
                    />
                </div>
                <div className='addProductItem'>
                    <label>Categories</label>
                    <input
                        onChange={(e) =>
                            setData({ ...data, category: e.target.value })
                        }
                        value={data.category}
                        name='category'
                        type='text'
                        placeholder='Loại sản phẩm'
                    />
                </div>
                <button onClick={handleSubmit} className='addProductButton'>
                    Create
                </button>
            </form>
        </div>
    )
}
