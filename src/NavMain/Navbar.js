import {BiHomeHeart,BiSolidUserCircle,BiSolidPhoneCall} from 'react-icons/bi'; 
import {MdMiscellaneousServices} from 'react-icons/md'; 
import { Link } from 'react-router-dom';
import './Navbar.css';
export default function Navbar(){
    const styleIcons={fontSize:35,paddingTop:10,color:'aqua'};
    return(
        <nav>
            <ul>
            <li><Link to="/home" className="nav-link"><BiHomeHeart style={styleIcons}/> HOME</Link></li>
            <li><Link to="/contact" className="nav-link"><BiSolidPhoneCall style={styleIcons}/> CONTACT</Link></li>
            <li><Link to="/service" className="nav-link"><MdMiscellaneousServices style={styleIcons} /> SERVICE</Link></li>
            <li><Link to="/about" className="nav-link"><BiSolidUserCircle style={styleIcons}/> ABOUT</Link></li>
            </ul>
        </nav>
    );
}