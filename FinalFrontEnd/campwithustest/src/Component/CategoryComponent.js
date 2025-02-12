import React, { useEffect, useState } from 'react';
import MyHeader from './MyHeader';
import { allCategories } from '../Service/CategoryService';
import { Link } from 'react-router-dom';
import Myfooter from './MyFooter';

const CategoryComponent = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        allCategories().then((response) => {
            setCategories(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <>
            <MyHeader></MyHeader>
            <br></br>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
                {categories.map(category => (
                    <div className="card shadow-sm" style={{ width: "18rem", borderRadius: "12px", overflow: "hidden" }} key={category.id || category.categoryId}>
                        <img
                            src="/images/insta_1.jpg"
                            className="card-img-top"
                            style={{
                                width: "100%",
                                height: "180px",
                                objectFit: "cover",
                                borderRadius: "12px",  // Curved corners for the image
                                marginTop: "10px",      // Space between image and top of card
                                padding: "5px"         // Slight padding to prevent image from sticking
                            }}
                            alt="Category"
                        />
                        <div className="card-body">
                            <p className="card-text"><strong>Category ID:</strong> {category.categoryId}</p>
                            <h5 className="card-title">{category.categoryName}</h5>
                            <p className="card-text text-muted">{category.description}</p>
                            <Link to={`/searchcategory/${category.categoryId}`} className="btn btn-primary w-100">See Trips</Link>
                        </div>
                    </div>
                ))}
            </div>
            <Myfooter></Myfooter>
        </>
    );
};

export default CategoryComponent;