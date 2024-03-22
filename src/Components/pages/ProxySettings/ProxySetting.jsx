/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import '../styles.css';
import AddProxy from './AddProxy';

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
                <th scope="col">#</th>
                <th scope="col">Proxy Id</th>
                <th scope="col">Proxy Information</th>
                <th scope="col">Proxy Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </td>
                <td>1</td>
                <td>
                  socks5://75.167.144.120:9017{' '}
                  <i className="bi bi-arrow-clockwise" />
                </td>
                <td>socks5</td>
              </tr>
              <tr>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </td>
                <td>2</td>
                <td>
                  socks5://75.167.144.120:9018{' '}
                  <i className="bi bi-arrow-clockwise" />
                </td>
                <td>socks5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProxySetting;
