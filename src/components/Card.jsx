import { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditCard from "./EditCard";

const Card = ({ card, id, isShareIsvisible, messagesToSend, setMessagesToSend }) => {
  const [data, setData] = useState(card);
  const cardSettingsRef = useRef();
  const cardRef = useRef();
  const menuRef = useRef();
  const shareRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5200/cards/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsDeleted(true);
    } catch (e) {
      console.log("Try again");
    }
  };

  const handleFlip = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && !isVisible && !shareRef.current) {
      setShowAnswer(!showAnswer);
    }
  };

  const handleShare = () => {
    let newMessage = [...messagesToSend, card].sort((a, b) => a.id - b.id);
    console.log(newMessage);
    setMessagesToSend(newMessage);
  }

  useEffect(() => {
    const handleClickOutsideSettings = (e) => {
      if (
        cardSettingsRef.current &&
        !cardSettingsRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      )
        setIsVisible(false);
    };

    const handleClickOutsideCard = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowAnswer(false);
      }
    };

    window.addEventListener("mouseup", handleClickOutsideSettings);
    window.addEventListener("mouseup", handleClickOutsideCard);

    return () => {
      window.removeEventListener("mouseup", handleClickOutsideSettings);
      window.removeEventListener("mouseup", handleClickOutsideCard);
    };
  }, []);

  return (
    <>
      {!isDeleted && (
        <>
          <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={` aspect-square ${isShareIsvisible ? "min-w-[25%]" : " min-w-[30%]"}`}
          >
            <div
              ref={cardRef}
              className={`w-full h-full px-3 text-center rounded-xl bg-slate-400 flex grow justify-center items-center font-bold relative
      card ${showAnswer ? "flip" : ""}`}
              onMouseDown={handleFlip}
            >
              <div className="front px-3">{data.question}</div>
              <div className="back px-3">{data.answer}</div>
              <div
                ref={menuRef}
                className="menu w-7 h-7 flex justify-center items-center text-center text-slate-50 absolute z-10 top-2 right-3 font-bold text-3xl cursor-pointer hover:text-gray-500 transition ease-in delay-150 duration-500"
                onMouseDown={() => setIsVisible(true)}
              >
                ...
              </div>
              {isVisible && (
                <div
                  ref={cardSettingsRef}
                  className="w-20 absolute top-12 rounded-lg right-0 z-50"
                >
                  <div
                    className="py-2 bg-white rounded-t-lg"
                    onMouseDown={() => {
                      setShowEdit(true);
                      setIsVisible(false);
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className="py-2 bg-red-800 text-white rounded-b-lg border-t-2"
                    onMouseDown={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              )}
            {isShareIsvisible && <input type="checkbox" ref={shareRef} id={card.id} onMouseDown={handleShare} className="absolute top-2 -left-5 w-5 h-5" />}
            </div>
          </div>
          {showEdit && (
            <EditCard card={data} setData={setData} setShowEdit={setShowEdit} />
          )}
        </>
      )}
    </>
  );
};

export default Card;
