// Modern Bootstrap Template JavaScript

// Global variables
let nftPrizePool = [];
let tokenPrize = {
    enabled: false,
    amount: 0
};
let guaranteedPrize = {
    enabled: false
};
let maxChests = {
    value: 0
};
let latestSolidityCode = '';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the application
    initApp();
    
    // Add event listeners
    setupEventListeners();
    
    // Add smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add scroll effects
    setupScrollEffects();
    
    // Load existing NFTs from localStorage
    loadNftsFromStorage();
    
    // Load token prize data from localStorage
    loadTokenPrizeFromStorage();
    
    // Load guaranteed prize data from localStorage
    loadGuaranteedPrizeFromStorage();
    
    // Load max chests data from localStorage
    loadMaxChestsFromStorage();
    
    // Display NFTs
    displayNfts();
    
    // Initialize token controls
    initializeTokenControls();
    
    // Initialize guaranteed prize controls
    initializeGuaranteedPrizeControls();
    
    // Initialize max chests controls
    initializeMaxChestsControls();
    
    // Add event listeners for copy/download buttons
    const copyBtn = document.getElementById('copyContractBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyContractCode);
    }
    const downloadBtn = document.getElementById('downloadContractBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', manualDownloadSolidityContract);
    }
    // Add event listener for reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAllFields);
    }
});

// Initialize the application
function initApp() {
    // Add loading animation to buttons
    addLoadingStates();
    
    // Initialize tooltips
    initTooltips();
    
    // Add some sample data
    //displayWelcomeMessage();
}

// Setup event listeners
function setupEventListeners() {
    
    // Primary button click
    const primaryBtn = document.getElementById('primaryBtn');
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function() {
            showNotification('🎉 Welcome! You clicked the primary button.', 'success');
            animateButton(this);
        });
    }
    
    // Secondary button click
    const secondaryBtn = document.getElementById('secondaryBtn');
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function() {
            showNotification('ℹ️ This is the secondary button. Learn more about our features!', 'info');
            animateButton(this);
        });
    }
    
    // Submit button click
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleFormSubmit);
    }
    
    // Clear button click
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearForm);
    }
    
    // Form input validation
    setupFormValidation();
    
    // Add keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Add NFT button click
    const addNftBtn = document.getElementById('addNftBtn');
    if (addNftBtn) {
        addNftBtn.addEventListener('click', handleAddNft);
    }
    
    // Form submission on Enter key
    const nftForm = document.getElementById('addNftForm');
    if (nftForm) {
        nftForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddNft();
        });
    }
    
    // Modal events
    const addNftModal = document.getElementById('addNftModal');
    if (addNftModal) {
        addNftModal.addEventListener('hidden.bs.modal', function() {
            clearNftForm();
        });
    }
    
    // Token switch control
    const tokenSwitch = document.getElementById('tokenSwitch');
    if (tokenSwitch) {
        tokenSwitch.addEventListener('change', handleTokenSwitchChange);
    }
    
    // Token amount input
    const tokenAmountInput = document.getElementById('tokenAmount');
    if (tokenAmountInput) {
        tokenAmountInput.addEventListener('input', handleTokenAmountChange);
    }
    
    // Guaranteed prize switch control
    const guaranteedPrizeSwitch = document.getElementById('guaranteedPrizeSwitch');
    if (guaranteedPrizeSwitch) {
        guaranteedPrizeSwitch.addEventListener('change', handleGuaranteedPrizeSwitchChange);
    }
    
    // Max chests input
    const maxChestsInput = document.getElementById('maxChests');
    if (maxChestsInput) {
        maxChestsInput.addEventListener('input', handleMaxChestsChange);
        maxChestsInput.addEventListener('blur', validateMaxChests);
    }
    
    // Generate contract button
    const generateContractBtn = document.getElementById('generateContractBtn');
    if (generateContractBtn) {
        generateContractBtn.addEventListener('click', handleGenerateContract);
    }
}

// Handle form submission
function handleFormSubmit() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const messageInput = document.getElementById('messageInput');
    const resultArea = document.getElementById('resultArea');
    
    // Validate inputs
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showResult('Please fill in all fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        showResult('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const originalText = this.innerHTML;
    this.innerHTML = '<span class="loading"></span> Processing...';
    this.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        this.innerHTML = originalText;
        this.disabled = false;
        
        // Show success message
        showResult(`Thank you, ${nameInput.value}! Your message has been submitted successfully.`, 'success');
        
        // Clear form
        clearForm();
        
        // Show notification
        showNotification('✅ Form submitted successfully!', 'success');
        
    }, 2000);
}

