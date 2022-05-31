import React from "react";
import { useSelector } from "react-redux";
import * as alertreducer from "../../../redux/alert/alert.reducer";

// here we receive data from store and display in Alert-message

let Alert = () => {
  //  getting alert info from state
  let alertInfo = useSelector((state) => {
    // initialState ->  "messages" -> array
    return state[alertreducer.alertFeatureKey];
  });

  let { messages } = alertInfo; // 'messages' -> from  alertReducer array

  return (
    <React.Fragment>
      {messages.length > 0 ? (
        <React.Fragment>
          <div
            className={`alert alert-${messages[0].color} alert-dismissible m-2 fixed-top animated slideInDown`}
          >
            <button className="close">
              <i className="fa fa-times-circle" />
            </button>
            {messages.map((alert) => {
              return (
                <div key={alert.id}>
                  <small className="font-weight-bold">{alert.message}</small>
                  <br />
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default Alert;
