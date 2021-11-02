import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
} from "react-router-dom";
import Adminnav from "../admin/adminnav/Adminnav";
import Home from "../home/Home";
import Login from "../login/Login";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./nav.css";
import ShopRq from "../shop/shoprq/ShopRq";
import AdminShopRq from "../admin/shoprq/AdminShopRq";
import RiderRq from "../rider/riderrq/RiderRq";
import AdminRiderrq from "../admin/riderrq/AdminRiderrq";
import AddProduct from "../shop/addProduct/AddProduct";
import AllProduct from "../AllProduct/AllProduct";
import Product from "../product/Product";
import AdminShowProduct from "../admin/showProduct/AdminShowProduct";
import Cart from "../cart/Cart";
import Tracking from "../trackingItem/TrackingItem";
import OrderItem from "../shop/orderitem/OrderItem";
import Register from "../register/Register";
import DelivaryQueue from "../rider/delivary/DelivaryQueue";
import MyDelivary from "../rider/delivary/myDekivary/MyDelivary";
import NotFound from "../error/NotFound";
import Allshop from "../allshop/Allshop";
import ShopProducts from "../shopProducts/ShopProducts";
import PopulorProducts from "../populorProducts/PopulorProducts";
import FeatureProduct from "../populorProducts/FeatureProduct";
import NewsAll from "../news/NewsAll";
import NewsAdmin from "../news/NewsAdmin";
import News from "../news/News";
import Docdiray from "../docdiary/Docdiray";
import Foodproduct from "../populorProducts/Foodproduct";
import Groceryproduct from "../populorProducts/Groceryproduct";
import Pharmacyproduct from "../populorProducts/Pharmacyproduct";
import Profile from "../profile/Profile";
import Othersprofile from "../profile/Othersprofile";

