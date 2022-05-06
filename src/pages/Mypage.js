import React from "react";
import '../pages_css/Mypage.css';

const Mypage = () => {
  return (
    <div className="body_main">

      <div className="left_menu_box">
        <p className="bigMenu">프로필</p>
        <p className="smallMenu">정보수정</p>
        <p className="smallMenu">소속인증</p>

        <p className="bigMenu">좋아요</p>
        <p className="smallMenu">강의리뷰</p>
        <p className="smallMenu">스터디</p>
        <p className="smallMenu">로드맵</p>

        <p className="bigMenu">작성한</p>
        <p className="smallMenu">강의리뷰</p>
        <p className="smallMenu">스터디</p>
        <p className="smallMenu">로드맵</p>


      </div>
      <div className="right_content_box">

      </div>
    </div>

  );
}

const BigMenuBox = (props) => {

  for (var i = 0; i < Number(props.number); i++) {

  }
  return (
    <div>
      <b id="bigMenuTitle">{props.bigmenu}</b>
      <div className="smallMenuBox">
        <SmallMenu smallMenu="메뉴111"></SmallMenu>
        <SmallMenu smallMenu="메뉴111"></SmallMenu>
        <SmallMenu smallMenu="메뉴111"></SmallMenu>
      </div>
    </div>

  );
}

const SmallMenu = (props) => {
  return (
    <div>
      <b id="smallMenuTitle">{props.smallMenu}</b>
    </div>
  );
}

export default Mypage;