# Budget Tracker Application

A simple yet powerful web application for tracking personal finances and managing budgets. Built with vanilla JavaScript, HTML5, and CSS3.

## 🌟 Features

### Core Functionality
- **Transaction Management**
  - Add income and expenses
  - Categorize transactions
  - Delete transactions
  - Real-time balance updates

### User Interface
- **Dashboard Overview**
  - Total balance display
  - Income summary
  - Expense summary
  - Transaction history

### Smart Assistant
- **AI-Powered Chatbot**
  - Budget analysis
  - Spending recommendations
  - Savings tips
  - Financial planning advice

### Data Management
- **Local Storage**
  - Persistent data storage
  - No backend required
  - Secure local data handling

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/budget_tracker
   ```

2. Navigate to project directory
   ```bash
   cd budget-tracker
   ```

3. Open index.html in your browser
   ```bash
   # For macOS
   open index.html

   # For Linux
   xdg-open index.html

   # For Windows
   start index.html
   ```

## 💻 Usage

### Adding Transactions
1. Enter transaction description
2. Input amount
3. Select transaction type (Income/Expense)
4. Choose category
5. Click "Add Transaction"

### Managing Transactions
- View all transactions in the list
- Delete transactions using the delete button
- Filter transactions by category
- Sort by date or amount

### Using the Finance Assistant
1. Click the chat icon in bottom right
2. Choose from available options:
   - Budget Analysis
   - Planning Advice
   - Saving Tips
3. Get personalized financial recommendations

## 🎨 Customization

### Colors
The application uses CSS variables for easy customization:
```css
:root {
    --primary-color: #2563eb;
    --success: #16a34a;
    --danger: #dc2626;
    --text-dark: #1e293b;
    --bg-light: #f1f5f9;
}
```

### Categories
Modify categories in the HTML select options:
```html
<select id="category">
    <option value="housing">Housing</option>
    <option value="food">Food</option>
    <!-- Add more categories -->
</select>
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security

### Data Privacy
- All data is stored locally
- No external servers involved
- Data persists across sessions

### Best Practices
- Input validation
- XSS prevention
- Secure data handling

## 🛠 Technical Details

### File Structure
```
budget-tracker/
│
├── index.html          # Main application file
├── README.md          # Documentation
├── .gitignore        # Git ignore file
│
└── backup/           # Backup directory
    ├── login.html
    ├── register.html
    ├── styles.css
    └── app.js
```

### Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage API
- Font Awesome Icons

## 🐛 Troubleshooting

### Common Issues
1. **Transactions not saving**
   - Check if localStorage is enabled
   - Clear browser cache

2. **Display issues**
   - Ensure latest browser version
   - Try hard refresh (Ctrl + F5)

3. **Performance**
   - Limit transaction history
   - Clear old data regularly

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- Font Awesome for icons
- Modern browser technologies
- Open source community

---

**Note:** This project is for educational purposes and personal use. For production deployment, consider adding additional security measures and data backup solutions.
