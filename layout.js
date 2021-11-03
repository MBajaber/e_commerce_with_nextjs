import Navbar from './Components/Navbar/navbar';

function layout({ children }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}
export default layout
