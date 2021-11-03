import React, { useState } from 'react';
import style from '../../styles/cardItem.module.scss';
import Currency from 'react-currency-formatter';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { removeFromProducts, increaseQuantity, decreaseQuantity } from '../../store/Slices/ProductsSlice';
import Image from 'next/image';

function CartItem({ id, image, title, category, price, quantity }) {
    const [selectValue, setSelectValue] = useState('M');
    const dispatch = useDispatch();

    const increaseValue = () => {
        if(quantity < 20) {
            dispatch(increaseQuantity({id, image, price, quantity}));
        }
    }
    
    const decreaseValue = () => {
        if(quantity > 1) {
            dispatch(decreaseQuantity({id, image, price, quantity}));
        }
    }

    const removeItem = () => {
        dispatch(removeFromProducts({
            id: id,
            image: image
        }));
    }

    return (
        <div className={style.cardItem}>
            <div className={style.info_desc}>
                <div className={style.img}>
                    <Image src={image} alt={title} width={100} height={135} />
                </div>
                <div className={style.title_category}>
                    <h2>{title}</h2>
                    <p>Category: <span>{category}</span></p>
                </div>
            </div>
            <div className={style.details}>
                <div className={style.quantity_size}>
                    <div className={style.quantity}>
                        <h6 className={style.title_section}>quantity:</h6>
                        <div className={style.buttons}>
                            <button className={style.increase} onClick={increaseValue}>+</button>
                            <div className={style.counter}>{quantity}</div>
                            <button className={style.decrease} onClick={decreaseValue}>-</button>
                        </div>
                    </div>
                    <div className={style.size}>
                    <h6 className={style.title_section}>size:</h6>
                        <select value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                </div>
                <div className={style.currency}>
                    <h6 className={style.title_section}>price:</h6>
                    <p>
                        <Currency quantity={price} currency='usd' />{quantity > 1 && ` X ${quantity}`}
                    </p>
                </div>
                <div className={style.delete}>
                    <h6 className={style.title_section}>delete:</h6>
                    <button onClick={removeItem}><MdDelete /></button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
