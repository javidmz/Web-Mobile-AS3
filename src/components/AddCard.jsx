import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const AddCard = ({ setIsAddCardVisible }) => {
    const addCardRef = useRef();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [status, setStatus] = useState('Learned');

    const handleCreate = async () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
    
        const latest = year + "/" + month + "/" + day;

        const newCard = {
          question,
          answer,
          status,
          "lastUpdated": latest,
        };
    
        try {
            await fetch("http://localhost:5200/cards", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newCard),
            });
            toast.success("Flashcard Added")
            setTimeout(() => {
                setIsAddCardVisible(false);
            }, 1000);
        } catch(e) {
            console.log("Error occured!");
        }
      };

      useEffect(() => {
        const handleClickOutside = (e) => {
          if (addCardRef.current && !addCardRef.current.contains(e.target)) {
            setIsAddCardVisible(false);
          }
        };
    
        window.addEventListener("mousedown", handleClickOutside, true);
    
        return () => window.removeEventListener("mousedown", handleClickOutside, true);
      }, []);
    

    return(
        <div
        ref={addCardRef}
        className="absolute left-1/2 -translate-x-1/2 z-20 h-[400px] w-[350px] bg-white flex flex-col gap-5 items-center rounded-lg px-3"
      >
        <div className="mt-8 text-2xl font-bold">Create Flash Card</div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="question" className="font-bold text-zinc-600">
            Question:
          </label>
          <input
            type="text"
            id="question"
            value={question}
            placeholder="Add Question"
            required
            onChange={(e) => setQuestion(e.target.value)}
            autoComplete="off"
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
            placeholder="Add Answer"
            required
            onChange={(e) => setAnswer(e.target.value)}
            autoComplete="off"
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
        <div className="w-full flex justify-end gap-3">
          <button
            onClick={() => setIsAddCardVisible(false)}
            className="p-3 bg-red-700 text-white rounded-lg hover:opacity-70"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="p-3 bg-lime-800 text-white rounded-lg hover:opacity-70"
          >
            Create
          </button>
        </div>
      </div>
      )
}

export default AddCard;