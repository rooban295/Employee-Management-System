import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../../slices/Search';

export const Nav = () => {

    const keyword = useDispatch();

    const [search,setSearchFun]=useState('')

    const handelSearchInput=(e)=>{
      setSearchFun(e.target.value)
      keyword(setSearch(e.target.value))
    }
    
    const searchKeyword = ["Search By Employee Name", "Search By Location", "Search By Role"];
    const [inputPlaceholder, setInputPlaceholder] = useState(searchKeyword[0]);  // Initialize with the first item in the array

    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly select a new placeholder from the array
            const randomIndex = Math.floor(Math.random() * searchKeyword.length);
            setInputPlaceholder(searchKeyword[randomIndex]);
        }, 2000); // Change every 1000ms (1 second)

        // Clean up interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);
    
  return (

  <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand fs-4" href="#">Employee Management System</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <button type="button" className="btn form-control" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Add Employee</button>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="text" placeholder={`${inputPlaceholder}`} aria-label="Search" value={search} style={{width:"300px"}} onChange={handelSearchInput}/>
      </form>
    </div>
  </div>

</nav>
    </>
  )
}
