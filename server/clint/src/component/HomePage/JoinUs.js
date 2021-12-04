import confetti from 'canvas-confetti';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './JoinUs.css';

function run() {
    const end = Date.now() + (5 * 1000);

    // go Buckeyes!
    const colors = ['#bb0000', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// function run() {
//     var duration = 3 * 1000;
//     var animationEnd = Date.now() + duration;
//     var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

//     function randomInRange(min, max) {
//         return Math.random() * (max - min) + min;
//     }

//     var interval = setInterval(function () {
//         var timeLeft = animationEnd - Date.now();

//         if (timeLeft <= 0) {
//             return clearInterval(interval);
//         }

//         var particleCount = 50 * (timeLeft / duration);
//         // since particles fall down, start a bit higher than random
//         confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
//         confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
//     }, 250);
// }
const JoinUs = () => {
    return (
        <section className='py-5'>
            <h1 className='pb-3 text-center'>BE A PART SOHOZOGI</h1>
            <Container className='pb-5' style={{textAlign: 'center'}}>
                <Row>
                    <Col className='border-end border-secondary'> <span className='fs-1 fw-bolder'>2</span> <br /> <span className='fs-3 text-uppercase'> Years</span></Col>
                    <Col className='border-end border-secondary'> <span className='fs-1 fw-bolder'>4500+</span> <br /> <span className='fs-3 text-uppercase'>Products</span></Col>
                    <Col className='border-end border-secondary'> <span className='fs-1 fw-bolder'>200000</span> <br /> <span className='fs-3 text-uppercase'> Users </span></Col>
                    <Col> <span className='fs-1 fw-bolder'>500</span> <br /> <span className='fs-3 text-uppercase'>Merchants</span> </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                    <Link to="/shoprq"  style={{color: 'black', textDecoration: 'none'}}>
                        <div className='joinus-item' onClick={() => run()}>
                            <div>
                                <i class="fas fa-id-card-alt joinus-icon"></i>
                            </div>
                            <div className='joinus-text'>
                                <span>BECOME</span>
                                <br />
                                <span>MERCHANT</span>
                            </div>
                        </div>
                    </Link>
                    </Col>
                    <Col>
                        <Link to="/riderrq"  style={{color: 'black', textDecoration: 'none'}}>
                        <div className='joinus-item' onClick={() => run()}>
                            <div>
                                <i class="fas fa-user-secret joinus-icon"></i>
                            </div>
                            <div className='joinus-text'>
                                <span>BECOME</span>
                                <br />

                                <span>DELIVERY HERO</span>
                            </div>
                        </div>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default JoinUs;