import React, { useEffect, useState } from "react";

function HomeScreen() {
  const [Data, setData] = useState([]);
  const [question, setQuestion] = useState(1);
  const [time, setTime] = useState(10);
  const [score, setScore] = useState(0);

  console.log(Data,'adfkasdflj');

  useEffect(() => {
    async function fetchapi() {
      const data = await fetch(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
      );
      const res = await data.json();
      setData(res.results);
    }
    fetchapi();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => prev - 1);
  
    }, 1000);
    if(time===0){
      clearInterval(id)
      setQuestion((prev) => prev + 1);
      setTime(10)
    }
    return () => clearInterval(id);
  }, [time]);

  // useEffect(() => {
  //   if (time === 0 && question < 10) {
  //     setQuestion((prev) => prev + 1);
  //     setTime(10);
  //   }
  // }, [ question, score]);

  return (
    <div>
      <section className="w-screen h-screen">
        <div className="flex justify-center align-bottom w-full h-full">
          <div>
            <h1 className="text-3xl font-semibold">Quiz App</h1>
            {question <= 10 && Data.map((items, i) => {
              if (i === question - 1) {
                return (
                  <div key={i}>
                    <h2 className="text-xl font-semibold py-4">
                      Question {question}
                    </h2>
                    <p>{items.question}</p>
                    <ul className="my-2">
                      {items.incorrect_answers.map((value, id) => {
                        return (
                          <li key={id}>
                            <button
                              className="border-2 px-4 py-1 mb-2 rounded-xl"
                            >
                              {value}
                            </button>{" "}
                          </li>
                        );
                      })}
                      <li>
                        <button
                          onClick={() => {setScore(score + 1)
                            setQuestion(question + 1)
                            setTime(10);
                          }}

                          className="border-2 px-4 py-1 mb-2 rounded-xl"
                        >
                          {items.correct_answer}
                        </button>{" "}
                      </li>
                    </ul>
                    <p>
                      Time left: {time} seconds{" "}
                      <span className="ml-4">
                        <button
                          onClick={() => {
                            setQuestion(question + 1);
                            setTime(10);
                          }}
                          className="border-2 px-4 py-1 mb-2 rounded-xl"
                        >
                          Skip Question
                        </button>
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            })}
            {question > 10 && (
              <div>
                <h2>Congratulations! Quiz Completed!</h2>
                <p>Your Score: {score} out of 10</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;
