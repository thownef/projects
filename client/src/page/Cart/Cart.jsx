import React from 'react'
import './cart.css'
import Header from '../../components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../store/cart-shopping/cartSlice'
import { Link } from 'react-router-dom'
import ROUTES from '../../constant/routes'

export default function Cart() {
    const cartProducts = useSelector((state) => state.cart.cartItem)
    console.log(cartProducts)
    const totalAmount = useSelector((state) => state.cart.totalAmount)
    const dispatch = useDispatch()

    const shipcode = 0

    const deleteItem = (item) => {
        dispatch(deleteProduct(item.id))
    }

    return (
        <div className='container'>
            <Header />
            <div className='cart-list'>
                <div className='cart-list-header'>
                    <div className='cart-list-header-title'>Sản phẩm</div>
                    <div className='cart-list-header-price'>Đơn giá</div>
                    <div className='cart-list-header-quantity'>Số lượng</div>
                    <div className='cart-list-header-amount'>Số Tiền</div>
                    <div className='cart-list-header-action'>Thao Tác</div>
                </div>
                {cartProducts.length === 0 ? (
                    <h4
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            marginBottom: '10px',
                        }}
                    >
                        Giỏ hàng trống
                    </h4>
                ) : (
                    cartProducts.map((item) => (
                        <div className='cart-item-outer' key={item._id}>
                            <div className='cart-item-img'>
                                <img src={item.image} alt='' />
                                <div className='cart-item-title'>
                                    {item.title}
                                </div>
                            </div>
                            <div className='cart-item-price'>{item.price}</div>
                            <div className='cart-item-quantity'>
                                {item.quantity}
                            </div>
                            <div className='cart-item-amount'>
                                {item.totalPrice}
                            </div>
                            <div
                                onClick={() => {
                                    deleteItem(item)
                                }}
                                className='cart-item-action'
                            >
                                <button>delete</button>
                            </div>
                        </div>
                    ))
                )}

                <div
                    style={{
                        width: '80%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                    className='cart__total--line'
                ></div>

                <div className='cart__total'>
                    <div style={{ width: '50%' }}></div>
                    <div className='cart__total--info'>
                        <div className='cart__total--before'>
                            <span>Tổng tiền hàng</span>
                            <span>{totalAmount.toLocaleString()}</span>
                        </div>
                        <div className='cart__total--ship'>
                            <span>Phí vận chuyển</span>
                            <span>{shipcode.toLocaleString()}</span>
                        </div>
                        <div className='cart__total--line'></div>
                        <div className='cart__total--late'>
                            <span>TỔNG</span>
                            <span>
                                {(totalAmount + shipcode).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='cart__bottom'>
                    <button>
                        <Link to={ROUTES.PRODUCTS}>Tiếp tục mua sắm</Link>
                    </button>
                    <button>
                        <Link to={ROUTES.CHECKOUT}>Thanh toán</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
