import React, { useEffect, useState } from "react";
import RealTimeAgo from "react-time-ago";
import axios from "axios";
import { Link } from "react-router-dom";

const Replies = (props) => {
  const { _id, v , commentid } = props;
  //delete reply

  const [ reply, setreply ] = useState([]);
  

  //get replies

  let unmount = true;

  const getReplies = async() => {
      try{
          //console.log(commentid)
        const res = await axios(`/replies/${commentid}`);
        if(res) {
            if(unmount){
              setreply(res.data.response);
            }
            //console.log(reply);d
        }
      } catch(err){
          console.log(err);
      }
  }
  
  useEffect(() => {
      getReplies();

      return(() => {
        unmount = false
      })
      
  }, [reply])


  const deleteReply = (id) => {
    axios
      .delete(`/replies/${id}`)
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
            className='cwrapper'
            style={{ display: "flex", width: "100%" }}
          >
            <div className='imageWrapperDoc' style={{ width: "10%" }}>
              <img
                src={repliesUseravaterSource}
                alt='siams'
                height='25px'
                width='25px'
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div
              className='cwrapper'
              style={{
                background: "#F0F2F5",
                borderRadius: "10px",
              }}
            >
              <span>
                {replies.user._id === _id ? 
                <Link className='profile' to='/profile'>
                  {replies.user.name}
                </Link> :
                <Link className='profile' to={profilehrefreplies}>
                {replies.user.name}
              </Link> }
              </span>{" "}
              <br />
              <span className='text-muted'>{replies.text}</span>{" "}
              <span>
                {replies.replyAttachment ? (
                  <span style={{ padding: "10px" }}>
                    <br />
                    <img src={replyhrefAttachment} alt='siam' height='100px' />
                  </span>
                ) : (
                  <span></span>
                )}
              </span>
              <br />
              <span className='text-muted' style={{ fontSize: "13px" }}>
                <RealTimeAgo
                  date={Date.parse(replies.createdAt)}
                  locale='en-US'
                />
              </span>
            </div>
            {v.user.id === _id || replies.user.id === _id ? (
              <div
                onClick={() => deleteReply(replies._id)}
                className='text-muted'
                style={{
                  height: "100%",
                  marginTop: "auto",
                  marginBottom: "auto",
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
                <i className='fas fa-trash'></i>
              </div>
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
