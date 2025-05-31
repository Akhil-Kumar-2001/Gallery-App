# Gallery Application

A simple and elegant gallery app to view and upload images, built with modern web technologies and hosted on Render.

## 🌟 Features

- **Image Gallery**: View images in a clean, responsive gallery layout
- **Image Upload**: Upload new images with ease
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI**: Clean and intuitive user interface

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Hosting**: Render

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Akhil-Kumar-2001/Gallery-App.git
cd Gallery-App
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Set Environment Variables

In the `backend` folder, create a `.env` file and add the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## 💻 Running Locally

### Start the Backend Server

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

### Start the Client Application

Open a new terminal window and run:

```bash
cd client
npm start
```

The client application will run on `http://localhost:3000`

## 🌐 Live Demo

Access the deployed application at:

**[https://gallery-app-client.onrender.com/](https://gallery-app-client.onrender.com/)**

## 📁 Project Structure

```
Gallery-App/
├── backend/
│   ├── config/
│   ├── constants/
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── repository/
│   ├── routes/
│   ├── service/
│   ├── types/
│   ├── utils/
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
├── client/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   ├── .env/
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Akhil Kumar**
- GitHub: [@Akhil-Kumar-2001](https://github.com/Akhil-Kumar-2001)

## 🙏 Acknowledgments

- Thanks to all contributors who helped with this project
- Inspired by modern gallery applications
- Built with love using React and Node.js

---

⭐ If you found this project helpful, please give it a star!