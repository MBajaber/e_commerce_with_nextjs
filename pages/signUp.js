import React, { useState, useEffect, useMemo } from 'react';
import style from '../styles/auth.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from 'firebase/compat/app';
import Loading from '../Components/Loader/Loader';
import { getUser } from '../store/Slices/UserSlice';
import { searchProducts } from '../store/Slices/ProductsSlice'
import { useDispatch, useSelector } from 'react-redux';

function SignUp() {
    const route = useRouter();
    const [email, setEmail] = useState('');
    const [touchEmail, setTouchEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [touchPassword, setTouchPassword] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [touchRepeatPassword, setTouchRepeatPassword] = useState(false);
    const [successForm, setSuccessForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const pageInfo = useSelector(state => state.user.pageInfo);

    const emailChangeHandler = (e) => {
        setTouchEmail(true);
        setEmail(e)
    }
    
    const passwordChangeHandler = (e) => {
        setTouchPassword(true);
        setPassword(e);
    }
    
    const repeatPasswordChangeHandler = (e) => {
        setTouchRepeatPassword(true);
        setRepeatPassword(e);
    }

    const validEmail = useMemo(() => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }, [email]);

    const validPassword = useMemo(() => password.length >= 6 , [password]);
    
    const validRepeatPassword = useMemo(() => password ===  repeatPassword, [password, repeatPassword]);

    useEffect(() => dispatch(searchProducts('')),[]);

    useEffect(() => {
        if(email.length === '' && password.length === '' && repeatPassword === '') {
            setSuccessForm(false);
        } else if(email.length > 0 && password.length > 0 && repeatPassword.length > 0) {
            if(validEmail && validPassword && validRepeatPassword) {
                setSuccessForm(true);
            } else {
                setSuccessForm(false);
            }
        }
    }, [validEmail, validPassword, validRepeatPassword]);
    
    const facebookHandler = () => {
        setIsLoading(true);
        setErrorMsg('');
        firebase.auth().signInWithPopup(facebookProvider)
        .then(({user}) => {
            console.log(user)
            console.log(user.displayName)
            dispatch(getUser({
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL   
            }));
            setEmail('');
            setTouchEmail(false);
            setPassword('');
            setTouchPassword(false);
            setRepeatPassword('');
            setTouchRepeatPassword(false);
            setSuccessForm(false);
            setIsLoading(false);
            setErrorMsg('');
            if (pageInfo === 'card' && products.length > 0) {
                route.push('/card');
            } else {
                route.push('/');
            }
        })
        .catch(({message}) => {
            console.log(' Error ' + message)
            setPassword('');
            setRepeatPassword('');
            setErrorMsg(message);
            setIsLoading(false);
        })
    }
    
    const googleHandler = () => {
        setIsLoading(true);
        setErrorMsg('');
        firebase.auth().signInWithPopup(googleProvider)
        .then(({user}) => {
            console.log(' Correct ')
            console.log(user);
            dispatch(getUser({
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL   
            }));
            setEmail('');
            setTouchEmail(false);
            setPassword('');
            setTouchPassword(false);
            setRepeatPassword('');
            setTouchRepeatPassword(false);
            setSuccessForm(false);
            setIsLoading(false);
            setErrorMsg('');
            if (pageInfo === 'card' && products.length > 0) {
                route.push('/card');
            } else {
                route.push('/');
            }
        })
        .catch(({message}) => {
            setPassword('');
            setRepeatPassword('');
            setErrorMsg(message);
            setIsLoading(false);
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
            dispatch(getUser({
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL   
            }));
            setEmail('');
            setTouchEmail(false);
            setPassword('');
            setTouchPassword(false);
            setRepeatPassword('');
            setTouchRepeatPassword(false);
            setSuccessForm(false);
            setIsLoading(false);
            setErrorMsg('');
            if (pageInfo === 'card' && products.length > 0) {
                route.push('/card');
            } else {
                route.push('/');
            }
        })
        .catch(({message}) => {
            setPassword('');
            setRepeatPassword('');
            setErrorMsg(message);
            setIsLoading(false);
        })
    }


    return (
        <div className={style.auth}>
            <h1 className={style.title}>sign Up</h1>
            { errorMsg && <div className={style.error_msg_content}>{errorMsg}</div> }
            <div className={style.facebook_google}>
                <button onClick={facebookHandler} className={`${style.social_btn} ${style.face_btn}`}>Facebook</button>
                <button onClick={googleHandler} className={`${style.social_btn} ${style.google_btn}`}>Google</button>
            </div>
            <p className={style.or_login_with}>or login with</p>
            <div className={style.form}>
                <form onSubmit={submitHandler}>
                    <div className={style.form_group}>
                        <input type="email" style={touchEmail && !validEmail? {border: '1px solid rgb(220, 53, 69)'} : {borderBottom: '1px solid #d1d5db'} } placeholder='Email' value={email} onChange={e => emailChangeHandler(e.target.value)} />
                    </div>
                    <div className={style.form_group}>
                        {touchPassword && !validPassword && <p className={style.error}>At Leats 6 Characeters</p>}
                        <input type="password" style={touchPassword && !validPassword ? {border: '1px solid rgb(220, 53, 69)'} : {borderBottom: '1px solid #d1d5db'} } placeholder='Password' value={password} onChange={e => passwordChangeHandler(e.target.value)} />
                    </div>
                    <div className={style.form_group}>
                        <input type="password" style={touchRepeatPassword && !validRepeatPassword ? {border: '1px solid rgb(220, 53, 69)'} : {borderBottom: '1px solid #d1d5db'} } placeholder='Repeat Password' value={repeatPassword} onChange={e => repeatPasswordChangeHandler(e.target.value)} />
                    </div>
                    <button className={`${style.submit} ${successForm ? '' : style.disabled}`} disabled={successForm ? false : true}>
                        {isLoading ? <Loading largeSize='25px' smallSize='15px' /> : 'Sign Up'}
                    </button>
                </form>
            </div>
            <p className={style.link}>{`if you dont't have account`} <Link href='signIn'><a>Sign In</a></Link></p>
        </div>
    )
}

export default SignUp
