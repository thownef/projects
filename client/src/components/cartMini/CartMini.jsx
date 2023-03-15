import React, { useEffect } from 'react'
import styles from './cartmini.module.css'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
import CartItem from '../CartItem/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../store/apiCall'
import ROUTES from '../../constant/routes'

export default function CartMini({ onClose }) {
    const user = useSelector((state) => state.auth.user)
    const cartProducts = useSelector((state) => state.cart.cartItem)
    const cartTotal = useSelector((state) => state.cart.totalAmount)
    const dispatch = useDispatch()

    useEffect(() => {
        getCart(user._id, dispatch)
    }, [user._id, dispatch])

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
                        cartProducts.map((item) => (
                            <CartItem item={item} key={item._id} />
                        ))
                    )}
                </div>

                <div className={styles['cartmini__bottom']}>
                    <h6>
                        Total: <span>{cartTotal.toLocaleString()}đ</span>
                    </h6>
                    <button>
                        <Link to={ROUTES.CART}>GIỎ HÀNG</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
