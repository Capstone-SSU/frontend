import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/LoadmapAdd.css';

const LoadmapAdd = () => {
  return (
    <div id='body_main'>
      <div id='body_center_top'></div>
      <div id='body_center_name'><Link to="/loadmap">로드맵</Link></div>
      <div id='loadmapAdd_body_center_list'>
        <div id='loadmapAdd_body_center_list_inner'>
            <div id='loadmapAdd_body_center_list_inner2'>
                <div id='loadmapAdd_body_center_list_inner_1'>

                </div>
                <div id='loadmapAdd_body_center_list_inner_center'>

                </div>
                <div id='loadmapAdd_body_center_list_inner_2'>
                    
                </div>
            </div>
            <div id='loadmapAdd_body_center_inner_next'>
                <button>다음</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LoadmapAdd;