import { FormControl, Input, InputLabel } from '@mui/material'
import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './checkout.css'

export default function Checkout() {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Đặt hàng thành công')
    }

    return (
        <>
            <Header />
            <div className='checkout__light'></div>
            <div className='checkout__container'>
                <div className='checkout'>
                    <h4>THÔN TIN VẬN CHUYỂN</h4>
                    <form onSubmit={handleSubmit} className='checkout--info'>
                        <div className='checkout__info-user'>
                            <div style={{ flex: 1 }} className='checkout-name'>
                                <FormControl sx={{ width: 200, mt: 2 }}>
                                    <InputLabel htmlFor='name'>
                                        Họ và tên
                                    </InputLabel>
                                    <Input
                                        id='name'
                                        aria-describedby='my-helper-text'
                                    />
                                </FormControl>
                            </div>
                            <div style={{ flex: 1 }} className='checkout-phone'>
                                <FormControl sx={{ width: 200, mt: 2 }}>
                                    <InputLabel htmlFor='phone'>
                                        Số điện thoại
                                    </InputLabel>
                                    <Input
                                        id='phone'
                                        aria-describedby='my-helper-text'
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className='checkout__address'>
                            <FormControl sx={{ width: '83%', mt: 2 }}>
                                <InputLabel htmlFor='address'>
                                    Địa chỉ
                                </InputLabel>
                                <Input
                                    id='address'
                                    aria-describedby='my-helper-text'
                                />
                            </FormControl>
                        </div>
                        <button type='submit' className='checkout__button'>
                            submit
                        </button>
                    </form>
                </div>
            </div>
            <div className='checkout__light'></div>
            <Footer />
        </>
    )
}
