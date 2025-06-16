import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Componentes
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import CustomerForm from './components/CustomerForm';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Rota principal - Landing Page */}
          <Route path="/" element={
            <>
              <Header />
              <main>
                <Hero />
                <About />
                <Products />
                <CustomerForm />
              </main>
              <Footer />
            </>
          } />
          
          {/* Rotas administrativas */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

