const blog = require('../../lib/blog')

module.exports = async (req, res, next) => {
  let post
  try {
    post = await blog.getPost(req.params.slug)
  } catch (err) {
    return next()
  }

  // redirect /blog/2016/09/27/foo to /blog/foo
  if (req.path !== post.href) {
    return res.redirect(post.href)
  }

  Object.assign(req.context, {
    post: post,
    layout: 'post',
    page: { title: `${post.title} | Electron Blog` }
  })
  res.render('blog/show', req.context)
}
