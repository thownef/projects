import React, { useEffect, useState } from 'react'
import style from './allProduct.module.css'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import ProductItem from '../../components/productItem/ProductItem'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import { Stack } from '@mui/system'
import { MenuItem, Pagination, Select } from '@mui/material'
import axios from 'axios'

export default function AllProduct() {
    const [data, setData] = useState([])
    const [pro, setPro] = useState(data)
    const [sortType, setSortType] = useState('default')
    const [filterType, setFilterType] = useState('default')
    const [page, setPage] = useState(1)

    const searchTerm = useSelector((state) => state.search.searchTerm)
    const isFetching = useSelector((state) => state.search.isFetching)

    const count = Math.ceil(data.length / 12)

    const handleChange = (_, value) => {
        setPage(value)
    }

    const visitedPage = (page - 1) * 12

    const displayPage = data.slice(visitedPage, visitedPage + 12)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:8888/api/products'
                )
                setData(res.data)
                setPro(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [])

    useEffect(() => {
        const filterArray = (type) => {
            const types = {
                default: 'default',
                shoe: 'shoe',
                sandal: 'sandal',
            }
            const filterProperty = types[type]
            if (filterProperty === 'default') {
                const filterProduct = pro
                setData(filterProduct)
            }

            if (filterProperty === 'shoe') {
                const filterProduct = pro.filter((item) => {
                    return item.category === 'shoe'
                })

                setData(filterProduct)
            }

            if (filterProperty === 'sandal') {
                const filterProduct = pro
                    .filter((item) => {
                        return item.category === 'sandal'
                    })
                    .map((item) => item)
                setData(filterProduct)
            }
        }

        filterArray(filterType)
    }, [filterType, pro])

    useEffect(() => {
        const searchedProduct = pro.filter((item) => {
            if (searchTerm === '') return item
            if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return item
            }
            return false
        })
        setData(searchedProduct)

        if (sortType === 'default') {
            const sortProduct = searchedProduct
            setData(sortProduct)
        }
        if (sortType === 'ascending') {
            const sortProduct = searchedProduct
                .sort((a, b) => {
                    let x = a.title.toLowerCase()
                    let y = b.title.toLowerCase()
                    return x === y ? 0 : x < y ? 1 : -1
                })
                .map((item) => item)
            setData(sortProduct)
        }
        if (sortType === 'descending') {
            const sortProduct = searchedProduct
                .sort((a, b) => {
                    let x = a.title.toLowerCase()
                    let y = b.title.toLowerCase()
                    return x === y ? 0 : x > y ? 1 : -1
                })
                .map((item) => item)
            setData(sortProduct)
        }
        if (sortType === 'highprice') {
            const sortProduct = searchedProduct
                .sort((a, b) => {
                    return a.price === b.price ? 0 : a.price < b.price ? 1 : -1
                })
                .map((item) => item)
            setData(sortProduct)
        }
        if (sortType === 'lowprice') {
            const sortProduct = searchedProduct
                .sort((a, b) => {
                    let x = a.price
                    let y = b.price
                    return x === y ? 0 : x > y ? 1 : -1
                })
                .map((item) => item)
            setData(sortProduct)
        }
        setData(searchedProduct)
    }, [searchTerm, sortType, pro])

    return (
        <div>
            <Header />
            <div className={style.allProductWrapper}>
                <div className={style['category-top-info']}>
                    <h2 className={style['category-title']}>GIÀY NỮ</h2>
                    <div className={style['toolbar-mode']}>
                        <div className={style['toolbar-left']}>
                            BỘ LỌC :
                            <Select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{ width: 120, height: 40, ml: 1 }}
                            >
                                <MenuItem value='default'>
                                    <em>Mặc định</em>
                                </MenuItem>
                                <MenuItem value='shoe'>Giày</MenuItem>
                                <MenuItem value='sandal'>Dép</MenuItem>
                            </Select>
                        </div>

                        <div className={style['toolbar-right']}>
                            SẮP XẾP :
                            <Select
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{
                                    width: 160,
                                    height: 40,
                                    textAlign: 'center',
                                    ml: 1,
                                }}
                            >
                                <MenuItem value='default'>
                                    <em>Mặc định</em>
                                </MenuItem>
                                <MenuItem value='ascending'> A - Z</MenuItem>
                                <MenuItem value='descending'> Z - A</MenuItem>
                                <MenuItem value='highprice'>
                                    Giá cao tới thấp
                                </MenuItem>
                                <MenuItem value='lowprice'>
                                    Giá thấp tới cao
                                </MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className={style['category-product-list']}>
                    {isFetching ? (
                        <div
                            className='test'
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        </div>
                    ) : (
                        displayPage.map((item, index) => (
                            <div className={style['product-item']} key={index}>
                                <ProductItem item={item} />
                            </div>
                        ))
                    )}
                </div>
                <div className={style['pagination']}>
                    <Stack spacing={2}>
                        <Pagination
                            count={count}
                            page={page}
                            onChange={handleChange}
                        />
                    </Stack>
                </div>
            </div>
            <Footer />
        </div>
    )
}
