import React, { useState, useMemo } from 'react';
import style from '../../styles/productCard.module.scss';
import { AiTwotoneStar } from 'react-icons/ai';
import { ImCart } from 'react-icons/im';
import Currency from 'react-currency-formatter';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromProducts, addToProducts, currentProduct } from '../../store/Slices/ProductsSlice';
import Link from 'next/link';
import Image from 'next/image';

function ProductItem({ id, category, description, image, price, title, search }) {

    const [isAddToCart, setIsAddToCart] = useState(false)
    const dispatch = useDispatch();
    const productsStore = useSelector(state => state.products.products)
    useMemo(() => {
        let val = productsStore.some(item => item.id === id && item.image === image);
        setIsAddToCart(val);
    }, [productsStore]);
    const [randomStars] = useState(Math.ceil(Math.random() * 5));
    const [randompeople] = useState(Math.ceil(Math.random() * 10000));
    const [hasPrime] = useState(Math.random() > .5);
    
    
    const textFunc = () => description.length > 150 ? `${description.slice(0, 150)} ...` : description;
    const searchValue = search === '' ? true : title.toLowerCase().includes(search.toLowerCase()) ? true : false;

    const addToCart = (item) => {
        dispatch(addToProducts(item));
    }
    
    const removeFromProductsFunc = (item) => {
        dispatch(removeFromProducts(item));
    }

    return searchValue ? (
        <article className={style.product_card}>
            <span className={style.category}>{category}</span>
            <div className={style.sections}>
                <Link href={`/product/${id}`}>
                    <a className={style.top_section} onClick={() => dispatch(currentProduct({
                        id,
                        category,
                        description,
                        image,
                        price,
                        title,
                        isAddToCart: isAddToCart,
                        randomStars: randomStars,
                        randompeople: randompeople,
                        hasPrime: hasPrime
                    }))}>
                        <div className={style.main_image}>
                            <Image src={image} alt={description} width={80} height={110} />
                        </div>
                        <div className={style.rating_People}>
                            <ul>
                                {Array(randomStars).fill().map((star, index) => (
                                    <li key={index}>
                                        <AiTwotoneStar color='#fecaca'size='1.2rem'/>
                                    </li>
                                ))}
                            </ul>
                            <span className={style.ratting}>({randompeople})</span>
                        </div>
                        <h4 className={style.title}>{title}</h4>
                        <p className={style.description}>{textFunc()}</p>
                        <div className={style.currency}>
                            <Currency 
                                quantity={price}
                                currency='usd'
                            />
                        </div>
                        {hasPrime && (
                            <div className={style.prime}>
                                <div className={style.image_prime}>
                                    <Image src='/prime.png' alt='Prime Logo' width={50} height={50} />
                                </div>
                                <p>FREE Next-day Delivery</p>
                            </div>
                        )}
                    </a>
                </Link>
                <div className={style.bottom_section}>
                    {
                        !isAddToCart ? (
                            <button className={style.add_to_cart} onClick={() => addToCart({
                                id: id,
                                category: category,
                                description: description,
                                image: image,
                                price: price,
                                title: title,
                                quantity: 1,
                                randomStars: randomStars,
                                randompeople: randompeople,
                                hasPrime: hasPrime
                            })}>
                                <span>Add To Cart {<ImCart />}</span>
                            </button>
                        ) : (
                            <button className={style.remove_from_cart} onClick={() => removeFromProductsFunc({
                                id: id,
                                image: image
                            })}>
                                <span>Remove From Cart {<ImCart />}</span>
                            </button>
                        )
                    }
                </div>
            </div>
        </article>
    ) : null;
}

export default ProductItem;