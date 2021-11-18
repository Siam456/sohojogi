import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Docdiray from './Docdiray';
const Test = (props) => {
    const { _id } = props.user;

    const [ profile, setprofile ] = useState({});

    let siamx = true;
    useEffect(() => {
        axios
      .get(`/user/${_id}`)
      .then((res) => {
        if (res) {
          //console.log(res.data.users);
          if (siamx) {
            setprofile(res.data.users);
            console.log(profile)
            
          }
        }
      })
      .catch((err) => console.log(err.response));

        return () => {
            siamx= false;
        }
    }, [])
    return (
        <>
        
            <Docdiray user={profile} />
        </>
    );
};

export default Test;