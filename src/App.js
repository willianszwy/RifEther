
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NovaRifa from './pages/NovaRifa';
import Rifa from './pages/Rifa';
import Home from './pages/Home';





function App() {
  return (    
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='create' element={<NovaRifa />} />
              <Route path='rifa/:id' element={<Rifa />} />
              <Route path='*' element={<Home />} />
            </Route>
          </Routes>      
  );
}

export default App;
