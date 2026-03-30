# Test Documentation - Full Testing Journey

This document provides comprehensive testing steps for the Creama Coffee Shop full-stack application.

## Prerequisites

1. **Database Setup:**
   - MySQL server running
   - Database `creama_coffee` created
   - Run `backend/database.sql` to create tables and insert sample data
   - Update `backend/.env` with correct MySQL credentials

2. **Servers Running:**
   - Backend: `npm run dev` in backend folder (runs on port 5000)
   - Frontend: `npm run dev` in frontend folder (runs on port 3000)

3. **Tools Needed:**
   - Web browser
   - Postman or similar API testing tool (optional)
   - MySQL client for database verification

## Test Journey Steps

### 1. Backend API Testing

#### 1.1 Health Check
- **URL:** `GET http://localhost:5000/`
- **Expected Response:** "Creama Coffee Shop Backend"
- **Status:** 200 OK

#### 1.2 Menu API Test
- **URL:** `GET http://localhost:5000/api/menu`
- **Expected Response:** Array of menu items with categories
- **Verify:** Items include name, price, description, category_name
- **Sample Response Check:**
  ```json
  [
    {
      "id": 1,
      "name": "Espresso",
      "price": 3.50,
      "category": "Coffee",
      "description": "Strong coffee shot"
    }
  ]
  ```

#### 1.3 User Registration Test
- **URL:** `POST http://localhost:5000/api/auth/register`
- **Body:**
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response:** Success message with userId
- **Status:** 201 Created

#### 1.4 User Login Test
- **URL:** `POST http://localhost:5000/api/auth/login`
- **Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response:** JWT token and user data
- **Save Token:** Copy the token for authenticated requests

#### 1.5 Order Placement Test (Requires Authentication)
- **URL:** `POST http://localhost:5000/api/orders`
- **Headers:** `Authorization: Bearer [YOUR_TOKEN]`
- **Body:**
  ```json
  {
    "items": [
      {
        "menu_item_id": 1,
        "quantity": 2,
        "price": 3.50
      }
    ],
    "total": 8.23
  }
  ```
- **Expected Response:** Success message with orderId
- **Status:** 201 Created

#### 1.6 Order History Test (Requires Authentication)
- **URL:** `GET http://localhost:5000/api/orders`
- **Headers:** `Authorization: Bearer [YOUR_TOKEN]`
- **Expected Response:** Array of user's orders

### 2. Frontend User Journey Testing

#### 2.1 Application Access
- **URL:** `http://localhost:3000`
- **Expected:** Home page loads with navigation
- **Verify:** Navbar, footer, and main content visible

#### 2.2 Menu Browsing
- **Navigate:** Click "Menu" in navigation
- **Expected:** Menu page loads with categories and items
- **Verify:**
  - Category filters (All, Coffee, Pastries, Sandwiches)
  - Menu items display with images, names, prices
  - Items fetched from backend API

#### 2.3 Cart Functionality
- **Add Item:** Click "Add to Cart" on any menu item
- **Expected:** Cart drawer opens, item appears in cart
- **Verify:** Quantity, price, and total calculations

#### 2.4 Cart Management
- **Update Quantity:** Use + and - buttons in cart
- **Expected:** Quantity and total price update correctly
- **Remove Item:** Click "Remove" link
- **Expected:** Item removed from cart

#### 2.5 User Registration (Frontend)
- **Navigate:** Look for login/register links (may need to add UI)
- **Fill Form:**
  - Name: Test User
  - Email: test2@example.com
  - Password: password123
- **Submit:** Click register button
- **Expected:** Success message or redirect

#### 2.6 User Login (Frontend)
- **Fill Form:**
  - Email: test@example.com
  - Password: password123
- **Submit:** Click login button
- **Expected:** User logged in, token stored in localStorage

#### 2.7 Checkout Process
- **Prerequisites:** User logged in, items in cart
- **Click:** "Proceed to Checkout" button
- **Expected:**
  - Order submitted to backend
  - Success message displayed
  - Cart cleared
  - Order appears in order history

### 3. Database Verification

#### 3.1 Check Users Table
```sql
SELECT * FROM users;
```
- **Expected:** Registered users visible with hashed passwords

#### 3.2 Check Menu Items Table
```sql
SELECT * FROM menu_items WHERE available = TRUE;
```
- **Expected:** Sample menu items from database.sql

#### 3.3 Check Orders Table
```sql
SELECT * FROM orders;
```
- **Expected:** Orders created during testing

#### 3.4 Check Order Items Table
```sql
SELECT * FROM order_items;
```
- **Expected:** Individual items from orders

### 4. Integration Testing

#### 4.1 End-to-End Order Flow
1. Register/Login user
2. Browse menu and add items to cart
3. Update cart quantities
4. Proceed to checkout
5. Verify order in database
6. Check order history in frontend

#### 4.2 Authentication Flow
1. Register new user
2. Login with credentials
3. Access protected routes (orders)
4. Logout and verify token cleared
5. Try accessing protected routes without token

#### 4.3 Error Handling
- Try registering with existing email
- Login with wrong credentials
- Access orders without authentication
- Submit malformed order data

### 5. Performance Testing

#### 5.1 API Response Times
- Menu fetch: < 500ms
- Order placement: < 1000ms
- Authentication: < 300ms

#### 5.2 Concurrent Users
- Test multiple browser tabs
- Verify cart isolation between sessions

### 6. Security Testing

#### 6.1 JWT Token Validation
- Try accessing protected routes with invalid token
- Try accessing protected routes with expired token
- Verify token payload contains correct user data

#### 6.2 Input Validation
- Test SQL injection attempts in registration
- Test XSS attempts in user input
- Verify password hashing (never stored in plain text)

### 7. Cross-Browser Testing

#### 7.1 Browser Compatibility
- Test in Chrome, Firefox, Safari, Edge
- Verify responsive design on mobile/tablet
- Test cart functionality across browsers

## Test Data

### Sample Users
- Email: test@example.com, Password: password123
- Email: test2@example.com, Password: password123

### Sample Menu Items (from database.sql)
- Espresso: $3.50
- Cappuccino: $4.50
- Croissant: $2.50
- Club Sandwich: $8.50

## Common Issues & Troubleshooting

### Backend Not Starting
- Check MySQL connection
- Verify .env file exists
- Check for port conflicts (5000)

### Frontend Not Loading Menu
- Verify backend is running
- Check CORS settings
- Check network tab for API errors

### Authentication Issues
- Clear localStorage
- Verify JWT_SECRET in .env
- Check token expiration

### Database Connection Errors
- Ensure MySQL is running
- Verify credentials in .env
- Check database name matches

## Test Completion Checklist

- [ ] Backend API endpoints tested
- [ ] Frontend user journeys completed
- [ ] Database records verified
- [ ] Authentication flow tested
- [ ] Error scenarios handled
- [ ] Performance acceptable
- [ ] Security measures verified
- [ ] Cross-browser compatibility confirmed

## Notes

- Created on March 30, 2026
- Part of the Creama Coffee Shop project
- Located in the `ref` folder
- Update this document as new features are added