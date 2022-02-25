import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/RoadmapsAdd2.css';

const RoadmapsAdd2 = () => {
  return (
    <div id='body_main'>

        <div id='body_center_top'></div>

        <div style={{ width: '1200px', display: 'inline-block', }}>
            <div style={{ width: '100px', height: '100px', position: 'absolute', textAlign: 'center',}}>
                <div style={{ width: '100%', height: '100px', }}></div>
                <div style={{ width: '100px', height: '100px', Zindex: '997', borderRadius: '50%', backgroundColor: '#45AFBE', }}></div>
                <div class='roadmapsAdd2_flex'>
                    <div style={{ width: '45px', height: '10px', left: '45%', Zindex: '997', textAlign: 'center', }}></div>
                    <div id='roadmapsAdd2_centerLine'></div>
                </div>
                <div class='roadmapsAdd2_flex'>
                    <div style={{ width: '35px', height: '10px', left: '45%', Zindex: '997', textAlign: 'center', }}></div>
                    <div style={{ width: '30px', height: '30px', left: '35%', Zindex: '997', borderRadius: '50%', backgroundColor: '#45AFBE', }}></div>
                </div>
            </div>

            <div id='body_center_name'>
                <input/>
            </div>
            
            <div style={{ margin: '10px 10px', textAlign: 'right', }}><div style={{ width: '110px', height: '38px', }}></div></div>

            <div id='roadmapsAdd2_box1'>
                <div style={{ width: '60px', height: '60px', }}></div>
                <div id='roadmapsAdd2_circle1'>1</div>
                <div style={{ width: '43%', textAlign: 'center', }}>
                    <div style={{ width: '450px', height: '350px', textAlign: 'center', display: 'inline-block', backgroundColor: 'gray', }}></div>
                </div>
                <div id="roadmapsAdd2_flex">
                    <div id ='roadmapsAdd2_hashtag'>해시태그</div>
                    <div id="roadmapsAdd2_title">이것은 제목입니다.</div>
                    <hr/>
                    <div id="roadmapsAdd2_description">
                        개천재가 쓴 내용입니다.<br/>
                        나는야 개천재.
                    </div>
                </div>
            </div>

            {/* <div id='roadmapsAdd2_box1'>
                <div style={{ width: '60px', height: '60px', }}></div>
                <div id='roadmapsAdd2_circle1'>1</div>
                <div style={{ width: '43%', textAlign: 'center', }}>
                    <div style={{ width: '450px', height: '350px', textAlign: 'center', display: 'inline-block', backgroundColor: 'gray', }}></div>
                </div>
                <div id="roadmapsAdd2_flex">
                    <div id ='roadmapsAdd2_hashtag'>해시태그</div>
                    <div id="roadmapsAdd2_title">이것은 제목입니다.</div>
                    <hr/>
                    <div id="roadmapsAdd2_description">
                        개천재가 쓴 내용입니다.<br/>
                        나는야 개천재.
                    </div>
                </div>
            </div> */}

            <div class='roadmapsAdd2_flex'>
                <div style={{ width: '100px', height: '35px', }}></div>
                <div style={{ height: '35px', lineHeight: '80px', fontSize: '20px', color: '#17173D', fontWeight: 'bolder', }}>
                    추천대상 | <input/>
                </div>
            </div>
            <div style={{ margin: '10px 10px', textAlign: 'right', }}>
                <button><Link to='/roadmaps'>글추가</Link></button>
            </div>
        </div>
    </div>
  );
}

export default RoadmapsAdd2;