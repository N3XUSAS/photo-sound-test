"use client";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const photos = [
    "../photos/ArklysLow.jpg",
    "../photos/AvysLow.jpg",
    "../photos/ErelisLow.jpg",
    "../photos/GaidysLow.jpg",
    "../photos/Juru_kiaulyteLow.jpg",
    "../photos/karve2.jpg",
    "../photos/KatėLow.jpg",
    "../photos/KiaulėLow.jpg",
    "../photos/ŠuoLow.jpg",
    "../photos/TigrasLow.jpg",
  ];

  const audio = [
    "../audio/Arklys.mp3",
    "../audio/Avys.wav",
    "../audio/Erelis.mp3",
    "../audio/Gaidys.wav",
    "../audio/Juru_kiaulyte.wav",
    "../audio/Karve.wav",
    "../audio/Katė.wav",
    "../audio/Kiaulė.mp3",
    "../audio/Šuo.wav",
    "../audio/Tigras2.wav",
  ];
  const router = useRouter();
  const [random, setRandom] = useState("");
  const [seen, setSeen] = useState(0);
  const identical = useRef(10);
  const notIdentical = useRef(10);
  const answeredIdenticalCorrect = useRef(0);
  const answeredIdenticalIncorrect = useRef(0);
  const answeredNotIdenticalCorrect = useRef(0);
  const answeredNotIdenticalIncorrect = useRef(0);
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("") : undefined
  );
  const seenRef = useRef(0);
  const prevAudio = useRef(-1);
  const prevPhoto = useRef(-1);
  const time = useRef(0);
  const [started, setStarted] = useState(false);
  let answeredIdenticalCorrectTimes = [];
  let answeredIdenticalIncorrectTimes = [];
  let answeredNotIdenticalCorrectTimes = [];
  let answeredNotIdenticalIncorrectTimes = [];
  let cnt = 0;

  const handleKeyPress = (event: any) => {
    if (started === false) {
      setStarted(true);
    }
    if (
      seenRef.current === 1 &&
      (event.key === "ArrowLeft" || event.key === "ArrowRight")
    ) {
      const reactionTime = Date.now() - time.current;
      console.log(reactionTime);
      if (
        event.key === "ArrowRight" &&
        prevAudio.current === prevPhoto.current &&
        reactionTime < 2000
      ) {
        cnt += 1;
        answeredIdenticalCorrectTimes.push(reactionTime);
        answeredIdenticalCorrect.current += 1;
        identical.current -= 1;
      } else if (
        event.key === "ArrowRight" &&
        prevAudio.current !== prevPhoto.current &&
        reactionTime < 2000
      ) {
        cnt += 1;
        notIdentical.current -= 1;
        answeredIdenticalIncorrectTimes.push(reactionTime);
        answeredIdenticalIncorrect.current += 1;
      } else if (
        event.key === "ArrowLeft" &&
        prevAudio.current === prevPhoto.current &&
        reactionTime < 2000
      ) {
        cnt += 1;
        identical.current -= 1;
        answeredNotIdenticalIncorrectTimes.push(reactionTime);
        answeredNotIdenticalIncorrect.current += 1;
      } else if (
        event.key === "ArrowLeft" &&
        prevAudio.current !== prevPhoto.current &&
        reactionTime < 2000
      ) {
        cnt += 1;
        notIdentical.current -= 1;
        answeredNotIdenticalCorrectTimes.push(reactionTime);
        answeredNotIdenticalCorrect.current += 1;
      }
      console.log(
        answeredIdenticalCorrectTimes.length,
        answeredIdenticalIncorrectTimes.length,
        answeredNotIdenticalCorrectTimes.length,
        answeredNotIdenticalIncorrectTimes.length
      );
      setSeen(0);
      seenRef.current = 0;
      const random = Math.floor(Math.random() * 10);
      const random2 = Math.floor(Math.random() * 2);
      prevAudio.current = random;
      console.log(identical.current, notIdentical.current);
      let other = -1;
      if (cnt === 20) {
        localStorage.setItem(
          "data1",
          JSON.stringify(answeredIdenticalCorrectTimes)
        );
        localStorage.setItem(
          "data2",
          JSON.stringify(answeredIdenticalIncorrectTimes)
        );
        localStorage.setItem(
          "data3",
          JSON.stringify(answeredNotIdenticalCorrectTimes)
        );
        localStorage.setItem(
          "data4",
          JSON.stringify(answeredNotIdenticalIncorrectTimes)
        );
        router.push("/answers");
      }
      if (random2 === 0 && notIdentical.current > 0) {
        other = Math.floor(Math.random() * 10);
      } else if (random2 === 1 && identical.current === 0) {
        other = Math.floor(Math.random() * 10);
      } else if (random2 === 0 && notIdentical.current === 0) {
        other = random;
      } else if (random2 === 1 && identical.current > 0) {
        other = random;
      }
      prevPhoto.current = other;

      if (audioRef.current !== undefined) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audio[random]);
      if (cnt < 20) {
        audioRef.current.play();
      }

      setTimeout(() => {
        setSeen(1);
        seenRef.current = 1;
        //time.current = Date.now();
      }, 1500);
      //const random = Math.floor(Math.random() * 10);
      setRandom(photos[other]);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  React.useEffect(() => {
    if (started) {
      const random = Math.floor(Math.random() * 10);
      const random2 = Math.floor(Math.random() * 2);
      prevAudio.current = random;
      let other = -1;
      if (random2 === 1 && identical.current > 0) {
        other = random;
      } else if (random2 === 0 && notIdentical.current > 0) {
        other = Math.floor(Math.random() * 10);
      } else if (random2 === 1 && identical.current === 0) {
        other = Math.floor(Math.random() * 10);
      } else if (random2 === 0 && notIdentical.current === 0) {
        other = random;
      }
      prevPhoto.current = other;
      if (audioRef.current !== undefined) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audio[random]);
      audioRef.current.play();
      setTimeout(() => {
        setSeen(1);
        seenRef.current = 1;
      }, 1500);
      setRandom(photos[other]);
    }
  }, [started]);

  useEffect(() => {
    if (seen) {
      time.current = Date.now();
    }
  }, [seen]);

  return (
    <main>
      <div className="flex h-screen w-full flex-col items-center bg-[#fbf6ef]">
        <h1 className="my-5 text-3xl font-medium text-black">
          Garso įtakos vaizdo suvokimui testas
        </h1>

        {!started ? (
          // <button
          //   className="btn w-64 rounded-full btn-outline btn-ghost my-40"
          //   onClick={() => setStarted(true)}
          // >
          //   Pradėti
          // </button>
          <text className="mx-2 h-6 ">
            Paspauskite kairę arba dešinę rodyklę kad pradėtumėte
          </text>
        ) : (
          <>
            <div style={{ opacity: seen }}>
              <img src={random} style={{ width: 700, height: 500 }} />
            </div>
            <div className="flex my-10 justify-center">
              <div className="mx-2 w-32 h-6 flex flex-row rounded-lg justify-center align-items-center bg-[#ead7c3]">
                {/* <div style={{ flexDirection: "column" }}> */}
                <BsArrowLeft style={{ marginTop: 4 }} />
                <text className="mx-2 h-6 ">NE</text>
              </div>
              <div className="mx-2 w-32 h-6 flex flex-row rounded-lg justify-center align-items-center bg-[#ead7c3]">
                <text className="mx-2 h-6 ">TAIP</text>
                <BsArrowRight style={{ marginTop: 4 }} />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
