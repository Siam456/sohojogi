import React, { useEffect, useState } from "react";
import axios from "axios";
import "../DelivaryQueue.css";
import Swal from 'sweetalert2'

const MyDelivary = () => {
  const [cartx, setcartx] = useState([]);

  useEffect(() => {
    axios
      .get("/deliveryitem/mydelivery")
      .then((res) => {
        //if(unmount){s
        setcartx(res.data.shoppingItem);
        //sconsole.log(res.data.shoppingItem)

        //}
      })
      .catch((err) => console.log(err));

    return () => {};
  }, []);

  //////////// delivered
  const changeStatusDeliverd = (id) => {
    // alert(id)
    let body = {
      status: "Deliverd",
    };

    axios
      .put(`/deliveryitem/${id}`, body)
      .then((res) => {
        if (res) {
          console.log(res);
          
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'successfully Delivered'
            )
            setInterval(function(){ window.location.reload(); }, 3000);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return (
    <>
      <div className="container my-5">
        <center>
          <h1 className="my-5">
            <i className="fas fa-shipping-fast"></i>
            My Delivery
          </h1>
        </center>
      </div>

      {cartx.map((value, index) => {
        let trackingOrder;
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

                  <div className="deliveryInfo">
                    <h4>Shop Info</h4>
                    <i className="fab fa-phoenix-framework"></i>
                    <span> Shop Name: </span>
                    {value.products.sellerA.shopname} <br></br>
                    <i className="fas fa-location"></i>
                    <span> Location: </span>
                    {value.products.sellerA.address} <br></br>
                    <i className="fas fa-phone-alt"></i>
                    <span> Phone: </span>
                    {value.products.sellerA.phone} <br></br>
                  </div>

                  <div className="deliveryInfo">
                    <h4>Order Location Info</h4>
                    <i className="fas fa-user-alt"></i>
                    <span> User Name: </span>
                    {value.user.name} <br></br>
                    <i className="fas fa-location"></i>
                    <span> Location: </span>
                    {value.user.address} <br></br>
                    <i className="fas fa-phone-alt"></i>
                    <span> Phone: </span>
                    {value.user.phone} <br></br>
                  </div>

                  <div style={{ margin: "40px" }}>
                    <span> status: </span>
                    <i className="fas fa-people-carry"></i>
                    {value.status} <br></br>
                    
                  </div>

                  <h4>
                    <i className="fab fa-bitcoin"></i> tk {value.totalPrice}
                  </h4>
                  <div style={{ display: "flex" }}>
                    <button
                      className="btn btn-success"
                      onClick={() => changeStatusDeliverd(value._id)}
                    >
                      <i
                        style={{ color: "#2b2c2e" }}
                        className="far fa-check-circle"
                      ></i>{" "}
                      Delivered
                    </button>
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

export default MyDelivary;
