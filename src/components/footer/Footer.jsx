
import './footer.css'


export const Footer = () => {
    return (
        <>


<div className="footer-separador">
    <div className="separador"></div>
    <div className="separador"></div>
    <div className="separador"></div>
</div>

        <footer className="footer">

            <div className="footer-content">
                <img src="/img/LOGO.png" alt="Candels Logo" className="footer-logo" />

            </div>

            <ul className="footer-content">
                <li className="footer-li">PORTFOLIO</li>
                <li className="footer-li">CONTACTO</li>

            </ul>

            <ul className="footer-content-contact">
                <li className="footer-li">Valencia, Spain</li>
                <li className="footer-li"><a href="" className="insta">@candelssssssweb</a></li>
                 <li className="footer-li" mailto="infocandels@gmail.com">infocandels@gmail.com</li>
                 <li className="footer-li" mailto="infocandels@gmail.com">(+34) 654 068 208</li>

            </ul>
        </footer>

        </>
     );
}
