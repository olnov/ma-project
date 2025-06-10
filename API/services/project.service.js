const Project = require("../models/project");

const findOrCreateProjects = async (projects) => {
  const projectIds = [];

  for (const project of projects) {
    let projectDoc;

    if (project._id) {
      // Try to find existing project by ID
      projectDoc = await Project.findById(project._id);
      if (!projectDoc) {
        throw new Error(`Project with ID ${project._id} not found`);
      }
    } else {
      // Create a new project if no ID was provided
      projectDoc = new Project({
        title: project.title,
        description: project.description || "",
        startDate: project.startDate || new Date(),
        endDate: project.endDate || null,
      });
      await projectDoc.save();
    }

    projectIds.push({
      _id: projectDoc._id,
      originalIndex: projects.indexOf(project),
    });
  }

  return projectIds;
};


const searchProjectsByTitle = async (partialTitle) => {
  return Project.find({
    title: { $regex: partialTitle, $options: "i" },
  }).limit(10);
};

module.exports = {
  findOrCreateProjects,
  searchProjectsByTitle,
};
