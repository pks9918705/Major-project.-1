{
  function addFriendClicked(button) {
    const clickedUserId = button.getAttribute("data-userid");
    const loggedInUserId = button.getAttribute("data-loginuser");
  
    // Send the IDs to the server using an AJAX request
    $.ajax({
      url: "/friend/addfriend",
      method: "POST",
      data: {
        clickedUserId: clickedUserId,
        loggedInUserId: loggedInUserId
      },
      success: function(response) {
        // Handle the response from the server if needed
        console.log(response.data);
  
        // Change the color of the button to green
        $(button).css("color", "black");
        $(button).text(response.data);
        $(button).css("background-color", "white");
      },
      error: function(xhr, status, error) {
        // Handle any error that occurs during the AJAX request
        console.error(error);
      }
    });
  }
  
}