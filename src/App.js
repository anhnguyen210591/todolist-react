import React from "react";
import "./styles.css";
/*
Todo app structure

TodoApp
	- TodoHeader
	- TodoList
    - TodoListItem #1
		- TodoListItem #2
		  ...
		- TodoListItem #N
	- TodoForm
*/

class TodoHeader extends React.Component {
  render() {
    return <h1>Todo list</h1>;
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items
    });
  }
  render() {
    return (
      <div>
        <h5>Todo</h5>
        <ul>
          {this.state.items.map(item => {
            return (
              <li>
                {item.id}. {item.text}{" "}
                <input
                  key={item.id}
                  type="checkbox"
                  checked={item.done}
                  onChange={() => this.props.handleClick(item.id)}
                />
                <button onClick={() => this.props.removeClick(item.id)}>
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class TodoForm extends React.Component {
  render() {
    return (
      <div>
        <h5>Add task List</h5>
        <ul>
          <input
            type="text"
            value={this.props.currentValue}
            onChange={this.props.handleInput}
          />
          <button type="submit" onClick={this.props.handleAdd}>
            ADD
          </button>
          <button onClick={this.props.filterDone}>Filter Done</button>
          <button onClick={this.props.filterTodo}>Filter Todo</button>
        </ul>
      </div>
    );
  }
}

let origin = [{ id: 1, text: "learn react", done: true }];

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "",
      todoList: origin
    };
  }

  handleInput = e => {
    this.setState({ currentValue: e.target.value });
    console.log(e.target.value);
  };

  handleAdd = e => {
    const newArray = this.state.todoList;
    newArray.push({
      id: this.state.todoList.length + 1,
      text: this.state.currentValue,
      done: false
    });
    console.log("newArray", newArray);
    this.setState({ ...this.state, todoList: newArray });
  };

  handleClick = id => {
    const newArray = this.state.todoList.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    origin = origin.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    console.log("handleClick", newArray);
    this.setState({ todoList: newArray });
  };

  removeClick = id => {
    const removeArray = this.state.todoList.filter(item => item.id !== id);
    this.setState({ todoList: removeArray });
  };

  filterDone = () => {
    const doneArray = origin.filter(item => item.done === true);
    this.setState({ todoList: doneArray });
  };

  filterTodo = () => {
    const todoArray = origin.filter(item => item.done === false);
    this.setState({ todoList: todoArray });
  };

  render() {
    return (
      <div>
        <TodoHeader />
        <TodoForm
          constructor={this.state.currentValue}
          handleInput={this.handleInput}
          handleAdd={this.handleAdd}
          filterDone={this.filterDone}
          filterTodo={this.filterTodo}
        />
        <TodoList
          items={this.state.todoList}
          handleClick={this.handleClick}
          removeClick={this.removeClick}
        />
      </div>
    );
  }
}

export default TodoApp;
