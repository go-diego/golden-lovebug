import {Link} from "../server/routes";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import format from "date-fns/format";

const Article = styled.article`
    position: relative;
`;

export default function PostMediaObject({title, image, description, publish_date, slug}) {
    return (
        <Article className="media">
            <div className="media-left">
                <figure className="image is-64x64">
                    <img className="is-object-fit-cover" src={image} alt={title} />
                </figure>
            </div>
            <div className="media-content">
                <div className="content">
                    <strong>{title}</strong>
                    <br />
                    <small className="is-size-7">
                        {format(new Date(publish_date), "MMM DD, YYYY")}
                    </small>
                    <br />
                    <ReactMarkdown source={description} />
                </div>
            </div>
            <div className="media-right">
                <Link
                    prefetch
                    href={{pathname: "/writing-behind-the-scenes", query: {slug}}}
                    as={`/writing-behind-the-scenes/${slug}`}>
                    <a className="is-stretched-link">
                        <span className="icon is-small">
                            <i className="fas fa-arrow-right" />
                        </span>
                    </a>
                </Link>
            </div>
        </Article>
    );
}
