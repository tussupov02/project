console.log("Hello")
const postDiv = document.querySelector(`#post`);
const allPost = document.querySelector('#allPost')
let userTitle = document.querySelector('#title');
let userBody = document.querySelector('#body')
async function asd() {
  postDiv.innerHTML=``
  let response = await fetch(`http://localhost:8080/json/drowpost`);
  let data = await response.json();
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
    postDeleteBut.style.background = `black`;
    div.style.display=`flex`;
    div.style.flexDirection=`column`;
    div.style.alignItem=`center`;
    div.style.justifyContent=`space-around`;
    div.style.width = `500px`
    div.style.height = `200px`
    div.style.textAlign = `center`
    div.style.border = `2px solid black`
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
  console.log('delete')
  asd()
}

document.querySelector(`#button`).addEventListener(`click`, async () => {
  if(userTitle.value.length>0 && userBody.value.length>0){
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
      let data = JSON.parse(await response.json())
      console.log(data);
      if(data>0){
        console.log(data);
        drowNewPosts(data)
        asd()
      }else{
        alert("такой пользователь зарегестрирован")
        postDiv.innerHTML=` `
      allPost.innerHTML=` `
      }
  }else{
    alert("вы не ввели ничего")
    postDiv.innerHTML=` `
    allPost.innerHTML=` `
  }

});

document.querySelector('#chek').addEventListener('click', async()=>{
  let nameUser = document.querySelector('#name');
  let pasUser = document.querySelector('#pas');
  if(nameUser.value.length>0 && pasUser.value.length>0){
    let userAuth ={
      name: nameUser.value,
      pas: pasUser.value
    }
    let body = JSON.stringify(userAuth)
    let response = await fetch(`http://localhost:8080/json/auth`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    })
    let userID = JSON.parse(await response.json())
    console.log(userID)
    if(userID>0){
      drowNewPosts(userID)
      asd()
    }else{
      alert("такого пользователя нет")
      postDiv.innerHTML=` `
      allPost.innerHTML=` `
    }
  }else{
    alert('вы не ввели ничего')
    postDiv.innerHTML=` `
    allPost.innerHTML=` `
  }
  
})


function drowNewPosts(userId){
  allPost.innerHTML = " "
  let inpName = document.createElement('input');
  let inpText = document.createElement('input');
  inpName.type = 'text';
  inpText.type = 'text';
  let btnChek = document.createElement('button')
  btnChek.innerHTML="GOOO";
  btnChek.addEventListener('click', async()=>{
    if(inpName.value.length>0 && inpText.value.length>0){
      let newPost = {
        id: userId,
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
      asd()
    }else{
      alert('вы не ввели ничего')
      asd()
    }

    
  });
  allPost.appendChild(inpName)
  allPost.appendChild(inpText)
  allPost.appendChild(btnChek)
}


      
      
      // inpName.type = 'text';
      // inpText.type = 'text';
      // let btnChek = document.createElement('button')
      // btnChek.innerHTML="GOOO";
      // btnChek.addEventListener('click', async()=>{
      //   let newPost = {
      //     id: post.id,
      //     name: inpName.value,
      //     body: inpText.value
      //   }
        
      //   let body = JSON.stringify(newPost)
      //   console.log(body)
      //   let response = await fetch(`http://localhost:8080/json/post`, {
      //   method: `POST`,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body,
      //   });
      //   let data = await response.json();
      //   console.log(data);
      //   setTimeout(asd, 500);
      // });
      
      
      // btnChek.setAttribute(`onclick`, `postDrow(${postStr})`)
      
      

    
  


