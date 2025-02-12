import React, { useState } from 'react'
import { createMatch } from '../Service/MatchService';
import { useNavigate } from 'react-router-dom';

function MatchDetails() {

    const navigate = useNavigate();

    // State to hold form data
    const [match, setMatch] = useState({
        userId : ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMatch({ ...match, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const tripId = 1; // Replace with actual trip ID
        try {
            const response = await createMatch(tripId, match.userId);
            console.log('Match added successfully:', response.data);
            navigate('/test');
        } catch (error) {
            console.error('Error adding trip:', error);
        }
    };
    

  return (
    <div>
      <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="locationName" className="form-label">Location Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userId"
                        name="userId"
                        value={match.userId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Book trip</button>
                </form>
    </div>
  )
}

export default MatchDetails

