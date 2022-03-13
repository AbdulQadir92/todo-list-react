import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'

const TaskTable = ({ todo, fillForm, handleDelete }) => {
   
    return (
        <td className="px-0 mt-2">
            <div className="d-flex justify-content-between">
                <h5>{todo.title}</h5>
                <div className="d-flex">
                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => {fillForm(todo.id, todo.title, todo.description)}} />
                    <FontAwesomeIcon icon={faXmark} className="text-danger ps-2" onClick={() => {handleDelete(todo.id)} } />
                </div>
            </div>
            <div>{todo.description}</div>
        </td>
    );
}

export default TaskTable;