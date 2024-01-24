import React from 'react';
import './Landing.css';

function Landing() {
    return (
        <div className="background-div">
            <div className="test-div">
                <h1>Sound Stage Guitars</h1>
                <h3 style={{ textAlign: "center" }}>Welcome to Sound Stage Guitars</h3>
                <h5>Here you will find a warm and welcoming community of fellow guitar enthusiasts. At Sound Stage Guitars,
                    you will be able to find and share content about guitars, technique, styles, and pretty much anything you'd
                    like about guitars!
                </h5>
                <h5>Feel free to post content, make comments, find friends, and more ... only here at Sound Stage Guitars.
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