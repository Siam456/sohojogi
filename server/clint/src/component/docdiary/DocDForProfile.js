import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "./docdiary.css";
import RealTimeAgo from "react-time-ago";
import Replies from "./Replies";
import { Link } from "react-router-dom";

const Test = (props) => {
	const { user , userId, getStatusX } = props;
	const {name, avater, _id } = user;
	//var textfildStatus = true;
	const [textfildStatus, settextfildStatus] = useState(true);
	//console.log(props.user)
	const [status, setstatus] = useState("");

	const [ getStatus, setgetStatus ] = useState([]);
	

	const [comment, setcomment] = useState("");
	const [reply, setreply] = useState("");

	//visiblereply states for replies
	const [vreply, setvreply] = useState(true);
	const [prevIndex, setprevIndex] = useState(null);

	const [prevCommentIndex, setprevCommentIndex] = useState(0);

	const [ statusAttachment, setstatusAttachment ] = useState([]); 
	const [ statusAttachmentPreview, setstatusAttachmentPreview ] = useState([]); 

	const [ CommentAttachment, setCommentAttachment ] = useState([]); 


	//cleanup state 
	const cleanup = () => {
		setstatusAttachment([]);
		setstatusAttachmentPreview([]);
		setstatus('');
		settextfildStatus(true);

	}
	
	//get status
	let unmount = true;
	
	useEffect(() => {
		setgetStatus(getStatusX);
		
		//getfunasync();
    //console.log(userId)
    //console.log(getStatus);
		//console.log(getStatusX)
		//console.log(getStatus.user.id)
		if(_id !== userId){
			document.getElementById('post_section').classList.add('hide');
		}
		return(() => {
			unmount = false;
		})
		
	});

	//store value
	const setStatus = (e) => {
		settextfildStatus(false);
		setstatus(e.target.value);
	};

	//post status
	const postStatus = (e) => {
		settextfildStatus(true);
		setstatus("");
		//console.log(status)

		const newStatus = JSON.stringify(status);
        const data = new FormData();
        data.append('text',newStatus);
        //data.append('statusAttachment', statusAttachment);

		for (let i = 0; i < statusAttachment.length; i++) {
			data.append('statusAttachment', statusAttachment[i]);
		  }
		//console.log(statusAttachment)

		
		axios
			.post("/status", data)
			.then((res) => {
				//setvreply(false)
			})
			.catch((err) => console.log(err.response));
	};
	
	var useravaterSource;
	if (avater) {
		useravaterSource = window.location.origin + `/userUpload/${avater}`;
	} else {
		useravaterSource =
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04IQPD-wCoIQ3vpWQy5mjc1HTVrCP1ZvJyg&usqp=CAU";
	}
	let placeholderText = `What's on your mind, ${name}?`;

	//like
	const likeUnlike = (obj) => {
		//console.log(obj.user.id)
		axios
			.patch(`/status/${_id}/${obj._id}`)
			.then((res) => console.log("lol"))
			.catch((err) => console.log(err));
	};

	//delete
	const [deletecheck, setdeletecheck] = useState(true);
	const [pdi, setpdi] = useState(null)
	const showDelete = (i) => {
		//alert(i)
		//
		setpdi(i);
		//alert(pdi)
		if(pdi === null){
			if (deletecheck) {
				setdeletecheck(false);
				document.getElementById(`dbtn${i}`).classList.remove("hide");
				
			} else {
				setdeletecheck(true);
				document.getElementById(`dbtn${i}`).classList.add("hide");
			}
		}
		else if(pdi === i){
			if (deletecheck) {
				setdeletecheck(false);
				document.getElementById(`dbtn${i}`).classList.remove("hide");
				
			} else {
				setdeletecheck(true);
				document.getElementById(`dbtn${i}`).classList.add("hide");
			}
		} else{
			document.getElementById(`dbtn${pdi}`).classList.add("hide");
			document.getElementById(`dbtn${i}`).classList.remove("hide");
			setdeletecheck(false);
			//alert('siam')
		}
	};

	//deleteStatus
	const deleteStatus = (id) => {
		document.getElementById(`dbtn${pdi}`).classList.add("hide");
		axios
			.delete(`/status/${id}`)
			.then((res) => console.log("ss"))
			.catch((err) => console.log(err.response));
	};

	
	const setEditStatus = (e) => {
		seteditStatusText(e.target.value);
	}

	//status attachment
	const StatusAttachmentPost = (e) => {
		settextfildStatus(false);
		setstatusAttachment([]);
		setstatusAttachment(e.target.files);
		setstatusAttachmentPreview([])
		//console.log(statusAttachment[0])
		for(const element of e.target.files){
			
			
			const render = new FileReader();
			render.onloadend = () => {
				setstatusAttachmentPreview(oldArray => [...oldArray, render.result]);
				
			}
			render.readAsDataURL(element)
		}
		//console.log(statusAttachmentPreview)
	}

	//comment

	//store comment
	const storeComment = (e) => {
		const { name, value } = e.target;
		if(name === 'commentText'){
			setcomment(value);
			//console.log(comment)
		} else if(name === 'commentAttachment'){
			setCommentAttachment(e.target.files[0])
			//console.log(CommentAttachment)
		}
		
		//setstarusId(document.getElementById('sId').textContent)
	};

	//visibleComment
	const [vcomment, setvcomment] = useState(true);
	const [prevI, setprevI] = useState(0);

	//post comment
	const postComment = (id, i) => {
		
		//console.log(id);
		document.getElementById(`sId${i}`).value = "";


		const newComment = JSON.stringify(comment);
		const data = new FormData();
		data.append('text', newComment);
		data.append('attachment', CommentAttachment);
		

		axios
			.post(`/comment/${id}`, data)
			.then((res) => {
				document.getElementById(`cv${i}`).classList.remove("hide");
				setvcomment(false);
			})
			.catch((err) => console.log(err.response));

		setcomment("");
		setCommentAttachment('');
	};

	const visibleComment = (i) => {
		setprevI(i);
		if (prevI === i) {
			if (vcomment) {
				document.getElementById(`cv${i}`).classList.remove("hide");
				setvcomment(false);
			} else {
				document.getElementById(`cv${i}`).classList.add("hide");
				setvcomment(true);
			}
		} else {
			document.getElementById(`cv${prevI}`).classList.add("hide");
			document.getElementById(`cv${i}`).classList.remove("hide");
			setvcomment(false);
		}
	};

	//comment like unlike
	const commentLikeUnlike = (obj) => {
		//console.log(obj)
		axios
			.patch(`/comment/${_id}/${obj._id}`)
			.then((res) => console.log("lol"))
			.catch((err) => console.log(err));
	};

	//reply section

	const displayReplySection = (i, n) => {
		//alert(i + ' ' + n);
		//console.log(document.getElementById(`replySection${i}${n}`))
		setprevIndex(i);
		setprevCommentIndex(n);
		if(prevIndex === null){
			if (vreply) {
				document
					.getElementById(`replySection${i}${n}`)
					.classList.remove("hide");
				setvreply(false);
			} else {
				document.getElementById(`replySection${i}${n}`).classList.add("hide");
				setvreply(true);
			}
		} else if (prevIndex === i && prevCommentIndex === n) {
			if (vreply) {
				document
					.getElementById(`replySection${i}${n}`)
					.classList.remove("hide");
				setvreply(false);
			} else {
				document.getElementById(`replySection${i}${n}`).classList.add("hide");
				setvreply(true);
			}
		} else {
			document
				.getElementById(`replySection${prevIndex}${prevCommentIndex}`)
				.classList.add("hide");
			document.getElementById(`replySection${i}${n}`).classList.remove("hide");
			setvreply(false);
		}
	};

	//store reply

	//store reply
	//const [ reply, setreply ] = useState('');
	const [ replyAttachmentImage, setreplyAttachmentImage] = useState('')
	const storeReply = (e) => {
		const { name, value } = e.target;
		
		//alert(reply)
		if( name === 'replyAttachment'){
			setreplyAttachmentImage(e.target.files[0]);
			//console.log(replyAttachmentImage)
		} else{
			setreply(value);
		}
	};

	const postreply = (id, i, statusId) => {
		//alert(repluinputId)
		//document.getElementById(`repluinputId${i}`).value = "";

		const newReply = JSON.stringify(reply);
		const data = new FormData();
		data.append('text', newReply);
		data.append('attachment', replyAttachmentImage);

		setreply('')

		axios
			.post(`/replies/${id}/${statusId}`, data)
			.then((res) => {
				console.log("res");
			})
			.catch((err) => console.log(err.response));

		setreply("");
		setreplyAttachmentImage('');
	};


	

	//delete comment
	const deleteComment = (id) => {
		axios.delete(`/comment/${id}`)
		.then(res => console.log(res))
		.catch(err => console.log(err.response))
	}


	//edit for status attachment

	const [ statusAttachmentEditState, setstatusAttachmentEditState ] = useState([]);

	const [ statusAttachmentPreviewEdit, setstatusAttachmentPreviewEdit ] = useState([]);

	//edit status
	const [ editStatusText, seteditStatusText ] = useState('')
	const editStatusfun = (status) => {
		
		seteditStatusText(status.text);
		
	}

	
	const StatusAttachmentEdit= (e) => {
		settextfildStatus(false);
		//console.log(e.target.files)
		setstatusAttachmentEditState([]);
		setstatusAttachmentEditState(e.target.files);
		setstatusAttachmentPreviewEdit([])
		//console.log(statusAttachment[0])
		for(const element of e.target.files){
			
			
			const render = new FileReader();
			render.onloadend = () => {
				setstatusAttachmentPreviewEdit(oldArray => [...oldArray, render.result]);
				
			}
			render.readAsDataURL(element)
		}
	}

	return (
    <div className='py-4' style={{ background: "#dae2ed", minHeight: "100vh" }}>
      {/* <UserContext.Consumer>
				{value => {
					console.log(value)
				}}
			</UserContext.Consumer> */}

      <div className='docWrapper' id='post_section'>
        <div>
          
          <>
			  <h5 className='text-success'>Post your Problem</h5>
            <div style={{ display: "flex" }}>
              <div className='imageWrapperDoc'>
                <img
                  src={useravaterSource}
                  alt='siams'
                  height='50px'
                  width='50px'
                  style={{ borderRadius: "50%" }}
                />
              </div>

              {/* <!-- Button trigger modal --> */}

              <span
                className='postbtn'
                data-toggle='modal'
                data-target='#exampleModalLong'
                onClick={cleanup}
              >
                {placeholderText}
              </span>

              {/* <!-- Modal --> */}
              <div
                className='modal fade my-5'
                id='exampleModalLong'
                tabIndex='-1'
                role='dialog'
                aria-labelledby='exampleModalLongTitle'
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
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          postStatus();
                        }}
                        method='POST'
                        encType='multipart/form-data'
                      >
                        <textarea
                          onChange={setStatus}
                          style={{
                            backgroundColor: "#E4E6E9",
                            borderRadius: "10px",
                          }}
                          className='form-control'
                          value={status}
                          placeholder={placeholderText}
                        />

                        <br />
                        <div style={{ textAlign: "center" }}>
                          {statusAttachmentPreview.map(
                            (imageURL, imageindex) => {
                              return (
                                <img
                                  key={imageindex}
                                  src={imageURL}
                                  alt='siam'
                                  height='100px'
                                />
                              );
                            }
                          )}
                        </div>
                        <div>
                          <div className='imgattachlbl'>
                            <h5 className='text-muted'>Add to your post</h5>
                            <label className='px-3' htmlFor='status-attachment'>
                              <p
                                className='my-0'
                                style={{ fontSize: "30px", cursor: "pointer" }}
                              >
                                <i className='fas fa-camera-retro text-success'></i>
                              </p>
                            </label>
                          </div>
                          <p className='text-muted'>
                            You can Upload max 5 file
                          </p>
                          <input
                            name='statusAttachment'
                            onChange={StatusAttachmentPost}
                            style={{ display: "none" }}
                            type='file'
                            id='status-attachment'
                            multiple
                          />
                        </div>
                        <button
                          onClick={postStatus}
                          style={{ marginTop: "15px", width: "100%" }}
                          type='submit'
                          className='btn btn-dark'
                          disabled={textfildStatus}
                          data-dismiss='modal'
                        >
                          Post
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>

      {getStatus.map((v, i) => {
        var statusUseravaterSource;
        if (v.user.avater) {
          statusUseravaterSource =
            window.location.origin + `/userUpload/${v.user.avater}`;
        } else {
          statusUseravaterSource =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04IQPD-wCoIQ3vpWQy5mjc1HTVrCP1ZvJyg&usqp=CAU";
        }
        //console.log(v.user.avater)
        //console.log(v.user.id)

        //date
        const date = new Date(v.createdAt);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + ampm;

        var formatedDate =
          date.getMonth() +
          1 +
          "-" +
          date.getDate() +
          "-" +
          date.getFullYear() +
          "  " +
          strTime;

        const hide = `dbtn${i}`;
        const commentName = `sId${i}`;
        const cv = `cv${i}`;
        const profilehref = `/profileOther/${v.user.id}`;
        const myprofilehref = `/profile`;

        const editStatus = `editStatus${i}`;

        return (
          <div key={i} className='docWrapper my-3'>
            {/* header */}

            <div style={{ display: "flex", marginBottom: "1rem" }}>
              <div className='imageWrapperDoc' style={{ width: "10%" }}>
                <img
                  src={statusUseravaterSource}
                  alt='siams'
                  height='50px'
                  width='50px'
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div
                className='px-3 my-auto'
                style={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  
                  <h6 style={{ marginBottom: "0" }}>
                    {v.user.id === userId ? (
                      <Link className='profile' to={myprofilehref}>
                        {v.user.name}
                      </Link>
                    ) : (
                      <Link className='profile' to={profilehref}>
                        {v.user.name}
                      </Link>
                    )}
                  </h6>
                  <p style={{ marginBottom: "0" }} className='text-muted'>
                    {formatedDate} <i className='fas fa-globe-europe'></i>
                  </p>
                </div>
                {v.user.id === userId ? (
                  <div style={{ textAlign: "right", position: "relative" }}>
                    <div onClick={() => showDelete(i)} className='btn cbtn'>
                      <i className='fas fa-ellipsis-v'></i>
                    </div>
                    <div
                      style={{ position: "absolute" }}
                      className='hide'
                      id={hide}
                    >
                      <div
                        onClick={() => editStatusfun(v)}
                        className='btn cbtn'
                        data-toggle='modal'
                        data-target={"#" + editStatus}
                      >
                        Edit
                      </div>

                      {/* <!-- Modal --> */}
                      <div
                        className='modal fade'
                        id={editStatus}
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
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  //postStatus();
                                }}
                                method='POST'
                                encType='multipart/form-data'
                              >
                                <textarea
                                  onChange={setEditStatus}
                                  style={{
                                    backgroundColor: "#E4E6E9",
                                    borderRadius: "10px",
                                  }}
                                  className='form-control'
                                  value={editStatusText}
                                  placeholder={
                                    "Edit your status " + name + "..."
                                  }
                                />

                                <br />

                                <div style={{ textAlign: "center" }}>
                                  {statusAttachmentPreviewEdit.map(
                                    (imageURL, imageindex) => {
                                      return (
                                        <img
                                          key={imageindex}
                                          src={imageURL}
                                          alt='siam'
                                          height='100px'
                                        />
                                      );
                                    }
                                  )}
                                </div>
                                <div>
                                  <div style={{ textAlign: "center" }}>
                                    {/* {v.statusAttachment.map((element) => {
																	const ol = window.location.origin + `/userUpload/${element}`
																	//console.log(ol)
																	return(
																		<img
																		src={ol}
																		alt="siams"
																		height="50px"
																		width="50px"
																		style={{ borderRadius: "50%" }}
																		/>
																	)
																
																//console.log(element)
																})} */}

                                    <label
                                      htmlFor='status-attachment2'
                                      style={{
                                        padding: "30px",
                                        border: "1px solid #E4E6E9",
                                        background: "#E4E6E9",
                                        width: "100px",
                                        height: "100px",
                                        margin: "10px",
                                      }}
                                    >
                                      <p
                                        className='my-0'
                                        style={{
                                          fontSize: "30px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        +
                                      </p>
                                    </label>
                                  </div>
                                  <p className='text-muted'>
                                    You can Upload max 5 file
                                  </p>
                                  <input
                                    name='statusAttachmentEdit'
                                    onChange={StatusAttachmentEdit}
                                    style={{ display: "none" }}
                                    type='file'
                                    id='status-attachment2'
                                    multiple
                                  />
                                </div>
                                <button
                                  //onClick={postStatus}
                                  style={{ marginTop: "15px", width: "100%" }}
                                  type='submit'
                                  className='btn btn-dark'
                                  disabled={textfildStatus}
                                  data-dismiss='modal'
                                >
                                  Post
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => deleteStatus(v._id)}
                        className='btn cbtn'
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                ) : (
                  <span></span>
                )}
              </div>
            </div>

            {/* body */}

            <div className='px-4' style={{ wordWrap: "break-word" }}>
              <span>
                {v.text.length < 50 ? (
                  <span style={{ fontSize: "25px" }}>{v.text}</span>
                ) : (
                  <div>{v.text}</div>
                )}
              </span>
              <div className='my-3' style={{ textAlign: "center" }}>
                {v.statusAttachment.length > 0 ? (
                  v.statusAttachment.map(
                    (AttachmentImageForStatus, aisIndex) => {
                      let StatusAttachmentSrc =
                        window.location.origin +
                        `/statusUpload/${AttachmentImageForStatus}`;
                      return (
                        <img
                          key={aisIndex}
                          src={StatusAttachmentSrc}
                          alt='siam'
                          width='50%'
                        />
                      );
                    }
                  )
                ) : (
                  <span></span>
                )}
              </div>
            </div>

            {/* like & comment section */}

            <div
              className='my-3 mx-auto'
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                borderBottom: "1px solid #edc2ca",
                borderTop: "1px solid #edc2ca",
              }}
            >
              <div>
                <p style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
                  {v.likes.includes(_id) ? (
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => likeUnlike(v)}
                      className='fas fa-heart reactColor'
                    ></i>
                  ) : (
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => likeUnlike(v)}
                      className='far fa-heart reactColor'
                    ></i>
                  )}
                  &nbsp;
                  {v.likes.length === 0 ? (
                    <span></span>
                  ) : v.likes.length < 9 ? (
                    <span>0{v.likes.length} Likes</span>
                  ) : (
                    v.likes.length + " Likes"
                  )}
                </p>
              </div>
              <div
                className='text-muted commentbtn'
                onClick={() => visibleComment(i)}
              >
                {v.comments.length === 0 ? (
                  <span>comment</span>
                ) : v.comments.length < 2 ? (
                  <span>{v.comments.length + "comment"}</span>
                ) : (
                  v.comments.length + "comments"
                )}
              </div>
            </div>

            {/* all comment */}

            <div style={{ display: "flex", width: "100%" }}>
              <div className='imageWrapperDoc' style={{ width: "10%" }}>
                <img
                  src={useravaterSource}
                  alt='siams'
                  height='40px'
                  width='40px'
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  postComment(v._id, i);
                }}
                autoComplete='off'
                style={{
                  marginTop: "0",
                  width: "100%",
                  marginLeft: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className='px-2'>
                  <label
                    style={{ cursor: "pointer" }}
                    htmlFor='commentAttachment'
                  >
                    <i className='fas fa-camera'></i>
                  </label>
                  <input
                    onChange={storeComment}
                    name='commentAttachment'
                    style={{ display: "none" }}
                    type='file'
                    id='commentAttachment'
                  />
                </div>
                <input
                  onChange={storeComment}
                  style={{ background: "#F0F2F5", borderRadius: "15px" }}
                  type='text'
                  name='commentText'
                  className='form-control commentinput'
                  id={commentName}
                  placeholder='Write a comment...'
                />

                {/* <p  id={commentName}>{v._id}</p> */}
                <div onClick={() => postComment(v._id, i)} className='btn'>
                  <i className='far fa-paper-plane' disabled></i>
                </div>
              </form>
            </div>

            {/* comment get */}

            <span id={cv} className='hide'>
              {v.comments
                .slice(0)
                .reverse()
                .map((value, index) => {
                  var commnetUseravaterSource;
                  if (value.user.avater) {
                    commnetUseravaterSource =
                      window.location.origin +
                      `/userUpload/${value.user.avater}`;
                  } else {
                    commnetUseravaterSource =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04IQPD-wCoIQ3vpWQy5mjc1HTVrCP1ZvJyg&usqp=CAU";
                  }

                  const replySection = `replySection${index}${i}`;
                  const repluinputId = `repluinputId${index}`;

                  const profilehrefComment = `/profileOther/${value.user.id}`;
                  const myprofilehrefComment = `/profile`;
                  const commenthref =
                    window.location.origin +
                    `/commentUpload/${value.commentAttachment}`;

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        width: "100%",
                        marginTop: "15px",
                      }}
                    >
                      <div className='imageWrapperDoc' style={{ width: "10%" }}>
                        <img
                          src={commnetUseravaterSource}
                          alt='siams'
                          height='40px'
                          width='40px'
                          style={{ borderRadius: "50%" }}
                        />
                      </div>
                      <div>
                        <div
                          className='cwrapper'
                          style={{
                            background: "#F0F2F5",
                            borderRadius: "10px",
                          }}
                        >
                          <span>
                            {value.user.id === userId ? (
                              <Link
                                className='profile'
                                to={myprofilehrefComment}
                              >
                                {value.user.name}
                              </Link>
                            ) : (
                              <Link className='profile' to={profilehrefComment}>
                                {value.user.name}
                              </Link>
                            )}
                          </span>{" "}
                          <br />
                          <span className='text-muted'>{value.text}</span>
                          <span>
                            {value.commentAttachment ? (
                              <span style={{ padding: "10px" }}>
                                <br />
                                <img
                                  src={commenthref}
                                  alt='siam'
                                  height='100px'
                                />
                              </span>
                            ) : (
                              <span></span>
                            )}
                          </span>
                          <br />
                        </div>
                        <span
                          className='cwrapper'
                          style={{ fontWeight: "bold" }}
                        >
                          {value.likes.length === 0 ? (
                            <span></span>
                          ) : (
                            <span className='reactColor'>
                              {value.likes.length}
                            </span>
                          )}{" "}
                          {value.likes.includes(_id) ? (
                            <span
                              className='reactColor likeComment'
                              onClick={() => commentLikeUnlike(value)}
                            >
                              {" "}
                              Like
                            </span>
                          ) : (
                            <span
                              className='reactColor likeComment'
                              style={{ fontWeight: "normal" }}
                              onClick={() => commentLikeUnlike(value)}
                            >
                              {" "}
                              Like
                            </span>
                          )}
                        </span>
                        <span
                          onClick={() => displayReplySection(index, i)}
                          className='reactColor commentbtn'
                        >
                          {value.replies.length > 0 ? (
                            <span style={{ fontWeight: "bold" }}>
                              {value.replies.length} Reply
                            </span>
                          ) : (
                            <span>Reply</span>
                          )}
                        </span>{" "}
                        <span
                          className='text-muted'
                          style={{ fontSize: "13px" }}
                        >
                          <RealTimeAgo
                            date={Date.parse(value.createdAt)}
                            locale='en-US'
                          />
                        </span>
                        {/* reply section */}
                        <div id={replySection} className='hide'>
                          {/* replies */}
                          <Replies
                            _id={_id}
                            v={v}
                            commentid={value._id}
                            reply={value.replies}
                          />

                          {/* write replies */}

                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              marginLeft: "10px",
                            }}
                          >
                            <div
                              className='imageWrapperDoc'
                              style={{ width: "10%" }}
                            >
                              <img
                                src={useravaterSource}
                                alt='siams'
                                height='25px'
                                width='25px'
                                style={{ borderRadius: "50%" }}
                              />
                            </div>
                            <form
                              method='POST'
                              encType='multipart/form-data'
                              onSubmit={(e) => {
                                e.preventDefault();
                                postreply(value._id, i, v._id);
                              }}
                              autoComplete='off'
                              style={{
                                marginTop: "0",
                                width: "100%",
                                marginLeft: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div className='px-2'>
                                <label
                                  style={{ cursor: "pointer" }}
                                  htmlFor='repliesAttachment'
                                >
                                  <i className='fas fa-camera'></i>
                                </label>
                                <input
                                  onChange={storeReply}
                                  name='replyAttachment'
                                  style={{ display: "none" }}
                                  type='file'
                                  id='repliesAttachment'
                                />
                              </div>
                              <input
                                onChange={storeReply}
                                name='replyText'
                                style={{
                                  background: "#F0F2F5",
                                  borderRadius: "15px",
                                }}
                                type='text'
                                className='form-control commentinput'
                                id={repluinputId}
                                value={reply}
                                placeholder='Write a comment...'
                              />
                              {/* <p  id={commentName}>{v._id}</p> */}
                              <div
                                onClick={() => postreply(value._id, i, v._id)}
                                className='btn'
                              >
                                <i className='far fa-paper-plane' disabled></i>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      {v.user.id === userId || value.user.id === userId ? (
                        <div
                          onClick={() => deleteComment(value._id)}
                          className='text-muted'
                          style={{
                            marginTop: "20px",

                            marginLeft: "10px",
                            cursor: "pointer",
                            boxShadow:
                              "rgba(255, 255, 255, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                            width: "25px",
                            height: "25px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <i className='far fa-trash-alt'></i>
                        </div>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  );
                })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Test;
