import { useEffect, useState } from "react"
import Alert from "./alert"
import List from "./list"

const getLocalStorage = () => {
    let list = localStorage.getItem('list')
    if (list) {
        return(list = JSON.parse(localStorage.getItem('list')))
    } else {
        return []
    }
}

export default function Content() {
    const [padding, setPadding] = useState('pt-3')
    const [list, setList] = useState(getLocalStorage())
    const [editID, setEditID] = useState(null)
    const [alert, setAlert] = useState({show:false, msg:'', type:''})
    const [name, setName] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const handleSubmit = (e, id) => {
        e.preventDefault();
        if (!name) {
            showAlert(true, 'danger', 'please enter value')
        }  else if (alert && isEditing) {
            setList(
                list.map((item) => {
                    if (item.id === editID) {
                        return {...item, title:name}
                    }
                    return item
                })
            )
            setName('')
            setEditID(null)
            setIsEditing(false)
            showAlert(true, 'success', 'value changed')
        }   else {
            showAlert(true, 'success', 'new item added!')
            const newItem = ({ id: id, title: name})
            const isItemExist = list.filter(i => i.id === newItem.id).length
            if (isItemExist) {
                showAlert(true, 'danger', 'value already exists')
                return
            } else {
                setList([...list, newItem])
                setName('')
                setIsEditing(false)
            }
    }
}
    const showAlert = (show = 'false', type="", msg="") => {
        setAlert({show, msg, type})
    }
    const removeItem = (id) => {
        showAlert(true, 'danger', 'item removed')
        setList(list.filter((item) => item.id !== id))
    }
    const editItem = (id) => {
        const specificItem = list.find((item) => item.id === id)
        setIsEditing(true)
        setEditID(id)
        setName(specificItem.title)
    }
    const clearList = () => {
        showAlert(true, 'danger', 'empty-list')
        setList([])
    }
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))  
        console.log(list);
    }, [list])  

    return(
        <>
        <h1 className="mt-3">Welcome to the grocery store</h1>
            <section className="section-center d-flex justify-content-center">
                <div className={`card shadow mt-5 ${padding}`}>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            { alert.show && <Alert {...alert} list={list} removeAlert={showAlert} />}
                            <div className="d-flex">
                                <input
                                className="form-control me-4"
                                type="text"
                                value={name}
                                placeholder="key in food stuffs"
                                onChange={(e) => setName(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary">
                                    { isEditing ? 'edit' : 'Add'}
                                </button>
                            </div>
                        </form>
                        {list.length > 0 && (
                            <article>
                            <div className="list-container mt-4">
                                <List items={list} removeItem={removeItem} editItem={editItem} />
                                <button onClick={clearList} className="clear-btn btn btn-outline-danger mt-5">
                                    Empty list
                                </button>
                            </div>
                            </article>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}