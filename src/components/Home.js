import TaskTable from './TaskTable';
import { useState, useEffect } from 'react';
import GetRequest from './GetRequest';

const Home = () => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [updateComponent, setUpdateComponent] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const todos = GetRequest('http://127.0.0.1:8000/todos', updateComponent);

    useEffect(() => {
       
    }, [updateComponent])

    const formatDate = (date) => {
        let day = date.slice(date.lastIndexOf('-')+1)
        let month = date.slice(date.indexOf('-')+1, date.lastIndexOf('-'));
        let year = date.slice(0, date.indexOf('-'));

        let _date = day + '-' + month + '-' + year;
        return _date;
    }

    const formatTime = (time) => {
        let hour = time.slice(0, time.indexOf(':'));
        let minutes = time.slice(time.indexOf(':'));
       
        if(hour > '12'){
            hour = Number(hour);
            hour = hour - 12;
            hour = '0' + hour.toString(); 
            minutes += ' PM';
        } else if(hour === '12') {
            minutes += ' PM';
        } else if(hour === '00'){
            hour = '12';
            minutes += ' AM';
        } else {
            minutes += ' AM';
        }

        let _time = hour + minutes;
        return _time;
    }

    const handlePost = (e) => {
        e.preventDefault();

        let _date = formatDate(date);
        let _time = formatTime(time);

        fetch('http://127.0.0.1:8000/todos', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, description, date: _date, time: _time})
        })
        .then(() => {
            console.log('Task added');
            setUpdateComponent('Task added');
            setUpdateComponent('');
            setId('');
            setTitle('');
            setDescription('');
            document.querySelector('#date').value = '';
            document.querySelector('#time').value = '';
        })
    }

    const setInputDate = (date) => {
        let year = date.slice(date.lastIndexOf('-')+1)
        let month = date.slice(date.indexOf('-')+1, date.lastIndexOf('-'))
        let day = date.slice(0, date.indexOf('-'))
        document.querySelector('#date').value =  year + '-' + month + '-' + day;
    }

    const setInputTime = (time) => {
        let hour = time.slice(0, time.indexOf(':'));
        let minutes = time.substr(time.indexOf(':')+1, 2);

        if(time.includes('PM')){
            hour = Number(hour);
            if(hour === 12){
                hour = 12;
            } else {
                hour += 12;
            }
        } else if(time.includes('AM') && Number(hour) === 12) {
            hour = '00';
        }

        document.querySelector('#time').value = hour + ':' + minutes;

    }

    const fillForm = (todoId, title, description, date, time) => {
        setInputDate(date);
        setInputTime(time);
        setId(todoId);
        setTitle(title);
        setDescription(description);
        setIsEdit(true);
        document.querySelector('#task-form').scrollIntoView({behavior: "smooth"});
    }

    const handleUpdate = () => {

        let date = document.querySelector('#date').value;
        let time = document.querySelector('#time').value;

        let _date = formatDate(date);
        let _time = formatTime(time);

        fetch('http://127.0.0.1:8000/todos/' + id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id, title, description, date: _date, time: _time})
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
            console.log('Task deleted');
            setUpdateComponent('Task deleted');
            setUpdateComponent('');
        })
    }

    const handleSearch = (e) => {
        let value = e.target.value.toLowerCase();

        let tds = document.querySelectorAll('#taskTable td');
        tds.forEach(function(item) {
            let str = item.textContent.toLowerCase();
            if(str.indexOf(value) !== -1){
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        })
    }

    return (
        <div className="home my-3">
            {/* Task Details Form */}
            <div className="card shadow task-form-table secondary-bg-3">
                <div className="card-body" id="task-form">
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
                        <div className="mb-3 d-flex">
                            <div className="w-50">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input 
                                    type="date" 
                                    className="form-control form-control-sm" 
                                    id="date" 
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="w-50 ms-3">
                                <label htmlFor="time" className="form-label">Time</label>
                                <input 
                                    type="time" 
                                    className="form-control form-control-sm" 
                                    id="time" 
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            {!isEdit && <button className="btn btn-sm primary-btn">Add</button>}
                        </div> 
                    </form>
                    {isEdit && 
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm secondary-btn-1" onClick={() => {
                                setIsEdit(false)
                                setTitle('');
                                setDescription('');
                                document.querySelector('#date').value = '';
                                document.querySelector('#time').value = '';
                            }}>Cancel</button>
                        <button className="btn btn-sm primary-btn ms-2" onClick={() => {
                            handleUpdate()
                            document.querySelector('#date').value = '';
                            document.querySelector('#time').value = '';
                        }}>Edit</button>
                    </div>}
                </div>
            </div>
            {/* Task Details Form */}

            {/* Task Details Table */}
            <div className="card shadow task-form-table mt-5 secondary-bg-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between border-bottom pb-3">
                        <h5>My Tasks</h5>
                        <input type="search" className="form-control form-control-sm w-50" placeholder="Search task" onChange={handleSearch} />
                    </div>
                    <table className="table" id="taskTable">
                        <tbody>
                            <tr>
                               {todos && todos.map(todo => (
                                    <TaskTable todo={todo} fillForm={fillForm} handleDelete={(e) => {handleDelete(e)}} key={todo.id} />
                               ))}
                               {todos.length === 0 && <td>No tasks to show</td>}
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