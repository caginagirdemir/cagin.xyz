import React, { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const { authenticated, user, ready, logout, login } = usePrivy();
  const navigate = useNavigate();
  const [accountAddress, setAccountAddress] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsername = async (walletAddress) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://monad-games-id-site.vercel.app/api/check-wallet?wallet=${walletAddress}`);
      if (response.ok) {
        const data = await response.json();
        const fetchedUsername = data.hasUsername ? data.user.username : "";
        setUsername(fetchedUsername);
      } else {
        throw new Error('Failed to fetch username');
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      setError("Failed to load username");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAccountAddress("");
    setUsername("");
    setError("");

    if (authenticated && user && ready && user.linkedAccounts.length > 0) {
      const crossAppAccount = user.linkedAccounts.find(
        account => account.type === "cross_app" && account.providerApp.id === "cmd8euall0037le0my79qpz42"
      );

      if (crossAppAccount?.embeddedWallets.length > 0) {
        const walletAddress = crossAppAccount.embeddedWallets[0].address;
        setAccountAddress(walletAddress);
        fetchUsername(walletAddress);
      } else {
        setError("Monad Games ID account not found");
      }
    } else if (authenticated && user && ready) {
      setError("Please link your Monad Games ID account");
    }
  }, [authenticated, user, ready]);

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(accountAddress).then(() => {
      // Show temporary feedback
      const walletElement = document.querySelector('.wallet-address');
      if (walletElement) {
        const originalText = walletElement.textContent;
        walletElement.textContent = 'Copied!';
        walletElement.style.color = '#00FF00';
        setTimeout(() => {
          walletElement.textContent = originalText;
          walletElement.style.color = '';
        }, 1500);
      }
    }).catch(err => {
      console.error('Failed to copy wallet address:', err);
    });
  };

  if (!ready) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="login-container">
        <div className="container-background"></div>
        <div className="login-card" onClick={login}>
          <div className="card-content">
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-card">
        <h2>Welcome to Monad Invaders!</h2>
        
        {error && <p className="error-message">{error}</p>}
        
        {accountAddress && (
          <>
            {loading ? (
              <p>Loading username...</p>
            ) : username ? (
              <div className="username-section">
                <strong>Username: {username}</strong>
              </div>
            ) : (
              <div className="no-username">
                <p>No username found</p>
                <a
                  href="https://monad-games-id-site.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="register-link"
                >
                  Register Username
                </a>
              </div>
            )}
            
            <div className="wallet-section">
              <p><strong>Wallet:</strong></p>
              <div className="wallet-container">
                <code
                  className="wallet-address"
                  onClick={copyWalletAddress}
                  title="Click to copy full address"
                >
                  {`${accountAddress.substring(0, 6)}...${accountAddress.substring(accountAddress.length - 4)}`}
                </code>
                <span className="copy-hint">📋 Click to copy</span>
              </div>
            </div>
            
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
            
            <button onClick={() => {
              console.log('=== PLAY GAME BUTTON CLICKED ===');
              console.log('Username:', username);
              console.log('Wallet address:', accountAddress);
              console.log('Navigating to /game...');
              
              // Ensure username is not empty
              const finalUsername = username || 'Player';
              console.log('Final username to send:', finalUsername);
              
              navigate('/game', { 
                state: { 
                  username: finalUsername, 
                  walletAddress: accountAddress 
                } 
              });
              
              console.log('Navigation completed');
            }} className="play-game-btn">
              🎮 Play Game
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
