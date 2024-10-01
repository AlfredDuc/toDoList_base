import storage from "./util/storage.js";

const init = {
  todos: storage.get(),
  filters: {
    all: () => true,
    active: (todo) => !todo.completed,
    completed: (todo) => todo.completed,
  },
  editIndex: null,
};

const actions = {
  add({ todos }, title) {
    if (title) {
      todos.push({ title, completed: false });
      storage.set(todos);
    }
  },
  toggle({ todos }, index) {
    const todo = todos[index];
    todo.completed = !todo.completed;
    storage.set(todos);
  },
  toggleAll({ todos }, completed) {
    todos.forEach((todo) => (todo.completed = completed));
    storage.set(todos);
  },
  delete({ todos }, index) {
    todos.splice(index, 1);
    storage.set(todos);
  },
  switchFilter(state, filter) {
    state.filter = filter;
  },
  clearCompleted(state) {
    state.todos = state.todos.filter(state.filters.active);
    storage.set(state.todos);
  },
  startEdit(state, index) {
    state.editIndex = index;
  },
  endEdit(state, title) {
    if (state.editIndex !== null) {
      state.todos[state.editIndex].title = title;
      state.editIndex = null;
      storage.set(state.todos);
    }
  },
};

export default function reducer(state = init, action, agrs) {
  actions[action] && actions[action](state, ...agrs);
  return state;
}
