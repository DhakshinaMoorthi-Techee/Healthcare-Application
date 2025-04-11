import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Shift from "./pages/shift";
import Block from "./pages/block";
import Room from "./pages/room";
import Doctor from "./pages/doctor";
import RoomSchedule from "./pages/room-schedule";
import Sidebar from "./components/sidebar";
import { DataProvider } from "./context/context";

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 bg-gray-100 min-h-screen">
            <Routes>
              <Route path="/" element={<Navigate to="/shift" />} />
              <Route path="/shift" element={<Shift />} />
              <Route path="/block" element={<Block />} />
              <Route path="/room" element={<Room />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/schedule-room" element={<RoomSchedule />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
