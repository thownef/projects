import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'

export default function Footer() {
    return (
        <div className='footerWrapper'>
            <div className='footer__info'>
                <h4>GỌI MUA HÀNG ONLINE (08:00 - 21: 00 mỗi ngày)</h4>
                <div className='footer__info--content'>
                    <span>1900.633.349</span>
                    <p>Tất cả các ngày trong tuần (Trừ tết Âm Lịch)</p>
                    <h4>GÓP Ý & KHIẾU NẠI (08:30 - 20:30)</h4>
                </div>
            </div>
            <div className='footer__info'>
                <h4>THÔNG TIN</h4>
                <ul>
                    <li>Giới thiệu về MWC</li>
                    <li>Than Phiền Góp Ý</li>
                    <li>Chính sách và quy định</li>
                </ul>
            </div>
            <div className='footer__info'>
                <h4>FAQ</h4>
                <ul>
                    <li>Vận chuyển</li>
                    <li>Chính sách đổi trả</li>
                    <li>Chính sách đổi trả bảo hành</li>
                </ul>

                <div className='footer__social'>
                    <span>
                        <Link to='/'>
                            <FacebookIcon />
                        </Link>
                    </span>
                    <span>
                        <Link to='/'>
                            <InstagramIcon />
                        </Link>
                    </span>
                    <span>
                        <Link to='/'>
                            <YouTubeIcon />
                        </Link>
                    </span>
                    <span>
                        <Link to='/'>
                            <TwitterIcon />
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
