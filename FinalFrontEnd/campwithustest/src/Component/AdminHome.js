import React from 'react'
import AdminHeader from './AdminHeader';
import Myfooter from './MyFooter';

export default function AdminHome() {
    return (
        <div>

            <body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
                <div className="site-wrap" id="home-section">

                    <AdminHeader></AdminHeader>

                    <div className="ftco-blocks-cover-1">
                        <div className="site-section-cover overlay" style={{ backgroundImage: 'url("/images/Back.avif")' }}>
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-5" data-aos="fade-right">
                                        <h1 className="mb-3 text-white">Welcome To Admins Section</h1>
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quae expedita fugiat quo incidunt, possimus temporibus aperiam eum, quaerat sapiente.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos debitis enim a pariatur molestiae.</p>
                                </div>
                                <div className="col-md-6" data-aos="fade-right">
                                    <img src="images/traveler.jpg" alt="Image" className="img-fluid"></img>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="site-section bg-image overlay" style={{ backgroundImage: 'url("/images/Back.avif")' }}>
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
