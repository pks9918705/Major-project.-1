{console.log('I am in home_posts.js'); // Log a message to ensure the script is running
// this javascript will take the form data and make a ajax request to the server
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
        // console.log(data); // Log the response data

        // this will send the data to the next below function of creating a new post 
        // after the newpost is created it is finally added to the list of posts 
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

  // console.log('Post yeah h', post);
  // console.log(post.user);

  // Use template literals (`) instead of mixed HTML and concatenation
  return $(`
    <li id="post-${post._id}">
      <p>${post.content}</p>
      
      <a style="color: brown;" href="">Like</a>

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

// start working of the file 
createPost();





//delete function
// let distroyPost=function(){
//   let deletePost = $('#delete-button');
   
//   console.log('deletion is working');
  

//   deletePost.click(function(event) {
//     event.preventDefault();

//     $.ajax({
//       type: 'GET',
//       url: $('/posts/destroy/<%= post.id %>').prop(href),
       
//       success: function(response) {

//         console.log(response);
          
         

//       },
//       error: function(error) {
//         console.log(error.responseText);
//       }
//     });

// })}
  

}

