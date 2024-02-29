import React from 'react';
import './Home.css';
import jimiPhoto from '../../Images/JimiHendrix.jpg';

function Home() {

    const siteName = "Sound Lounge";

    return (
        <div className="background-div">
            <div className="test-div">
                <h1 style={{color:"#ffc107"}}>Welcome to {siteName}</h1>
                <br/>
                <br/>
                <h5>Here you will find a warm and welcoming community of fellow guitar enthusiasts. At {siteName},
                    you will be able to find and share content about guitars, technique, styles, and pretty much anything you'd
                    like about guitars!
                </h5>
                <br/> 
                <br/> 
                <h5>Feel free to post content, make comments, find friends, and more ... only here at {siteName}.
                </h5>
                <br />
                <h5>
                    "Music is Magic. Music is Life." - Jimi Hendrix
                </h5>
                <br />

            </div>

            <div className='image-div'>
                <img src={jimiPhoto} alt='Jimi Hendrix.' />

            </div>
            <div className="test-div" id="register">
                {localStorage.getItem("loggedIn") ? <></> : <p>Already have an account? <a style={{ color: "lime" }} href="/login">Login Here</a> </p>}
                {localStorage.getItem("loggedIn") ? <></> : <p>Need an account? <a style={{ color: "lime" }} href="/register">Register Here</a></p>}

            </div>

        </div>
    )
}

export default Home;