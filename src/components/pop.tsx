import { useEffect, useState } from "react";
import { Child, getComment } from "../api";
import { IProps } from "./item";
interface IPopProps extends IProps {
  setPop: React.Dispatch<React.SetStateAction<boolean>>;
}
function Pop({ item, setPop }: IPopProps) {
  const [comments, setComments] = useState<Child[]>([]);
  useEffect(() => {
    getComment(item?.objectID).then((res) => setComments(res?.children));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-slate-900 bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
        <div className="w-[50%] min-h-[50%] bg-white text-gray-800 text-2xl font-bold p-12">
          <div className="text-right pr-8 " onClick={() => setPop(false)}>
            <span className="cursor-pointer">close</span>
          </div>
          <p>
            Title(Link) :
            <a href={item?.url} className="text-blue-400 hover:text-blue-600">
              {item?.title}
            </a>
          </p>
          <p>Author : {item?.author}</p>
          <p>Points : {item?.points}</p>
          <p>1st depth comments</p>
          <div className="font-normal text-base h-[15rem] overflow-y-scroll divide-y-2">
            {comments?.length === 0 ? (
              <p className="font-bold text-2xl text-center pt-12">loading...</p>
            ) : (
              comments?.map((comment) => {
                return (
                  <div
                    key={comment?.id}
                    dangerouslySetInnerHTML={{ __html: comment?.text }}
                  ></div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pop;
