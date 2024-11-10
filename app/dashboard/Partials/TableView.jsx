"use client";
import React from "react";

function TableView({ weddingData = {} }) {
  const renderRows = (data) => {
    return Object.keys(data).map((key) => (
      <tr key={key}>
        <td className="align-top capitalize">
          {key.includes("_") ? key.split("_").join(" ") : key}
        </td>
        <td className="w-fit align-top min-w-2 !px-1">:</td>
        <td className="align-top">{data[key]}</td>
      </tr>
    ));
  };

  const dataList = [
    { detail: renderRows(weddingData.maleInfo), title: "Male" },
    { detail: renderRows(weddingData.femaleInfo), title: "Female" },
    {
      detail: renderRows(weddingData.contractInfo),
      title: "Akad Nikah / Marriage contract",
    },
    {
      detail: renderRows(weddingData.receptInfo),
      title: "Resepsi Nikah / Marriage Reception",
    },
  ];
  return (
    <>
      <h1>Wedding Data</h1>
      <table className="table table-xs sm:table-sm">
        <tbody>
          {dataList.map((item, idx) => (
            <React.Fragment key={idx}>
              <tr>
                <th colSpan={3} className="text-end uppercase text-primary">
                  {item.title}
                </th>
              </tr>
              {item.detail}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableView;
