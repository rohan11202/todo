const { db } = require("../db");

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { name, description, categoryId, dueDate } = req.body;

    const existingTask = await db.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: {
        name: name || existingTask.name,
        description: description || existingTask.description,
        categoryId: categoryId || existingTask.categoryId,
        dueDate: dueDate || existingTask.dueDate,
      },
    });

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
