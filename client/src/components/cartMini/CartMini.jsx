import React, { useEffect } from 'react'
import styles from './cartmini.module.css'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
import CartItem from '../CartItem/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { resetProduct } from '../../store/cart-shopping/cartSlice'

export default function CartMini({ onClose }) {
    const user = useSelector((state) => state.auth.user)
    const cartProducts = useSelector((state) => state.cart.cartItem)
    const cartTotal = useSelector((state) => state.cart.totalAmount)
    const dispatch = useDispatch()

    useEffect(() => {
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
        user && getCart()
    }, [user, dispatch])

    return (
        <div className={styles['cartmini__container']}>
            <div className={styles['cartmini']}>
                <div className={styles['cartmini__top']}>
                    <p>Giỏ hàng</p>
                    <div
                        className={styles['cartmini__close']}
                        onClick={onClose}
                    >
                        <CloseIcon />
                        <span>ĐÓNG</span>
                    </div>
                </div>

                <div className={styles['cartmini__list']}>
                    {cartProducts.length === 0 ? (
                        <h6>Giỏ hàng trống</h6>
                    ) : (
                        cartProducts.map((item, index) => (
                            <CartItem item={item} key={index} />
                        ))
                    )}
                </div>

                <div className={styles['cartmini__bottom']}>
                    <h6>
                        Total: <span>{cartTotal.toLocaleString()}đ</span>
                    </h6>
                    <button>
                        <Link to='/cart'>GIỎ HÀNG</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
