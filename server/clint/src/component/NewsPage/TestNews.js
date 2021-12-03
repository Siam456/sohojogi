import React from 'react';
import NewsTicker, { ref, Directions } from "react-advanced-news-ticker";

import './TestNews.css'
const TestNews = () => {
    return (
        <div id="nt-example1-container mb-5">
            <NewsTicker
                ref={ref}
                id="nt-example1"
                direction={Directions.UP}
                rowHeight={60}
                maxRows={2}
                duration={4000}>
                <div>Content 1</div>
                <div>Content 2</div>
                <div>Content 3</div>
                <div>Content 4</div>
            </NewsTicker>
        </div>
    );
};

export default TestNews;