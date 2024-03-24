const Parts = ({ parts }) => {
    return (
        <>
        {parts.map(part => 
            <p key={part.id}>
                {part.name} {part.exercises} 
            </p>
        )}
        </>
    );
};

export default Parts;