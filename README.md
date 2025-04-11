# 🏥 Room Scheduling App

A dynamic room scheduling app built with React, designed to manage hospital/clinic scheduling efficiently. This project includes shift management, room allocation, block management, and weekly doctor assignments using local storage.

Live Demo Here -- https://healthcare-schedule.netlify.app/

## 📋 Workflow Overview

All input data is stored in **LocalStorage**.

### 1️⃣ Shift Page

- **Purpose:** Manage working shifts.
- **Features:** Add, update, delete shifts using a modal.
- **Example:** `10AM - 1PM`

- ![image](https://github.com/user-attachments/assets/61d16f70-36ea-4900-99f4-4cdb9dce6a9d)


### 2️⃣ Block Page

- **Purpose:** CRUD operations for Blocks (ex: Block A, Block B).
- **Features:** Add blocks that later appear in the Room section.

- ![image](https://github.com/user-attachments/assets/29c82bf4-927d-4014-958f-c3a9b7c01b7f)


### 3️⃣ Room Page

- **Purpose:** CRUD operations for Rooms.
- **Features:** Assign each room to a Block (selected via modal dropdown).
- **Behavior:** Rooms will be grouped by their blocks.

- ![image](https://github.com/user-attachments/assets/3d2e7a70-162f-43ea-84b6-f361722c9389)

### 4️⃣ Doctor Page

- **Purpose:** CRUD operations for Doctors.
- **Features:** Add a Doctor to getting assigned in the room scheduling.

- ![image](https://github.com/user-attachments/assets/dfdbf2af-f134-451b-9263-7a2afba655e0)

### 5️⃣ Room Schedule Page

- **Purpose:** Visual schedule for assigning doctors to rooms by **day** and **shift**.
- **Features:**
  - Displays rooms under each block.
  - Each room is split into time slots based on shifts.
  - Doctors can be assigned/unassigned via modals.
  - Adding a new shift updates the schedule view dynamically.
 
  - ![image](https://github.com/user-attachments/assets/057b39d7-50ee-47d3-9711-b6a0c7423473)

---

## 🧠 Functionality Summary

- 🟨 **Yellow Cell** = Click to **Add Doctor**
- ✅ **Green Cell** = Doctor assigned. Click to **Remove Doctor**
- 🔄 Same modal is reused for **Add/Remove**
- 
