import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import CustomerForm from './components/CustomerForm'
import Footer from './components/Footer'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'
import { Toaster } from 'sonner'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('home') // home, checkout, order-confirmation
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [orderData, setOrderData] = useState(null)

  const handleCartOpen = () => {
    setIsCartOpen(true)
  }

  const handleCartClose = () => {
    setIsCartOpen(false)
  }

  const handleCheckout = () => {
    setCurrentView('checkout')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
  }

  const handleOrderComplete = (data) => {
    setOrderData(data)
    setCurrentView('order-confirmation')
  }

  const handleNewOrder = () => {
    setOrderData(null)
    setCurrentView('home')
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Toaster position="top-right" />

        <Routes>
          {/* Rota principal - Landing Page */}
          <Route
            path="/"
            element={
              <>
                {currentView === 'home' && (
                  <>
                    <Header onCartClick={handleCartOpen} />
                    <main>
                      <Hero />
                      <About />
                      <Products />
                      <CustomerForm />
                    </main>
                    <Footer />
                    <Cart
                      isOpen={isCartOpen}
                      onClose={handleCartClose}
                      onCheckout={handleCheckout}
                    />
                  </>
                )}

                {currentView === 'checkout' && (
                  <Checkout
                    onBack={handleBackToHome}
                    onOrderComplete={handleOrderComplete}
                  />
                )}

                {currentView === 'order-confirmation' && (
                  <OrderConfirmation
                    orderData={orderData}
                    onNewOrder={handleNewOrder}
                  />
                )}
              </>
            }
          />

          {/* Rotas administrativas */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
