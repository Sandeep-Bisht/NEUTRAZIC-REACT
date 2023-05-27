import React, {useEffect} from 'react';
import Footer from './Footer';
import Header1 from './Header1';
import '../components/ReturnRefund.css';
import Baseline from './Baseline';

function ReturnRefund() {
    useEffect(()=>{
        window.scroll(0,0);
    },[])
  return (
    <>
<Header1/>
    <div className='container m-auto'>
        <div className='row'>
            <div className='col-12'>
                <div className='return-policy-section'>
                    <p>Thank you for choosing to shop with us. We are committed to providing you with the best possible shopping experience. However, we understand that sometimes a product may not meet your expectations or may be damaged during shipping. In such cases, we have a comprehensive return and refund policy to ensure that you are satisfied with your purchase.</p>
                    <h2>Returns</h2>
                    <p>If you are not satisfied with your purchase, you may return the item(s) within 30 days of delivery. To be eligible for a return, the item(s) must be unused, undamaged, and in their original packaging. Please note that some items, such as personalized or custom-made products, may not be eligible for return.</p>
                    <p>To initiate a return, please contact our customer support team with your order number and reason for return. We will provide you with instructions on how to return the item(s) and issue a return authorization number. Once we receive the returned item(s), we will inspect them to ensure they meet our return policy requirements. If approved, we will issue a refund to your original payment method within 7-10 business days.</p>
                    <h2>Refunds</h2>
                    <p>We offer refunds for products that are damaged during shipping, defective, or not as described on our website. If you receive a damaged or defective product, please contact our customer support team within 48 hours of delivery. We will arrange for a replacement or issue a full refund, depending on your preference.</p>
                    <p>If you decide to cancel your order before it is shipped, we will issue a full refund to your original payment method. However, if the order has already been shipped, you will need to initiate a return as described above.</p>
                    <p>Please note that shipping and handling fees are non-refundable, and you will be responsible for the cost of return shipping. If the product was defective or damaged during shipping, we will cover the cost of return shipping.</p>
                    <p>We strive to make the return and refund process as smooth and hassle-free as possible. If you have any questions or concerns, please do not hesitate to contact our customer support team for assistance.</p>
                    <h2>Questions?</h2>
                    <p>If you have any questions concerning our return policy, please contact us at : <br/> <b>info@nutrazik.com</b></p>
                </div>
            </div>
        </div>
    </div>
    <Baseline/>
    <Footer/>
    </>
  )
}

export default ReturnRefund