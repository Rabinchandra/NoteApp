var add = document.getElementById("add");
var itemList = document.getElementById("item-list");
var save = document.getElementById("save");
var del = document.getElementById("delete");
var textarea = document.getElementById("textarea");
var sizevalue = document.getElementById("sizevalue");
var fontlist = document.getElementById("font-list");
var colorlist = document.getElementById("color-list");
var search = document.getElementById("search");
var resBtn = document.getElementById("responsivebtn");

add.addEventListener("click", addItem);
save.addEventListener("click", saveItem);
del.addEventListener("click", deleteItem);

class NoteItem {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    static getItemList() {
        var list;
        if(localStorage.getItem("items") == null || localStorage.getItem("items") == "") {
            list = [];
            localStorage.setItem("items", "");
        } else {
            list = JSON.parse(localStorage.getItem("items"));
        }
       return list;
    }
}


function addItem() {
    title = prompt("Enter a title for the file: ").trim();
    if(title !== "") {
        // pushing item with title and empty content to the localStorage
        // a new variable have to create for NoteItem
        // because though NoteItem.getItemList() return a list
        // it does affect the array of list since it is not an object but constructor
        var notes = NoteItem.getItemList();
        notes.push(new NoteItem(title, ""));
        // pushing item to the list
        var li = document.createElement("li");
        li.innerText = title;
        itemList.appendChild(li);
        // pushing to the localStorage
        localStorage.setItem("items", JSON.stringify(notes));
    } else {
      alert('Please add a title and retry!');
    }
}

function saveItem() {
  // if the file to be saved is not found
    if(typeof(title) == "undefined") {
      // create a new item or file
      addItem();
    }
    var content = document.getElementById("textarea");
    var notes = NoteItem.getItemList();
    notes.forEach(function(note) {
        if(note.title == title) {
          note.content = content.value;
        }
      });

    localStorage.setItem('items', JSON.stringify(notes));
}

function deleteItem() {
  var notes = NoteItem.getItemList();
  notes.forEach(function(item, index) {
    if(title == item.title) {
      notes.splice(index, 1);
      itemList.removeChild(itemList.children[index]);
    }
  })
  localStorage.setItem("items", JSON.stringify(notes));
}

itemList.addEventListener("click", function(e) {
    var notes = NoteItem.getItemList();
    if(e.target.innerText != "") {
        notes.forEach(function(note) {
            if(note.title == e.target.innerText) {
                document.getElementById("textarea").value = note.content;
            }
        })
    }
    title = e.target.innerText;
    textBackground();
});

document.addEventListener("DOMContentLoaded", function() {
    var notes = NoteItem.getItemList();
    notes.forEach((note) => {
        var li = document.createElement("li");
        li.innerText = note.title;
        itemList.appendChild(li);
    })
    // styling part -> showing style of the last saved fontfamily
    textarea.style.fontFamily = `${localStorage.getItem('fontfamily')}`;
    textarea.style.fontSize= `${localStorage.getItem('fontsize')}`;
    textarea.style.color = `${localStorage.getItem('fontcolor')}`;
})

// Styling Part
function sizechange(e) {
    textarea.style.fontSize = `${e.value}px`;
    localStorage.setItem("fontsize", e.target.innerText);
}

fontlist.addEventListener("click", (e) => {
    if(e.target.innerText != "") {
        textarea.style.fontFamily = `${e.target.innerText}`;
        localStorage.setItem("fontfamily", e.target.innerText);
    }
})

colorlist.addEventListener("click", (e) => {
    if(e.target.innerText != "") {
        textarea.style.color = `${e.target.innerText}`;
        localStorage.setItem("fontcolor", e.target.innerText);
    }
})

search.addEventListener("keydown", function() {
  var li = document.querySelectorAll("#item-list li");
  for(var i = 0; i < li.length; i++) {
    if(li[i].innerText.toLowerCase().indexOf(search.value.toLowerCase()) > -1) {
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";
    }
  }
})

// if textarea does not ahve any textarea
function textBackground() {
  var textarea = document.getElementById("textarea");
  textarea.style.backgroundImage = "url('')";
}

function responsive() {
  var sidebar = document.getElementById("sidebar");
  var main = document.getElementById("main");
  sidebar.style.left = "0px";
  sidebar.style.width = "250px";
}

function resizeResponsive() {
  var sidebar = document.getElementById("sidebar");
  var main = document.getElementById("main");
  if(window.innerWidth > 1000) {
    sidebar.style.width = "20%";
    sidebar.style.left = "0px";
    sidebar.style.position = "relative";
  }
  if(window.innerWidth < 1000) {
    sidebar.style.left = "-250px";
    sidebar.style.position = "absolute";
    main.style.width = "100%";
  }
}

document.body.addEventListener("click", function(e) {
  var id = e.target.id;
  if(id == "sidebar" || id == "search" || id == "item-list" || id == "responsivebtn") {
  } else {
    if(window.innerWidth < 1000) {
      document.getElementById("main").style.width = "100%";
      sidebar.style.left = "-350px";
      sidebar.style.position = "absolute";
    }
  }
})
