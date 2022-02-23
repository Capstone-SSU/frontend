import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/LoadmapList.css';

const LoadmapList = () => {
  return (
    <div id='body_center'>
        <div id='body_center_top'></div>
            <div id='loadmapList_body_center_inner'>
                <div id='loadmapList_body_center_inner_front'>
                    <div id='loadmapList_circle0'></div>
                    <div id='loadmapList_body_center_inner_front_inner'></div>
                    <div id='loadmapList_circle_last'></div>
                </div>
                <div id='body_center_name'>
                    제목
                </div>
                <div id='loadmapList_body_center_name_button'><button>좋아요</button></div>

                <div id='loadmapList_body_center_inner_box1'>
                    <div id='loadmapList_circle1'></div>
                    <div id="loadmapList_body_center_list_inner1">
                        <div id='loadmapList_body_center_list_inner_picture'></div>
                    </div>
                    <div id="loadmapList_body_center_list_inner2">
                        <div id ='loadmapList_body_center_list_inner_hashtag'>해시태그</div>
                        <div id="loadmapList_body_center_list_inner_title">이것은 제목입니다.</div>
                        <hr/>
                        <div id="loadmapList_body_center_list_inner_description">
                            개천재가 쓴 내용입니다.<br/>
                            나는야 개천재.
                        </div>
                    </div>
                </div>

                <div id='loadmapList_body_center_inner_box2'>
                    <div id='loadmapList_circle1'></div>
                </div>
                <div id='loadmapList_body_center_inner_update'>
                    <button>수정하기</button>
                </div>
            </div>
    </div>
  );
}

export default LoadmapList;