//Dom Element
const todoInput = document.querySelector("#todoInput");
const dueDateInput = document.querySelector("#dueDateInput");
const addBtn = document.querySelector("#addBtn");

// local에서 data 가져오기
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

// local에 저장된 data가 있으면 화면에 출력
if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

// addEventListener에 keyCodeCheck 함수 연결
todoInput.addEventListener("keydown", keyCodeCheck);

//Enter key를 누르면 추가
function keyCodeCheck(event) {
  if (event.keyCode === 13 && todoInput.value !== "") {
    createTodo();
  }
}

// + button으로 추가
addBtn.addEventListener("click", () => {
  if (todoInput.value !== "") {
    createTodo();
  }
});

// List 추가
function createTodo(storageData) {
  let todoContents = todoInput.value; //입력 feild의 value
  let dueDate = dueDateInput.value; // 마감일 입력

  if (storageData) {
    // local에 저장된 data가 있을 때
    todoContents = storageData.contents;
    dueDate = storageData.dueDate;
  }

  const todoList = document.querySelector("#todoList");
  const newLi = document.createElement("li");
  newLi.setAttribute("draggable", "true"); // drag 기능
  const newBtn = document.createElement("button");
  const newSpan = document.createElement("span");
  const newDateSpan = document.createElement("span");
  const deleteAll = document.querySelector(".delete-btn-wrap");
  const deleteBtn = document.createElement("button");

  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  newLi.appendChild(newDateSpan);

  newSpan.textContent = todoContents;
  newDateSpan.textContent = dueDate ? ` | ${dueDate}` : "";

  todoList.appendChild(newLi);

  todoInput.value = "";
  dueDateInput.value = "";

  //Checkbox Click
  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    saveItemsFn(); //local storage에 저장
  });

  //List Delete => Double Click
  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn();
  });

  // Drag and Drop => list 순서 변경
  newLi.addEventListener("dragstart", dragStart);
  newLi.addEventListener("dragover", dragOver);
  newLi.addEventListener("drop", drop);

  if (storageData && storageData.complete === true) {
    newLi.classList.add("complete");
  }

  saveItemsFn();
}

// Drag and Drop 기능 구현
let draggedItem = null;

function dragStart(event) {
  //drag 시 해당 data 이동
  draggedItem = this;
  event.dataTransfer.effectAllowed = "move";
}

function dragOver(event) {
  event.preventDefault(); // 기본 동작 방지
  event.dataTransfer.dropEffect = "move";
}

function drop(event) {
  event.preventDefault(); // 기본 동작 방지
  if (draggedItem !== this) {
    const todoList = document.querySelector("#todoList");
    const items = Array.from(todoList.children);
    const draggedIndex = items.indexOf(draggedItem);
    const targetIndex = items.indexOf(this);

    if (draggedIndex < targetIndex) {
      //draggedItem이 targetItem보다 위에 있을 때
      this.after(draggedItem);
    } else {
      this.before(draggedItem);
    }
    saveItemsFn(); // 순서 변경 후 저장
  }
}

//Clear All Button (모든 Li요소 삭제)
function deleteAll() {
  const liList = document.querySelectorAll("#todoList li");

  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }

  saveItemsFn(); //local storage에 반영
}

//Local Storage에 저장
function saveItemsFn() {
  const saveItems = [];
  const todoList = document.querySelector("#todoList");

  //각 항목의 내용과 완료상태를 객체로 만들어 배열에 저장
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      dueDate: todoList.children[i]
        .querySelector("span:last-child")
        .textContent.replace(" | ", ""),
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItems.push(todoObj);
  }

  //목록이 없으면 local storage에서 삭제
  if (saveItems.length === 0) {
    localStorage.removeItem("saved-items");
  } else {
    localStorage.setItem("saved-items", JSON.stringify(saveItems));
  }
}
