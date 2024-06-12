const _ = require('lodash');


const dummy = (blogs) => {
    return 1    
  }


  const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
      }
    
      return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
  }

  const favoriteBlog = (blogs) => {
    faveBlog = blogs.find((blog) => blog.likes == Math.max(...blogs.map(b => b.likes)))
    if(faveBlog)
    {
        return {
            title: faveBlog.title, 
            author: faveBlog.author, 
            likes: faveBlog.likes
        }
    }
    else
    {
        return {}
    }

  }

  const mostBlogs = (blogs) => {
    if(blogs.length === 0)
    {
        return {}
    }
    const authorCounts = _.countBy(blogs, 'author');
    const authorArray = _.map(authorCounts, (blogs, author) => ({ author, blogs }));
    const topAuthor = _.maxBy(authorArray, 'blogs');
    return topAuthor;
  }

  const mostLikes = (blogs) => {
    if(blogs.length === 0)
    {
        return {}
    }

    const groupedByAuthor = _.groupBy(blogs, 'author');
    const likesByAuthor = _.map(groupedByAuthor, (authorBlogs, author) => ({
        author: author,
        likes: _.sumBy(authorBlogs, 'likes')
      }));
    const topAuthor = _.maxBy(likesByAuthor, 'likes');
    return topAuthor;
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }