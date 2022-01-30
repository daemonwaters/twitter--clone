import React, { FC, useState } from 'react';
import { FaCommentAlt, FaHeart, FaRetweet, FaUpload } from 'react-icons/fa';
import { handleLikeTweet } from '../Helpers/HandleLikeTweet';

interface Props {
    avatar: string | undefined
    name: string
    date: string
    text: string
    tweetId: string
    id: string
    likes: []
    currentUserId: string | undefined
}

const Tweet: FC<Props> = ({ avatar, name, date, text, tweetId, id, likes, currentUserId }) => {

    const [liked, setLiked] = useState<boolean>(false)
    const handleLike = () => {
        handleLikeTweet(tweetId, id, currentUserId)
        setLiked(true)
    }

    return (<section className='tweet'>
        <div>
            <img src={avatar} alt="" />
            <div className="tweet-body">
                <header>
                    <h4>
                        {name}
                    </h4>
                    <span>
                        {`@${name.replace(/\s/g, '').toLowerCase()}`}
                    </span>
                    <span>
                        {date}
                    </span>
                </header>
                <footer>
                    <p className="tweet-text">
                        {text}
                    </p>
                    <div className="tweet-actions">
                        <FaCommentAlt />
                        <FaRetweet />
                        <span style={{ color: liked ? '#F15473' : '' }} onClick={handleLike}>
                            <FaHeart />
                            {likes.length}
                        </span>
                        <FaUpload />
                    </div>
                </footer>

            </div>
        </div>
    </section>);
};

export default Tweet;
