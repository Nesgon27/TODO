import { useState } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(["Nestor", "Juan", "Pedro"]);
  const [newUser, setNewUser] = useState("");

  function handleChange(event) {
    setNewUser(event.target.value);
  }
  function addUser() {
    if (newUser.trim() !== "") {
      setUser([...user, newUser]);
      setNewUser("");
    }
  }
  function deletedUser(index: number) {
    setUser(user.filter((_, i) => i !== index));
  }

  function deletedAllUsers() {
    setUser([]);
  }
  function orderUpUser(index) {
    setUser([
      ...user.slice(0, index - 1),
      user[index],
      user[index - 1],
      ...user.slice(index + 1),
    ]);
  }
  function orderDownUser(index) {
    setUser([
      ...user.slice(0, index),
      user[index + 1],
      user[index],
      ...user.slice(index + 2),
    ]);
  }
  return (
    <div className="app">
      <header className="app-header">
        <h1>Hello Users!</h1>
      </header>
      <div className="input-container">
        <div className="input-container-item">
          <input
            value={newUser}
            onChange={handleChange}
            placeholder="Add a new user"
            aria-label="New user name"
            className="input-container-item-input"
          />
          <button type="button" className="btn-primary" onClick={addUser}>
            Add
          </button>
        </div>
        <div className="users-container">
          <ul>
            {user.length === 0 ? (
              <li className="users-empty">No users yet — add one above</li>
            ) : (
              user.map((r, index) => (
                <li key={index} className="user-item">
                  <span>{r}</span>
                  <div className="user-actions">
                    <button
                      type="button"
                      className="btn-ghost btn-icon"
                      onClick={() => orderUpUser(index)}
                      disabled={index === 0}
                      aria-label={`Move ${r} up`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="btn-ghost btn-icon"
                      onClick={() => orderDownUser(index)}
                      disabled={index === user.length - 1}
                      aria-label={`Move ${r} down`}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="btn-danger btn-icon"
                      onClick={() => deletedUser(index)}
                      aria-label={`Delete ${r}`}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
          {user.length > 0 && (
            <button type="button" className="btn-danger" onClick={deletedAllUsers}>
              Delete All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
