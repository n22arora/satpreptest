//getting all the required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const toDoList = document.querySelector(".toDoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () =>{
    let userData = inputBox.value; //getting userentered data
    if(userData.trim() != 0){
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
}

showTasks();

addBtn.onclick = () =>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New To Do");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New To Do", JSON.stringify(listArr));
    showTasks();
    addBtn.classList.remove("active");
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New To Do");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNum = document.querySelector(".pendingNum");
    pendingNum.textContent = listArr.length;
    if(listArr.length > 0){
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) =>{
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";>Delete</span></li>`;
    });
    toDoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New To Do");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New To Do", JSON.stringify(listArr));
    showTasks();
}

deleteAllBtn.onclick = () =>{
    listArr = [];
    localStorage.setItem("New To Do", JSON.stringify(listArr));
    showTasks();
}