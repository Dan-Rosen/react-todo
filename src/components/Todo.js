import React, { Component } from 'react'

import styles from './Todo.module.css'

class Todo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isEditing: false,
            task: this.props.task
        }

        this.toggleForm = this.toggleForm.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    }

    toggleForm() {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    handleRemove() {
        this.props.removeTodo(this.props.id)
    }

    handleUpdate(evt) {
        evt.preventDefault()
        this.props.updateTodo(this.props.id, this.state.task)
        this.setState({ isEditing: false })
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleToggle() {
        this.props.toggleTodo(this.props.id)
    }

    render() {
        let result
        if (this.state.isEditing) {
            result = (
                <div className={styles.Todo}>
                    <form
                        className={styles.TodoEdit}
                        onSubmit={this.handleUpdate}
                    >
                        <input
                            type='text'
                            value={this.state.task}
                            name='task'
                            onChange={this.handleChange}
                        />
                        <button>Save</button>
                    </form>
                </div>
            )
        } else {
            result = (
                <div className={styles.Todo}>
                    <li
                        className={`${
                            this.props.completed && styles.Completed
                        } ${styles.TodoTask}`}
                        onClick={this.handleToggle}
                    >
                        {this.props.task}
                    </li>
                    <div className={styles.TodoButtons}>
                        <button onClick={this.toggleForm}>
                            <i className='fa fa-pen'></i>
                        </button>
                        <button onClick={this.handleRemove}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </div>
                </div>
            )
        }
        return result
    }
}

export default Todo
