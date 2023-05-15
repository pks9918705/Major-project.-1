{
// method to submit the form data to a new post using AJAX
console.log('i am working');

     
    let createPost=function(){

        let newPostForm=$('#new-post-form')

        newPostForm.submit(function(event){
            event.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                //this serialize the form data into json
                success: function(data){
                    //data is a json object
                    console.log('data');
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost)
                    

                },error:function(error){
                    console.log(error.responseText);
                    

                }
            })
        })
    }

    //method to a create a post in DOM
    // when we submit the from we receive in post controller 
   let newPostDom=function(post){

    console.log('post is created');
    
    return $(`<li id="post-${post._id}">
    <p>
    //   <%= post.content %>
    ${post.content}
    </p>

   
    <small id="delete-button">

      <a class="delete-post-button" href="/posts/destroy/${post.id}"> Delete </a>
       
    </small>
 
    <br>
    <small> <%= post.createdAt %> </small>
    <br>
     <small><i><%= post.user.name %></i> </small>

     <!-- adding the comment box in post display  -->
     <div class="post-comments">

   
      <form action="/comments/create" method="POST">

        <input type="text" name="content" placeholder="Add comment to post... ">
        <!-- here we are sending the current post_id so that comment is added on it  -->
        <input type="hidden" name="postId" value=" ${post.id}">
        <input type="submit" value="Add Comment">
      </form>

 

     </div>

      <!-- showing the comment list  -->
      <div class="post-comment-lists">
        <ul id="post-comments-${post.id}">
 

        </ul>
       </div>

  </li>`)
   } 

    createPost();
    
}