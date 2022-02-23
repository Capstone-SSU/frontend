import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/Loadmap.css';

const Loadmap = () => {
  return (
    <div id='body_center'>
      <div id='body_center_top'></div>
      <div id='body_center_name'><Link to="/loadmap">로드맵</Link></div>
      <div id='loadmap_body_center_list'>
        <Link to="/loadmapList"><div id='loadmap_body_center_list_inner'></div></Link>
      </div>
      <div id='body_center_add'>
        <Link to="/loadmapAdd"><div id='body_center_add_circle'></div></Link>
      </div>
    </div>
  );
}

export default Loadmap;