import React  from "react";
import Table from 'react-bootstrap/Table'
import "../App.css";

const UserAttendedCompanyTables = (props)=>{
     

    return(
        <Table stripped bordered hover size="sm" responsive>
    <thead>
    <tr>
        <th>S.No</th>
        <th>Date Of Drive(yyyy-mm-dd)</th>
        <th>Company Name</th>
        <th>Role</th>
        <th>Package</th>
    </tr>
    </thead>
    <tbody>
    {props.TableData.map((item,i) => {
        return (
            <tr  className="tableRow" key={item._id} >
                <td>{i+1}</td>
                <td>{item.companyName}</td>
                <td>{item.role}</td>
                <td>{item.Package}</td>
            </tr>
        );
    })}
    </tbody>
</Table>
    );
}

export default UserAttendedCompanyTables;