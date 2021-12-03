import React, { useState, useEffect } from "react";
import axios from "axios";
import AllNews from './AllNews';
import BreakingNews from './BreakingNews';
import NewsCategory from './NewsCategory';
import TestNews from './TestNews';
import TrendingNews from './TrendingNews';
import AdvBanner from '../HomePage/AdvBanner';
const NewsPage = () => {

    const [getNews, setgetNews] = useState([]);

    //get data from api
	
	useEffect(() => {
        var unmount = true;
		axios
			.get("/news")
			.then((res) => {
				if (unmount) {
					setgetNews(res.data.news);
					//console.log(getNews);
				}
			})
			.catch((err) => console.log(err));

		return () => {
			unmount = false;
		};
	}, [getNews]);


    return (
        <div>
            <BreakingNews />
            <NewsCategory />
            <TrendingNews news={getNews} />
            <AdvBanner />
            {/* <TestNews /> */}
            <AllNews news={getNews} />
        </div>
    );
};

export default NewsPage;