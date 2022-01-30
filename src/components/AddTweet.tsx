import React, { FC, useState, ChangeEvent } from 'react';
import { collection, doc, DocumentData, setDoc } from 'firebase/firestore';
import { FaCalendar, FaImage, FaMapMarkerAlt, FaPoll, FaSmile } from 'react-icons/fa';
import Button from './Button';
import { db } from '../firebaseconfig';

interface Props {
    currentUser: DocumentData | undefined
}

const AddTweet: FC<Props> = ({ currentUser }) => {
    const [tweet, setTweet] = useState<string>('')


    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setTweet(e.target.value)
    }

    const handleAddTweet = async () => {
        if (tweet === '') return
        const date = new Date()
        const tweetInfo = {
            id: currentUser?.id,
            avatar: currentUser?.avatar,
            name: currentUser?.name,
            username: `@${currentUser?.name.trim()}`,
            text: tweet,
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            createdAt: date.getTime(),
            likes: []

        }
        try {
            await setDoc(doc(collection(db, "timeline"), `${currentUser?.id}${date.getTime()}`), tweetInfo)
            setTweet('')
        } catch (err) {
            console.error(err)
        }
    }


    return (<div className='add-tweet'>
        <div className="add-tweet">
            <img src={currentUser?.avatar} alt="pro" />
            <div className="tweet-input">
                <input
                    value={tweet}
                    onChange={handleChange}
                    autoComplete='off'
                    type="text"
                    name="tweet"
                    placeholder='Whats happening?' />
                <div className="tweet-actions">
                    <FaImage />
                    <FaPoll />
                    <FaSmile />
                    <FaCalendar />
                    <FaMapMarkerAlt />
                    <Button onClick={handleAddTweet} textColor='#fff' bg='#1C8CD8'>
                        Tweet
                    </Button>
                </div>
            </div>
        </div>
    </div>);
};

export default AddTweet;
