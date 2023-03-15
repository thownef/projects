import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import styles from './productDetail.module.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from '@mui/material'
import Footer from '../../components/Footer/Footer'
import { createCart, getAProduct } from '../../store/apiCall'

export default function ProductDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [value, setValue] = useState(2)
    const [product, setProduct] = useState({})
    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        getAProduct(id)
            .then((data) => {
                setProduct(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const addToCart = () => {
        const data = {
            product: { ...product, totalPrice: product.price },
            user,
        }
        createCart(data, dispatch)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles['detailWrapper']}>
            <Header />
            <div className={styles['detail__content']}>
                <div className={styles['detail__img']}>
                    <img src={product.image} alt='' />
                </div>

                <div className={styles['detail__main']}>
                    <h1 className={styles['detail__name']}>{product.title}</h1>
                    <div className={styles['detail__top-info']}>
                        <div className={styles['detail__grating']}>
                            <Rating
                                className={styles['detail__grating-star']}
                                name='simple-controlled'
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue)
                                }}
                            />
                        </div>

                        <div className={styles['detail__review']}>
                            1014 <span>Đánh giá</span>
                        </div>

                        <div className={styles['detail__like']}>
                            890 <span>Số lượng thích</span>
                        </div>
                    </div>

                    <p className={styles['detail__price']}>{product.price}đ</p>
                    <div className={styles['detail__color-option']}>
                        <div className={styles['detail__label']}>Màu</div>
                        <div className={styles['detail__color']}>
                            <div
                                className={styles['detail__color--black']}
                            ></div>
                            <div
                                className={styles['detail__color--white']}
                            ></div>
                        </div>
                    </div>

                    <div className={styles['add__cart-button']}>
                        <button onClick={addToCart}>Thêm vào giỏ hàng</button>
                    </div>
                    <div className={styles['product-single__policy']}>
                        <div className={styles['product-policy']}>
                            <div className={styles['product-policy__item']}>
                                <div className={styles['product-policy__icon']}>
                                    <img
                                        src='https://img.mwc.com.vn/files/Icon/icon3.jpg'
                                        alt='Đổi trả với số điện thoại'
                                    />
                                </div>
                                <span
                                    className={styles['product-policy__title']}
                                >
                                    Bảo hành keo vĩnh viễn
                                </span>
                            </div>
                            <div className={styles['product-policy__item']}>
                                <div className={styles['product-policy__icon']}>
                                    <img
                                        src='https://img.mwc.com.vn/files/Icon/icon4.jpg'
                                        alt='Đổi trả với số điện thoại'
                                    />
                                </div>
                                <span
                                    className={styles['product-policy__title']}
                                >
                                    Miễn phí vận chuyển toàn quốc
                                    <br />
                                    cho đơn hàng từ 150k
                                </span>
                            </div>
                            <div className={styles['product-policy__item']}>
                                <div className={styles['product-policy__icon']}>
                                    <img
                                        src='https://img.mwc.com.vn/files/Icon/icon5.jpg'
                                        alt='Đổi trả với số điện thoại'
                                    />
                                </div>
                                <span
                                    className={styles['product-policy__title']}
                                >
                                    Đổi trả dễ dàng <br /> (trong vòng 7 ngày
                                    nếu lỗi nhà sản xuất)
                                </span>
                            </div>
                            <div className={styles['product-policy__item']}>
                                <div className={styles['product-policy__icon']}>
                                    <img
                                        src='https://img.mwc.com.vn/files/Icon/icon2.jpg'
                                        alt='Đổi trả với số điện thoại'
                                    />
                                </div>
                                <span
                                    className={styles['product-policy__title']}
                                >
                                    Hotline 1900.633.349
                                    <br />
                                    hỗ trợ từ 8h30-21h30
                                </span>
                            </div>
                            <div className={styles['product-policy__item']}>
                                <div className={styles['product-policy__icon']}>
                                    <img
                                        src='https://img.mwc.com.vn/files/Icon/icon1.jpg'
                                        alt='Đổi trả với số điện thoại'
                                    />
                                </div>
                                <span
                                    className={styles['product-policy__title']}
                                >
                                    Giao hàng tận nơi,
                                    <br />
                                    nhận hàng xong thanh toán
                                </span>
                            </div>
                            <div className={styles['product-policy__item']}>
                                <div className={styles['product-policy__icon']}>
                                    <img
                                        src='https://img.mwc.com.vn/files/Icon/icon3.jpg'
                                        alt='Đổi trả với số điện thoại'
                                    />
                                </div>
                                <span
                                    className={styles['product-policy__title']}
                                >
                                    Ưu đãi tích điểm và <br />
                                    hưởng quyền lợi thành viên từ MWC
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
