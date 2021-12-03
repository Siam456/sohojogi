import React, { useState } from 'react';
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './AdvBanner.css'
const AdvBanner = () => {
    const [show, setShow] = useState(true);
    return (
        <>
            {show && <Container className='advertise-banner py-5'>
                <img height='150px' width='100%' src="https://static.vecteezy.com/system/resources/previews/002/453/533/non_2x/big-sale-discount-banner-template-promotion-illustration-free-vector.jpg" alt="" />
                <OverlayTrigger
                    overlay={<Tooltip id="tooltip-disabled">Close?</Tooltip>}
                >
                    <i class="fas fa-times advertise-banner-close" onClick={() => setShow(false)}></i>
                </OverlayTrigger>

            </Container>}
        </>
    );
};

export default AdvBanner;