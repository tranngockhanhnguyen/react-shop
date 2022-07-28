import { Redirect, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import NotFound from './components/NotFound'
import CartFeature from './features/Cart'
import ProductFeature from './features/Product'

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Redirect from="/home" to="/" exact />

        <Route path="/" component={ProductFeature} exact />

        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} exact />

        <Route component={NotFound} />
      </Switch>

      <Footer />
    </div>
  )
}

export default App
