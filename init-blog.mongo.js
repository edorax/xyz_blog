// vim:ts=2:et
db = new Mongo().getDB('simpleblog');
db.posts.remove({});
db.posts.insert([
  {
    author: 'Morpheus',
    created: new Date('2017-11-27'),
    title: 'Looking for ...',
    content: 'Neo, you may have spent the last three years looking for me, but I have spent my entire life looking for you.',
  },
  {
    author: 'Tank',
    created: new Date('2017-11-28'),
    title: 'The last human city, the only place we have left',
    content: 'Zion is the last, only known human city on the planet Earth. The city is the launching point for the resistance against the Machines that threaten their freedom.',
  },
]);

db.posts.createIndex({author: 1});
db.posts.createIndex({created: 1});
db.posts.createIndex({title: 1});

