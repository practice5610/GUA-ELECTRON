import React from 'react';

function Prospects() {
  return (
    <div className="wrapper">
      <h1 className="page_heading text-center">Prospects</h1>
      <p className="text">
        The table below shows all the lists uploaded or <br /> scraped. You can
        export them in CSV or TXT format
      </p>
      <div className="container mt-3">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">List Name</th>
                <th scope="col">Size</th>
                <th scope="col">Date Added</th>
                <th scope="col">Export</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Custom list 4th feb</td>
                <td>2000</td>
                <td>4/02/24</td>
                <td>
                  <i className="bi fs-2 bi-arrow-down-circle" />
                </td>
              </tr>
              <tr>
                <td>messi followers</td>
                <td>750</td>
                <td>6/03/24</td>
                <td>
                  {' '}
                  <i className="bi fs-2 bi-arrow-down-circle" />
                </td>
              </tr>
              <tr>
                <td>ronaldo followers</td>
                <td>9950</td>
                <td>16/03/24</td>
                <td>
                  {' '}
                  <i className="bi fs-2 bi-arrow-down-circle" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Prospects;
