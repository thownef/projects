import React from 'react'
import './productItem.css'

import black from '../../assets/images/black.jpg'
import white from '../../assets/images/white.jpg'
import { Link } from 'react-router-dom'

export default function ProductItem({ item }) {
    const { _id, title, price, image } = item
    return (
        <Link to={`/product/${_id}`} className='productItem'>
            <img src={image} alt='' />
            <p className='productItem__title'>{title}</p>
            <p className='productItem__price'>{price.toLocaleString()}</p>
            <div className='variantColor'>
                <ul>
                    <li className='variantColor--item'>
                        <img src={black} alt='' />
                    </li>
                    <li className='variantColor--item'>
                        <img src={white} alt='' />
                    </li>
                </ul>
            </div>
        </Link>
    )
}
