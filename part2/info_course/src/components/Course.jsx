import Title from "./Title";
import Content from "./Content";

const Course = ({ course }) => {
    return (
        <>
            <Title text={course.name} />
            <Content parts={course.parts} />
        </>
    );
};

export default Course