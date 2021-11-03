import Link from 'next/link';
import Image from 'next/image';
import style from '../styles/stripe.module.scss'

function SuccessPage() {
    return (
        <div className={style.stripe_page}>
            <div className={style.msg}>
                <div className={style.image}>
                    <Image src='/correct.png' alt="correct sign" width={80} height={80} />
                </div>
                <p className={style.text}>{`Thank you, you'r order has been confirmed!`}</p>
            </div>
            <div className={style.go_main}>
                <Link href='/' ><a>go to Main</a></Link>
            </div>
        </div>
    )
}

export default SuccessPage
