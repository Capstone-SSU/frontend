import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../pages_css/Users.css';
import axios from 'axios';
import $ from 'jquery';
window.$ = $;

const Users = () => {
  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  //   }
  //   axios.get('http://54.180.150.167:8080/temp-login-success', {
  //   }).then((response) => { 
  //     // console.log(response) 
  //   }).catch((error) => { });
  // });

  return (
    <div>
      {/* <div id='body_center_top'></div>
      <button type="submit" id="users_login" className="button" onClick={() => {
        axios.patch('http://54.180.150.167:8080/users/5', null, {
          headers: {
              Authorization: 'Bearer '+ localStorage.getItem('token')
          }
        }).then((response)=>{
          console.log(response)
        }).catch((error) => { console.log(error); alert('정보 가져오기 실패') })
      }}>사용자 정보 가져오기</button> */}
    </div>
  );
}

export default Users;