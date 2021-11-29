import axios from "axios";
import React, { useState, useEffect } from "react";
import "./adminShowProducts.css";

const AdminShowProduct = () => {
  const [shop, setshop] = useState([]);
  const [searchSHop, setsearchSHop] = useState("");

  useEffect(() => {
    let unmount = true;
    axios
      .get("/user/seller")
      .then((res) => {
        if (unmount) {
          setshop(res.data.seller);
          //console.log(shop)
        }
      })
      .catch((err) => console.log(err));

    return () => {
      unmount = false;
    };
  }, []);

  //delete product

  const delProduct = (id) => {
    axios
      .delete(`/product/${id}`)
      .then((res) => {
        alert("delete successfully");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //add feature list
  const fetureProduct = (id) => {
    //alert('Ok Done')

    axios
      .patch(`/product/f/f/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //search shop

  const searchShop = (e) => {
    setsearchSHop(e.target.value);
    //console.log(searchSHop)
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="xs">
            <h3>
              <i className="fab fa-block"></i>Control Products
            </h3>
            <input
              className="form-control iSearch"
              type="text"
              onChange={searchShop}
              placeholder="Search shop/location..."
            />
          </div>

          {shop.map((value, index) => {
            let spName = "";
            let location = "";
            let cardWrapper = "";
            if (value.products.length > 0) {
              spName = <h2 className="text-muted"> {value.shopname}</h2>;
              location = (
                <h6>
                  <i
                    style={{ color: "#D04545" }}
                    className="fas fa-map-marker-alt"
                  ></i>{" "}
                  {value.address}
                </h6>
              );
              cardWrapper = "row my-5 cardWrapperPC";
            }
            if (searchSHop !== "") {
              const locationDatabase = value.address.toLowerCase();
              const locationinput = searchSHop.toLowerCase();
              if (
                value.shopname.includes(searchSHop) ||
                locationDatabase.includes(locationinput)
              ) {
                return (
                  <div key={index}>
                    <div className={cardWrapper}>
                      {spName}
                      {location}
                      {value.products.map((p, i) => {
                        //no product show make its
                        let featureLogo;
                        if (p.feature === "true") {
                          featureLogo = "fas fa-star";
                        } else {
                          featureLogo = "far fa-star";
                        }

                        let productImg;
                        if (p.avater === null) {
                          productImg = (
                            <img
                              alt="siam"
                              style={{
                                marginBottom: "20px",
                                borderRadius: "3px",
                              }}
                              src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                              height="80px"
                              width="80px"
                            />
                          );
                        } else {
                          productImg = (
                            <img
                              alt="siam"
                              style={{
                                marginBottom: "20px",
                                borderRadius: "3px",
                              }}
                              src={
                                window.location.origin +
                                `/productAvater/${p.avater}`
                              }
                              height="80px"
                              width="80px"
                            />
                          );
                        }

                        var trimmedString = p.description.substring(0, 6);

                        return (
                          <div key={i} className="col-sm-4">
                            <div>
                              <div
                                className="cardX"
                                type="button"
                                data-toggle="modal"
                                data-target="#exampleModalLong"
                              >
                                <div className="card-d">
                                  <div className="card-d-wi">
                                    <span style={{ fontWeight: "bold" }}>
                                      <i
                                        style={{ color: "#DC6B29" }}
                                        className="fas fa-pizza-slice"
                                      ></i>{" "}
                                      {p.title}
                                    </span>
                                    <br />
                                    <span
                                      style={{ color: "gray", width: "auto" }}
                                    >
                                      {trimmedString}...
                                    </span>
                                    <br />
                                    <br />
                                    <h6 style={{ fontWeight: "bold" }}>
                                      <i className="fas fa-tags"></i> tk{" "}
                                      {p.price}
                                    </h6>
                                  </div>

                                  <div
                                    style={{
                                      overflow: "hidden",
                                      float: "right",
                                    }}
                                  >
                                    {productImg}
                                  </div>
                                </div>
                                <button className="card-b">
                                  <i
                                    style={{ color: "#1c2e4a" }}
                                    onClick={() => fetureProduct(p._id)}
                                    className={featureLogo}
                                  ></i>
                                </button>
                                <button
                                  className="card-b"
                                  style={{ marginLeft: "15px" }}
                                >
                                  <i
                                    style={{ color: "red" }}
                                    onClick={() => delProduct(p._id)}
                                    className="far fa-trash-alt"
                                  ></i>
                                </button>
                              </div>

                              {/* <!-- Modal --> */}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            } else {
              return (
                <div key={index}>
                  <div className={cardWrapper}>
                    {spName}
                    {location}
                    {value.products.map((p, i) => {
                      //no product show make its
                      let featureLogo;
                      if (p.feature === "true") {
                        featureLogo = "fas fa-star";
                      } else {
                        featureLogo = "far fa-star";
                      }

                      let productImg;
                      if (p.avater === null) {
                        productImg = (
                          <img
                            alt="siam"
                            style={{
                              marginBottom: "20px",
                              borderRadius: "3px",
                            }}
                            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                            height="80px"
                            width="80px"
                          />
                        );
                      } else {
                        productImg = (
                          <img
                            alt="siam"
                            style={{
                              marginBottom: "20px",
                              borderRadius: "3px",
                            }}
                            src={
                              window.location.origin +
                              `/productAvater/${p.avater}`
                            }
                            height="80px"
                            width="80px"
                          />
                        );
                      }

                      var trimmedString = p.description.substring(0, 6);

                      return (
                        <div key={i} className="col-sm-4">
                          <div>
                            <div
                              className="cardX"
                              type="button"
                              data-toggle="modal"
                              data-target="#exampleModalLong"
                            >
                              <div className="card-d">
                                <div className="card-d-wi">
                                  <span style={{ fontWeight: "bold" }}>
                                    <i
                                      style={{ color: "#DC6B29" }}
                                      className="fas fa-pizza-slice"
                                    ></i>{" "}
                                    {p.title}
                                  </span>
                                  <br />
                                  <span
                                    style={{ color: "gray", width: "auto" }}
                                  >
                                    {trimmedString}...
                                  </span>
                                  <br />
                                  <br />
                                  <h6 style={{ fontWeight: "bold" }}>
                                    <i className="fas fa-tags"></i> tk {p.price}
                                  </h6>
                                </div>

                                <div
                                  style={{ overflow: "hidden", float: "right" }}
                                >
                                  {productImg}
                                </div>
                              </div>
                              <button className="card-b">
                                <i
                                  style={{ color: "#1c2e4a" }}
                                  onClick={() => fetureProduct(p._id)}
                                  className={featureLogo}
                                ></i>
                              </button>
                              <button
                                className="card-b"
                                style={{ marginLeft: "15px" }}
                              >
                                <i
                                  style={{ color: "red" }}
                                  onClick={() => delProduct(p._id)}
                                  className="far fa-trash-alt"
                                ></i>
                              </button>
                            </div>

                            {/* <!-- Modal --> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default AdminShowProduct;
