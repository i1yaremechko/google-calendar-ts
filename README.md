# Google Calendar Clone (TypeScript)

A web application that clones the core functionality of Google Calendar. This project was initially built with vanilla JavaScript and later fully migrated to **TypeScript** to ensure type safety, better code scalability, and robust architecture.

## 🔗 Live Demo
[View the Live Project](https://i1yaremechko.github.io/google-calendar-ts/)

## 🛠️ Technologies & Tools
- **TypeScript** (Strict mode, ES6+ Modules)
- **SCSS** (Sass) with modular architecture
- **MockAPI** (REST API for full CRUD event synchronization)
- **Prettier / ESLint** (Configured with Airbnb Style Guide)

## 💡 Features
- **Weekly Calendar Grid:** Dynamic rendering of days, hours, and navigation between weeks.
- **Event Management:** Full CRUD operations (Create, Read, Update, Delete) synchronized with a remote server.
- **Dynamic Time Line:** A real-time red indicator showing the current time of the day.
- **Smart Form Validation:** - Restricts event creation if there is a time overlap with an existing event.
  - Ensures event duration is a multiple of 15 minutes.
  - Limits maximum event duration to 6 hours.
  - Enforces starting and ending within the same day.
- **Dynamic Color Themes:** Ability to change individual event background colors directly via a context popup.

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/i1yaremechko/google-calendar-ts.git](https://github.com/i1yaremechko/google-calendar-ts.git)
   cd google-calendar-ts