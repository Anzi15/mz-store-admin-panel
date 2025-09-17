import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import BouncingBallLoader from "../../components/BouncingBallLoader";
import AdminOrderCard from "../../components/admin/AdminOrderCard";
import Swal from "sweetalert2";
import { orderBy, startAfter, collection, query, limit, getDocs, where } from 'firebase/firestore';
import { db } from "../../modules/firebase-modules/firestore";
import DatePicker from "../../components/DatePicker";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState("createdAt"); 
  const [toDate, setToDate] = useState(null); 
  const [fromDate, setFromDate] = useState(null); 
  const [selectedOrder, setSelectedOrder] = useState(null);
  const loader = useRef(null);
  
  useEffect(() => {
    loadMoreOrders();
  }, [sortOrder, fromDate, toDate]);
  
  const loadMoreOrders = async () => {
    setLoading(true);
    const PAGE_SIZE = 15;
    try {
      let q = query(
        collection(db, "orders"),
        orderBy(sortOrder, "desc"),
        limit(PAGE_SIZE)
      );

      if (fromDate || toDate) {
        q = query(
          collection(db, "orders"),
          where("createdAt", ">=", fromDate ? new Date(fromDate) : new Date("2000-01-01")),
          where("createdAt", "<=", toDate ? new Date(toDate) : new Date()),
          orderBy("createdAt", "desc"),
          limit(PAGE_SIZE)
        );
      }

      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      setOrders(ordersData);
      setLastVisible(ordersData.length ? ordersData[ordersData.length - 1] : null);
      setHasMore(ordersData.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
    setLoading(false);
    setInitialLoading(false);
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Name", "Phone", "Status", "Amount", "Order Date"],
      ...orders.map(order => [
        order.customer?.firstName || "N/A",
        order.customer?.phoneNumber || "N/A",
        order.status,
        order.total || "N/A",
        order.createdAt.toDate().toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <main className="my-8 px-6 w-full overflow-x-auto">
      <h1 className="text-5xl text-left">Orders</h1>
      <section className="my-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-xl">Total Sales: Rs. {orders.reduce((sum, order) => sum + (order.grandTotal || 0), 0)}</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={exportToCSV}>Export CSV</button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="w-full md:w-1/4">
            From: <DatePicker dateReturner={setFromDate} allowPast={true} />
          </div>
          <div className="w-full md:w-1/4">
            To: <DatePicker dateReturner={setToDate} allowPast={true} />
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="p-4">Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {initialLoading ? (
                Array(7).fill().map((_, i) => <AdminOrderCard key={i} loading={true} />)
              ) : (
                orders.map((order, i) => (
                  <AdminOrderCard
                    key={i}
                    isLoading={false}
                    customerName={order.customer?.firstName || "N/A"}
                    customerPhone={order.customer?.phoneNumber || "N/A"}
                    orderStatus={order.status}
                    orderDate={order.createdAt.toDate().toLocaleDateString()}
                    orderTotal={order.total || 0}
                    orderDetailsObj={order}
                    onClick={() => setSelectedOrder(order)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      {selectedOrder && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg w-full md:w-1/2 max-w-lg">
            <h2 className="text-xl font-bold">Order Details</h2>
            <p><strong>Name:</strong> {selectedOrder.customer?.firstName || "N/A"}</p>
            <p><strong>Phone:</strong> {selectedOrder.customer?.phoneNumber || "N/A"}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Amount:</strong> ${selectedOrder.total || 0}</p>
            <p><strong>Order Date:</strong> {selectedOrder.createdAt.toDate().toLocaleDateString()}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => setSelectedOrder(null)}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminOrdersPage;
