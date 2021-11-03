import React, { useState, useEffect } from 'react';
import style from '../styles/card.module.scss';
import CardItem from '../Components/CardItem/CardItem';
import { HiEmojiSad } from 'react-icons/hi';
import Currency from 'react-currency-formatter';
import { getTotal, searchProducts } from '../store/Slices/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { pageInfo } from '../store/Slices/UserSlice';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51J7Lu3F4TDOSFmXihWdyjEQ3VJ0MLS7boJTvBijeu8C9P0ejskQDuJQxHDcsCJ9MNLND0ObKTbrqaAyhPeaQpVEO00BL2eA2D9')

function CartPage() {
    const { products } = useSelector(state => state.products);
    const [total, setTotal] = useState(0);
    const { user } = useSelector(state => state.user)
    const email = useSelector(state => user ? user.email : null);
    const displayName = useSelector(state => user ? user.displayName : null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(pageInfo('card'));
        dispatch(searchProducts(''))
    }, []);

    useEffect(() => {
        let allTotalPrice = [];
        products.map(el => allTotalPrice.push(el.price * el.quantity));
        let reduseAllValue = +allTotalPrice.reduce((a,b) => a + b, 0).toFixed(2);
        dispatch(getTotal(reduseAllValue));
        setTotal(reduseAllValue);
    }, [products]);

    const checkoutHandler = async () => {

        const stripe = await stripePromise;
        const checkoutSession = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                products: products,
                email: email !== null ? email : displayName
            })
        });

        const response = await checkoutSession.json();
        const redirect = await stripe.redirectToCheckout({
            sessionId: response.id
        });

        if(redirect.error) {
            alert(redirect.error.message);
        }
    }

    return (
        <div className='container'>
            <div className={style.card}>
                <div className={style.products_container}>
                    {
                        products.length > 0
                        ? products.map(item => (
                            <CardItem
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                category={item.category}
                                title={item.title}
                                price={item.price}
                                quantity={item.quantity}
                            />             
                            ))
                        :
                        <div className={style.no_items_cart}>No Items In The Cart... <HiEmojiSad color='#fecaca' size='30px' /></div>
                    }
                </div>
                {products.length ? <div className={style.total}>Total: <span>{<Currency quantity={total} currency='usd' />}</span></div> : null}
                {
                    products.length > 0
                    ?   (
                            <div className={style.checkout}>
                                {
                                    user !== null
                                    ? <button role='link' onClick={checkoutHandler} >checkout</button>
                                    : <Link href='signIn'>
                                        <a>Sign In to Checkout</a>
                                    </Link>
                                }
                            </div>
                        )
                    :  null
                }
            </div>
        </div>
    )
}

export default CartPage;

