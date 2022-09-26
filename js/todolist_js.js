"use strict";

function get_tasks(){
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if(tasks){
    let html_str = "";
  //console.log(tasks);
  for (let i = 0; i < tasks.length; i++){
    console.log(tasks[i]);
   
    html_str +=
    `<li data-id="${tasks[i].item_id}">
                <div class="item_flex">
                  <div class="left_block">
                    <div class="btn_flex">
                      <button type="button" class="btn_up">往上</button>
                      <button type="button" class="btn_down">往下</button>
                    </div>
                  </div>
                  <div class="middle_block">
                    <div class="star_block">
                      <span class="star${(tasks[i].star >= 1 ? " -on" : "")}" data-star="1"><i class="fas fa-star"></i></span>
                      <span class="star${(tasks[i].star >= 2 ? " -on" : "")}" data-star="2"><i class="fas fa-star"></i></span>
                      <span class="star${(tasks[i].star >= 3 ? " -on" : "")}" data-star="3"><i class="fas fa-star"></i></span>
                      <span class="star${(tasks[i].star >= 4 ? " -on" : "")}" data-star="4"><i class="fas fa-star"></i></span>
                      <span class="star${(tasks[i].star >= 5 ? " -on" : "")}" data-star="5"><i class="fas fa-star"></i></span>
                    </div>
                    <p class="para">${tasks[i].name}</p>
                    <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${tasks[i].name}">
                  </div>
                  <div class="right_block">
                    <div class="btn_flex">
                      <button type="button" class="btn_update">更新</button>
                      <button type="button" class="btn_delete">移除</button>
                    </div>
                  </div>
                </div>
              </li>`;
  }
  let ul_el = document.getElementsByClassName("task_list")[0];
  ul_el.innerHTML = html_str;

  }
  
}
document.addEventListener("DOMContentLoaded", function(){
  get_tasks();

  var input_task_name = document.getElementsByClassName("task_name")[0];
  //console.log("input_task_name");
  input_task_name.addEventListener("focus", function(){
      //console.log(focus);
      this.closest("div.task_add_block").classList.add("-on")
  });

  input_task_name.addEventListener("blur", function(){
      //console.log(blur)
      this.closest("div.task_add_block").classList.remove("-on")
  });

  input_task_name.addEventListener("keyup", function(e){
    //console.log( e.which);

    if( e.which == 13){
      let button_task_add = document.getElementsByClassName("task_add")[0];
      button_task_add.click();
    }
  });

  //按下新增按鈕
  var button_task_add =  document.getElementsByClassName("task_add")[0];
  button_task_add.addEventListener("click", function(){
      let button_text = (input_task_name.value).trim();
      if(button_text != ""){
        
          let item_id = Date.now();
          //timestamp 當作該項的id

          let list_html =
              `<li data-id="${item_id}">
                  <div class="item_flex">
                    <div class="left_block">
                      <div class="btn_flex">
                        <button type="button" class="btn_up">往上</button>
                        <button type="button" class="btn_down">往下</button>
                      </div>
                    </div>
                    <div class="middle_block">
                      <div class="star_block">
                        <span class="star" data-star="1"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="2"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="3"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="4"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="5"><i class="fas fa-star"></i></span>
                      </div>
                      <p class="para">` + button_text + `</p>
                      <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${button_text}">
                    </div>
                    <div class="right_block">
                      <div class="btn_flex">
                        <button type="button" class="btn_update">更新</button>
                        <button type="button" class="btn_delete">移除</button>
                      </div>
                    </div>
                  </div>
                </li>`

          //存儲資料到local Storage

          var button_list = document.getElementsByClassName("task_list")[0];
          button_list.insertAdjacentHTML("afterbegin",list_html);
          input_task_name.value = "";

          let task = {
            "item_id": item_id,
            "name": button_text, // 新增的待辦事項文字
            "star": 0 // 預設 0
          };
          let tasks = JSON.parse(localStorage.getItem("tasks"));
          //console.log(tasks);
          if(tasks){ // 若存在
            tasks.unshift(task); // [{}, {}]
          }else{ // 若不存在
            tasks = [task]; // [{}]
          }
          localStorage.setItem("tasks", JSON.stringify(tasks));
      }
  });
});


// 從localStorage 移除資料

//let btn_delete = document.getElementsByClassName("btn_delete");
document.addEventListener("click", function(e){
  if(e.target.classList.contains("btn_delete")){
    let r = confirm("確定要移除嗎?")
    
    if(r){
      // localStorage.clear();
      let item_id = e.target.closest("li").getAttribute("data-id");
      //console.log(item_id);
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      //console.log(tasks);

      let updates_tasks = [];
      tasks.forEach(function(task, i){
        if(item_id != task.item_id){
          updates_tasks.push(task);
        }
      });

      localStorage.setItem("tasks", JSON.stringify(updates_tasks));


      e.target.closest("li").classList.add("fade_out");
      setTimeout(function(){
        e.target.closest("li").remove();
      },1000);  
    }
    

  }
  
});



