import './button.css'


export const Button = ({children, onClick, type = 'button', className = '', icon = null, iconPosition = 'left'}) => {
    return (
        <>
        <button className={`button ${className}`} type={type} onClick={onClick}>
            {icon && iconPosition === 'left' && <span className="button-icon">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="button-icon">{icon}</span>}
        </button>
        </>
     );
}
