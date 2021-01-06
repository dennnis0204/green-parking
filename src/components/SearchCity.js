import _ from 'lodash';
import React, { useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from 'semantic-ui-react';
import {
  selectCity,
  cleanQuery,
  startSearch,
  finishSearch,
  updateSelection,
} from '../actions';

const SearchCity = () => {
  const dispatch = useDispatch();
  const { loading, results, value } = useSelector((state) => state.searchCity);
  const cities = useSelector((state) => state.cities);
  const timeoutRef = useRef();

  const handleSearchChange = useCallback(
    (e, data) => {
      clearTimeout(timeoutRef.current);
      dispatch(startSearch(data.value));
      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch(cleanQuery());
          return;
        }
        const re = new RegExp(_.escapeRegExp(data.value), 'i');
        const isMatch = (result) => re.test(result.title);
        dispatch(finishSearch(_.take(_.filter(cities, isMatch), 5)));
      }, 300);
    },
    [cities, dispatch]
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Search
      loading={loading}
      onResultSelect={(e, data) => {
        dispatch(updateSelection(data.result.title));
        dispatch(selectCity(data.result));
      }}
      onSearchChange={handleSearchChange}
      resultRenderer={resultRenderer}
      results={results}
      minCharacters={3}
      showNoResults={false}
      value={value}
      open={value.length > 2}
    />
  );
};

const resultRenderer = ({ title }) => [
  <div key="content" className="content">
    {title && <div>{title}</div>}
  </div>,
];

export default SearchCity;
