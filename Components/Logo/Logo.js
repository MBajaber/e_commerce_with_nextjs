import React from 'react';
import Image  from 'next/image';
import Link  from 'next/link';
import { useDispatch } from 'react-redux';
import { navToggle } from '../../store/Slices/UserSlice';

function Logo() {
    const dispatch = useDispatch()
    return (
        <Link href='/' onClick={() => dispatch(navToggle(false))}>
            <a className='logo'>
                <Image src={'/logo.png'} alt='logo' height={40} width={40} />
            </a>
        </Link>
    )
}

export default Logo