// Clear form
function clearForm() {
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('messageInput').value = '';
    document.getElementById('resultArea').innerHTML = '';
    document.getElementById('resultArea').className = '';
}

// Show result message
function showResult(message, type) {
    const resultArea = document.getElementById('resultArea');
    resultArea.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
            ${message}
        </div>
    `;
    resultArea.className = `result-${type}`;
}

// Setup form validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        field.classList.add('is-invalid');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    field.classList.remove('is-invalid');
    return true;
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup scroll effects
function setupScrollEffects() {
    let ticking = false;
    
    function updateOnScroll() {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            if (scrolled > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Add loading states to buttons
function addLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                animateButton(this);
            }
        });
    });
}

// Animate button click
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

// Initialize tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn && !submitBtn.disabled) {
                e.preventDefault();
                handleFormSubmit.call(submitBtn);
            }
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            clearForm();
        }
        
        // Ctrl/Cmd + Enter to submit form when modal is open
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const modal = document.getElementById('addNftModal');
            if (modal && modal.classList.contains('show')) {
                e.preventDefault();
                handleAddNft();
            }
        }
        
        // Escape to close modal
        if (e.key === 'Escape') {
            const modal = bootstrap.Modal.getInstance(document.getElementById('addNftModal'));
            if (modal) {
                modal.hide();
            }
        }
        
        // Space to toggle token switch when focused
        if (e.key === ' ' && e.target.id === 'tokenSwitch') {
            e.preventDefault();
            e.target.checked = !e.target.checked;
            handleTokenSwitchChange();
        }
        
        // Space to toggle guaranteed prize switch when focused
        if (e.key === ' ' && e.target.id === 'guaranteedPrizeSwitch') {
            e.preventDefault();
            e.target.checked = !e.target.checked;
            handleGuaranteedPrizeSwitchChange();
        }
        
        // Enter to generate contract when button is focused
        if (e.key === 'Enter' && e.target.id === 'generateContractBtn') {
            e.preventDefault();
            handleGenerateContract.call(e.target);
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Display welcome message
function displayWelcomeMessage() {
    const messages = [
        '🚀 Welcome to our modern template!',
        '✨ Built with Bootstrap 5.3.2',
        '🎨 Responsive and beautiful design',
        '⚡ Fast and optimized performance'
    ];
    
    let messageIndex = 0;
    
    function showNextMessage() {
        if (messageIndex < messages.length) {
            showNotification(messages[messageIndex], 'info');
            messageIndex++;
            setTimeout(showNextMessage, 3000);
        }
    }
    
    // Start showing messages after 2 seconds
    setTimeout(showNextMessage, 2000);
}

// Utility function to debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility function to throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add some interactive features
function addInteractiveFeatures() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add click effects to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('🔗 Social link clicked! (Demo only)', 'info');
        });
    });
}

// Initialize interactive features
document.addEventListener('DOMContentLoaded', function() {
    addInteractiveFeatures();
});

// Export functions for potential external use
window.TemplateApp = {
    showNotification,
    clearForm,
    handleFormSubmit,
    showResult
};

// Handle adding NFT to prize pool
function handleAddNft() {
    const nftNameInput = document.getElementById('nftName');
    const nftQuantityInput = document.getElementById('nftQuantity');
    
    // Get values
    const nftName = nftNameInput.value.trim();
    const nftQuantity = parseInt(nftQuantityInput.value);
    
    // Validate inputs
    if (!nftName) {
        showNotification('Please enter an NFT name.', 'error');
        nftNameInput.focus();
        return;
    }
    
    if (!nftQuantity || nftQuantity < 1) {
        showNotification('Please enter a valid quantity (minimum 1).', 'error');
        nftQuantityInput.focus();
        return;
    }
    
    // Check if NFT already exists
    const existingNftIndex = nftPrizePool.findIndex(nft => nft.name.toLowerCase() === nftName.toLowerCase());
    
    if (existingNftIndex !== -1) {
        // Update existing NFT quantity
        nftPrizePool[existingNftIndex].quantity += nftQuantity;
        showNotification(`Updated quantity for "${nftName}" to ${nftPrizePool[existingNftIndex].quantity}.`, 'success');
    } else {
        // Add new NFT
        const newNft = {
            id: Date.now(),
            name: nftName,
            quantity: nftQuantity
        };
        nftPrizePool.push(newNft);
        showNotification(`Added "${nftName}" with quantity ${nftQuantity} to prize pool.`, 'success');
    }
    
    // Save to localStorage
    saveNftsToStorage();
    
    // Display updated list
    displayNfts();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addNftModal'));
    if (modal) {
        modal.hide();
    }
    
    // Clear form
    clearNftForm();
}

// Display NFTs in the prize pool
function displayNfts() {
    const nftPrizePoolContainer = document.getElementById('nftPrizePool');
    
    if (!nftPrizePoolContainer) return;
    
    if (nftPrizePool.length === 0) {
        nftPrizePoolContainer.innerHTML = '';
        return;
    }
    
    const nftItems = nftPrizePool.map(nft => `
        <div class="nft-item" data-nft-id="${nft.id}">
            <div class="nft-info">
                <div class="nft-name">${escapeHtml(nft.name)}</div>
                <div class="nft-quantity">Quantity: ${nft.quantity}</div>
            </div>
            <div class="nft-actions">
                <button class="btn-delete" onclick="deleteNft(${nft.id})" title="Delete NFT">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    nftPrizePoolContainer.innerHTML = nftItems;
}

