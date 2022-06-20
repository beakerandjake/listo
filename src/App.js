import axios from 'axios';
import React from 'react';
import './App.css';
import ItemInput from './ItemInput';
import ItemList from './ItemList';
import Error from './Error';
import Loading from './Loading';

const API_URL = 'http://localhost:3001/api/items';

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      initialized: false,
      disabled: false,
      error: false
    };
  }

  componentDidMount() {
    axios
      .get(API_URL)
      .then(
        response => this.setState({ items: response.data }),
        reject => {
          console.error(reject);
          this.setState({ error: 'Failed to load items! Please try again.' });
        }
      )
      .finally(() => this.setState({ initialized: true }));
  }

  onAddItem = name => {
    if (this.state.disabled) {
      return;
    }

    const existing = this.state.items.find(x => x.name.toLowerCase().trim() === name.toLowerCase().trim());

    existing
      ? this.onItemQuantityChange(existing.id, existing.quantity + 1)
      : this.doAddItem(name);
  }

  doAddItem(name) {
    this.setState({ disabled: true });

    axios
      .post(API_URL, { name: name })
      .then(
        resolve => this.setState(state => ({ items: [...state.items, resolve.data] })),
        reject => {
          console.error(reject);
          this.setState({ error: 'Failed to add item! Please try again.' });
        }
      )
      .finally(() => this.setState({ disabled: false }));
  }

  onDeleteItem = id => {
    if (this.state.disabled) {
      return;
    }

    this.setState({ disabled: true });

    axios
      .delete(`${API_URL}/${id}`)
      .then(
        resolve => this.setState(state => ({ items: state.items.filter(x => x.id !== id) })),
        reject => {
          console.error(reject);
          this.setState({ error: 'Failed to delete item! Please try again.' });
        }
      )
      .finally(() => this.setState({ disabled: false }));
  }

  onItemQuantityChange = (id, quantity) => {
    if (this.state.disabled) {
      return;
    }

    // check for quantity < 1 and delete. 
    quantity < 1
      ? this.onDeleteItem(id)
      : this.doChangeQuantity(id, quantity);
  }

  doChangeQuantity = (id, quantity) => {
    this.setState({ disabled: true });

    axios
      .patch(`${API_URL}/${id}`, { quantity: quantity })
      .then(
        resolve => this.setState(state => ({ items: state.items.map(item => item.id === id ? { ...item, quantity: quantity } : item) })),
        reject => {
          console.error(reject);
          this.setState({ error: 'Failed to edit item quantity! Please try again.' });
        }
      )
      .finally(() => this.setState({ disabled: false }));
  }

  render() {
    if (this.state.error) {
      return <Error details={this.state.error} />
    }

    if (!this.state.initialized) {
      return <Loading />;
    }

    return (
      <div className="max-w-3xl mx-auto px-2">
        <ItemInput onAddItem={this.onAddItem} disabled={this.state.disabled} />
        <ItemList items={this.state.items} onDeleteItem={this.onDeleteItem} onItemQuantityChange={this.onItemQuantityChange} disabled={this.state.disabled} />
      </div>
    );
  }
}



function App() {
  return (
    <div className="App">
      <h1 className="font-medium leading-light text-5xl mt-5 select-none">
        listo
        <span class="fa-stack text-[.35em] align-middle">
          <i class="fa-solid fa-square fa-stack-2x text-green-700"></i>
          <i class="fa-solid fa-check fa-stack-1x fa-inverse"></i>
        </span>
      </h1>
      <Parent />
    </div>
  );
}

export default App;
