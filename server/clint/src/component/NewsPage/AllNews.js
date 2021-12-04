import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AllNews.css';
const AllNews = ({news}) => {
    return (
        <Container>
            <Row lg={4} md={3} sm={2} xs={1}>
                {news.map((value, index) => {

                var checkDAte = new Date(value.createdAt);
                var dd = String(checkDAte.getDate()).padStart(2, '0');
                var mm = String(checkDAte.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = checkDAte.getFullYear();
                let cdate = yyyy + '-' + mm + '-' + dd ;


                    return (
                      <Link
                        to={"/news/" + value._id}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <Col>
                          <div className="allNewsContent mb-5 sm-d-block">
                            {value.newsCoverPhoto ? (
                              <img
                                className=""
                                src={
                                  window.location.origin +
                                  "/newsCover/" +
                                  value.newsCoverPhoto
                                }
                                alt="ssss"
                                height="150"
                                width="250"
                              />
                            ) : (
                              <img
                                src="https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"
                                alt="ssss"
                                height="150"
                                width="250"
                              />
                            )}
                            <div className="allNewsText ps-2">
                              {value.title.length >= 20 ? (
                                <span>{value.title.slice(0, 20)}...</span>
                              ) : (
                                <span>{value.title}</span>
                              )}
                              <small>Published on: {cdate}</small>
                              <i className="fas fa-eye"> {value.view}</i>
                              <small>Category: {value.catagory}</small>
                            </div>
                          </div>
                        </Col>
                      </Link>
                    );
                })}
                

            </Row>
        </Container>
    );
};

export default AllNews;