const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const array = blogs.map(item => item.likes)

  console.table(array);

  const aggregator = (sum, item) => {
    return sum + item
  }

  return array.reduce(aggregator, 0) 
}

module.exports = {
  dummy,
  totalLikes
}

