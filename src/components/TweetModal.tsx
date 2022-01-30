import { DocumentData } from 'firebase/firestore';
import React, { FC, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import AddTweet from './AddTweet';
interface Props {
    currentUser: DocumentData | undefined
    modal: boolean
    setModal: React.Dispatch<SetStateAction<boolean>>
}

const TweetModal: FC<Props> = ({ currentUser, modal, setModal }) => {
    if (!modal) return null
    return createPortal(<div className='modal'>
        <span onClick={() => setModal(false)}>
            X
        </span>
        <AddTweet currentUser={currentUser} />
    </div>, document.getElementById('portal')as Element);
};

export default TweetModal;
