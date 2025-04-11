import React, { createContext, useContext, useEffect, useState } from "react";

// Types
export type Shift = { id: number; name: string };
export type Block = { id: number; name: string };
export type Room = { id: number; name: string; block: Block };
export type Doctor = { id: number; name: string };

// Schedule is a dictionary mapping keys to assigned doctors
type Schedule = { [key: string]: string };

// Context Type
type DataContextType = {
  shifts: Shift[];
  blocks: Block[];
  rooms: Room[];
  doctors: Doctor[];
  schedule: Schedule;
  setShifts: React.Dispatch<React.SetStateAction<Shift[]>>;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  setSchedule: React.Dispatch<React.SetStateAction<Schedule>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

// Generic LocalStorage Getter
const getFromLocalStorage = <T,>(key: string, fallback: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};

// Provider
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [shifts, setShifts] = useState<Shift[]>(
    () => getFromLocalStorage("shifts", [])
  );
  const [blocks, setBlocks] = useState<Block[]>(
    () => getFromLocalStorage("blocks", [])
  );
  const [rooms, setRooms] = useState<Room[]>(
    () => getFromLocalStorage("rooms", [])
  );
  const [doctors, setDoctors] = useState<Doctor[]>(
    () => getFromLocalStorage("doctors", [])
  );
  const [schedule, setSchedule] = useState<Schedule>(
    () => getFromLocalStorage("schedule", {})
  );

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem("shifts", JSON.stringify(shifts));
  }, [shifts]);

  useEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }, [blocks]);

  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }, [schedule]);

  return (
    <DataContext.Provider
      value={{
        shifts,
        blocks,
        rooms,
        doctors,
        schedule,
        setShifts,
        setBlocks,
        setRooms,
        setDoctors,
        setSchedule,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Hook
export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used inside a DataProvider");
  }
  return context;
};
