/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import '../styles.css';
import AddProxy from './AddProxy';

const tableHead = [
  {
    id: 1,
    title: '#',
  },
  {
    id: 2,
    title: 'Proxy Id',
  },
  {
    id: 3,
    title: 'Proxy Information',
  },
  {
    id: 4,
    title: 'Proxy Type',
  },
];

const data = [
  {
    id: 1,
    proxy_info: 'socks5://75.167.144.120:9017',
    proxy_type: 'socks5',
  },
  {
    id: 2,
    proxy_info: 'socks5://75.167.144.120:9017',
    proxy_type: 'socks5',
  },
  {
    id: 3,
    proxy_info: 'socks5://75.167.144.120:9017',
    proxy_type: 'socks5',
  },
];

function ProxySetting() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="main_Wrapper wrapper">
      <h1 className="page_heading">Proxy List</h1>
      <div className="container btns_wrapper">
        <div className="left_btns">
          <button
            type="button"
            className="btn_primary"
            onClick={() => setModalShow(true)}
          >
            <i className="bi bi-cloud-plus-fill  me-1" />
            Add Proxy
          </button>

          <AddProxy show={modalShow} onHide={() => setModalShow(false)} />

          {/* <AddProxy id="exampleModalCenter" /> */}
          <button className="btn_secondary">
            <i className="bi bi-search  me-1" /> Filter
          </button>
          <button className="btn_secondary">
            <i className="bi bi-trash" />
          </button>
        </div>
        <div className="right_btns">
          <button className="btn_secondary">
            {' '}
            <i className="bi bi-gear-fill" />
          </button>
          <button className="btn_secondary">
            {' '}
            <i className="bi  bi-arrow-clockwise" />
          </button>
        </div>
      </div>
      <div className="container mt-3">
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
              {data?.map((item) => (
                <tr key={item?.id}>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </td>
                  <td>{item?.id}</td>
                  <td>
                    {item?.proxy_info}
                    <i className="bi bi-arrow-clockwise" />
                  </td>
                  <td>{item?.proxy_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProxySetting;
