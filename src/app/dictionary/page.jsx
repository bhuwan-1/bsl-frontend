"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dictionary() {
  const [englishWords, setEnglishWords] = useState([]);
  const [dzongkhaWords, setDzongkhaWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordDetails, setWordDetails] = useState({});

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/words");
        const englishWords = Object.values(data).map((item) => item[0]);
        const dzongkhaWords = Object.values(data).map((item) => item[1]);
        setEnglishWords(englishWords);
        setDzongkhaWords(dzongkhaWords);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWords();
  }, []);

  const handleWordClick = async (word) => {
    setSelectedWord(word);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/signs/${word.toLowerCase()}`
      );
      setWordDetails(data);
    } catch (error) {
      console.error("Error fetching word details:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4 lg:w-1/5 flex justify-center bg-primary overflow-y-auto text-white">
        <div>
          <h1 className="text-xl md:text-2xl font-bold p-5">Available Words</h1>
          {englishWords.map((word, index) => (
            <div
              key={index}
              onClick={() => handleWordClick(word)}
              className="py-2 px-5 cursor-pointer font-semibold text-lg md:text-xl hover:bg-primary-dark"
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow p-5 md:p-5 flex justify-center">
        <div>
          {!selectedWord && (
            <div className="flex justify-center items-center h-[700px]">
              <p className="text-center text-lg md:text-xl font-bold">
                Click on the words on the left pane to see the demo
              </p>
            </div>
          )}
          {selectedWord && (
            <>
              <div className="flex flex-col lg:items-center md:flex-row items-center justify-evenly p-2 font-semibold">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl md:text-3xl mb-1">Word:</h1>
                  <h2 className="text-xl md:text-2xl">{selectedWord}</h2>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl mb-2">ཚིག།</h1>
                  <h2 className="text-xl md:text-2xl">{dzongkhaWords[englishWords.indexOf(selectedWord)]}</h2>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-center m-4">
                Demo / འགྲེམས་སྟོན།
              </h1>
              <img
                src={wordDetails.url}
                alt="Sign language demo"
                className="lg:w-[640px] lg:h-[480px] md:w-full sm:w-full rounded-lg"
              />
              <p className="italic text-sm md:text-base font-semibold p-1 text-center">Source: Bhutanese Sign Language Dictionary</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
