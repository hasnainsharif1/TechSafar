# TechSafar.pk

A specialized marketplace for second-hand electronics in Pakistan, connecting buyers and sellers of tech products.

## 🚀 Features

- User authentication (buyers, sellers, shop owners)
- Product listings with detailed specifications
- Real-time chat between buyers and sellers
- Advanced search and filtering
- Shop profiles for business owners
- Rating and review system

## 🛠 Tech Stack

- **Frontend**: React.js
- **Backend**: Django REST Framework
- **Database**: MongoDB
- **Real-time**: WebSocket
- **Authentication**: JWT

## 📁 Project Structure

```
techsafar/
├── backend/                 # Django backend
│   ├── techsafar/          # Main Django project
│   ├── users/              # User management app
│   ├── products/           # Product management app
│   ├── shops/              # Shop management app
│   └── chat/               # Real-time chat app
│
├── frontend/               # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── utils/        # Utility functions
│   │   ├── hooks/        # Custom hooks
│   │   ├── context/      # React context
│   │   └── assets/       # Images, styles, etc.
│   └── package.json
│
└── docs/                  # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- MongoDB
- Git

### Backend Setup

1. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start development server:
   ```bash
   npm start
   ```

## 🔧 Development

- Backend runs on: http://localhost:8000
- Frontend runs on: http://localhost:3000
- API documentation: http://localhost:8000/api/docs/

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
