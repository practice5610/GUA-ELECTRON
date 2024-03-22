/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Button, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import AddProfile from './AddProfile';

const tableHead = [
  {
    id: 1,
    title: 'Browser Profile Name',
  },
  {
    id: 2,
    title: 'Serial No',
  },
  {
    id: 3,
    title: 'Proxy ID',
  },
  {
    id: 4,
    title: 'List Assigned',
  },
  {
    id: 5,
    title: 'Status',
  },
  {
    id: 6,
    title: 'Daily Progress',
  },
  {
    id: 7,
    title: 'Total Progres',
  },
  {
    id: 8,
    title: ' ',
  },
  {
    id: 9,
    title: ' ',
  },
];
const data = [
  {
    id: 1,
    name: 'Jacob Alex',
    serial_no: 'j9xsdr4',
    proxy_id: 3,
    list_assigned: 'messi followers',
    status: 'running',
    daily_progress: 'sent 4 out of 40',
    total_progress: 'sent 357 out of 4000',
  },
  {
    id: 2,
    name: 'Jacob Alex',
    serial_no: 'j9xsdr4',
    proxy_id: 3,
    list_assigned: 'messi followers',
    status: 'running',
    daily_progress: 'sent 4 out of 40',
    total_progress: 'sent 357 out of 4000',
  },
  {
    id: 3,
    name: 'Jacob Alex',
    serial_no: 'j9xsdr4',
    proxy_id: 3,
    list_assigned: 'messi followers',
    status: 'running',
    daily_progress: 'sent 4 out of 40',
    total_progress: 'sent 357 out of 4000',
  },
];

function Dm() {
  const [modalShow, setModalShow] = useState(false);
  const handleDelete = () => {};
  const handleEdit = () => {};
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        {' '}
        <ListGroup defaultActiveKey="#link1">
          <ListGroup.Item action onClick={handleEdit}>
            Edit
          </ListGroup.Item>
          <ListGroup.Item action onClick={handleDelete}>
            Delete
          </ListGroup.Item>
        </ListGroup>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="wrapper">
      {!modalShow ? (
        <>
          <h1 className="page_heading text-center">DM</h1>
          <div className="container">
            <button className="btn_primary" onClick={() => setModalShow(true)}>
              Add Profile
            </button>
          </div>
          <div className="container mt-3">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {tableHead.map((item) => (
                      <th key={item?.id} scope="col">
                        {item?.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr>
                      <td>{item?.name}</td>
                      <td>{item?.serial_no}</td>
                      <td>{item?.proxy_id}</td>
                      <td>{item?.list_assigned}</td>
                      <td>{item?.status}</td>
                      <td>{item?.daily_progress}</td>
                      <td>{item?.total_progress}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button>
                            <i className="bi bi-pause-fill" />
                          </button>
                          <button>
                            <i className="bi bi-skip-start-fill" />
                          </button>
                          <button>
                            {' '}
                            <i className="bi bi-stop-fill" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <OverlayTrigger
                          trigger="click"
                          placement="bottom"
                          overlay={popover}
                        >
                          <Button variant="success">
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
          </div>
        </>
      ) : (
        <AddProfile onHide={() => setModalShow(false)} />
      )}
    </div>
  );
}

export default Dm;
