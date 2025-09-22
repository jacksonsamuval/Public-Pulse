# 🏛 PublicPulse

[![Project Status](https://img.shields.io/badge/status-In%20Progress-yellow)](https://github.com/jacksonsamuval/Public-Pulse.git)
[![GitHub Repo](https://img.shields.io/badge/GitHub-PublicPulse-blue)](https://github.com/jacksonsamuval/Public-Pulse.git)

---

## 📌 Project Description
**PublicPulse** is a web application that enables citizens to report city issues and track their resolution. Officials (MLA, MP, CM, etc.) can respond and take action. The app supports **role-based access** to ensure proper workflow.

---

## 🛠 Technologies Used
| Layer        | Technology                       |
|-------------|----------------------------------|
| Backend      | Java Spring Boot, JPA, Hibernate |
| Frontend     | React.js, HTML, CSS, JavaScript  |
| Database     | MySQL                            |
| Authentication | JWT, Spring Security           |
| Version Control | Git, GitHub                   |

---

## 📅 Day-to-Day Progress

<details>
<summary><strong>Day 1 - Backend & Authentication</strong></summary>

- Setup project structure for Spring Boot and React  
- Created **User registration** (`User Registeration`)  
- Created **Official registration** (`Officials Registerteration`) with role management  
- Implemented **Login functionality** for both users and officials  
- Configured JWT authentication and role-based access  
- Created `README.md` for documentation

## 🖼 Project Image / Screenshot
![Backend Day 1](https://github.com/jacksonsamuval/Public-Pulse/blob/2665888a7ab2ce3267ebef39c132d6d0d2e79afe/Images/Backend-Day_1.png)


</details>

<details>
<summary><strong>Day 2 - Problem Management & Role Handling</strong></summary>

- Implemented **Problem submission flow** (`UserProblemController`)  
  - Citizens can submit problems with **description, address, city, pincode, and image upload**  
  - Added ability to **review & complete problems with feedback and rating**  
  - Fetch problems by **status** for better tracking  

- Implemented **Official problem management** (`OfficialProblemController`)  
  - Officials can **view problems by city**  
  - Officials can **take up & solve problems** with response notes  
  - Added **status update endpoints** to track progress (NOT_STARTED → PROGRESS → COMPLETED)  
  - Fetch problems assigned to a specific official  

- Implemented **Role management** (`RolesController`)  
  - Add new roles dynamically (e.g., USER, OFFICIAL, ADMIN)  
  - Retrieve all roles with a single endpoint  

## 🖼 Project Image / Screenshot
![Backend Day 2](https://github.com/jacksonsamuval/Public-Pulse/blob/main/Images/Backend-Day_2.png)

</details>


---

## ⚡ How to Run

### **Backend**

1. Clone the repository:
```bash
git clone https://github.com/yourusername/publicpulse.git