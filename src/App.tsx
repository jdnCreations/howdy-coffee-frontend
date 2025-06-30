import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetail from './components/ProductDetail';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className='bg-amber-950 min-h-screen min-w-screen p-8 lg:px-32'>
        <Header />
        <Routes>
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route
            path='/'
            element={
              <div>
                <HomePage />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
