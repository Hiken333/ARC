export class CalculatorUtils {
  // Вычисление математического выражения
  static calculate(expression: string): number {
    try {
      // Очистка от опасных символов
      const sanitized = expression
        .replace(/[^0-9+\-*/(). ]/g, '')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
      
      // TODO: заменить на парсер выражений для безопасности
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
