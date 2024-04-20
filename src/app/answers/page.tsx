"use client";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [identicalCorrect, setIdenticalCorrect] = useState(0);
  const [identicalIncorrect, setIdenticalIncorrect] = useState(0);
  const [notIdenticalCorrect, setNotIdenticalCorrect] = useState(0);
  const [notIdenticalIncorrect, setNotIdenticalIncorrect] = useState(0);

  const [identicalCorrectAvg, setIdenticalCorrectAvg] = useState(0);
  const [identicalIncorrectAvg, setIdenticalIncorrectAvg] = useState(0);
  const [notIdenticalCorrectAvg, setNotIdenticalCorrectAvg] = useState(0);
  const [notIdenticalIncorrectAvg, setNotIdenticalIncorrectAvg] = useState(0);

  const [calcIdenticalCorrect, setCalcIdenticalCorrect] = useState(0);
  const [calcIdenticalIncorrect, setCalcIdenticalIncorrect] = useState(0);
  const [calcNotIdenticalCorrect, setCalcNotIdenticalCorrect] = useState(0);
  const [calcNotIdenticalIncorrect, setCalcNotIdenticalIncorrect] = useState(0);
  useEffect(() => {
    let data1;
    let data2;
    let data3;
    let data4;
    let get = localStorage.getItem("data1");
    if (get) {
      data1 = JSON.parse(get);
    }
    get = localStorage.getItem("data2");
    if (get) {
      data2 = JSON.parse(get);
    }
    get = localStorage.getItem("data3");
    if (get) {
      data3 = JSON.parse(get);
    }
    get = localStorage.getItem("data4");
    if (get) {
      data4 = JSON.parse(get);
    }

    console.log(data1, data2, data3, data4);
    setIdenticalCorrect(data1.length);
    setIdenticalIncorrect(data2.length);
    setNotIdenticalCorrect(data3.length);
    setNotIdenticalIncorrect(data4.length);

    let avg1 = data1.reduce((a: number, b: number) => a + b, 0) / data1.length;
    let avg2 = data2.reduce((a: number, b: number) => a + b, 0) / data2.length;
    let avg3 = data3.reduce((a: number, b: number) => a + b, 0) / data3.length;
    let avg4 = data4.reduce((a: number, b: number) => a + b, 0) / data4.length;

    setIdenticalCorrectAvg(Math.round(avg1 * 100) / 100);
    setIdenticalIncorrectAvg(Math.round(avg2 * 100) / 100);
    setNotIdenticalCorrectAvg(Math.round(avg3 * 100) / 100);
    setNotIdenticalIncorrectAvg(Math.round(avg4 * 100) / 100);

    let disp1 =
      data1.length > 1
        ? data1.reduce(
            (sum: number, x: number) => sum + Math.pow(x - avg1, 2),
            0
          ) /
            data1.length -
          1
        : 0;
    let disp2 =
      data2.length > 1
        ? data2.reduce(
            (sum: number, x: number) => sum + Math.pow(x - avg2, 2),
            0
          ) /
            data2.length -
          1
        : 0;
    let disp3 =
      data3.length > 1
        ? data3.reduce(
            (sum: number, x: number) => sum + Math.pow(x - avg3, 2),
            0
          ) /
            data3.length -
          1
        : 0;
    let disp4 =
      data4.length > 1
        ? data4.reduce(
            (sum: number, x: number) => sum + Math.pow(x - avg4, 2),
            0
          ) /
            data4.length -
          1
        : 0;

    setCalcIdenticalCorrect(Math.sqrt(disp1));
    setCalcIdenticalIncorrect(Math.sqrt(disp2));
    setCalcNotIdenticalCorrect(Math.sqrt(disp3));
    setCalcNotIdenticalIncorrect(Math.sqrt(disp4));
  }, []);
  return (
    <main>
      <div className="flex h-screen w-full flex-col items-center bg-[#fbf6ef]">
        <h1 className="my-5 text-3xl font-medium text-black">
          Garso įtakos vaizdo suvokimui testas
        </h1>

        <table className="table w-1/2">
          <thead>
            <tr className="bg-base-200">
              <th>Atsakymas</th>
              <th>Kartų pasirinkta</th>
              <th>Laiko vidurkis</th>
              <th>Laiko standartinis nuokrypis</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>Sutampantys ataskyta teisingai</td>
              <td>{identicalCorrect}</td>
              <td>
                {identicalCorrectAvg ? identicalCorrectAvg + " ms" : "0 ms"}
              </td>
              <td>
                {identicalCorrect
                  ? Math.round(calcIdenticalCorrect * 100) / 100 + " ms"
                  : "0" + " ms"}
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Sutampantys atsakyta neteisingai</td>
              <td>{identicalIncorrect}</td>
              <td>
                {identicalIncorrectAvg ? identicalIncorrectAvg + " ms" : "0 ms"}
              </td>
              <td>
                {identicalIncorrect
                  ? Math.round(calcIdenticalIncorrect * 100) / 100 + " ms"
                  : "0" + " ms"}
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Nesutampantys atsakyta teisingai</td>
              <td>{notIdenticalCorrect}</td>
              <td>
                {notIdenticalCorrectAvg
                  ? notIdenticalCorrectAvg + " ms"
                  : "0 ms"}
              </td>
              <td>
                {notIdenticalCorrect
                  ? Math.round(calcNotIdenticalCorrect * 100) / 100 + " ms"
                  : "0" + " ms"}
              </td>
            </tr>
            <tr>
              <td>Nesutampantys atsakyta neteisingai</td>
              <td>{notIdenticalIncorrect}</td>
              <td>
                {notIdenticalIncorrectAvg
                  ? notIdenticalCorrectAvg + " ms"
                  : "0 ms"}
              </td>
              <td>
                {notIdenticalIncorrect
                  ? Math.round(calcNotIdenticalIncorrect * 100) / 100 + " ms"
                  : "0" + " ms"}
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="btn w-64 rounded-full btn-outline btn-ghost my-40"
          onClick={() => router.push("/")}
        >
          Pradėti iš naujo
        </button>
      </div>
    </main>
  );
}
