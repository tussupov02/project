const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnLogin = document.querySelector(".btnLogin");
const iconClose = document.querySelector(".icon-close");
const btnReg = document.querySelector("#btnReg");
const btnAutho = document.querySelector("#btnAutho");
const twoPage= document.querySelector(".twoPage");
const mainWrapp = document.querySelector(".main-wrapper");
const iconCloseBasket = document.querySelector(".icon-close-basket");
const basket = document.querySelector(".basket");
const clickBasket = document.querySelector(".click-basket");
const userRegis = document.querySelector(".user-regis");
const btnName = document.querySelector("#btnName");
const API_KEY = "https://fakestoreapi.com/products";
const contentDiv = document.querySelector(".content")
const listCatalog = document.querySelector(".list-catalog");
const catalog = document.querySelector(".catalog");
const closeIconCatalog = document.querySelector(".icon-close-catalog");

registerLink.addEventListener("click", ()=>{
    wrapper.classList.add("active")
});
loginLink.addEventListener("click", ()=>{
    wrapper.classList.remove("active")
});
btnLogin.addEventListener("click", ()=>{
    basket.classList.remove("active-bas");
    catalog.classList.remove("active-catalog");
    mainWrapp.scrollIntoView({ 
        block: 'nearest',
        behavior: 'smooth', 
      });
    if(`${btnLogin.innerHTML}`!="Логин"){
        let p = document.querySelector(".text-Name")
        p.innerHTML+= btnLogin.innerHTML
        userRegis.classList.add("user-poput")
    }
    else{
        wrapper.classList.add("active-poput");
    }
});
iconClose.addEventListener("click", ()=>{
    wrapper.classList.remove("active-poput");
});
clickBasket.addEventListener("click", ()=>{
    catalog.classList.remove("active-catalog");
    wrapper.classList.remove("active-poput");
    let newUser = localStorage.getItem("newUser");
    if(newUser){
        basket.classList.add("active-bas");
    }
    else{
        wrapper.classList.add("active-poput");
        mainWrapp.scrollIntoView({ 
            block: 'nearest',
            behavior: 'smooth', 
          });
    }
})
btnName.addEventListener("click", ()=>{
    userRegis.classList.remove("user-poput")
})
iconCloseBasket.addEventListener("click", ()=>{
    basket.classList.remove("active-bas");
})
twoPage.addEventListener("click", ()=>{
    catalog.classList.remove("active-catalog");
    wrapper.classList.remove("active-poput");
    basket.classList.remove("active-bas");
    contentDiv.scrollIntoView({ 
        block: 'nearest',
        behavior: 'smooth', 
    });
    getPost()
})
btnReg.addEventListener("click", check=>{
    let inpEmail = document.querySelector("#emailReg");
    let inpPassword = document.querySelector("#passReg");
    let userName = document.querySelector("#userName");
    let examUsers = JSON.parse(localStorage.getItem("saveUsers"));
    let result=false
    if(examUsers){
        for(let user of examUsers){
            if(user.email== inpEmail.value){
                result=true
            }
        }
        if(result){
            alert("такой емайл уже зарегестрирован");
        }
        else{
            if(userName.value){
                if(inpPassword.value.length>=6){
                let listUsers={
                    name: userName.value,
                    email: inpEmail.value,
                    password: inpPassword.value
                }
                let allUsers = JSON.parse(localStorage.getItem("saveUsers")) || [];
                allUsers.push(listUsers);
                let newUsers= localStorage.setItem("saveUsers", JSON.stringify(allUsers));
                btnLogin.innerHTML = `${userName.value}`
                wrapper.classList.remove("active-poput")
            }
            else{
                alert("Не верный пароль")
            }
        }
        else{
            alert("Вы не ввели имя")
        }
        }
    }
    else{
        if(userName.value){
            if(inpPassword.value.length>=6){
            let listUsers={
                name: userName.value,
                email: inpEmail.value,
                password: inpPassword.value
            }
            let allUsers = JSON.parse(localStorage.getItem("saveUsers")) || [];
            allUsers.push(listUsers);
            let newUsers= localStorage.setItem("saveUsers", JSON.stringify(allUsers));
            btnLogin.innerHTML = `${userName.value}`
            wrapper.classList.remove("active-poput")
        }
        else{
            alert("Не верный пароль")
        }
    }
    else{
        alert("Вы не ввели имя")
    }
    }

})

