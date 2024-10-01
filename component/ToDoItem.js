import html from "../core.js";
import { connect } from "../store.js";

function ToDoItem({ todo, index, editIndex }) {
  return html`<li
    class="${todo.completed && "completed"} ${editIndex === index &&
    "editing"} "
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        ${todo.completed && "checked"}
        onchange="dispatch('toggle', ${index})"
      />
      <label ondblclick="dispatch('startEdit' , ${index})">${todo.title}</label>
      <button class="destroy" onclick="dispatch('delete' , ${index})"></button>
    </div>
    <input
      class="edit"
      onblur="dispatch('endEdit' , this.value.trim())"
      onkeyup="event.keyCode===13 && dispatch('endEdit' , this.value.trim())"
      value="${todo.title} "
    />
  </li>`;
}
export default connect()(ToDoItem);
