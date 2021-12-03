import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NewsCategory.css';
const NewsCategory = () => {
    return (
        <div className='container my-3'>
            <Row lg={4} md={3} sm={2} xs={1}>
                <Link to='/newsX/Politicl'>
                <Col style={{cursor: 'pointer'}}>
                    <div className="newsCategoryPolitial">
                        <p className='newsCategoryTitle catpol text-primary'>POLITICAL</p>
                    </div>
                </Col>
                </Link>

                <Link to='/newsX/Sports'>
                <Col style={{cursor: 'pointer'}}>
                    <div className="newsCategorySports">
                        <p className='newsCategoryTitle text-primary'>SPORTS</p>
                    </div>
                </Col></Link>
                
                <Link to='/newsX/Fashion'>
                <Col style={{cursor: 'pointer'}}>
                    <div className="newsCategoryFashion">
                        <p className='newsCategoryTitle text-primary'>FASHION</p>
                    </div>
                </Col></Link>
                

                <Link to='/newsX/Celebrity'>
                <Col style={{cursor: 'pointer'}}>
                    <div className="newsCategoryEnter">
                        <p className='newsCategoryTitle text-primary'>CELEBRITY</p>
                    </div>
                </Col></Link>
                


            </Row>
        </div >
    );
};

export default NewsCategory;