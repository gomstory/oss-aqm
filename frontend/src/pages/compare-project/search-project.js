import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../redux/projectReducer';
import { getProject } from '../../services'

function SearchProject() {
  const [project, setProject] = useState([])
  const searchElm = useRef()
  const [popup, setPopup] = useState(false)
  const dispatch = useDispatch()
  const onSelect = (proj) => {
    if (proj) {
      dispatch(addProject(proj))
      setPopup(false)
    }
  }

  const onChange = (event) => {
    let term = searchElm.current.value
    if (term.length >= 3) {
      setProject([])
      getProject(term)
        .then(items => {
          setProject(items)
          setPopup(true)
        })
    } else {
      setPopup(false)
    }
  }

  const onFocus = (event) => {
    if (project.length == 0) {
      getProject()
        .then(items => {
          setProject(items)
          setPopup(true)
        })
    } else {
      setPopup(true)
    }
  }

  const onClose = (event) => {
    setPopup(false)
    clearSearch()
    event.preventDefault()
  }

  const clearSearch = () => {
    searchElm.current.value = ""
  }

  return (
    <div className='search-bar'>
      <input
        type="text"
        ref={searchElm}
        className="search"
        onInput={onChange}
        onFocus={onFocus}
        placeholder="Search Github Project">
      </input>

      {popup && <button className='close' onClick={onClose}>Clear</button>}

      {popup && project &&
        <ul className='search-result'>
          {project
            .map(project =>
              <li className='search-item' key={project.id} onClick={() => onSelect(project)}>
                <img className='icon' src={project.logo} />
                <span>{project.id}</span>
                <span>{project.star}⭐</span>
              </li>)}
        </ul>}
    </div>
  );
}

export default SearchProject;