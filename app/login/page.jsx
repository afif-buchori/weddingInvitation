"use client";
import Button from "@/app/components/button/Button";
import InputError from "@/app/components/input/InputError";
import InputGroup from "@/app/components/input/InputGroup";
import InputText from "@/app/components/input/InputText";
import Label from "@/app/components/input/Label";
import axios from "axios";
import { LockKeyhole, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState({});
  const [errFetch, setErrFetch] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.user.value;
    const password = e.target.pass.value;
    setError({});
    setErrFetch("");
    const errors = {};
    if (!username) errors.user = "user / email is empty";
    if (!password) errors.pass = "password is empty";
    if (Object.keys(errors).length > 0) return setError(errors);

    setLoading(true);
    try {
      const res = await axios.post("/api/auth", {
        username,
        password,
      });
      if (res.status === 200) router.push("/dashboard");
    } catch (error) {
      setErrFetch("*Login Failed");
      if (error.response) {
        console.error("Error:", error.response.status, error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col gap-4 border border-neutral/70 hover:border-neutral rounded-lg shadow-lg p-4 my-20"
    >
      <p className="text-xl font-medium pb-2 border-b-2 border-neutral">
        Login
      </p>
      <Label label="Username / Email">
        <InputGroup error={isError?.user || errFetch}>
          <User
            size={22}
            className="opacity-50 group-focus-within:opacity-100"
          />
          <InputText name="user" disabled={isLoading} />
        </InputGroup>
        <InputError message={isError?.user} />
      </Label>
      <Label label="Password">
        <InputGroup error={isError?.pass || errFetch}>
          <LockKeyhole
            size={22}
            className="opacity-50 group-focus-within:opacity-100"
          />
          <InputText type="password" name="pass" disabled={isLoading} />
        </InputGroup>
        <InputError message={isError?.pass} />
      </Label>

      <div className="flex flex-col items-end mt-4">
        <InputError message={errFetch} />
        <Button type="submit" loading={isLoading} className="w-32">
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginPage;
