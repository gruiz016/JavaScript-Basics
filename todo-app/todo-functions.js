// Read exsisting todo's from local storage
const getSavedTodo = function () {
  const todoJSON = localStorage.getItem('todo')

  if (todoJSON !== null) { 
    return JSON.parse(todoJSON)
  } else {
    return []
  }
}

// Save todo to local storage

const saveTodos = function (todo) {
  localStorage.setItem('todo', JSON.stringify(todo))
}

// Generate todo DOM

const generateTodoDom = function (todo) {
  const todoEl = document.createElement('p')
  todoEl.textContent = todo.body
  return todoEl
}

// Generate summary DOM

const generateSummaryDom = function (incompleteTodo) {
  const summary = document.createElement('h2')
  summary.textContent = `You have ${incompleteTodo.length} thing to-do today.`
  return summary
}

// Render application todos

const renderText = function (todo, searchText) {
  let filteredTodo = todo.filter(function (todo) {
    const textMatch = todo.body.toLowerCase().includes(searchText.text.toLowerCase())
    const hideCompletedMatch = !searchText.hidecompleted || !todo.completed
    debugger
    return textMatch && hideCompletedMatch
  })

  const incompleteTodo = filteredTodo.filter(function(todo) {
    return !todo.completed
  })
  
  document.querySelector('#todos').innerHTML = ''
  document.querySelector('#todos').appendChild(generateSummaryDom(incompleteTodo))  

  filteredTodo.forEach(function(todo) {
    document.querySelector('#todos').appendChild(generateTodoDom(todo))
  })
}