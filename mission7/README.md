# Monad Invaders Login

A modern login page that integrates "Sign in with Monad Games ID" using Privy authentication.

## Features

- **Monad Games ID Integration**: Uses Privy's cross-app authentication
- **Modern UI**: Beautiful, responsive design with glassmorphism effects
- **Wallet Display**: Shows connected wallet address with copy functionality
- **Username Integration**: Fetches and displays username from Monad Games ID
- **Responsive Design**: Works on all device sizes

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

The project is configured with:
- **App ID**: `cmeg2vp8i00evk30a8e99luiv` (Your Privy Dashboard app ID)
- **Cross App ID**: `cmd8euall0037le0my79qpz42` (Monad Games ID provider)

## Build

To build for production:
```bash
npm run build
```

## Technologies Used

- React 18
- Vite
- Privy Authentication
- CSS3 with modern features (backdrop-filter, gradients)
