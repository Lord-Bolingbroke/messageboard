//Business logic for topic
function Topic() {
  this.posts = [],
  this.currentId = 0
}

Topic.prototype.addPost = function(post) {
  post.id = this.assignId();
  this.posts.push(post);
}

Topic.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

function Post (name, header, post) {
  this.name = name,
  this.header = header,
  this.post = post
}

function createReplyLink(postId,replyId) {
  return "<div id='reply-div-" + postId+ replyId + "'><button data-postid='" + postId + "' data-id='" + replyId + "' type='button' class='btn btn-reply-post'>Reply post</button></div>";
}

function createReplyTextArea(postId, replyId) {
  return "<div class='well' id='reply-msg-" + postId + replyId + "'>" +
  "<div class='form-group'><label for='name'>Name:</label>" +
  "<input id='replyname' class='form-control' type='text' placeholder='Enter Your Name'></div>" +
  "<div class='form-group'><label for='header'>Reply Message:</label>" +
  "<input id='replymsg' class='form-control' type='text' placeholder='Enter Your Reply'></div>" +
  "<button data-postid='" + postId + "' data-id='" + replyId + "' type='button' class='btn btn-reply-submit'>Reply post</button></div>";
}

function displayReply(id, replyname, replymessage){
  var theCurrentTime = new Date();

  return "Name: "+ replyname + "<br>Time" + theCurrentTime.toDateString() + "<br>Message" + replymessage + "<br>";
}

var index = 1;

var topicsObject = new Topic();

Post.prototype.createPost = function() {
  var theCurrentTime = new Date();
  $("#results").append("<div class='container well' id='first-post-"  + topicsObject.currentId + "'><h2>" + this.header + "</h2>" + "<br>" + this.post + "<br>" + this.name + "<br>" + theCurrentTime.toDateString() + createReplyLink(topicsObject.currentId,0) + "</div>")
}

$(document).ready(function(){
  //Modal code
  var modal = document.getElementById("post-modal");
  var btn = document.getElementById("add-post-button");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  //End modal code

  $("#results").on("click", ".btn-reply-post", function(e) {
    console.log("hey, i see your button click on relpies, you clicked on" + this.id);
    console.log("hey this is your text you are replying to" + this.post);
    var postId = $(e.target).attr("data-postid");
    var replyId = $(e.target).attr("data-id");
    console.log("clicked id=" + postId);

    $("#reply-div-" + postId+replyId).html(createReplyTextArea(postId, replyId));
  });

  $("#results").on("click", ".btn-reply-submit", function(e) {

    console.log("Replying to the post" + this.post);
    var replyId = $(e.target).attr("data-id");
    var postId = $(e.target).attr("data-postid");
    console.log("clicked id= postId=" + replyId + " " + postId);
    var replyName = $("#replyname").val();
    var replyMessage = $("#replymsg").val();

    $("#reply-msg-" + postId + replyId).html(displayReply(replyId, replyName, replyMessage));
    var nextId = parseInt(replyId) + 1;
    $("#first-post-" + postId).append(createReplyLink(postId,nextId));
  });

  $("#results").on("click", ".btn-delete-post", function() {
  });

  $("#add-post").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var header = $("#header").val();
    var post = $("#post").val();

    var newPost = new Post(name, header, post)
    if (name === "" || header === "" || post === "") {
      $("#warning-text").text("Please fill out all fields")
    } else {
      $("#warning-text").text("")
      newPost.createPost();
      topicsObject.addPost(newPost);
      console.log(newPost);
    }

    $("#name").val("");
    $("#header").val("");
    $("#post").val("");
  });
});
