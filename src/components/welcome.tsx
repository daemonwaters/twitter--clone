import React, { FC} from 'react';
import { FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from './Button';

interface Props {
    handleSignUp?(): any
}


const Welcome: FC<Props> = ({ handleSignUp }) => {

    return (
        <main className='welcome'>
            <div className="img-wrapper">
                <FaTwitter />
            </div>
            <div className="welcome-content">
                <FaTwitter />
                <div className="text-area">
                    <h1>
                        Happening now
                    </h1>
                    <h2>
                        Join Twitter today.
                    </h2>
                </div>
                <div className="btn-area">
                    <Link to='/timeline'>
                        <Button onClick={handleSignUp} type='google'>
                            Sign up with Google
                        </Button>
                    </Link>
                    <Button type='apple'>
                        Sign up with Apple
                    </Button>
                    <p className='or-comp'>
                        or
                    </p>
                    <Link to='/sign-in'>
                        <Button textColor='#fff' bg='#1C8CD8'>
                            Sign In
                        </Button>
                    </Link>
                </div>

                <p className="plicy">
                    By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use</span>.
                </p>
            </div>
        </main>
    )
};

export default Welcome;
