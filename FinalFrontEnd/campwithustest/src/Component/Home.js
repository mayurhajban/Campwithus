import React from 'react'
import Myheader from './MyHeader';
import Myfooter from './MyFooter';

export default function Home() {
    return (
        <div>

            <body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
                <div className="site-wrap" id="home-section">

                    <Myheader></Myheader>

                    <div className="ftco-blocks-cover-1">
                        <div className="site-section-cover overlay"  style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}>
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-5" data-aos="fade-right">
                                        <h1 className="mb-3 text-white">Let's Enjoy The Adventure of Nature Together</h1>
                                        <p>Be a part of Various kind of experiences along with new friends</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="site-section py-5">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <div className="heading-39101 mb-5">
                                        <span className="backdrop">Story</span>
                                        <span className="subtitle-39191">Discover Story</span>
                                        <h3>Our Story</h3>
                                    </div>
                                    <p>"Camp With Us" was born from a simple yet frustrating experience—last-minute trip cancellations. We've all been there: you plan an exciting getaway with friends, only for someone to cancel at the last moment, leaving the entire trip in jeopardy. The disappointment of scrapping well-laid plans inspired us to create a platform that ensures no adventure goes to waste. With "Camp With Us," travelers can post their planned trips, giving others the opportunity to join in and keep the journey alive.</p>
                                    <p>Our platform connects like-minded explorers, turning canceled plans into new opportunities for adventure. Whether it's a weekend trek, a road trip, or a camping expedition, users can list their trips and find companions eager to hop on board. By making trip pooling seamless and spontaneous, "Camp With Us" fosters a vibrant travel community where every plan has a second chance.</p>
                                </div>
                                <div className="col-md-6" data-aos="fade-right">
                                    <img src="images/traveler.jpg" alt="Image" className="img-fluid"></img>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="site-section bg-image overlay"  style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-7 text-center">
                                    <h2 className="font-weight-bold text-white">Join and Trip With Us</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Myfooter></Myfooter>

                </div>

            </body>

        </div>
    )
}
