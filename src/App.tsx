import './App.css';
import {Todolist} from "./Todolist";
import {useEffect, useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type ObjectType = {
    title: string
    filter:FilterValuesType
    tasks: Array<TaskType>
    students: Array<string>}


export type CurrentToDosType = ObjectType & {
    toDoListID: string
   }



function App() {

//     let todolistID1 = v1()
//     let todolistID2 = v1()
//
//     let [todolists, setTodolists] = useState<TodolistType[]>([
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//     ])
//
//     let [tasks, setTasks] = useState<TasksStateType>({
//         [todolistID1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//         ],
//         [todolistID2]: [
//             {id: v1(), title: 'Rest API', isDone: true},
//             {id: v1(), title: 'GraphQL', isDone: false},
//         ],
//     })
// const todolistId1 = v1()
// const todolistId2 = v1()

    const toDoFromServer:ObjectType[]= [
        {
            title: "todolist1",
            filter:'all',
            tasks: [{id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false}],
            students:[
                "Sophia Bennett",
             "Ethan Harrison",
             "Ava Fisher",
             "Mason Jenkins",
             "Isabella Warren",
             "Liam Foster",
             "Amelia Owens",
             "Benjamin Hunt",
             "Charlotte Russell",
             "Lucas Thompson",
             "Harper Jenkins",
             "Elijah Reed",
             "Avery Cooper",
             "Scarlett King",
             "Henry Nelson",
             "Grace Morris",
             "Leo Harrison",
             "Luna Dixon",
             "Oliver Campbell",
             "Emily Simmons",]
        },
        {
            title: "todolist2",
            filter:'all',
            tasks: [{id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false}],
            students:[
                 "Baker Gray",
                 "Collins Jenkins",
                 "Foster Warren",
                 "Hudson Fletcher",
                 "Hayes Bennett",
                 "Bennett James",
                 "Reed Charlotte",
                 "Morgan Lucas",
                 "Owens Harper",
                 "Harrison Elijah",
                 "Dixon Avery",
                 "Campbell Scarlett",
                 "Morris Henry",
                 "Sullivan Grace",
                 "Thompson Leo",
                 "Jenkins Luna",
                 "Williams Parker",
                 "Jenkins Morgan",
                 "Fisher Turner",
                 "Price Nelson",]
        }
    ]

const [toDos, setToDos] = useState<CurrentToDosType[]>([])


useEffect(()=>{setToDos(toDoFromServer.map(el=> ({...el,toDoListID:v1()})))},[])



    const removeTask = (taskId: string, todolistId: string) => {
        const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        setTasks(newTodolistTasks)
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTodolistTasks)
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        }
        setTasks(newTodolistTasks)
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId ? {...tl, filter} : tl
        })
        setTodolists(newTodolists)
    }
    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)

        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {toDos.map((tl) => {

                const allTodolistTasks = tl.tasks
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                }

                return <Todolist
                    key={tl.toDoListID}
                    todolistId={tl.toDoListID}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;
