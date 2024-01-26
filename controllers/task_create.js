const { db } = require("../db");

exports.createTask = async (req, res) => {

    try {
        const { name, description, categoryName, dueDate } = req.body;
    
        if (!name || !categoryName || !dueDate) {
          return res.status(400).json({ error: 'Required fields are missing.' });
        }
    
        // Check if the category exists
        let category = await db.category.findFirst({
          where: {
            name: categoryName,
          },
        });
    
        // If the category doesn't exist, create a new one
        if (!category) {
          category = await db.category.create({
            data: {
              name: categoryName,
            },
          });
        }
    
        // Create a new task associated with the category
        const task = await db.task.create({
          data: {
            name,
            description,
            categoryId: category.id, // Associate the task with the category
            dueDate:new Date(dueDate),
          },
        });
    
    
        res.status(201).json({ message: 'Task created successfully', task });
      } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

  
};
