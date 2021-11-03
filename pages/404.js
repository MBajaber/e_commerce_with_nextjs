import Image from 'next/image';
import style from '../styles/pageNotFound.module.scss';

function pageNotFound() {
    return (
        <div className={style.not_find}>
            <div className={style.img}>
                <Image src='/404_page.png' alt="Page Not Fount" layout='fill' objectFit='contain' />
            </div>
            <p className={style.text}>page not found</p>
        </div>
    )
}

export default pageNotFound