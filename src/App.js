import React, { useState , useEffect } from 'react';
import axios
 from 'axios';
import UserForm from './Components/UserForm';
import Table from './Components/Table';
import Modal from 'react-modal';


const  initialFormData = { productname: '', price: "", oldprice: "", description: '', isActive: false, categorytype: '' };

function App() {
 
  const [currentProduct, setCurrentProduct] = useState( initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);


  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct( initialFormData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://64d4e520b592423e4694d902.mockapi.io/R1/product`)
      .then((response) => {
        setRows(response.data);
        console.log("my data");
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`https://64d4e520b592423e4694d902.mockapi.io/R1/product/${id}`)
      .then(() => {
        setRows(rows.filter(user => user.id !== id));
        
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  };
  const addUser = (user) => {
    axios
      .post(`https://64d4e520b592423e4694d902.mockapi.io/R1/product`, user)
      .then(response => {
        user.id = (rows.length + 1).toString();
        setRows([...rows, response.data]);
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error("Error adding user:", error);
      });
  };

  
  
  const updateUser = (id, updatedUser) => {
    setIsModalOpen(true);
    axios
      .put(`https://64d4e520b592423e4694d902.mockapi.io/R1/product/${id}`, updatedUser)
      .then(() => {
        
        setRows(rows.map(user => (user.id === id ? updatedUser : user)));
       
          console.log("hlo");
        setCurrentProduct(updatedUser);
    
      })
      .catch(error => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div>
         <h2 style={{textAlign:'center'}}>Create Read Update Delete</h2>
      <button onClick={openModal} style={{ backgroundColor: '#32a852', color: 'white', padding: '8px 26px ', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: 60, marginTop: 30, }} >Add</button>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}

        contentLabel="User Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
          
            border: 'none',
            borderRadius: '8px',
        
            width:'330px',
            margin: 'auto',
            maxHeight:490,
            marginTop:45
          },
        }}
      >
        <UserForm
      
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
          addUser={addUser}
          updateUser={updateUser}
          closeModal={closeModal}
          rows={rows} 
          setRows={setRows}
        /></Modal>
      <Table rows={rows}   setCurrentProduct={setCurrentProduct} updateUser={updateUser} addUser={addUser} deleteUser={deleteUser}  setRows={setRows}/>
    </div>
  );
}

export default App;

