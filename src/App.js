import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import SingleCard from "./components/SingleCard";
const cardImages = [
  { src: "/img/helmet-1.png" , matched:false },
  { src: "/img/potion-1.png" , matched:false },
  { src: "/img/ring-1.png" , matched:false },
  { src: "/img/scroll-1.png" , matched:false },
  { src: "/img/shield-1.png" , matched:false },
  { src: "/img/sword-1.png" , matched:false },
];
function App() {
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled,setDisabled]=useState(false);
  const [matches,setMatches]=useState(6)
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [showModal,setShowModal]=useState(false)
  //start a new game
  useEffect(()=>{
    shuffleCards()
  },[])

  

  //Shuffling card
  const shuffleCards = () => {
    setShowModal(false)
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null)
    setChoiceTwo(null)
    setMatches(6)
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  const resetTurn=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev=>prev+1);
    setDisabled(false)
  }
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src===choiceTwo.src){
        setCards(prev=>{
          return prev.map(card=>{
            if(card.src===choiceOne.src){
              setMatches((prev)=>prev-0.5)
              return {...card,matched:true};
            }else{
              return card;
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(()=>{
          resetTurn()
        },1000)
      }
      
    }
  },[choiceOne,choiceTwo])
  useEffect(()=>{
    if(matches===0){
      setTimeout(() => {
        
        setShowModal(true)
      }, 1000)
      
    }
  },[matches])
  return (
    <div className="App">
      {showModal && <Modal>
          {turns<15  && <h2>You did it in just {turns} moves🤯. That is a greaaatt scoreee!! You have an amazing memory</h2>}
          {turns>=15 && turns<=20 && <h2>
            You did it in {turns} moves🤩. You have a potential to do better . Give this a try again!
          </h2>}
          {turns>20 && <h2>
            You did it in {turns} moves😟. You should have almonds dailyyy!! Keep practicing to improve your score.
          </h2>}

          <br />
          <button onClick={shuffleCards}>Play again ❤️</button>
          <button onClick={()=>{setShowModal(false)}}>Close 🥺</button>
        </Modal>}
      <h1>Magic Match</h1>
      <h3>Matches left:{matches}</h3>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard card={card} key={card.id} handleChoice={handleChoice} flipped={card===choiceOne || card===choiceTwo || card.matched}
          disabled={disabled}/>
        ))}
      </div>
      <h3>
        No of turns taken : {turns}
      </h3>
    </div>
  );
}

export default App;
