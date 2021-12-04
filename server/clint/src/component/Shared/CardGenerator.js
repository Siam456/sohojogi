import axios from 'axios';
import React from 'react';
import { Col } from 'react-bootstrap';
import './CardGenerator.css';
import Swal from 'sweetalert2'

const CardGenerator = ({ item, setModalId }) => {
    const { _id , title, price, discount, avater, sellerA } = item;

    //add cart

	const addcart = async (id, status, shop_id) => {
		//alert("Added");
		//alert(status);
		
		let body = {
			status: status,
		};

		try {
			const res = await axios.put(
				`/cart/${id}/${shop_id}`,
				body
			);

			if (res) {
				Swal.fire(
                    'Good job!',
                    'Item added to cart!',
                    'success'
                  )
			}
		} catch (err) {
			console.log(err);
		}
		
	};

    //modal
	const openModal = (id) => {
		//console.log(value._id)
		axios
			.patch(`/product/0/${id}`)
			.then((res) => {})
			.catch((err) => console.log(err));
	};

    return (
        <Col>
            <div class="card">
                <div class="imgBx">
                    {avater !== null ?
                    <img src={window.location.origin + `/productAvater/${avater}`} alt="prd" />: 
                    <img src='https://us.123rf.com/450wm/infadel/infadel1712/infadel171200119/91684826-a-black-linear-photo-camera-logo-like-no-image-available-.jpg?ver=6' alt="prd" />}
                    <ul class="action">
                        <li>
                            <i class="fas fa-heart"></i>
                            <span>Add to wishlist</span>
                        </li>
                        <li onClick={() => openModal(_id)} data-toggle="modal" data-target={'#exampleModalCenter'+_id} onClick={()=>{setModalId(_id, item)}}>
                            <i class="fas fa-eye"></i>
                            <span>View Details</span> 
                        </li>
                        <li onClick={() => addcart(_id, "add", sellerA.id)}>
                            <i class="fas fa-shopping-cart"></i>
                            <span>Add to cart</span>
                        </li>
                    </ul>
                    {
                        discount > 0 && <div className='discount_view'>
                            <span>- {discount}%</span>
                        </div>
                    }
                </div>
                <div class="content">
                    <div class="productName">
                        <h3>{title}</h3>
                        <small>Shop: {sellerA.shopname}</small>
                    </div>
                    <div class="price_rating">
                        <h2>${price}</h2>
                        <div class="rating">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star grey" aria-hidden="true"></i>
                            <i class="fa fa-star grey" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default CardGenerator;