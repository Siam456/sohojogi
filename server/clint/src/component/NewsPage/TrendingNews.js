import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TrendingNews.css';
const TrendingNews = ({news}) => {

    const [newsC, setnewsC] = useState([]);
    const [test,setTest] = useState(null)

    useEffect(() => {
        setnewsC(news)
        setTest(newsC[0]?._id);
        
    }, [news])
    return (
        <Container className='mb-5'>
            <h1 className='mx-3 mb-4'>TRENDING NOW</h1>
            <Row lg={2} md={2} sm={1}>
                <Col>
                    <Link to={`/news/${test}` } style={{color: 'black', textDecoration: 'none'}}>
                        <div className="trendNewsContent mb-3">
                        {newsC[0]?.newsCoverPhoto ? 
                                <img src= {window.location.origin + '/newsCover/' + newsC[0]?.newsCoverPhoto} alt="ssss" height='100%' width='100%' /> : 
                                <img src= 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg' alt="ssss" height='100%' width='100%' />}
                            <p className='trendNewsTitle'>{newsC[0]?.title}</p>
                            <i className="fas fa-eye"> {newsC[0]?.view}</i>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Row lg={2} md={2} sm={1}>
                        {newsC.slice(1,5).map((value, index) => {
                            return (
                              <Link
                                to={"/news/" + value._id}
                                style={{
                                  color: "black",
                                  textDecoration: "none",
                                }}
                              >
                                <Col>
                                  <div className="trendNewsContent mb-3">
                                    {value.newsCoverPhoto ? (
                                      <img
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

                                    <p className="trendNewsTitlesm">
                                      {value.title}
                                    </p>
                                    <i className="fas fa-eye"> {value.view}</i>
                                  </div>
                                </Col>
                              </Link>
                            );
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default TrendingNews;