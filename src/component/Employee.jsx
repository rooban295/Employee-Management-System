import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Flip, ToastContainer, Zoom, toast } from 'react-toastify';
import { ImLocation } from "react-icons/im";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { DatePicker } from 'antd';
import { Alert, Form, Input } from 'antd';
import { message } from "antd"
// import { Button, message, Space } from 'antd';
;
export const Employee = () => {

  const [messageApi, contextHolder] = message.useMessage();

  const success = (type,msg) => {
    messageApi.open({
      type: type,
      content: msg,
    });
  };
  const searchResult=useSelector((state)=>state.search.searchKeyword);
 
  const[employee,setEmployee]=useState([]);

  const[empUpdate,setEmpUpate]=useState({
    employeeName:'',
    employeeEmail:'',
    role:'',
    employeeAddress:'',
    profileImage:''
  })

  const[empAdd,setEmpAdd]=useState({
    employeeName:'',
    employeeEmail:'',
    role:'',
    employeeAddress:'',
    profileImage:''
  })

  const [sortOrder, setSortOrder] = useState("asc");

  const sortedEmployees = [...employee].sort((a, b) => {
    return sortOrder === "asc"
      ? a.employeeName.localeCompare(b.employeeName)
      : b.employeeName.localeCompare(a.employeeName);
  });

  useEffect(()=>{
    fetchEmployee();
  },[])

  const fetchEmployee=()=>{
    axios.get('https://67a4618231d0d3a6b7862340.mockapi.io/employee')
    .then((res)=>{
      setEmployee(res.data)  
    })
    .catch((err)=>{
      console.log(err);  
    })
  }

  const getEmployee=(id)=>{
    axios.get(`https://67a4618231d0d3a6b7862340.mockapi.io/employee/${id}`)
    .then((res)=>{
       setEmpUpate(res.data)
    })
    .catch((err)=>{
      console.log(err);  
    })
  }

  const updateEmployee=(emp)=>{
    
    axios.put(`https://67a4618231d0d3a6b7862340.mockapi.io/employee/${emp.id}`,emp)
    .then((res)=>{
    //  toast.success("Employee Updated Successfully")
     success('success','Employee Updated Successfully')
     fetchEmployee()
    })
    .catch((err)=>{
      console.log(err);  
    })
  }

  const deletetEmployee=(id)=>{
    axios.delete(`https://67a4618231d0d3a6b7862340.mockapi.io/employee/${id}`)
    .then((res)=>{
      // toast.success("Employee Deleted successfully")
      success('success','Employee Deleted Successfully');
      fetchEmployee()
        })
    .catch((err)=>{
      console.log(err);  
    })
  }

  const[deleteId,setDeleteId]=useState(null);
  const handelDelete=(id)=>{
    setDeleteId(id);
  }
  const handelDeleteButton=()=>{
    deletetEmployee(deleteId)
  }

  const handelUpdate=(id)=>{
    getEmployee(id)
  }

  const handleUpdateEvent=(e)=>{
    const {name,value}=e.target
    setEmpUpate({...empUpdate,[name]:value});
  }

  const handelUpdateButton=()=>{
    updateEmployee(empUpdate);
  }


  const addEmployee=(emp)=>{
    axios.post(`https://67a4618231d0d3a6b7862340.mockapi.io/employee/`,emp)
    .then((res)=>{
      success('success','Employee Added Successfully');
      fetchEmployee()
      setEmpAdd({})
    })
    .catch((err)=>{
      console.log(err);  
    })
  }
  const handleAddEvent=(e)=>{
    const {name,value}=e.target
    setEmpAdd({...empAdd,[name]:value});
  }

  const handelAddButton=(e)=>{
    e.preventDefault();  
    addEmployee(empAdd);
  }

  const [form] = Form.useForm();
  const nameValue = Form.useWatch('name', form);
  // The selector is static and does not support closures.
  const customValue = Form.useWatch((values) => `name: ${values.name || ''}`, form);


  return (
    <div className='mx-4'>
    {contextHolder}
    <ToastContainer position='top-center' hideProgressBar={true} autoClose={2000} closeButton={false}/>

    <section className='mt-3 d-flex justify-content-between align-items-center'>
      <div>
        <select name="" id="" className='border-0 outline-0' onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Sort By Name</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      <div className='p-2 border bg-light'>
        Total Employee {employee.length}
        </div>
    </section>

    <div className="container mt-5">

  <div className="row g-5">

      {
      sortedEmployees.filter((emp) => 
        emp.employeeName.toLowerCase().startsWith(searchResult.toLowerCase())
      ||emp.employeeName.startsWith(searchResult.toUpperCase())
      ||emp.role.toLowerCase().startsWith(searchResult.toLowerCase())
      ||emp.role.startsWith(searchResult.toUpperCase())
      ||emp.employeeAddress.toLowerCase().startsWith(searchResult.toLowerCase())
      ||emp.employeeAddress.startsWith(searchResult.toUpperCase())
    ).map((emp,index)=>(
      <div className="col-sm-6 col-md-4 col-lg-3 col-lg-3 p-2 shadow-xl" key={index}> 
      <div className="card p-2 pt-3">
      <div className='d-flex gap-3'>
      <img src={emp.profileImage} style={{ height: '60px', width: '60px' }} className="card-img-top rounded-circle" alt="..."/>
      <div>
      <h5 className="card-title fs-6">{emp.employeeName}</h5>
      <h5 className="card-title fs-6">{emp.role}</h5>
      </div>
      </div>
      <div className="card-body">
        <div className='mb-2 d-flex gap-2'><MdOutlineMarkEmailRead className='d-inline'/><h5 className="card-title fs-6 d-inline"> {emp.employeeEmail}</h5></div>
        <div className='d-flex gap-2'><ImLocation className='d-inline'/><p className="card-title fs-6 d-inline">{emp.employeeAddress}</p></div>
        <div className='d-flex gap-2 flex-end justify-content-end'>
        <button onClick={()=>handelUpdate(emp.id)}  type="button" className="btn btn-primary p-1"  data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo"><CiEdit /></button>
        <button onClick={()=>handelDelete(emp.id)} type="button" className="btn btn-danger p-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><MdOutlineDelete /></button>
        </div>
        </div>
        </div>
       </div>
        ))
      }



{/* update emp */}
<div className="modal fade mt-2" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog mt-1">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Employee</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div className="modal-body">
        <form className=''>

          <div className="mb-1">
            <label className="col-form-label">Employee Name:</label>
            <input type="text" className="form-control" value={empUpdate.employeeName} name='employeeName' onChange={handleUpdateEvent} />
          </div>

          <div className="mb-1">
            <label  className="col-form-label">EmployeeEmail</label>
            <input type="text" className="form-control" value={empUpdate.employeeEmail} name='employeeEmail' onChange={handleUpdateEvent}/>
          </div>

          <div className="mb-1">
            <label  className="col-form-label">Employee Role</label>
            <input type="text" className="form-control"name='role' value={empUpdate.role} onChange={handleUpdateEvent}/>
          </div>

          <div className="mb-1">
            <label  className="col-form-label">Employee Address</label>
            <textarea className="form-control" name='employeeAddress' value={empUpdate.employeeAddress} onChange={handleUpdateEvent}></textarea>
          </div>

          <div className="mb-1">
            <label  className="col-form-label">profile Image</label>
            <textarea className="form-control" name='profileImage' value={empUpdate.profileImage} onChange={handleUpdateEvent}></textarea>
          </div>
        </form>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handelUpdateButton} data-bs-dismiss="modal" className="btn btn-primary">Update</button>
      </div>

    </div>
  </div>
</div>






{/* Delete popup */}
<div className="modal fade mt-2" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Delete</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Are you sure do you want to delete?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button onClick={()=>handelDeleteButton()} type="button" data-bs-dismiss="modal" className="btn btn-primary">Yes</button>
      </div>
    </div>
  </div>
</div>
  </div>


{/* Add Emp */}
  <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div className="modal-dialog mt-2">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Employee</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div className="modal-body">
        
      <form className='' onSubmit={handelAddButton}>
          <div className="mb-0">
            <label className="col-form-label">Employee Name:</label>
            <input type="text" required className="form-control" value={empAdd.employeeName} name='employeeName' onChange={handleAddEvent}  />
          </div>

          <div className="mb-1">
            <label  className="col-form-label">EmployeeEmail</label>
            <input type="text" className="form-control" value={empAdd.employeeEmail} name='employeeEmail' onChange={handleAddEvent} required/>
          </div>

          <div className="mb-1">
            <label  className="col-form-label">Employee Role</label>
            <input type="text" className="form-control"name='role' value={empAdd.role} onChange={handleAddEvent} required/>
          </div>

          <div className="mb-1">
            <label  className="col-form-label">Employee Address</label>
            <textarea className="form-control" name='employeeAddress' value={empAdd.employeeAddress} onChange={handleAddEvent} required></textarea>
          </div>

          <div className="mb-1">
            <label  className="col-form-label">profile Image</label>
            <textarea className="form-control" name='profileImage' value={empAdd.profileImage} onChange={handleAddEvent} required></textarea>
          </div>

          <button type="submit" data-bs-dismiss="modal"  className="btn btn-primary">Add</button>
        </form>
      </div>

      <div className="modal-footer">
        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
      </div>

    </div>
  </div>
</div>

</div>

    </div>
  )
}