// 按下清空按鈕
var button_btn_empty = document.getElementsByClassName("btn_empty")[0];
button_btn_empty.addEventListener("click", function(){
  let r = confirm("確定要清空嗎?")
  if(r){
    localStorage.clear();

    let ul_task_list = document.getElementsByClassName("task_list")[0];
    for (let i = 0 ; i < ul_task_list.children.length; i ++){
      ul_task_list.children[i].classList.add("fade_out");
    }

    setTimeout(function(){
      ul_task_list.innerHTML = "";
    },1000);
  }
});                    


//更新待辦事項
document.addEventListener("click", function(e){
  if(e.target.classList.contains("btn_update")){
    //console.log(e.target.getAttribute("data-edit"));

    if(e.target.getAttribute("data-edit") == undefined){ //編輯狀態

      e.target.setAttribute("data-edit", true);
      let li_el = e.target.closest("li");
      li_el.querySelector("p.para").classList.toggle("-none");
      li_el.querySelector("input.task_name_update").classList.toggle("-none");

    }else{
      let update_task_name = (e.target.closest("li").querySelector("input.task_name_update").value).trim();

      if(update_task_name == ""){
        alert("請輸入待辦事項");
      }else{
        let p_el = e.target.closest("li").querySelector("p.para");
        p_el.innerHTML = update_task_name;
        p_el.classList.toggle("-none");

        let input_update_el = e.target.closest("li").querySelector("input.task_name_update");
        input_update_el.value = update_task_name;
        input_update_el.classList.toggle("-none");

        e.target.removeAttribute("data-edit");


        //更新localStorage

        let item_id = e.target.closest("li").getAttribute("data-id");
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(function(task, i){
          if(item_id == task.item_id){
            tasks[i].name = update_task_name;
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }

  }
})


//第五步 排序
document.addEventListener("click", function(e){

  //往上
  if(e.target.classList.contains("btn_up")&& e.target.closest("li").previousElementSibling){

    let li_el = e.target.closest("li");
    let item_id = li_el.getAttribute("data-id");
    let clone_html = li_el.outerHTML;
    li_el.previousElementSibling.insertAdjacentHTML("beforebegin", clone_html);
    li_el.remove();

    //更新排序
    items_sort(item_id, "up");
  }
    //往下
  if(e.target.classList.contains("btn_down") && e.target.closest("li").previousElementSibling){
    let li_el = e.target.closest("li");
    let item_id = li_el.getAttribute("data-id");

    let clone_html = li_el.outerHTML;
    li_el.nextElementSibling.insertAdjacentHTML("afterend", clone_html);
    li_el.remove();

    //更新排序
    items_sort(item_id, "down");
  }  

});



// 寫成一個函式，因為可能會重覆呼叫
function items_sort(item_id, direction){

  let tasks = JSON.parse(localStorage.getItem("tasks"));

  if(direction == "up"){ // 往上
    let current_li_index;
    let current_li_data;
    let before_li_data;

    tasks.forEach(function(task, i){
      if(item_id == task.item_id){
        current_li_index = i; // 取得點擊的那項 li 的索引值
        current_li_data = task; // 取得點擊到的那項 li 的資料
        before_li_data = tasks[i - 1]; // 取得點擊到的那項 li 的前一項資料
      }
    });
    tasks[current_li_index - 1] = current_li_data;
    tasks[current_li_index] = before_li_data;
  }

  if(direction == "down"){ // 往下
    let current_li_index;
    let current_li_data;
    let after_li_data;

    tasks.forEach(function(task, i){
      if(item_id == task.item_id){
        current_li_index = i; // 取得點擊的那項 li 的索引值
        current_li_data = task; // 取得點擊到的那項 li 的資料
        after_li_data = tasks[i + 1]; // 取得點擊到的那項 li 的下一項資料
      }
    });
    tasks[current_li_index] = after_li_data;
    tasks[current_li_index + 1] = current_li_data;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


//星號

document.addEventListener("click", function(e){
  //console.log(e.target);
  //console.log(e.target.closest("span"));

  if(e.target.closest("span")){
    let span_el = e.target.closest("span");
    if(span_el.classList.contains("star")){
      let current_star = parseInt(span_el.getAttribute("data-star"));
      let star_span = span_el.closest("div.star_block").querySelectorAll("span.star");
      //console.log(star_span);
      star_span.forEach(function(star_item, i){
        if( parseInt(star_item.getAttribute("data-star")) <= current_star ){
          star_span[i].classList.add("-on");
        }else{
          star_span[i].classList.remove("-on");
        }
      });

      //更新localStorage Star
      let item_id = span_el.closest("li").getAttribute("data-id");
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks.forEach(function(task, i){
        if(item_id == task.item_id){
          tasks[i].star = current_star;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));

    }
  }

});