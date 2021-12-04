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
                        src="https://www.basarbazar.com.bd/wp-content/uploads/2019/12/Banner2.jpg"
                        alt="First slide"
                        height='500'
                    />
                    
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="https://unb.com.bd/filemanager/photos/64/Banner-21..jpg"
                        alt="Second slide"
                        height='500'

                    />
                    
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://envato-shoebox-0.imgix.net/3b1d/af53-8323-4032-91eb-5afdc51c38af/DSC_1999+copy.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=1600&s=ab4aeca0d9b84809631e180880d2fec6"
                        alt="Third slide"
                        height='500'

                    />
                    
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default TopCarousel;