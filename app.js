class BudgetTracker {
    constructor() {
        this.checkAuth();
        this.initializeEventListeners();
        this.loadData();
    }

    checkAuth() {
        const session = JSON.parse(localStorage.getItem('session'));
        if (!session) {
            window.location.href = 'login.html';
            return;
        }
        document.getElementById('user-name').textContent = session.user.fullname;
    }

    initializeEventListeners() {
        document.getElementById('transaction-form').addEventListener('submit', (e) => this.handleFormSubmit(e));
        document.getElementById('date').valueAsDate = new Date();
    }

    loadData() {
        this.updateBalances();
        this.displayTransactions();
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const transaction = {
            id: Date.now(),
            description: document.getElementById('description').value,
            amount: parseFloat(document.getElementById('amount').value),
            category: document.getElementById('category').value,
            type: document.getElementById('type').value,
            date: document.getElementById('date').value
        };

        this.addTransaction(transaction);
        e.target.reset();
        document.getElementById('date').valueAsDate = new Date();
    }

    addTransaction(transaction) {
        const transactions = this.getTransactions();
        transactions.unshift(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        this.loadData();
    }

    deleteTransaction(id) {
        const transactions = this.getTransactions().filter(t => t.id !== id);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        this.loadData();
    }

    getTransactions() {
        return JSON.parse(localStorage.getItem('transactions')) || [];
    }

    updateBalances() {
        const transactions = this.getTransactions();
        
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = income - expenses;

        document.getElementById('total-balance').textContent = this.formatCurrency(balance);
        document.getElementById('total-income').textContent = this.formatCurrency(income);
        document.getElementById('total-expenses').textContent = this.formatCurrency(expenses);

        this.updateChart(transactions);
    }

    updateChart(transactions) {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        const categoryData = {};

        transactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
            });

        if (window.myChart) {
            window.myChart.destroy();
        }

        window.myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categoryData),
                datasets: [{
                    data: Object.values(categoryData),
                    backgroundColor: [
                        '#48bb78', '#f56565', '#4299e1', '#ecc94b',
                        '#9f7aea', '#ed64a6', '#a0aec0'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    displayTransactions() {
        const transactions = this.getTransactions();
        const transactionList = document.getElementById('transaction-list');
        transactionList.innerHTML = '';

        transactions.forEach(transaction => {
            const div = document.createElement('div');
            div.className = 'transaction-item';
            div.innerHTML = `
                <div class="transaction-icon ${transaction.type}">
                    <i class="fas ${this.getCategoryIcon(transaction.category)}"></i>
                </div>
                <div>
                    <strong>${transaction.description}</strong>
                    <div>${transaction.category} • ${new Date(transaction.date).toLocaleDateString()}</div>
                </div>
                <div class="amount-${transaction.type}">
                    ${transaction.type === 'expense' ? '-' : '+'}${this.formatCurrency(transaction.amount)}
                </div>
                <button class="btn" onclick="budgetTracker.deleteTransaction(${transaction.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            transactionList.appendChild(div);
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    getCategoryIcon(category) {
        const icons = {
            salary: 'fa-money-bill-wave',
            food: 'fa-utensils',
            transport: 'fa-car',
            utilities: 'fa-bolt',
            entertainment: 'fa-film',
            shopping: 'fa-shopping-cart',
            other: 'fa-ellipsis-h'
        };
        return icons[category] || icons.other;
    }

    logout() {
        localStorage.removeItem('session');
        window.location.href = 'login.html';
    }
}

// Initialize the budget tracker
const budgetTracker = new BudgetTracker();

// Make logout function global
function logout() {
    budgetTracker.logout();
} 