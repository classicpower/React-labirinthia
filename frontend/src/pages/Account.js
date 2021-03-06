import React from 'react';
import Intro from '../components/Intro/Intro';
import User from '../components/User/User';
import Characters from '../components/Characters/Characters';
import Wins from '../components/Wins/Wins';

const Account = ({user}) => {
      
  return (
    <React.Fragment>
      <Intro introType={'local'} label='Кабинет'/>
      <User user={user} />
      <Characters />
      <Wins />
    </React.Fragment>
  )

}

export default Account;