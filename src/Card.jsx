import { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ card, id }) => {
  const cardRef = useRef();
  const menuRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      )
        setIsVisible(false);
    };

    window.addEventListener("mouseup", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full aspect-square px-3 text-center rounded-xl bg-slate-400 flex justify-center items-center font-bold relative"
    >
      <div>{card.question}</div>
      <div
        ref={menuRef}
        className="w-7 h-7 flex justify-center items-center text-center text-slate-50 absolute z-10 top-2 right-3 font-bold text-3xl cursor-pointer hover:text-gray-500 transition ease-in delay-150 duration-300"
        onMouseDown={() => setIsVisible(true)}
      >
        ...
      </div>
      {isVisible && (
        <div
          ref={cardRef}
          className="absolute bg-white rounded-lg top-12 right-0 z-50"
        >
          <div className="w-20 py-2">Edit</div>
          <div className="w-20 py-2 border-t-2" onClick={handleDelete}>Delete</div>
        </div>
      )}
    </div>
  );
};

export default Card;
