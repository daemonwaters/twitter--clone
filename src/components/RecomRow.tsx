import React, { FC } from 'react';
import { handleMutual } from '../Helpers/HandleMutual';
import Button from './Button';

interface Props {
  avatar: string
  name: string
  recommendedUserid: string
  currentUserId: string | undefined
}

const RecomRow: FC<Props> = ({ avatar, name, recommendedUserid, currentUserId }) => {

  const addMutual = (): void => {
    handleMutual( recommendedUserid, currentUserId)
  }

  return (
    <div style={{ margin: '1rem 0' }} className="r-row">
      <img src={avatar} alt="" />
      <div>
        <p>{name}</p>
        <p>{`@${name.trim()}`}</p>
      </div>
      <Button onClick={addMutual}>
        Follow
      </Button>
    </div>
  );
};

export default RecomRow;
