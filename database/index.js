const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema =  mongoose.Schema({
  // TODO: your schema here!
  repoId: {type: String, unique: true},
  user: String,
  name: String,
  url: String,
  stargazersCount: Number

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  const repo = new Repo({
    repoId: data.id,
    user: data.owner.login,
    name: data.name,
    url: data.html_url,
    stargazersCount: data.stargazers_count
  });

  repo.save(function(err, result) {
    if (err) {
      console.log('this is an error with the save')
      callback(err);
    } else {
      console.log('this is the success save')
      callback(null, result);
    }
  })
}

module.exports.save = save;