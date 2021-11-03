import React, { useState, useEffect } from "react";
import axios from "axios";
import '../populorProducts/PopulorProducts.css'
import ShopCart from "../shopProducts/ShopCart";

const AllProduct = (props) => {
    const { serachstr } = props;
	const [product, setproduct] = useState([]);
    
    let notFfound = '';

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
	let unmout = true;
	useEffect(() => {
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
	}, ["/product/all"]);

	//add cart

	const addcart = async (id, status, shop_id) => {
		//alert("Added");
		//alert(status);
		var up = true;
		let body = {
			status: status,
		};

		try {
			const res = await axios.put(
				`http://localhost:3000/cart/${id}/${shop_id}`,
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
		//console.log(value._id)
		axios
			.patch(`/product/0/${value._id}`)
			.then((res) => {})
			.catch((err) => console.log(err));
		setproductDet(value);
	};


	return (
		<div style={{ display: "flex" }}>
			<div className="populorProductDetails">
				<h2 className="container m-3 text-success">
					<i className="fas fa-fire-alt"></i> Populor Products
				</h2>
				
                

				<div className="containe">
					<div
						className="row"
						
					>
						{product.length !== 0 ? 
                            product.map((v, i) => {
                                const x = v.sellerA.address.toLowerCase();
                                const p = v.title.toLowerCase();
                                const s = v.sellerA.shopname.toLowerCase();
                                const c = v.sellerA.catagory.toLowerCase();
                                // /console.log(x + Se)
                                if (
                                    x.includes(serachstr.toLowerCase())
                                    || p.includes(serachstr.toLowerCase())
                                    || s.includes(serachstr.toLowerCase()) 
                                    || c.includes(serachstr.toLowerCase()) 
                                ) {
                                    notFfound = v._id;
                                    if (v.avater) {
                                        source =
                                            window.location.origin + `/productAvater/${v.avater}`;
                                    } else {
                                        source =
                                            "https://www.wallpapertip.com/wmimgs/86-867734_object-splashing-in-water.jpg";
                                    }
    
                                    let description = v.description.length >6 ? v.description.substring(0, 6) + '...' : v.description;

                                    let titleIcon;
                                    if(v.sellerA.catagory === 'Food'){
                                        titleIcon = <i style={{color: '#DC6B29'}} className="fas fa-pizza-slice"></i>
                                    } else if(v.sellerA.catagory === 'Grocery'){
                                        titleIcon = <i style={{color: '#82C91E'}} className="fas fa-leaf"></i>
                                    } else if(v.sellerA.catagory === 'Pharmacy'){
                                        titleIcon = <i style={{color: '#348bb3'}} className="fas fa-capsules"></i>
                                    }
                                    return (
                                        <div key={i} className="col-sm-12  col-lg-4 col-md-6 my-3" >
                                            <div
                                                className="productCard m-auto"
                                                style={{
                                                    width: '18rem',
                                                    cursor: 'default',
                                                    
                                                }}
                                                
                                            >
                                                
                                                <span style={{display: 'flex'}}>
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                    <span style={{ fontWeight: "bold" }}>{titleIcon} {v.title}</span>
                                                    </h5>
                                                    <h6 className='text-muted'><i style={{color: '#D04545'}} className="fas fa-map-marker-alt"></i> {v.sellerA.address}</h6>
                                                    <span >
                                                        <p className='text-muted'>{description}</p>
                                                        <p className='text-muted'><i style={{color: '#348bb3'}} className="fas fa-grip-horizontal"></i> {v.sellerA.catagory}</p>
                                                        <p className='text-muted'><i style={{color: '#BF1B28'}} className="fas fa-store-alt"></i> {v.sellerA.shopname}</p>
                                                        <h6 style={{ fontWeight: "bold"}}><i className="fas fa-tags"></i> tk {v.price}</h6>
                                                    
                                                    </span>
                                                </div>

                                                <div
                                                    style={{
                                                        height: "200px",
                                                        paddingTop: '27px',
                                                        
                                                    }}
                                                >
                                                    <img style={{borderRadius: '5px'}} src={source} alt="ss" height='auto' width='80px' />
                                                </div>
                                                </span>
                                                
                                                <div
                                                    className="card-body"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <span
                                                        onClick={() => openModal(v)}
                                                        data-toggle="modal"
                                                        data-target="#exampleModalLong"
                                                        style={{cursor: 'pointer'}}
                                                        
                                                    >
                                                        <ion-icon
                                                            name="caret-forward-outline"
                                                            style={{ marginTop: "6px" }}
                                                        ></ion-icon>{" "}
                                                        View Details{" "}
                                                    </span>
                                                    <span
                                                        onClick={() => addcart(v._id, "add", v.sellerA.id)}
                                                        style={{cursor: 'pointer'}}
                                                    >
                                                        <i className="fas fa-cart-plus"></i>
                                                    </span>
                                                </div>
                                            </div>
    
                                            {/* <!-- Modal --> */}
                                            <div
                                                className="modal fade"
                                                id="exampleModalLong"
                                                tabIndex="-1"
                                                role="dialog"
                                                aria-labelledby="exampleModalLongTitle"
                                                aria-hidden="true"
                                            >
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5
                                                                className="modal-title"
                                                                id="exampleModalLongTitle"
                                                            >
                                                                Product Details
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
                                                            <div style={{ display: "none" }}>
                                                                {productDet.avater
                                                                    ? (srcMI =
                                                                            window.location.origin +
                                                                            `/productAvater/${productDet.avater}`)
                                                                    : (srcMI =
                                                                            "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80")}
                                                            </div>
    
                                                            <div style={{ textAlign: "center" }}>
                                                                <img src={srcMI} alt="siam" width="50%" />
                                                            </div>
                                                            <div
                                                                style={{
                                                                    marginTop: "10px",
                                                                    borderBottom: "1px gray dotted",
                                                                }}
                                                            >
                                                                <h5>
                                                                    <i className="fas fa-biohazard"></i>{" "}
                                                                    {productDet.sellerA.shopname}
                                                                </h5>
                                                                <span>
                                                                    <ion-icon
                                                                        name="locate-outline"
                                                                        style={{ marginTop: "6px" }}
                                                                    ></ion-icon>{" "}
                                                                    {productDet.sellerA.address}
                                                                </span>{" "}
                                                                <div style={{ height: "15px" }}></div>
                                                            </div>
                                                            <div className="container">
                                                                <h3 className="my-3">
                                                                    <i className="fas fa-pizza"></i>{" "}
                                                                    {productDet.title}
                                                                </h3>
                                                                <p
                                                                    className="text-muted"
                                                                    style={{ marginLeft: "10px" }}
                                                                >
                                                                    {" "}
                                                                    {productDet.description}
                                                                </p>
                                                                <p>
                                                                    <ion-icon name="pricetags-outline"></ion-icon>{" "}
                                                                    <b>
                                                                        {" "}
                                                                        <span> TK </span> {productDet.price}{" "}
                                                                    </b>
                                                                </p>
    
                                                                <div
                                                                    className="btn btn-danger"
                                                                    style={{ float: "right" }}
                                                                    data-dismiss="modal"
                                                                >
                                                                    <i
                                                                        className="fas fa-plus"
                                                                        onClick={() => addcart(productDet._id, "add")}
                                                                    >
                                                                        {" "}
                                                                        Add to cart
                                                                    </i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } 
                            })
                            : <span></span>
                        }
					</div>
				</div>
                {notFfound === '' ? <div class="noProduct">No Products available</div> : <span></span>}
                
			</div>

			<div>
				<ShopCart />
			</div>
		</div>
	);
};

export default AllProduct;
