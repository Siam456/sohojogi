import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    useParams
  } from "react-router-dom";

const Othersprofile = () => {
    const { id } = useParams();

    const [ profile, setprofile ] = useState({
        name: '',
        address: '',
        email: '',
        avater: '',
        phone: '',
        _id: ''

    });

    const getdata = async () => {
        try{
            const res = await axios.get(`/user/${id}`);
            if(res){
                setprofile(res.data.users)
            }
        } catch(err){
            console.log(err.response)
        }

    }

    useEffect(()=> {
        getdata();
    }, [`/user/${id}`])


    return (
        <div>
            {profile._id}
            {profile.name}
        </div>
    );
};

export default Othersprofile;