import React, { useEffect, useState } from 'react';
import './HomePharmacy.css';
import Slider from 'react-slick';
import { Container, Spinner } from 'react-bootstrap';
import CardGenerator from '../Shared/CardGenerator'

const HomePharmacy = ({product,setModalId}) => {
    // const {product} = props;
    //console.log(product)
    //
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(product)
    }, [product])
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    arrows: false,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,

                }
            }
        ]
    };
    return (
      <section>
        <h1 className="text-center">MEDICS</h1>
        {/* {console.log(product)} */}

        {items?.length > 0 ? (
          <Container className="mx-auto">
            <Slider {...settings}>
              {items?.map((item) => {
                  if(item.sellerA.catagory === 'Pharmacy'){
                    return <CardGenerator item={item} setModalId={setModalId} />
                  }
              })
              }
            </Slider>

          </Container>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </section>
    );
};

export default HomePharmacy;