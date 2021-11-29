import React, { useState } from "react";
import RealTimeAgo from "react-time-ago";
import axios from "axios";
import { Link } from "react-router-dom";

const Replies = (props) => {
  const { _id, v , commentid, reply } = props;

  const [ editReply, setEditreply ] = useState('');
  const [editReplyAttachment, seteditReplyAttachment] = useState([]);
  const [editReplyAttachmentPriview, seteditReplyAttachmentPriview] = useState([]);


  //delete reply

  const deleteReply = (id) => {
    axios
      .delete(`/replies/${v._id}/${commentid}/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
  return (
    <div>
      {reply.map((replies, ind) => {
        var repliesUseravaterSource;
        //console.log(replies.user)
        if (replies.user.avater) {
          repliesUseravaterSource =
            window.location.origin + `/userUpload/${replies.user.avater}`;
        } else {
          repliesUseravaterSource =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04IQPD-wCoIQ3vpWQy5mjc1HTVrCP1ZvJyg&usqp=CAU";
        }

        let replyhrefAttachment =
          window.location.origin + `/replyUpload/${replies.replyAttachment}`;
        //console.log(replyhrefAttachment)
        const profilehrefreplies = `/profileOther/${replies.user.id}`;
        return (
          <div
            key={ind}
            className="cwrapper"
            style={{ display: "flex", width: "100%" }}
          >
            <div
              className="mt-3"
              style={{
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={repliesUseravaterSource}
                alt="siams"
                height="30px"
                width="30px"
              />
            </div>
            <div
              className="cwrapper"
              style={{
                background: "#F0F2F5",
                borderRadius: "10px",
              }}
            >
              <span>
                {replies.user._id === _id ? (
                  <Link className="profile" to="/profile">
                    {replies.user.name}
                  </Link>
                ) : (
                  <Link className="profile" to={profilehrefreplies}>
                    {replies.user.name}
                  </Link>
                )}
              </span>{" "}
              <br />
              <span className="text-muted">{replies.text}</span>{" "}
              <span>
                {replies.replyAttachment ? (
                  <span style={{ padding: "10px" }}>
                    <br />
                    <img src={replyhrefAttachment} alt="siam" height="100px" />
                  </span>
                ) : (
                  <span></span>
                )}
              </span>
              <br />
              <span className="text-muted" style={{ fontSize: "13px" }}>
                <RealTimeAgo
                  date={Date.parse(replies.createdAt)}
                  locale="en-US"
                />
              </span>
            </div>
            {v.user.id === _id || replies.user.id === _id ? (
              <span style={{ display: "flex" }}>
                <span>
                  <div
                    onClick={() => {
                      setEditreply(replies.text);
                      seteditReplyAttachment(replies.replyAttachment);
                    }}
                    data-toggle="modal"
                    data-target={
                      "#editreeplies" + v._id + commentid + replies.id
                    }
                    className="text-muted"
                    style={{
                      height: "100%",
                      marginTop: "auto",
                      marginBottom: "auto",
                      marginLeft: "10px",
                      cursor: "pointer",
                      width: "25px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i className="far fa-edit"></i>
                  </div>

                  {/* replies comment */}
                  <div
                    className="modal fade"
                    id={"editreeplies" + v._id + commentid + replies.id}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <span style={{ textAlign: "end", padding: "10px" }}>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                              setEditreply("");
                              seteditReplyAttachment([]);
                              seteditReplyAttachmentPriview([]);
                            }}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </span>
                        <div className="modal-body">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              let text = JSON.stringify(editReply);
                              const data = new FormData();
                              data.append("text", text);
                              data.append("attachment", editReplyAttachment);

                              axios
                                .put(`/replies/${v._id}/${commentid}/${replies.id}`, data)
                                .then((res) => console.log(res))
                                .catch((err) => console.log(err));
                            }}
                          >
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Write comment"
                              value={editReply}
                              required
                              onChange={(e) => {
                                setEditreply(e.target.value);
                              }}
                            />

                            <span style={{ display: "flex" }}>
                              {editReplyAttachmentPriview.length <= 0 ? (
                                replies.replyAttachment ? (
                                  <span style={{ padding: "10px" }}>
                                    <br />
                                    <img
                                      src={
                                        window.location.origin +
                                        `/replyUpload/${replies.replyAttachment}`
                                      }
                                      alt="siam"
                                      height="100px"
                                    />
                                  </span>
                                ) : (
                                  <span></span>
                                )
                              ) : (
                                <span style={{ padding: "30px" }}>
                                  <img
                                    src={editReplyAttachmentPriview}
                                    alt="siam"
                                    height="100px"
                                  />
                                </span>
                              )}

                              <input
                                type="file"
                                id={"editFild" + v._id + commentid + replies.id}
                                style={{ display: "none" }}
                                onChange={(e) => {
                                  seteditReplyAttachment(e.target.files[0]);

                                  const render = new FileReader();
                                  render.onloadend = () => {
                                    seteditReplyAttachmentPriview(
                                      render.result
                                    );
                                  };
                                  render.readAsDataURL(e.target.files[0]);
                                }}
                              />
                              <label
                                htmlFor={
                                  "editFild" + v._id + commentid + replies.id
                                }
                                style={{
                                  height: "100px",
                                  margin: "30px",
                                  width: "100px",
                                  background: "#DAE2ED",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "10px",
                                }}
                              >
                                +
                              </label>
                            </span>
                            <button className="btn btn-primary">
                              Submit Edit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>

                <div
                  onClick={() => deleteReply(replies.id)}
                  className="text-muted"
                  style={{
                    height: "100%",
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginLeft: "10px",
                    cursor: "pointer",
                    width: "25px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i className="fas fa-trash"></i>
                </div>
              </span>
            ) : (
              <span></span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Replies;
