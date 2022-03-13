import TaskTable from "./TaskTable";
import { useState, useEffect } from 'react';

const Home = () => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updateComponent, setUpdateComponent] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [todos, setTodos] = useState(null);


    useEffect(() => {   
        fetch('http://127.0.0.1:8000/todos')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setTodos(data);
            console.log(data);
        })
    }, [updateComponent])

    const handlePost = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/todos', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, description})
        })
        .then(() => {
            console.log('New todo added');
            setUpdateComponent('Task added');
            setUpdateComponent('');
            setId('');
            setTitle('');
            setDescription('');
        })
    }

    const fillForm = (todoId, title, description) => {
        setId(todoId);
        setTitle(title);
        setDescription(description);
        setIsEdit(true);
    }

    const handleUpdate = () => {
        fetch('http://127.0.0.1:8000/todos/' + id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id, title, description})
        })
        .then(() => {
            console.log('Task updated');
            setId('');
            setTitle('');
            setDescription('');
            setIsEdit(false);
            setUpdateComponent('Task updated');
            setUpdateComponent('');
        })
    }

    const handleDelete = (todoId) => {
        fetch('http://127.0.0.1:8000/todos/' + todoId, {
            method: 'DELETE'
        })
        .then(() => {
            setUpdateComponent('Task deleted');
            setUpdateComponent('');
        })
    }

    return (
        <div className="home my-3">
            {/* Task Details Form */}
            <div className="card shadow task-form-table">
                <div className="card-body">
                    <h5 className="text-center">Enter task details</h5>
                    <form onSubmit={handlePost}>
                        <input type="hidden" value={id} />
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input 
                                type="text"
                                className="form-control form-control-sm"
                                id="title"
                                required="required"
                                placeholder="Enter task title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea 
                                className="form-control form-control-sm"
                                id="description"
                                required="required"
                                row="3"
                                placeholder="Enter task description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            {!isEdit && <button className="btn btn-sm btn-primary">Add</button>}
                        </div>
                    </form>
                    {isEdit && 
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-secondary" onClick={() => {
                                setIsEdit(false)
                                setTitle('');
                                setDescription('');
                            }}>Cancel</button>
                        <button className="btn btn-sm btn-primary ms-2" onClick={() => {
                            handleUpdate()
                        }}>Edit</button>
                    </div>}
                </div>
            </div>
            {/* Task Details Form */}

            {/* Task Details Table */}
            <div className="card shadow task-form-table mt-5">
                <div className="card-body">
                    <div className="d-flex justify-content-between border-bottom pb-3">
                        <h5>My Tasks</h5>
                        <input type="search" className="form-control form-control-sm w-50" placeholder="Search task" />
                    </div>
                    <table className="table" id="taskTable">
                        <tbody>
                            <tr>
                               {todos && todos.map(todo => (
                                    <TaskTable todo={todo} fillForm={fillForm} handleDelete={handleDelete} key={todo.id} />
                               )) } 
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Task Details Table */}
            
        </div>
    );
}

export default Home;