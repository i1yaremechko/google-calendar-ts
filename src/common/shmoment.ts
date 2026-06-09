type ShmomentUnit = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds';

const getMethodsNames = {
  years: 'getFullYear',
  months: 'getMonth',
  days: 'getDate',
  hours: 'getHours',
  minutes: 'getMinutes',
  seconds: 'getSeconds',
  milliseconds: 'getMilliseconds',
} as const;

const setMethodsNames = {
  years: 'setFullYear',
  months: 'setMonth',
  days: 'setDate',
  hours: 'setHours',
  minutes: 'setMinutes',
  seconds: 'setSeconds',
  milliseconds: 'setMilliseconds',
} as const;

interface ShmomentCalculator {
  add(units: ShmomentUnit, value: number): ShmomentCalculator;
  subtract(units: ShmomentUnit, value: number): ShmomentCalculator;
  result(): Date;
}

const shmoment  = (date: Date | string | number): ShmomentCalculator => {
  let result = new Date(date);

  const calculator: ShmomentCalculator = {
    add(units: ShmomentUnit, value: number) {
      const getMethod = getMethodsNames[units];
      const setMethod = setMethodsNames[units];

      const currentUnitValue = (result[getMethod] as () => number)();
      (result[setMethod] as (v: number) => number)(currentUnitValue + value);

      result = new Date(result);
      return this;
    },
    subtract(units: ShmomentUnit, value: number) {
      return this.add(units, -value);
    },
    result() {
      return result;
    },
  };

  return calculator;
};

export default shmoment;