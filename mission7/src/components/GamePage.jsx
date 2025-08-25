import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './GamePage.css';

function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const gameContainerRef = useRef(null);
  
  // Get username and wallet from navigation state
  const { username, walletAddress } = location.state || {};
  

  


    useEffect(() => {
    // User data received successfully - redirect to Godot game
    if (username && walletAddress) {
      console.log('✅ User data received, redirecting to game subdomain...');
      console.log('Username:', username);
      console.log('Wallet:', walletAddress);
      
      // Redirect to game subdomain immediately
      const gameUrl = `https://game.monadinvaders.xyz?username=${encodeURIComponent(username)}&wallet=${encodeURIComponent(walletAddress)}`;
      console.log('🚀 Redirecting to:', gameUrl);
      window.location.href = gameUrl;
      
    } else {
      console.error('❌ Missing username or wallet address');
      
      // Show error message
      if (gameContainerRef.current) {
        gameContainerRef.current.innerHTML = `
          <div style="text-align: center; padding: 50px; color: white;">
            <h2>❌ Error: User data not found</h2>
            <p>Please go back and try again</p>
            <button onClick={() => navigate('/')} style="padding: 10px 20px; margin: 10px; background: #667eea; color: white; border: none; border-radius: 5px;">
              🏠 Back to Login
            </button>
          </div>
        `;
      }
    }
  }, [username, walletAddress, navigate]);

  return (
    <div className="game-page">
      <div className="game-header">
        
      </div>
      
             <div className="game-container" ref={gameContainerRef}>
         {/* Redirecting to game subdomain... */}
       </div>
    </div>
  );
}

export default GamePage;
