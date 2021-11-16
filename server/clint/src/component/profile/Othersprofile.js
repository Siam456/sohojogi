import React, { useEffect, useState } from "react";
import DocDForProfile from "../docdiary/DocDForProfile";
import "./profile.css";
import axios from "axios";

import {
    useParams
  } from "react-router-dom";

const Othersprofile = (props) => {
    const { _id } = useParams();

  const [profile, setprofile] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    _id: "",
    avater: "",
  });

  const [getStatus, setgetStatus] = useState([]);

  const [coverPicPreview, setcoverPicPreview] = useState(null);
  let CoverPicApi = null;

  const [updateCoverPicPreview, setupdateCoverPicPreview] = useState(null);

  

  let profileImage =
  "https://st4.depositphotos.com/1156795/21707/v/600/depositphotos_217073102-stock-illustration-profile-placeholder-image-gray-silhouette.jpg";

  let titleIcon = '';
  let titleIconColor = '';
  
  const getdata = async () => {
    
    try {
      //console.log(_id)
      const resStatus = await axios.get(`/status/${_id}`);
      if(resStatus){
        setgetStatus(resStatus.data.response);
        //console.log(resStatus.data.response)
      }
    } catch (errStatus) {
      console.log(errStatus.response);
    }
  };

  let unmountq = true;
  useEffect(() => {
    //getdata();
    axios.get(`/user/${_id}`)
    .then(res => {
        if (res) {
          if (unmountq) {
            setprofile(res.data.users);
            axios.get(`/status/x/${_id}`)
            .then(resStatus => {
              if(resStatus){
                setgetStatus(resStatus.data.response);
                //console.log(resStatus.data.response)
              }
            })
            .catch(errStatus => console.log(errStatus.response))

          }
        }
    })
    .catch(err => console.log(err.response));

    return(() => {
      unmountq = false;
    })
  }, [profile]);

  //about sub nav
  const displayGeneralInfo = () => {
    document.getElementById("about").classList.add("bold");
    document.getElementById("Shop_info").classList.remove("bold");

    document.getElementById("general_info").classList.remove("hide");
    document.getElementById("shop_info_all").classList.add("hide");
  };

  const displayShopInfo = () => {
    document.getElementById("about").classList.remove("bold");
    document.getElementById("Shop_info").classList.add("bold");

    document.getElementById("general_info").classList.add("hide");
    document.getElementById("shop_info_all").classList.remove("hide");
  };

  //add account

  const user = {
      _id: _id,
      name: profile.name,
      avater: profile.avater,
  }
  return (
    <>
      <div className='profileWrapper'>
        <div
          style={{ width: "100%", margin: "0", padding: "0" }}
        >
          {profile.coverPhoto === null ? (
            coverPicPreview === null ? (
              <span>
                <div
                  
                  className='imgHeight'
                  className='imgHeight'
                  style={{
                    width: "100%",
                    border: "1px dotted gray",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <span className='text-muted coveruploadlbl'>
                    No cover Photo
                  </span>
                </div>
                
              </span>
            ) : (
              <div
                className='imgHeight'
                style={{
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span>
                  <span
                    style={{
                      width: "100%",
                      position: "absolute",
                      top: "0",
                      zIndex: "30",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        background: "rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <h3>Actions</h3>
                      <p>
                        <button
                          onClick={() => {
                            setcoverPicPreview(null);
                          }}
                          className='btn btn-dark'
                        >
                          Cancel
                        </button>{" "}
                        &nbsp;
                        <button className='btn btn-primary'>Upload</button>
                      </p>
                    </span>
                  </span>
                  <span
                    style={{
                      width: "100%",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <img src={coverPicPreview} alt='siam' width='100%' />
                  </span>
                </span>
              </div>
            )
          ) : updateCoverPicPreview === null ? (
            <div
              className='imgHeight'
              style={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className='hide'>
                  {profile.coverPhoto !== undefined
                    ? (CoverPicApi =
                        window.location.origin +
                        `/userCoverPhoto/${profile.coverPhoto}`)
                    : (CoverPicApi = null)}
                </span>
                <img src={CoverPicApi} alt='siam' width='100%' />
              </span>
              
            </div>
          ) : (
            <div
              className='imgHeight'
              style={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "0",
                  zIndex: "30",
                }}
              >
                
              </span>
              <span
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img src={updateCoverPicPreview} alt='siam' width='100%' />
              </span>
            </div>
          )}
        </div>
        <div className='description'>
          <div>
            <div
              style={{
                position: "relative",
                borderRadius: "50%",
                width: "200px",
                height: "200px",
                textAlign: "center",
                background: "white",
                overflow: "hidden",
                border: "2px solid #96bae3",
                margin: "auto",
              }}
            >
              <span className='hide'>
                {profile.avater
                  ? (profileImage =
                      window.location.origin + `/userUpload/${profile.avater}`)
                  : ""}
              </span>
              <img src={profileImage} alt='siam' height='200px' />
              
            </div>
          </div>

          <div className='infoProfile'>
            <div>
              {profile.shopname ? (
                <div style={{marginTop: '10px'}}>
                  <span
                    onClick={displayGeneralInfo}
                    id='about'
                    className='profilebtn bold'
                  >
                    About
                  </span>{" "}
                  &nbsp;
                  <span
                    onClick={displayShopInfo}
                    id='Shop_info'
                    className='profilebtn'
                  >
                    ShopInfo
                  </span>
                </div>
              ) : (
                <span></span>
              )}
            </div>

            <h3 className='text-muted mt-3'>{profile.name}</h3>

            <div id='general_info'>
              <div className='infoFirst'>
                <p style={{ paddingRight: "22px" }}>
                  <span style={{ display: "flex" }}>
                    <i
                      style={{ color: "#2476AC" }}
                      className='fas fa-envelope'
                    ></i>
                    &nbsp;{profile.email}
                  </span>
                </p>
                <p style={{ paddingRight: "22px" }}>
                  <span style={{ display: "flex" }}>
                    <i className='fas fa-mobile'></i>&nbsp;{profile.phone}
                  </span>
                </p>
                <p style={{ paddingRight: "22px" }}>
                  <span style={{ display: "flex" }}>
                    <i
                      style={{ color: "red" }}
                      className='fas fa-map-marker-alt'
                    ></i>
                    &nbsp;{profile.address}
                  </span>
                </p>
              </div>
              {profile.about === null ? (
                <span>
                  <div
                    style={{
                      background: "#c8d0db",
                      padding: "10px",
                      borderRadius: "5px",
                      marginTop: '10px,'
                    }}
                    className='text-muted'
                  >
                    N/A 
                  </div>
                </span>
              ) : (
                <span>
                  <div
                    style={{
                      background: "#c8d0db",
                      padding: "10px",
                      borderRadius: "5px",
                      marginTop: '10px,'
                    }}
                    className='text-muted'
                  >
                    {profile.about}
                  </div>
                  
                </span>
              )}
            </div>

            {/* shop info */}
            <div id='shop_info_all' className='hide'>
              <div className='infoFirst'>
                <p style={{ paddingRight: "22px" }}>
                  <span style={{ display: "flex" }}>
                    <i
                      style={{ color: "#2476AC" }}
                      className='fas fa-shopping-bag'
                    ></i>
                    &nbsp;{profile.shopname}
                  </span>
                </p>

                <p style={{ paddingRight: "22px" }}>
                  <span style={{ display: "flex" }}>
                  <span className='hide'>
                      {profile.catagory === "Food"
                        ? (titleIcon = "fas fa-pizza-slice") 
                        : profile.catagory === "Grocery"
                        ? (titleIcon = "fas fa-leaf")
                        : (titleIcon = "fas fa-capsules")}
                    </span>
                    <span className='hide'>
                      {profile.catagory === "Food"
                        ? (titleIconColor = "#DC6B29") 
                        : profile.catagory === "Grocery"
                        ? (titleIconColor = "#82C91E")
                        : (titleIconColor = "#348bb3")}
                    </span>
                    <i style={{ color: `${titleIconColor}` }} className={titleIcon}></i>
                    &nbsp;{profile.catagory}
                  </span>
                </p>

                <p style={{ paddingRight: "22px" }}>
                  <span style={{ display: "flex" }}>
                    <i
                      style={{ color: "red" }}
                      className='fas fa-map-marker-alt'
                    ></i>
                    &nbsp;{profile.address}
                  </span>
                </p>
              </div>

              <div className='accountWrapper'>
                {profile.Bkash !== null ? (
                  <p style={{ paddingRight: "22px" }}>
                    <img
                      src='https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg'
                      alt='bkash'
                      height='50px'
                    />
                    : {profile.Bkash} 
                  </p>
                ) : (
                  <span className='m-2'>
                    <div
                      
                    >
                      Bkash : N/A
                    </div>
                  </span>
                )}

                {profile.Rocket !== null ? (
                  <p style={{ paddingRight: "22px" }}>
                    <img
                      src='https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png'
                      alt='rocket'
                      height='50px'
                    />{" "}
                    : {profile.Rocket} 
                  </p>
                ) : (
                  <span className='m-2'>
                    <div
                      
                    >
                      Rocket : N/A
                    </div>
                  </span>
                )}

                {profile.Nagad !== null ? (
                  <p style={{ paddingRight: "22px" }}>
                    <img
                      src='https://www.logo.wine/a/logo/Nagad/Nagad-Horizontal-Logo.wine.svg'
                      alt='bkash'
                      height='50px'
                    />{" "}
                    : {profile.Nagad} 
                  </p>
                ) : (
                  <span className='m-2'>
                    <div
                      
                    >
                      Nagad : N/A
                    </div>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bc'></div>      
      <DocDForProfile user={user} userId = {props.user._id} getStatusX={getStatus} /> 
    </>
  );
};

export default Othersprofile;
