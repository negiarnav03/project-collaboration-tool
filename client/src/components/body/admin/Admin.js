import React from "react";
import "./admin.css";
import AdminChart from "./AdminChart";
import AndminCreq from "./AdminCreq";


const Admin = () => {
  return (
    <>
      <div className="admin-main-container ">
        <div className="admin-main mt-5 p-3">
          {/* <div className="admin-dropdown-div m-3">
            <div className="dropdown1-div">
              <span>Filter By</span>
              <div className="dropdown-1">
                <select name="" id="">
                  <option value="@">@</option>
                  <option value="@">@</option>
                  <option value="@">@</option>
                </select>
              </div>
            </div>

            <div className="dropdown2-div">
              <span>Sort By</span>
              <div className="dropdown-1">
                <select name="" id="">
                  <option value="#">#</option>
                  <option value="#">#</option>
                  <option value="#">#</option>
                </select>
              </div>
            </div>
          </div> */}

          <div className="admin-data-div">
            <AdminChart />
          </div>
        </div>

        <div className="Creq-main m-5 p-3">
          <h4 className="p-3 admin-heading">Collabration Request</h4>

          <div className="Creq-data">
            <AndminCreq />
          </div>

        </div>

      </div>
    </>
  );
};

export default Admin;
