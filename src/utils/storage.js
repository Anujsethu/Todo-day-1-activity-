export const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
export const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

export const getTodos = () => JSON.parse(localStorage.getItem('todos') || '[]');
export const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos));

export const getSession = () => JSON.parse(localStorage.getItem('currentUser') || 'null');
export const saveSession = (user) => localStorage.setItem('currentUser', JSON.stringify(user));
export const clearSession = () => localStorage.removeItem('currentUser');
