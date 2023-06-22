import React, { useEffect, useState } from 'react';
import './ProductData.css';

const ProductData = () => {
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState([]);
  const [findID, setfindID] = useState('');
  const [selectedItem, setselectedItem] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [page, setpage] = useState(1);
  const itemperPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const ApiData = await res.json();
      console.log(ApiData);
      setdata(ApiData);
      setfilter(ApiData);
    };
    fetchData();
  }, []);

  // Delete functionality
  const deleteHandler = (id) => {
    const items = data.filter((val) => val.id !== id);
    setdata(items);
  };

  // Search functionality by Id
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search.length > 0) {
      const filterValue = filter.filter((item) =>
        item.id.toString().includes(search)
      );
      setdata(filterValue);
    } else {
      setdata(filter);
    }
    setfindID(e.target.value);
  };

  // Modal
  const viewHandler = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    setselectedItem(selectedItem);
    setisModalOpen(true);
  };

  const closeModal = () => {
    setselectedItem(null);
    setisModalOpen(false);
  };

  // Pagination
  const totalItem = data.length;
  const totalpages = Math.ceil(totalItem / itemperPage);
  const paginationItems = Array.from(Array(totalpages).keys());

  const handlePageChange = (pageNumber) => {
    setpage(pageNumber);
  };

  return (
    <div className="main">
      <center>
        <input
          type="text"
          placeholder="Search"
          value={findID}
          onChange={(e) => handleSearch(e)}
        />
      </center>
      
      <center>
        <table border="1" cellSpacing="0" cellPadding="5px">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>UserID</th>
              <th>Delete</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice((page - 1) * itemperPage, page * itemperPage)
              .map((ele, i) => {
                return (
                  <tr key={ele.id}>
                    <td>{ele.id}</td>
                    <td>{ele.title}</td>
                    <td>{ele.userId}</td>
                    <td>
                      <button onClick={() => deleteHandler(ele.id)}>
                        Remove
                      </button>
                    </td>
                    <td>
                      <button onClick={() => viewHandler(ele.id)}>View</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </center>

      {selectedItem && isModalOpen && (
        <div className="modal_main">
          <div className="modal_child">
            <span onClick={closeModal}>
              <center>
                <b>+</b>
              </center>
              </span>
            <h2>Item Details</h2>
            <p>Id: {selectedItem.id}</p>
            <p>Title: {selectedItem.title}</p>
            <p>UserID: {selectedItem.userId}</p>
          </div>
        </div>
      )}

      <div className='pagination'>
        {paginationItems.map((pageNumber) => (
          <span
            key={pageNumber}
            className={pageNumber === page ? 'active' : ''}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductData;
