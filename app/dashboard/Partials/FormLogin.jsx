"use client";
import Button from "@/app/components/button/Button";
import InputGroup from "@/app/components/input/InputGroup";
import InputText from "@/app/components/input/InputText";
import Label from "@/app/components/input/Label";
import { LockKeyhole, User } from "lucide-react";
import { useState } from "react";

function FormLogin() {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ user: "", pass: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col gap-4 border border-neutral/70 hover:border-neutral rounded-lg shadow-lg p-4"
    >
      <p className="text-xl font-medium pb-2 border-b-2 border-neutral">
        Login
      </p>
      <Label label="Username / Email">
        <InputGroup>
          <User
            size={22}
            className="opacity-50 group-focus-within:opacity-100"
          />
          <InputText
            value={formData.user}
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
            disabled={isLoading}
          />
        </InputGroup>
      </Label>
      <Label label="Password">
        <InputGroup>
          <LockKeyhole
            size={22}
            className="opacity-50 group-focus-within:opacity-100"
          />
          <InputText
            type="password"
            value={formData.user}
            onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
            disabled={isLoading}
          />
        </InputGroup>
      </Label>
      <div className="flex justify-end gap-4 mt-4">
        <Button type="submit" loading={isLoading} className="w-32">
          Login
        </Button>
      </div>
    </form>
  );
}

export default FormLogin;
