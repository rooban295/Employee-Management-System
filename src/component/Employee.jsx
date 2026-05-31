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
import './Employee.css'
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
  const [localSearch, setLocalSearch] = useState('');
  const [view, setView] = useState('grid');

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

    <section className='controls mt-3 d-flex flex-wrap justify-content-between align-items-center'>
      <div className='d-flex align-items-center gap-3'>
        <div>
          <h3 className='mb-0'>Employee Directory</h3>
          <div className='text-muted small'>Manage team members with ease</div>
        </div>
      </div>

      <div className='d-flex gap-2 align-items-center control-actions'>
        <input value={localSearch} onChange={(e)=>setLocalSearch(e.target.value)} placeholder='Search by name, role or address' className='form-control form-control-sm search-input'/>
        <select onChange={(e) => setSortOrder(e.target.value)} className='form-select form-select-sm'>
          <option value="asc">Sort: A-Z</option>
          <option value="desc">Sort: Z-A</option>
        </select>
        <button className='btn btn-primary btn-sm d-none d-md-inline' data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
      </div>
    </section>

    <div className="container mt-5">

  <div className="employee-grid">

      {
      sortedEmployees.filter((emp) => {
        const query = (localSearch || searchResult || '').toString().toLowerCase().trim();
        if(!query) return true;
        const name = (emp.employeeName||'').toLowerCase();
        const role = (emp.role||'').toLowerCase();
        const addr = (emp.employeeAddress||'').toLowerCase();
        return name.includes(query) || role.includes(query) || addr.includes(query);
      }).map((emp,index)=>(
      <div className="emp-col p-2" key={index}> 
      <div className="emp-card card p-2 pt-3 shadow-sm">
      <div className='emp-header d-flex gap-3'>
      {emp.profileImage ? (
        <img src={emp.profileImage} className="profile-img rounded-circle" alt={emp.employeeName} />
      ) : (
        <div className='profile-placeholder rounded-circle'>
          {((emp.employeeName||'').split(' ').map(n=>n[0]).slice(0,2).join('')||'').toUpperCase()}
        </div>
      )}
      <div className='emp-meta'>
      <h5 className="card-title fs-6 mb-1">{emp.employeeName}</h5>
      <div className='text-muted small'>{emp.role}</div>
      </div>
      </div>
      <div className="card-body p-2">
        <div className='mb-2 d-flex gap-2 align-items-center'><MdOutlineMarkEmailRead className='d-inline'/><h5 className="card-title fs-6 d-inline"> {emp.employeeEmail}</h5></div>
        <div className='d-flex gap-2 align-items-start'><ImLocation className='d-inline'/><p className="card-title fs-6 d-inline mb-0">{emp.employeeAddress}</p></div>
        <div className='d-flex gap-2 flex-end justify-content-end mt-2 action-btns'>
        <button onClick={()=>handelUpdate(emp.id)}  type="button" className="btn btn-sm btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo"><CiEdit /></button>
        <button onClick={()=>handelDelete(emp.id)} type="button" className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><MdOutlineDelete /></button>
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

      {/* Floating Add Button for small screens */}
      <button className="add-fab btn btn-primary d-md-none" data-bs-toggle="modal" data-bs-target="#exampleModal">+</button>

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
