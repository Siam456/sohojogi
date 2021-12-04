import React from 'react';
import AdvBanner from './AdvBanner';
import HomeFoods from './HomeFoods';
import HomeGrocery from './HomeGrocery';
import HomePharmacy from './HomePharmacy';
import JoinUs from './JoinUs';
import LifeStyle from './LifeStyle';
import OurServices from './OurServices';
import Partners from './Partners';
import TopCarousel from './TopCarousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

const HomeX = (props) => {
    const {searchFun} = props;
    const [product, setproduct] = useState([])

    const [ _id, set_id ] = useState('');
    const [item, setitem] = useState({
        sellerA: {
            shopname: '',
            address: '',
        }
    })

    const setModalId = (id, product) => {
        //alert(id)
        set_id(id);
        setitem(product)
    }

    useEffect(() => {
        //console.log('siam')
        axios.get('product/all')
        .then(res => setproduct(res.data.products))
        .catch(err => console.log(err))
        
    }, []);


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
          'You clicked the button!',
          'success'
        )
			}
		} catch (err) {
			console.log(err);
		}
		
	};

    return (
      <>
        <TopCarousel></TopCarousel>
        <OurServices />
        <HomeFoods searchFun={searchFun} />
        <HomePharmacy product={product} setModalId={setModalId} />
        <LifeStyle />
        <AdvBanner />
        <HomeGrocery product={product} setModalId={setModalId} />
        <JoinUs />
        <Partners />

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id={"exampleModalCenter" + _id}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Details of {item.title}
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
                  {item.avater !== null ? (
                    <img
                      class="d-block mx-auto"
                      src={
                        window.location.origin + `/productAvater/${item.avater}`
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
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <small>
                    <span>
                      <i
                        style={{ color: "#BF1B28" }}
                        className="fas fa-store-alt"
                      ></i>{" "}
                      {item.sellerA.shopname}
                    </span>{" "}
                    &nbsp; <br />
                    <span>
                      <i
                        style={{ color: "#D04545" }}
                        className="fas fa-map-marker-alt"
                      ></i>{" "}
                      {item.sellerA.address}
                    </span>{" "}
                    &nbsp; <br />
                    <span>
                      <span style={{ color: "#BF1B28" }}>Total views:</span>{" "}
                      {item.views}
                    </span>{" "}
                    &nbsp; <br />
                    <span>
                      <span style={{ color: "#BF1B28" }}>Last updated on:</span>{" "}
                      {new Date(item.updatedAt).getDay()}-
                      {new Date(item.updatedAt).getMonth()}-
                      {new Date(item.updatedAt).getFullYear()}
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
                  onClick={() => addcart(item._id, "add", item.sellerA.id)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default HomeX;