import React , { useEffect, useState} from 'react';
import axios from 'axios';
import './cart.css'

const Cart = () => {
    const [cartx, setcartx] = useState([]);

    const [ paymentMethod, setpaymentMethod ] = useState('cashOnDelivary')


    useEffect(() => {
        var unmount = true;
        axios.get('/cart')
            .then(res => {
                if(unmount){
                    setcartx(res.data.cart);
                    //console.log(res.data.cart)

                    
                }
            })
            .catch(err => console.log(err))
        
        return () => {
            unmount = false;
        }
    })



    //remove from cart
    const removeCart = (id) => {
        ///alert(id)

        axios.delete(`/cart/${id}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err))
    }

    //add shopping item list

    const addShopping = (id) => {
        //alert(id)
        const body = {
            status: paymentMethod,
        }
        axios.post(`/shoppingitem/${id}`, body)
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err))
    }
    
    return (
        <>
            <div className='container my-5'>
                <center>
                    <h1 className='my-5'>
                        <i className="fas fa-shopping-cart"></i> My Cart 
                    </h1>
                </center>
            </div>
            
            {cartx.map((value, index) => {

                let trackingOrder = <div>no products</div>;
                if(value.products !== null){
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
                            <img
                              style={{
                                marginBottom: "20px",
                                borderRadius: "3px",
                              }}
                              src={
                                window.location.origin +
                                `/productAvater/${value.products.avater}`
                              }
                              height="200px"
                              alt="siam"
                            />
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
                              <i className="fas fa-pizza"></i>{" "}
                              {value.products.title}
                            </h1>
                            <p
                              className="text-muted"
                              style={{ wordWrap: "break-word" }}
                            >
                              {value.products.description}
                            </p>
                            <div style={{ marginBottom: "20px" }}>
                              <span
                                className="text-primary font-weight-bold"
                                style={{ marginRight: "20px" }}
                              >
                                <i className="fas fa-sort-amount-up"></i>{" "}
                                Quantity:
                              </span>

                              <span className="text-primary p-2 font-weight-bold">
                                <b>{value.quantity}</b>
                              </span>
                            </div>
                            <h6>You Have {value.user.point} point</h6>
                            <div>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => {
                                    setpaymentMethod(e.target.value);
                                    console.log(paymentMethod);
                                }}
                              >
                                <option value="cashOnDelivary">Cash on delivery</option>
                                
                                {value.user.point>value.totalPrice ? 
                                <option value="UsePoint">Use point</option>: 
                                <option disabled value="1">Use point</option>}
                                
                              </select>
                            </div>
                            <h4>
                              <i className="fab fa-bitcoin"></i> tk{" "}
                              {value.totalPrice}
                            </h4>
                            <div style={{ display: "flex" }}>
                              <button
                                className="btn btn-danger"
                                onClick={() => removeCart(value._id)}
                              >
                                <i
                                  style={{ color: "#2b2c2e" }}
                                  className="fas fa-minus-circle"
                                ></i>{" "}
                                remove from Cart
                              </button>
                              <button
                                className="btn btn-success"
                                onClick={() => addShopping(value._id)}
                                style={{ marginLeft: "10px" }}
                              >
                                <i
                                  style={{ color: "#2b2c2e" }}
                                  className="fas fa-tags"
                                ></i>{" "}
                                Check Out
                              </button>
                            </div>
                          </div>
                          ;
                        </div>
                      </div>
                    ); 
                 
                } 
                return(
                    <div key={index}>
                        {trackingOrder}
                    </div>)
                
            })}
            
        </>
    );
};

export default Cart;