import React from 'react';
import { RxQuestionMarkCircled } from 'react-icons/rx';

const NotificationButton = (props) => {
    return (
        <div className='flex self-end'>
        <div className = 'rounded-e-full rounded-s-full px-3 py-1 flex flex-row gap-2 items-center justify-center bg-cyan-400'>
            <p className = 'text-black text-sm'> Low Risk </p>
            <p className = 'text-black text-sm'><RxQuestionMarkCircled /></p>
        </div>
        </div>
    )
}

export default NotificationButton;