// Xử lý dữ liệu được render từ đầu vào

export default function html([first, ...strings], ...values) {
  return values
    .reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
    .filter((x) => (x && x !== true) || x === 0)
    .join("");
}

export function createStore(reducer) {
  let state = reducer();
  let roots = new Map();

  function render() {
    for (const [root, component] of roots) {
      const output = component();
      root.innerHTML = output;
    }
  }

  return {
    // Hàm đưa dữ liệu ra màn hình thông qua class || id
    // Tham số 1 : function cần truyền
    // Tham số 2 : class || id cần parse
    attached(component, root) {
      roots.set(root, component);
      render();
    },

    // Hàm để connect dữ liệu từ storage
    // THam số  : state (trạng thái hiện tại )
    connect(selector = (state) => state) {
      return (component) =>
        (props, ...agrs) =>
          component(Object.assign({}, props, selector(state), ...agrs));
    },

    // Hàm truyền đi action và data muốn hiển thị
    // THam số 1 : action.type ;
    // Tham số 2 : data ;
    dispatch(action, ...agrs) {
      state = reducer(state, action, agrs);
      render();
    },
  };
}
