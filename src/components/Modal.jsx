import React, { useState } from 'react';
import Modal from './Modal';

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <nav>
        {/* Your navbar content here */}
        <button onClick={toggleModal}>Login</button>
      </nav>
      <Modal isOpen={modalOpen} onClose={toggleModal} />
    </div>
  );
};

export default Navbar;

