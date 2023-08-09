import React from 'react';

const Table = (props) => {
    return (
        <div >
        <br/>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Id</th>
                        <th style={tableHeaderStyle}>Product Name</th>
                        <th style={tableHeaderStyle}>Price</th>
                        <th style={tableHeaderStyle}>Old Price</th>
                        <th style={tableHeaderStyle}>Category Type</th>
                        <th style={tableHeaderStyle}>Description</th>
                        <th style={tableHeaderStyle}>Status</th>
                        <th style={tableHeaderStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.newUser.length > 0 ? (
                        props.newUser.map((newUse, index) => (
                            <tr key={newUse.id} >
                                <td style={tableCellStyle}>{newUse.id}</td>
                                <td style={tableCellStyle}>{newUse.productname}</td>
                                <td style={tableCellStyle}>{newUse.price}</td>
                                <td style={tableCellStyle}>{newUse.oldprice}</td>
                                <td style={tableCellStyle}>{newUse.category}</td>
                                <td style={tableCellStyle}>{newUse.description}</td>
                                <td style={tableCellStyle}>{newUse.isActive ? 'Activated' : 'Deactivated'}</td>

                                <td style={tableCellStyle}>
                                    <button style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => props.updateUser(newUse.id, newUse)} >Edit</button>
                                    <button  style={{ backgroundColor: '#e62f17', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft:10 }} onClick={() => props.deleteUser(newUse.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ textAlign: 'center' }}>No Items </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    padding: '8px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
};

const tableCellStyle = {
    padding: '8px',
    borderBottom: '1px solid #ddd',
};

export default Table;
