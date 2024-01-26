const { db } = require("../db");

exports.markTaskCompleted = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await db.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.isCompleted) {
      return res.status(400).json({ error: "Task is already completed" });
    }

    const updatedTask = await db.task.update({
      where: { id: taskId, isCompleted: false },
      data: { isCompleted: true },
    });

    res.status(200).json({ message: "Task marked as completed", updatedTask });
  } catch (error) {
    console.error("Error marking task as completed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
