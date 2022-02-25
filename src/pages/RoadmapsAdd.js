import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/RoadmapsAdd.css';

const RoadmapsAdd = () => {
  return (
    <div id='body_main'>
      <div id='body_center_top'></div>
      <div id='body_center_name'><Link to="/roadmaps">로드맵</Link></div>
      
      <div style={{ width: '1200px', height: 'auto', textAlign: 'center', display: 'inline-block', }}>
          <div style={{ display: 'flex', }}>

              <div style={{ overflow: 'scroll', overflowX: 'hidden', width: '500px', height: '810px', backgroundColor: '#17173D', }}>
      
                <div id='roadmapsAdd_individe1'>
                    <div style={{ margin: '10px 0px 0px 10px', display: 'flex', }}>
                      <div id='roadmapsAdd_picture'></div>
                      <div style={{ width: '230px', height: '170px', margin: '10px', padding: '5px', textAlign: 'left', }}>
                        <div id='roadmapsAdd_hashtag'>해시태그</div>
                        <div id='roadmapsAdd_title'>이것은 제목입니다.</div>
                        <hr/>
                        <div id='roadmapsAdd_description'>이것은 제목입니다.</div>
                      </div>
                    </div>
                </div><hr/>

                <div id='roadmapsAdd_individe1'>
                    <div style={{ margin: '10px 0px 0px 10px', display: 'flex', }}>
                      <div id='roadmapsAdd_picture'></div>
                      <div style={{ width: '230px', height: '170px', margin: '10px', padding: '5px', textAlign: 'left', }}>
                        <div id='roadmapsAdd_hashtag'>해시태그</div>
                        <div id='roadmapsAdd_title'>이것은 제목입니다.</div>
                        <hr/>
                        <div id='roadmapsAdd_description'>이것은 제목입니다.</div>
                      </div>
                    </div>
                </div><hr/>

                <div id='roadmapsAdd_individe1'>
                    <div style={{ margin: '10px 0px 0px 10px', display: 'flex', }}>
                      <div id='roadmapsAdd_picture'></div>
                      <div style={{ width: '230px', height: '170px', margin: '10px', padding: '5px', textAlign: 'left', }}>
                        <div id='roadmapsAdd_hashtag'>해시태그</div>
                        <div id='roadmapsAdd_title'>이것은 제목입니다.</div>
                        <hr/>
                        <div id='roadmapsAdd_description'>이것은 제목입니다.</div>
                      </div>
                    </div>
                </div><hr/>

                <div id='roadmapsAdd_individe1'>
                    <div style={{ margin: '10px 0px 0px 10px', display: 'flex', }}>
                      <div id='roadmapsAdd_picture'></div>
                      <div style={{ width: '230px', height: '170px', margin: '10px', padding: '5px', textAlign: 'left', }}>
                        <div id='roadmapsAdd_hashtag'>해시태그</div>
                        <div id='roadmapsAdd_title'>이것은 제목입니다.</div>
                        <hr/>
                        <div id='roadmapsAdd_description'>이것은 제목입니다.</div>
                      </div>
                    </div>
                </div><hr/>

              </div>

              <div style={{ width: '200px', height: '810px', textAlign: 'center', backgroundColor: 'white', }}>
                <div style={{ width: '80px', height: '80px', margin: '330px 60px 20px 60px', fontSize: '48px', fontWeight: 'bolder', color: '#17173D', backgroundColor: '#45AFBE', }}>&gt;</div>
                <div style={{ width: '80px', height: '80px', margin: '0px 60px 20px 60px', fontSize: '48px', fontWeight: 'bolder', color: '#17173D', backgroundColor: '#45AFBE', }}>&lt;</div>
              </div>

              <div style={{ overflow: 'scroll', overflowX: 'hidden', width: '500px', height: '810px', backgroundColor: '#17173D', }}>
              
              <div id='roadmapsAdd_individe1'>
                    <div style={{ margin: '10px 0px 0px 10px', display: 'flex', }}>
                      <div id='roadmapsAdd_picture'></div>
                      <div style={{ width: '230px', height: '170px', margin: '10px', padding: '5px', textAlign: 'left', }}>
                        <div id='roadmapsAdd_hashtag'>해시태그</div>
                        <div id='roadmapsAdd_title'>이것은 제목입니다.</div>
                        <hr/>
                        <div id='roadmapsAdd_description'>이것은 제목입니다.</div>
                      </div>
                    </div>
                </div><hr/>

              </div>

          </div>

          <div style={{ margin: '10px 0px 10px 0px', textAlign: 'right', }}>
              <button><Link to='/roadmapsAdd2'>다음</Link></button>
          </div>
      </div>
    </div>
  );
}

export default RoadmapsAdd;