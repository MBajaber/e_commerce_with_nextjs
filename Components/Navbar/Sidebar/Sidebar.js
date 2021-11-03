import React from 'react';
import Logo from '../../Logo/Logo';
import { AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { navToggle, logOutUser } from '../../../store/Slices/UserSlice';
import Image from 'next/image';
const firebase = require('firebase/compat/app').default

function Sidebar({getClass}) {
    const dispatch = useDispatch();
    const toggleNav = useSelector(state => state.user.toggleNav);
    const user = useSelector(state => state.user.user);
    const logout = () => {
        firebase.auth().signOut();
        dispatch(logOutUser());
        dispatch(navToggle(false));
    }

    return (
        <div className='sidebar' onClick={e => getClass(e.target.className)}>
            <div className='main_box'>
                <div className='close_btn'>X</div>
                <div className='logo_box'>
                    <Logo />
                    <h2 className='logo_text'>shopp<span>ing</span></h2>
                </div>
                {
                    user !== null && (
                        <div className='user_box'>
                            <div className='img'>
                                {
                                    user.photoURL === null
                                    ? <AiOutlineUser size size={24} />
                                    : <Image src={user.photoURL} alt='person' height={35} width={35} className='rounded_image' />
                                }
                            </div>
                            <div className='user_name'>
                                {
                                    user.displayName !== null ? user.displayName > 10 ? `${user.displayName.slice(0, 10)}...` : user.displayName : 
                                    user.email.length > 10 ? `${user.email.slice(0, 10)}...` : user.email
                                }
                            </div>
                        </div>
                    )
                }
                {
                    user === null 
                    && (
                        <div className='sign_in_sign_up'>
                            <Link href='/signIn'><a className="sign_in_link" onClick={() => dispatch(navToggle(false))}>Sign In</a></Link>
                            <Link href='/signUp'><a className="sign_up_link" onClick={() => dispatch(navToggle(false))}>Sign Up</a></Link>
                        </div>
                    )
                }
                {
                    user !== null && (
                        <div className='logout'>
                            <button onClick={logout}>Logout</button>
                        </div>
                    )
                }
            </div>
            <style jsx global>{`
                .sidebar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    z-index: 100;
                    transition: all 0.3s ease-in-out;
                    animation: scal 0.3s ease-in-out;
                    user-select: none;
                }

                @keyframes scal {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
                .sidebar .main_box {
                    position: absolute;
                    top: 0;
                    right: ${toggleNav ? '0%' : '-100%'};
                    width: 85%;
                    height: 100%;
                    padding: 20px;
                    background-color: #fff;
                    transition: all 5s 0.3s ease-in-out;
                    animation: moveit .7s ease-in-out;
                }

                @keyframes moveit {
                    0% {
                        right: -100%;
                    }
                    100% {
                        right: 0%;
                    }
                }

                @media (min-width: 300px) {
                    .sidebar .main_box {
                        width: 250px;
                    }
                }

                .sidebar .main_box .close_btn {
                    width: 30px;
                    position: absolute;
                    left: -20px;
                    height: 30px;
                    background-color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    cursor: pointer;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                        0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    color: #f12f1e;
                    font-size: 1.5rem;
                    font-weight: 600;
                }

                @media (min-width: 350px) {
                    .sidebar .main_box .close_btn {
                        left: -40px;
                    }
                }

                .sidebar .main_box .logo_box {
                    display: flex;
                    align-items: center;
                }

                .sidebar .main_box .logo_box .logo {
                    width: 40px;
                    margin-right: 10px;
                }

                .sidebar .main_box .logo_box .logo_text {
                    color: #249adf;
                }

                .sidebar .main_box .logo_box .logo_text span {
                    color: #f12f1e;
                }

                .sidebar .main_box .user_box {
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .sidebar .main_box .user_box .user_name {
                    font-size: 1rem;
                }

                .sidebar .main_box .sign_in_sign_up {
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .sidebar .main_box .sign_in_sign_up > a {
                    color: #249adf;
                    font-size: 1rem;
                }

                .sidebar .main_box .logout {
                    margin-top: 20px;
                }

                .sidebar .main_box .logout button {
                    background-color: transparent;
                    border: 0;
                    color: #f12f1e;
                    cursor: pointer;
                    font-size: 1rem;
                }

            `}</style>
        </div>
    )
}

export default Sidebar
