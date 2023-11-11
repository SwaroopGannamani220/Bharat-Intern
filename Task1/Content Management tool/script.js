var savedData = [];

    function allowDrop(ev) {
      ev.preventDefault();
    }

    function drop(ev) {
      ev.preventDefault();
      var data;

      if (ev.dataTransfer.getData("text/plain")) {
        data = ev.dataTransfer.getData("text/plain"); // Text from textarea
      } else if (ev.dataTransfer.files.length > 0) {
        data = ev.dataTransfer.files[0]; // File (image or video)
      }

      if (data) {
        savedData.push(data);
        updateDropbox();
      }
    }

    function updateDropbox() {
      var dropbox = document.getElementById("dropbox");
      dropbox.innerHTML = "";

      for (var i = 0; i < savedData.length; i++) {
        var item = savedData[i];
        var itemElement = document.createElement("div");

        if (typeof item === "string") {
          // Text
          itemElement.textContent = item;
        } else if (item instanceof File) {
          // File (image or video)
          if (item.type.startsWith("image/")) {
            // Display images
            var imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(item);
            imgElement.style.maxWidth = "100%";
            imgElement.style.maxHeight = "100%";
            itemElement.appendChild(imgElement);
          } else if (item.type.startsWith("video/")) {
            // Display videos
            var videoElement = document.createElement("video");
            videoElement.controls = true;
            videoElement.style.maxWidth = "100%";
            videoElement.style.maxHeight = "100%";
            videoElement.innerHTML = '<source src="' + URL.createObjectURL(item) + '" type="' + item.type + '">';
            itemElement.appendChild(videoElement);
          }
        }

        dropbox.appendChild(itemElement);
      }
    }

    function previewImage(event) {
      var fileInput = event.target;
      var file = fileInput.files[0];

      if (file && file.type.startsWith("image/")) {
        savedData.push(file);
        updateDropbox();
      }
    }

    function previewVideo(event) {
      var fileInput = event.target;
      var file = fileInput.files[0];

      if (file && file.type.startsWith("video/")) {
        savedData.push(file);
        updateDropbox();
      }
    }

    function openBlog() {
      // Create a new tab or window to display the saved data 
      var blogWindow = window.open("", "_blank");
      blogWindow.document.open();
      blogWindow.document.write("<html><head><title>Blog</title></head><body style=background-color:#F08080>");
      
      for (var i = 0; i < savedData.length; i++) {
        var item = savedData[i];

        if (typeof item === "string") {
          // Text
          blogWindow.document.write("<h1>Summary</h1>")
          blogWindow.document.write("<p>" + item + "</p>");
        } else if (item instanceof File) {
          // File (image or video)
          if (item.type.startsWith("image/")) {
            // Display images
            blogWindow.document.write("<h1>Images</h1>");
            blogWindow.document.write('<img src="' + URL.createObjectURL(item) + '" style="margin-left: 30px; max-height: 750px; max-width: 750px" />');
          } else if (item.type.startsWith("video/")) {

            // Display videos
            blogWindow.document.write("<h1>Videos</h1>");
            blogWindow.document.write('<video controls style="max-width: 100%; max-height: 100%;  margin-top: 15px""><source src="' + URL.createObjectURL(item) + '" type="' + item.type + '"></video>');
          }
        }
      }

      blogWindow.document.write("</body></html>");
      blogWindow.document.close();
    }