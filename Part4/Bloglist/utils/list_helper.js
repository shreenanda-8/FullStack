const dummy = () => {

    return 1
}
const totalLikes = (blog) => {
    const likes = blog.reduce((accumulator, info) => {
        return accumulator + info.likes
    }, 0)
    return likes
}

const favoriteBlog = (data) => {
    //Get the object which has most likes
    const maxCount = data.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    const crop = {
        title: maxCount.title,
        author: maxCount.author,
        likes: maxCount.likes
    }
    return crop
}


module.exports = {
    dummy:dummy,
    totalLikes: totalLikes,
    favoriteBlog: favoriteBlog
}