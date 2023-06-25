const input=document.querySelector('#input');
input.addEventListener('keydown',(e)=>{
    if(e.key=="Enter" && input.value!=""){
        getUserData(input.value);
    }
});
const submitBtn=document.querySelector('#submit');
submitBtn.addEventListener('click',()=>{
    if(input.value!=""){
        getUserData(input.value);
    }
})
let userName=document.querySelector('#user');
async function getUserData(userName){
    try{
        let response=await fetch(`https://api.github.com/users/${userName}`);
        let data=await response.json();
        console.log(data);
        renderData(data);
    }
    catch(err){
        throw err;
    }
}

let avatarImg=document.querySelector('#avatar');
let bio=document.querySelector('#bio');
let naam=document.querySelector('#name');
let repos=document.querySelector('#repos');
let followers=document.querySelector('#followers');
let followings=document.querySelector('#following');
let locatn=document.querySelector('#location');
let blog=document.querySelector('#blog');
let twtrUsrName=document.querySelector('#twitter');
let company=document.querySelector('#company');
let dateJoined=document.querySelector('#date');
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let wrongSearch=document.querySelector('#no-result');
function renderData(data){

    function checkNull(param1, param2) {
        if (param1 === "" || param1 === null) {
          param2.style.opacity = 0.5;
          param2.previousElementSibling.style.opacity = 0.5;
          return false;
        } else {
          return true;
        }
    }

    // if user enter wrong user name, then
    if(data.message!=='Not Found'){
        avatarImg.src=`${data.avatar_url}`;
        bio.innerText=data.bio == null ? "This profile has no bio." : `${data.bio}`;
        naam.innerText=data.name===null?data.login:data.name;
        userName.innerText=`@${data.login}`;
        repos.innerText=`${data.public_repos}`;
        followers.innerText=`${data.followers}`;
        followings.innerText=data.following;//`${data.following}`;  both will work
        locatn.innerText=checkNull(data.location, locatn) ? data.location : "Not Available";
        blog.innerText=checkNull(data.blog, blog) ? data.blog : "Not Available";
        blog.href=checkNull(data.blog, blog) ? data.blog : "#";
        twtrUsrName.innerText=checkNull(data.twitter_username, twtrUsrName) ? data.twitter_username : "Not Available";
        twtrUsrName.href=checkNull(data.twitter_username, twtrUsrName) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText=checkNull(data.company, company) ? data.company : "Not Available";
        datesegments = data.created_at.split("T").shift().split("-");
        dateJoined.innerText=`Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    }
    else{
        wrongSearch.style.display='block';
        setTimeout(() => {
            wrongSearch.style.display='none';
        }, 2500);
    }
}

let mode=document.querySelector('#mode-text');
let modeIcon=document.querySelector('#mode-icon');
let darkMode=false;
const root = document.documentElement.style;
function setDarkMode(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    darkMode=true;
    mode.innerText='LIGHT';
    modeIcon.src = "sun-icon.svg";
    localStorage.setItem("dark-mode",true);
}
function setLightMode(){
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    darkMode=false;
    mode.innerText='DARK';
    modeIcon.src = "moon-icon.svg";
    localStorage.setItem("dark-mode",false);
}

let modeBtn=document.querySelector('#btn-mode');
modeBtn.addEventListener('click',()=>{
    if(darkMode==false){
        setDarkMode();
    }else{
        setLightMode();
    }
});

function init(){
    darkMode=false;
    const value=localStorage.getItem("dark-mode");
    if(value===null){
        localStorage.setItem("dark-mode",darkMode);
        setLightMode();
    }
    else if(value=="true"){
        setDarkMode();
    }
    else{
        setLightMode();
    }

    getUserData('abhishek1711mmmut');
}
init();