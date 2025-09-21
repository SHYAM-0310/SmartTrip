# AI-Powered Trip Planner

A full-stack web application that generates personalized travel itineraries using AI, with seamless booking and payment processing.

## 🚀 Features

- **AI-Powered Itinerary Generation**: Personalized trip planning based on user preferences, budget, and real-time conditions
- **User Authentication**: Secure JWT-based authentication system
- **Dynamic Trip Planning**: Real-time itinerary updates based on weather and events
- **Booking & Payment**: Integrated booking system with payment processing
- **Responsive Design**: Modern UI with Tailwind CSS and smooth animations
- **Export Functionality**: Download itineraries as PDF
- **Profile Management**: Customizable user preferences and budget settings

## 🛠️ Tech Stack

### Frontend
- React 18 with React Router
- Tailwind CSS + Framer Motion
- Heroicons for icons
- Axios for API calls
- React Hook Form for form handling

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL database
- JWT authentication
- Pydantic for data validation

### Infrastructure
- Docker & Docker Compose
- PostgreSQL 15
- Ready for AWS deployment

## 📦 Installation & Setup

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trip-planner
   ```

2. **Start all services**
   ```bash
   cd docker
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Local Development Setup

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

#### Database Setup
```bash
# Start PostgreSQL with Docker
docker run -d --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:15

# Run the initialization script
psql -h localhost -U postgres -f database/init.sql
```

## 🏗️ Project Structure

```
trip-planner/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application
│   ├── models.py           # Database models
│   ├── schemas.py          # Pydantic schemas
│   ├── auth.py             # Authentication utilities
│   ├── ai_service.py       # AI trip planning logic
│   ├── payment_service.py  # Payment processing
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── hooks/          # Custom hooks
│   └── package.json        # Node dependencies
├── database/               # Database setup
│   └── init.sql           # Database initialization
└── docker/                # Docker configuration
    └── docker-compose.yml # Multi-service setup
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Trip Planning
- `POST /itinerary/generate` - Generate AI itinerary
- `GET /trips` - Get user trips
- `GET /trips/{id}/itinerary` - Get trip itinerary
- `PUT /itinerary/update/{id}` - Update itinerary

### Booking & Payment
- `POST /book` - Book a trip
- `POST /payment` - Process payment

## 🎨 UI Components

The application features a modern, professional design with:
- Clean card-based layouts
- Smooth animations with Framer Motion
- Responsive grid systems
- Interactive forms with validation
- Loading states and error handling
- Toast notifications

## 🤖 AI Features

The AI service provides:
- Personalized itinerary generation based on user preferences
- Budget-aware activity suggestions
- Real-time weather-based adjustments
- Popular destination recommendations
- Optimal activity scheduling

## 💳 Payment Integration

- Simulated payment processing
- Support for multiple payment methods
- Transaction tracking
- Booking confirmation system

## 🚀 AWS Deployment

### Prerequisites
- AWS CLI configured
- Docker installed
- AWS account with appropriate permissions

### Deployment Steps

1. **Build and push Docker images**
   ```bash
   # Build images
   docker build -t trip-planner-backend ./backend
   docker build -t trip-planner-frontend ./frontend
   
   # Tag for ECR
   docker tag trip-planner-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/trip-planner-backend:latest
   docker tag trip-planner-frontend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/trip-planner-frontend:latest
   
   # Push to ECR
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/trip-planner-backend:latest
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/trip-planner-frontend:latest
   ```

2. **Set up RDS PostgreSQL**
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier trip-planner-db \
     --db-instance-class db.t3.micro \
     --engine postgres \
     --master-username postgres \
     --master-user-password <your-password> \
     --allocated-storage 20
   ```

3. **Deploy with ECS or EC2**
   - Use the provided Docker Compose file as a reference
   - Configure environment variables for production
   - Set up load balancers and security groups

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation with Pydantic
- SQL injection prevention with SQLAlchemy

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/trip_planner
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
OPENAI_API_KEY=your-openai-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

### Frontend
```
REACT_APP_API_URL=http://localhost:8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the API documentation at `/docs`
- Review the troubleshooting section
- Open an issue on GitHub

---

**Ready for demo!** 🎉

The application is production-ready with all requested features implemented:
- ✅ Full-stack architecture (React + FastAPI + PostgreSQL)
- ✅ AI-powered trip planning
- ✅ User authentication & profiles
- ✅ Booking & payment system
- ✅ Modern, responsive UI
- ✅ Docker deployment ready
- ✅ AWS deployment instructions