import "./ServiceStyle.css";
import {BsBusFront} from 'react-icons/bs'
const ServicePage = () => {
  return (
    <>
        <h1>OUR SERVICES  <BsBusFront style={{fontSize:35,marginTop:10}}/></h1>
        <div className="parent">
            <div className="child1" style={{width:320}}>
                <h3>RAMESHWARAM</h3>
                <p>RAMESHWARAM --&gt; MADURAI</p>
                <p>RAMESHWARAM --&gt; SIVAKASI</p>
                <p>RAMESHWARAM --&gt; COIMBATORE</p>
                <p>RAMESHWARAM --&gt; CHENNAI</p>
                <p>RAMESHWARAM --&gt; SALEM</p>
                <p>RAMESHWARAM --&gt; PERAMBALUR</p>
                <p>RAMESHWARAM --&gt; KANYAKUMARI</p>
            </div>
            <div className="child2">
                <h3>SIVAKASI</h3>
                <p>SIVAKASI --&gt; MADURAI</p>
                <p>SIVAKASI --&gt; RAMESHWARAM</p>
                <p>SIVAKASI --&gt; COIMBATORE</p>
                <p>SIVAKASI --&gt; CHENNAI</p>
                <p>SIVAKASI --&gt; SALEM</p>
                <p>SIVAKASI --&gt; PERAMBALUR</p>
                <p>SIVAKASI --&gt; KANYAKUMARI</p>
            </div>
            <div className="child3">
                <h3>MADURAI</h3>
                <p>MADURAI --&gt; RAMESHWARAM</p>
                <p>MADURAI --&gt; SIVAKASI</p>
                <p>MADURAI --&gt; COIMBATORE</p>
                <p>MADURAI --&gt; CHENNAI</p>
                <p>MADURAI --&gt; SALEM</p>
                <p>MADURAI --&gt; PERAMBALUR</p>
                <p>MADURAI --&gt; KANYAKUMARI</p>
            </div>

        </div>
    </>
    
  )
}

export default ServicePage