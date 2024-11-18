/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import FormE from '../Components/pages/form';
import Router from './routes';

export default function App() {
  return (
    <div>
      <div className="row g-0">
        {/* <div className="col-2">
          <Sidebar
            selectedComponent={selectedComponent}
            onItemClick={handleItemClick}
          />
        </div> */}
        <div className="col-12">
          <Router />{' '}
        </div>
        {/* <FormE /> */}
      </div>
    </div>
  );
}
