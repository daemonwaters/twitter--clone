import React, { FC } from 'react';

interface Props {
    trendName: string
    num: string
}

const Trend: FC<Props> = ({ trendName, num }) => {
    return (<div className='trend'>
        <div>
            <h4>
                {trendName}
            </h4>
            <p>
                {`${num}K Tweets`}
            </p>
        </div>
        <span>
            ...
        </span>
    </div>);
};

export default Trend;