const Nav = () => {
	const [user, setuser] = useState({
		_id: "",
		name: "",
		email: "",
		phone: "",
		role: "",
	});

	let unmount = false;
	useEffect(() => {
		axios
			.get("/userprofile")
			.then((res) => {
				if (!unmount) {
					setuser(res.data.profile);
					//console.log(user)
				}
			})
			.catch((err) => {
				console.log(err);
			});
		return () => {
			unmount = true;
		};
	}, ['/userprofile']);

	//logout

	//for logout

	const logOut = async () => {
		await fetch("/logout", {
			method: "GET",
		});
		window.location.replace("http://localhost:3000/login");
	};

	let links;
	let route;
	let login = (
		<div className="btn btn-primary my-2 my-sm-0">
			<NavLink style={{ color: "white" }} to="/login">
				<i className="fas fa-sign-in-alt"></i>
			</NavLink>
		</div>
	);

	if (user.role) {
		login = (
			<button
				type="button"
				onClick={logOut}
				className="btn btn-outline-success my-2 my-sm-0"
			>
				<i className="fas fa-power-off"></i>
			</button>
		);
	}

	if (user.role === "admin") {
		links = (
			<>
			
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				admin
				</a>
				<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
					
					
					<li>
						<NavLink activeClassName="active" className="dropdown-item" to="/admin">
							Admin
						</NavLink>
					</li>

					<li>
						<NavLink
							activeClassName="active"
							className="dropdown-item"
							to="/adminnews"
						>
							NewsPost
						</NavLink>
					</li>

					<li>
						<NavLink
							activeClassName="active"
							className="dropdown-item"
							to="/amdin/adminshoprq"
						>
							shop request
						</NavLink>
					</li>

					<li>
						<NavLink
							activeClassName="active"
							className="dropdown-item"
							to="/amdin/adminriderrq"
						>
							Rider request
						</NavLink>
					</li>

					<li>
					<NavLink
						activeClassName="active"
						className="dropdown-item"
						to="/amdin/adminproducts"
					>
						Product Controller
					</NavLink>
				</li>
				</div>
			</li>


			

				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/amdin/addproduct"
					>
						My Shop
					</NavLink>
				</li>

				

				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/shoppingitem"
					>
						Tracking Order
					</NavLink>
				</li>

				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/docdiary"
					>
						Doc Diary
					</NavLink>
				</li>

				
				

				{/* <li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/orderitem"
					>
						Order Items
					</NavLink>
				</li>

				<li>
					<NavLink activeClassName="active" className="nav-link" to="/delivery">
						Delivery Queue
					</NavLink>
				</li>
				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/mydelivery"
					>
						My Deliveries
					</NavLink>
				</li> */}

				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/profile"
					>
						profile
					</NavLink>
				</li>

				<li>
					<NavLink activeClassName="active" className="nav-link" to="/cart">
						<i
							className="fas fa-shopping-cart"
							style={{ fontSize: "20px", marginInlineStart: "20px" }}
						></i>
					</NavLink>
				</li>
			</>
		);

		route = (
			<>
			
				<Route path="/adminnews">
					{" "}
					<NewsAdmin />{" "}
				</Route>
				<Route path="/admin">
					{" "}
					<Adminnav />{" "}
				</Route>

				<Route path="/register">
					{" "}
					<Register />{" "}
				</Route>

				<Route path="/amdin/adminproducts">
					{" "}
					<AdminShowProduct />{" "}
				</Route>

				<Route path="/product/:indexParams/:id">
					{" "}
					<Product />{" "}
				</Route>
				<Route path="/cart">
					{" "}
					<Cart />{" "}
				</Route>
				<Route path="/shoppingitem">
					{" "}
					<Tracking />{" "}
				</Route>
				<Route path="/orderitem">
					{" "}
					<OrderItem />{" "}
				</Route>
				<Route path="/delivery">
					{" "}
					<DelivaryQueue />{" "}
				</Route>
				<Route path="/mydelivery">
					{" "}
					<MyDelivary />{" "}
				</Route>

				<Route path="/shoprq">
					{" "}
					<ShopRq />{" "}
				</Route>
				<Route path="/riderrq">
					{" "}
					<RiderRq />{" "}
				</Route>

				<Route path="/amdin/adminshoprq">
					{" "}
					<AdminShopRq />{" "}
				</Route>
				<Route path="/amdin/adminriderrq">
					{" "}
					<AdminRiderrq />{" "}
				</Route>
				<Route path="/amdin/addproduct">
					{" "}
					<AddProduct userInfo={user} />{" "}
				</Route>
				<Route path="/docdiary">
					{" "}
					<Docdiray user={user} />{" "}
				</Route>
				<Route path="/profile">
					{" "}
					<Profile user={user} />{" "}
				</Route>

				<Route path="/profileOther/:id">
					{" "}
					<Othersprofile />{" "}
				</Route>
			</>
		);
	}

    else if (user.role === "user") {
		links = (
			<>
				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/shoppingitem"
					>
						Tracking Order
					</NavLink>
				</li>

				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/docdiary"
					>
						Doc Diary
					</NavLink>
				</li>

				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/profile"
					>
						profile
					</NavLink>
				</li>

				<li>
					<NavLink activeClassName="active" className="nav-link" to="/cart">
						<i
							className="fas fa-shopping-cart"
							style={{ fontSize: "20px", marginInlineStart: "20px" }}
						></i>
					</NavLink>
				</li>
				
			</>
		);

		route = (
			<>
				<Route path="/cart">
					{" "}
					<Cart />{" "}
				</Route>
				<Route path="/shoppingitem">
					{" "}
					<Tracking />{" "}
				</Route>
				
				<Route path="/shoprq">
					{" "}
					<ShopRq />{" "}
				</Route>
				<Route path="/riderrq">
					{" "}
					<RiderRq />{" "}
				</Route>
				<Route path="/docdiary">
					{" "}
					<Docdiray user={user} />{" "}
				</Route>
				<Route path="/profile">
					{" "}
					<Profile user={user} />{" "}
				</Route>
				<Route path="/profileOther/:id">
					{" "}
					<Othersprofile />{" "}
				</Route>
				
			</>
		);
	} 

    else if (user.role === "seller") {
		links = (
			<>

				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/amdin/addproduct"
					>
						My Shop
					</NavLink>
				</li>

				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/orderitem"
					>
						Order Items
					</NavLink>
				</li>
				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/docdiary"
					>
						Doc Diary
					</NavLink>
				</li>

				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/profile"
					>
						profile
					</NavLink>
				</li>
			</>
		);

		route = (
			<>

				<Route path="/shoppingitem">
					{" "}
					<Tracking />{" "}
				</Route>
				<Route path="/orderitem">
					{" "}
					<OrderItem />{" "}
				</Route>

				<Route path="/shoprq">
					{" "}
					<ShopRq />{" "}
				</Route>
				<Route path="/riderrq">
					{" "}
					<RiderRq />{" "}
				</Route>

				<Route path="/amdin/addproduct">
					{" "}
					<AddProduct userInfo={user} />{" "}
				</Route>
				<Route path="/docdiary">
					{" "}
					<Docdiray user={user} />{" "}
				</Route>
				<Route path="/profile">
					{" "}
					<Profile user={user} />{" "}
				</Route>
				<Route path="/profileOther/:id">
					{" "}
					<Othersprofile />{" "}
				</Route>
			</>
		);
	}

    if (user.role === "rider") {
		links = (
			<>

				<li>
					<NavLink activeClassName="active" className="nav-link" to="/delivery">
						Delivery Queue
					</NavLink>
				</li>
				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/mydelivery"
					>
						My Deliveries
					</NavLink>
				</li>
				<li>
					<NavLink
						activeClassName="active"
						className="nav-link"
						to="/docdiary"
					>
						Doc Diary
					</NavLink>
				</li>

			</>
		);

		route = (
			<>

				<Route path="/delivery">
					{" "}
					<DelivaryQueue />{" "}
				</Route>
				<Route path="/mydelivery">
					{" "}
					<MyDelivary />{" "}
				</Route>

				<Route path="/shoprq">
					{" "}
					<ShopRq />{" "}
				</Route>
				<Route path="/riderrq">
					{" "}
					<RiderRq />{" "}
				</Route>
				
				<Route path="/docdiary">
					{" "}
					<Docdiray user={user} />{" "}
				</Route>
			</>
		);
	}

	return (
		<div>
			<Router>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a style={{ marginLeft: "20px" }} className="navbar-brand" href="/">
						eFo<span style={{color: 'green'}}>od.</span>
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<NavLink activeClassName="active" className="nav-link" to="/">
									Home <span className="sr-only">(current)</span>
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink activeClassName="active" className="nav-link" to="/newslist">
									News <span className="sr-only">(current)</span>
								</NavLink>
							</li>

							<li>
								<NavLink
									activeClassName="active"
									className="nav-link"
									to="/allshop"
								>
									shop
								</NavLink>
							</li>
							

							<li class="nav-item dropdown">
								<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Product
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
								
									<a
										activeClassName="active"
										className="dropdown-item"
										href="/populorProduct"
									>
										Products <span className="sr-only">(current)</span>
									</a>

									<a
										activeClassName="active"
										className="dropdown-item"
										href="/food"
									>
										Food
									</a>

									<a
										activeClassName="active"
										className="dropdown-item"
										href="/pharmacy"
									>
										Pharmacy
									</a>

									<a
										activeClassName="active"
										className="dropdown-item"
										href="/grocery"
									>
										Grocery
									</a>
								</div>
							</li>

							

							{links}
						</ul>
						<div className="form-inline my-2 my-lg-0">{login}</div>
					</div>
				</nav>

				<Switch>
					<Route exact path="/">
						{" "}
						<Home />{" "}
					</Route>
					<Route path="/products">
						{" "}
						<AllProduct />{" "}
					</Route>
					<Route path="/login">
						{" "}
						<Login />{" "}
					</Route>

                    <Route path="/register">
                        {" "}
                        <Register />{" "}
                    </Route>

					<Route path="/product/:indexParams/:id">
						{" "}
						<Product user= {user} />{" "}
					</Route>

					<Route path='/allshop'> <Allshop/></Route>
					<Route path='/shop/:id'> <ShopProducts/></Route>
					<Route path='/populorProduct'> <PopulorProducts /> </Route>

					<Route path='/food'> <Foodproduct /> </Route>
					<Route path='/grocery'> <Groceryproduct /> </Route>
					<Route path='/pharmacy'> <Pharmacyproduct /> </Route>

					<Route path='/featureProduct'> <FeatureProduct /> </Route>

					<Route path="/newslist">
                        {" "}
                        <NewsAll />{" "}
                    </Route>
					<Route path="/news/:id">
                        {" "}
                        <News />{" "}
                    </Route>

					{route}
				</Switch>
			</Router>
		</div>
	);
};

export default Nav;
