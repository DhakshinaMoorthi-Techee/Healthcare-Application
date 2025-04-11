import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useDataContext } from "../context/context";
import { IoMdAdd } from "react-icons/io";

const ShiftManagement = () => {
  const { shifts, setShifts } = useDataContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startTime, setStartTime] = useState("9:00 AM");
  const [endTime, setEndTime] = useState("10:00 PM");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredShifts, setFilteredShifts] = useState<any[]>([]);

  const totalEntries = filteredShifts.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
  const paginatedShifts = filteredShifts.slice(startIndex, endIndex);

  const timeOptions = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 9;
    const label = `${hour > 12 ? hour - 12 : hour}:00 ${
      hour >= 12 ? "PM" : "AM"
    }`;
    return { label };
  });

  const saveShift = () => {
    const shiftRange = `${startTime} - ${endTime}`;
    let updatedShifts = [...shifts];

    if (isEditing && editId !== null) {
      updatedShifts = updatedShifts.map((shift) =>
        shift.id === editId ? { ...shift, name: shiftRange } : shift
      );
    } else {
      updatedShifts.push({
        id: shifts.length ? shifts[shifts.length - 1].id + 1 : 1,
        name: shiftRange,
      });
    }

    setShifts(updatedShifts);
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  const editShift = (id: number) => {
    const shiftToEdit = shifts.find((s) => s.id === id);
    if (!shiftToEdit) return;

    const [start, end] = shiftToEdit.name.split(" - ");
    setStartTime(start.trim());
    setEndTime(end.trim());
    setEditId(id);
    setIsEditing(true);
    setModalOpen(true);
  };

  const deleteShift = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shift?"
    );
    if (!confirmDelete) return;

    const updated = shifts.filter((shift) => shift.id !== id);
    setShifts(updated);
  };

  const onClose = () => {
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  useEffect(() => {
    const filtered = shifts.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredShifts(filtered);
    setCurrentPage(1);
  }, [shifts, searchTerm]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label>Show</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setModalOpen(true)}
              className="flex gap-2 items-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 cursor-pointer"
            >
              <IoMdAdd size={20} />
              Add New Shift
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Shift</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedShifts.length ? (
                paginatedShifts.map((shift: any) => (
                  <tr key={shift.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{shift.name}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => editShift(shift.id)}
                        className="inline-flex items-center px-2 py-1 hover:bg-gray-200 rounded cursor-pointer"
                      >
                        <FaPen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteShift(shift.id)}
                        className="inline-flex items-center px-2 py-1 hover:bg-gray-200 rounded cursor-pointer"
                      >
                        <FaTrash className="w-4 h-4 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="p-3 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="p-3 text-sm text-gray-500">
            {totalEntries > 0
              ? `Showing ${
                  startIndex + 1
                } to ${endIndex} of ${totalEntries} entries`
              : "No entries to show"}
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
              {isEditing ? "Edit" : "Add New"} Shift
            </h2>

            <label className="block text-sm font-medium mb-1">Start Time</label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            >
              {timeOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium mb-1">End Time</label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            >
              {timeOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={saveShift}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer"
              >
                {isEditing ? "Update" : "Save"} Shift
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftManagement;
