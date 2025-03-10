document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    const totalBalance = document.getElementById('total-balance');
    const totalIncome = document.getElementById('total-income');
    const totalExpenses = document.getElementById('total-expenses');
    const categoryChart = document.getElementById('categoryChart').getContext('2d');
    const categorySummary = document.getElementById('category-summary');

    // Set default date to today
    document.getElementById('date').valueAsDate = new Date();

    // Category icons and colors
    const categoryConfig = {
        salary: { icon: 'fa-money-bill-wave', color: '#16a34a' },
        food: { icon: 'fa-utensils', color: '#dc2626' },
        transport: { icon: 'fa-car', color: '#2563eb' },
        utilities: { icon: 'fa-bolt', color: '#eab308' },
        entertainment: { icon: 'fa-film', color: '#9333ea' },
        shopping: { icon: 'fa-shopping-cart', color: '#ec4899' },
        other: { icon: 'fa-ellipsis-h', color: '#64748b' }
    };

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let chart = null;

    function updateBalances() {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((total, t) => total + t.amount, 0);

        const expenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((total, t) => total + t.amount, 0);

        const balance = income - expenses;

        totalIncome.textContent = formatAmount(income);
        totalExpenses.textContent = formatAmount(expenses);
        totalBalance.textContent = formatAmount(balance);

        updateCategoryChart();
        updateCategorySummary();
    }

    function formatAmount(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function addTransaction(e) {
        e.preventDefault();

        const transaction = {
            id: Date.now(),
            description: document.getElementById('description').value,
            amount: parseFloat(document.getElementById('amount').value),
            type: document.getElementById('type').value,
            category: document.getElementById('category').value,
            date: document.getElementById('date').value
        };

        transactions.unshift(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        displayTransaction(transaction);
        updateBalances();
        transactionForm.reset();
        document.getElementById('date').valueAsDate = new Date();
    }

    function displayTransaction(transaction) {
        const div = document.createElement('div');
        div.className = 'transaction-item';
        
        const categoryConfig = getCategoryConfig(transaction.category);
        
        div.innerHTML = `
            <div class="transaction-icon ${transaction.type}">
                <i class="fas ${categoryConfig.icon}"></i>
            </div>
            <div class="transaction-details">
                <h4>${transaction.description}</h4>
                <p>${transaction.category} • ${formatDate(transaction.date)}</p>
            </div>
            <div class="transaction-amount amount-${transaction.type}">
                ${transaction.type === 'expense' ? '-' : '+'}${formatAmount(transaction.amount)}
            </div>
            <button class="btn btn-danger delete-btn" data-id="${transaction.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;

        transactionList.insertBefore(div, transactionList.firstChild);
    }

    function getCategoryConfig(category) {
        return categoryConfig[category] || categoryConfig.other;
    }

    function updateCategoryChart() {
        const categoryData = {};
        
        transactions.forEach(transaction => {
            if (transaction.type === 'expense') {
                categoryData[transaction.category] = (categoryData[transaction.category] || 0) + transaction.amount;
            }
        });

        const labels = Object.keys(categoryData);
        const data = Object.values(categoryData);
        const colors = labels.map(category => getCategoryConfig(category).color);

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(categoryChart, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }

    function updateCategorySummary() {
        const summary = {};
        
        transactions.forEach(transaction => {
            if (transaction.type === 'expense') {
                summary[transaction.category] = (summary[transaction.category] || 0) + transaction.amount;
            }
        });

        categorySummary.innerHTML = Object.entries(summary)
            .map(([category, amount]) => {
                const config = getCategoryConfig(category);
                return `
                    <div class="category-item">
                        <div class="category-icon" style="background: ${config.color}">
                            <i class="fas ${config.icon}"></i>
                        </div>
                        <div>
                            <h4>${category}</h4>
                            <p>${formatAmount(amount)}</p>
                        </div>
                    </div>
                `;
            })
            .join('');
    }

    function deleteTransaction(id) {
        transactions = transactions.filter(t => t.id !== id);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        updateBalances();
        renderTransactions();
    }

    function renderTransactions() {
        transactionList.innerHTML = '';
        transactions.forEach(displayTransaction);
    }

    // Event Listeners
    transactionForm.addEventListener('submit', addTransaction);

    transactionList.addEventListener('click', (e) => {
        if (e.target.closest('.delete-btn')) {
            const id = parseInt(e.target.closest('.delete-btn').dataset.id);
            deleteTransaction(id);
        }
    });

    // Initial render
    renderTransactions();
    updateBalances();
}); 