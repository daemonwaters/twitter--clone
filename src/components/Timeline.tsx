import React, {FC} from 'react';
import Menu from './Menu';
import AsideRight from './AsideRight';
import Loading from '../Helpers/Loading';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, DocumentData, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import Tweet from './Tweet';
import AddTweet from './AddTweet';

interface Props {
    hasAccess: boolean | undefined
    status: string | undefined
    currentUser: DocumentData | undefined
    handleModal: () => void
}



const Timeline: FC<Props> = ({ hasAccess, status, currentUser, handleModal }) => {
    const q = query(collection(db, "timeline"), orderBy("createdAt"))
    const [values] = useCollectionData(q)

    if (status === 'loading') return <Loading />
    if (!hasAccess) return null

    return (<main className='timeline'>
        <Menu
            handleModal={handleModal}
            avatar={currentUser?.avatar}
            name={currentUser?.name}
        />
        <section className="tweets">
            <h3>
                Home
            </h3>
            <AddTweet currentUser={currentUser} />
            <div className="timeline-tweets">
                {values?.filter(twt => JSON.stringify(currentUser?.followings).includes(JSON.stringify({ id: twt.id })) || twt.id === currentUser?.id)
                    .reverse()
                    .map((tweet, idx) => (
                        <Tweet
                            key={idx}
                            avatar={tweet.avatar}
                            text={tweet.text}
                            date={tweet.date}
                            name={tweet.name}
                            tweetId={tweet.createdAt}
                            id={tweet.id}
                            likes={tweet.likes}
                            currentUserId={currentUser?.id}
                        />
                    ))}
            </div>
        </section>
        <AsideRight />
    </main>);
};

export default Timeline;
