import  React, { useState, useEffect}  from 'react';
import Header1 from './Header1';

const Success = () => {

    const [message, setMessage] = useState("");

      useEffect(() => {
        const query = new URLSearchParams(window.location.search);
    
        if (query.get("success")) {
          setMessage("Order placed! You will receive an email confirmation.");
        }
    
        if (query.get("canceled")) {
          setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }, []);


    return(
        <>
        <Header1 />
        <div>
        <h1>Your Order has been placed</h1>
        </div>
        </>
    )
}

export default Success

