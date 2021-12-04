import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tracking.css";
import Swal from 'sweetalert2'

const Tracking = () => {
  const [cartx, setcartx] = useState([]);

  useEffect(() => {
    axios
      .get("/shoppingitem")
      .then((res) => {
        //if(unmount){
        setcartx(res.data.shoppingItem);
        console.log(res.data.shoppingItem);

        //}
      })
      .catch((err) => console.log(err));

    return () => {};
  }, []);

  const cacelOrder = (id) => {
    axios
      .delete(`/shoppingitem/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //order confirmatiton
  const confirmOrder = (id) => {
    //alert(id)
    let body = {
      status: "ok done",
    };

    axios
      .put(`/shoppingitem/${id}`, body)
      .then((res) => {
        if (res) {
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
              )
          window.location.reload();
        }
      })
      .catch((err) => {
        alert("Server site problem");
      });
  };

  return (
    <>
      <div className="container my-5">
        <center>
          <h1 className="my-5">
            <i className="fas fa-route"></i> Tracking Order
          </h1>
        </center>
      </div>

      {cartx.map((value, index) => {
        let confirmbtn;
        //console.log(value.status)
        if (value.status === "Deliverd") {
          confirmbtn = (
            <button
              className="btn btn-success"
              onClick={() => confirmOrder(value._id)}
            >
              <i style={{ color: "#2b2c2e" }} className="far fa-thumbs-up"></i>
              Confirm Delivey
            </button>
          );
        } else if (value.status === "ok done") {
          confirmbtn = (
            <button
              className="btn btn-danger"
              onClick={() => cacelOrder(value._id)}
            >
              <i
                style={{ color: "#2b2c2e" }}
                className="fas fa-minus-circle"
              ></i>{" "}
              Remove Order
            </button>
          );
        } else {
          confirmbtn = (
            <button
              className="btn btn-secondary"
              onClick={() => cacelOrder(value._id)}
            >
              <i
                style={{ color: "#2b2c2e" }}
                className="fas fa-minus-circle"
              ></i>{" "}
              Cancel Order
            </button>
          );
        }

        let trackingOrder;
        //console.log(value.products)
        if (value.products !== null) {
          trackingOrder = (
            <div className="container cart">
              <div className="row p-0 g-5">
                <div
                  className="col-sm-6"
                  style={{
                    textAlign: "center",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  {value.products.avater ? (
                    <img
                      style={{ marginBottom: "20px", borderRadius: "3px" }}
                      src={
                        window.location.origin +
                        `/productAvater/${value.products.avater}`
                      }
                      height="200px"
                      alt="siam"
                    />
                  ) : (
                    <img
                      style={{ marginBottom: "20px", borderRadius: "3px" }}
                      src='https://us.123rf.com/450wm/infadel/infadel1712/infadel171200119/91684826-a-black-linear-photo-camera-logo-like-no-image-available-.jpg?ver=6'
                      height="200px"
                      alt="siam"
                    />
                  )}
                </div>
                <div className="col-sm-6">
                  <h2 style={{ color: "gray" }}>
                    {" "}
                    <i className="fab fa-phoenix-framework"></i>{" "}
                    {value.products.sellerA.shopname}
                  </h2>
                  <h4 className="head">
                    {" "}
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    {value.products.sellerA.address}
                  </h4>
                  <h1>
                    {" "}
                    <i className="fas fa-pizza"></i> {value.products.title}
                  </h1>
                  <p className="text-muted" style={{ wordWrap: "break-word" }}>
                    {value.products.description}
                  </p>
                  <div style={{ marginBottom: "20px" }}>
                    <span
                      className="text-primary font-weight-bold"
                      style={{ marginRight: "20px" }}
                    >
                      <i className="fas fa-sort-amount-up"></i> Quantity:
                    </span>

                    <span className="text-primary p-2 font-weight-bold">
                      <b>{value.quantity}</b>
                    </span>
                  </div>

                  <div className="trackingId">
                    <i className="fas fa-truck-loading"></i>
                    <span> Tracking Id: </span>
                    {value._id} <br></br>
                  </div>

                  <div style={{ margin: "40px" }}>
                    <span> status: </span>
                    <i className="fas fa-people-carry"></i>
                    {value.status} <br></br>
                    {value.status === "Preparing" ? (
                      <div>
                        
                        
                      </div>
                    ) : (
                      "notsiam"
                    )}
                  </div>

                  <h4>
                    <i className="fab fa-bitcoin"></i> tk {value.totalPrice}
                  </h4>
                  <div style={{ display: "flex", marginTop: "20px" }}>
                    {confirmbtn}
                  </div>
                </div>
                ;
              </div>
            </div>
          );
        }
        return <>{trackingOrder}</>;
      })}
    </>
  );
};

export default Tracking;
