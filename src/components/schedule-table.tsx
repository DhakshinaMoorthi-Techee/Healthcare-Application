const ScheduleTable = ({ scheduleData, handleCellClick }: any) => {
  return (
    <div className="overflow-x-auto bg-white p-4 shadow rounded">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="bg-gray-100 p-2 border"></th>
            <th className="bg-gray-100 p-2 border" colSpan={3}>
              Old Building
            </th>
            <th className="bg-gray-100 p-2 border" colSpan={3}>
              New Building
            </th>
          </tr>
          <tr>
            <th className="bg-gray-200 p-2 border">Day/Time</th>
            {["Room 1", "Room 1", "Room 2"].map((room, i) => (
              <th key={i} className="bg-gray-200 p-2 border">
                {room}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((dayData: any, dayIndex: any) =>
            dayData.shifts.map((shiftData: any, shiftIndex: any) => (
              <tr key={`${dayIndex}-${shiftIndex}`}>
                {shiftIndex === 0 && (
                  <td
                    className="bg-gray-300 p-2 border text-center font-semibold"
                    rowSpan={dayData.shifts.length}
                  >
                    {dayData.day}
                  </td>
                )}
                <td className="p-2 border text-center font-medium">
                  {shiftData.time}
                </td>
                {shiftData.rooms.map((room: any, roomIndex: any) => (
                  <td
                    key={roomIndex}
                    className={`p-2 border text-center cursor-pointer ${
                      room.doctor ? "bg-green-200" : "bg-yellow-100"
                    }`}
                    onClick={() =>
                      handleCellClick(
                        dayIndex,
                        shiftIndex,
                        roomIndex,
                        room.doctor
                      )
                    }
                  >
                    {room.doctor || "—"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
