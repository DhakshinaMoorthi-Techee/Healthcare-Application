import { useState } from "react";
import { useDataContext } from "../context/context";
import { FaTimes } from "react-icons/fa";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const ScheduleTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [selectedCell, setSelectedCell]: any = useState();
  const { blocks, rooms, shifts, doctors, schedule, setSchedule } =
    useDataContext();

  const groupedRooms = blocks.map((block) => ({
    ...block,
    rooms: rooms.filter((room) => room.block.id === block.id),
  }));

  const onAssign = () => {
    const key = `${selectedCell?.day}_${selectedCell?.shift?.id}_${selectedCell?.room}`;
    setSchedule((prev) => ({
      ...prev,
      [key]: doctor,
    }));
    setIsModalOpen(false);
    setDoctor("");
  };

  const onDelete = (key: string) => {
    const updated: any = { ...schedule };
    delete updated[key];
    setSchedule(updated);
  };

  return (
    <div className="overflow-auto p-4">
      <div className="rounded-lg border border-gray-300 shadow-sm bg-white overflow-hidden">
        <table className="table-auto w-full text-center text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="border border-gray-300 px-4 py-3 font-semibold"
                rowSpan={2}
              >
                Day
              </th>
              <th
                className="border border-gray-300 px-4 py-3 font-semibold"
                rowSpan={2}
              >
                Shift
              </th>
              {groupedRooms.map((block) => (
                <th
                  key={block.id}
                  className="border border-gray-300 px-4 py-3 font-semibold text-gray-700 bg-gray-100"
                  colSpan={block.rooms.length}
                >
                  {block.name}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50">
              {groupedRooms.map((block) =>
                block.rooms.map((room) => (
                  <th
                    key={room.id}
                    className="border border-gray-200 px-4 py-2 font-medium"
                  >
                    {room.name}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {weekDays.map((day) =>
              shifts.map((shift, index) => (
                <tr
                  key={`${day}_${shift.id}`}
                  className="even:bg-white odd:bg-gray-50"
                >
                  {index === 0 && (
                    <td
                      rowSpan={shifts.length}
                      className="border border-gray-200 px-4 py-2 font-medium text-gray-700 bg-gray-100"
                    >
                      {day}
                    </td>
                  )}
                  <td className="border border-gray-200 px-4 py-2 font-medium text-gray-700">
                    {shift.name}
                  </td>
                  {groupedRooms.map((block) =>
                    block.rooms.map((room) => {
                      const key: any = `${day}_${shift?.id}_${room.name}`;
                      const doctorName = schedule[key];
                      const isAssigned = !!doctorName;

                      return (
                        <td
                          key={room.id + key}
                          className={`relative border border-gray-300 px-3 py-2 text-sm text-center ${
                            isAssigned
                              ? "bg-emerald-200 text-gray-800"
                              : "bg-yellow-100 text-gray-500 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                          }`}
                          onClick={() => {
                            if (!isAssigned) {
                              setSelectedCell({
                                day,
                                shift,
                                room: room.name,
                              });
                              setIsModalOpen(true);
                            }
                          }}
                        >
                          {isAssigned ? (
                            <div className="flex items-center justify-center gap-2">
                              <span className="truncate">{doctorName}</span>
                              <button
                                className="text-red-600 hover:text-red-800 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDelete(key);
                                }}
                                title="Remove Doctor"
                              >
                                <FaTimes size={20} />
                              </button>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                      );
                    })
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Assign Doctor
            </h2>
            <div className="text-sm text-gray-700 mb-4 space-y-1">
              <p>
                <strong>Day:</strong> {selectedCell?.day}
              </p>
              <p>
                <strong>Shift:</strong> {selectedCell?.shift?.name}
              </p>
              <p>
                <strong>Room:</strong> {selectedCell?.room}
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Doctor:
              </label>
              <select
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
              >
                <option value="">-- Choose Doctor --</option>
                {doctors.map((doc, idx) => (
                  <option key={idx} value={doc.name}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={onAssign}
                disabled={!doctor}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTable;
