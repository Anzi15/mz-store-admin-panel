import React, { useState } from 'react';
import OrderDetailsModal from './AdminOrderDetailsModel';

const AdminOrderCard = ({
  customerName,
  customerPhone,
  orderStatus,
  orderDate,
  orderTotal,
  isLoading = false,  
  orderDetailsObj
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(orderDetailsObj);

  const openModal = () => {
    setOrderDetails(orderDetailsObj);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOrderDetails(null); // This ensures the state is reset when the modal is closed
  };

  const cellClass = `px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white ${
    isLoading ? 'skeleton-loading' : ''
  }`;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'shipped':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500'; // Default color if status is unrecognized
    }
  };

  return (
    <>
      <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full" onClick={openModal}>
        <td className={`px-4 py-2 ${isLoading ? 'skeleton-loading' : ''}`}>
          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
            {customerName}
          </span>
        </td>
        <td className={cellClass}>
          <div className="flex items-center">
            <div className={`inline-block w-4 h-4 mr-2 rounded-full ${getStatusColor(orderStatus)}`} />
          </div>
        </td>
        <td className={cellClass}>{customerPhone}</td>
        <td className={cellClass}>{orderTotal}</td>
        <td className={cellClass}>{orderDate}</td>
      </tr>
      {isModalOpen && (
        <OrderDetailsModal 
          orderDetails={orderDetailsObj} // Use updated state
          onClose={closeModal} 
        />
      )}
    </>
  );
};

export default AdminOrderCard;
