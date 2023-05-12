import React from "react";
import { useParams } from "react-router-dom";

const initialFilter = {
    page: 1,
    limit: 20,
    q: "",
  };

const IndicatorScale = () => {
  const params = useParams();

  return <div>IndicatorScale</div>;
};

export default IndicatorScale;
