import React, { useState } from 'react'

const Problem1 = () => {
 //state
  const [show, setShow] = useState('all')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [data, setData] = useState([])
  
  //click handle
  const handleClick = (val) => {
    console.log("hey", val)
    setShow(val)
  }
 //submit handle for formdata
  const handleSubmit = (e) => {
    e.preventDefault()
    setData([...data, { name, status }])
    setName('')
    setStatus('')
  }
  //sort & Filter work
  const sortedData = () => {
    const activeData = data.filter(item => item.status === 'active');
    const completedData = data.filter(item => item.status === 'completed');
    const otherData = data.filter(item => item.status !== 'active' && item.status !== 'completed');
    console.log("Active data:", activeData);  // Log data to see if filtering is working
    console.log("Completed data:", completedData);
    console.log("Other data:", otherData);
    let filteredData = []
   //check return data
    switch (show) {
        case 'active':
            filteredData = activeData;
            break;
        case 'completed':
            filteredData = completedData;
            break;
        default:
            filteredData = [...activeData, ...completedData, ...otherData];
    }
    console.log("Final filtered data:", filteredData);
    return filteredData
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'all' && 'active'}`}
                type="button"
                onClick={() => handleClick('all')}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'active' && 'active'}`}
                type="button"
                onClick={() => handleClick('active')}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'completed' && 'active'}`}
                type="button"
                onClick={() => handleClick('completed')}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            
            <tbody>
               
              {sortedData().map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Problem1
