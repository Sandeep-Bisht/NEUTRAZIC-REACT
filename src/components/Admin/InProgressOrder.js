import React, { useEffect,useState } from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Sidemenu from './Sidemenu';
import './Dashboard.css';
import { baseUrl } from '../../utils/services';

const InProgressOrder=()=>{
    const[orders,setOrders]=useState([])
    const[OrderDetails,setOrderDetails]=useState([])
    useEffect(()=>{
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
                           if(item.status.includes('InProgressOrder')|| item.status.includes('In Progress'))
                           {     
                           
                        data1.push({"sr_no":index+1,"name":item.username,"Mobile":item.mobile,"Addtionalnumber":item.othermobile,"Address":item.address,"actualamount":item.actualamount,"totalamount":item.totalamount,"status":<select value={item.status} onChange={(e)=>UpdateOrderStatus(item._id,e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In progress</option>
                            <option value="Delivered">Delivered</option>
                        </select>,"Action":<><button onClick={()=>DeleteOrder(item._id)}><i className="bx bx-trash"></i></button>
                        <button className="ml-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>CaptureDetails(JSON.parse(item.order))}><i className='bx bx-show-alt'></i></button>
                        </>})
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
                     


   

       
       
    return(
        <>
        <div className="container">
        {/* login Register Modal  */}
   <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
         <div className="modal-content">
            <div className="modal-body">
               <div className="row pt-4 ">
                  
                  
                  <div className="col-lg-12 logiRegisterContentDiv ">
                   <div className="text-center"> <h1>User Order's</h1> </div>
                   
                    <div>
                        <table className="table-stripped table-hover text-center" width="100%">
                            <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            { OrderDetails.map((item,index)=>(
                                <tr>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.mrp}</td>
                                </tr>
                                ))}
                            </tbody>
                            
                        </table>
                    </div>
                   
                  </div>
                
               </div>
            </div>
         </div>
      </div>
   </div>
   {/* End login register Modal  */}
        <Sidemenu/>
        
{/* <DataTable
        data={data1}
        columns={columns}
        striped={true}
        hover={true}
        responsive={true}
        // onClickRow={click}
      /> */}
</div>
{/* End Of products table */}
        </>
    );
}

export default InProgressOrder;