import React, { useState } from 'react';
import UserForm from './Components/UserForm';
import Table from './Components/Table';
import Modal from 'react-modal';

const userData = [
  { id: "1", productname: 'Banana', price: 20, oldprice: 15, description: ' Improve health and immunity', category: 'Vegetables' },
  { id: "2", productname: 'Choco', price: 10, oldprice: 5, description: 'A confectionery made with a rich chocolate', category: 'Dairy & creams' },
  { id: "3", productname: 'Fruits& Nuts', price: 40, oldprice: 20, description: ' single-seeded fruits that have high oil content', category: 'Packages Food' }
];


const intialFromData = { id: null, productname: '', price: "", oldprice: "", description: '', isActive: false, categorytype: '' };

function App() {
  const [newUser, setNewUser] = useState(userData);
  const [currentProduct, setCurrentProduct] = useState(intialFromData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentProduct(intialFromData)

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const deleteUser = (id) => {
    setNewUser(newUser.filter(user => user.id !== id));
  };

  const addUser = (user) => {
    user.id = (newUser.length + 1).toString();
    setNewUser([...newUser, user]);
    setIsModalOpen(false);
  };



  const updateUser = (id, updatedUser) => {
    setIsModalOpen(true);
    setNewUser(newUser.map(user => (user.id === id ? updatedUser : user)));
    setCurrentProduct(updatedUser);

  };



  return (
    <div>
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
            maxWidth: '300px',
            margin: 'auto',
          },
        }}
      >
        <UserForm
          newUser={newUser}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
          addUser={addUser}
          updateUser={updateUser}
          closeModal={closeModal}
        /></Modal>
      <Table newUser={newUser} setCurrentProduct={setCurrentProduct} updateUser={updateUser} addUser={addUser} deleteUser={deleteUser} />
    </div>
  );
}

export default App;
