import App from "./app";
import IndexRoute from "./routes/index.routes";
const app = new App([new IndexRoute()]);

console.log(__dirname);

app.listen();
