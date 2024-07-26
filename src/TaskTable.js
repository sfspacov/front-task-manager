import React from 'react';

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  return (
    <table className="table" id="myTable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.completed ? 'Yes' : 'No'}</td>
            <td>
              <button className="btn btn-info btn-sm" onClick={() => onEdit(task.id)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
