import React from 'react'
import { Link } from 'react-router';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/fontawesome-free-solid'

const NavBar = (props) => {
  let navBar
  if (document.getElementById('userInfo')) {
    let userName = document.getElementById('userInfo').innerHTML
    // let userPhoto = document.getElementById('userPhoto').innerHTML
    navBar = (
      <div>
        <div id='signOutLinkDiv'>
          <a href='users/sign_out'>X</a>
        </div>
        <div id='userNameDiv'>
          {userName}
        </div>
        <div id='userPhotoDiv'>
        </div>
        <Link to='/stats'>
          <div id='myStatsLinkDiv'>Stats</div>
        </Link>
      </div>
    )
  } else {
    navBar =(
      <div id='navBar'>
        <a href='users/sign_up'><div id='signUpLinkDiv'>Sign Up</div></a>
        <a href='users/sign_in'><div id='signInLinkDiv'>Sign In</div></a>
      </div>
    )
  }
  return(
    <div id='gameContainer'>
      <div id='siteTitle'>
        <Link to='/'><div id='homeLinkDiv'>Reactions<FontAwesomeIcon icon={faBullseye} id='logoTarget'/>js</div></Link>
      </div>
      <div id='upperNavPanel'>
        {navBar}
      </div>
      {props.children}
    </div>
  )
}
export default NavBar

// </div>
// <li><%= link_to 'Sign Out', destroy_user_session_path, method: :delete %></li>
// <li id='userName'><%= current_user.user_name %></li>
// <li><%= link_to 'Sign Up', new_user_registration_path %></li>
// <li><%= link_to 'Sign In', new_user_session_path %></li>
