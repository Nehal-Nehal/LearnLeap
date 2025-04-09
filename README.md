 # 🎓 LearnLeap – Educational Institution Search System

**LearnLeap** is a user-friendly web platform that enables students and parents in Singapore to search, compare, and navigate educational institutions. It consolidates fragmented information and leverages open data and filtering for personalized discovery.

📍 Developed as part of SC2006 Software Engineering and Architecture by Team 4  
🔗 [GitHub Repository](https://github.com/softwarelab3/2006-SCEA-I4)

---

## 📌 Problem Statement

Educational institution information in Singapore is fragmented, and many institutional websites vary in clarity and accessibility. This makes it difficult for users to make informed choices.

---

## 💡 Our Solution

LearnLeap centralizes school, college, and university data in a single platform. It enhances accessibility and transparency by integrating open datasets and modern UX features, helping users filter institutions and access key details with ease.

---

## ✨ Key Features

- 🔍 **Comprehensive Search & Filtering**
- 🔐 **User Authentication**
- ❤️ **Favourite / Comparison Feature**
- 🗺️ **Interactive Map View**
- 📍 **Navigation to Institutions**
- 🍜 **Search for Nearby Hawker Centres**

---

## 🌐 Live Demo

_Deployment link to be updated upon release._

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Firebase Authentication
- Google Maps API

### Backend
- Python Flask
- MongoDB
- data.gov.sg API
- Firebase Admin SDK

---

## 🧩 Software Engineering Practices

- ✅ **SCRUM** methodology
- ✅ Emphasis on **Good Documentation**
- ✅ **Reusable Components & Refactoring**
- ✅ **Code Readability & Best Practices**

---

## 🧠 Design Patterns & Principles

- **Facade Pattern**: Centralized route and API access for future extensibility
- **Singleton Pattern**: Efficient database connection management
- **SOLID Principles**:
  - SRP (Single Responsibility Principle)
  - OCP (Open-Closed Principle)
  - DIP (Dependency Inversion Principle)
  - ISP (Interface Segregation Principle)

> Applied in both backend architecture and frontend component design (e.g., `InstitutionCard`, `FilterSection`).

---

## 🔗 External APIs Used

- [data.gov.sg API](https://data.gov.sg)
- [Google Maps API](https://developers.google.com/maps)

---

## ✅ Traceability & Testing

- Use-case diagrams, class diagrams, and sequence diagrams for navigation features
- Applied **white-box testing** for core functionality
- Emphasis on **Separation of Concerns** between UI and data logic (e.g., `NavigatingMap` interacts with `APIService` only)

---

## 📈 Results & Analysis

- Achieved **99.99% success** in white-box test cases for core components
- Demonstrated enhanced accessibility and user navigation efficiency
- Visualization of institutional data facilitates better decision-making for users

---

## 🔮 Future Plans

- Expand comparison features
- Enable advanced analytics and insights
- Integrate with more public APIs for enriched user experience

---

## 🧾 License

This project is licensed under the MIT License.

---

## 🙌 Team 4 – SC2006 SCEA

- Kee Chong Wei (IU2320846D)  
- Lee Jian Han (IU2320966H)  
- Tang Ying Jie (IU2322462K)  
- Choudhary Nehal (IU2323793L)  
- Venkatesh Arun Moorthy (IU2323092H)  
- Dadi Venkat Rohit (IU2422319L)  

---

> 🔍 _“Crafting Robust Systems with Smart Design”_  
> _LearnLeap: Empowering educational choices across Singapore._