// Delete NFT from prize pool
function deleteNft(nftId) {
    const nftIndex = nftPrizePool.findIndex(nft => nft.id === nftId);
    
    if (nftIndex === -1) {
        showNotification('NFT not found.', 'error');
        return;
    }
    
    const nftName = nftPrizePool[nftIndex].name;
    
    // Remove NFT from array
    nftPrizePool.splice(nftIndex, 1);
    
    // Save to localStorage
    saveNftsToStorage();
    
    // Display updated list
    displayNfts();
    
    // Show notification
    showNotification(`Removed "${nftName}" from prize pool.`, 'success');
}

// Clear NFT form
function clearNftForm() {
    const nftNameInput = document.getElementById('nftName');
    const nftQuantityInput = document.getElementById('nftQuantity');
    
    if (nftNameInput) nftNameInput.value = '';
    if (nftQuantityInput) nftQuantityInput.value = '';
}

// Save NFTs to localStorage
function saveNftsToStorage() {
    try {
        localStorage.setItem('nftPrizePool', JSON.stringify(nftPrizePool));
    } catch (error) {
        console.error('Error saving NFTs to localStorage:', error);
    }
}

// Load NFTs from localStorage
function loadNftsFromStorage() {
    try {
        const savedNfts = localStorage.getItem('nftPrizePool');
        if (savedNfts) {
            nftPrizePool = JSON.parse(savedNfts);
        }
    } catch (error) {
        console.error('Error loading NFTs from localStorage:', error);
        nftPrizePool = [];
    }
}

// Save token prize to localStorage
function saveTokenPrizeToStorage() {
    try {
        localStorage.setItem('tokenPrize', JSON.stringify(tokenPrize));
    } catch (error) {
        console.error('Error saving token prize to localStorage:', error);
    }
}

// Load token prize from localStorage
function loadTokenPrizeFromStorage() {
    try {
        const savedTokenPrize = localStorage.getItem('tokenPrize');
        if (savedTokenPrize) {
            tokenPrize = JSON.parse(savedTokenPrize);
        }
    } catch (error) {
        console.error('Error loading token prize from localStorage:', error);
        tokenPrize = { enabled: false, amount: 0 };
    }
}

// Save guaranteed prize to localStorage
function saveGuaranteedPrizeToStorage() {
    try {
        localStorage.setItem('guaranteedPrize', JSON.stringify(guaranteedPrize));
    } catch (error) {
        console.error('Error saving guaranteed prize to localStorage:', error);
    }
}

// Load guaranteed prize from localStorage
function loadGuaranteedPrizeFromStorage() {
    try {
        const savedGuaranteedPrize = localStorage.getItem('guaranteedPrize');
        if (savedGuaranteedPrize) {
            guaranteedPrize = JSON.parse(savedGuaranteedPrize);
        }
    } catch (error) {
        console.error('Error loading guaranteed prize from localStorage:', error);
        guaranteedPrize = { enabled: false };
    }
}

// Save max chests to localStorage
function saveMaxChestsToStorage() {
    try {
        localStorage.setItem('maxChests', JSON.stringify(maxChests));
    } catch (error) {
        console.error('Error saving max chests to localStorage:', error);
    }
}

// Load max chests from localStorage
function loadMaxChestsFromStorage() {
    try {
        const savedMaxChests = localStorage.getItem('maxChests');
        if (savedMaxChests) {
            maxChests = JSON.parse(savedMaxChests);
        }
    } catch (error) {
        console.error('Error loading max chests from localStorage:', error);
        maxChests = { value: 0 };
    }
}

