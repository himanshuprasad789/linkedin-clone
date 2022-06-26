import React from "react";
import "./Widgets.scss";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import InfoIcon from "@mui/icons-material/Info";
const Widgets = () => {
  const newsArticle=(heading,subtitle)=>(
    <div className="widgets__article">
       <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
       </div>
       <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
       </div>
    </div>
  )
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>Linked News</h2>
        <InfoIcon />
      </div>

      {newsArticle('Dream and Plan','Get things Done')}
      {newsArticle('APIS','we need them')}
      {newsArticle('Redux was easy','do you think the same')}
      {newsArticle('SO was Debounce and Suspense','Woooooooooooo')}
      {newsArticle('useSWR','easy fetching and cache')}
      {newsArticle('Himanshu Rocks!!','coding is fun')}
    </div>
  );
};

export default Widgets;
