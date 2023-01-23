import React, { useEffect,useState } from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Sidemenu from './Sidemenu';
import './Dashboard.css';
import DashboardHeaader from './DashboardHeaader';
import { baseUrl } from '../../utils/services';
var Userdata;
const NewOrder=(props)=>{
    const[orders,setOrders]=useState([])
    const[OrderDetails,setOrderDetails]=useState([])
    
      var Total;
    useEffect(()=>{
      Userdata =  JSON.parse(localStorage.getItem("Userdata"))
        GetOrders();
     },[]);
    
              const GetOrders=async()=>{ 
    
                await fetch(`${baseUrl}/api/order/all_order`)
                        .then(res => res.json())
                        .then(async (data) => {
                         setOrders(data.data)
                        //  console.log(" length "+data.data.length)
                          }
                        )
                        .catch((err) => {
                         console.log(err,"errors");
                        });
                      }
                
                      const UpdateOrderStatus = async (productId,status) => {
                        await fetch(`${baseUrl}/api/order/update_order`, {
                           method: "PATCH",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                           },
                           body: JSON.stringify({
                              _id:productId,
                              status:status,
                              justification:'',
                              delivery_time:''
                           }),
                        })
                           .then((res) => res.json())
                           .then(async (data) => {
                              GetOrders();
                     
                           })
                           .catch((err) => {
                              console.log(err, "error");
                           });
                        };
                        const DeleteOrder = async (productId) => {
                            await fetch(`${baseUrl}/api/order/delete_order_by_id`, {
                               method: "delete",
                               headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                               },
                               body: JSON.stringify({
                                  _id:productId,
                               }),
                            })
                               .then((res) => res.json())
                               .then(async (data) => {
                                 
                                  GetOrders();
                         
                               })
                               .catch((err) => {
                                  console.log(err, "error");
                               });
                            };

           const CaptureDetails=(orders)=>
           {
               console.log(orders, "Orderes")
            setOrderDetails(orders)

           }
                      const data1 =[];
                      {
                          orders.map((item,index)=>{
                             console.log(item.status ,"status")

                             if(item.status.includes(props.match.params.status))
                             {     
                             
                          data1.push({"sr_no":index+1,"name":item.username,"Mobile":item.mobile,"Addtionalnumber":item.othermobile,"Address":item.address,"actualamount":item.actualamount,"totalamount":Math.ceil(item.totalamount),"status":
                          Userdata !=undefined && Userdata.role=="superAdmin"?
                          <select className="form-control" value={item.status} onChange={(e)=>UpdateOrderStatus(item._id,e.target.value)}>
                              <option value="Pending">Pending</option>
                              
                              <option value="In Progress">In progress</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Packed">Packed</option>
                              <option value="Cancel">Cancel</option>
                              <option value="Delivered">Delivered</option>
                          </select>:item.status
                          
                          ,"Action":
                          Userdata !=undefined && Userdata.role=="superAdmin"?
                          <><button onClick={()=>DeleteOrder(item._id)} className="btnbtn-danger"><i className="bx bx-trash"></i></button>
                          <button className="ml-2 btnbtn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>CaptureDetails(JSON.parse(item.order))}  ><i className='bx bx-show-alt'></i></button>
                          </>:
                          <button className="ml-2 btnbtn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>CaptureDetails(JSON.parse(item.order))}><i className='bx bx-show-alt'></i></button>
                          
                       
                       })
                             }
                           if(item.status.includes(props.match.params.status)&& JSON.stringify(item.order).includes(Userdata.organization))
                           {     
                           
                        data1.push({"sr_no":index+1,"name":item.username,"Mobile":item.mobile,"Addtionalnumber":item.othermobile,"Address":item.address,"actualamount":item.actualamount,"totalamount":Math.ceil(item.totalamount),"status":
                        Userdata !=undefined && Userdata.role=="superAdmin"?
                        <select value={item.status} onChange={(e)=>UpdateOrderStatus(item._id,e.target.value)}>
                            <option value="Pending">Pending</option>
                            
                            <option value="In Progress">In progress</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Packed">Packed</option>
                            <option value="Cancel">Cancel</option>
                            <option value="Delivered">Delivered</option>
                        </select>:item.status
                        
                        ,"Action":
                        Userdata !=undefined && Userdata.role=="superAdmin"?
                        <><button onClick={()=>DeleteOrder(item._id)} className="btnbtn-danger"><i className="bx bx-trash"></i></button>
                        <button className="ml-2 btnbtn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>CaptureDetails(JSON.parse(item.order))}><i className='bx bx-show-alt'></i></button>
                        </>:
                        <button className="ml-2 btnbtn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>CaptureDetails(JSON.parse(item.order))}><i className='bx bx-show-alt'></i></button>
                        
                     
                     })
                           }
                        })}
                     
                          const columns = [
                            { title: "SR NO", data: "sr_no" },
                            { title: "Name", data: "name" },
                            { title: "Mobile No.", data: "Mobile" },
                            { title: "Addtional number.", data: "Addtionalnumber" },
                            { title: "Address.", data: "Address" },
                            { title: "Actual Amount.", data: "actualamount" },
                            { title: "Paid Amount.", data: "totalamount" },
                            { title: "Status", data: "status" },
                            { title: "Action", data: "Action" },

                          ];
                          const click = (row) => {
                            console.log(row);
                          };
                     


   
