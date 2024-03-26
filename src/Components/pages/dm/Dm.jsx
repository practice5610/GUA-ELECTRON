/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Button, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import AddProfile from './AddProfile';
import { data, tableHead } from '../../constant';

function Dm() {
  const [modalShow, setModalShow] = useState(false);
  const [dmData, setData] = useState(data);
  console.log(dmData);
  const [id, setId] = useState(null);
  const handleDelete = (itemId) => {
    const newData = data.filter((item) => item.id !== itemId);
    setData(newData);
  };
  const handleEdit = () => {};
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
                  {dmData?.map((item) => (
                    <tr key={item?.id}>
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
          </div>
        </>
      ) : (
        <AddProfile onHide={() => setModalShow(false)} />
      )}
    </div>
  );
}

export default Dm;
