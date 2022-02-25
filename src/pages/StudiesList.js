import React from "react";
import '../pages_css/StudiesList.css';

const StudiesList = () => {
  return (
    <div id="body_main">
        <div id="body_center_top"></div>
        <div style={{ width: '100%', height: 'auto', textAlign: 'center', color: 'white', backgroundColor: '#17173D', }}>
            <div style={{ width: '50%', textAlign: 'left', display: 'inline-block',}}>
                <div style={{ width: '100%', margin: '10px 10px', textAlign: 'right', }}><button>참여하기</button></div>
                {/* <div style={{ width: '100%', margin: '20px 10px', display: 'flex', alignItems: 'center', }}>
                    <div id='studiesList_onoff'>프</div>
                    <div id='studiesList_location'>닉네임</div>
                </div> */}
                <div style={{ width: '100%', margin: '10px 10px', display: 'flex', }}>
                    <div style={{ width: '90%', textAlign: 'left', }}>해시태그</div>
                    <div style={{ width: '10%', textAlign: 'right', }}>5/3</div>
                </div>
                <div style={{ width: '100%', margin: '20px 10px', display: 'flex', alignItems: 'center', }}>
                    <div id='studiesList_onoff'>온</div>
                    <div id='studiesList_location'>위치 | 스터디</div>
                </div>
                <div id="studiesList_title">이것은 제목입니다.</div>
                <hr/>
                <div id="studiesList_description">
                    개천재가 쓴 내용입니다.<br/>
                    나는야 개천재.
                </div>
            </div>
        </div>


        <div style={{ width: '60%', textAlign: 'center', display: 'inline-block', }}>
            <div style={{ width: '100%', height: '100px', lineHeight: '150px', textAlign: 'right', }}>
                <button>댓글쓰기</button> {/* 취소 */}
            </div><hr/>
            <div style={{ width: '100%', height: 'auto', border: '3px solid rgb(219, 219, 219)', }}>
                <div style={{ width: '100%', margin: '20px 10px', display: 'flex', alignItems: 'center', }}>
                    <div id='studiesList_mine_chatProfill'>프</div>
                    <div id='studiesList_mine_chatNickname'>닉네임</div>
                </div>
                <div id='studiesList_mine_chatDescription'>
                    <input type='text' style={{ width: '600px', height: '50px', margin: '0px 0px 20px 0px', }}/>
                </div>
            </div>

            <div id='studiesList_chat'>
                {/* <div id='studiesList_chatIndivide2'>
                    <div style={{ width: '100%', margin: '20px 10px', display: 'flex', alignItems: 'center', }}>
                        <div id='studiesList_chatProfill'>프</div>
                        <div id='studiesList_chatNickname'>닉네임</div>
                    </div>
                    <div id='studiesList_chatDescription'>
                        개천재가 쓴 내용입니다.<br/>
                        나는야 개천재.
                        개천재가 쓴 내용입니다.<br/>
                        개천재가 쓴 내용입니다.<br/>
                        개천재가 쓴 내용입니다.
                    </div>
                </div><hr/> */}
                <div id='studiesList_chatIndivide1'>
                    <div style={{ width: '100%', margin: '20px 10px', display: 'flex', alignItems: 'center', }}>
                        <div id='studiesList_chatProfill'>프</div>
                        <div id='studiesList_chatNickname'>닉네임</div>
                    </div>
                    <div id='studiesList_chatDescription'>
                        개천재가 쓴 내용입니다.<br/>
                        나는야 개천재.
                    </div>
                </div><hr/>
            </div>
        </div>
    </div>
  );
}

export default StudiesList;