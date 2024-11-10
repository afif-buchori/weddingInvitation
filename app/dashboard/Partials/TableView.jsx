"use client";
import React, { useState } from "react";
import ModalEdit from "@/app/dashboard/Partials/ModalEdit";
import Button from "@/app/components/button/Button";
import { PencilLine } from "lucide-react";

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
    { detail: weddingData.maleInfo, keyData: "maleInfo", title: "Male" },
    { detail: weddingData.femaleInfo, keyData: "femaleInfo", title: "Female" },
    {
      detail: weddingData.contractInfo,
      keyData: "contractInfo",
      title: "Akad Nikah / Marriage contract",
    },
    {
      detail: weddingData.receptInfo,
      keyData: "receptInfo",
      title: "Resepsi Nikah / Marriage Reception",
    },
  ];

  const [isOpen, setOpen] = useState(null);

  return (
    <>
      <ModalEdit isOpen={isOpen} onClose={() => setOpen(null)} />
      <h1>Wedding Data</h1>
      <table className="table table-xs sm:table-sm">
        <tbody>
          {dataList.map((item, idx) => (
            <React.Fragment key={idx}>
              <tr>
                <th
                  colSpan={3}
                  className="text-end uppercase text-primary !pt-10"
                >
                  <div className="flex justify-end items-center gap-4">
                    <p>{item.title}</p>
                    <Button
                      onClick={() => setOpen(item)}
                      variant="secondary"
                      size="sm"
                    >
                      <PencilLine size={14} />
                    </Button>
                  </div>
                </th>
              </tr>
              {renderRows(item.detail)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableView;
