import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './homefoods.css';
const HomeFoods = (props) => {
    const { searchFun } = props;
    return (
        <section>
            <Container>
                <Row>
                    <Col md={4} className='foods-banner-container'>
                        <div className="foods-banner-img">
                            <img className='mt-2' width='100%' height='500' src='https://media.istockphoto.com/photos/closeup-of-funny-black-lady-eating-burger-at-studio-picture-id1285267223?k=20&m=1285267223&s=612x612&w=0&h=YkdUOhv_ZKt3FmYqp5ESJQZSQv3YMrWXhGscV1fddH8=' alt="" />
                        </div>
                        <div className="foods-banner-text">
                            DON'T <br /> STARVE <br /> ORDER NOW
                        </div>
                    </Col>
                    <Col md={8} className='mt-2'>
                        <Row className='g-5 mx-1'>
                            <Col md={6} sm={12}>
                                <Row onClick={() => {
                                            searchFun('burger')
                                        }} className='home-foods-container'>
                                    <Col md={8}>
                                        <div className="home-foods-img">
                                            <img className='my-2 home-foods-hover-img' width='100%' height='210' src="https://media.istockphoto.com/photos/delicious-homemade-hamburger-and-french-fries-picture-id1254672762?b=1&k=20&m=1254672762&s=170667a&w=0&h=nKrG40G2jj9O8wzJ8wDD2zmUKNp00mcdVWK_f_zixug=" alt="" />
                                            <img className='my-2 ' width='100%' height='210' src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F07%2F13%2FUltimate-Veggie-Burgers-FT-Recipe-0821.jpg&q=85" alt="" />
                                        </div>

                                    </Col>
                                    <Col md={4}>
                                        <div className='home-foods-text mt-5'>
                                            <p className='home-foods-active-text'>
                                                LUST
                                                <br />
                                                FOR
                                                <br />
                                                BURGERS
                                                <br />
                                                <span style={{ fontSize: '25px' }}>?</span>
                                            </p>
                                            <div className='home-foods-hidden-text'>
                                                <p>
                                                    ORDER
                                                    <br />
                                                    NOW
                                                    <br />
                                                    GET
                                                    <br />
                                                    DISCOUNT
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row onClick={() => {
                                            searchFun('kacchi')
                                        }} className='home-foods-container'>
                                    <Col md={8}>
                                        <div className="home-foods-img">
                                            <img className='my-2 home-foods-hover-img' width='100%' height='210' src="https://www.dhakafoodster.com/wp-content/uploads/2021/06/Sultan%E2%80%99s-Diner-Mirpur-Kacchi-Biriyani-1.jpg" alt="" />
                                            <img className='my-2 ' width='100%' height='210' src="https://www.utshob.com/wp-content/uploads/2010/11/Kacchi-Biryani.jpg" alt="" />
                                        </div>

                                    </Col>
                                    <Col md={4}>
                                        <div className='home-foods-text mt-5'>
                                            <p className='home-foods-active-text'>
                                                CRAVING
                                                <br />
                                                FOR
                                                <br />
                                                KACCHI
                                                <br />
                                                <span style={{ fontSize: '25px' }}>?</span>
                                            </p>
                                            <div className='home-foods-hidden-text'>
                                                <p>
                                                    ORDER
                                                    <br />
                                                    NOW
                                                    <br />
                                                    GET
                                                    <br />
                                                    DISCOUNT
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>


                        </Row>
                        <Row className='py-5 mx-1 g-5'>
                            <Col md={6} sm={12}>
                                <Row onClick={() => {
                                            searchFun('pizza')
                                        }} className='home-foods-container'>
                                    <Col md={8}>
                                        <div className="home-foods-img">
                                            <img className='my-2 home-foods-hover-img' width='100%' height='210' src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395__480.jpg" alt="" />
                                            <img className='my-2 ' width='100%' height='210' src="https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=20&m=938742222&s=612x612&w=0&h=X5AlEERlt4h86X7U7vlGz3bDaDDGQl4C3MuU99u2ZwQ=" alt="" />
                                        </div>

                                    </Col>
                                    <Col md={4}>
                                        <div className='home-foods-text mt-5'>
                                            <p className='home-foods-active-text'>
                                                MOVIE
                                                <br />
                                                WITHOUT
                                                <br />
                                                PIZZA
                                                <br />
                                                <span style={{ fontSize: '25px' }}>?</span>
                                            </p>
                                            <div className='home-foods-hidden-text'>
                                                <p>
                                                    ORDER
                                                    <br />
                                                    NOW
                                                    <br />
                                                    GET
                                                    <br />
                                                    DISCOUNT
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row onClick={() => {
                                            searchFun('rice')
                                        }} className='home-foods-container'>
                                    <Col md={8}>
                                        <div className="home-foods-img">
                                            <img className='my-2 home-foods-hover-img' width='100%' height='210' src="https://media.istockphoto.com/photos/bangla-cuisine-vorta-vaji-fish-curry-and-vegetables-curry-platter-picture-id949864510?k=20&m=949864510&s=170667a&w=0&h=G-W-G8LYrFJf3GnU4eQhgMpHWesFwTk1xqSWTZEfCeQ=" alt="" />
                                            <img className='my-2 ' width='100%' height='210' src="https://i.ytimg.com/vi/JlXaUHCODOY/maxresdefault.jpg" alt="" />
                                        </div>

                                    </Col>
                                    <Col md={4}>
                                        <div className='home-foods-text mt-5'>
                                            <p className='home-foods-active-text'>
                                                FONDOF
                                                <br />
                                                BENGALI
                                                <br />
                                                FOODS
                                                <br />
                                                <span style={{ fontSize: '25px' }}>?</span>
                                            </p>
                                            <div className='home-foods-hidden-text'>
                                                <p>
                                                    ORDER
                                                    <br />
                                                    NOW
                                                    <br />
                                                    GET
                                                    <br />
                                                    DISCOUNT
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>


                        </Row>

                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HomeFoods;