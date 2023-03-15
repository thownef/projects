import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Slider from '../../components/Slider/Slider'
import styles from './home.module.css'
import shopnow from '../../assets/images/shopnow.jpg'
import ProductItem from '../../components/productItem/ProductItem'
import Footer from '../../components/Footer/Footer'
import { getProducts } from '../../store/apiCall'

export default function Home() {
    const [data, setData] = useState([])
    const [hotProduct, setHotProduct] = useState([])
    const [hotShoe, setHotShoe] = useState([])
    const [hotSadal, setHotSandal] = useState([])

    useEffect(() => {
        getProducts()
            .then((data) => {
                setData(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        const sliceProduct = data.slice(0, 4)
        setHotProduct(sliceProduct)
    }, [data])

    useEffect(() => {
        const filterShoe = data.filter((item) => item.category === 'shoe')

        const sliceShoe = filterShoe.slice(0, 4)

        setHotShoe(sliceShoe)
    }, [data])

    useEffect(() => {
        const filterSandal = data.filter((item) => item.category === 'sandal')

        const sliceSandal = filterSandal.slice(0, 4)

        setHotSandal(sliceSandal)
    }, [data])

    return (
        <div>
            <Header />
            <Slider />
            <div className={styles['homeWrapper']}>
                <div
                    style={{
                        padding: '20px 0',
                        textAlign: 'center',
                        fontSize: '1.3rem',
                        fontWeight: '300',
                    }}
                >
                    <p>SẢN PHẨM BÁN CHẠY</p>
                </div>
                <div className={styles['selling']}>
                    <div className={styles['home__selling--button']}>
                        <img src={shopnow} alt='' />
                    </div>
                    <div className={styles['home__selling--list']}>
                        {hotProduct.map((item) => (
                            <div
                                className={styles['home__selling--item']}
                                key={item._id}
                            >
                                <ProductItem item={item} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles['home__shoe']}>
                    <p className={styles['home__shoe-title']}>
                        GIÀY CAO GÓT NỮ
                    </p>
                    <div className={styles['home__shoe--list']}>
                        {hotShoe.map((item) => (
                            <div
                                className={styles['home__shoe--item']}
                                key={item._id}
                            >
                                <ProductItem item={item} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles['home__shoe']}>
                    <p className={styles['home__shoe-title']}>DÉP CHO NỮ</p>
                    <div className={styles['home__shoe--list']}>
                        {hotSadal.map((item) => (
                            <div
                                className={styles['home__shoe--item']}
                                key={item._id}
                            >
                                <ProductItem item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
