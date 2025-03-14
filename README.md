# Budget Tracker Application

A comprehensive web application for tracking personal finances and managing budgets. Built with vanilla JavaScript, HTML5, and CSS3, featuring multi-currency support and dark mode.

## 🌟 Features

### Core Functionality
- **Transaction Management**
  - Add income and expenses
  - Categorize transactions with icons
  - Delete transactions
  - Real-time balance updates
  - Multi-currency support with dynamic base currency selection
  - Transaction history with detailed view

### User Interface
- **Modern Dashboard**
  - Total balance display with gradient cards
  - Income summary with animations
  - Expense summary with category breakdown
  - Dark/Light mode toggle
  - Responsive design for all devices

### Smart Features
- **AI-Powered Finance Assistant**
  - Interactive chatbot for financial advice
  - Budget analysis and recommendations
  - Spending pattern insights
  - Savings goals calculator
  - Investment suggestions
  - Debt management tips
  - Emergency fund planning

### Advanced Features
- **Multi-Currency Support**
  - User-selectable base currency
  - Automatic currency conversion
  - Support for USD, EUR, GBP, INR
  - Real-time currency calculations

### Data Management
- **Local Storage**
  - Secure data persistence
  - Export transactions to CSV
  - Category-wise analysis
  - Transaction search and filtering

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Local storage access

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/budget-tracker.git
   ```

2. Navigate to project directory
   ```bash
   cd budget-tracker
   ```

3. Open index.html in your browser

## 💻 Usage

### Adding Transactions
1. Enter transaction description
2. Input amount
3. Select transaction type (Income/Expense)
4. Choose category with icon
5. Select currency
6. Click "Add Transaction"

### Currency Management
1. Select your preferred base currency
2. All transactions will automatically convert
3. View totals in your chosen currency
4. Change base currency anytime

### Theme Customization
1. Click the theme toggle button
2. Switch between light and dark modes
3. Theme preference is saved automatically

### Using the Finance Assistant
1. Click the chat icon
2. Choose from available options:
   - Budget Analysis
   - Investment Advice
   - Saving Tips
   - Debt Management
   - Emergency Fund Planning
3. Get personalized financial guidance

## 🎨 Customization

### Theme Colors
```css
:root {
    --primary: #4f46e5;
    --success: #22c55e;
    --danger: #ef4444;
    --dark: #1e293b;
    --light: #f1f5f9;
}
```

### Categories
Default categories include:
- Food & Dining
- Shopping
- Housing
- Transportation
- Utilities
- Healthcare
- Entertainment
- Salary
- Investment
- Other

## 📱 Responsive Design

Optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security Features

### Data Protection
- Local storage encryption
- Session management
- Input sanitization
- XSS prevention

### User Privacy
- No external data transmission
- Offline functionality
- Secure data handling

## 🛠 Technical Details

### File Structure
```
budget-tracker/
│
├── index.html          # Main application
├── login.html         # User authentication
├── register.html      # User registration
├── README.md         # Documentation
│
└── assets/
    ├── styles.css    # Styling
    ├── app.js        # Core functionality
    └── icons/        # UI icons
```

### Technologies
- HTML5
- CSS3 with Custom Properties
- JavaScript (ES6+)
- Local Storage API
- Font Awesome Icons

## 🐛 Troubleshooting

### Common Issues
1. **Currency Conversion Issues**
   - Check internet connection
   - Verify exchange rates
   - Reset base currency

2. **Theme Toggle Problems**
   - Clear browser cache
   - Check localStorage permissions
   - Refresh page

3. **Transaction History**
   - Verify local storage space
   - Clear old transactions
   - Export data regularly

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
   ```bash
   git checkout -b feature/NewFeature
   ```
3. Commit changes
   ```bash
   git commit -m 'Add NewFeature'
   ```
4. Push to branch
   ```bash
   git push origin feature/NewFeature
   ```
5. Open Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/budget-tracker

## 🙏 Acknowledgments

- Font Awesome for icons
- Exchange rate providers
- Open source community

---

**Note:** This project is continuously evolving. For production use, consider implementing additional security measures and regular backups.