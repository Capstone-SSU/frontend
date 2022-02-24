import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/LoadmapList.css';

const LoadmapList = () => {
  return (
    <div id='body_main'>

        <div id='body_center_top'></div>

        <div id='loadmapList_body_center_inner'>
            <div id='loadmapList_body_center_inner_line'>
                <div id='loadmapList_body_center_inner_line_top'></div>
                <div id='loadmapList_body_center_inner_line_circle'></div>
                <div id='loadmapList_body_center_inner_line_center'>
                    <div id='loadmapList_body_center_inner_line_blank1'></div>
                    <div id='loadmapList_body_center_inner_line_centerLine'></div>
                </div>
                <div id='loadmapList_body_center_inner_line_center'>
                    <div id='loadmapList_body_center_inner_line_blank2'></div>
                    <div id='loadmapList_body_center_inner_line_circle_last'></div>
                </div>
                <div id='loadmapList_body_center_inner_line_bottom'></div>
            </div>

            <div id='body_center_name'>
                나나나난 이것은 제목~
            </div>
            
            <div id='loadmapList_body_center_inner_button'><button>좋아요</button></div>

            <div id='loadmapList_body_center_inner_box'>
                <div id='loadmapList_body_center_inner_box_top'></div>
                <div id='loadmapList_body_center_inner_box_circle1'>1</div>
                <div id="loadmapList_body_center_inner_box_content">
                    <div id='loadmapList_body_center_inner_box_content_picture'></div>
                </div>
                <div id="loadmapList_body_center_inner_box_content">
                    <div id ='loadmapList_body_center_inner_box_content_hashtag'>해시태그</div>
                    <div id="loadmapList_body_center_inner_box_content_title">이것은 제목입니다.</div>
                    <hr/>
                    <div id="loadmapList_body_center_inner_box_content_description">
                        개천재가 쓴 내용입니다.<br/>
                        나는야 개천재.
                    </div>
                </div>
            </div>
            {/* <div id='loadmapList_body_center_inner_box'>
                <div id='loadmapList_body_center_inner_box_top'></div>
                <div id='loadmapList_body_center_inner_box_circle1'>1</div>
                <div id="loadmapList_body_center_inner_box_content">
                    <div id='loadmapList_body_center_inner_box_content_picture'></div>
                </div>
                <div id="loadmapList_body_center_inner_box_content">
                    <div id ='loadmapList_body_center_inner_box_content_hashtag'>해시태그</div>
                    <div id="loadmapList_body_center_inner_box_content_title">이것은 제목입니다.</div>
                    <hr/>
                    <div id="loadmapList_body_center_inner_box_content_description">
                        개천재가 쓴 내용입니다.<br/>
                        나는야 개천재.
                    </div>
                </div>
            </div> */}

            <div id='loadmapList_body_center_inner_line_center'>
                <div id='loadmapList_body_center_inner_bottom_top'></div>
                <div id='loadmapList_body_center_inner_bottom_peaple'>
                    추천대상 |
                </div>
            </div>
            <div id='loadmapList_body_center_inner_button'>
                <button>수정하기</button>
            </div>
        </div>
    </div>
  );
}

export default LoadmapList;