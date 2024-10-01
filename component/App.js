import html from "../core.js";
import { connect } from "../store.js";
import Header from "./Header.js";
import ToDoList from "./ToDoList.js";
import Item from "./Item.js";

function App({ todos }) {
  return html`<section class="todoapp">
    ${Header()} ${todos.length > 0 && ToDoList()} ${todos.length > 0 && Item()}
  </section>`;
}
export default connect()(App);
