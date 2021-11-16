import React, { useEffect, useState } from "react";
import DocDForProfile from "../docdiary/DocDForProfile";
import "./profile.css";
import axios from "axios";

const Profile = (props) => {
  const { _id } = props.user;

  const [profile, setprofile] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    _id: "",
  });

  //get status state
  const [getStatus, setgetStatus] = useState([]);

  const [coverPic, setcoverPic] = useState([]);
  const [coverPicPreview, setcoverPicPreview] = useState(null);
  let CoverPicApi = null;

  const [coverPicUpdate, setcoverPicUpdate] = useState([]);
  const [updateCoverPicPreview, setupdateCoverPicPreview] = useState(null);

  //profile pitcute
  const [profilePic, setprofilePic] = useState([]);
  const [profilePicPreview, setprofilePicPreview] = useState(null);

  const [account, setaccount] = useState({
    Acname: "",
    number: "",
  });

  const [about, setabout] = useState("");
  const [editAbout, seteditAbout] = useState("");

  let profileImage =
    "https://st4.depositphotos.com/1156795/21707/v/600/depositphotos_217073102-stock-illustration-profile-placeholder-image-gray-silhouette.jpg";
  let titleIcon = '';
  let titleIconColor = '';
  let unmount = true;

  const getdata = async () => {
    try {
      //console.log(_id)
      const resStatus = await axios.get(`/status/${_id}`);
      if (resStatus) {
        setgetStatus(resStatus.data.response);
        //console.log(resStatus.data.response)
      }
    } catch (errStatus) {
      console.log(errStatus.response);
    }
  };

  useEffect(() => {
    //getdata();
    axios
      .get(`/user/${_id}`)
      .then((res) => {
        if (res) {
          //console.log(res.data.users);
          if (unmount) {
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
      .catch((err) => console.log(err.response));

    return () => {
      unmount = false;
    };
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

  const addAc = async () => {
    //alert('ss')
    try {
      const res = await axios.put(`user/account/${_id}`, account);
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const addAccount = (e) => {
    e.preventDefault();
    addAc();
  };

  //cover pic upload
  const uploadCover = async (data) => {
    try {
      var res = await axios.post(`user/cover/${_id}`, data);
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  //deletet cover pic
  const deleteCover = async () => {
    try {
      var res = await axios.delete(`user/cover/${_id}`);
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const updateCover = async (data) => {
    //alert('s')
    try {
      var res = await axios.patch(`user/cover/${_id}`, data);
      if (res) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  //delete account

  const acDe = async (acName) => {
    try {
      const res = await axios.delete(`user/account/${_id}/${acName}`);
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const deleteAccount = (acName) => {
    //alert(acName)
    acDe(acName);
  };

  //edit account

  const EditAccountFun = (e) => {
    e.preventDefault();
    addAc();
  };

  //update profile pic
  const updateProfilePic = async () => {
    try {
      const data = new FormData();
      data.append("avater", profilePic);

      const res = await axios.post(`user/profilepic/${_id}`, data);
      if (res) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  //add bio
  const addBio = async () => {
    try {
      const data = {
        about: about,
      };
      const res = await axios.post(`user/addbio/${_id}`, data);
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  //edit bio
  const EditBio = async () => {
    try {
      //alert(editAbout)
      const data = {
        about: editAbout,
      };
      const res = await axios.patch(`user/bio/${_id}`, data);
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  //delete bio
  const deteleBio = async () => {
    try {
      //alert('x')

      const res = await axios.delete(`user/bio/${_id}`);
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <div className='profileWrapper'>
        <form
          style={{ width: "100%", margin: "0", padding: "0" }}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData();
            data.append("avater", coverPic);
            //console.log(coverPic)

            uploadCover(data);
          }}
        >
          {profile.coverPhoto === null ? (
            coverPicPreview === null ? (
              <span>
                <label
                  htmlFor='coverUpload'
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
                    Upload Photo
                  </span>
                </label>
                <input
                  onChange={(e) => {
                    setcoverPic(e.target.files[0]);
                    const render = new FileReader();
                    render.onloadend = () => {
                      setcoverPicPreview(render.result);
                    };
                    render.readAsDataURL(e.target.files[0]);
                    //console.log(coverPicPreview)
                  }}
                  style={{ display: "none" }}
                  type='file'
                  id='coverUpload'
                />
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
              <span className='coverAction'>
                <button
                  className='btn btn-dark'
                  onClick={() => {
                    deleteCover();
                  }}
                >
                  <i className='far fa-trash-alt'></i>
                </button>{" "}
                &nbsp; &nbsp;
                <label htmlFor='editCover' className='btn btn-dark'>
                  <i className='fas fa-camera'></i> Edit Photo
                </label>
                <input
                  onChange={(e) => {
                    setcoverPicUpdate(e.target.files[0]);
                    const render = new FileReader();
                    render.onloadend = () => {
                      setupdateCoverPicPreview(render.result);
                    };
                    render.readAsDataURL(e.target.files[0]);
                    //console.log(coverPicPreview)
                  }}
                  style={{ display: "none" }}
                  type='file'
                  id='editCover'
                />
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
                        setupdateCoverPicPreview(null);
                      }}
                      className='btn btn-dark'
                    >
                      Cancel
                    </button>{" "}
                    &nbsp;
                    <button
                      className='btn btn-primary'
                      onClick={(e) => {
                        e.preventDefault();
                        const data = new FormData();
                        data.append("avater", coverPicUpdate);
                        updateCover(data);
                      }}
                    >
                      Update
                    </button>
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
                <img src={updateCoverPicPreview} alt='siam' width='100%' />
              </span>
            </div>
          )}
        </form>
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
              <div
                className='uploadAvater'
                data-toggle='modal'
                data-target='#editAvater'
                onClick={() => {
                  setprofilePicPreview(null);
                }}
              >
                <i
                  style={{
                    padding: "10px",
                    marginTop: "0",
                  }}
                  className='fas fa-camera'
                ></i>
              </div>
            </div>
          </div>

          <div className='infoProfile'>
            <div>
              {profile.shopname ? (
                <div style={{ marginTop: "10px" }}>
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
                  <button
                    className='btn btn-dark'
                    data-toggle='modal'
                    data-target='#add_bio'
                  >
                    Add bio
                  </button>
                </span>
              ) : (
                <span>
                  <div
                    style={{
                      background: "#c8d0db",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    className='text-muted'
                  >
                    {profile.about}
                  </div>
                  <div style={{ textAlign: "center", marginTop: "5px" }}>
                    <span
                      data-toggle='modal'
                      data-target='#edit_bio'
                      className='editBio'
                      onClick={() => {
                        seteditAbout(profile.about);
                      }}
                    >
                      Edit
                    </span>
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
                    <i
                      style={{ color: `${titleIconColor}` }}
                      className={titleIcon}
                    ></i>
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
                    : {profile.Bkash} <br />
                    <i
                      onClick={() => {
                        setaccount((prev) => {
                          return {
                            Acname: prev.Acname,
                            number: profile.Bkash,
                          };
                        });
                      }}
                      style={{ cursor: "pointer" }}
                      data-toggle='modal'
                      data-target='#bkash_edit'
                      className='far fa-edit'
                    ></i>{" "}
                    &nbsp;{" "}
                    <i
                      style={{ cursor: "pointer" }}
                      className='fas fa-trash-alt'
                      onClick={() => deleteAccount("Bkash")}
                    ></i>
                  </p>
                ) : (
                  <span className='m-2'>
                    <button
                      className='btn btn-light'
                      data-toggle='modal'
                      data-target='#bkash'
                    >
                      Add Bkash
                    </button>
                  </span>
                )}

                {profile.Rocket !== null ? (
                  <p style={{ paddingRight: "22px" }}>
                    <img
                      src='https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png'
                      alt='rocket'
                      height='50px'
                    />{" "}
                    : {profile.Rocket} <br />
                    <i
                      onClick={() => {
                        setaccount((prev) => {
                          return {
                            Acname: prev.Acname,
                            number: profile.Rocket,
                          };
                        });
                      }}
                      style={{ cursor: "pointer" }}
                      data-toggle='modal'
                      data-target='#rocket_edit'
                      className='far fa-edit'
                    ></i>{" "}
                    &nbsp;{" "}
                    <i
                      style={{ cursor: "pointer" }}
                      className='fas fa-trash-alt'
                      onClick={() => deleteAccount("Rocket")}
                    ></i>
                  </p>
                ) : (
                  <span className='m-2'>
                    <button
                      className='btn btn-light'
                      data-toggle='modal'
                      data-target='#rocket'
                    >
                      Add Rocket
                    </button>
                  </span>
                )}

                {profile.Nagad !== null ? (
                  <p style={{ paddingRight: "22px" }}>
                    <img
                      src='https://www.logo.wine/a/logo/Nagad/Nagad-Horizontal-Logo.wine.svg'
                      alt='bkash'
                      height='50px'
                    />{" "}
                    : {profile.Nagad} <br />
                    <i
                      onClick={() => {
                        setaccount((prev) => {
                          return {
                            Acname: prev.Acname,
                            number: profile.Nagad,
                          };
                        });
                      }}
                      style={{ cursor: "pointer" }}
                      data-toggle='modal'
                      data-target='#nagad_edit'
                      className='far fa-edit'
                    ></i>{" "}
                    &nbsp;{" "}
                    <i
                      style={{ cursor: "pointer" }}
                      className='fas fa-trash-alt'
                      onClick={() => deleteAccount("Nagad")}
                    ></i>
                  </p>
                ) : (
                  <span className='m-2'>
                    <button
                      className='btn btn-light'
                      data-toggle='modal'
                      data-target='#nagad'
                    >
                      Add Nagad
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bc'></div>

      {/* add account */}
      {/* <!-- Modal bkash --> */}
      <div
        className='modal fade'
        id='bkash'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
              <br />

              <form onSubmit={addAccount} autoComplete='off'>
                <div class='form-group'>
                  <label for='Bkash'>Add Bkash Number</label>
                  <input
                    required
                    onChange={(e) => {
                      setaccount({
                        Acname: "Bkash",
                        number: e.target.value,
                      });
                      //console.log(account)
                    }}
                    type='text'
                    class='form-control'
                    id='Bkash'
                    placeholder='Enter Bkash Number'
                  />
                  <br />
                </div>

                <button type='submit' class='btn btn-outline-dark'>
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal rocket --> */}
      <div
        className='modal fade'
        id='rocket'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
              <br />

              <form onSubmit={addAccount} autoComplete='off'>
                <div class='form-group'>
                  <label for='Rocket'>Add Rocket Number</label>
                  <input
                    required
                    onChange={(e) => {
                      setaccount({
                        Acname: "Rocket",
                        number: e.target.value,
                      });
                      //console.log(account)
                    }}
                    type='text'
                    class='form-control'
                    id='Rocket'
                    placeholder='Enter Rocket Number'
                  />
                  <br />
                </div>

                <button type='submit' class='btn btn-outline-dark'>
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal nagad --> */}
      <div
        className='modal fade'
        id='nagad'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
              <br />

              <form onSubmit={addAccount} autoComplete='off'>
                <div class='form-group'>
                  <label for='Nagad'>Add Nagad Number</label>
                  <input
                    required
                    onChange={(e) => {
                      setaccount({
                        Acname: "Nagad",
                        number: e.target.value,
                      });
                      //console.log(account);
                    }}
                    type='text'
                    class='form-control'
                    id='Nagad'
                    placeholder='Enter Nagad Number'
                  />
                  <br />
                </div>

                <button type='submit' class='btn btn-outline-dark'>
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* edit account */}
      {/* <!-- Modal bkash --> */}
      <div
        className='modal fade'
        id='bkash_edit'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
              <br />

              <form onSubmit={EditAccountFun} autoComplete='off'>
                <div class='form-group'>
                  <label for='Bkash'>Edit Bkash Number</label>
                  <input
                    required
                    value={account.number}
                    onChange={(e) => {
                      setaccount({
                        Acname: "Bkash",
                        number: e.target.value,
                      });
                      //console.log(account)
                    }}
                    type='text'
                    class='form-control'
                    id='Bkash'
                    placeholder='Enter Bkash Number'
                  />
                  <br />
                </div>

                <button type='submit' class='btn btn-outline-dark'>
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal rocket --> */}
      <div
        className='modal fade'
        id='rocket_edit'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
              <br />

              <form onSubmit={EditAccountFun} autoComplete='off'>
                <div class='form-group'>
                  <label for='Rocket'>Edit Rocket Number</label>
                  <input
                    required
                    value={account.number}
                    onChange={(e) => {
                      setaccount({
                        Acname: "Rocket",
                        number: e.target.value,
                      });
                      //console.log(account)
                    }}
                    type='text'
                    class='form-control'
                    id='Rocket'
                    placeholder='Enter Rocket Number'
                  />
                  <br />
                </div>

                <button type='submit' class='btn btn-outline-dark'>
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal nagad --> */}
      <div
        className='modal fade'
        id='nagad_edit'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
              <br />

              <form onSubmit={EditAccountFun} autoComplete='off'>
                <div class='form-group'>
                  <label for='Nagad'>Edit Nagad Number</label>
                  <input
                    required
                    value={account.number}
                    onChange={(e) => {
                      setaccount({
                        Acname: "Nagad",
                        number: e.target.value,
                      });
                      //console.log(account);
                    }}
                    type='text'
                    class='form-control'
                    id='Nagad'
                    placeholder='Enter Nagad Number'
                  />
                  <br />
                </div>

                <button type='submit' class='btn btn-outline-dark'>
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- edit avater modall --> */}
      <div
        className='modal fade'
        id='editAvater'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Edit Profile Picture
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div style={{ textAlign: "center" }}>
                {profilePicPreview === null ? (
                  <div
                    style={{
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
                    {" "}
                    <span className='hide'>
                      {profile.avater
                        ? (profileImage =
                            window.location.origin +
                            `/userUpload/${profile.avater}`)
                        : ""}
                    </span>
                    <img src={profileImage} alt='siam' height='200px' />
                  </div>
                ) : (
                  <span>
                    <div
                      style={{
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
                      <img src={profilePicPreview} alt='siam' height='200px' />
                    </div>
                  </span>
                )}
              </div>
              <div className='my-4'>
                <label
                  for='editProfilePic'
                  className='btn'
                  style={{
                    background: "#DBE7F2",
                    color: "#2D88FF",
                  }}
                >
                  <i className='fas fa-plus'></i> Update Photo
                </label>
                <input
                  onChange={(e) => {
                    setprofilePic(e.target.files[0]);
                    const render = new FileReader();
                    render.onloadend = () => {
                      setprofilePicPreview(render.result);
                    };
                    render.readAsDataURL(e.target.files[0]);
                    //console.log(coverPicPreview)
                  }}
                  style={{ display: "none" }}
                  type='file'
                  id='editProfilePic'
                />
              </div>
              <div style={{ float: "right" }}>
                <button
                  onClick={() => {
                    setprofilePicPreview(null);
                  }}
                  className='btn btn-secondary'
                >
                  Cancel
                </button>{" "}
                &nbsp;
                <button
                  onClick={() => {
                    updateProfilePic();
                  }}
                  className='btn'
                  style={{
                    background: "#DBE7F2",
                    color: "#2D88FF",
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- add bio --> */}
      <div
        className='modal fade'
        id='add_bio'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Add About
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form
                method='post'
                onSubmit={(e) => {
                  e.preventDefault();
                  addBio();
                }}
              >
                <div class='form-group'>
                  <label for='add_bio_fild'>Add about</label>
                  <textarea
                    required
                    type='email'
                    class='form-control'
                    id='add_bio_fild'
                    value={about}
                    placeholder='Maximum 150 Character...'
                    maxLength='150'
                    onChange={(e) => {
                      setabout(e.target.value);
                    }}
                  />
                </div>{" "}
                <br />
                <button type='submit' class='btn btn-primary'>
                  Submit
                </button>
                &nbsp;
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                  onClick={() => {
                    setabout("");
                    //console.log(about)
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- edit bio --> */}
      <div
        className='modal fade'
        id='edit_bio'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Edit About
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form
                method='post'
                onSubmit={(e) => {
                  e.preventDefault();
                  EditBio();
                }}
              >
                <div class='form-group'>
                  <label for='add_bio_fild'>Edit about</label>
                  <textarea
                    required
                    type='email'
                    class='form-control'
                    id='add_bio_fild'
                    value={editAbout}
                    placeholder='Maximum 150 Character...'
                    maxLength='150'
                    onChange={(e) => {
                      seteditAbout(e.target.value);
                    }}
                  />
                </div>{" "}
                <br />
                <button type='submit' class='btn btn-primary'>
                  Submit
                </button>
                &nbsp;
                <button
                  type='button'
                  className='btn btn-danger'
                  data-dismiss='modal'
                  onClick={() => {
                    deteleBio();
                  }}
                >
                  Delete
                </button>
                &nbsp;
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                  onClick={() => {
                    seteditAbout("");
                    //console.log(about)
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <DocDForProfile
        user={props.user}
        userId={props.user._id}
        getStatusX={getStatus}
      />
      {/* <Test getStatusX={getStatus} /> */}
    </>
  );
};

export default Profile;
