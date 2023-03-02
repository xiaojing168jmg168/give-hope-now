import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Stories from './pages/stories';
import Contact from './components/contact';
import AppNavbar from './components/nav';
import Footer from './components/Footer';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import './App.css';
import './index.css';
import Signup from './components/signup';
import Login from './components/login';
import AddStory from './components/addStory';
import 'bootstrap/dist/css/bootstrap.css';

const httpLink = createHttpLink({
  rui: '/graphql'
})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient ({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
<ApolloProvider client={client}>

    <Router>
      <div className="flex-column justify-center align-center min-100-vh">
        <AppNavbar />
        <Routes>
          <Route path='/'
          element={<Home/>}
          />
          <Route path='/about'
          element={<About/>}
          />
          <Route path='/stories'
          element={<Stories/>}
          />
          <Route path='/contact'
          element={<Contact/>}
          />
          <Route path='/addStory'
          element={<AddStory/>}
          />
          <Route path='/signup'
          element={<Signup/>}
          />
          <Route path='/login'
          element={<Login/>}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  </ApolloProvider>


  
    
  );
}

export default App;