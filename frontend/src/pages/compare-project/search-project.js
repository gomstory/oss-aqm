import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../redux/projectReducer';
import { getProject } from '../../services'

function SearchProject() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [popup, setPopup] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchResult([])
      getProject(searchTerm)
        .then(items => {
          setSearchResult(items)
          setPopup(true)
        })
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const onSelectProject = (proj) => {
    if (proj) {
      dispatch(addProject(proj))
      setPopup(false)
    }
  }

  const onFocus = (event) => {
    if (searchResult.length > 0) {
      setPopup(true)
    }
  }

  const onInput = (event) => {
    const value = event.target.value
    setSearchTerm(value)
  }

  const onClear = (event) => {
    setPopup(false)
    setSearchTerm("")
    setSearchResult([])
    event.preventDefault()
  }

  return (
    <div className='search-bar'>
      <input
        type="text"
        value={searchTerm}
        className="search"
        onInput={onInput}
        onFocus={onFocus}
        placeholder="Search Github Project">
      </input>

      {popup && <button className='close' onClick={onClear}>Clear</button>}

      {popup && searchResult &&
        <ul className='search-result'>
          {searchResult
            .map(project =>
              <li className='search-item' key={project.id} onClick={() => onSelectProject(project)}>
                <img className='icon' src={project.logo} />
                <span>{project.id}</span>
                <span>{project.star}⭐</span>
              </li>)}
        </ul>}
    </div>
  );
}

export default SearchProject;