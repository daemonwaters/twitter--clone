import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import Button from './Button';

function SignIn() {
  return (<div className='sign-in'>

    <div className="sign-in-content">
      <FaTwitter />
      <h3>
        Sign in to Twitter
      </h3>
      <Button type='google'>
        Sign in with Google
      </Button>
      <Button type='apple'>
        Sign in with Apple
      </Button>
    </div>

  </div>);
}

export default SignIn;
