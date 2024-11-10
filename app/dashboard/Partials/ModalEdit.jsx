import Button from "@/app/components/button/Button";
import InputText from "@/app/components/input/InputText";
import Label from "@/app/components/input/Label";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputError from "@/app/components/input/InputError";

function ModalEdit({ isOpen = null, onClose = () => {} }) {
  const router = useRouter();
  const [isError, setError] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    if (!isOpen) return setData({});
    setData(isOpen);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    Object.keys(data.detail).forEach((key) => {
      if (!data.detail[key]?.trim()) {
        errors[key] = "input is empty"; // Pesan error
      }
    });

    setError(errors); // Set error state
    if (Object.keys(errors).length > 0) {
      console.error("Validation errors:", errors);
      return; // Jangan lanjut jika ada error
    }

    const body = {
      [data.keyData]: { ...data.detail },
    };
    try {
      const response = await axios.post("/api/data-wedding", body);
      if (response.status === 200) {
        onClose();
        router.refresh();
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <input
        type="checkbox"
        checked={isOpen !== null}
        onChange={() => {}}
        className="modal-toggle"
      />
      <div
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm px-4"
        role="dialog"
      >
        <form onSubmit={handleSubmit} className="modal-box max-w-xl">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-bold">Edit Data {data?.title}!</h3>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
          <div className="w-full flex flex-col gap-4">
            {data?.detail &&
              Object.keys(data.detail).map((key) => (
                <Label
                  key={key}
                  label={key.includes("_") ? key.split("_").join(" ") : key}
                >
                  <InputText
                    name={key}
                    error={isError?.[key]}
                    value={data.detail[key] ?? ""}
                    onChange={(e) =>
                      setData((form) => ({
                        ...form,
                        detail: {
                          ...form.detail,
                          [e.target.name]: e.target.value,
                        },
                      }))
                    }
                    placeholder={`ex: ${isOpen?.detail[key] ?? "-"}`}
                  />
                  <InputError message={isError?.[key]} />
                </Label>
              ))}
          </div>
          <div className="modal-action">
            <Button
              type="button"
              variant="error"
              onClick={onClose}
              className="w-32"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-32">
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ModalEdit;
