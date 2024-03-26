/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Button,
  ListGroup,
  OverlayTrigger,
  Popover,
  Pagination,
} from 'react-bootstrap';
import './styles.css';

const tableHead = [
  {
    id: 1,
    title: '#',
  },
  {
    id: 2,
    title: 'Serial Number',
  },
  {
    id: 3,
    title: 'Group',
  },
  {
    id: 4,
    title: 'Name',
  },
  {
    id: 5,
    title: 'Platform',
  },
  {
    id: 6,
    title: 'Actions',
  },
];

const data = [
  {
    id: 1,
    name: 'test',
    email: 'test@mail.com',
  },
  {
    id: 2,
    name: 'test',
    email: 'test@mail.com',
  },
  {
    id: 3,
    name: 'test',
    email: 'test@mail.com',
  },
  {
    id: 4,
    name: 'test',
    email: 'test@mail.com',
  },
  {
    id: 5,
    name: 'test',
    email: 'test@mail.com',
  },
  {
    id: 6,
    name: 'test',
    email: 'test@mail.com',
  },
  {
    id: 7,
    name: 'test',
    email: 'test@mail.com',
  },
];

function Profile() {
  const [id, setId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to show per page

  const handleEdit = () => {};
  const handleDelete = (itemId) => {
    console.log(itemId);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        {' '}
        <ListGroup defaultActiveKey="#link1">
          <ListGroup.Item action onClick={handleEdit}>
            Edit
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => handleDelete(id)}>
            Delete
          </ListGroup.Item>
        </ListGroup>
      </Popover.Body>
    </Popover>
  );

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="main_Wrapper wrapper">
      <h1 className="page_heading">Profiles List</h1>
      <div className="container mt-2">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                {tableHead?.map((item) => (
                  <th key={item?.id} scope="col">
                    {item?.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((item) => (
                <tr key={item?.id}>
                  <td style={{ paddingLeft: '14px' }}>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.email}</td>
                  <td>{item?.email}</td>
                  <td>{item?.email}</td>
                  <td>
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      overlay={popover}
                      rootClose
                    >
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => setId(item?.id)}
                      >
                        {' '}
                        <i className="bi bi-three-dots-vertical" />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination className="pagination">
          <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
            (_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ),
          )}
          <Pagination.Next
            onClick={nextPage}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          />
        </Pagination>
      </div>
    </div>
  );
}

export default Profile;
