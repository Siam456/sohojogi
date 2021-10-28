import axios from "axios";
import React, { useEffect, useState } from "react";
import "./docdiary.css";
import RealTimeAgo from "react-time-ago";

const Docdiray = (props) => {
	const { name, avater, _id } = props.user;
	//var textfildStatus = true;
	const [textfildStatus, settextfildStatus] = useState(true);
	//console.log(props.user)
	const [status, setstatus] = useState("");
	const [getStatus, setgetStatus] = useState([]);

	const [comment, setcomment] = useState("");
	const [reply, setreply] = useState("");

	//visiblereply states for replies
	const [vreply, setvreply] = useState(true);
	const [prevIndex, setprevIndex] = useState(0);

	const [prevCommentIndex, setprevCommentIndex] = useState(0);

	//get status
	let unmount = true;
	useEffect(() => {
		if (status === "") {
			settextfildStatus(true);
		}
		axios
			.get("/status")
			.then((res) => {
				if (unmount) {
					setgetStatus(res.data.response);
				}
			})
			.catch((err) => console.log(err.message));

		return () => {
			unmount = false;
		};
	}, [getStatus]);

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

		let statusBody = {
			text: status,
		};
		axios
			.post("/status", statusBody)
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
	const showDelete = (i) => {
		if (deletecheck) {
			setdeletecheck(false);
			document.getElementById(`dbtn${i}`).classList.remove("hide");
		} else {
			setdeletecheck(true);
			document.getElementById(`dbtn${i}`).classList.add("hide");
		}
	};

	//deleteStatus
	const deleteStatus = (id) => {
		axios
			.delete(`/status/${id}`)
			.then((res) => console.log("ss"))
			.catch((err) => console.log(err.response));
	};

	//comment

	//store comment
	const storeComment = (e) => {
		setcomment(e.target.value);
		//setstarusId(document.getElementById('sId').textContent)
	};

	//visibleComment
	const [vcomment, setvcomment] = useState(true);
	const [prevI, setprevI] = useState(0);

	//post comment
	const postComment = (id, i) => {
		//e.preventDefault();
		console.log(id);
		document.getElementById(`sId${i}`).value = "";

		const body = {
			text: comment,
		};

		axios
			.post(`/comment/${id}`, body)
			.then((res) => {
				document.getElementById(`cv${i}`).classList.remove("hide");
				setvcomment(false);
			})
			.catch((err) => console.log(err.response));

		setcomment("");
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
		if (prevIndex === i && prevCommentIndex === n) {
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
	const storeReply = (e) => {
		setreply(e.target.value);
		//alert(reply)
	};

	const postreply = (id, i) => {
		//alert(repluinputId)
		document.getElementById(`repluinputId${i}`).value = "";

		const body = {
			text: reply,
		};

		axios
			.post(`/replies/${id}`, body)
			.then((res) => {
				console.log("res");
			})
			.catch((err) => console.log(err.response));

		setreply("");
	};

	return (
		<div className="py-4" style={{ background: "#dae2ed", minHeight: "100vh" }}>
			<h2 style={{ textAlign: "center" }} className="text-success py-4">
				Welcome to Doc Diary
			</h2>
			<div className="docWrapper">
				<h5 className="text-success">Post your Problem</h5>
				<div>
					<div style={{ display: "flex" }}>
						<div className="imageWrapperDoc">
							<img
								src={useravaterSource}
								alt="siams"
								height="50px"
								width="50px"
								style={{ borderRadius: "50%" }}
							/>
						</div>
						<textarea
							onChange={setStatus}
							style={{ backgroundColor: "#E4E6E9", borderRadius: "10px" }}
							className="form-control"
							value={status}
							placeholder={placeholderText}
						/>
					</div>
					{/* <div style={{
                        height: '1px', 
                        width: '90%', 
                        background: 'gray',
                        margin: 'auto',
                        marginTop: '15px',
                        marginBottom: '15px'
                        }}></div>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '70%', margin: 'auto'}}>
                        <p style={{fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto'}}>attach file</p>
                        <button style={{fontWeight: 'bold'}} className="fas fa-paperclip btn btn-light text-success"></button>
                    </div> */}
					<button
						onClick={postStatus}
						style={{ marginTop: "15px", width: "100%" }}
						type="submit"
						className="btn btn-dark"
						disabled={textfildStatus}
					>
						Post
					</button>
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
				return (
					<div key={i} className="docWrapper my-5">
						{/* header */}

						<div style={{ display: "flex", marginBottom: "1rem" }}>
							<div className="imageWrapperDoc" style={{ width: "10%" }}>
								<img
									src={statusUseravaterSource}
									alt="siams"
									height="50px"
									width="50px"
									style={{ borderRadius: "50%" }}
								/>
							</div>
							<div
								className="px-3 my-auto"
								style={{
									width: "90%",
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<div>
									<h6 style={{ marginBottom: "0" }}>{v.user.name}</h6>
									<p style={{ marginBottom: "0" }} className="text-muted">
										{formatedDate} <i className="fas fa-globe-europe"></i>
									</p>
								</div>
								{v.user.id === _id ? (
									<div style={{ textAlign: "right", position: "relative" }}>
										<div onClick={() => showDelete(i)} className="btn cbtn">
											<i className="fas fa-ellipsis-v"></i>
										</div>
										<div
											style={{ position: "absolute" }}
											className="hide"
											id={hide}
										>
											<div
												onClick={() => deleteStatus(v._id)}
												className="btn cbtn"
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

						<div className="px-4" style={{ wordWrap: "break-word" }}>
							{v.text.length < 50 ? (
								<span style={{ fontSize: "25px" }}>{v.text}</span>
							) : (
								<div>{v.text}</div>
							)}
						</div>

						{/* like & comment section */}

						<div
							className="my-3 mx-auto"
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
											onClick={() => likeUnlike(v)}
											className="fas fa-heart reactColor"
										></i>
									) : (
										<i
											onClick={() => likeUnlike(v)}
											className="far fa-heart reactColor"
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
								className="text-muted commentbtn"
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
							<div className="imageWrapperDoc" style={{ width: "10%" }}>
								<img
									src={useravaterSource}
									alt="siams"
									height="40px"
									width="40px"
									style={{ borderRadius: "50%" }}
								/>
							</div>
							<div
								style={{
									marginTop: "0",
									width: "100%",
									marginLeft: "10px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<input
									onChange={storeComment}
									style={{ background: "#F0F2F5", borderRadius: "15px" }}
									type="text"
									className="form-control commentinput"
									id={commentName}
									placeholder="Write a comment..."
								/>
								{/* <p  id={commentName}>{v._id}</p> */}
								<div onClick={() => postComment(v._id, i)} className="btn">
									<i className="far fa-paper-plane" disabled></i>
								</div>
							</div>
						</div>

						{/* comment get */}

						<span id={cv} className="hide">
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
									return (
										<div
											key={index}
											style={{
												display: "flex",
												width: "100%",
												marginTop: "15px",
											}}
										>
											<div className="imageWrapperDoc" style={{ width: "10%" }}>
												<img
													src={commnetUseravaterSource}
													alt="siams"
													height="40px"
													width="40px"
													style={{ borderRadius: "50%" }}
												/>
											</div>
											<div>
												<div
													className="cwrapper"
													style={{
														background: "#F0F2F5",
														borderRadius: "10px",
													}}
												>
													<span>{value.user.name}</span> <br />
													<span className="text-muted">{value.text}</span>{" "}
													<br />
												</div>
												<span
													className="cwrapper"
													style={{ fontWeight: "bold" }}
												>
													{value.likes.length === 0 ? (
														<span></span>
													) : (
														<span
                                                            className='reactColor'
                                                        >
                                                            {value.likes.length}
                                                        </span>
													)}{" "}
													{value.likes.includes(_id) ? (
														<span
															className="reactColor likeComment"
															onClick={() => commentLikeUnlike(value)}
														>
															{" "}
															Like
														</span>
													) : (
														<span
															className="reactColor likeComment"
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
													className="reactColor commentbtn"
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
													className="text-muted"
													style={{ fontSize: "13px" }}
												>
													<RealTimeAgo date={value.createdAt} locale="en-US" />
												</span>
												{/* reply section */}
												<div id={replySection} className="hide">
													{/* replies */}
													{value.replies.map((replies, ind) => {
														var repliesUseravaterSource;
														//console.log(replies.user)
														if (replies.user.avater) {
															repliesUseravaterSource =
																window.location.origin +
																`/userUpload/${replies.user.avater}`;
														} else {
															repliesUseravaterSource =
																"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04IQPD-wCoIQ3vpWQy5mjc1HTVrCP1ZvJyg&usqp=CAU";
														}

														return (
															<div
																key={ind}
																className="cwrapper"
																style={{ display: "flex", width: "100%" }}
															>
																<div
																	className="imageWrapperDoc"
																	style={{ width: "10%" }}
																>
																	<img
																		src={repliesUseravaterSource}
																		alt="siams"
																		height="25px"
																		width="25px"
																		style={{ borderRadius: "50%" }}
																	/>
																</div>
																<div
																	className="cwrapper"
																	style={{
																		background: "#F0F2F5",
																		borderRadius: "10px",
																	}}
																>
																	<span>{replies.user.name}</span> <br />
																	<span className="text-muted">
																		{replies.text}
																	</span>{" "}
																	<br />
																	<span
																		className="text-muted"
																		style={{ fontSize: "13px" }}
																	>
																		<RealTimeAgo
																			date={replies.createdAt}
																			locale="en-US"
																		/>
																	</span>
																</div>
															</div>
														);
													})}

													{/* write replies */}

													<div
														style={{
															display: "flex",
															width: "100%",
															marginLeft: "10px",
														}}
													>
														<div
															className="imageWrapperDoc"
															style={{ width: "10%" }}
														>
															<img
																src={useravaterSource}
																alt="siams"
																height="25px"
																width="25px"
																style={{ borderRadius: "50%" }}
															/>
														</div>
														<div
															style={{
																marginTop: "0",
																width: "100%",
																marginLeft: "10px",
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
															}}
														>
															<input
																onChange={storeReply}
																style={{
																	background: "#F0F2F5",
																	borderRadius: "15px",
																}}
																type="text"
																className="form-control commentinput"
																id={repluinputId}
																placeholder="Write a comment..."
															/>
															{/* <p  id={commentName}>{v._id}</p> */}
															<div
																onClick={() => postreply(value._id, i)}
																className="btn"
															>
																<i className="far fa-paper-plane" disabled></i>
															</div>
														</div>
													</div>
												</div>
											</div>
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

export default Docdiray;
