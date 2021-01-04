import React from 'react'

function Pagination(props) {
    return (<nav>
        <ul className="pagination pagination-lg">
            <li onClick={props.currentPage === 1 ? null : () => props.changePage(props.currentPage - 1)} className={props.currentPage === 1 ? "page-item disabled" : "page-item"}>
                <span className="page-link">Previous</span>
            </li>
            {new Array(props.numberPages > 5 ? 5 : props.numberPages).fill().map((item, index) => <li onClick={() => props.changePage(index + 1)} key={index} className={props.currentPage === index + 1 ? "page-item active" : "page-item"}><span className="page-link">{index + 1}</span></li>)}
            <li onClick={props.currentPage === props.numberPages ? null : () => props.changePage(props.currentPage + 1)} className={props.currentPage === props.numberPages ? "page-item disabled" : "page-item"}>
                <span className="page-link">Next</span>
            </li>
        </ul>
    </nav>)
}

export default Pagination