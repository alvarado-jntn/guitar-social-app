import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';

function Logout(){
    useEffect(()=>{
        
    },[]);

    function logout(){
        localStorage.clear();
        window.location.reload();
    }
    return(
        <div className="background-div">
            <h1>Are you sure you wish to logout?</h1>
            <Button variant="primary"  href="/" >Return to Home</Button> &nbsp;
            <Button variant="danger"  href="/" onClick={logout}>Logout</Button>
            
        </div>
    );
}
export default Logout;