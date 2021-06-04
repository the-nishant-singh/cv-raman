import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

import useStyles from "./SearchStyle";
import videoAction from "../../actions/videoAction";

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const classes = useStyles();

  const onSearchText = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      dispatch(videoAction.list(search));
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [search, dispatch]);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={search}
        onChange={onSearchText}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};

export default Search;