async function getPost(){
    let response = await fetch (API_KEY);
    let catalogs = await response.json();
    contentDiv.innerHTML=" "
    for(let catalog of catalogs){
        let catalogDiv = document.createElement("div");
        let imgDiv = document.createElement("div");
        let nameP = document.createElement("p");
        let priceP = document.createElement("p");
        let span = document.createElement("span");
        let spanDiv = document.createElement("div");
        catalogDiv.style.display=`flex`;
        catalogDiv.style.flexDirection=`column`;
        catalogDiv.style.width=`300px`;
        catalogDiv.style.height=`400px`;
        catalogDiv.style.overflow=`hidden`;
        catalogDiv.style.borderRadius=`20px`;
        catalogDiv.style.color=`#162938`;
        catalogDiv.style.fontSize=`2em`;
        catalogDiv.style.fontWeight=`500`;
        catalogDiv.style.marginLeft=`40px`;
        catalogDiv.style.marginBottom=`20px`;
        catalogDiv.style.backgroundColor=`white`;
        catalogDiv.style.boxShadow=`0 0 30px rgba(0, 0, 0, .5)`;
        imgDiv.style.width=`100%`;
        imgDiv.style.height=`250px`;
        imgDiv.style.backgroundImage=`url('${catalog.image}'`;
        imgDiv.style.backgroundSize=`100%`;
        imgDiv.style.backgroundPosition=`center`;
        imgDiv.style.backgroundRepeat=`no-repeat`;
        // priceP.style.position=`absolute`;
        // span.style.position=`absolute`;
        // span.style.paddingTop=`333px`;
        // span.style.paddingLeft=`250px`;
        span.style.cursor=`pointer`;
        spanDiv.style.width=`100%`;
        spanDiv.style.height=`80px`;
        spanDiv.style.display=`flex`;
        spanDiv.style.justifyContent=`space-between`;
        spanDiv.style.paddingLeft=`10px`;
        spanDiv.style.paddingRight=`10px`;
        spanDiv.style.marginTop=`50px`;
        // priceP.style.paddingTop=`330px`;
        // priceP.style.paddingLeft=`30px`;
        nameP.innerHTML=catalog.title;
        nameP.style.fontSize=`15px`;
        nameP.style.paddingLeft=`15px`;
        nameP.style.marginTop=`15px`;
        priceP.innerHTML=catalog.price+"$";
        span.innerHTML=`<ion-icon name="cart-outline"></ion-icon>`;
        catalogDiv.appendChild(imgDiv);
        catalogDiv.appendChild(nameP);
        // catalogDiv.appendChild(priceP);
        // catalogDiv.appendChild(span);
        spanDiv.appendChild(priceP);
        spanDiv.appendChild(span);
        catalogDiv.appendChild(spanDiv);
        contentDiv.appendChild(catalogDiv);
        span.addEventListener("click", ()=>{
            span.style.color="red";
            catalogDiv.style.width=`310px`;
            catalogDiv.style.height=`410px`;
            catalogDiv.style.transition=`height .2s ease, width .2s ease`;
            setTimeout(()=>{
                span.style.color="black";
                catalogDiv.style.width=`300px`;
                catalogDiv.style.height=`400px`;
                catalogDiv.style.transition=`height .2s ease, width .2s ease`;

            },300)
        })
    }
}
listCatalog.addEventListener("click", async()=>{
    wrapper.classList.remove("active-poput");
    contentDiv.scrollIntoView({ 
        block: 'nearest',
        behavior: 'smooth', 
    });
    catalog.classList.add("active-catalog");
    contentDiv.innerHTML=" ";
    let response = await fetch (API_KEY+ "/categories");
    let categories = await response.json();
    catalog.innerHTML=" ";
    catalog.appendChild(closeIconCatalog)
    for(let categoti of categories){
        let categoriDiv = document.createElement("div");
        let categoriP = document.createElement("p");
        categoriDiv.style.backdropFilter=`blur(20px)`;
        categoriDiv.style.background=`rgba(179, 170, 170, 0.366)`;
        categoriDiv.style.width=`300px`;
        categoriDiv.style.height=`100px`;
        categoriDiv.style.display=`flex`;
        categoriDiv.style.justifyContent=`center`;
        categoriDiv.style.alignItems=`center`;
        categoriDiv.style.borderRadius=`20px`;
        categoriDiv.style.cursor=`pointer`;
        categoriDiv.style.boxShadow=`0 0 30px rgba(0, 0, 0, .5)`;
        categoriP.style.fontSize=`30px`
        categoriP.style.fontWeight=`500`
        categoriP.innerHTML=categoti;
        categoriDiv.appendChild(categoriP);
        catalog.appendChild(categoriDiv);
        // categoriDiv.setAttribute("onclick", `saveCatalog('${categoti}')`);
        categoriDiv.addEventListener("click", async()=>{
            categoriDiv.style.color="white";
            categoriDiv.style.background="black";
            categoriDiv.style.transition=`color .2s ease, background .2s ease`;
            setTimeout(()=>{
                categoriDiv.style.color="black";
                categoriDiv.style.background="rgba(179, 170, 170, 0.366)";
                categoriDiv.style.transition=`color .2s ease, background .2s ease`;

            },300);
            catalog.classList.remove("active-catalog");
        let result = await fetch ("https://fakestoreapi.com/products/category/"+`${categoti}`);
        let catalogs = await result.json();
        contentDiv.innerHTML=" ";
        for(let newCatalog of catalogs){
            let catalogDiv = document.createElement("div");
            let imgDiv = document.createElement("div");
            let nameP = document.createElement("p");
            let priceP = document.createElement("p");
            let span = document.createElement("span");
            let spanDiv = document.createElement("div");
            catalogDiv.style.display=`flex`;
            catalogDiv.style.flexDirection=`column`;
            catalogDiv.style.width=`300px`;
            catalogDiv.style.height=`400px`;
            catalogDiv.style.overflow=`hidden`;
            catalogDiv.style.borderRadius=`20px`;
            catalogDiv.style.color=`#162938`;
            catalogDiv.style.fontSize=`2em`;
            catalogDiv.style.fontWeight=`500`;
            catalogDiv.style.marginLeft=`40px`;
            catalogDiv.style.marginTop=`20px`;
            catalogDiv.style.backgroundColor=`white`;
            catalogDiv.style.boxShadow=`0 0 30px rgba(0, 0, 0, .5)`;
            imgDiv.style.width=`100%`;
            imgDiv.style.height=`250px`;
            imgDiv.style.backgroundImage=`url('${newCatalog.image}'`;
            imgDiv.style.backgroundSize=`100%`;
            imgDiv.style.backgroundPosition=`center`;
            imgDiv.style.backgroundRepeat=`no-repeat`;
            // priceP.style.position=`absolute`;
            // span.style.position=`absolute`;
            // span.style.paddingTop=`333px`;
            // span.style.paddingLeft=`250px`;
            span.style.cursor=`pointer`;
            spanDiv.style.width=`100%`;
            spanDiv.style.height=`80px`;
            spanDiv.style.display=`flex`;
            spanDiv.style.justifyContent=`space-between`;
            spanDiv.style.paddingLeft=`10px`;
            spanDiv.style.paddingRight=`10px`;
            spanDiv.style.marginTop=`50px`;
            // priceP.style.paddingTop=`330px`;
            // priceP.style.paddingLeft=`30px`;
            nameP.innerHTML=newCatalog.title;
            nameP.style.fontSize=`15px`;
            nameP.style.paddingLeft=`15px`;
            nameP.style.marginTop=`15px`;
            priceP.innerHTML=newCatalog.price+"$";
            span.innerHTML=`<ion-icon name="cart-outline"></ion-icon>`;
            catalogDiv.appendChild(imgDiv);
            catalogDiv.appendChild(nameP);
            contentDiv.innerHTML.transition=`appendChild .5s ease`
            spanDiv.appendChild(priceP);
            spanDiv.appendChild(span);
            catalogDiv.appendChild(spanDiv);
            contentDiv.appendChild(catalogDiv);
            span.addEventListener("click", ()=>{
                span.style.color="red";
                catalogDiv.style.width=`310px`;
                catalogDiv.style.height=`410px`;
                catalogDiv.style.transition=`height .2s ease, width .2s ease`;
                setTimeout(()=>{
                    span.style.color="black";
                    catalogDiv.style.width=`300px`;
                    catalogDiv.style.height=`400px`;
                    catalogDiv.style.transition=`height .2s ease, width .2s ease`;
    
                },300)
            })
        }
        })
    }
})
closeIconCatalog.addEventListener("click", ()=>{
    catalog.classList.remove("active-catalog");
    getPost();
})
btnAutho.addEventListener("click", ()=>{
    let saveUser = JSON.parse(localStorage.getItem("saveUsers"));
    let emailAuth = document.querySelector("#emailAuth");
    let passAuth = document.querySelector("#passAuth");
    for(let user of saveUser){
        if(emailAuth.value== user.email && passAuth.value== user.password){
            let sessionUser = sessionStorage.setItem("saveName", user.name);
            wrapper.classList.remove("active-poput");
            btnLogin.innerHTML = `${user.name}`;
        }
        else{
            console.log(user.password, passAuth.value);
        }
    }
})
getPost()