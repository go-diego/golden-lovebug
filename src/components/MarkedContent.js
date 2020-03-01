import ReactMarkdown from "react-markdown";

export default function MarkedContent(props) {
    const {source, options} = props;
    return (
        <div className="content">
            <ReactMarkdown source={source} />
        </div>
    );
}
