import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import GitHubRepoTable from './components/GitHubRepoTable.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  queryDB () {
   $.get('/repos', (result) => {
    this.setState({
      repos: result
    })
   })
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.post('/repos', {username: term}, () => {
      console.log('Successfully posted user repos')
      this.queryDB();
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <GitHubRepoTable repos={this.state.repos}/>
    </div>)
  }

  componentDidMount() {
    this.queryDB();
  }

}

ReactDOM.render(<App />, document.getElementById('app'));