// Initialize token controls
function initializeTokenControls() {
    const tokenSwitch = document.getElementById('tokenSwitch');
    const tokenAmountInput = document.getElementById('tokenAmount');
    
    if (tokenSwitch && tokenAmountInput) {
        // Set initial state
        tokenSwitch.checked = tokenPrize.enabled;
        tokenAmountInput.value = tokenPrize.amount || '';
        
        // Set input disabled state
        tokenAmountInput.disabled = !tokenPrize.enabled;
        
        // Update input group styling
        updateTokenInputGroupState();
    }
}

// Handle token switch change
function handleTokenSwitchChange() {
    const tokenSwitch = document.getElementById('tokenSwitch');
    const tokenAmountInput = document.getElementById('tokenAmount');
    
    if (tokenSwitch && tokenAmountInput) {
        tokenPrize.enabled = tokenSwitch.checked;
        tokenAmountInput.disabled = !tokenPrize.enabled;
        
        // Update input group styling
        updateTokenInputGroupState();
        
        // Clear amount if disabled
        if (!tokenPrize.enabled) {
            tokenPrize.amount = 0;
            tokenAmountInput.value = '';
        }
        
        // Save to localStorage
        saveTokenPrizeToStorage();
        
        // Show notification
        if (tokenPrize.enabled) {
            showNotification('Token prize enabled. Enter the amount of tokens.', 'success');
        } else {
            showNotification('Token prize disabled.', 'info');
        }
    }
}

// Handle token amount change
function handleTokenAmountChange() {
    const tokenAmountInput = document.getElementById('tokenAmount');
    
    if (tokenAmountInput) {
        let amount = parseFloat(tokenAmountInput.value) || 0;
        // If guaranteed prize is ON, enforce min 1
        if (guaranteedPrize.enabled && amount < 1) {
            amount = 1;
            tokenAmountInput.value = 1;
            showNotification('Token amount cannot be less than 1 when a prize is guaranteed.', 'error');
        }
        tokenPrize.amount = amount;
        
        // Save to localStorage
        saveTokenPrizeToStorage();
        
        // Show notification for significant amounts
        if (amount > 0) {
            showNotification(`Token amount set to ${amount} tokens.`, 'success');
        }
    }
}

