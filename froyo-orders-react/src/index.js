//document.body.innerHTML = "<h1>Hello, World!</h1>";

// import { createRoot } from "react-dom/client";
// import { MyList } from "./MyList";

// const root = createRoot(document.querySelector("#app"));
// root.render(<MyList />);

import { createRoot } from "react-dom/client";
import { App } from "./App";

const root = createRoot(document.querySelector("#app"));
root.render(<App />);