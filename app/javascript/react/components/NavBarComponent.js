import React from 'react'
import { Link } from 'react-router';

const NavBar = (props) => {
  let navBar
  if (document.getElementById('userInfo')) {
    let userName = document.getElementById('userInfo').innerHTML
    // let userPhoto = document.getElementById('userPhoto').innerHTML
    navBar = (
      <div id='navBar'>
        <div id='homeLinkDiv'>
          <Link to='/'>Reactions.js</Link>
        </div>
      <div id='signInLinkDiv'>
        <a href='users/sign_out'>Sign Out</a>
      </div>
      <div id='userNameDiv'>
        {userName}
      </div>
      <div id='userPhotoDiv'>
      </div>
    </div>
    )
  } else {
    navBar =(
      <div id='navBar'>
        <div id='homeLinkDiv'>
          <Link to='/'>Reactions.js</Link>
        </div>
      <div id='signUpLinkDiv'>
        <a href='users/sign_up'>Sign Up</a>
      </div>
      <div id='signInLinkDiv'>
        <a href='users/sign_in'>Sign In</a>
      </div>
    </div>
    )
  }
  return(
    navBar
  )
}
export default NavBar

// </div>
// <li><%= link_to 'Sign Out', destroy_user_session_path, method: :delete %></li>
// <li id='userName'><%= current_user.user_name %></li>
// <li><%= link_to 'Sign Up', new_user_registration_path %></li>
// <li><%= link_to 'Sign In', new_user_session_path %></li>
