import React from 'react';
import './Landing.css';

function Landing() {

    const siteName = "Sound Lounge";

    return (
        <div className="background-div">
            <div className="test-div">
                <h1>{siteName}</h1>
                <h3 style={{ textAlign: "center" }}>Welcome to {siteName}</h3>
                <h5>Here you will find a warm and welcoming community of fellow guitar enthusiasts. At {siteName},
                    you will be able to find and share content about guitars, technique, styles, and pretty much anything you'd
                    like about guitars!
                </h5>
                <h5>Feel free to post content, make comments, find friends, and more ... only here at {siteName}.
                </h5>
                <br />
                <h5>
                    "Music is Magic. Music is Life." - Jimi Hendrix
                </h5>

            </div>
            <div className="test-div" id="register">
                <p>Already have an account? Login Here</p>
                <p>Need an account? Register Here</p>

            </div>

        </div>
    )
}

export default Landing;