import Banner from '../Banner/Banner';
import Products from '../Products/Products';

function Home({ data }) {
    return (
        <>
            <Banner />
            <Products data={data} />
        </>
    )
}

export default Home
