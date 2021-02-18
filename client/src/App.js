import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutApp from "./component/About/AboutApp";
import TodoApp from "./component/Body/TodoApp";
import Header from "./component/Header/Header";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={TodoApp} />
      <Route path="/about" component={AboutApp} />
    </Router>
  );
}

export default App;
