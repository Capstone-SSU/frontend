import React from "react";
import '../pages_css/Lectures.css';
import tempImg from '../mainCoding.png';
import axios from "axios";

const Lectures = () => {
  return (
    <div>
      <div className="body-box">
        <div className="top_search_write_box">
          <SearchBar></SearchBar>
          <WriteButton></WriteButton>
        </div>
        <hr></hr>
        <Hashtag></Hashtag>
        <hr></hr>
        <div className="menu_name_box">
          <h2>추천강의</h2>
        </div>
        <div className="recommend_box">
          <img id="arrow" src={tempImg}></img>
          <RecommendLecture img={tempImg} title="강의제목 자바 알고리즘 문제풀이 : 코딩테스트 대비"
            star={5} review={67}></RecommendLecture>
          <RecommendLecture img={tempImg} title="강의제목 자바 알고리즘 문제풀이 : 코딩테스트 대비"
            star={5} review={67}></RecommendLecture>
          <RecommendLecture img={tempImg} title="강의제목 자바 알고리즘 문제풀이 : 코딩테스트 대비"
            star={5} review={67}></RecommendLecture>
          <RecommendLecture img={tempImg} title="강의제목 자바 알고리즘 문제풀이 : 코딩테스트 대비"
            star={5} review={67}></RecommendLecture>
          <RecommendLecture img={tempImg} title="강의제목 자바 알고리즘 문제풀이 : 코딩테스트 대비"
            star={5} review={67}></RecommendLecture>
          <img id="arrow" src={tempImg}></img>
        </div>

        <hr></hr>
        <Lecture img={tempImg}></Lecture>
      </div>
    </div>
  );
}

const Try = () => {
  axios.get('http://54.180.150.167:8080/lectures')
    .then(response => {
      console.log(response);
    });
}

const SearchBar = () => {
  return (
    <div className="search_bar">
      <form>
        <input type="text"></input>
        <button type="submit">검색</button>
      </form>
    </div>
  );
}

const WriteButton = () => {
  return (
    <div className="write_button">
      <button id="writeLectureButton">글쓰기</button>
    </div>
  );
}

const RecommendLecture = (props) => {
  return (
    <div className="recommend_lecture_box">
      <img id="lectureImage" src={props.img}></img>
      <p className="lecture_title">{props.title}</p>
      <div className="recommend_lecture_star">
        <p>⭐️⭐️⭐️⭐️⭐️</p>
        <p>({props.review})</p>
      </div>
    </div>
  );
}

const Lecture = (props) => {
  return (
    <div className="lecture_box">
      <img id="lectureImage" src={props.img}></img>
      <p class_name="lecture_title">개발자 강의 추천합니다 하하하하하하</p>
      <div className="lecture_sub_info">
        <p>코딩왕이될테야</p>
        <p>2022-02-17 19:44</p>
      </div>
    </div>
  );
}

const Hashtag = () => {
  return (
    <div className="hashtag">
      <p className="hashtag_text">Python</p>
    </div>
  );
}

const HashtagBox = () => {

}

export default Lectures;