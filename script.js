async function addPost(){

    const title=document.getElementById("title").value;
    const content=document.getElementById("content").value;

    await fetch("/posts",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title,
            content
        })
    });

    loadPosts();
}

async function loadPosts(){

    const res=await fetch("/posts");
    const posts=await res.json();

    let output="";

    posts.forEach(post=>{

        output+=`
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.content}</p>

            <input type="text" placeholder="Comment">
            <button>Add Comment</button>
        </div>
        `;
    });

    document.getElementById("posts").innerHTML=output;
}

loadPosts();
