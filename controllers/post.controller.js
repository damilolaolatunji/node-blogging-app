async function createPost(req, reply) {
  return reply.code(501).send('Not Implemented');
}

async function renderPost(req, reply) {
  return reply.code(501).send('Not Implemented');
}

async function renderPostForm(req, reply) {
  return reply.render('post-form');
}

async function getPosts(req, reply) {
  return reply.render('home');
}

async function updatePost(req, reply) {
  return reply.code(501).send('Not Implemented');
}

async function deletePost(req, reply) {
  return reply.code(501).send('Not Implemented');
}

export {
  createPost,
  getPosts,
  renderPostForm,
  renderPost,
  updatePost,
  deletePost,
};
