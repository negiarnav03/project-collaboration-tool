/* 
Name of the Module : University Departments 
Date of Module Creation : 10/10/2021
Author of the module: Jaimin Prajapati
What the module does : Show university departments and by click get department vise project
Modification history : 
    Hover Effect Change
Function Supported:
    map => map all data from DB 
*/


import React from 'react'
import "./department.css";
import "./DataDept.jsx"
import DataDept from './DataDept.jsx'

const Department = () => {
    return(
        <>
            <div className="deptContainer">
                <h2>Departments</h2>
                <div className="grd-deptRow">
                    {DataDept.map((value) => 
                        {
                            return(
                                <>
                                    <div className="departments">
                                        <i class={value.iconame}></i>
                                        <h5>{value.title}</h5>
                                    </div>
                                </>
                            )
                        }
                    )}
                </div>  
            </div>
        </>
    )
}

export default Department