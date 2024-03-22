/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useRef, useState } from 'react';
import InputField from '../shared/InputField';

const btns = [
  { id: 'from_hashtags', title: 'From Hashtags' },
  { id: 'user_followers', title: "user's Followers" },
  { id: 'from_post', title: 'From Post' },
];

const initialValues = {
  hashtag: '',
  users_to_scrape: '',
  save_list_name_as: '',
  file_name: '',
};
function Scrape() {
  const [values, setValue] = useState(initialValues);
  const [pageChange, setPageChange] = useState('');
  const [activeBtnId, setActiveBtnId] = useState('from_hashtags');
  // eslint-disable-next-line no-console
  console.log(pageChange);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handlePageChange = () => {
    setPageChange(true);
  };
  const handleClick = (id) => {
    setActiveBtnId(id);
  };

  return (
    <div>
      {!pageChange ? (
        <div className="wrapper">
          <h1 className="page_heading text-center">Scrape</h1>
          <div className="d-flex scrape_file_wrapper align-items-center justify-content-center gap-4">
            <p className="mb-0 text-uppercase">Add your own custom list:</p>
            <button className="upload_file" onClick={handleButtonClick}>
              select
            </button>
            <input
              ref={fileInputRef}
              className="d-none"
              type="file"
              name="file"
            />
            <button className="btn_secondary">Upload</button>
          </div>
          <span className="text color-warning ">
            list must be in csv or txt format
          </span>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <InputField
              title="Enter File Name"
              name="file_name"
              type="text"
              value={values?.file_name}
              onChange={handleOnChange}
            />
            <button className="btn_tertiary mt-4">Add list to prospects</button>
          </div>
          <span className="text">or</span>
          <span className="text right_arrow" onClick={handlePageChange}>
            Scrape Custom List <i className="bi bi-arrow-right" />
          </span>
        </div>
      ) : (
        <div className="wrapper">
          <h1 className="page_heading text-center">Scrape Custom List</h1>
          <div className="d-flex gap-2 justify-content-center">
            {btns.map((item) => (
              <button
                className={
                  activeBtnId === item.id
                    ? 'btn_secondary active'
                    : 'btn_secondary'
                }
                key={item?.id}
                onClick={() => handleClick(item.id)}
              >
                {item?.title}
              </button>
            ))}
          </div>
          <div>
            {activeBtnId === 'from_hashtags' && (
              <div className="text-center mt-4">
                <InputField
                  title="Enter Hashtag"
                  name="hashtag"
                  type="text"
                  value={values?.hashtag}
                  onChange={handleOnChange}
                />
                <InputField
                  title="max number of users to scrape"
                  name="users_to_scrape"
                  type="number"
                  value={values?.users_to_scrape}
                  onChange={handleOnChange}
                />
                <InputField
                  title="save list as name"
                  name="save_list_name_as"
                  type="text"
                  value={values?.save_list_name_as}
                  onChange={handleOnChange}
                />
                <button className="btn_tertiary mt-4">Start Scraping</button>
              </div>
            )}
            {activeBtnId === 'user_followers' && (
              <div className="text-center mt-4">
                <InputField
                  title="Enter Hashtag"
                  name="hashtag"
                  type="text"
                  value={values?.hashtag}
                  onChange={handleOnChange}
                />
                <InputField
                  title="max number of followers to scrape"
                  name="users_to_scrape"
                  type="number"
                  value={values?.users_to_scrape}
                  onChange={handleOnChange}
                />
                <InputField
                  title="save list as name"
                  name="save_list_name_as"
                  type="text"
                  value={values?.save_list_name_as}
                  onChange={handleOnChange}
                />
                <button className="btn_tertiary mt-4">Start Scraping</button>
              </div>
            )}
            {activeBtnId === 'from_post' && (
              <div className="text-center mt-4">
                <InputField
                  title="Enter post link"
                  name="hashtag"
                  type="text"
                  value={values?.hashtag}
                  onChange={handleOnChange}
                />
                <InputField
                  title="max number of users to scrape"
                  name="users_to_scrape"
                  type="number"
                  value={values?.users_to_scrape}
                  onChange={handleOnChange}
                />
                <div className="my-3 d-flex gap-4 justify-content-center align-items-center">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Likes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Comments
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Both
                    </label>
                  </div>
                </div>
                <InputField
                  title="save list as name"
                  name="save_list_name_as"
                  type="text"
                  value={values?.save_list_name_as}
                  onChange={handleOnChange}
                />
                <button className="btn_tertiary mt-4">Start Scraping</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Scrape;
