# Scaler Persona Chatbot

A persona-based AI chatbot built for Scaler Academy — Assignment 01.
Talk to AI versions of Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra.

## Live Demo
## Live Demo
[https://scaler-personas-chatbot.vercel.app/](https://scaler-personas-chatbot.vercel.app/) *(Placeholder for actual deployed link)*

## Tech Stack
- **Frontend**: React + Vite (vanilla CSS)
- **Backend**: Node.js + Express
- **AI**: OpenRouter API (openai/gpt-4o-mini)

## Setup

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd GenAi-Assignment1
```

### 2. Backend
```bash
cd backend
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

App will be live at **http://localhost:5173**

## Project Structure
```
GenAi-Assignment1/
├── backend/
│   ├── server.js          # Express API server
│   ├── prompts.js         # System prompts for each persona
│   ├── .env.example       # Env template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main layout & persona switching
│   │   ├── Chat.jsx       # Chat window component
│   │   ├── personas.js    # Persona config (chips, colors, etc.)
│   │   ├── App.css
│   │   ├── Chat.css
│   │   └── index.css      # Global design system
│   └── package.json
├── prompts.md             # Annotated system prompts
└── reflection.md          # 300-500 word reflection
```

## Features
- 🎭 Three distinct personas with unique system prompts
- 💬 Real-time chat with typing indicator
- 💡 Suggestion chips per persona
- 📱 Fully responsive (mobile + desktop)
- ⚠️ Graceful API error handling
- 🔑 API key stored in environment variables only


