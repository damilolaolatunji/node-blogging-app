import Post from '../db/models/post.model.js';

async function createPost(req, reply) {
  const { title, content } = req.body;

  const post = await Post.create({ title, content });

  req.log.debug(`created post with id: ${post.id}`);

  reply.redirect(`/post/${post.id}`);
}

async function findPost(req) {
  const { id } = req.params;

  const post = await Post.findByPk(id);

  req.log.debug(`found post with id: ${post.id}`);

  return post;
}

async function renderPost(req, reply) {
  const post = await findPost(req);

  return reply.render('post', { post });
}

async function renderPostForm(req, reply) {
  const { id } = req.params;

  if (!id) {
    return reply.render('post-form');
  }

  const post = await findPost(req);

  return reply.render('post-form', { post });
}

async function getPosts(req, reply) {
  const posts = await Post.findAll();

  req.log.debug(`Found ${posts.length} posts`);

  return reply.render('home', { posts });
}

async function updatePost(req, reply) {
  const { title, content } = req.body;

  const post = await findPost(req);
  post.title = title;
  post.content = content;

  await post.save();

  req.log.debug(`updated post with id: ${post.id}`);

  reply.redirect(`/post/${post.id}`);
}

async function deletePost(req, reply) {
  const post = await findPost(req);

  await post.destroy();

  req.log.debug(`deleted post with id: ${post.id}`);

  reply.redirect('/');
}

export {
  createPost,
  getPosts,
  renderPostForm,
  renderPost,
  updatePost,
  deletePost,
};
