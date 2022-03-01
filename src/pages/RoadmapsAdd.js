import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/RoadmapsAdd.css';

const RoadmapsAdd = () => {
  return (
    <div id='body_main'>
      <div style={{ width: '1400px', height: '70px', backgroundColor: 'red',}}></div>
        <div id='body_center_name'><Link to="/roadmaps">로드맵</Link></div>

        <div style={{ width: '1400px', height: '180px', textAlign: 'center', display: 'inline-block', }}>

        <div style={{ display: 'inline-block'}}>
          <div id="roadmapsAdd_mainTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;제목<input /></div>
          <div id="roadmapsAdd_mainDescription">추천대상<input /></div>
        </div>
        
          <div style={{ display: 'flex', }}>
            
            <div className="roadmapsAdd_box" style={{ overflow: 'scroll', overflowX: 'hidden', width: '600px', height: '810px', backgroundColor: 'rgb(219, 219, 219)', }}>
    
              <div id='roadmapsAdd_individe1'>
                  <div style={{ margin: '10px 0px 0px 10px', display: 'flex', }}>
                    <div id='roadmapsAdd_picture'></div>
                    <div style={{ width: '230px', height: '170px', margin: '10px', padding: '5px', textAlign: 'left', }}>
                      <div id='roadmapsAdd_hashtag'>해시태그</div>
                      <div id='roadmapsAdd_title'>이것은 제목입니다.</div>
                      {/* <hr/>
                      <div id='roadmapsAdd_description'>이것은 제목입니다.</div> */}
                    </div>
                  </div>
              </div><hr/>

              <div id='roadmapsAdd_individe1'>
                  <div style={{ margin: '10px 0px 0px 10px', display: 'flex', }}>
                    <div id='roadmapsAdd_picture'></div>
                    <div style={{ width: '230px', height: '170px', margin: '10px', padding: '5px', textAlign: 'left', }}>
                      <div id='roadmapsAdd_hashtag'>해시태그</div>
                      <div id='roadmapsAdd_title'>이것은 제목입니다.</div>
                      {/* <hr/>
                      <div id='roadmapsAdd_description'>이것은 제목입니다.</div> */}
                    </div>
                  </div>
              </div><hr/>

              <div id='roadmapsAdd_individe1'>
                  <div style={{ margin: '10px 0px 0px 10px', display: 'flex', }}>
                    <div id='roadmapsAdd_picture'></div>
                    <div style={{ width: '230px', height: '170px', margin: '10px', padding: '5px', textAlign: 'left', }}>
                      <div id='roadmapsAdd_hashtag'>해시태그</div>
                      <div id='roadmapsAdd_title'>이것은 제목입니다.</div>
                      {/* <hr/>
                      <div id='roadmapsAdd_description'>이것은 제목입니다.</div> */}
                    </div>
                  </div>
              </div><hr/>

              <div id='roadmapsAdd_individe1'>
                  <div style={{ margin: '10px 0px 0px 10px', display: 'flex', }}>
                    <div id='roadmapsAdd_picture'></div>
                    <div style={{ width: '230px', height: '170px', margin: '10px', padding: '5px', textAlign: 'left', }}>
                      <div id='roadmapsAdd_hashtag'>해시태그</div>
                      <div id='roadmapsAdd_title'>이것은 제목입니다.</div>
                      {/* <hr/>
                      <div id='roadmapsAdd_description'>이것은 제목입니다.</div> */}
                    </div>
                  </div>
              </div><hr/>

            </div>

            <div style={{ width: '200px', height: '810px', textAlign: 'center', backgroundColor: 'white', }}>
              <div style={{ width: '80px', height: '80px', margin: '330px 60px 20px 60px', fontSize: '48px', fontWeight: 'bolder', color: '#45AFBE', backgroundColor: '#17173D', }}>&gt;</div>
              <div style={{ width: '80px', height: '80px', margin: '0px 60px 20px 60px', fontSize: '48px', fontWeight: 'bolder', color: '#45AFBE', backgroundColor: '#17173D', }}>&lt;</div>
            </div>

            <div className="roadmapsAdd_box" style={{ overflow: 'scroll', overflowX: 'hidden', width: '600px', height: '810px', backgroundColor: 'rgb(219, 219, 219)', }}>
            
              <div id='roadmapsAdd_individe1'>
                  <div style={{ margin: '10px 0px 0px 10px', display: 'flex', }}>
                    <div id='roadmapsAdd_picture'></div>
                    <div style={{ width: '230px', height: '170px', margin: '10px', padding: '5px', textAlign: 'left', }}>
                      <div id='roadmapsAdd_hashtag'>해시태그</div>
                      <div id='roadmapsAdd_title'>이것은 제목입니다.</div>
                      {/* <hr/>
                      <div id='roadmapsAdd_description'>이것은 제목입니다.</div> */}
                    </div>
                  </div>
              </div><hr/>

            </div>

          </div>

          <div style={{ margin: '10px 0px 10px 0px', textAlign: 'right', }}>
            <button className='button'><Link to='/roadmaps'>취소</Link></button>
            <button className='button'><Link to='/roadmapsAdd2'>다음</Link></button>
          </div>
      </div>
    </div>
  );
}

export default RoadmapsAdd;