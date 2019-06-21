import React, { Component } from 'react';
import Header from './components/Header';
import CoffeeForm from './CoffeeForm';


class CoffeeApp extends Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
        <div>
          < Header />
        </div>
        <div>
          <CoffeeForm />
        </div>
      </div>  
    );
  }
}

export default CoffeeApp;