class Auth {
    constructor() {
        this.baseURL = 'https://api.example.com'; // Replace with your API URL
        this.token = localStorage.getItem('token');
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            this.token = data.token;
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            return data;
        } catch (error) {
            throw error;
        }
    }

    async register(userData) {
        // Check if email already exists
        if (this.users.find(user => user.email === userData.email)) {
            throw new Error('Email already registered');
        }

        // Create new user
        const user = {
            id: Date.now(),
            fullname: userData.fullname,
            email: userData.email,
            password: userData.password // In a real app, this should be hashed
        };

        // Add to users array
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));

        return user;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('session');
        window.location.href = 'login.html';
    }

    isAuthenticated() {
        return !!localStorage.getItem('session');
    }

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}

// Initialize authentication
const auth = new Auth();

// Handle login form
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        await auth.login(email, password);
        showToast('Login successful!', 'success');
        window.location.href = 'index.html';
    } catch (error) {
        showToast('Login failed. Please try again.', 'error');
    }
});

// Handle register form
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (userData.password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        
        await auth.register(userData);
        showToast('Registration successful! Please login.', 'success');
        window.location.href = 'login.html';
    } catch (error) {
        showToast(error.message || 'Registration failed. Please try again.', 'error');
    }
});

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        const input = e.target.previousElementSibling;
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        e.target.classList.toggle('fa-eye');
        e.target.classList.toggle('fa-eye-slash');
    });
});

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Check authentication status
if (!auth.isAuthenticated() && !window.location.href.includes('login.html') && !window.location.href.includes('register.html')) {
    window.location.href = 'login.html';
} 