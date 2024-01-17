import React, { useState } from "react";
import "./index.css";
const initialValues = {
  userName: "",
  userSurname: "",
  userSalary: "",
};
function App() {
  const [userDate, setUserDate] = useState(initialValues);
  // const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  });
  const handleDeleteClick = (index) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));
  };
  const isFilledFields =
    userDate.userName && userDate.userSurname && userDate.userSalary;
  const handleSubmitUser = (e) => {
    e.preventDefault();
    if (isFilledFields) {
      if (editableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, userDate);
        setUsers(editedData);
        setEditableUserData({
          isEdit: false,
          userIndex: null,
        });
      } else {
        setUsers((prevState) => [...prevState, userDate]);
      }
      setUserDate(initialValues);
    }
  };
  const handleClearClick = () => setUserDate(initialValues);
  const handleEditClick = (data, index) => {
    setUserDate(data);
    setEditableUserData({
      isEdit: true,
      userIndex: index,
    });
  };
  console.log(userDate);
  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div className="table-data">
          <table>
            <th>#</th>
            <th>User Name</th>
            <th> User Surname</th>
            <th> User Salary</th>
            <th>Actions</th>

            <tbody>
              {users.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.userSurname}</td>
                  <td>{user.userSalary}</td>
                  <td>
                    <div>
                      <button
                        className="edit-action"
                        onClick={() => handleEditClick(user, index)}
                      >
                        edit
                      </button>
                      <button
                        className="delete-action"
                        onClick={() => handleDeleteClick(index)}
                      >
                        delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <form onSubmit={handleSubmitUser} onReset={handleClearClick}>
            <input
              placeholder="Write your name"
              onChange={(e) =>
                setUserDate((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }))
              }
              value={userDate.userName}
            />
            <input
              placeholder="Write your Surname"
              onChange={(e) =>
                setUserDate((prevState) => ({
                  ...prevState,
                  userSurname: e.target.value,
                }))
              }
              value={userDate.userSurname}
            />
            <input
              placeholder="Write your Salary"
              onChange={(e) =>
                setUserDate((prevState) => ({
                  ...prevState,
                  userSalary: e.target.value,
                }))
              }
              value={userDate.userSalary}
            />
            <div className="buttons-wrapper">
              <button className="btn" type="reset">
                Clear
              </button>
              <button disabled={!isFilledFields} className="btn" type="submit">
                Add
              </button>
            </div>
          </form>
          {/* <div>{count}</div>
          <button onClick={() => setCount(count - 1)} type="button">
            -
          </button>
          <button onClick={() => setCount(count + 1)} type="button">
            +
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
