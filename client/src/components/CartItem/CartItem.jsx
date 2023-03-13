import React from 'react'
import styles from './cartItem.module.css'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { useDispatch, useSelector } from 'react-redux'
import {
    addItem,
    resetProduct,
    deleteProduct,
} from '../../store/cart-shopping/cartSlice'
import axios from 'axios'

export default function CartItem(props) {
    const product = props.item
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    const getCart = async () => {
        try {
            const res = await axios.get(
                'http://localhost:8888/api/cart/find/' + user._id
            )

            if (res.data.products.length > 0) {
                dispatch(resetProduct(res.data))
            }
        } catch (err) {
            console.log(err)
        }
    }

    const addToCart = () => {
        const data = {
            product: { ...product, totalPrice: product.price },
            user: user,
        }
        const creatCart = async () => {
            try {
                const res = await axios.post(
                    'http://localhost:8888/api/cart',
                    data
                )
                dispatch(addItem(res.data))
            } catch (err) {
                console.log(err)
            }
        }
        creatCart()
    }

    const remove = async () => {
        try {
            await axios.post(
                'http://localhost:8888/api/cart/product/' + product._id,
                user
            )
            await getCart()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteItem = async () => {
        try {
            const res = await axios.post(
                'http://localhost:8888/api/cart/' + product._id,
                user
            )
            dispatch(deleteProduct(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles['cart__item']}>
            <div className={styles['cart__product']}>
                <img
                    src={product.image}
                    alt=''
                    className={styles['product__image']}
                />
                <div style={{ padding: '10px' }}>
                    <div className={styles['cart__product-title']}>
                        {product.title}
                    </div>
                    <div className={styles['cart__product-info']}>
                        <p className={styles['cart__product-price']}>
                            {product.quantity} x{' '}
                            <span>{product.price.toLocaleString()}</span>
                        </p>
                        <div
                            onClick={deleteItem}
                            className={styles['cart__product-close']}
                        >
                            <ClearIcon />
                        </div>
                    </div>
                    <div className={styles['cart__product-btn']}>
                        <span
                            onClick={remove}
                            className={styles['decrease-btn']}
                        >
                            <RemoveIcon fontSize='small' />
                        </span>
                        <span>{product.quantity}</span>
                        <span
                            onClick={addToCart}
                            className={styles['increase-btn']}
                        >
                            <AddIcon fontSize='small' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
