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
type ExerciseParams = {
    dairyExercise: Array<number>,
    target: number
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

const calculateExercises = (params: ExerciseParams): Result => {
    const { target, dairyExercise } = params
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

const parseArgs = (): ExerciseParams => {
    const args: String[] = process.argv
    if (args.length < 4) throw Error("Not enough argument")
    
    const [first, second, third, ...rest] = args
    const target = Number(third)
    if (isNaN(target)) throw Error("Arguments can only be numbers!")

    let dairyExercise: Array<number> = []
    rest.forEach((number) => {
        const n = Number(number)
        if (isNaN(n)) throw Error("Arguments can only be numbers!")
        dairyExercise.push(n)
    })

    return { target, dairyExercise }
}

try {
    console.log(calculateExercises(parseArgs()));
  } catch (error: unknown) {
    let errorMessage = 'Error: '
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }