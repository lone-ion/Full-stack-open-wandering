const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const array = blogs.map(item => item.likes)

  console.table(array);

  const accumulator = (acc, item) => {
    return acc + item
  }

  return array.reduce(accumulator, 0) 
}

const favoriteBlog = (blogs) => {
  const accumulator = (acc, item) => {
    return acc.likes > item.likes ? acc : item
  }

  return blogs.reduce(accumulator, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

