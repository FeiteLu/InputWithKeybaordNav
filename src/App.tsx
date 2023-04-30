import './App.css';
import InputWithNavigation from './components/InputWithNavigation';
import movies from './data/MovieData';

function App() {
  return (
    <div className="App">
      <InputWithNavigation type='Movie' options={movies} />
    </div>
  );
}

export default App;
