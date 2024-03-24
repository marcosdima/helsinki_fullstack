import Parts from "./Parts";
import Total from "./Total";

const Content = ({ parts }) => {
    let sumOfExercises = 0;
    for (let part of parts) sumOfExercises += part.exercises;


    return (
        <>
            <Parts parts={parts} />
            <Total total={sumOfExercises} />
        </>
    );
};

export default Content;