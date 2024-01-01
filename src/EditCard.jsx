import { useEffect, useRef, useState } from "react";

const EditCard = ({ card, setData, showEdit, setShowEdit }) => {
  const editCardRef = useRef();
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);
  const [status, setStatus] = useState(card.status);
  const [lastUpdated, setLastUpdated] = useState(card.lastUpdated);

  const handleUpdate = async () => {
    const updatedCard = {
      id: card.id,
      question,
      answer,
      status,
      lastUpdated,
    };

    try {
        await fetch(`http://localhost:5200/cards/${card.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCard),
        });
    
        setData(updatedCard);
        setShowEdit(false);
    } catch(e) {
        console.log("Error occured!");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editCardRef.current && !editCardRef.current.contains(e.target)) {
        setShowEdit(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside, true);

    return () => window.removeEventListener("mousedown", handleClickOutside, true);
  }, []);

  return (
    <div
      ref={editCardRef}
      className="absolute -top-16 z-20 h-[450px] w-[350px] bg-white flex flex-col gap-5 items-center rounded-lg px-3"
    >
      <div className="mt-8 text-2xl font-bold">Update Flash Card</div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="question" className="font-bold text-zinc-600">
          Question:
        </label>
        <input
          type="text"
          id="question"
          value={question}
          placeholder="Update Question"
          required
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full outline-none border-2 border-cyan-600 rounded-lg p-2"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="answer" className="font-bold text-zinc-600">
          Answer
        </label>
        <input
          type="text"
          id="answer"
          value={answer}
          placeholder="Update Question"
          required
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full outline-none border-2 border-cyan-600 rounded-lg p-2"
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <label htmlFor="status" className="font-bold text-zinc-600">
          Status
        </label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-1/2 outline-none border-2 border-cyan-600 rounded-lg p-2"
        >
          <option value="learned">Learned</option>
          <option value="want-to-learn">Want To Learn</option>
          <option value="noted">Noted</option>
        </select>
      </div>
      <p className="font-bold text-red-800 ">Last Updated: {lastUpdated}</p>
      <div className="w-full flex justify-end gap-3">
        <button
          onClick={() => setShowEdit(false)}
          className="p-3 bg-red-700 text-white rounded-lg hover:opacity-70"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="p-3 bg-lime-800 text-white rounded-lg hover:opacity-70"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditCard;
