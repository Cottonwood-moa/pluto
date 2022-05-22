import { useEffect, useState } from "react";
import { Hit } from "../api";
import useKeyPress from "../hooks/useKeyPress";
import Pop from "./pop";
export interface IProps {
  item: Hit;
  active?: boolean;
}

function Item({ item, active }: IProps) {
  const [pop, setPop] = useState(false);
  const popHandle = () => {
    setPop((prev) => !prev);
  };
  const enterPress = useKeyPress("Enter");
  useEffect(() => {
    if (active) setPop(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterPress]);
  return (
    <>
      {pop ? <Pop item={item} setPop={setPop} /> : <></>}

      <div
        className={`my-1 px-2 cursor-pointer hover:bg-slate-900 ${
          active ? "bg-slate-900" : null
        }`}
        onClick={popHandle}
      >
        {item?.title}
      </div>
    </>
  );
}

export default Item;
