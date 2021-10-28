import React, { useState, useEffect } from "react";
import "./addproduct.css";
import axios from "axios";

const AddProduct = (props) => {
	const [product, setproduct] = useState({
		title: "",
		description: "",
		price: 0,
	});

	const [EditProduct, setEditProduct] = useState({
		title: "",
		description: "",
		price: 0,
	});

    const [getProduct, setgetProduct] = useState([]);


	const [avater, setavater] = useState(null);

	const [eid, seteid] = useState('');

    

    //store data
	const setval = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		//console.log(avater);
		//console.log(product);

		if (name === "avater") {
			setavater(e.target.files[0]);
		} else {
			setproduct((prev) => {
				if (name === "title") {
					return {
						title: value,
						description: prev.description,
						price: prev.price,
					};
				} else if (name === "description") {
					return {
						title: prev.title,
						description: value,
						price: prev.price,
					};
				} else if (name === "price") {
					return {
						title: prev.title,
						description: prev.description,
						price: value,
					};
				}
			});
		}
	};

	//store edit data
	const setvalEdit = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		//console.log(avater);
		console.log(EditProduct);

		if (name === "avater") {
			setavater(e.target.files[0]);
		} else {
			setEditProduct((prev) => {
				if (name === "title") {
					return {
						title: value,
						description: prev.description,
						price: prev.price,
					};
				} else if (name === "description") {
					return {
						title: prev.title,
						description: value,
						price: prev.price,
					};
				} else if (name === "price") {
					return {
						title: prev.title,
						description: prev.description,
						price: value,
					};
				}
			});
		}
	};


    //get data

	let unmount = true;
    useEffect(() => {
        axios.get('/product')
        .then(res => {
            if(unmount){
                setgetProduct(res.data.products)
                //console.log(getProduct)
            }
        })
        .catch(err => console.log(err));

		return(() => {
			unmount = false;
		})
    }, [])

	//post data

	const postData = (e) => {
		e.preventDefault();

		const inputError = document.querySelectorAll("input.i-error");
		for (let i = 0; i < inputError.length; i++) {
			inputError[i].classList.remove("ei-error");
		}

		//e-placeholder

		const errorPlaceHolderAll = document.querySelectorAll("p.e-placeholder");
		for (let j = 0; j < errorPlaceHolderAll.length; j++) {
			errorPlaceHolderAll[j].textContent = "";
		}

		const newUSer = JSON.stringify(product);
		console.log(newUSer);
		const data = new FormData();
		data.append("user", newUSer);
		data.append("avater", avater);

		axios
			.post("/product", data)
			.then((res) => {
				alert("Item Added Successfully");
				window.location.reload();
			})
			.catch((err) => {
				//console.log(err.response.data.errors)
				const ree = err.response.data.errors;

				if (ree) {
					Object.keys(ree).forEach((errorname) => {
						//error placeholders
						//console.log(errorname)
						document.getElementById(`error-${errorname}`).textContent =
							ree[errorname].msg;

						// //input error
						const inputError = document.getElementById(`${errorname}`);
						inputError.classList.add("ei-error");
					});
				} else {
					console.log(err);
				}
			});
	};


	//edit product

	const openEdit = (value) => {
		//console.log(value);
		setEditProduct(() => {
			return({
				title: value.title,
				description: value.description,
				price: value.price,
			})
		});

		seteid(value._id);

	}
	const editProduct = (id) => {

		const newUSer = JSON.stringify(EditProduct);
		//console.log(newUSer);
		const data = new FormData();
		data.append("user", newUSer);
		data.append("avater", avater);

		//console.log(eid);
		

		axios.put(`/product/${eid}`, data)
		.then(res => {
			window.location.reload();
		})
		.catch(err => {
			console.log(err.response)
		})
	}

	//delete product

	const delProduct = (id) => {
		axios.delete(`/product/${id}`)
		.then(res => window.location.reload())
		.catch(err => console.log(err))
	}

	//see more description

	const seeMore = (value, id) => {
		console.log(document.getElementById(`seeless0`))
		document.getElementById(id).textContent = value;
		//document.getElementById(`seeless${id}`).classList.remove = 'hide'
	}

	//see less description
	const showless = (value, id) => {
		document.getElementById(id).textContent = value;
	}
	return (
		<section id='shopC'>
			<div className='overly'>
			<div className="container">
				{/* <!-- Button trigger modal --> */}
				<div style={{ margin: "10px" }}>
					<h1 style={{ textAlign: "center" , color: 'white' }}>Welcome To Your Shop</h1>
					<button
						type="button"
						className="btn btn-primary"
						data-toggle="modal"
						data-target="#exampleModalLong"
						style={{marginBottom: '50px'}}
					>
						Add Meal
					</button>
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
								<h5 className="modal-title" id="exampleModalLongTitle">
									Add Product
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
								<form
									method="POST"
									onSubmit={postData}
									encType="multipart/form-data"
								>
									<div className="form-group">
										<label> Product Title</label>
										<input
											type="text"
											onChange={setval}
											name="title"
											className="form-control"
											id="title"
											placeholder="eg: Athena meal"
										/>
										<p
											className="e-placeholder"
											id="error-title"
											style={{ color: "red", marginLeft: "15px" }}
										></p>
									</div>
									<div className="form-group">
										<label>Example textarea</label>
										<textarea
											className="form-control"
											onChange={setval}
											name="description"
											id="description"
											placeholder="eg: Try our Beef Burger, a signature flame-grilled beef patty topped with a simple layer of crinkle cut pickles, yellow mustard, and ketchup on a toasted sesame seed bun"
											rows="3"
										></textarea>
										<p
											className="e-placeholder"
											id="error-description"
											style={{ color: "red", marginLeft: "15px" }}
										></p>
									</div>

									<div className="form-group">
										<label>Price</label>
										<input
											type="number"
											onChange={setval}
											name="price"
											className="form-control"
											id="price"
											placeholder="$ Price"
										/>
										<p
											className="e-placeholder"
											id="error-price"
											style={{ color: "red", marginLeft: "15px" }}
										></p>
									</div>
									<div className="form-group">
										<label>Product Image</label>
										<input
											type="file"
											onChange={setval}
											name="avater"
											className="form-control"
											id="productImage"
										/>
										<p className="form-text text-muted">
											Only jpg, jpeg & png allowed.
										</p>
									</div>

									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-secondary"
											data-dismiss="modal"
										>
											Close
										</button>
										<button type="submit" className="btn btn-primary">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

            <div className='container '>
                <div className="row g-4 cardWrapperX ">
                    {getProduct.map((value, index) => {
                        let productImg;
                        if(value.avater === null){
                            productImg = <img style={{ marginBottom: '20px' , borderRadius: '3px'}} src='https://media.istockphoto.com/vectors/male-hand-holding-megaphone-with-new-product-speech-bubble-banner-vector-id1154954910?k=20&m=1154954910&s=612x612&w=0&h=-UnuowcR6R6t7CDpl1516FAsSCZGBYKXK6Fg6CM2nTI=' height='200px' width='200px' />
                        } else{
                            productImg = <img style={{ marginBottom: '20px' , borderRadius: '3px'}} src={window.location.origin + `/productAvater/${value.avater}`} height='200px' width='200px' />
                        }

						let description = value.description.substring(0, 6);
                        return(
                            <div key={index} className="col-sm-4">
                                <div className='productCard' style={{width: '18rem'}}>
									<div style={{textAlign: 'center', paddingBottom: '10px'}}>
										<h5 className='text-muted'>Product {index < 10 ? '#0'+index : '#'+index}</h5>
									</div>
									<div style={{borderBottom: '1px dotted gray'}}>
										<div style={{textAlign: 'center'}}>
											{productImg}
										</div>
										<div style={{textAlign: 'center'}}>
											<h5><i style={{color: '#DC6B29'}} className="fas fa-pizza"></i> {value.title}</h5>
											<p id={index} className='text-muted m-0'>{description}...</p>
											<button id={'seeMore'+index} onClick={() => seeMore(value.description, index)} className='seeMore'>See more</button>
											<button id={'seeless'+{index}} onClick={() => showless(description, index)} className='seeMore hide'>See less</button>
											
											<p></p>
											<h6><i className="fas fa-tags"></i> tk {value.price}</h6><br/>
										
										</div>
									</div>
                                    {/* <div className="card-d">
										<div className="card-d-wi">
											<span style={{fontWeight: 'bold'}}>{value.title}</span><br/>
											<span style={{color: 'gray', width: 'auto'}}>{value.description}</span><br/>
											<span>tk {value.price}</span><br/>
										</div>
										<div style={{overflow: 'hidden', float: 'right'}}>
											{productImg}
										</div>
									</div> */}
								<div style={{textAlign: 'right', marginTop: '10px'}}>

									{/* <!-- Button trigger modal --> */}
									<button onClick={() => openEdit(value)} type="button" className='card-b' data-toggle="modal" data-target="#exampleModal">
										<i className="far fa-edit"></i>
									</button>

									{/* <!-- Modal --> */}
									<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div className="modal-dialog" role="document">
										<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div className="modal-body">
										<form
										method="POST"
										onSubmit={postData}
										encType="multipart/form-data"
									>
										<div className="form-group">
											<label> Product Title</label>
											<input
												type="text"
												onChange={setvalEdit}
												name="title"
												className="form-control"
												placeholder="eg: Athena meal"
												value={EditProduct.title}
												required
											/>
											<p
												className="e-placeholder"
												style={{ color: "red", marginLeft: "15px" }}
											></p>
										</div>
										<div className="form-group">
											<label>Example textarea</label>
											<textarea
												className="form-control"
												onChange={setvalEdit}
												name="description"
												placeholder="eg: Try our Beef Burger, a signature flame-grilled beef patty topped with a simple layer of crinkle cut pickles, yellow mustard, and ketchup on a toasted sesame seed bun"
												rows="3"
												value={EditProduct.description}
												required
											></textarea>
											<p
												className="e-placeholder"
												style={{ color: "red", marginLeft: "15px" }}
											></p>
										</div>

										<div className="form-group">
											<label>Price</label>
											<input
												type="number"
												onChange={setvalEdit}
												name="price"
												className="form-control"
												placeholder="$ Price"
												value={EditProduct.price}
												required
											/>
											<p
												className="e-placeholder"
												style={{ color: "red", marginLeft: "15px" }}
											></p>
										</div>
										<div className="form-group">
											<label>Product Image</label>
											<input
												type="file"
												onChange={setvalEdit}
												name="avater"
												className="form-control"
											/>
											<p className="form-text text-muted">
												Only jpg, jpeg & png allowed.
											</p>
										</div>

										<p
										className="e-placeholder"
										style={{ color: "red", marginLeft: "15px" }}
										></p>

										{/* <div className="modal-footer">
											<button
												type="button"
												className="btn btn-secondary"
												data-dismiss="modal"
											>
												Close
											</button>
											<button type="submit" className="btn btn-primary">
												Submit
											</button>
										</div> */}
									</form>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
											<button type="button" onClick={() => editProduct(value._id)} className="btn btn-primary">Save changes</button>
										</div>
										</div>
									</div>
									</div>

									<button className='card-b' onClick={() => delProduct(value._id)}><i class="fas fa-trash"></i></button>
								</div>
                                </div>
								
                            </div>
                        )
                    })}
                </div>

            </div>
			</div>
		</section>
	);
};

export default AddProduct;
