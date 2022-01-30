import React, { ChangeEvent, FC, useState } from 'react';
import { FaArrowLeft, FaCalendar, FaCheck, FaMapMarkerAlt, FaPencilAlt } from 'react-icons/fa';
import Menu from './Menu';
import Search from './Search';
import YouMightLike from './YouMightLike';
import Trends from './Trends';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, DocumentData, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import Tweet from './Tweet';
import { handleNewBio } from '../Helpers/HandleNewBio';
import { handleUpload } from '../Helpers/HandleUpload';

interface Props {
    accessId: string | undefined
    users: Array<DocumentData> | undefined
    handleModal: () => void
}

interface EditProps {
    state: boolean
    value: string
}

const Profile: FC<Props> = ({ accessId, users, handleModal }) => {
    const [editBio, setEditBio] = useState<EditProps>({ state: false, value: "" });
    const q = query(collection(db, "timeline"), orderBy("createdAt"))
    const [values] = useCollectionData(q)
    const myTweets = values?.filter(tweet => tweet.id === accessId)
    const currentUser = users?.find(user => user.id === accessId)



    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEditBio({ ...editBio, value: e.target.value })

    }

    const handleBioChange = () => {
        setEditBio({ ...editBio, state: false })
        handleNewBio(accessId, editBio.value)
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.item(0);
        handleUpload(file, accessId)
    }


    return (<main className='profile'>
        <Menu handleModal={handleModal} avatar={currentUser?.avatar} name={currentUser?.name} />
        <div className="main-col">
            <header>
                <div className="top-section">
                    <span className="back-logo">
                        <FaArrowLeft />
                    </span>
                    <div className="top-section-text">
                        <h2>
                            {currentUser?.name}
                        </h2>
                        <p>{myTweets?.length} Tweets</p>
                    </div>
                </div>
                <div className="banner">
                    <img src={currentUser?.header} alt="banner" />
                    <label htmlFor="banner-pic">
                        <span>
                            +
                        </span>
                        <input
                            onChange={handleFile}
                            type="file"
                            id="banner-pic" />
                    </label>
                </div>
                <div className="user-info">
                    <div className="avatar">
                        <img src={currentUser?.avatar} alt="" />
                        <span className="layer">
                        </span>
                    </div>
                    <div className="edit-name">
                        <div>
                            <h2>
                                {currentUser?.name}
                            </h2>
                            <span>
                                <FaPencilAlt />
                            </span>
                        </div>
                        <p>
                            {`@${currentUser?.name.replace(/\s/g, '').toLowerCase()}`}
                        </p>
                    </div>
                    <div className='edit-bio'>
                        {
                            editBio.state ? (
                                <div>
                                    <input
                                        value={editBio.value}
                                        onChange={handleChange}
                                        type="text"
                                        name="bio"
                                        autoComplete='off'
                                    />
                                    <span onClick={handleBioChange}>
                                        <FaCheck />
                                    </span>
                                </div>
                            ) : (
                                <div>
                                    <p>
                                        {currentUser?.bio}
                                    </p>
                                    <span onClick={() => setEditBio({ ...editBio, state: true })}>
                                        <FaPencilAlt />
                                    </span>
                                </div>
                            )
                        }
                    </div>
                    <div className="bio-signs">
                        <span className="location">
                            <FaMapMarkerAlt /> IRAN
                        </span>
                        <span className="calender">
                            <FaCalendar />
                            {currentUser?.joinDate}
                        </span>
                    </div>

                    <div className="follo">
                        <p><span>{currentUser?.followings.length}</span> Following</p>
                        <p><span>{currentUser?.followers.length}</span> Followers</p>
                        {console.log(currentUser?.followers)}
                    </div>

                    <div className="tabs">
                        <ul>
                            <li>Tweets</li>
                            <li>Tweets & Replies</li>
                            <li>Media</li>
                            <li>Likes</li>
                        </ul>
                    </div>

                </div>

            </header>

            <div className="my-tweets">
                {myTweets?.reverse().map((tweet, idx) => (
                    <Tweet key={idx}
                        name={tweet.name}
                        avatar={tweet.avatar}
                        text={tweet.text}
                        date={tweet.date}
                        tweetId={tweet.createdAt}
                        id={tweet.id}
                        likes={tweet.likes}
                        currentUserId={accessId}
                    />
                ))}
            </div>

        </div>

        <section className="right">
            <div>
                <Search />
                <YouMightLike currentUserId={accessId} users={users} />
                <Trends />
            </div>
        </section>


    </main>);
};

export default Profile;
