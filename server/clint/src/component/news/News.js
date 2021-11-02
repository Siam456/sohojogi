import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const News = () => {
    const {id} = useParams();

    const [ getNews, setgetNews ] =useState([])

    var avater = 'https://videohive.img.customer.envatousercontent.com/files/52597691/Preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=99df3b202f76fda3f3cf5c63a0c2352b';
    //get data from api
    var unmount = true;
    useEffect(() => {
        axios.get(`/news/${id}`)
        .then(res => {
            if(unmount){
                setgetNews(res.data.news[0]);
                //console.log(getNews);
                if(res.data.news[0].newsCoverPhoto){
                    avater = window.location.origin + `/newsCover/${res.data.news[0].newsCoverPhoto}`;
                }
                //console.log(avater)
            }
        })
        .catch(err => console.log(err))

        return(() => {
            unmount = false;
        })
        
    }, [getNews]);
    return (
        <>
            <div className='container'>
                <br/>
                <br/>
                <h2>{getNews.title}</h2>
                <p className='text-muted'><i className="fas fa-globe-europe"></i> {getNews.catagory}</p>
                <p >Published At: {new Date(getNews.createdAt).toDateString()}</p>
                {getNews.newsCoverPhoto ? 
                <img src={window.location.origin + `/newsCover/${getNews.newsCoverPhoto}`} alt='news img' width= '100%' />
            : <img src={window.location.origin + `/newsCover/${avater}`} alt='news img' width= '100%' />}
            <p></p>
            {/* <p className='text-muted'><i className="fas fa-globe-europe"></i> {getNews.author.name}</p> */}
            <br/>
            <h3>{getNews.content}</h3>
            <br/> 
            <p>{getNews.description}</p>
            </div>
        </>
    );
};

export default News;