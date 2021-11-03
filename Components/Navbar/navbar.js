import React, { useState, useMemo } from 'react'
import style from '../../styles/navbar.module.scss';
import Logo from '../Logo/Logo';
import Sidebar from './Sidebar/Sidebar';
import { ImSearch } from 'react-icons/im';
import { BsListNested } from 'react-icons/bs';
import { ImCart } from 'react-icons/im';
import { searchProducts } from '../../store/Slices/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { navToggle } from '../../store/Slices/UserSlice';

function Navigation() {
    const productsCount = useSelector(state => state.products.products.length);
    const searchStore = useSelector(state => state.products.search);
    const [search, setSearch] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
    }

    useMemo(() => setSearch(searchStore), [searchStore])

    const dispatch = useDispatch();
    const toggleNav = useSelector(state => state.user.toggleNav)
    const onChangeHandler = (e) => {
        // setSearch(e);
        dispatch(searchProducts(e))
    }
    
    const user = useSelector(state => state.user.user)
    const getClass = (classValue) => {
        if(classValue.includes('close_btn') || classValue.includes('sidebar')) {
            dispatch(navToggle(false));
        }
    }

    return (
        <nav className='nav'>
            {toggleNav && <Sidebar getClass={getClass} />}
            <div className={style.navbar}>
                <div className={style.sections}>
                    <div className={style.nav_section}>
                        <Logo />
                        <div className={style.search}>
                            <form onSubmit={submitHandler}>
                                <input type='text' placeholder='search...' onChange={e => onChangeHandler(e.target.value)} value={search} />
                                <button type='submit'>
                                    <ImSearch />
                                </button>
                            </form>
                        </div>
                        <div className={style.icon_cart}>
                            {
                                user && 
                                <div className={style.user_name}>
                                    {
                                        user.displayName !== null ? user.displayName > 10 ? `${user.displayName.slice(0, 10)}...` : user.displayName : 
                                        user.email.length > 10 ? `${user.email.slice(0, 10)}...` : user.email
                                    }
                                </div>
                            }
                            <Link href='/card'>
                                <a className={style.shopping_cart}>
                                    <ImCart />
                                    <div className={style.counter}>
                                        <span>{productsCount}</span>
                                    </div>
                                </a>
                            </Link>
                            <div className={style.navbar_icon} onClick={() => dispatch(navToggle())}>
                                <BsListNested />
                            </div>
                        </div>
                    </div>
                    <div className={style.search_sm}>
                        <form onSubmit={submitHandler}>
                            <input type='text' placeholder='search...' onChange={e => onChangeHandler(e.target.value)} value={search} />
                            <button type='submit'>
                                <ImSearch />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
