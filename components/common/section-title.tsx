import React from "react";

type SectionTitleType = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleType) => {
  return <div className="font-bold text-2xl m-3">{title}</div>;
};

export default SectionTitle;
