import React, { FC } from 'react';
import Button from './Button';
import { FaBars, FaBell, FaBookmark, FaEnvelope, FaHashtag, FaHome, FaList, FaTwitter, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Props {
    avatar?: string
    name?: string
    handleModal: () => void
}

const Menu: FC<Props> = ({ avatar, name, handleModal }) => {
    return (<aside className='left'>
        <div>
            <FaTwitter />
            <ul>
                <li>
                    <Link to='/timeline'>
                        <FaHome />
                        Home
                    </Link>
                </li>
                <li>
                    <FaHashtag />
                    explore
                </li>
                <li>
                    <FaBell />
                    notifications
                </li>
                <li>
                    <FaEnvelope />
                    messages
                </li>
                <li>
                    <FaBookmark />
                    bookmarks
                </li>
                <li>
                    <FaList />
                    lists
                </li>
                <li>
                    <Link to='/profile'>
                        <FaUser />
                        profile
                    </Link>
                </li>
                <li>
                    <FaBars />
                    more
                </li>
            </ul>
            <Button onClick={handleModal} textColor='#fff' bg='#1C8CD8'>
                Tweet
            </Button>
            <div className="small-profile">
                <img src={avatar} alt="" />
                <div>
                    <p>{name}</p>
                    <p>{`@${name?.replace(/\s/g, '').toLowerCase()}`}</p>
                </div>
                <span>
                    ...
                </span>
            </div>
        </div>
    </aside>);
};

export default Menu;
