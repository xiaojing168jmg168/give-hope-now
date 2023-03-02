import React from "react";

import { Link } from 'react-router-dom';

function About() {
  return (

      <div className="p-5 container">
        <h2>About Us</h2>
            <p className="card-body m-5">

              We are a not-for-profit website where we promote
              charities all around the United States. 100% of donations
              are given to the charities of the donners choosing.

              If you have questions, <Link to="/contact">here</Link> is our contact info.
              And if you want to add your charity, <Link to="/signup">sign up here!</Link>
        </p>
        </div>
       
    )

}



export default About;