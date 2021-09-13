/* eslint-disable no-console */
const villains = require('./villains')

villains.forEach((({
  name, movie, slug
}) => console.log(`('${name}', '${movie}', '${slug}'),`)))
