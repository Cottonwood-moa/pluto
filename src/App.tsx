import { useEffect, useState } from "react";
import { getItems, SearchResponse } from "./api";
import Item from "./components/item";
import useKeyPress from "./hooks/useKeyPress";
import "./styles/globals.css";

function App() {
  const [match, setMatch] = useState(0);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const [query, setQuery] = useState("");
  const [queryRes, setQueryRes] = useState<SearchResponse>();
  useEffect(() => {
    if (downPress && queryRes?.hits?.length === match) setMatch(1);
    else if (downPress) setMatch((prev) => prev + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downPress]);
  useEffect(() => {
    if (upPress && match === 1) setMatch(queryRes?.hits?.length as number);
    else if (upPress) setMatch((prev) => prev - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upPress]);
  useEffect(() => {
    setMatch(0);
    if (!query) return;
    const timeOutId = setTimeout(
      () => getItems(query).then((res) => setQueryRes(res)),
      200
    );
    return () => clearTimeout(timeOutId);
  }, [query]);
  return (
    <>
      <div className="w-[100vw] min-h-[100vh] pt-[10rem] flex flex-col items-center bg-slate-800">
        <input
          className="w-[30rem] p-4"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && queryRes ? (
          <div className="text-white w-[30rem] bg-slate-600">
            {queryRes?.hits?.map((item, index) => {
              return (
                <Item
                  key={item?.objectID}
                  item={item}
                  active={index === match - 1 ? true : false}
                />
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
