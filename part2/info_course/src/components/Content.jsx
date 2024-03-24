import Parts from "./Parts";
import Total from "./Total";

const Content = ({ parts }) => {
    return (
        <>
            <Parts parts={parts} />
            <Total total={parts.reduce(
                (acc, value) => acc + value.exercises,
                0
            )} />
        </>
    );
};

export default Content;