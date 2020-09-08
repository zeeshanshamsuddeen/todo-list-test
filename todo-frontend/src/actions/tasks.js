import axios from 'axios';

export const getTasks = (level = 1, id) => {
  let queryString = `level=${level}`;
  if (id) {
    queryString += `&id=${id}`;
  }
  return axios.get(`/api/v1/tasks?${queryString}`);
}

export const getTask = id => axios.get(`/api/v1/tasks/${id}`);

export const addTask = data => axios.post('/api/v1/tasks', data);

export const completeTask = id => axios.put(`/api/v1/tasks/${id}/complete`);

export const deleteTask = id => axios.delete(`/api/v1/tasks/${id}`);