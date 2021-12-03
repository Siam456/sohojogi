import React, { useState, useEffect } from "react";
import axios from "axios";
import "./news.css";
import { useParams } from "react-router";

const NewsAll = () => {
	const [getNews, setgetNews] = useState([]);
    const { name } = useParams();
    //today

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todayNew = yyyy + '-' + mm + '-' + dd ;


    const [Sdate, setSdate] = useState('');

	//get data from api
	var unmount = true;
	useEffect(() => {
		axios
			.get("/news")
			.then((res) => {
				if (unmount) {
					setgetNews(res.data.news);
					//console.log(getNews);
				}
			})
			.catch((err) => console.log(err));

		return () => {
			unmount = false;
		};
	}, ["/news"]);

	//store date for search
	const storeData = (e) => {
		setSdate(e.target.value);
	};

	//reset date
	const resetDate = () => {
		setSdate("");
	};

	return (
		<div className="container">
			<h2 className="text-success my-4" style={{ textAlign: "center" }}>
				<i className="fas fa-globe-europe"></i> Top {name} News
			</h2>
			<div className="filterDate my-3">
				<p
					className="text-success"
					style={{ width: "40%", margin: "auto", height: "100%" }}
				>
					Filter date
				</p>
				<input
					className="form-control"
					type="date"
					onChange={storeData}
					id="start"
					name="date"
					min="2021-01-01"
					max="2023-12-31"
				/>{" "}
				<button onClick={resetDate} className="btn">
					<i className="fas fa-sync"></i>
				</button>
			</div>{" "}
			<br></br>
			<div className="row" >
				{getNews.map((v, i) => {

                    var checkDAte = new Date(v.createdAt);
                    var dd = String(checkDAte.getDate()).padStart(2, '0');
                    var mm = String(checkDAte.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = checkDAte.getFullYear();
                    let cdate = yyyy + '-' + mm + '-' + dd ;
                    
                    

					let source;
                    //console.log(window.location.origin)
					if (v.newsCoverPhoto) {
						source = window.location.origin + `/newsCover/${v.newsCoverPhoto}`;
					} else {
						source =
							"https://videohive.img.customer.envatousercontent.com/files/52597691/Preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=99df3b202f76fda3f3cf5c63a0c2352b";
					}

					let date = new Date(v.createdAt);
					let formattedDate = date.toDateString();

                    //console.log(Sdate + cdate)
					let hrf = `/news/${v._id}`;
					if(v.catagory === name){
                        if(Sdate === ''){
                            return (
                              <div
                                key={i}
                                className="col-sm-12 col-lg-4 col-md-6 my-3"
                              >
                                <a
                                  href={hrf}
                                  key={i}
                                  style={{
                                    color: "black",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    marginTop: "30px",
                                  }}
                                >
                                  <div
                                    className="card"
                                    style={{
                                      width: "18rem",
                                      marginLeft: "auto",
                                      marginRight: "auto",
                                    }}
                                  >
                                    <div
                                      style={{
                                        height: "185px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <img
                                        className="card-img-top"
                                        src={source}
                                        alt="ss"
                                      />
                                    </div>
                                    <div className="allNewsText ps-2">
                                      {v.title.length >= 20 ? (
                                        <span>{v.title.slice(0, 20)}...</span>
                                      ) : (
                                        <span>{v.title}</span>
                                      )}
                                      <small>Published on: {cdate}</small>
                                      <i className="fas fa-eye"> {v.view}</i>
                                      <small>Category: {v.catagory}</small>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            );
                        } else if(Sdate === cdate){
                            return (
                                <>
                                    <a
                                        href={hrf}
                                        key={i}
                                        style={{
                                            color: "black",
                                            textDecoration: "none",
                                            cursor: "pointer",
                                            marginTop: "30px",
                                        }}
                                        className="col-sm"
                                    >
                                        <div
                                            className="card"
                                            style={{
                                                width: "18rem",
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                            }}
                                        >
                                            <div style={{ height: "185px", overflow: "hidden" }}>
                                                <img
                                                    className="card-img-top"
                                                    src={source}
                                                    alt="Card"
                                                />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{v.title}</h5>
                                                <p className="card-text">
                                                    {v.content.length >= 50 ? (
                                                        <span>{v.content.slice(0, 50)}...</span>
                                                    ) : (
                                                        <span>{v.content}</span>
                                                    )}
                                                </p>
                                                <p className="text-muted">
                                                    <i className="fas fa-globe-europe"></i> {v.catagory}
                                                </p>
                                                <p className="text-muted">
                                                    <i className="far fa-clock"></i>
                                                    {formattedDate}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </>
                            );
                        } 
                    }
				})}{" "}
			</div>
		</div>
	);
};

export default NewsAll;
