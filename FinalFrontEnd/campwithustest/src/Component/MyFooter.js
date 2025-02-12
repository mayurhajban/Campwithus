import React from 'react'

export default function Myfooter() {
    return (
        <div>
            <footer className="site-footer bg-light py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 text-center">
                            <h2 className="footer-heading mb-4 text-dark">Quick Links</h2>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a href="#" className="nav-link text-primary">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link text-primary">Testimonials</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link text-primary">Terms of Service</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link text-primary">Privacy</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link text-primary">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row pt-4 mt-4 text-center">
                        <div className="col-md-12">
                            <div className="border-top pt-3">
                                <p className="mb-0 text-muted">
                                    &copy; {new Date().getFullYear()} All rights reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


        </div>
    )
}
