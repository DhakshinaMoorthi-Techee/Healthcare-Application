import { NavLink } from "react-router-dom";
import Healthcare from "../../public/healthcare-logo.svg";
import { MdOutlineAccessTime } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaBed } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { GrSchedule } from "react-icons/gr";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 flex gap-2 items-end">
        <span>
          <img className="w-8" src={Healthcare} />
        </span>
        HEALTHCARE
      </h1>
      <nav className="space-y-4">
        <NavLink
          to="/shift"
          className={({ isActive }) =>
            `px-4 py-2 rounded flex gap-3 items-center hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <MdOutlineAccessTime size={20} />
          Shift
        </NavLink>
        <NavLink
          to="/block"
          className={({ isActive }) =>
            `px-4 py-2 rounded flex gap-3 items-center hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <BsFillBuildingsFill size={20} />
          Block
        </NavLink>
        <NavLink
          to="/room"
          className={({ isActive }) =>
            `px-4 py-2 rounded flex gap-3 items-center hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <FaBed size={20} />
          Room
        </NavLink>
        <NavLink
          to="/doctor"
          className={({ isActive }) =>
            `px-4 py-2 rounded flex gap-3 items-center hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <FaUserDoctor size={20} />
          Doctor
        </NavLink>
        <NavLink
          to="/schedule-room"
          className={({ isActive }) =>
            `px-4 py-2 rounded flex gap-3 items-center hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <GrSchedule size={20} />
          Schedule
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
