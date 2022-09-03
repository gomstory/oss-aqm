import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../redux/projectReducer';
import { getProject } from '../../services'

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

function SearchProject() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [popup, setPopup] = useState(false)
  const popupRef = useRef()
  const dispatch = useDispatch()

  useOnClickOutside(popupRef, () => {
    setPopup(false)
  })

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

      {popup && searchResult &&
        <ul ref={popupRef} className='search-result'>
          {searchResult
            .map(project =>
              <li className='search-item' key={project.id} onClick={() => onSelectProject(project)}>
                <img className='icon' src={project.logo} />
                <span>{project.id}</span>
                <span>{project.stars} ⭐</span>
              </li>)}
        </ul>}
    </div>
  );
}

export default SearchProject;