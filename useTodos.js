import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReduce/todoReducer';




const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);


    /* 
    //neceito ejecutar algo cuando mis todos cambia, cuando esto cambia
    tengo que ejecutar un efecto secundario
    el local Storge no guarrda objetos solo strings
     */

    useEffect(() => {
        /* API que viene ya en JavaScript localStorge*/
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    /* 
    neceisto leer esos todos y necesito serializarlos
    */

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,

        }

        dispatch(action);
    }

    const handleDeleteTodo = (id) => {

        dispatch({
            type: '[Todo] Remove Todo',
            payload: id,
        });
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    }



    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleDeleteTodo,
        handleToggleTodo,
        handleNewTodo
    }

}
