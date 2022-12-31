import React from "react";
import ReactMarkdown from "react-markdown";

export default function MarkedContent(props) {
  const { source, options } = props;
  return (
    <div className="content">
      <ReactMarkdown children={source} />
    </div>
  );
}
