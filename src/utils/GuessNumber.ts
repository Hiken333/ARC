export class GuessNumberGame {
  private targetNumber: number = 0;
  private attempts: number = 0;
  private maxAttempts: number = 10;
  private gameStarted: boolean = false;

  constructor(min: number = 1, max: number = 100, maxAttempts: number = 10) {
    this.maxAttempts = maxAttempts;
    this.startNewGame(min, max);
  }

  // Создание рандом числа
  startNewGame(min: number = 1, max: number = 100): void {
    this.targetNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    this.attempts = 0;
    this.gameStarted = true;
    // console.log('DEBUG: Загаданное число:', this.targetNumber)
  }

  // Чек ввода
  makeGuess(guess: number): {
    result: "win" | "tooHigh" | "tooLow" | "noAttempts";
    attempts: number;
    message: string;
  } {
    if (!this.gameStarted) {
      return {
        result: "noAttempts",
        attempts: this.attempts,
        message: "Игра не начата",
      };
    }

    if (this.attempts >= this.maxAttempts) {
      return {
        result: "noAttempts",
        attempts: this.attempts,
        message: "Исчерпаны все попытки!",
      };
    }

    this.attempts++;

    // Угадал вроде
    if (guess === this.targetNumber) {
      return {
        result: "win",
        attempts: this.attempts,
        message: `Поздравляем! Вы угадали число за ${this.attempts} попыток!`,
      };
    }

    const remaining = this.maxAttempts - this.attempts;

    // Дохуя большое число
    if (guess > this.targetNumber) {
      return {
        result: "tooHigh",
        attempts: this.attempts,
        message: `Слишком большое. Осталось попыток: ${remaining}`,
      };
    } else {
      // Гига маленькое число
      return {
        result: "tooLow",
        attempts: this.attempts,
        message: `Слишком маленькое. Осталось попыток: ${remaining}`,
      };
    }
  }

  getTargetNumber(): number {
    return this.targetNumber;
  }

  getAttempts(): number {
    return this.attempts;
  }

  getRemainingAttempts(): number {
    return this.maxAttempts - this.attempts;
  }

  isGameOver(): boolean {
    return this.attempts >= this.maxAttempts;
  }
}
