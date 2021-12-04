import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PopulorProducts.css";
import ShopCart from "../shopProducts/ShopCart";

const Groceryproduct = () => {
  const [product, setproduct] = useState([]);

  const [productDet, setproductDet] = useState({
    _id: "",
    title: "",
    description: "",
    price: "",
    avater: "",
    sellerA: {
      shopname: "",
      address: "",
    },
  });
  //avater source
  let source;
  let srcMI;

  //get products

  useEffect(() => {
    let unmout = true;
    axios
      .get("/product/all")
      .then((res) => {
        if (unmout) {
          setproduct(res.data.products);
          //console.log(product)
        }
      })
      .catch((err) => console.log(err));

    return () => {
      unmout = false;
    };
  }, []);

  //add cart

  const addcart = async (id, status, shop_id) => {
    //alert("Added");
    //alert(status);
    var up = true;
    let body = {
      status: status,
    };

    try {
      const res = await axios.put(`/cart/${id}/${shop_id}`, body);

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
    //console.log(value._id)
    axios
      .patch(`/product/0/${value._id}`)
      .then((res) => {})
      .catch((err) => console.log(err));
    setproductDet(value);
  };

  //search by location
  const [Searchlocation, setSearchlocation] = useState("All");

  const locationSearch = (e) => {
    setSearchlocation(e.target.value);
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="populorProductDetails">
        <h2 className="container m-3">
          <i style={{ color: "#82C91E" }} className="fas fa-seedling"></i>{" "}
          Grocery
        </h2>
        <div className="container psearch">
          <select
            onChange={locationSearch}
            className="form-select m-2"
            aria-label="Default select example"
          >
            <option defaultValue>All</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Faridpur">Faridpur</option>
            <option value="Sadarpur">Sadarpur</option>
          </select>
          <input
            onChange={locationSearch}
            className="form-control m-2"
            placeholder="Search Product/shop..."
          />
        </div>

        <div className="containe">
            <div className="row m-auto" style={{width: '95%'}}>
            {product.map((v, i) => {
              if (v.sellerA.catagory === "Grocery") {
                const x = v.sellerA.address;
                const p = v.title;
                const s = v.sellerA.shopname;
                // /console.log(x + Se)
                if (
                  Searchlocation === "All" ||
                  x === Searchlocation ||
                  p.includes(Searchlocation) ||
                  s.includes(Searchlocation)
                ) {
                  if (v.avater) {
                    source =
                      window.location.origin + `/productAvater/${v.avater}`;
                  } else {
                    source =
                      "https://www.wallpapertip.com/wmimgs/86-867734_object-splashing-in-water.jpg";
                  }

                  return (
                    <>
                      <div
                        key={i}
                        style={{ width: "20rem" }}
                        className="col-sm-12 col-md-6 col-lg-4 my-3"
                      >
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
                }
              }
            })}
          </div>
        </div>
      </div>

      <div>
        <ShopCart />
      </div>
    </div>
  );
};

export default Groceryproduct;
