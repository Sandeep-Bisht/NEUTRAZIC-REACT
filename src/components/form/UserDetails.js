import React, { useEffect,useState } from 'react';
import '../../components/Admin/Dashboard.css'
import Header1 from '../../components/Header1'
import Baseline from '../../components/Baseline'
import Footer from '../../components/Footer'
import { baseUrl } from '../../utils/services';
var Userdata=''
var Usercartdata=''
var Subtotal1=''
var ActualSubtotal1=''
const UserDetails=(props)=>{
    const [cart, setCart] = useState([]);
    const [_id,Set_id]=useState()
    var total=''
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    var    newdate = day + "/" + month + "/" + year;
    console.log(newdate, "date")

    useEffect(() => {
       
        Userdata = JSON.parse(localStorage.getItem("Userdata"))
        console.log(Userdata,"sadbhksabdhk")

        Usercartdata = JSON.parse(localStorage.getItem("Usercartdata"))
        console.log(Usercartdata,"sadbhksabdhk11111")

        Subtotal1 =  localStorage.getItem("Subtotal")
        console.log(Subtotal1,"sadbhksabdhk222")

        ActualSubtotal1 =  localStorage.getItem("ActualSubtotal")
        console.log(ActualSubtotal1,"sadbhksabdhk333")
        CartById()
        },[]);
    const[data,Setdata]=useState(
        {
            country:'',
            address:'',
            pincode:'',
            mobile:'',
            othermobile:'',
            email:'',
            orderfor:'',
            order:[],
            userid:'',
            status:'Pending',
            justification:'kh',
            delivery_time:'jgj',
            order_no:'',
            totalamount:'',
            actualamount:'',
            instruction:'',
            addresstype:'',
            deliverytype:'',
            username:''
        
        }
    ) 

    const submitData=async(e)=>{
        e.preventDefault()
        let {address}=data
        const formData = new FormData()
        await formData.append('country',data.country)
       await formData.append('address',address)
       await formData.append('pincode',data.pincode)
       await formData.append('mobile',data.mobile)       
       await  formData.append('othermobile',data.othermobile)
       await  formData.append('email',data.email)
       await formData.append('orderfor',data.orderfor)
       await formData.append('order',data.order)
       await formData.append('userid',Userdata._id)
       await formData.append('status',data.status)
       await formData.append('justification',data.justification)
       await formData.append('delivery_time',data.delivery_time)
       await formData.append('order_no',Math.floor(Math.random() * 1000000))
       await formData.append('totalamount',Subtotal1)
       await formData.append('actualamount',ActualSubtotal1)
       await formData.append('instruction',data.instruction)
       await formData.append('addresstype',data.addresstype)
       await formData.append('deliverytype',data.deliverytype)
       await formData.append('username',Userdata.username)
        const url=`${baseUrl}/api/order/add_order`
                await fetch(url,
                    {  
                         method:'POST',                  
                        // headers: {
                        // 'Accept': 'application/json',
                        // 'Content-Type': 'multipart/form-data'
                        //   },
                    body:formData
                })
                .then(res => res.json())              
                .then((res)=>{  
                  DeleteCart()
             
            
               
               
                })            
                .catch(err=>console.log(err)) 
        console.log(formData)
    } 
    const CartById = async () => {
      if(!Userdata==[]){   
        
          await fetch(`${baseUrl}/api/cart/cart_by_id`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: Userdata._id,
          }),
        })
          .then((res) => res.json())
          .then(async (res) => {
            console.log(res, "hello")
             await Setdata({...data,order:JSON.stringify(res.data[0].order)});
             
            await  Set_id(res.data[0]._id)
            
            })
          .catch((err) => {
            console.log(err, "error");
          });
        }
      };   


      const DeleteCart =async () => {
          await fetch(`${baseUrl}/api/cart/delete_cart_by_id`, {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: props.match.params._id,
          }),
        })
          .then((res) => res.json())
          .then(async (res) => {
            
            })
          .catch((err) => {
          });
      };   

      console.log('initisl state', data) 
    return(
        <>
        <Header1/>
        <div id="body-pd">
        <form>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card p-4 m-2">
                            <h5>User Details</h5>                        
                        <div className="row">
                        <div className="col-6 p-1">
                                <select  className="form-control Dashborad-search" placeholder="Country " onChange={(e)=>{Setdata({...data,country:e.target.value})}} >
                                    <option>Select Country</option>
                                    <option value="India">India</option>
                                    <option value="America">America</option>
                                    <option value="Pakistan">Pakistan</option>
                                </select>
                            </div>
                           
                            <div className="col-6 p-1">
                                <textarea type="text" className="form-control Dashborad-search" placeholder="Address " onChange={(e)=>{Setdata({...data,address:e.target.value})}}></textarea>
                            </div>
                            <div className="col-6 p-1">
                                <input type="number" className="form-control Dashborad-search" placeholder="Pincode " onChange={(e)=>{Setdata({...data,pincode:e.target.value})}} />
                                   
                            </div>
                                <div className="col-6 p-1">
                                    <input type="number"  className="form-control Dashborad-search" placeholder="Mobile Number" rows="3" onChange={(e)=>{Setdata({...data,mobile:e.target.value})}} />               
                                 </div>
                                 <div className="col-6 p-1">
                                    <input type="text" className="form-control Dashborad-search" placeholder="Additional Mobile Number" rows="3" onChange={(e)=>{Setdata({...data,othermobile:e.target.value})}} /> 
                                    
                                  </div>
                                  <div className="col-6 p-1">
                                    <input type="email" className="form-control Dashborad-search" placeholder="Email" rows="3" onChange={(e)=>{Setdata({...data,email:e.target.value})}} /> 
                                    
                                  </div>
                                    </div>
                                <div><br/>
                                <h4>Order For</h4>
                                    <input type="radio" id="html" name="fav_language" value="For Me" onChange={(e)=>{Setdata({...data,orderfor:e.target.value})}} />
                                    <label for="html">For Me</label>&nbsp;
                                    <input type="radio" id="html" name="fav_language" value="For Me" onChange={(e)=>{Setdata({...data,orderfor:e.target.value})}} />
                                    <label for="html">For Other</label>
                                </div>
                                {
                           cart.map((el,ind1)=>(
                             total+=( el.mrp - (el.mrp * el.discountprice / 100) )* el.quantity,
                            
                                <>
                                    <span onChange={(e)=>{Setdata({...data,totalamount:e.target.value})}}>{total}hii</span>
                                </>
                            
                           ))}
                                    
                                <div className="col-12 p-1">                     <div className="col-12 p-1">
                                    <button className="btn btn-primary"onClick={(e)=>{submitData(e)}}>Submit</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <Baseline />
   <Footer />
        </>
    );
}

export default UserDetails;