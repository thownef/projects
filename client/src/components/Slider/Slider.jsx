import React from 'react'
import './slider.css'
import banner from '../../assets/images/banner.jpg'
import banner1 from '../../assets/images/banner1.jpg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const slider = [banner, banner1, banner, banner1, banner]

export default function Slider() {
    return (
        <div className='slider'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='mySwiper'
            >
                {slider.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item} alt='' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
