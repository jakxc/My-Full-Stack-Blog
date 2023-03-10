import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Articles from './components/Articles';
import Article from './components/Article';
import NotFound from './components/NotFound';
import LogIn from './components/LogIn';
import CreateAccount from './components/CreateAccount';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />   
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:articleId" element={<Article />}/>
            <Route path="/login" element={<LogIn />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
