import React , { useEffect, useState} from 'react';
import axios from 'axios';
import './cart.css'
import Swal from 'sweetalert2'

const Cart = () => {
    const [cartx, setcartx] = useState([]);
    const [active, setActive] = useState(false)
    const [ paymentMethod, setpaymentMethod ] = useState('cashOnDelivary');

    const [ balcity, setbalcity ] = useState('');


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
          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          );

          window.location.replace(`{window.location.origin}/`);
        })
        .catch(err => console.log(err))
    }

    //add shopping item list

    const addShopping = (id) => {
        //alert(id)
        const body = {
            status: paymentMethod,
            city: balcity
        }
        axios.post(`/shoppingitem/${id}`, body)
        .then(res => {
          //alert('Added successfully')
          Swal.fire(
            'Good job!',
            'Your order has been placed. Track your order from track order page!',
            'success'
          )
          setInterval(function(){ window.location.replace("http://localhost:3000/") }, 3000);
          //window.location.replace('/shoppingitem')
            
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
                          {/* <div
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
                          </div> */}
                         <div className='col-sm-6'>
                         <form class="row g-3">
                            <div class="col-md-6">
                              <label for="inputEmail4" class="form-label">Name</label>
                              <input type="text" defaultValue={value.user.name} disabled class="form-control" id="name"/>
                            </div>
                            <div class="col-md-6">
                              <label for="inputPassword4" class="form-label">Phone</label>
                              <input type="tel" class="form-control" id="Phone" defaultValue={value.user.phone} disabled/>
                            </div>
                            <div class="col-12">
                              <label for="inputAddress" class="form-label">Address</label>
                              <input onChange={(e) => {
                                setbalcity(e.target.value);
                              }} type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" required/>
                            </div>
                            
                            <div class="col-md-6">
                              <label for="inputCity" class="form-label">City</label>
                              <input defaultValue={value.user.address} type="text" class="form-control" id="inputCity" disabled/>
                            </div>
                            <div class="col-md-6">
                              <label for="inputState" class="form-label">State</label>
                              <select id="inputState" class="form-select">
                                <option selected>Choose...</option>
                                <option>Bangladesh</option>
                              </select>
                            </div>
                            
                            
                            <div class="col-12 text-center">
                              <button onClick={(e)=>{e.preventDefault(); setActive(!active)}} type="submit" class="btn btn-primary">Proceed payment</button>
                            </div>
                          </form>
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
                                disabled = {!active}
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