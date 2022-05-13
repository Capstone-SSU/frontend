import React from "react";
import Mypage from '../pages/Mypage';
import '../mypages_css/myCompany.css';

// axios.get('http://54.180.150.167:8080/users/' + $('#header_login').val() + '/', {
// }, localStorage.getItem('token')).then((response2) => {
// console.log(response2)
// document.getElementById('myProfile_main').innerHTML = MyProfileContentF(response2.data.data)
// }).catch();

const MyCompany = () => {
  return (
    <>
        <div id='body_flex' style={{ minWidth: '1176px', background: '#17173D'}}>
            <Mypage/>
            <div id='myProfile_body'>
                <div id='myProfile_top'></div>
                <div id="myProfile_main"></div>
            </div>
        </div>
    </>

  );
}

export default MyCompany;