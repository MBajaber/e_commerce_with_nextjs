import React, { useEffect } from 'react';
import style from '../../styles/products.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from './ProductICard';
import { currentProductNull, searchProducts } from '../../store/Slices/ProductsSlice';

function Products({ data }) {
    const search = useSelector(state => state.products.search);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchProducts(''))
    }, []);

    useEffect(() => {
        dispatch(currentProductNull());
    }, [search]);
    
    return (
        <section className={style.products + ' container'} id='products'>
            <div className={style.boxes}>
                {
                    data.length > 0 && search === '' ? (
                        <>
                            {data.slice(0, 4).map(({ id, category, description, image, price, title }) => (
                                <ProductItem
                                    key={id}
                                    id={id}
                                    category={category}
                                    description={description}
                                    image={image}
                                    price={price}
                                    title={title}
                                    search={search}
                                />
                            ))}
                            <div className={style.full_image}>
                                <img src='/b10.jpg' alt='Full Banner' />
                            </div>
                            <div className={style.small_product}>
                                {data.slice(4, 5).map(({ id, category, description, image, price, title }) => {
                                    return (
                                        <ProductItem
                                            key={id}
                                            id={id}
                                            category={category}
                                            description={description}
                                            image={image}
                                            price={price}
                                            title={title}
                                            search={search}
                                        />
                                    )
                                })}
                            </div>
                            {data.slice(6).map(({ id, category, description, image, price, title }) => (
                                <ProductItem
                                    key={id}
                                    id={id}
                                    category={category}
                                    description={description}
                                    image={image}
                                    price={price}
                                    title={title}
                                    search={search}
                                />
                            ))}
                        </>
                    ) : data.length > 0 && data.filter(e => e.title.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
                        <>
                            {data.filter(e => e.title.toLowerCase().includes(search.toLowerCase())).map(({ id, category, description, image, price, title }) => (
                                <ProductItem
                                    key={id}
                                    id={id}
                                    category={category}
                                    description={description}
                                    image={image}
                                    price={price}
                                    title={title}
                                    search={search}
                                />
                            ))}
                        </>
                    ) : (
                        <div className={style.no_items}>No Item There</div>
                    )
                }
            </div>
        </section>
    )
}

export default Products;