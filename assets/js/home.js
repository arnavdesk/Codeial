(function () {
    const postForm = document.getElementById("new-post-form");
    const postList = document.getElementById("post-list");
    const deleteButtons = document.getElementsByClassName("delete-post");
    const postLikeButtons = document.getElementsByClassName("post-like");
    const commentLikeButtons = document.getElementsByClassName("comment-like");
    console.log(postList);


    const deletePost = async function (deleteLink) {
        let res = await fetch(deleteLink, {
            method: "GET",
            headers: {
                "X-type": "fetch"
            },
        })
        let result = await res.json();
        postList.removeChild(document.getElementById(result.data.id));
        console.log();
    }

    for (const delBtn of deleteButtons) {
        delBtn.onclick = function () {
            deletePost(delBtn.href);
            return false;
        }
    }


    postForm.onsubmit = async function (event) {
        event.preventDefault();

        const data = new URLSearchParams();
        for (const pair of new FormData(postForm)) {
            data.append(pair[0], pair[1]);
        }
        let res = await fetch("/posts/create-post", {
            method: "POST",
            headers: {
                "X-type": "fetch"
            },
            body: data,
        })
        const responseData = await res.json();
        postList.insertBefore(newPostDom(responseData.data.post), postList.childNodes[0]);
        console.log(responseData);
    }

    let newPostDom = function (post) {
        const listItem = document.createElement("li");
        listItem.setAttribute("id", post._id);
        listItem.innerHTML = `
        <div>
            <div>
                ${post.content}
                <a class="delete-post" href="posts/destroy?id=${post._id}">
                    <span><i class="fas fa-times"></i></span>
                </a>
            </div>
            <div id="${post._id}" class="post-like">Y</div>
            <span class="post-like-count">0</span><span> Likes</span> 
            <div>
                ${post.user.name}
            </div>

        </div>

        <form action="/comments/create-comment" class="new-comment-form" method="POST">
            <input type="text" name="content" placeholder="Care to comment?" required>
            <input type="hidden" name="post" value="${post._id}">
            <button type="submit">
                Comment
            </button>
        </form>

        <ul id="comment-list">
        </ul>
        
        `;

        const delBtn = listItem.getElementsByClassName("delete-post")[0];
        delBtn.onclick = function () {
            deletePost(delBtn.href);
            return false;
        }

        const plikeBtn = listItem.getElementsByClassName("post-like")[0];
        plikeBtn.onclick =  function () {
            console.log(plikeBtn);
            processClick(plikeBtn,"Post");
        }
        return listItem;
    }


    let processClick = async function(plikebtn, type){
        let id = plikebtn.id;
        let res = await fetch("/likes/toggle?id=" + id + "&type="+type, {
            method: "POST",
        })
        const responseData = await res.json();
        if (responseData.data.deleted == true) {
            plikebtn.nextElementSibling.innerHTML--;
        } else {
            plikebtn.nextElementSibling.innerHTML++;
        }
    }

    for (const plikebtn of postLikeButtons) {
        console.log(plikebtn);
        plikebtn.onclick =  function () {
            console.log(plikebtn);
            processClick(plikebtn,"Post");
        }
    }

    for (const clikebtn of commentLikeButtons) {
        console.log(clikebtn);
        clikebtn.onclick =  function () {
            console.log(clikebtn);
            processClick(clikebtn,"Comment");
        }
    }

    






})();