# 📚 Book Management Dashboard

A responsive React.js dashboard application for managing books with CRUD operations, real-time search, filtering, and undo delete functionality.

## 🚀 Features

### Core Features
- **Book Management**
  - View books in responsive table layout
  - Add new books
  - Edit existing books
  - Delete books with undo capability
  - Real-time search by title or author
  - Filter by genre and status
  - Pagination (10 books per page)

### Advanced Features
- **Modern UI/UX**
  - Loading skeletons for better UX
  - Toast notifications for actions
  - Responsive design for all devices

- **State Management**
  - Redux Toolkit for state management
  - RTK Query for API caching
  - Optimistic updates
  - Local search implementation

- **Form Handling**
  - React Hook Form for form management
  - Built-in form validation
  - Error handling

## 🛠️ Technologies Used

- **Frontend**
  - React.js
  - Redux Toolkit + RTK Query
  - TailwindCSS
  - React router dom
  - React Hook Form
  - React Icons
  - Sonner

- **Backend**
  - JSON Server
  - REST API

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/mauryavinay1407/Book-Management-Dashboard.git
```

2. Install dependencies
```bash
cd book-management
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Start the JSON server
```bash
npm run server
```

## 🌟 Key Implementation Details

### Search & Filtering
- Server-side pagination
- Combined filtering for genre and status
- Local search for better performance

### Data Management
- Optimistic updates for better UX
- Cache invalidation strategies
- Error boundary implementation
- Loading state management

### UI/UX Features
- Responsive table design
- Mobile-first approach
- Accessible form controls
- Interactive loading states

## 🔄 API Endpoints

```javascript
GET    /api/books?_page=${page}&_limit=${limit}
POST   /api/books
PUT    /api/books/${id}
DELETE /api/books/${id}
```

## 📝 Project Structure

```
src/
│
├── components/
│   ├── Table.jsx
│   ├── Pagination.jsx
│   ├── UndoDelete.jsx
│   └── modals/
│       └── BookFormModal.jsx
│
├── redux/
│   ├── bookApi.js
│   ├── bookSlice.js
│   └── bookStore.js
│
├── pages/
│   └── Dashboard.jsx
│
└── utils/
    └── constants.js
```