// tabs start


// end tabs 
       
    return(
        <>
       <section id='body-pd'>
         <div className='container-fluid'>
           <DashboardHeaader/>
        <div className="row">
        <div className='col-2 px-0'>
         <Sidemenu/>
         </div>
         <div className='col-10'>
        {/* login Products Details Modal  */}
   <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog justify-content-center d-grid">
         <div className="modal-content order-details-div">
            <div className="modal-body ">
               <div className="row pt-4 ">
                  
                {/* tabs */}
                



                  {/* end tabs */}


                  <div className="col-12 logiRegisterContentDiv ">
                   <div className="text-center heading"> <h1>User Order's</h1> </div>
                   
                    <div>
                        <table className="table-stripped table-hover text-center"  width="100%">
                            <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Manufacture</th>
                                <th>Status</th>
                                <th>Price</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                           {Userdata!=undefined? Userdata.role=="Vendor"?
                             OrderDetails.map((item,index)=>{
                               
                               if(Userdata.organization==item.manufacturer){
                               Total +=  Math.ceil(item.mrp-(100/item.discountprice))
                               return(
                                <tr>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.manufacturer}</td>
                                <td>{item.status}</td>
                                <td>{Math.ceil(isNaN(item.mrp - (item.mrp * item.discountprice) / 100)
                                 ? 0
                                 : item.mrp - (item.mrp * item.discountprice) / 100)}</td>
                                </tr>
                                
                               )}
                             })
                                :null:null}
                                {Userdata!=undefined? Userdata.role=="superAdmin" || Userdata.role=="Manager"?
                             OrderDetails.map((item,index)=>(
                               
                                
                                <tr>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.manufacturer}</td>
                                <td><select className="form-control" value={item.status} onChange={(e)=>UpdateOrderStatus(item._id,e.target.value)}>
                              <option value="Pending">Pending</option>
                              
                              <option value="In Progress">In progress</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                           
                              <option value="Cancel">Cancel</option>
                              <option value="Delivered">Delivered</option>
                          </select>
                          
                          </td>
                                <td>{Math.ceil(isNaN(item.mrp - (item.mrp * item.discountprice) / 100)
                                 ? 0
                                 : item.mrp - (item.mrp * item.discountprice) / 100)}</td>
                                </tr>
                               
                               
                                ))
                                :null:null}
                            </tbody>
                            
                        </table>
                    </div>
                   
                  </div>
                
               </div>
            </div>
         </div>
      </div>
   </div>
   </div>
   </div>
   </div>
   </section>

        </>
    );
}

export default NewOrder;