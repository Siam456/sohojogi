import React, {useEffect,useState} from 'react';
import './profile.css'

const Profile = (props) => {
    const { _id, name, email, phone, avater, address } = props.user;
    const [image,setimage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04IQPD-wCoIQ3vpWQy5mjc1HTVrCP1ZvJyg&usqp=CAU');
    useEffect(() => {
        if(avater){
            setimage(window.location.origin + `/userUpload/${avater}`);
        }
    })
    return (
        <div className='container'>
            <div className='descriptionWrapper'>
            <div className="container">
                <div className="row my-5">
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        <div style={{borderRadius: '50%',
                         width: '200px',
                          height: '200px',
                           overflow: 'hidden',
                           border: '2px solid #96bae3',
                           margin: 'auto'}}>
                            <img src={image} alt='siam' height='200px'  />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-8 my-2">
                        <div style={{height: '100%',
                         display: 'flex',
                          justifyContent: 'center',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          padding: '10px',
                          background: '#D1E7DD'}}>
                            <table className="table table-success m-0">
                                
                                <tbody >
                                    <tr style={{borderBottom: '1px solid #d5d9de'}}>
                                        <td>Name:</td>
                                        <td>{name}</td>
                                    </tr>
                                    <tr style={{borderBottom: '1px solid #d5d9de'}}>
                                        <td>Email: </td>
                                        <td>{email}</td>
                                    </tr>
                                    <tr style={{borderBottom: '1px solid #d5d9de'}}>
                                        <td>Phone:</td>
                                        <td>{phone}</td>
                                    </tr>
                                    <tr style={{borderBottom: '1px solid #d5d9de'}}>
                                        <td>Address:</td>
                                        <td>{address}</td>
                                    </tr>
                                </tbody>
        
                            </table>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
            
        </div>
    );
};

export default Profile;