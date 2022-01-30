import { DocumentData } from 'firebase/firestore';
import React, { FC } from 'react';
import RecomRow from './RecomRow';

interface Props {
    users: Array<DocumentData> | undefined
    currentUserId: string | undefined
}

const YouMightLike: FC<Props> = ({ users, currentUserId }) => {
    const otherUsers = users?.filter(user => user.id !== currentUserId)
    return (<section className='you-might-like'>
        <header>
            <h4>
                You might like
            </h4>
        </header>
        <div className="recommended-users">
            {otherUsers?.length ? otherUsers.map((user, idx) => (
                <RecomRow
                    key={idx}
                    recommendedUserid={user.id}
                    currentUserId={currentUserId}
                    avatar={user.avatar}
                    name={user.name} />
            )) : <p>
                There are no registered users yet
            </p>

            }
        </div>
    </section>);
};

export default YouMightLike;
