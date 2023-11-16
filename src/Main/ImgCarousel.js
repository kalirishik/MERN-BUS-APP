import React,{useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoginPage from '../Main/LoginPage';
import './Image.css';
const ImageCarousel = () => {
  const [showLoginPage,setShowLoginPage]=useState(false);
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 1000, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 2000,
  };
  function handleLoginClick(){
    setShowLoginPage(true);
  };
  return (
    <div>
        {!showLoginPage ? (
        <div>   
      <Slider {...settings}>
        <div>
          <img src="https://wallpapercave.com/dwp1x/wp9185666.jpg" alt="Image 1" />
        </div>
        <div>
          <img  src="https://wallpapercave.com/dwp1x/wp9185555.jpg" alt="Image 2" />
        </div>
        <div>
          <img src="https://wallpapercave.com/dwp1x/wp9185675.jpg" alt="Image 3" />
        </div>
      </Slider>
      <button id="myButton1" onClick={handleLoginClick}>CLICK TO LOGIN</button><br/><br/>
    </div>
    ):(
        <LoginPage setShowLogin={setShowLoginPage}/>
        )}
        </div>
  );
};
export default ImageCarousel;
