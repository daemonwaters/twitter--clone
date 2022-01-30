import React, { FC } from 'react';
import { FaApple, FaGoogle } from 'react-icons/fa'

interface Props {
    children: string
    type?: string
    bg?: string
    textColor?: string
    onClick?: () => void
}


const Button: FC<Props> = ({ children, type, bg, textColor, onClick }) => {
    return (<button
        className='button-comp'
        onClick={onClick}
        style={{ backgroundColor: bg, color: textColor }}>
        {type === 'apple' ? <FaApple /> : type === 'google' ? <FaGoogle color='red' /> : null}
        {children}
    </button>);
};

export default Button;
