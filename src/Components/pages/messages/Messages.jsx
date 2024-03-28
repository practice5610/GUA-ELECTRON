/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Button,
  ListGroup,
  OverlayTrigger,
  Popover,
  Pagination,
} from 'react-bootstrap';
import '../profiles/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import AddMessage from './AddMessage';
import { getAllMessage } from '../../../redux/slice/messageSlice';

const tableHead = [
  {
    id: 1,
    title: '#',
  },
  {
    id: 2,
    title: 'userId',
  },
  {
    id: 3,
    title: 'Username',
  },
  {
    id: 4,
    title: 'Full Name',
  },
  {
    id: 5,
    title: 'message',
  },
  {
    id: 6,
    title: 'Actions',
  },
];

function Messages() {
  const dispatch = useDispatch();
  const messageData = useSelector((s) => s?.message?.data?.data);
  console.log(messageData);
  const [id, setId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to show per page
  const [modalShow, setModalShow] = useState(false);
  console.log(modalShow);
  useEffect(() => {
    dispatch(getAllMessage());
  }, [dispatch]);
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
  const currentItems = messageData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="main_Wrapper wrapper">
      <h1 className="page_heading">Messages</h1>
      <div className="container btns_wrapper">
        <div className="left_btns">
          <button
            type="button"
            className="btn_primary"
            onClick={() => setModalShow(true)}
          >
            <i className="bi bi-cloud-plus-fill  me-1" />
            Add Message
          </button>

          <AddMessage show={modalShow} onHide={() => setModalShow(false)} />
          <button type="button" className="btn_secondary">
            <i className="bi bi-search  me-1" /> Filter
          </button>
          <button type="button" className="btn_secondary">
            <i className="bi bi-trash" />
          </button>
        </div>
        <div className="right_btns">
          <button type="button" className="btn_secondary">
            {' '}
            <i className="bi  bi-arrow-clockwise" />
          </button>
        </div>
      </div>
      <div className="container mt-2">
        <div className="table-responsive">
          <table className="table ">
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
                  <td style={{ paddingLeft: '14px' }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </td>

                  <td style={{ paddingLeft: '10px' }}>{item?.userId}</td>
                  <td>{item?.target_username_name}</td>
                  <td>{item?.target_full_name}</td>
                  <td>{item?.message}</td>
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
          {Array.from({
            length: Math.ceil(messageData?.length / itemsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(messageData?.length / itemsPerPage)
            }
          />
        </Pagination>
      </div>
    </div>
  );
}

export default Messages;
