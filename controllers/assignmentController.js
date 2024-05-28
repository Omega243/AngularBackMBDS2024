const assignmentService = require('../service/assignmentService');

exports.updateAssignmentNote = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const { note } = req.body;

    const updatedAssignment = await assignmentService.updateAssignmentNote(assignmentId, note);

    res.json(updatedAssignment);
  } catch (error) {
    if (error.message === 'Assignment not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error updating assignment note', error });
    }
  }
};
