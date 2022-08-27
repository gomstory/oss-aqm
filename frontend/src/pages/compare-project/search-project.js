import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../redux/projectReducer';
import getProject from '../../services/getProject'

function SearchProject() {
  const [project, setProject] = useState([])
  const [popup, setPopup] = useState(false)
  const [term, setTerm] = useState("")
  const dispatch = useDispatch()
  const onSelect = (proj) => {
    if (proj) {
        dispatch(addProject(proj))
        setPopup(false)
        setTerm("")
    }
  }
  
  const onChange = (event) => {    
    setTerm(event.target.value)
    if (term.length >= 3) {
      getProject()
      .then(items => {
        setProject(items)
        setPopup(true)
      })
    } else {
      setPopup(false)
    }
  }

  const onFocus = (event) => {
    onChange(event)
    return false
  }

  const onClose = (event) => {
    setPopup(false)
    setTerm("")
  }

  return (
    <div className='search-bar'>
      <input
        type="text"
        className="search" 
        onChange={onChange} 
        onFocus={onFocus} 
        value={term} 
        placeholder="Search Github Project">
      </input>

      {popup && <button className='close' onClick={onClose}>Clear</button>}

      {popup && project && 
        <ul className='search-result'>
          {project
            .map(project => 
              <li className='search-item' key={project.id} onClick={() => onSelect(project)}>
                <img className='icon' src={project.logo}/>
                <span>{project.id}</span>
                <span>{project.star}⭐</span>
              </li>)}
        </ul>}
    </div>
  );
}

export default SearchProject;