import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllDetails, dispatchGetAllDetails } from '../../../redux/actions/adminAction';
import moment from 'moment';
import "./adminCreq.css";

const AndminCreq = () => {

  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const requests = useSelector(state => state.requests);

  const { isAdmin } = auth;
  const [callback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      fetchAllDetails(token).then(res => {
        dispatch(dispatchGetAllDetails(res))
      })
    }
  }, [token, isAdmin, dispatch, callback]);

  return (
    <>
      <div className="admin-Creq-main">
        <div className="content-box">
          <br />
          <table>
            {/* Table Heading  */}
            <tr>
              <th>Project Name</th>
              <th>Request Sender</th>
              <th>Date Of Request</th>
              <th>Request Status</th>
              <th>Selection Status</th>
            </tr>

            {/* Table Data  */}

            {requests.map((value) => {

              return (
                <>
                  <tr key={value._id}>
                    <td>{value.projectID.title}</td>
                    <td>{value.collaboratorID.name}</td>
                    <td>{moment(value.createdAt).format("L LTS")}</td>
                    {/* <td>{value.createdAt}</td> */}
                    <td>{value.requestStatus === 1 ? "SENT" : "NOT SENT"}</td>
                    <td>{value.selected === 1 ? "SELECTED" : "NOT SELECTED"}</td>
                  </tr>
                </>
              )
            })}

          </table>

        </div>
      </div>
    </>
  );
};

export default AndminCreq;