// Update token input group state
function updateTokenInputGroupState() {
    const tokenAmountInput = document.getElementById('tokenAmount');
    const inputGroupText = tokenAmountInput?.nextElementSibling;
    
    if (tokenAmountInput && inputGroupText) {
        if (tokenAmountInput.disabled) {
            inputGroupText.classList.add('disabled');
        } else {
            inputGroupText.classList.remove('disabled');
        }
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Export functions for potential external use
window.NFTApp = {
    addNft: handleAddNft,
    deleteNft: deleteNft,
    getNftPrizePool: () => nftPrizePool,
    getTokenPrize: () => tokenPrize,
    getGuaranteedPrize: () => guaranteedPrize,
    getMaxChests: () => maxChests,
    generateContract: handleGenerateContract,
    clearPrizePool: () => {
        nftPrizePool = [];
        saveNftsToStorage();
        displayNfts();
        showNotification('Prize pool cleared.', 'success');
    },
    clearTokenPrize: () => {
        tokenPrize = { enabled: false, amount: 0 };
        saveTokenPrizeToStorage();
        initializeTokenControls();
        showNotification('Token prize cleared.', 'success');
    },
    clearGuaranteedPrize: () => {
        guaranteedPrize = { enabled: false };
        saveGuaranteedPrizeToStorage();
        initializeGuaranteedPrizeControls();
        showNotification('Guaranteed prize cleared.', 'success');
    },
    clearMaxChests: () => {
        maxChests = { value: 0 };
        saveMaxChestsToStorage();
        initializeMaxChestsControls();
        showNotification('Maximum chests cleared.', 'success');
    }
};

// Initialize guaranteed prize controls
function initializeGuaranteedPrizeControls() {
    const guaranteedPrizeSwitch = document.getElementById('guaranteedPrizeSwitch');
    
    if (guaranteedPrizeSwitch) {
        // Set initial state
        guaranteedPrizeSwitch.checked = guaranteedPrize.enabled;
    }
    // Enforce dependency on token prize section
    enforceGuaranteedPrizeDependency();
}

// Handle guaranteed prize switch change
function handleGuaranteedPrizeSwitchChange() {
    const guaranteedPrizeSwitch = document.getElementById('guaranteedPrizeSwitch');
    
    if (guaranteedPrizeSwitch) {
        guaranteedPrize.enabled = guaranteedPrizeSwitch.checked;
        
        // Save to localStorage
        saveGuaranteedPrizeToStorage();
        
        // Show notification
        if (guaranteedPrize.enabled) {
            showNotification('Guaranteed prize enabled. Every chest will contain a prize.', 'success');
        } else {
            showNotification('Guaranteed prize disabled. Chests can be empty.', 'info');
        }
        // Enforce dependency on token prize section
        enforceGuaranteedPrizeDependency();
    }
}

// Enforce dependency between Guaranteed Prize and Token Prize
function enforceGuaranteedPrizeDependency() {
    const tokenSwitch = document.getElementById('tokenSwitch');
    const tokenAmountInput = document.getElementById('tokenAmount');
    const tokenInputGroup = tokenAmountInput?.closest('.input-group');
    
    if (!tokenSwitch || !tokenAmountInput) return;
    
    if (guaranteedPrize.enabled) {
        // Force token prize ON and disable the switch
        tokenSwitch.checked = true;
        tokenSwitch.disabled = true;
        tokenPrize.enabled = true;
        // Set token amount min to 1
        tokenAmountInput.min = 1;
        tokenAmountInput.disabled = false;
        // If value is less than 1, set to 1
        if (parseFloat(tokenAmountInput.value) < 1) {
            tokenAmountInput.value = 1;
            tokenPrize.amount = 1;
            saveTokenPrizeToStorage();
        }
        // Add visual cue (optional)
        if (tokenInputGroup) tokenInputGroup.classList.add('guaranteed-enforced');
    } else {
        // Restore normal behavior
        tokenSwitch.disabled = false;
        tokenAmountInput.min = 0;
        // Only enable/disable input based on switch
        tokenAmountInput.disabled = !tokenSwitch.checked;
        // Remove visual cue
        if (tokenInputGroup) tokenInputGroup.classList.remove('guaranteed-enforced');
    }
}

// Handle generate contract button click
function handleGenerateContract() {
    // Validate max chests
    if (!validateMaxChests()) {
        return;
    }
    
    // Show loading state
    const originalText = this.innerHTML;
    this.innerHTML = '<span class="loading"></span> Generating Contract...';
    this.disabled = true;
    
    // Simulate contract generation
    setTimeout(() => {
        // Reset button
        this.innerHTML = originalText;
        this.disabled = false;
        
        // Generate contract data
        const contractData = generateContractData();
        
        // Show success notification
        showNotification('Contract template generated successfully!', 'success');
        
        // Log contract data to console (for demo purposes)
        console.log('Generated Contract Data:', contractData);
        
        // Display contract script in the UI (JSON)
        displayContractScript(contractData);
        
        // Calculate and display minimum prize value
        displayMinimumPrizeValue(contractData);
        
        // Generate Solidity contract
        const solidityCode = generateSolidityContract(contractData);
        latestSolidityCode = solidityCode;
        displaySolidityScript(solidityCode);
        // No automatic download
        // (Download functionality is only triggered by the Download button)
        // downloadContractTemplate(contractData); // (JSON download, if needed)
        
    }, 2000);
}

// Display contract script in the UI
function displayContractScript(contractData) {
    const contractScriptEl = document.getElementById('contractScript');
    if (contractScriptEl) {
        contractScriptEl.textContent = JSON.stringify(contractData, null, 2);
    }
}

// Calculate and display minimum prize value
function displayMinimumPrizeValue(contractData) {
    const minPrizeValueEl = document.getElementById('minPrizeValue');
    if (!minPrizeValueEl) return;

    const guaranteed = contractData.guaranteedPrize?.enabled;
    const maxChests = contractData.maxChests?.value || 0;
    const tokenPrizeEnabled = contractData.tokenPrize?.enabled;
    const tokenPrizeAmount = contractData.tokenPrize?.amount || 0;

    if (!guaranteed) {
        minPrizeValueEl.textContent = 'Can be empty';
        minPrizeValueEl.classList.remove('text-info');
        minPrizeValueEl.classList.add('text-warning');
        return;
    }

    // Guaranteed Prize is ON
    let minToken = 0;
    if (tokenPrizeEnabled && maxChests > 0 && tokenPrizeAmount > 0) {
        minToken = tokenPrizeAmount / maxChests;
    }
    // Format for display (up to 6 decimals, remove trailing zeros)
    let minTokenDisplay = minToken.toFixed(6).replace(/\.0+$|0+$/, '');
    if (minToken > 0) {
        minPrizeValueEl.textContent = minTokenDisplay + (parseFloat(minTokenDisplay) === 1 ? ' Token' : ' Tokens');
        minPrizeValueEl.classList.remove('text-warning');
        minPrizeValueEl.classList.add('text-info');
    } else {
        minPrizeValueEl.textContent = '0 Token';
        minPrizeValueEl.classList.remove('text-warning');
        minPrizeValueEl.classList.add('text-info');
    }
}

// Generate contract data
function generateContractData() {
    const contractData = {
        nftPrizePool: nftPrizePool,
        tokenPrize: tokenPrize,
        guaranteedPrize: guaranteedPrize,
        maxChests: maxChests,
        timestamp: new Date().toISOString(),
        totalNfts: nftPrizePool.reduce((total, nft) => total + nft.quantity, 0),
        hasTokenPrize: tokenPrize.enabled && tokenPrize.amount > 0,
        isGuaranteed: guaranteedPrize.enabled,
        maxChestsLimit: maxChests.value
    };
    
    return contractData;
}

// Download contract template (placeholder function)
function downloadContractTemplate(contractData) {
    // Create a blob with the contract data
    const blob = new Blob([JSON.stringify(contractData, null, 2)], {
        type: 'application/json'
    });
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nft-chest-contract-${Date.now()}.json`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    showNotification('Contract template downloaded!', 'success');
}

// Initialize max chests controls
function initializeMaxChestsControls() {
    const maxChestsInput = document.getElementById('maxChests');
    
    if (maxChestsInput) {
        // Set initial value
        maxChestsInput.value = maxChests.value || '';
    }
}

// Handle max chests input change
function handleMaxChestsChange() {
    const maxChestsInput = document.getElementById('maxChests');
    
    if (maxChestsInput) {
        const value = parseInt(maxChestsInput.value) || 0;
        maxChests.value = value;
        
        // Save to localStorage
        saveMaxChestsToStorage();
        
        // Show notification for significant values
        if (value > 0) {
            showNotification(`Maximum chests set to ${value}.`, 'success');
        }
    }
}

// Validate max chests input
function validateMaxChests() {
    const maxChestsInput = document.getElementById('maxChests');
    
    if (maxChestsInput) {
        const value = parseInt(maxChestsInput.value);
        
        if (value < 1) {
            maxChestsInput.classList.add('is-invalid');
            showNotification('Maximum chests must be at least 1.', 'error');
            return false;
        } else {
            maxChestsInput.classList.remove('is-invalid');
            return true;
        }
    }
    return true;
}

// Display Solidity contract in the script section
function displaySolidityScript(solidityCode) {
    const contractScriptEl = document.getElementById('contractScript');
    if (contractScriptEl) {
        contractScriptEl.textContent = solidityCode;
    }
}

// Copy contract code to clipboard
function copyContractCode() {
    if (!latestSolidityCode) return;
    navigator.clipboard.writeText(latestSolidityCode)
        .then(() => {
            showNotification('Contract code copied to clipboard!', 'success');
        })
        .catch(() => {
            showNotification('Failed to copy contract code.', 'error');
        });
}

// Download contract code as .sol file
function manualDownloadSolidityContract() {
    if (!latestSolidityCode) return;
    const blob = new Blob([latestSolidityCode], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ChestNFTContract_${Date.now()}.sol`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    showNotification('Solidity contract downloaded!', 'success');
}

// Generate Solidity contract code as a string
function generateSolidityContract(contractData) {
    // Extract parameters
    const maxChests = contractData.maxChests?.value || 0;
    const guaranteed = contractData.guaranteedPrize?.enabled;
    const nftPrizes = contractData.nftPrizePool || [];
    const tokenPrizeEnabled = contractData.tokenPrize?.enabled;
    const tokenPrizeAmount = contractData.tokenPrize?.amount || 0;
    const tokenPrizeAddress = '0xTokenAddressHere'; // Placeholder
    const nftPrizeAddress = '0xNFTAddressHere'; // Placeholder
    const chestNftAddress = '0xChestNFTAddressHere'; // Placeholder
    // Assume 18 decimals for ERC20 tokens
    const ERC20_DECIMALS = 18;
    let minTokenPrize = 0;
    if (guaranteed && maxChests > 0 && tokenPrizeAmount > 0) {
        minTokenPrize = tokenPrizeAmount / maxChests;
    }
    // Convert to uint for contract (with decimals)
    const minTokenPrizeUint = (minTokenPrize * Math.pow(10, ERC20_DECIMALS)).toFixed(0);
    const nftPrizeIds = nftPrizes.map((nft, i) => `uint256(${i+1})`).join(', ');
    const nftPrizeAmounts = nftPrizes.map(nft => nft.quantity).join(', ');
    const totalNftPrizes = nftPrizes.reduce((sum, nft) => sum + nft.quantity, 0);
    const totalTokenPrize = tokenPrizeEnabled ? tokenPrizeAmount : 0;

    // Solidity code
    return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Chest NFT Contract Generator
 * @notice This contract manages a chest NFT system with dynamic prize distribution.
 *         Prizes can be NFTs and/or ERC20 tokens. Prizes are distributed as chests are burned.
 *         The logic adapts based on whether prizes are guaranteed or not.
 *         The contract holds a token pool for distribution and logs NFT wins on-chain.
 */
contract ChestNFT is Ownable {
    IERC721 public chestNFT;
    IERC20 public prizeToken;

    uint256 public maxChests = ${maxChests};
    uint256 public chestsBurned;
    bool public guaranteedPrize = ${guaranteed};

    // Prize pools
    uint256[] public nftPrizeIds = [${nftPrizeIds}];
    uint256[] public nftPrizeAmounts = [${nftPrizeAmounts}];
    uint256 public totalNftPrizes = ${totalNftPrizes};
    uint256 public totalTokenPrize = ${totalTokenPrize} * 1e18;
    uint256 public tokensDistributed;
    uint256 public nftsDistributed;

    uint256 public minTokenPrize = ${minTokenPrizeUint}; // Minimum token prize per chest (with decimals)

    mapping(uint256 => bool) public chestBurned;
    mapping(address => bool) public hasClaimed;

    event PrizeWon(address indexed user, string prizeType, uint256 prizeIdOrAmount);

    constructor(address _chestNftAddress, address _prizeTokenAddress)
        Ownable(msg.sender)
    {
        chestNFT = IERC721(_chestNftAddress);
        prizeToken = IERC20(_prizeTokenAddress);
        // ... any other initialization ...
    }

    /**
     * @notice Owner deposits tokens into the contract for prize distribution.
     *         Must approve this contract to spend tokens before calling.
     */
    function depositTokens(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be > 0");
        require(prizeToken.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
    }

    /**
     * @notice Burn a chest NFT to try to win a prize.
     *         Prize logic adapts based on guaranteedPrize mode.
     */
    function burnChest(uint256 chestId) external {
        require(!chestBurned[chestId], "Chest already burned");
        require(chestsBurned < maxChests, "All chests have been burned");
        require(chestNFT.ownerOf(chestId) == msg.sender, "Not the owner of this chest");

        chestNFT.transferFrom(msg.sender, address(0xdead), chestId);
        chestBurned[chestId] = true;
        chestsBurned++;

        // Prize logic
        if (guaranteedPrize) {
            _guaranteedPrizeLogic(msg.sender);
        } else {
            _nonGuaranteedPrizeLogic(msg.sender);
        }
    }

    /**
     * @dev Guaranteed Prize logic: always win NFT or minimum tokens.
     *      If both are available, randomly choose which to give.
     */
    function _guaranteedPrizeLogic(address user) internal {
        bool hasNFTs = nftsDistributed < totalNftPrizes;
        bool hasTokens = tokensDistributed < totalTokenPrize;
        require(hasNFTs || hasTokens, "No prizes left");

        if (hasNFTs && hasTokens) {
            // Randomly choose NFT or token
            uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, user, chestsBurned, blockhash(block.number - 1)))) % 2;
            if (rand == 0) {
                // NFT prize: log only
                uint256 prizeIndex = _drawNftPrize();
                nftsDistributed++;
                emit PrizeWon(user, "NFT", prizeIndex);
            } else {
                // Token prize: transfer and log
                uint256 remainingChests = maxChests - chestsBurned + 1;
                uint256 remainingTokens = totalTokenPrize - tokensDistributed;
                uint256 minPrize = remainingTokens / remainingChests;
                if (minPrize < minTokenPrize) minPrize = minTokenPrize;
                require(minPrize > 0, "No tokens left");
                require(prizeToken.balanceOf(address(this)) >= minPrize, "Insufficient token pool");
                prizeToken.transfer(user, minPrize);
                tokensDistributed += minPrize;
                emit PrizeWon(user, "TOKEN", minPrize);
            }
        } else if (hasNFTs) {
            // NFT prize: log only
            uint256 prizeIndex = _drawNftPrize();
            nftsDistributed++;
            emit PrizeWon(user, "NFT", prizeIndex);
        } else {
            // Token prize: transfer and log
            uint256 remainingChests = maxChests - chestsBurned + 1;
            uint256 remainingTokens = totalTokenPrize - tokensDistributed;
            uint256 minPrize = remainingTokens / remainingChests;
            if (minPrize < minTokenPrize) minPrize = minTokenPrize;
            require(minPrize > 0, "No tokens left");
            require(prizeToken.balanceOf(address(this)) >= minPrize, "Insufficient token pool");
            prizeToken.transfer(user, minPrize);
            tokensDistributed += minPrize;
            emit PrizeWon(user, "TOKEN", minPrize);
        }
    }

    /**
     * @dev Non-guaranteed Prize logic: can win NFT, tokens, or nothing.
     */
    function _nonGuaranteedPrizeLogic(address user) internal {
        uint256 remainingPrizes = (totalNftPrizes - nftsDistributed) + (totalTokenPrize - tokensDistributed > 0 ? 1 : 0);
        uint256 remainingChests = maxChests - chestsBurned + 1;
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, user, chestsBurned))) % remainingChests;
        if (remainingPrizes > 0 && rand < remainingPrizes) {
            // Win a prize
            if (nftsDistributed < totalNftPrizes) {
                // NFT prize: log only
                uint256 prizeIndex = _drawNftPrize();
                nftsDistributed++;
                emit PrizeWon(user, "NFT", prizeIndex);
            } else if (tokensDistributed < totalTokenPrize) {
                // Token prize: transfer and log
                uint256 remainingTokens = totalTokenPrize - tokensDistributed;
                uint256 remainingPrizeChests = remainingChests;
                uint256 minPrize = remainingTokens / remainingPrizeChests;
                require(prizeToken.balanceOf(address(this)) >= minPrize, "Insufficient token pool");
                prizeToken.transfer(user, minPrize);
                tokensDistributed += minPrize;
                emit PrizeWon(user, "TOKEN", minPrize);
            }
        } else {
            // Empty outcome
            emit PrizeWon(user, "EMPTY", 0);
        }
    }

    /**
     * @dev Draw an NFT prize (decrementing the count in nftPrizeAmounts).
     *      Returns the NFT ID. Skips IDs with zero left.
     */
    function _drawNftPrize() internal returns (uint256) {
        for (uint256 i = 0; i < nftPrizeIds.length; i++) {
            if (nftPrizeAmounts[i] > 0) {
                nftPrizeAmounts[i] -= 1;
                return nftPrizeIds[i];
            }
        }
        revert("No NFT prizes left");
    }

    /**
     * @notice Owner can withdraw leftover tokens or NFTs after all chests are burned.
     */
    function withdrawLeftovers() external onlyOwner {
        require(chestsBurned == maxChests, "Not all chests burned");
        // Withdraw tokens
        uint256 tokenBal = prizeToken.balanceOf(address(this));
        if (tokenBal > 0) {
            prizeToken.transfer(owner(), tokenBal);
        }
        // NFT withdrawal removed as per requirements
    }
}
`;
}

function resetAllFields() {
    // Clear global variables
    nftPrizePool = [];
    tokenPrize = { enabled: false, amount: 0 };
    guaranteedPrize = { enabled: false };
    maxChests = { value: 0 };
    latestSolidityCode = '';

    // Clear localStorage
    localStorage.removeItem('nftPrizePool');
    localStorage.removeItem('tokenPrize');
    localStorage.removeItem('guaranteedPrize');
    localStorage.removeItem('maxChests');

    // Reset NFT Prize Pool UI
    displayNfts();

    // Reset Token Prize UI
    const tokenSwitch = document.getElementById('tokenSwitch');
    const tokenAmountInput = document.getElementById('tokenAmount');
    if (tokenSwitch) {
        tokenSwitch.checked = false;
        tokenSwitch.disabled = false;
    }
    if (tokenAmountInput) {
        tokenAmountInput.value = '';
        tokenAmountInput.disabled = true;
        tokenAmountInput.min = 0;
    }

    // Reset Guaranteed Prize UI
    const guaranteedPrizeSwitch = document.getElementById('guaranteedPrizeSwitch');
    if (guaranteedPrizeSwitch) {
        guaranteedPrizeSwitch.checked = false;
        guaranteedPrizeSwitch.disabled = false;
    }

    // Reset Max Chests UI
    const maxChestsInput = document.getElementById('maxChests');
    if (maxChestsInput) {
        maxChestsInput.value = '';
        maxChestsInput.classList.remove('is-invalid');
    }

    // Reset Minimum Prize Value Display
    const minPrizeValueEl = document.getElementById('minPrizeValue');
    if (minPrizeValueEl) {
        minPrizeValueEl.textContent = '-';
        minPrizeValueEl.classList.remove('text-info', 'text-warning');
    }

    // Reset Contract Script Display
    const contractScriptEl = document.getElementById('contractScript');
    if (contractScriptEl) {
        contractScriptEl.textContent = '';
    }

    // Remove any visual cues
    const tokenInputGroup = tokenAmountInput?.closest('.input-group');
    if (tokenInputGroup) {
        tokenInputGroup.classList.remove('guaranteed-enforced');
    }

    showNotification('All fields have been reset to default.', 'success');
} 