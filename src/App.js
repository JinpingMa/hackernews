import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY= 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

// const list = [
//   {
//     title: 'React',
//     url: 'https://facebook.github.io/react/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: 'Redux',
//     url: 'https://github.com/reactjs/redux',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   }
//   ];

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // list,
      searchTerm: DEFAULT_QUERY,
      result: null,
    };

    // this.setSearchTopStories = this.setSearchTopStories.bind(this);
    // this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    // this.onSearchChange = this.onSearchChange.bind(this);
    // this.onDismiss = this.onDismiss.bind(this);

  }

  setSearchTopStories = (result) => {
    this.setState({ result });
  }

  fetchSearchTopStories = (searchTerm) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e =>e );
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss = (id) => {
    const isNotId = item => item.objectID !== id;
    const updateHits = this.state.result.hits.filter(isNotId);
    this.setState({
      // result: Object.assign({}, this.state.result, { hits: updateHits})
      result: { ...this.state.result, hits: updateHits }
    });
  };

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm, result } = this.state;
    if(!result) {return null;}
    return (
      <div className="page">
        <div className="interactions">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          >
        Search
        </Search>
        </div>
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => {
  return(
    <form>
      {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
    </form>
  );
};

// class Search extends Component {
//   render() {
//     const { value, onChange, children } =this.props;
//     return (
//       <form>
//         {children} <input
//           type="text"
//           value={value}
//           onChange={onChange}
//           />
//       </form>
//     );
//   }
// }
const largeColumn = {
  width: '40%',
};
const midColumn = {
  width: '30%',
};
const smallColumn = {
  width: '10%',
};
const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
        <span style={midColumn}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
        <span style={smallColumn}>{item.points}</span>
        <span style={smallColumn}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
      </div>
    )}
  </div>;

// class Table extends Component {
//   render() {
//     const { list, pattern, onDismiss } = this.props;
//     return (
//       <div>
//         {list.filter(isSearched(pattern)).map(item =>
//         <div key={item.objectID}>
//           <span>
//             <a href={item.url}>{item.title}</a>
//           </span>
//           <span>{item.author}</span>
//           <span>{item.num_comments}</span>
//           <span>{item.points}</span>
//           <span>
//             <Button onClick={() => onDismiss(item.objectID)}>
//               Dismiss
//             </Button>
//           </span>
//         </div>
//           )}
//       </div>
//     );
//   }
// }

// class Button extends Component {
//   render() {
//     const {
//       onClick,
//       className = '',
//       children,
//     } = this.props;
//     return (
//       <button
//         onClick={onClick}
//         className={className}
//         type="button"
//         >
//         {children}
//       </button>
//     )
//   }
// }

const Button = ({onClick, className, children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>;
export default App;
