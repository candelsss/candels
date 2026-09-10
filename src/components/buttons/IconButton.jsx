

import './iconbutton.css'

export const IconButton = ({ children, icon, onClick }) => {
    return (

        <>
            <div className="icon-button" onClick={onClick}>
                <span>{icon}</span>
                {children}
            </div>
        </>
    );
}
