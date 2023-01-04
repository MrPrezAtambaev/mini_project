// data start
let users = [
  {
    name: "User 1",
    password: "pass123",
    age: 30,
    isLogin: false,
  },
  {
    name: "User 2",
    password: "pass124",
    age: 33,
    isLogin: false,
  },
  {
    name: "User 3",
    password: "pass125",
    age: 21,
    isLogin: false,
  },
  {
    name: "User 4",
    password: "pass126",
    age: 56,
    isLogin: false,
  },
  {
    name: "User 5",
    password: "pass127",
    age: 42,
    isLogin: false,
  },
  {
    name: "User 6",
    password: "pass128",
    age: 13,
    isLogin: false,
  },
  {
    name: "User 7",
    password: "pass129",
    age: 29,
    isLogin: false,
  },
  {
    name: "User 8",
    password: "pass130",
    age: 53,
    isLogin: false,
  },
  {
    name: "User 9",
    password: "pass131",
    age: 18,
    isLogin: false,
  },
  {
    name: "User 10",
    password: "pass132",
    age: 48,
    isLogin: false,
  },
];

let posts = [
  {
    id: 1,
    title: "Post 1",
    user: "User 3",
    likes: 34,
    likedBy: [],
  },
  {
    id: 2,
    title: "Post 2",
    user: "User 4",
    likes: 58,
    likedBy: [],
  },
  {
    id: 3,
    title: "Post 3",
    user: "User 6",
    likes: 90,
    likedBy: [],
  },
  {
    id: 4,
    title: "Post 4",
    user: "User 2",
    likes: 2,
    likedBy: [],
  },
  {
    id: 5,
    title: "Post 5",
    user: "User 3",
    likes: 128,
    likedBy: [],
  },
  {
    id: 6,
    title: "Post 6",
    user: "User 1",
    likes: 743,
    likedBy: [],
  },
  {
    id: 7,
    title: "Post 7",
    user: "User 8",
    likes: 9,
    likedBy: [],
  },
  {
    id: 8,
    title: "Post 8",
    user: "User 10",
    likes: 90,
    likedBy: [],
  },
  {
    id: 9,
    title: "Post 9",
    user: "User 4",
    likes: 73,
    likedBy: [],
  },
  {
    id: 10,
    title: "Post 10",
    user: "User 2",
    likes: 581,
    likedBy: [],
  },
];
//data end

// users scripts start

let inSystem = "";

function changeInSystemUser(userName = "") {
  inSystem = userName;
  let h3 = document.querySelector("h3");
  inSystem
    ? (h3.innerText = `User: ${inSystem} in system`)
    : (h3.innerText = "No user in system");
}

// register
function checkUniqueUsername(userName) {
  return users.some((item) => item.name === userName);
}

function checkPasswords(pass, passConfirm) {
  return pass === passConfirm;
}

function createUser() {
  let userName = prompt("Enter username");
  if (checkUniqueUsername(userName)) {
    alert("User already exists!");
    return;
  }
  let pass = prompt("Enter password");
  let passConfirm = prompt("Enter password confirmation");
  if (!checkPasswords(pass, passConfirm)) {
    alert("Passwords don't match!");
    return;
  }
  let age = +prompt("Enter age");
  let userObj = {
    name: userName,
    password: pass,
    age: age,
    isLogin: false,
  };
  users.push(userObj);
  console.log(users);
}

// login start
function getUserObj(userName) {
  return users.find((item) => item.name === userName);
}

function checkUserPassword(userName, pass) {
  let user = getUserObj(userName);
  return user.password === pass;
}

function loginUser() {
  let userName = prompt("Enter username");
  if (!checkUniqueUsername(userName)) {
    alert("User not found!");
    return;
  }
  let pass = prompt("Enter password");
  if (!checkUserPassword(userName, pass)) {
    alert("Password doesn't match this account!");
    return;
  }
  let user = getUserObj(userName);
  user.isLogin = true;
  changeInSystemUser(userName);
}
//login end
//logout
function logoutUser() {
  if (!inSystem) {
    alert("Only authorized users can logout!");
    return;
  }
  let user = getUserObj(inSystem);
  user.isLogin = false;
  changeInSystemUser();
}
// users scripts end

