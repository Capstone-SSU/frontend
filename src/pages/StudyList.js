import React from "react";
import '../pages_css/StudyList.css';

const StudyList = () => {
  return (
    <div id="body_center">
        <div id="body_center_top"></div>
        <div id="body_center_list">
            <div id="body_center_list_inner">
                <div id='body_center_list_inner_party'><button>참여하기</button></div>
                <div id ='body_center_list_inner_hashtag_peeple'><div id ='body_center_list_inner_hashtag'>해시태그</div><div id ='body_center_list_inner_peeple'>5/3</div></div>
                <div id='body_center_list_inner_onoff_location'><div id='body_center_list_inner_onoff'>온</div><div id='body_center_list_inner_location'>위치 | 스터디</div></div>
                <div id="body_center_list_inner_title">이것은 제목입니다.</div>
                <hr/>
                <div id="body_center_list_inner_description">
                    개천재가 쓴 내용입니다.<br/>
                    나는야 개천재.
                </div>
            </div>
        </div>
        <div id="body_center_chat_list">
            <div id="body_center_chat_list_inner">
                <div id='body_center_chat_list_inner_write'>
                    <button>댓글쓰기</button></div>
                <hr/>
                <div id='body_center_chat_list_inner_chat'>
                    <div id='body_center_list_inner_onoff_location'>
                        <div id='body_center_list_inner_profill'>프</div>
                        <div id='body_center_list_inner_location'>닉네임</div>
                    </div>
                    <div id="body_center_list_inner_description2">
                        개천재가 쓴 내용입니다.<br/>
                        나는야 개천재.
                    </div>
                    <hr/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default StudyList;