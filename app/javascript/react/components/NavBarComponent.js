import React from 'react'
import { Link } from 'react-router';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/fontawesome-free-solid'

const NavBar = (props) => {
  let navBar
  if (document.getElementById('userInfo')) {
    let userName = document.getElementById('userName').innerHTML
    // let userPhoto = document.getElementById('userPhoto').innerHTML
    navBar = (
      <div>
        <a href='users/sign_out'>
        <div id='signOutLinkDiv'>
          X
        </div></a>
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
        <a href='users/auth/facebook'><div id='signUpLinkDiv'>Sign Up</div></a>
        <a href='users/auth/facebook'><div id='signInLinkDiv'>Sign In</div></a>
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
