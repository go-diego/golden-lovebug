export default function PageTitleHeading(props) {
    const {title} = props;
    return (
        <h1 className="title is-family-primary has-text-centered is-display-4 is-size-1-mobile">
            {title}
        </h1>
    );
}
