CREATE DATABASE IF NOT EXISTS creama_coffee;

USE creama_coffee;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INT,
  image_url VARCHAR(500),
  available BOOLEAN DEFAULT TRUE,
  stock_quantity INT DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
  delivery_address TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  delivery_instructions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  menu_item_id INT,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Sample data
INSERT INTO categories (name, description) VALUES
('Coffee', 'Various coffee drinks'),
('Pastries', 'Fresh baked goods'),
('Sandwiches', 'Delicious sandwiches');

INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@creama.com', '$2a$10$example.hash.here', 'admin');

INSERT INTO menu_items (name, description, price, category_id, image_url, stock_quantity) VALUES
('Espresso', 'Strong coffee shot', 3.50, 1, '/images/espresso.jpg'),
('Cappuccino', 'Coffee with steamed milk and foam', 4.50, 1, '/images/cappuccino.jpg'),
('Latte', 'Coffee with steamed milk', 4.00, 1, '/images/latte.jpg'),
('Americano', 'Diluted espresso', 3.00, 1, '/images/americano.jpg'),
('Croissant', 'Buttery pastry', 2.50, 2, '/images/croissant.jpg'),
('Muffin', 'Blueberry muffin', 3.00, 2, '/images/muffin.jpg'),
('Club Sandwich', 'Turkey, bacon, lettuce, tomato', 8.50, 3, '/images/club.jpg'),
('Panini', 'Grilled sandwich with cheese', 7.50, 3, '/images/panini.jpg');