const { db } = require("../db");

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required." });
    }

    const task = await db.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        Category: true,
      },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    await db.task.delete({
      where: {
        id: taskId || task.id,
      },
    });

    const remainingTasks = await db.task.count({
      where: {
        categoryId: task.categoryId,
      },
    });

    if (remainingTasks === 0) {
      await db.category.delete({
        where: {
          id: task.categoryId,
        },
      });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
