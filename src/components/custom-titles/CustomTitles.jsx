

import './custom-titles.css'

export const CustomTitles = ({ children }) => {
    return (
        <div className='title-container'>

            <div className="circles">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>

            <div className="custom-title">
                <h1>{children}</h1>
            </div>

             <div className="circles">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    )
}
