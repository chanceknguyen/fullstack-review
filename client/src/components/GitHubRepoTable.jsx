import React from 'react';

const GitHubRepoTable = (props) => (
  <div>
    <h1 id='repos'>GitHub Repos</h1>
    <table>
      <tbody>
        <tr>
          <td>Repo Name</td>
          <td>username</td>
          <td>URL</td>
          <td>Stargazers Count</td>
        </tr>
        {props.repos.map((repo) => {
          return (
            <tr key={repo._id}>
              <td>{repo.name}</td>
              <td>{repo.user}</td>
              <td><a href={repo.url}>url</a></td>
              <td>{repo.stargazersCount}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default GitHubRepoTable;