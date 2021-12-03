import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./shopProduct.css";
import ShopCart from "./ShopCart";

const ShopProducts = () => {
  let source;
  let sourceProduct;
  let srcMI;
  const { id } = useParams();

  const [shop, setshop] = useState([]);

  const [products, setproducts] = useState([]);
  const [productDet, setproductDet] = useState({
    _id: "",
    title: "",
    description: "",
    price: "",
    avater: "",
  });

  useEffect(() => {
    axios
      .get(`/user/shop/${id}`)
      .then((res) => {
        setshop(res.data.users);
        setproducts(res.data.users.products);
        //console.log(products)
      })
      .catch((err) => console.log(err));

    return () => {
      console.log("ok close");
    };
  });

  //add cart

  const addcart = async (id, status) => {
    //alert(id);
    //alert(status);

    var up = true;
    let body = {
      status: status,
    };

    try {
      const res = await axios.put(
        `http://localhost:3000/cart/${id}/${shop._id}`,
        body
      );

      if (up) {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
    return () => {
      up = false;
    };
  };

  //modal
  const openModal = (value) => {
    //alert(value._id)
    axios.patch(`/product/0/${value._id}`)
    .then(res => {})
    .catch(err => console.log(err))

    // var modal = document.getElementById("myModal");
    // modal.style.display = "block";
    setproductDet(value);
    //console.log(productDet);
  };



  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="cartbody">
          <span style={{ display: "none" }}>
            {shop.avater
              ? (source = window.location.origin + `/userUpload/${shop.avater}`)
              : (source =
                  "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80")}
          </span>
          <div className="parentImg">
            <img className="childImg" src={source} alt="banner" width="100%" />
          </div>
          <div
            style={{
              width: "90%",
              margin: "auto",
              marginTop: "20px",
              marginBottom: "100px",
            }}
          >
            <h2>{shop.shopname}</h2>
            <p className="text-muted">
              <i
                style={{ color: "#348bb3" }}
                className="fas fa-grip-horizontal"
              ></i>{" "}
              {shop.catagory}
            </p>
            <h6>
              <i
                style={{ color: "#D04545" }}
                className="fas fa-map-marker-alt"
              ></i>{" "}
              {shop.address}
            </h6>

            <div className="container my-5">
              <div className="row">
                {products.length !== 0 ? (
                  products.map((v, i) => {
                    if (v.avater) {
                      sourceProduct =
                        window.location.origin + `/productAvater/${v.avater}`;
                    } else {
                      sourceProduct =
                        "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
                    }
                    return (
                      <>
                        <div className="col-sm-12 col-md-6 col-lg-4">
                          <div class="card">
                            <div class="imgBx">
                              {v.avater !== null ? (
                                <img
                                  src={
                                    window.location.origin +
                                    `/productAvater/${v.avater}`
                                  }
                                  alt="prd"
                                />
                              ) : (
                                <img
                                  src="https://us.123rf.com/450wm/infadel/infadel1712/infadel171200119/91684826-a-black-linear-photo-camera-logo-like-no-image-available-.jpg?ver=6"
                                  alt="prd"
                                />
                              )}
                              <ul class="action">
                                <li>
                                  <i class="fas fa-heart"></i>
                                  <span>Add to wishlist</span>
                                </li>
                                <li
                                  onClick={() => openModal(v)}
                                  data-toggle="modal"
                                  data-target={"#product" + v._id}
                                >
                                  <i class="fas fa-eye"></i>
                                  <span>View Details</span>
                                </li>

                                <li
                                  onClick={() =>
                                    addcart(v._id, "add", v.sellerA.id)
                                  }
                                >
                                  <i class="fas fa-shopping-cart"></i>
                                  <span>Add to cart</span>
                                </li>
                              </ul>
                              {v.discount > 0 && (
                                <div className="discount_view">
                                  <span>- {v.discount}%</span>
                                </div>
                              )}
                            </div>
                            <div class="content">
                              <div class="productName">
                                <h3>{v.title}</h3>
                                <small>Shop: {v.sellerA.shopname}</small>
                              </div>
                              <div class="price_rating">
                                <h2>${v.price}</h2>
                                <div class="rating">
                                  <i class="fa fa-star" aria-hidden="true"></i>
                                  <i class="fa fa-star" aria-hidden="true"></i>
                                  <i class="fa fa-star" aria-hidden="true"></i>
                                  <i
                                    class="fa fa-star grey"
                                    aria-hidden="true"
                                  ></i>
                                  <i
                                    class="fa fa-star grey"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <!-- Modal --> */}
                        <div
                          className="modal fade"
                          id={"product" + v._id}
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalCenterTitle"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLongTitle"
                                >
                                  Details of {v.title}
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="d-block">
                                  {v.avater !== null ? (
                                    <img
                                      class="d-block mx-auto"
                                      src={
                                        window.location.origin +
                                        `/productAvater/${v.avater}`
                                      }
                                      alt="prd"
                                      width="80%"
                                    />
                                  ) : (
                                    <img
                                      width="100%"
                                      src="https://us.123rf.com/450wm/infadel/infadel1712/infadel171200119/91684826-a-black-linear-photo-camera-logo-like-no-image-available-.jpg?ver=6"
                                      alt="prd"
                                    />
                                  )}
                                </div>

                                <div>
                                  <h1>{v.title}</h1>
                                  <p>{v.description}</p>
                                  <small>
                                    <span>
                                      <i
                                        style={{ color: "#BF1B28" }}
                                        className="fas fa-store-alt"
                                      ></i>{" "}
                                      {v.sellerA.shopname}
                                    </span>{" "}
                                    &nbsp; <br />
                                    <span>
                                      <i
                                        style={{ color: "#D04545" }}
                                        className="fas fa-map-marker-alt"
                                      ></i>{" "}
                                      {v.sellerA.address}
                                    </span>{" "}
                                    &nbsp; <br />
                                    <span>
                                      <span style={{ color: "#BF1B28" }}>
                                        Total views:
                                      </span>{" "}
                                      {v.views}
                                    </span>{" "}
                                    &nbsp; <br />
                                    <span>
                                      <span style={{ color: "#BF1B28" }}>
                                        Last updated on:
                                      </span>{" "}
                                      {new Date(v.updatedAt).getDay()}-
                                      {new Date(v.updatedAt).getMonth()}-
                                      {new Date(v.updatedAt).getFullYear()}
                                    </span>
                                  </small>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() =>
                                    addcart(v._id, "add", v.sellerA.id)
                                  }
                                >
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div class="noProduct">No Products available</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <ShopCart />
      </div>
    </>
  );
};

export default ShopProducts;
