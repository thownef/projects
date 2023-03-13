import React from 'react'
import './slider.css'
import banner from '../../assets/images/banner.jpg'
import banner1 from '../../assets/images/banner1.jpg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

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
                <SwiperSlide>
                    <img src={banner} alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={banner1} alt='' />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={banner} alt='' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={banner1} alt='' />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={banner} alt='' />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
