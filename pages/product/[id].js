import React, { useState, useMemo, useEffect } from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import { ImCart } from 'react-icons/im';
import Currency from 'react-currency-formatter';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromProducts, addToProducts, searchProducts } from '../../store/Slices/ProductsSlice'
import ImageZoom from 'react-image-zoom';
import Image from 'next/image';
import style from '../../styles/productItem.module.scss';

function ProductItem({ data }) {
  const { randomStars, randompeople, hasPrime } = useSelector(state => state.products.currentProduct);
  const dispatch = useDispatch();
  const productsStore = useSelector(state => state.products.products);
  const [isAddToCart, setIsAddToCart] = useState(false);

  useMemo(() => {
    let val = productsStore.some(item => item.id === data.id && item.image === data.image);
    setIsAddToCart(val);
  }, [productsStore]);

  useEffect(() => {
    dispatch(searchProducts(''))
  }, []);

  const addToCart = (item) => {
    dispatch(addToProducts(item));
  }
  
  const removeFromProductsFunc = (item) => {
    dispatch(removeFromProducts(item));
  }

  return (
    <div className="container">
      <div className={style.single_item}>
        <div className={style.img_product} style={{ width: 200, height: 100 }}>
          <ImageZoom 
            width={200}
            img={data.image}
          />
        </div>
        <div className={style.info}>
          <div className="text">
            <div className={style.rating_People}>
              <ul>
                {Array(randomStars).fill().map((star, index) => (
                  <li key={index}>
                    <AiTwotoneStar color='#fecaca'size='1.2rem' />
                  </li>
                ))}
              </ul>
                <span className={style.ratting}>({randompeople})</span>
            </div>
            <h4 className={style.title}>{data.title}</h4>
            <p className={style.description}>{data.description}</p>
            <div className={style.currency}>
              <Currency 
                quantity={data.price}
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
          </div>
          <div className={style.buttons_section}>
            {
              !isAddToCart ? (
                <button className={style.add_to_cart} onClick={() => addToCart({
                  id: data.id,
                  category: data.category,
                  description: data.description,
                  image: data.image,
                  price: data.price,
                  title: data.title
                })}>
                  <span>Add To Cart {<ImCart />}</span>
                </button>
              ) : (
                <button className={style.remove_from_cart} onClick={() => removeFromProductsFunc({
                  id: data.id,
                  image: data.image
                })}>
                  <span>Remove From Cart {<ImCart />}</span>
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem;

export const getStaticProps = async ({params}) => {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    const data = await res.json();
    
    if(!data) {
      return {notFound: true}
    }

    return {
      props: { data }
    };
  }
  
  export async function getStaticPaths() {
    const req = await fetch(`https://fakestoreapi.com/products`);
    const res = await req.json();
    const data = await res.map(e => ({params: {id: e.id.toString()}})) 
    return {
      paths: data,
      fallback: false
    }
  }