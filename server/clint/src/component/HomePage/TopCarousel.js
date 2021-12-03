import React from 'react';
import { Carousel } from 'react-bootstrap';
import './carousel.moudle.css'

const TopCarousel = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="https://source.unsplash.com/random"
                        alt="First slide"
                        height='500'
                    />
                    <Carousel.Caption className='carousel-caption d-flex flex-column h-100 align-items-center justify-content-center'>
                        <h3>First slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="https://source.unsplash.com/random"
                        alt="Second slide"
                        height='500'

                    />
                    <Carousel.Caption className='carousel-caption d-flex flex-column h-100 align-items-center justify-content-center'>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://source.unsplash.com/random"
                        alt="Third slide"
                        height='500'

                    />
                    <Carousel.Caption className='carousel-caption d-flex flex-column h-100 align-items-center justify-content-center'>
                        <h3>Third slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default TopCarousel;