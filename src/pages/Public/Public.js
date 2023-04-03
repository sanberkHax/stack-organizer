import { Routes, Route } from "react-router-dom";
import { NotFound } from "../NotFound";
import { Home } from "./components/Home";
export const Public = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