//posts scripts logic start
function createPost() {
  if (!inSystem) {
    alert("Only authorized users can create posts!");
    return;
  }
  let postTitle = prompt("Enter post title!");
  let postObj = {
    id: Date.now(),
    title: postTitle,
    user: inSystem,
    likes: 0,
  };
  posts.push(postObj);
  readPost();
}
// update post
function getPostObj(id) {
  return posts.find((item) => item.id === id);
}

function checkOwnerPost(id) {
  let postObj = getPostObj(id);
  return postObj && postObj.user === inSystem;
}

function updatePost() {
  if (!inSystem) {
    alert("Only authorized users can update posts!");
    return;
  }
  let postId = +prompt("Enter post ID");
  if (!checkOwnerPost(postId)) {
    alert(
      "There is no post with this id or you are not the author of such a post"
    );
    return;
  }
  let postObj = getPostObj(postId);
  let newPostData = prompt("Enter new post data");
  postObj.title = newPostData;
  readPost();
}

//delete post
function deletePost() {
  if (!inSystem) {
    alert("Only authorized users can delete posts!");
    return;
  }
  let postId = +prompt("Enter post ID");
  if (!checkOwnerPost(postId)) {
    alert(
      "There is no post with this id or you are not the author of such a post"
    );
    return;
  }
  posts = posts.filter((item) => item.id !== postId);
  readPost();
}

//read posts
function readPost() {
  let list = document.querySelector("ul");
  list.innerHTML = "";
  for (let i of posts) {
    list.innerHTML += `<li>Post content: ${i.title}; post id: ${i.id}; likes: ${i.likes}</li>`;
  }
}
//posts scripts logic end

//comments scripts start
function checkCommentKey(obj) {
  return Object.keys(obj).some((item) => item === "comments");
}

function addComment() {
  if (!inSystem) {
    alert("Only authorized users can create comments!");
    return;
  }
  let postId = +prompt("Enter post id");
  let postObj = getPostObj(postId);
  if (!postObj) {
    alert("Post not found");
    return;
  }
  let commentContent = prompt("Enter coment content");
  let commentObj = {
    id: "comm-" + Date.now(),
    content: commentContent,
    user: inSystem,
  };
  if (checkCommentKey(postObj)) {
    postObj.comments.push(commentObj);
  } else {
    postObj.comments = [commentObj];
  }
  console.log(posts);
}
//comments scripts end

// 1. Реализовать логику удаления комментариев(проверка на авторизацию, проверка на то, что коммент существует, проверка на владельца коммента), если все условия выполнены, удалить коммент(использовать функции)
function deleteComment() {
  if (!inSystem) {
    alert("Only authorized users can delete comment");
    return;
  }
  let postId = +prompt("Enter postID:");
  let commentId = prompt("Enter commentID:");
  let post = posts.find((item) => item.id === postId);
  if (!post) {
    return alert("Post is not found");
  }
  post.comments = post.comments.filter((item) => item.id == !commentId);
  console.log(posts);
  return; //posts;
}

// 2. Реализовать логику добавления лайков, любой пользователь может поставить лайк любому посту, если один и тот же пользователь ставит лайк одному и тому же посту, то необходимо отнять один лайк у объекта поста(использовать функции)

let flagLike = false;
let flagDisl = false;
function addLike() {
  if (!inSystem) {
    alert("Only authorized users can like!");
    return;
  }
  let likeId = +prompt("Enter post ID to like");
  let postLike = posts.find((item) => item.id === likeId);

  if (postLike && flagLike === false) {
    postLike.likes += 1;
    postLike.nameLikes = inSystem;
    flagLike = true;
  } else if (postLike && flagLike === true) {
    postLike.likes -= 1;
    flagDisl = true;
    flagLike = false;
  }
  console.log(posts);
  readPost();
  return;
}
