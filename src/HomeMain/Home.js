import ImageCarousel from "../Main/ImgCarousel"
import Navbar from "../NavMain/Navbar"
import LoginFooter from "../Main/loginFooter"
import LoginHeader from "../Main/loginHeader"
const Home = () => {
  return (
    <div>
      <Navbar/>
      <LoginHeader/>
      <ImageCarousel/>
      <LoginFooter/>
    </div>
  )
}

export default Home