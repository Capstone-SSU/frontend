import * as React from 'react';
import Nav from './pages/Nav';
import Main from './pages/Main';
import Lectures from './pages/Lectures';
import LecturesList from './pages/LecturesList';
import LecturesAdd from './pages/LecturesAdd';
import LecturesUpdate from './pages/LecturesUpdate';
import LecturesDetail from './pages/LecturesDetail';
import Studies from './pages/Studies';
import StudiesList from './pages/StudiesList';
import StudiesAdd from './pages/StudiesAdd';
import StudiesUpdate from './pages/StudiesUpdate';
import Roadmaps from './pages/Roadmaps';
import RoadmapsAdd from './pages/RoadmapsAdd';
import RoadmapsUpdate from './pages/RoadmapsUpdate';
import RoadmapsList from './pages/RoadmapsList';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Users from './pages/Users';
import Mypage from './pages/Mypage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  // const [userInfo, setUserInfo] = React.useState("devstone");
  return (
    <Router>

      <Nav />
      <Routes>
        <Route path="/" exact={true} element={<Main />} />
        <Route path='/lectures' element={<Lectures />} />
        <Route path='/lectures/:lecturesId' element={<LecturesList />} />
        <Route path='/lecturesAdd' element={<LecturesAdd />} />
        <Route path='/lecturesUpdate/:lecturesId' element={<LecturesUpdate />} />
        <Route path='/lecturesDetail' element={<LecturesDetail />} />
        <Route path='/studies' element={<Studies />} />
        <Route path='/studies/:studyId' element={<StudiesList />} />
        <Route path='/studiesAdd' element={<StudiesAdd />} />
        <Route path='/studiesUpdate/:studyId' element={<StudiesUpdate />} />
        <Route path='/roadmaps' element={<Roadmaps />} />
        <Route path='/roadmaps/:roadmapsId' element={<RoadmapsList />} />
        <Route path='/roadmapsAdd' element={<RoadmapsAdd />} />
        <Route path='/roadmapsUpdate/:roadmapsId' element={<RoadmapsUpdate />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/users' element={<Users />} />
        <Route path='/mypage' element={<Mypage />} />
        {/* <Route exact path="/info" render={() => <Info userInfo={userInfo} />} /> */}
      </Routes>
    </Router>
  )
}

export default App;