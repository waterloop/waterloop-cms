import handleRawResponse from '../utils/handle-raw-response';

const getBlogs = (db) => () => db('blogs').then((posts) => {
    return {"success": "Y", posts: posts}
}).catch((error) => {
    return {"success": "N", posts: []}
})

const getLatestBlogs = (db) => async () => {
    try {
        let posts = handleRawResponse(await db.raw(`
        SELECT * FROM blogs ORDER BY to_date(date, 'DD-Mon-YYYY') DESC LIMIT 3
        `)
        );

        return {"success": "Y", posts: posts}

    } catch (err) {
        console.log(err)
        return {"success": "N", posts: []}
    }
  }

  const deleteBlog = (db) => (id) => db('blogs') 
    .where({
        id
    })
    .del()
    .then((response) => {
        return response;
    }).catch((err) => {
        console.error(`Error in deleteBlog: ${err}`);
        throw err;
    });

const editBlog = (db) => (id, blogInfo) => db('blogs')
    .where({
      id
    })
    .update({
      ...blogInfo
    })
    .returning(['id','title','author','summary','date','content','image', 'closed', 'visibility', 'category'])
    .then((response) => {
      return response;
    }).catch((err) => {
      console.error(`Error in editBlog: ${err}`);
      throw err;
    });

const addBlog = (db) => (blogs) => db('blogs')
  .insert({
      ...blogs,
  })
  .returning(['id','title','author','summary','date','content','image', 'closed', 'visibility', 'category'])
  .then((response) => {
    console.log(response);
    return response;
  })
  .catch((err) => {
    console.error(`Error in addBlog: ${err}`);
    throw err;
  });

export default (db) => ({
    getBlogs: getBlogs(db),
    getLatestBlogs: getLatestBlogs(db),
    addBlog: addBlog(db),
    editBlog: editBlog(db),
    deleteBlog: deleteBlog(db)
})