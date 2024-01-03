import { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import PageChanger from "../components/PageChanger";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useParams } from "react-router-dom";
import CardsBar from "../components/CardsBar";
import toast from "react-hot-toast";

const Cards = () => {
  const [cards, setCards] = useState();
  const { id } = useParams();
  const [page, setPage] = useState(id ? id : 1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("lastUpdated");
  const [isShareIsvisible, setIsShareVisible] = useState(false);
  const [messagesToSend, setMessagesToSend] = useState([]);
  const [isSaveNewOrder, setIsSaveNewOrder] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setCards((cards) => {
      const oldIndex = cards.findIndex((user) => user.id === active.id);
      const newIndex = cards.findIndex((user) => user.id === over.id);
      return arrayMove(cards, oldIndex, newIndex);
    });
    setIsSaveNewOrder(true);
  };

  const saveNewOrder = () => {
    cards.forEach(async (card, index) => {
      try {
        await fetch(
          `http://localhost:5200/cards/${(page - 1) * 6 + index + 1}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(card),
          }
        );
      } catch (Err) {
        console.log("Try again");
      }
    });
  };

  function getLinkByRelFromLinkHeader(linkHeader, rel) {
    if (linkHeader) {
      const match = linkHeader.match(new RegExp(`<([^>]+)>; rel="${rel}"`));
      if (match) {
        return match[1];
      }
    }

    return null;
  }

  const handleSend = () => {
    if (messagesToSend.length != 0) {
      console.log(JSON.stringify(messagesToSend));
      setIsShareVisible(false);
      toast.success("Message is sent");
      setMessagesToSend([]);
    }
  };

  function extractPageNumber(url) {
    const regex = /_page=(\d+)(?=&|$)/;

    const matches = url.match(regex);
    if (matches && matches[1]) {
      return parseInt(matches[1]);
    } else {
      return null;
    }
  }

  const fetchData = async (url) => {
    console.log(url);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error();
      const result = await response.json();
      setCards(result);
      const lastLink = getLinkByRelFromLinkHeader(
        response.headers.get("Link"),
        "last"
      );
      lastLink ? setTotalPages(extractPageNumber(lastLink)) : "";
    } catch (Err) {
      console.log(Err);
    }
  };

  useEffect(() => {
    if (isSaveNewOrder) {
      saveNewOrder();
      setIsSaveNewOrder(false);
    }
  }, [isSaveNewOrder]);

  useEffect(() => {
    fetchData(
      sort == "lastUpdated"
        ? `http://localhost:5200/cards?_limit=6&_page=${page}&_sort=${sort}&_order=desc`
        : `http://localhost:5200/cards?_limit=6&_page=${page}&_sort=${sort}`
    );
  }, [page]);

  useEffect(() => {
    let searchParams = "";
    searchParams += filter !== "All" ? "&status=" + filter : "";
    searchParams +=
      sort !== "None"
        ? "&_sort=" + sort + sort == "lastUpdated"
          ? "&_order=desc"
          : ""
        : "";
    searchParams += search ? "&q=" + search : "";

    console.log(searchParams);

    if(searchParams)
      fetchData(`http://localhost:5200/cards?_limit=6${searchParams}`);
  }, [filter, sort, search]);

  return (
    <div className="flex flex-col items-center bg-green-800">
      <Header header="CARDS" />
      <CardsBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        filter={filter}
        setFilter={setFilter}
        isShareIsvisible={isShareIsvisible}
        setIsShareVisible={setIsShareVisible}
        setMessagesToSend={setMessagesToSend}
        handleSend={handleSend}
      />
      {cards && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={cards} strategy={rectSortingStrategy}>
            <div
              className={`${
                isShareIsvisible ? "w-[95%]" : "w-4/5"
              } flex flex-wrap justify-center items-center ${
                isShareIsvisible ? "gap-16" : "gap-3"
              } relative mt-16`}
            >
              {cards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  card={card}
                  isShareIsvisible={isShareIsvisible}
                  messagesToSend={messagesToSend}
                  setMessagesToSend={setMessagesToSend}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
      <PageChanger
        page={Number(page)}
        setPage={setPage}
        setSearch={setSearch}
        setFilter={setFilter}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Cards;
