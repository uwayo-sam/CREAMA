const pool = require('../config/database');

class Order {
  static async create(orderData) {
    const { user_id, total, items } = orderData;
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const [orderResult] = await connection.execute(
        'INSERT INTO orders (user_id, total) VALUES (?, ?)',
        [user_id, total]
      );
      const orderId = orderResult.insertId;
      for (const item of items) {
        await connection.execute(
          'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.menu_item_id, item.quantity, item.price]
        );
      }
      await connection.commit();
      return orderId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
  }
}

module.exports = Order;