import React from "react";
import "../styles/Modal.scss";

const Modal = ({ user, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>Возраст: {user.age}</p>
        <p>
          Адрес: {user.address.city}, {user.address.address}
        </p>
        <p>Рост: {user.height}</p>
        <p>Вес: {user.weight}</p>
        <p>Номер телефона: {user.phone}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Modal;
