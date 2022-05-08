// method to create a new item..
//fetch('https://red-door-shopping-list.herokuapp.com/shoppingList/api/new/buster%20nuster',  {method: 'post'})

let uncheckedList = document.getElementById('shoppingList');
let checkedList = document.getElementById('checkedShoppingList');

function addListItem(name, listId, checked) {

    // create all the initial html for each item
    let li = document.createElement('li');
    // "flex justify-around items-center".split(' ').forEach((className) => {
    //     li.classList.add(className)
    // })
    const textSpanElement = document.createElement('span')
    textSpanElement.innerText = name;
    const deleteButton = document.createElement('button')
    deleteButton.classList.add("delete-mode-button")
    deleteButton.classList.add("not-visible")
    // add styles to button
    "m-2 text-white bg-red-700 hover:bg-red-600 font-medium rounded-lg text-sm px-2 py-0.5 pb-1 text-center items-center max-w-max".split(' ').forEach((className) => {
        deleteButton.classList.add(className)
    })
    deleteButton.innerText = 'x'
    li.appendChild(deleteButton)
    li.appendChild(textSpanElement)

    if (checked === true){
        textSpanElement.classList.toggle('strikethrough');
        checkedList.appendChild(li);
    } else {
        uncheckedList.appendChild(li);
    }

    // add event listeners..
    textSpanElement.addEventListener('click', ()=> {
        let hasClassStrikethrough = textSpanElement.classList.contains('strikethrough');
        if (hasClassStrikethrough){
        fetch('https://red-door-shopping-list.herokuapp.com/shoppingList/api/update/'+listId+'/uncheck')
        textSpanElement.classList.toggle('strikethrough');
        } else {
            fetch('https://red-door-shopping-list.herokuapp.com/shoppingList/api/update/'+listId+'/check')
        textSpanElement.classList.toggle('strikethrough');
        }
    })

    deleteButton.addEventListener('click', () => {
        fetch('https://red-door-shopping-list.herokuapp.com/shoppingList/api/remove/'+listId)
        li.classList.add("not-visible");
    })
}

function deleteMode() {
    document.querySelectorAll('.delete-mode-button').forEach((buttonElement) => {
        buttonElement.classList.toggle("not-visible");
    })
   
}


fetch("https://red-door-shopping-list.herokuapp.com/shoppingList/api/itemlist")
    .then(response => response.json())
    .then(data => {
        console.log(data)



        for (var shoppingListItem of data.shoppingList) {

            const name = shoppingListItem.name;
            const listId = shoppingListItem._id;
            const checked = shoppingListItem.checked;

            if(!name){
                continue;
            }
           addListItem(name, listId, checked)
           

        }

        

    });

    function addGroceryListItem(event) {
        let newListItem = document.getElementById('listItemInput').value;
        let newListItemURL = 'https://red-door-shopping-list.herokuapp.com/shoppingList/api/new/' + newListItem;
        event.target[0].value = '';
        fetch(newListItemURL, {method: 'post'})
        .then(response => response.json())
        .then(shoppingListItem => {
            
            console.log(shoppingListItem)
        
            const name = shoppingListItem.name;
            const listId = shoppingListItem._id;
            const checked = shoppingListItem.checked;

            if(!name){
                return;
            }

           addListItem(name, listId, checked)

        });
    }
    let newGroceryListItem = document.getElementById('addItem');
    newGroceryListItem.addEventListener('submit', addGroceryListItem);

let deleteModeButton = document.getElementById('deleteModeButton');
deleteModeButton.addEventListener('click', deleteMode);