import React, { useEffect, useState } from 'react'
import './header.css'
import logo from '../../assets/images/logo.png'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { search, startSearch } from '../../store/cart-shopping/searchSlice'
import { Button, Drawer, Menu, MenuItem } from '@mui/material'
import CartMini from '../cartMini/CartMini'
import { Box } from '@mui/system'
import { logout } from '../../store/cart-shopping/authSlice'
import { resetProduct } from '../../store/cart-shopping/cartSlice'
import axios from 'axios'

export default function Header() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)
    const [searchTerm, setSearchTerm] = useState('')
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const openProfile = Boolean(anchorEl)

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
        getCart()
    }, [user, dispatch])

    const handleSearch = () => {
        dispatch(startSearch())
        setTimeout(() => {
            dispatch(search(searchTerm))
        }, 500)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        setAnchorEl(null)
        dispatch(logout())
        dispatch(
            resetProduct({
                products: [],
                totalQuantity: 0,
                totalAmount: 0,
            })
        )
    }

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400,
            }}
            role='presentation'
        >
            <CartMini onClose={() => setOpen(false)} />
        </Box>
    )

    return (
        <div className='headerWrapper'>
            <Link to='/' className='header__logo'>
                <img src={logo} alt='' />
            </Link>
            <div className='header__navigation'>
                <Link to='/products' className='header__navigation--item'>
                    GIÀY NỮ
                </Link>
                <Link to='/products' className='header__navigation--item'>
                    GIÀY NAM{' '}
                </Link>
                <Link to='/products' className='header__navigation--item'>
                    BALO - TÚI{' '}
                </Link>
                <Link to='/products' className='header__navigation--item'>
                    PHỤ KIỆN{' '}
                </Link>
                <Link to='/products' className='header__navigation--item'>
                    SẢN PHẨM BÁN CHẠY
                </Link>
            </div>

            <div className='header__right'>
                <div className='header__search'>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Tìm kiếm'
                        type='text'
                    />
                    <SearchIcon
                        style={{ color: 'black' }}
                        onClick={handleSearch}
                    />
                </div>
                <div className='header__user'>
                    {user ? (
                        <>
                            <Button
                                id='basic-button'
                                aria-controls={
                                    openProfile ? 'basic-menu' : undefined
                                }
                                aria-haspopup='true'
                                aria-expanded={openProfile ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <PersonIcon style={{ color: 'black' }} />
                            </Button>
                            <Menu
                                id='basic-menu'
                                anchorEl={anchorEl}
                                open={openProfile}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link to='/profile'>Trang cá nhân</Link>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Đăng xuất
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Link to='/login'>
                            <PersonIcon style={{ color: 'black' }} />
                        </Link>
                    )}
                </div>

                <div className='header__cart'>
                    <Button onClick={() => setOpen(true)}>
                        <ShoppingCartIcon style={{ color: 'black' }} />
                    </Button>
                    <Drawer anchor={'right'} open={open}>
                        {list('right')}
                    </Drawer>
                    <span className='totalquantity'>{totalQuantity}</span>
                </div>
            </div>
        </div>
    )
}
