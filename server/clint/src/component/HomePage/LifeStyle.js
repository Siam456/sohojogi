import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import LifeStyleCard from '../Shared/LifeStyleCard';

const LifeStyle = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])
    return (
        <section className='py-5'>
            <h1 style={{textAlign: 'center'}} className='pb-3'>LIFE STYLES</h1>
            <Container>
                {/* <Row>
                    <Col md={4}>
                        <div className="bg-primary">

                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="bg-success">y</div>
                    </Col>
                </Row> */}
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className=''>
                        <Col sm={3}>
                            <Nav variant='pills' className="flex-column">
                                <Nav.Item className='mb-2 border border-primary'>
                                    <Nav.Link eventKey="first">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div>
                                                <i class="fas fa-tshirt display-5 me-3 p-2"></i>
                                            </div>
                                            <div>
                                                <span className='fs-3'>CLOTHS</span>
                                                <br />
                                                <span><small>441 products</small></span>
                                            </div>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='mb-2 border border-primary'>
                                    <Nav.Link eventKey="second">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div>
                                                <i class="fas fa-shoe-prints display-5 me-3 p-2"></i>
                                            </div>
                                            <div>
                                                <span className='fs-3'>SHOES</span>
                                                <br />
                                                <span><small>241 products</small></span>
                                            </div>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='mb-2 border border-primary'>
                                    <Nav.Link eventKey="third">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div>
                                                <i class="fas fa-glasses display-5 me-3 p-2"></i>
                                            </div>
                                            <div>
                                                <span className='fs-3'>GLASSES</span>
                                                <br />
                                                <span><small>311 products</small></span>
                                            </div>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='mb-2 border border-primary'>
                                    <Nav.Link eventKey="fourth">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div>
                                                <i class="fas fa-gifts display-5 me-3 p-2"></i>
                                            </div>
                                            <div>
                                                <span className='fs-3'>GIFT ITEMS</span>
                                                <br />
                                                <span><small>641 products</small></span>
                                            </div>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item className='mb-2 border border-primary'>
                                    <Nav.Link eventKey="fifth">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div>
                                                <i class="fas fa-warehouse display-5 me-3 p-2"></i>
                                            </div>
                                            <div>
                                                <span className='fs-3'>SHOW ALL</span>
                                                <br />
                                                <span><small>641 products</small></span>
                                            </div>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item> */}


                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="lifestyle-card-container pt-1">
                                        <Row md={3} className='gap-0'>
                                            {
                                                items.map(item => item.company === 'square' ? <LifeStyleCard key={item.id} item={item} /> : null)
                                            }
                                        </Row>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel quaerat sapiente ab ratione hic officia vero perspiciatis quia a repellat sunt, magni cum voluptas dolores omnis aliquid culpa, obcaecati libero delectus ipsam sed similique! Ex molestias modi quidem beatae unde id, voluptatem cumque voluptates omnis. Eos quis provident neque aliquam!
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container >
            </Container >
        </section >
    );
};

export default LifeStyle;