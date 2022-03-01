import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/RoadmapsList.css';

const RoadmapsList = () => {
  return (
    <div id='body_main'>

        <div id='body_center_top'></div>

        <div style={{ width: '1200px', display: 'inline-block', }}>
            <div style={{ width: '100px', height: '100px', position: 'absolute', textAlign: 'center',}}>
                <div style={{ width: '100%', height: '100px', }}></div>
                <div style={{ width: '100px', height: '100px', Zindex: '997', borderRadius: '50%', backgroundColor: '#45AFBE', }}></div>
                <div class='roadmapsList_flex'>
                    <div style={{ width: '45px', height: '10px', left: '45%', Zindex: '997', textAlign: 'center', }}></div>
                    <div id='roadmapsList_centerLine'></div>
                </div>
                <div class='roadmapsList_flex'>
                    <div style={{ width: '35px', height: '10px', left: '45%', Zindex: '997', textAlign: 'center', }}></div>
                    <div style={{ width: '30px', height: '30px', left: '35%', Zindex: '997', borderRadius: '50%', backgroundColor: '#45AFBE', }}></div>
                </div>
            </div>

            <div id='body_center_name'>
                나나나난 이것은 제목~
            </div>
            
            <div style={{ margin: '10px 10px', textAlign: 'right', }}><button className="button">좋아요</button></div>

            <div id='roadmapsList_box1'>
                <div style={{ width: '60px', height: '60px', }}></div>
                <div id='roadmapsList_circle1'>1</div>
                <div style={{ width: '43%', textAlign: 'center', }}>
                    <div style={{ width: '450px', height: '350px', textAlign: 'center', display: 'inline-block', backgroundColor: 'gray', }}></div>
                </div>
                <div id="roadmapsList_flex">
                    <div id ='roadmapsList_hashtag'>해시태그</div>
                    <div id="roadmapsList_title">이것은 제목입니다.</div>
                    <hr/>
                    <div id="roadmapsList_description">
                        개천재가 쓴 내용입니다.<br/>
                        나는야 개천재.
                    </div>
                </div>
            </div>

            {/* <div id='roadmapsList_box1'>
                <div style={{ width: '60px', height: '60px', }}></div>
                <div id='roadmapsList_circle1'>1</div>
                <div style={{ width: '43%', textAlign: 'center', }}>
                    <div style={{ width: '450px', height: '350px', textAlign: 'center', display: 'inline-block', backgroundColor: 'gray', }}></div>
                </div>
                <div id="roadmapsList_flex">
                    <div id ='roadmapsList_hashtag'>해시태그</div>
                    <div id="roadmapsList_title">이것은 제목입니다.</div>
                    <hr/>
                    <div id="roadmapsList_description">
                        개천재가 쓴 내용입니다.<br/>
                        나는야 개천재.
                    </div>
                </div>
            </div> */}

            <div class='roadmapsList_flex'>
                <div style={{ width: '100px', height: '35px', }}></div>
                <div style={{ height: '35px', lineHeight: '80px', fontSize: '20px', color: '#17173D', fontWeight: 'bolder', }}>
                    추천대상 |
                </div>
            </div>
            <div style={{ margin: '10px 10px', textAlign: 'right', }}>
                <button className="button">수정하기</button>
            </div>
        </div>
    </div>
  );
}

export default RoadmapsList;