{console.log('I am in home_posts.js'); // Log a message to ensure the script is running

let createPost = function() {
  let newPostForm = $('#new-post-form');

  newPostForm.submit(function(event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/posts/create',
      data: newPostForm.serialize(), // This serializes the form data into URL-encoded format

      success: function(data) {
        // Data is a JSON object
        console.log(data); // Log the response data

        let newPost = newPostDom(data.data.post);
        $('#posts-list-container>ul').prepend(newPost);

      },
      error: function(error) {
        console.log(error.responseText);
      }
    });
  });
};

let newPostDom = function(post) {
  console.log('Post is created');

  console.log('Post yeah h', post);
  // console.log(post.user);

  // Use template literals (`) instead of mixed HTML and concatenation
  return $(`
    <li id="post-${post._id}">
      <p>${post.content}</p>

      <small id="delete-button">
        <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
      </small>

      <br>
      <small>${post.createdAt}</small>
      <br>
      <small><i>${post.user.name}</i></small>

      <div class="post-comments">
        <form action="/comments/create" method="POST">
          <input type="text" name="content" placeholder="Add comment to post...">
          <input type="hidden" name="postId" value="${post._id}">
          <input type="submit" value="Add Comment">
        </form>
      </div>

      <div class="post-comment-lists">
        <ul id="post-comments-${post._id}"></ul>
      </div>
    </li>
  `);
};

createPost();
}