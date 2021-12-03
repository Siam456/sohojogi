import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import './Footer.css';
const Footer = () => {
    return (
        <footer class="w-100 py-4 flex-shrink-0">
            <Container class="py-4">
                <Row class="gy-4 gx-5">
                    <Col lg={4} md={6}>
                        <h5 class="h1 text-white">Sohozogi</h5>
                        <p class="small text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                        <p class="small text-white mb-0">Sohozogi &copy; Copyrights. All rights reserved.</p>
                    </Col>
                    <Col lg={2} md={6}>
                        <h5 class="text-white mb-3">Quick links</h5>
                        <ul class="list-unstyled text-muted">
                            <li><a href="/">LINK</a></li>
                            <li><a href="/">LINK</a></li>
                            <li><a href="/">LINK</a></li>
                            <li><a href="/">LINK</a></li>
                        </ul>
                    </Col>
                    <Col lg={2} md={6}>
                        <h5 class="text-white mb-3">Quick links</h5>
                        <ul class="list-unstyled text-muted">
                            <li><a href="/">Home</a></li>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">Home</a></li>

                        </ul>
                    </Col>
                    <Col lg={4} md={6}>
                        <h5 class="text-white mb-3">Newsletter</h5>
                        <p class="small text-white">Subscribe to our newsletter and get all updates quickly.</p>
                        <Form>
                            <div class="input-group mb-3">
                                <input class="form-control" type="text" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button class="btn btn-success" id="button-addon2" type="button"><i class="fas fa-paper-plane"></i></button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </footer>

    );
};

export default Footer;