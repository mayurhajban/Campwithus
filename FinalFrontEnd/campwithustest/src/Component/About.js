import React from 'react'
import MyHeader from './MyHeader'
import Myfooter from './MyFooter';

function About() {
  const cardStyle = {
    background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
  };

  const imgStyle = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  };
  return (
  <div>
    <MyHeader></MyHeader>

    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#343a40" }}>Meet the Developers</h2>
      <p className="text-center text-muted mb-5">We are passionate about creating amazing travel experiences through technology.</p>

      <div className="row justify-content-center">
        {/* Developer Card 1 */}
        <div className="col-md-5 mb-4">
          <div 
            className="card shadow-lg border-0" 
            style={cardStyle} 
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <img src="/images/img_4.jpg" className="card-img-top" style={imgStyle} alt="Developer 1" />
            <div className="card-body text-center">
              <h4 className="card-title text-primary">Mayur Hajban</h4>
              <p className="text-muted">Full Stack Developer</p>
              <p className="card-text">Mayur is an expert in React and Spring Boot, bringing seamless functionality to this website.</p>
            </div>
          </div>
        </div>

        {/* Developer Card 2 */}
        <div className="col-md-5 mb-4">
          <div 
            className="card shadow-lg border-0" 
            style={cardStyle} 
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <img src="/images/img_5.jpg" className="card-img-top" style={imgStyle} alt="Developer 2" />
            <div className="card-body text-center">
              <h4 className="card-title text-primary">Shantanu Singh Tomar</h4>
              <p className="text-muted">Full Stack Developer</p>
              <p className="card-text">Shantanu specializes in creating beautiful, user-friendly interfaces for an amazing travel experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Myfooter></Myfooter>

  </div>
  )
}

export default About;
