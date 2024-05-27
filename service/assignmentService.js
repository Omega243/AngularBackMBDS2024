const Assignment = require('../model/assignment');

class AssignmentService {
  async updateAssignmentNote(assignmentId, note) {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { note },
      { new: true }
    );

    if (!updatedAssignment) {
      throw new Error('Assignment not found');
    }

    return updatedAssignment;
  }
}

module.exports = new AssignmentService();
