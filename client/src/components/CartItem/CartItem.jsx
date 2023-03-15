import React from 'react'
import styles from './cartItem.module.css'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { useDispatch, useSelector } from 'react-redux'
import { createCart, deleteProduct, getCart, remove } from '../../store/apiCall'

export default function CartItem(props) {
    const product = props.item
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    getCart(user._id, dispatch)

    const addToCart = () => {
        const data = {
            product: { ...product, totalPrice: product.price },
            user,
        }
        createCart(data, dispatch)
    }

    const removeItem = () => {
        remove(product._id, user)
    }

    const deleteItem = () => {
        deleteProduct(product._id, user, dispatch)
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
                            onClick={removeItem}
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
