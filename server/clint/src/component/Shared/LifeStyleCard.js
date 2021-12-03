import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './LifeStyleCard.css';
const LifeStyleCard = ({ item }) => {
    const { name, price, productImage1 } = item;
    return (
        <Col>
            <div className='lifeStyleCard mb-4'>
                <img className='lifeStyleCardImg1' src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" style={{ width: '100%' }} />
                <img className='lifeStyleCardImg2' src={productImage1} alt="" style={{ width: '100%' }} />
                <span className='lifeStyleCardPrice'>${price}</span>
            </div>
        </Col>
    );
};

export default LifeStyleCard;