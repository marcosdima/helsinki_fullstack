type Result = { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
type Rating = {
    rating: number,
    description: string
}

const higherThanZero = (array: Array<number>): number => {
    return array.reduce(
        (previusValue, currentValue) => currentValue > 0 ? 1 + previusValue : previusValue,
        0
    );
}

const setSverage = (array: Array<number>): number => {
    const total = array.reduce(
        (previusValue, currentValue) =>  currentValue + previusValue,
        0
    );
    return total / array.length;
}

const setRating = (target: number, reality: number): Rating => {
    let rating = 0;
    let description = '';

    if (reality >= target) {
        rating = 1;
        description = "Nice...";
    } else if (reality >= target / 2) {
        rating = 2;
        description = "Not too bad but could be better";
    } else {
        rating = 1;
        description = "I'm disapointing bro :'(";
    }

    return { rating, description }
}

const calculateExercises = (dairyExercise: Array<number>, target: number): Result => {
    if (target === 0) throw Error("Target can't be zero")
    const average = setSverage(dairyExercise)
    const { rating, description } = setRating(target, average)

    const result = {
        periodLength: dairyExercise.length,
        trainingDays: higherThanZero(dairyExercise),
        target,
        rating,
        ratingDescription: description,
        average,
        success: average >= target
    } 


    return result; 
}

try {
    console.log(calculateExercises([3, 10, 2, 4.5, 0, 3, 1], 21));
  } catch (error: unknown) {
    let errorMessage = 'Error: '
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }