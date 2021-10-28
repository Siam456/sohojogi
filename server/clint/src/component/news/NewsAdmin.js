import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './news.css'

const NewsAdmin = () => {

    const [ getNews, setgetNews ] = useState([]);

    const [news, setnews] = useState({
		title: "",
		content: "",
		description: '',
        catagory: 'Sports',
	});



	const [avater, setavater] = useState(null);
    const [newsId, setnewsId] = useState('');

    
    // //document.write(today);

    const [ Sdate, setSdate ] = useState('');

    
    //get data from api
    var unmount = true;
    useEffect(() => {
        axios.get('/news')
        .then(res => {
            if(unmount){
                setgetNews(res.data.news);
                //console.log(getNews);
            }
        })
        .catch(err => console.log(err))

        return(() => {
            unmount = false;
        })
    }, [getNews]);

    //store data into state
	const setval = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		//console.log(news)

		if (name === "avater") {
			setavater(e.target.files[0]);
		} else {
			setnews((prev) => {
				if (name === "title") {
					return {
						title: value,
                        content: prev.content,
                        description: prev.description,
                        catagory: prev.catagory,
					};
				} else if (name === "content") {
					return {
						title: prev.title,
                        content: value,
                        description: prev.description,
                        catagory: prev.catagory,
					};
				} else if (name === "description") {
					return {
						title: prev.title,
                        content: prev.content,
                        description: value,
                        catagory: prev.catagory,
					};
				} else if (name === "catagory") {
					return {
						title: prev.title,
                        content: prev.content,
                        description: prev.description,
                        catagory: value,
					};
				} 
			}); 
		}
	};

   

    //post news 
    const postNews = (e) => {
        e.preventDefault();
        //console.log(news)
        //console.log(avater)
        const errorPlaceHolder = document.querySelectorAll("p.ei-perror");
		for (let i = 0; i < errorPlaceHolder.length; i++) {
			errorPlaceHolder[i].textContent = "";
		}

        const errorinput = document.querySelectorAll("textarea.form-control");
		for (let i = 0; i < errorinput.length; i++) {
			errorinput[i].classList.remove('i-error');
            //console.log(errorinput[i])
		}

        const newNews = JSON.stringify(news);
		const data = new FormData();
		data.append("user", newNews);
		data.append("avater", avater);

        axios.post('/news', data)
        .then(res => {console.log(res)
            window.location.reload()})
        .catch(err => {
            const re = err.response.data;
            //console.log(re)
            if(re){
                Object.keys(re.errors).forEach((errorname) => {
					const errorPlaceholder = document.getElementById(
						`error-${errorname}`
					);
					errorPlaceholder.textContent = re.errors[errorname].msg;

                    //input fild
                    document.getElementById(errorname).classList.add('i-error');
				});
            } else{
                console.log('g error')
            }
        })
    }

    //store date for search
    const storeData = (e) => {
        setSdate(e.target.value);
    }

    //reset date
    const resetDate = () => {
        setSdate('')
    }

    //delete news
    const deletenews = (id) => {
        axios.delete(`/news/${id}`)
        .then(res => window.location.reload())
        .catch(err => console.log(err));
    }

    const editNews = (obje) => {
        //alert('a')
        setnewsId(obje._id);
        setnews({
            title: obje.title,
		    content: obje.content,
		    description: obje.description,
        });
        document.getElementById('submitButtonGroup').classList.add('hide');
        document.getElementById('editButtonGroup').classList.remove('hide');
    }

    //cancel edit
    const cancle = () => {
        setnews({
            title: "",
            content: "",
            description: '',
            catagory: 'Sports',
        });

        document.getElementById('submitButtonGroup').classList.remove('hide');
        document.getElementById('editButtonGroup').classList.add('hide');
    }

    //edit http function
    const editnewssubmit = () => {
        // console.log(news)
        // console.log(avater)
        // console.log(newsId)

        const errorPlaceHolder = document.querySelectorAll("p.ei-perror");
		for (let i = 0; i < errorPlaceHolder.length; i++) {
			errorPlaceHolder[i].textContent = "";
		}

        const errorinput = document.querySelectorAll("textarea.form-control");
		for (let i = 0; i < errorinput.length; i++) {
			errorinput[i].classList.remove('i-error');
            //console.log(errorinput[i])
		}

        const newNews = JSON.stringify(news);
		const data = new FormData();
		data.append("user", newNews);
		data.append("avater", avater);

        axios.patch(`/news/${newsId}`, data)
        .then(res => window.location.reload())
        .catch(err => {
            const re = err.response.data;
            //console.log(re)
            if(re){
                Object.keys(re.errors).forEach((errorname) => {
					const errorPlaceholder = document.getElementById(
						`error-${errorname}`
					);
					errorPlaceholder.textContent = re.errors[errorname].msg;

                    //input fild
                    document.getElementById(errorname).classList.add('i-error');
				});
            } else{
                console.log('g error')
            }
        })
    }

    return (
        <>
           <div className='container'>
               <div className='my-3' style={{textAlign: 'center'}}>
                   <h3 className='text-success'>Post news</h3>
                   <div className="container my-5">
                       <form method='POST' onSubmit={postNews} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <textarea onChange={setval} value={news.title} className="form-control" id="title" name='title' placeholder="Enter title" />
                                        <p id="error-title" className="ei-perror"></p> <br></br>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="content">Content</label>
                                        <textarea onChange={setval} value={news.content} className="form-control" id="content" name="content" placeholder="Enter content" />
                                        <p id="error-content" className="ei-perror"></p> <br></br>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea onChange={setval} value={news.description} className="form-control" id="description" name="description" placeholder="Enter description" />
                                <p id="error-description" className="ei-perror"></p> <br></br>    
                            </div> 

                            <div className="row">
                                <div className="col-sm">
                                <>
                                    <label htmlFor="catagory">Catagory</label>
                                    <select
                                        onChange={setval}
                                        id='catagory'
                                        name='catagory'
                                        className="form-select"
                                        aria-label="Default select example"
                                    >
                                        <option defaultValue="Sports">Sports</option>
                                        <option value="National">National</option>
                                        <option value="International">International</option>
                                        
                                        <option value="Entertainment">Entertainment</option>
                                        
                                    </select>
                                </>
                                </div>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile1">upload cover photo</label>
                                        <input
                                            type="file"
                                            name="avater"
                                            onChange={setval}
                                            className="form-control"
                                            required
                                        />
                                        
                                    </div>
                                </div>
                                
                            </div>                            
                            <br/>

                            <input id='submitButtonGroup' className='btn btn-success' type='submit' value='Submit' />
                            
                        </form>
                        <div style={{textAlign: 'left'}} className='hide' id='editButtonGroup'>
                            <button className='btn btn-primary' onClick={editnewssubmit} >Edit</button> &nbsp;
                            <button onClick={cancle} className='btn btn-secondary' >Cancel</button>
                        </div>

                        
                    </div>

                    <div>
                        <h3 className='text-success'>Preview</h3>
                        <div className='filterDate my-3'>
                            <p className='text-success' style={{width: '40%', margin: 'auto', height: '100%'}}>Filter date</p>
                            <input className="form-control" type="date" onChange={storeData} id="start" name="date"
                            min="2021-01-01" max="2023-12-31" />   <button onClick={resetDate} className='btn'><i className="fas fa-sync"></i></button> 
                        </div> <br></br>
                        <div style={{overflow: 'auto'}}>
                        <table className="table">
                            <thead>
                                <tr className='table-success'>
                                    <th scope="col">#</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Published Date</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getNews.map((v, i) => {

                                    //for check date
                                        var checkDAte = new Date(v.createdAt);
                                        var dd = String(checkDAte.getDate()).padStart(2, '0');
                                        var mm = String(checkDAte.getMonth() + 1).padStart(2, '0'); //January is 0!
                                        var yyyy = checkDAte.getFullYear();
                                        let cdate = yyyy + '-' + mm + '-' + dd ;
                                        const hrf = `/news/${v._id}`;


                                        let date = new Date(v.createdAt);
                                        let formattedDate = date.toDateString();

                                        
                                        const no = i+1;
                                        if(Sdate === ''){
                                            return(
                                                <tr key={i}>
                                                    <th scope="row">{no < 10 ? <span>0{no}</span>:no}</th>
                                                    <td>{v.author.name}</td>
                                                    <td>{formattedDate}</td>
                                                    <td>{v.title.length >= 10 ? v.title.slice(0,10)+'...' : v.title}</td>
                                                    <td style={{display: 'flex'}}>
                                                        <span style={{margin: 'auto'}}>
                                                            <a href={hrf} className='btn btn-success'><i className="fas fa-ellipsis-h"></i></a> &nbsp;
                                                            <button onClick={() => editNews(v)} className='btn btn-primary'  data-toggle="modal" data-target="#exampleModalLong"><i className="fas fa-pen"></i></button> &nbsp;
                                                            <button onClick={() => deletenews(v._id)} className='btn btn-danger'><i className="fas fa-times"></i></button>
                                                        </span>
                                                    </td>
                                                    
                                                </tr>
                                            )
                                        }
                                        if(cdate === Sdate){
                                            return(
                                                <tr key={i}>
                                                    <th scope="row">{no < 10 ? <span>0{no}</span>:no}</th>
                                                    <td>{v.author.name}</td>
                                                    <td>{formattedDate}</td>
                                                    <td>{v.title.length >= 10 ? v.title.slice(0,10)+'...' : v.title}</td>
                                                    <td style={{display: 'flex'}}>
                                                        <div style={{margin: 'auto'}}>
                                                        <a href={hrf} className='btn btn-success'><i className="fas fa-ellipsis-h"></i></a> &nbsp;
                                                            <button onClick={() => editNews(v)} className='btn btn-primary'  data-toggle="modal" data-target="#exampleModalLong"><i className="fas fa-pen"></i></button> &nbsp;
                                                            <button onClick={() => deletenews(v._id)} className='btn btn-danger'><i className="fas fa-times"></i></button>
                                                        </div>
                                                       
                                                    </td>
                                                </tr>
                                            )
                                        } else{
                                            //console.log('c' + cdate+ 's' + Sdate)
                                        }
                                })}
                                
                            </tbody>
                            
                            </table>

                        </div>
                    </div>
               </div>

            </div> 
        </>
    );
};

export default NewsAdmin;