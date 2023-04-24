import React,{useEffect} from "react";
import Header1 from "./Header1";
import '../components/Faq.css';
import Footer from "./Footer";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function Faq () {
  useEffect(()=>{
    window.scroll(0,0);
  },[])

    return (
        <>
        <Header1/>
        <div className="container m-auto">
        <div className="single-faq">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-4 pb-2">FAQ Area</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-10 mx-auto">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button collapsed"
                     id="accordionOne"
                      type="button" 
                      data-bs-toggle="collapse"
                     data-bs-target="#collapseOne" 
                      aria-expanded="false"
                     aria-controls="collapseOne"
                      >
                     <span className="one">What is Sell on Nutrazik</span> 
                      <span className="two">                    
                      <AiOutlineMinus className="icon1"/>
                      <AiOutlinePlus className="icon2" />

                    </span>
                    </button>
                    
              
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                       <p className="common-para-3">
                       Sell on Nutrazik is a program that enables you to list and sell your unique product on https://Nutrazik.giksindia.com/.
                       </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" 
                    type="button" data-bs-toggle="collapse" id="accordionTwo" data-bs-target="#collapseTwo" 
                    aria-expanded="false" aria-controls="collapseTwo" 
                    >
                   <span className="one">What products can I sell on Nutrazik?</span>
                      <span className="two">
                    <AiOutlineMinus className="icon1"/>
                      <AiOutlinePlus className="icon2" />
                    </span>
                    </button>
                   
              
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <p className="common-para-3">
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button"  id="accordionThree"
                    data-bs-toggle="collapse" data-bs-target="#collapseThree" 
                    aria-expanded="false" aria-controls="collapseThree" 
                    // onClick={(e)=>Toogle(e)}
                    >
                      <span className="one">What do I need to register as a seller on Nutrazik?</span>
                      <span className="two">
                    {/* {showInfo.accordionThree == true ? <AiOutlineMinus /> : <AiOutlinePlus />} */}
                    <AiOutlineMinus className="icon1"/>
                      <AiOutlinePlus className="icon2" />
                    </span>
                    </button>
                  
              
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <p className="common-para-3">
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button"  id="accordionFour"
                    data-bs-toggle="collapse" data-bs-target="#collapseFour" 
                    aria-expanded="false" aria-controls="collapseThree" 
                    >
                      <span className="one">I don’t have a website, can I still sell on Nutrazik?</span>
                      <span className="two">
                    <AiOutlineMinus className="icon1"/>
                      <AiOutlinePlus className="icon2" />
                    </span>
                    </button>
                  
              
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <p className="common-para-3">
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button className="accordion-button collapsed" type="button"  id="accordionFive"
                    data-bs-toggle="collapse" data-bs-target="#collapseFive" 
                    aria-expanded="false" aria-controls="collapseFive" 
                    >
                      <span className="one">Can customers leave feedback and why is customer feedback important?</span>
                      <span className="two">
                    <AiOutlineMinus className="icon1"/>
                      <AiOutlinePlus className="icon2" />
                    </span>
                    </button>
                  
              
                  </h2>
                  <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <p className="common-para-3">
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, 
                       whatever poutine normcore fixie cred kickstarter post-ironic street art.
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <Footer/>
        </div>
        </>
    )
}
export default Faq;