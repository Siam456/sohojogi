import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./shopProduct.css";
import ShopCart from "./ShopCart";

const ShopProducts = () => {
	let source;
	let sourceProduct;
	let srcMI
	const { id } = useParams();

	const [shop, setshop] = useState([]);
	

	const [products, setproducts] = useState([]);
	const [productDet, setproductDet] = useState({
		_id: '',
		title: '',
		description: '',
		price: '',
		avater: ''
	});

	
	useEffect( () => {

		axios.get(`/user/shop/${id}`)
		.then(res => {
			
				setshop(res.data.users);
				setproducts(res.data.users.products);
				//console.log(products)
			
		})
		.catch(err => console.log(err));

		
		return(() => {
			console.log('ok close')
		})
		
	});

	//add cart

	const addcart = async (id, status) => {
		//alert(id);
		//alert(status);
		
		var up = true;
		let body = {
			status: status,
		};
		
		try{
			const res = await axios
			.put(`http://localhost:3000/cart/${id}/${shop._id}`, body);

			if(up){
				console.log(res)
			}
			
		} catch(err){
			console.log(err)
		}
		return(() => {
			up = false;
		})
	};

	

	//modal
	const openModal = (value) => {
		//console.log(value._id)
		axios.patch(`/product/0/${value._id}`)
		.then(res => {})
		.catch(err => console.log(err))


		var modal = document.getElementById("myModal");
		modal.style.display = "block";
		setproductDet(value);
		//console.log(productDet);
		
	} 

	const closeModal = () => {
		var modal = document.getElementById("myModal");
		modal.style.display = "none";
	}

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
						<p className='text-muted'><i style={{color: '#348bb3'}} className="fas fa-grip-horizontal"></i> {shop.catagory}</p>
						<h6><i style={{color: '#D04545'}} className="fas fa-map-marker-alt"></i> {shop.address}</h6>

						<div className="container my-5">
							<div className="row">
								{products.length !== 0 ? (
									products.map((v, i) => {
										var trimmedString = v.description.substring(0, 6);

										if(v.avater){
											sourceProduct =
														window.location.origin +
														`/productAvater/${v.avater}`
										} else{
											sourceProduct =
											"https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
							
										}
										return (
											<>

												<div key={i} className="col-sm-12 col-md-6 col-xl-6 col-lg-6 my-2">
													<div style={{ position: "relative" }}>
														<div
															style={{ textDecoration: "none", color: "black" }}
														>
															<div className="cardX" onClick={() => openModal(v)} style={{position: 'relative'}}>
															
																<div className="card-d">
																	<div className="card-d-wi">
                                                                            <span style={{ fontWeight: "bold" }}><i style={{color: '#DC6B29'}} className="fas fa-pizza-slice"></i> {v.title}</span>
                                                                            <br />
                                                                            <span style={{ color: "gray", width: "auto" }}>{trimmedString}...</span>
                                                                            <br />
                                                                            <br />
                                                                            <h6 style={{ fontWeight: "bold"}}><i className="fas fa-tags"></i> tk {v.price}</h6>
                                                                            
                                                                    </div>

																	<div
																		style={{
																			overflow: "hidden",
																			float: "right",
																			height: "80px",
																			width: "80px"
																		}}
																	>
																		<img
																			class="card-img-top"
																			src={sourceProduct}
																			alt="Card"
																			height="80px"
																			
																		/>
																	</div>
																</div>

																<div style={{margin: '20px'}}></div>
																
															</div>
															<div style={{position: 'absolute', top: '77%', left: '7%'}}>
																<i onClick={() => openModal(v)} className="fas fa-arrow-right btn-warning"></i> 
																	<span style={{width: '25px'}}></span>  <i id='plusbtn'
																	className="fas fa-plus"
																	onClick={() => addcart(v._id, "add")}
																></i>
															</div>
														</div>

														<div id="myModal" class="modalA">

															<div class="modal-contentA">
																<span class="close" onClick={closeModal}>&times;</span>
																<p>Product Details..</p>
																<div style={{display: 'none'}}>
																{productDet.avater ? srcMI = window.location.origin +`/productAvater/${productDet.avater}` 
																:srcMI = "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" }
																
																</div>
																
																<div style={{textAlign: 'center', marginTop: '90px'}}>
																	<img src={srcMI} alt='siam'/>
																</div>
																<div className='container'>
																	<h3 className='my-3'><i className="fas fa-pizza"></i> {productDet.title}</h3>
																	<p className='text-muted' style={{marginLeft: '10px'}}> {productDet.description}</p>
																	<p><i className="fab fa-bitcoin"></i> TK {productDet.price}</p>

																	<div className='btn btn-danger'>
																		<i
																			className="fas fa-plus" 
																			onClick={() => addcart(productDet._id, "add")}
																		>  Add to cart</i>
																	</div>
																</div>
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
