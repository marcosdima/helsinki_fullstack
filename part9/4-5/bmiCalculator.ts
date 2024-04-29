console.log("Calculator...");
interface ParameterValues {
    height: number;
    mass: number;
}

enum Classification {
    Low=18.5,
    Normal=24.9,
    Overweight=30,
    Obesity
}

const calculateBmi = (params: ParameterValues): string  =>  {
    const { mass, height } = params;
    if (height == 0) throw Error(`Height can't be zero...`);
    const heightInMeters = height / 100;
    const bmi = mass / (heightInMeters ** 2);
    
    let message = '';
    
    if (bmi < Classification.Low) message = `Low (unhealthy weight)`;
    else if (bmi < Classification.Normal) message = `Normal (healthy weight)`;
    else if (bmi < Classification.Overweight) message = `Overweight (unhealthy weight)`;
    else message = `Obesity (unhealthy weight)`;

    return message;
};

const parseArguments = (args: string[]): ParameterValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[3]),
        mass: Number(args[2])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
}

try {
    console.log(calculateBmi(parseArguments(process.argv)));
  } catch (error: unknown) {
    let errorMessage = 'Error: '
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }