import axios from "axios";
import React, { useEffect, useState } from "react";
import "./allshop.css";

const Allshop = () => {
  const [shop, setshop] = useState();

  const [Searchlocation, setSearchlocation] = useState("All");

  //search by location
  const locationSearch = (e) => {
    setSearchlocation(e.target.value);
    console.log(Searchlocation);
  };

  useEffect(() => {
    axios
      .get("/user/seller")
      .then((res) => {
        setshop(res.data.seller);
        //console.log(res.data.seller)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container">
        <div>
          <h2>Popular restaurants</h2>

          <select
            onChange={locationSearch}
            className="form-select"
            aria-label="Default select example"
          >
            <option selected>All</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Faridpur">Faridpur</option>
            <option value="Sadarpur">Sadarpur</option>
          </select>

          <div className="container my-3">
            <div
              className="row m-auto"
              style={{ width: "auto", justifyContent: "center" }}
            >
              {shop === undefined ? (
                <div>No Shop </div>
              ) : (
                <>
                  {shop.map((value, index) => {
                    if (
                      Searchlocation === "All" ||
                      Searchlocation === value.address
                    ) {
                      let source;
                      if (value.avater) {
                        //console.log(value.avater)
                        source =
                          window.location.origin +
                          `/userUpload/${value.avater}`;
                      } else {
                        source =
                          "https://media.istockphoto.com/photos/pizza-quattro-formaggi-on-the-rome-dough-picture-id1159174187?k=20&m=1159174187&s=612x612&w=0&h=JKXqYbemo44T-5Gb3zgb2_fwJRtKimmbQQDmMGGtgmQ=";
                      }
                      return (
                        <>
                          <a
                            key={index}
                            href={`/shop/${value._id}`}
                            className="col-sm-12  col-lg-4 col-md-6 my-3 cardWrapperAll"
                          >
                            <div className="card" style={{ width: "18rem" }}>
                              <div
                                style={{ height: "180px", overflow: "hidden" }}
                              >
                                <img
                                  className="card-img-top"
                                  src={source}
                                  alt="siam"
                                />
                              </div>
                              <div className="card-body">
                                <h5
                                  className="card-title"
                                  style={{ color: "#7A8FA8" }}
                                >
                                  {value.shopname}
                                </h5>
                                <p className="text-muted">
                                  <i
                                    style={{ color: "#348bb3" }}
                                    className="fas fa-grip-horizontal"
                                  ></i>{" "}
                                  {value.catagory}
                                </p>
                                <h6 className="text-muted">
                                  <i
                                    style={{ color: "#D04545" }}
                                    className="fas fa-map-marker-alt"
                                  ></i>{" "}
                                  {value.address}
                                </h6>
                              </div>
                            </div>
                          </a>
                        </>
                      );
                    }
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Allshop;
