const sql = require('better-sqlite3');
const db = sql('meals.db');

// Get the last 2 meals
const lastMeals = db.prepare('SELECT * FROM meals ORDER BY id DESC LIMIT 2').all();
console.log('Meals to delete:', lastMeals);

// Delete them
const deleteStmt = db.prepare('DELETE FROM meals WHERE id = ?');
lastMeals.forEach(meal => {
    deleteStmt.run(meal.id);
    console.log(`Deleted meal: ${meal.title} (ID: ${meal.id})`);
});

console.log('✅ Done! Deleted', lastMeals.length, 'meals');