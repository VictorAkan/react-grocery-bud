import { FaEdit,FaTrash } from "react-icons/fa"

export default function List({ items, removeItem, editItem }) {
    return(
        <>
            <div>
                {items.map((item) => {
                    const { title,id } = item
                    return(
                        <div className="d-flex justify-content-between" key={id}>
                            <h5>{title}</h5>
                            <div className="setting-icons">
                                <button
                                type="button"
                                className="edit-btn btn text-success"
                                onClick={() => editItem(id)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                type="button"
                                className="deleteBtn btn text-danger"
                                onClick={() => removeItem(id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}