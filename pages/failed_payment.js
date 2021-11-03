import Link from 'next/link';
import Image from 'next/image';
import style from '../styles/stripe.module.scss'

function FailPage() {
    return (
        <div className={style.stripe_page}>
            <div className={style.msg}>
                <div className={style.image}>
                    <Image src='/wrong.png' alt="wrong sign" width={80} height={80} />
                </div>
                <p className={style.text}>Sorry! something Wrong try again</p>
            </div>
            <div className={style.go_main}>
                <Link href='/' ><a>go to Main</a></Link>
            </div>
        </div>
    )
}

export default FailPage