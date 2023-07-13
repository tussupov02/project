
const postDiv = document.querySelector(`#post`);
const allPost = document.querySelector('#allPost')
let userTitle = document.querySelector('#title');
let userBody = document.querySelector('#body')
async function asd() {
  let response = await fetch(`http://localhost:8080/json/drowpost`);
  let data = await response.json();
  postDiv.innerHTML=``
  for (let post of data) {
    let div = document.createElement(`div`);
    let h1Title = document.createElement(`h1`);
    let pBody = document.createElement(`p`);
    let postDeleteBut = document.createElement(`button`);
    h1Title.innerHTML = post.name;
    pBody.innerHTML = post.body;
    postDeleteBut.setAttribute(`onclick`, `deletePost(${post.del})`);
    postDeleteBut.innerHTML = `Delete`;
    postDeleteBut.style.border = `none`;
    postDeleteBut.style.width = `80px`;
    postDeleteBut.style.height = `30px`;
    postDeleteBut.style.color = `white`;
    div.style.width = `500px`
    div.style.height = `200px`
    div.style.textAlign = `center`
    div.style.border = `2px solid black`
    postDiv.style.display =`flex`;

    div.appendChild(h1Title);
    div.appendChild(pBody);
    div.appendChild(postDeleteBut);
    div.style.borderBottom = `3px solid black`;
    postDiv.appendChild(div);
  }
}
function deletePost(id) {
  fetch(`http://localhost:8080/json/delete/${id}`, {
    method: `DELETE`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  setTimeout(asd, 500);
}

document.querySelector(`#button`).addEventListener(`click`, async () => {
  // let form = document.querySelector(`form`)
  // console.log(form)

// const body = JSON.stringify(
//   Object.fromEntries(new FormData(form).entries())
// );
let newUser = {
  name: userTitle.value,
  pas: userBody.value
}
let body = JSON.stringify(newUser)
let response = await fetch(`http://localhost:8080/json/save`, {
  method: `POST`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body,
});
let data = await response.json();
console.log(data);
setTimeout(asd, 500);
});

document.querySelector('#chek').addEventListener('click', async()=>{
  let nameUser = document.querySelector('#name');
  let pasUser = document.querySelector('#pas');
  let userAuth ={
    name: nameUser.value,
    pas: pasUser.value
  }
  let body = JSON.stringify(userAuth)
  // let response = await fetch(`http://localhost:8080/json/auth`);
  // let data = await response.json();
  // console.log(data);
  let response = await fetch(`http://localhost:8080/json/auth`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body,
  })
  console.log(JSON.parse(await response.json()))
    if(response.json()){
      let inpName = document.createElement('input');
      let inpText = document.createElement('input');
      
      inpName.type = 'text';
      inpText.type = 'text';
      let btnChek = document.createElement('button')
      btnChek.innerHTML="GOOO";
      btnChek.addEventListener('click', async()=>{
        let newPost = {
          id: post.id,
          name: inpName.value,
          body: inpText.value
        }
        
        let body = JSON.stringify(newPost)
        console.log(body)
        let response = await fetch(`http://localhost:8080/json/post`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body,
        });
        let data = await response.json();
        console.log(data);
        setTimeout(asd, 500);
      });
      
      
      // btnChek.setAttribute(`onclick`, `postDrow(${postStr})`)
      allPost.appendChild(inpName)
      allPost.appendChild(inpText)
      allPost.appendChild(btnChek)
      
      return;
    }else{
      alert("вы не зарегались")
    }
  }
)
// async function postDrow(txt){
//   let body= JSON.stringify(txt)
  
// }


