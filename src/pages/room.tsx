import React, { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useDataContext } from "../context/context";
import { IoMdAdd } from "react-icons/io";

const RoomManagement = () => {
  const { blocks, rooms, setRooms } = useDataContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roomData, setRoomData] = useState<any[]>([]);
  const [block, setBlock] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = roomData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(roomData.length / itemsPerPage);

  const saveRoom = () => {
    let updatedRooms = [...rooms];
    const blockValue = blocks.find((s) => s.id == block);
    if (!blockValue) return;

    if (isEditing && editId !== null) {
      updatedRooms = updatedRooms.map((room) =>
        room.id === editId
          ? { ...room, name: roomName, block: blockValue }
          : room
      );
    } else {
      updatedRooms.push({
        id: rooms.length ? rooms[rooms.length - 1].id + 1 : 1,
        name: roomName,
        block: blockValue,
      });
    }

    setRooms(updatedRooms);
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
    setRoomName("");
  };

  const editRoom = (id: number) => {
    const roomToEdit = rooms.find((s) => s.id === id);
    if (!roomToEdit) return;
    setRoomName(roomToEdit.name);
    setBlock(roomToEdit.block.id);
    setEditId(id);
    setIsEditing(true);
    setModalOpen(true);
  };

  const deleteRoom = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Room?"
    );
    if (!confirmDelete) return;
    const updated = rooms.filter((room) => room.id !== id);
    setRooms(updated);
  };

  const onSearchChange = (value: any) => {
    setSearchTerm(value);
    const filtered = rooms.filter((s) =>
      s.name.toLowerCase().includes(value.toLowerCase())
    );
    setRoomData(filtered);
    setCurrentPage(1);
  };

  const onClose = () => {
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
    setRoomName("");
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    setRoomData(rooms);
  }, [rooms]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label>Show</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
            <span>entries</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm w-64"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button
              onClick={() => setModalOpen(true)}
              className="flex gap-2 items-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 cursor-pointer"
            >
              <IoMdAdd size={20} />
              Add New Room
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Room</th>
                <th className="p-3">Block</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.length ? (
                currentRooms.map((room, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{room.name}</td>
                    <td className="p-3">{room.block?.name}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        className="inline-flex items-center px-2 py-1 hover:bg-gray-200 rounded cursor-pointer"
                        onClick={() => editRoom(room.id)}
                      >
                        <FaPen className="w-4 h-4" />
                      </button>
                      <button
                        className="inline-flex items-center px-2 py-1 hover:bg-gray-200 rounded cursor-pointer"
                        onClick={() => deleteRoom(room.id)}
                      >
                        <FaTrash className="w-4 h-4 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="hover:bg-gray-50">
                  <td colSpan={3} className="p-3 text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="p-3 text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, roomData.length)} of {roomData.length}{" "}
            entries
          </div>
        </div>

        <div className="flex justify-end mt-2 space-x-2 text-sm">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className={`px-3 py-1 border rounded cursor-pointer ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <span className="px-3 py-1 border rounded text-purple-500">
            {currentPage}
          </span>
          <button
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            className={`px-3 py-1 border rounded cursor-pointer ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-[#000000ba] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit" : "Add New"} Room
            </h2>
            <label className="block text-sm font-medium mb-1">Room</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter Room"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <label className="block text-sm font-medium mb-1">Block</label>
            <select
              value={block}
              onChange={(e) => setBlock(parseInt(e.target.value))}
              className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {blocks.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onClose()}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={saveRoom}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer"
              >
                {isEditing ? "Update" : "Save"} Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
