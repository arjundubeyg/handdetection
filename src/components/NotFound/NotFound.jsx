import React from 'react'
import "./NotFound.css"


const NotFound = () => {
  return (
    <div className='signlang_notfound-container'>
        <div className="signlang_notfound-img">
  
        </div>

        <div className="signlang_notfound-data">
            <p className='gradient__text'>This Page Doesn't exists. Please Click on below button to go back to SLR</p>
            
            <button>
                <a href="/">
                    Go Back
                </a>
            </button>
        </div>
    </div>
  )
}

export default NotFound