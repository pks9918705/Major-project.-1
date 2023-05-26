{
    console.log('$$$ Client side user_profile.js');
    
    console.log('i am user profile js ');

    const avatarInput = document.getElementById('avatar-input');
    // const previewButton = document.getElementById('preview-button');
    // const saveButton = document.getElementById('save-button');
    const avatarPreview = document.getElementById('avatar-preview');
  
    // previewButton.addEventListener('click', function() {
    //   avatarInput.click();
    // });
  
    avatarInput.addEventListener('change', function() {
      if (avatarInput.files && avatarInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {

        document.getElementById('text-preview').style.visibility = 'visible';
          avatarPreview.src = e.target.result;
          avatarPreview.style.display = 'block';
        //   saveButton.style.display = 'block';
        };
        reader.readAsDataURL(avatarInput.files[0]);
      }
    });
    
}