const pool = require('../config/database');

class MenuItem {
  static async findAll() {
    const [rows] = await pool.execute(`
      SELECT m.*, c.name as category_name 
      FROM menu_items m 
      LEFT JOIN categories c ON m.category_id = c.id 
      WHERE m.available = TRUE
    `);
    return rows.map(row => ({
      ...row,
      category: row.category_name
    }));
  }

  static async findById(id) {
    const [rows] = await pool.execute(`
      SELECT m.*, c.name as category_name 
      FROM menu_items m 
      LEFT JOIN categories c ON m.category_id = c.id 
      WHERE m.id = ? AND m.available = TRUE
    `, [id]);
    if (rows.length > 0) {
      return {
        ...rows[0],
        category: rows[0].category_name
      };
    }
    return null;
  }

  static async findByCategory(categoryId) {
    const [rows] = await pool.execute(`
      SELECT m.*, c.name as category_name 
      FROM menu_items m 
      LEFT JOIN categories c ON m.category_id = c.id 
      WHERE m.category_id = ? AND m.available = TRUE
    `, [categoryId]);
    return rows.map(row => ({
      ...row,
      category: row.category_name
    }));
  }
}

module.exports = MenuItem;