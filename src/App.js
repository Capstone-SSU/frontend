import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
// window.$ = $;

import Nav from "./containers/header/Nav";
import Main from "./containers/main/Main";
import Lectures from "./containers/lectures/Lectures";
import LecturesAdd from "./containers/lectures/LecturesAdd";
import LecturesList from "./containers/lectures/LecturesList";
import LecturesReviewAdd from "./containers/lectures/LecturesReviewAdd";
import LecturesReviewUpdate from "./containers/lectures/LecturesReviewUpdate";
import Studies from "./containers/studies/Studies";
import StudiesList from "./containers/studies/StudiesList";
import StudiesAdd from "./containers/studies/StudiesAdd";
import StudiesUpdate from "./containers/studies/StudiesUpdate";
import Roadmaps from "./containers/roadmaps/Roadmaps";
import RoadmapsList from "./containers/roadmaps/RoadmapsList";
import RoadmapsAdd from "./containers/roadmaps/RoadmapsAdd";
import RoadmapsUpdate from "./containers/roadmaps/RoadmapsUpdate";
import Signin from "./containers/sign/Signin";
import Signup from "./containers/sign/Signup";
import OtherProfile from "./containers/mypages/otherProfile";
import MyProfile from "./containers/mypages/myProfile";
import MyCompany from "./containers/mypages/myCompany";
import MyLikeReviews from "./containers/mypages/my_reviews/myLikeReviews";
import MyLikeStudies from "./containers/mypages/my_studies/myLikeStudies";
import MyLikeRoadmaps from "./containers/mypages/my_roadmaps/myLikeRoadmaps";
import MyWriteLectures from "./containers/mypages/my_lectures/myWriteLectures";
import MyWriteReviews from "./containers/mypages/my_reviews/myWriteReviews";
import MyWriteStudies from "./containers/mypages/my_studies/myWriteStudies";
import MyWriteRoadmaps from "./containers/mypages/my_roadmaps/myWriteRoadmaps";

function App() {
  const [session, setSession] = useState(false);
  let [auth, setAuth] = useState({});
  useEffect(()=>{
    console.log(localStorage.jwToken);
    axios({
      url: '/api/signin-success',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : localStorage.jwToken,
      },
    }).then((res)=>{
      console.log(res);
      if (res.data.msg == "로그인 확인") setSession(true);
      else setSession(false);
    })
   .catch((err)=>{
      console.log(err);
      setSession(false);
    })

    axios({
      url: '/api/auth',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : localStorage.jwToken,
      },
    }).then((res)=>{
      console.log(res);
      auth = res.data.data;
      setAuth(auth);
    })
   .catch((err)=>{
      console.log(err);
    })
  },[]);
  return (
    <Router>
        <Nav session={session}/>
        <Routes>
          <Route path="/" exact={true} element={<Main />} />

          <Route path='/lectures' element={<Lectures session={session}/>} />
          <Route path='/lectures/:lecturesId' element={<LecturesList session={session} auth={auth}/>} />
          <Route path='/lecturesAdd' element={<LecturesAdd />} />
          
          <Route path='/lecturesReviewAdd' element={<LecturesAdd />} />
          <Route path='/lecturesReviewAdd/:lecturesId' element={<LecturesReviewAdd />} />
          <Route path='/lecturesReviewUpdate/:lecturesId' element={<LecturesReviewUpdate />} />

          <Route path='/studies' element={<Studies session={session}/>} />
          <Route path='/studies/:studyId' element={<StudiesList session={session} auth={auth} />} />
          <Route path='/studiesAdd' element={<StudiesAdd />} />
          <Route path='/studiesUpdate/:studyId' element={<StudiesUpdate session={session}/>} />
          
          <Route path='/roadmaps' element={<Roadmaps session={session}/>} />
          <Route path='/roadmaps/:roadmapsId' element={<RoadmapsList session={session} auth={auth} />} />
          <Route path='/roadmapsAdd' element={<RoadmapsAdd auth={auth} />} />
          <Route path='/roadmapsUpdate/:roadmapsId' element={<RoadmapsUpdate session={session} auth={auth} />} />
          
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          
          <Route path='/otherprofile/:nickname' element={<OtherProfile session={session} />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/mycompany' element={<MyCompany />} />
          <Route path='/mylikereviews' element={<MyLikeReviews auth={auth} />} />
          <Route path='/mylikestudies' element={<MyLikeStudies auth={auth} />} />
          <Route path='/mylikeroadmaps' element={<MyLikeRoadmaps auth={auth} />} />
          <Route path='/mywritelectures' element={<MyWriteLectures />} />
          <Route path='/mywritereviews' element={<MyWriteReviews auth={auth} />} />
          <Route path='/mywritestudies' element={<MyWriteStudies auth={auth} />} />
          <Route path='/mywriteroadmaps' element={<MyWriteRoadmaps auth={auth} />} />
          {/* <Route exact path="/info" render={() => <Info userInfo={userInfo} />} /> */}
        </Routes>
    </Router>
  )
}

export default App;