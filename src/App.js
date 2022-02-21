import logo from './logo.png';
import search from './search.png';
import './App.css';

var login = true

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <div className="header_main">
          <div id="header_main_logo" className="header_main_inner">
            <div className="header_main_inner2"><a href="/main"><img id="logo" name="logo" src={logo}/></a></div>
            <div className="header_main_inner3"><a href="/lecture">강의평</a></div>
            <div className="header_main_inner3"><a href="/study">스터디</a></div>
            <div className="header_main_inner3"><a href="/loadmap">로드맵</a></div>
          </div>
          <div id="header_main_center2" className="header_main_inner"></div>
          <div id="header_main_login" className="header_main_inner">
            <div className="header_main_inner3">{login ? <a href="">로그인</a> : <a href="">마이페이지</a>}</div>
          </div>
        </div>
      </header>

      <body>
        <div className="body_center">
          <div className="body_center_main">
            <div id='body_center_top'></div>
            <div id='body_center_name'><a href='/study'>스터디</a></div>
            <div id='body_center_search'>
              <div id="body_center_inner_search1" className="body_center_inner_search">
                <input href='' />
                <img id="search" name="search" src={search}/>
              </div>
              <div className="body_center_inner_search"><a href=''>카테고리</a></div>
              <div className="body_center_inner_search1"><a href=''>지역</a></div>
            </div><hr/>
            <div id='body_center_hashtag'>

            </div><hr/>
            <div id='body_center_list'>

            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;