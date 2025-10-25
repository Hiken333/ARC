export class CalculatorUtils {
  // Вычисление математики
  static calculate(expression: string): number {
    try {
      // Очистка говна
      const sanitized = expression
        .replace(/[^0-9+\-*/(). ]/g, '')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
      
      return Function(`"use strict"; return (${sanitized})`)()
    } catch (error) {
      throw new Error('Неверное выражение')
    }
  }

  static isOperator(char: string): boolean {
    return ['+', '-', '*', '/', '×', '÷'].includes(char)
  }

  static isValidExpression(expression: string): boolean {
    try {
      this.calculate(expression)
      return true
    } catch {
      return false
    }
  }
}
