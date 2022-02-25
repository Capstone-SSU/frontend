import * as React from 'react';
import Nav from './pages/Nav';
import Main from './pages/Main';
import Lectures from './pages/Lectures';
import Studies from './pages/Studies';
import StudiesAdd from './pages/StudiesAdd';
import StudiesList from './pages/StudiesList';
import Roadmaps from './pages/Roadmaps';
import RoadmapsAdd from './pages/RoadmapsAdd';
import RoadmapsAdd2 from './pages/RoadmapsAdd2';
import RoadmapsList from './pages/RoadmapsList';
import Signin from './pages/Signin';
import Users from './pages/Users';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  // const [userInfo, setUserInfo] = React.useState("devstone");
  return (
    <Router>
        <Nav/>
        <Routes>
          <Route path="/" exact={true} element={<Main/>} />
          <Route path='/lectures' element={<Lectures/>} />
          <Route path='/studies' element={<Studies/>} />
          <Route path='/studiesAdd' element={<StudiesAdd/>} />
          <Route path='/studiesList' element={<StudiesList/>} />
          <Route path='/roadmaps' element={<Roadmaps/>} />
          <Route path='/roadmapsAdd' element={<RoadmapsAdd/>} />
          <Route path='/roadmapsAdd2' element={<RoadmapsAdd2/>} />
          <Route path='/roadmapsList' element={<RoadmapsList/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/users' element={<Users/>} />
          {/* <Route exact path="/info" render={() => <Info userInfo={userInfo} />} /> */}
        </Routes>
    </Router>
  )
}

export default App;