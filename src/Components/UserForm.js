import React, { useEffect, useState } from 'react';

const UserForm = (props) => {
  const [newUser, setNewUser] = useState(props.currentProduct);

  useEffect(() => {
    setNewUser(props.currentProduct);
  }, [props.currentProduct]);


  const options = ['Vegetables', 'Fruits& Nuts', 'Dairy & creams', 'PackagesFood', 'Staples'];

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setNewUser({ ...newUser, [name]: inputValue });
  };


  const intialFromData = {
    id: null, productname: '', price: '', oldprice: '', description: '', category: '',
    isActive: false
  };

  return (
    <div>
      <div style={{ border: '1px solid #ccc', borderRadius: '5px', width: 265, padding: '10px', backgroundColor: '#f9f9f9' }}>
        <form onSubmit={(event) => {
          event.preventDefault();
          if (!newUser.productname || !newUser.price || !newUser.oldprice || !newUser.category || !newUser.description) return;
          if (newUser.id) {
            props.updateUser(newUser.id, newUser);
            props.closeModal();
          } else {
            props.addUser(newUser);
            props.setCurrentProduct(intialFromData);
          }
        }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="name">Product Name:</label><br />
            <input type="text" placeholder="Product Name" id="name" name="productname" value={newUser.productname} onChange={handleInputChange} />
          </div>

          <div style={{ marginBottom: '10px' }}>

            <label htmlFor="price">Price:</label ><br />
            <input type="number" placeholder="Price" id="price" name="price" value={newUser.price} onChange={handleInputChange} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="OldPrice">Old Price:</label><br />
            <input type="number" placeholder="Old Price" id="Oldprice" name="oldprice" value={newUser.oldprice} onChange={handleInputChange} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Select Category:</label><br />
            <select name="category" value={newUser.category} onChange={handleInputChange}>
              <option  value="">Select Category Type</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="description">Description:</label><br />
            <textarea type="text" placeholder="Description" id="description" name="description" value={newUser.description} onChange={handleInputChange} rows={4}  />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="isActive">Is Active:</label><br />
            <input type="checkbox" id="isActive" name="isActive" checked={newUser.isActive} onChange={handleInputChange} />
            {newUser.isActive && <div>Product is Activated!</div>}
          </div>



          <div>
            <button style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} >{newUser.id ? 'Update' : 'Add'} </button>
            <button style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '57px' }} onClick={props.closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
