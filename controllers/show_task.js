const { db } = require("../db");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await db.task.findMany();
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error retrieving tasks:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllTasksByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is missing." });
    }

    const categoryWithTasks = await db.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        tasks: true,
      },
    });

    if (!categoryWithTasks) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json({ categoryWithTasks });
  } catch (error) {
    console.error("Error retrieving tasks by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.viewTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await db.task.findUnique({
      where: { id: taskId },
      include: { Category: true },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error("Error retrieving task by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.showOverdueTasks = async (req, res) => {
  try {
    const currentDate = new Date();

    const overdueTasks = await db.task.findMany({
      where: {
        dueDate: { lt: currentDate },
        isCompleted: false,
      },
    });

    res.status(200).json({ overdueTasks });
  } catch (error) {
    console.error("Error retrieving overdue tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
