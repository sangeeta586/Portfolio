import React from 'react';

const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center mx-20">
            <div className="bg-white p-8 rounded-lg shadow-lg relative ">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
