import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
    return (
        <section className='banner'>
            <Carousel 
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={10000}
            >
                <div>
                    <img src='/b1.jpg' alt='Banner 1'/>
                </div>
                <div>
                    <img src='/b2.jpg' alt='Banner 2'/>
                </div>
                <div>
                    <img src='/b3.jpg' alt='Banner 3'/>
                </div>
                <div>
                    <img src='/b4.jpg' alt='Banner 4'/>
                </div>
                <div>
                    <img src='/b5.jpg' alt='Banner 5'/>
                </div>
                <div>
                    <img src='/b6.jpg' alt='Banner 6'/>
                </div>
                <div>
                    <img src='/b7.jpg' alt='Banner 7'/>
                </div>
                <div>
                    <img src='/b8.jpg' alt='Banner 8'/>
                </div>
                <div>
                    <img src='/b9.jpg' alt='Banner 9'/>
                </div>
            </Carousel>
            <style jsx>{`
                .banner {
                    margin: auto;
                    width: 100%;
                }

                @media (min-width: 576px) {
                    .banner {
                        width: 540px;
                    }
                }

                @media (min-width: 768px) {
                    .banner {
                        width: 720px;
                    }
                }

                @media (min-width: 992px) {
                    .banner {
                        width: 960px;
                    }
                }

                @media (min-width: 1200px) {
                    .banner {
                        width: 1140px;
                    }
                }
            `}</style>
        </section>
    )
}

export default Banner;
