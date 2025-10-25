<template>
  <q-page padding>
    <div class="container">
      <div class="text-center q-mb-lg">
        <h4 class="text-h4 text-weight-bold q-mb-sm">
          Калькулятор
        </h4>
      </div>

      <div class="calculator-wrapper">
        <q-card class="calculator-card">
          <!-- Удачи в проверке -->
          <q-card-section class="result-section">
            <div class="result-display">
              {{ display || '0' }}
            </div>
            <div class="expression-display text-grey-6" v-if="expression">
              {{ expression }}
            </div>
          </q-card-section>

          <!-- Кнопки -->
          <q-card-section>
            <div class="buttons-grid">
              <!-- 1 -->
              <q-btn 
                unelevated 
                color="grey-8" 
                label="C" 
                class="col-span-2"
                @click="clear"
              />
              <q-btn 
                unelevated 
                color="grey-8" 
                label="⌫" 
                @click="backspace"
              />
              <q-btn 
                unelevated 
                color="orange" 
                label="÷" 
                @click="operation('/')"
              />

              <!--  2 -->
              <q-btn unelevated color="grey-5" label="7" @click="append('7')" />
              <q-btn unelevated color="grey-5" label="8" @click="append('8')" />
              <q-btn unelevated color="grey-5" label="9" @click="append('9')" />
              <q-btn 
                unelevated 
                color="orange" 
                label="×" 
                @click="operation('*')"
              />

              <!--  3 -->
              <q-btn unelevated color="grey-5" label="4" @click="append('4')" />
              <q-btn unelevated color="grey-5" label="5" @click="append('5')" />
              <q-btn unelevated color="grey-5" label="6" @click="append('6')" />
              <q-btn 
                unelevated 
                color="orange" 
                label="-" 
                @click="operation('-')"
              />

              <!-- 4 -->
              <q-btn unelevated color="grey-5" label="1" @click="append('1')" />
              <q-btn unelevated color="grey-5" label="2" @click="append('2')" />
              <q-btn unelevated color="grey-5" label="3" @click="append('3')" />
              <q-btn 
                unelevated 
                color="orange" 
                label="+" 
                @click="operation('+')"
              />

              <!--  5 -->
              <q-btn 
                unelevated 
                color="grey-5" 
                label="0" 
                class="col-span-2"
                @click="append('0')"
              />
              <q-btn unelevated color="grey-5" label="." @click="append('.')" />
              <q-btn 
                unelevated 
                color="primary" 
                label="=" 
                size="lg"
                @click="calculate"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { CalculatorUtils } from '@/utils/CaltulatorUtils'

const $q = useQuasar()

const display = ref('0')
const expression = ref('')
let currentOperation: string | null = null
let previousValue: string = ''

// Очистка всех полей
const clear = () => {
  display.value = '0'
  expression.value = ''
  currentOperation = null
  previousValue = ''
}

// Удаление последнего символа
const backspace = () => {
  if (display.value.length > 1) {
    display.value = display.value.slice(0, -1)
  } else {
    display.value = '0'
  }
}

// Добавление цифры
const append = (value: string) => {
  if (display.value === '0') {
    display.value = value
  } else {
    display.value += value
  }
}

// Выбор операции
const operation = (op: string) => {
  // Если уже была операция, сначала вычисляем
  if (currentOperation) {
    calculate()
  }
  previousValue = display.value
  currentOperation = op
  expression.value = `${display.value} ${op}`
  display.value = '0'
}

// Вычисление результата
const calculate = () => {
  if (!currentOperation || !previousValue) return

  const expr = `${previousValue}${currentOperation}${display.value}`
  
  try {
    const result = CalculatorUtils.calculate(expr)
    display.value = String(result)
    expression.value = expr
    currentOperation = null
    previousValue = ''

    $q.notify({
      message: 'Вычислено успешно!',
      type: 'positive',
      position: 'top',
      timeout: 1000
    })
  } catch (error) {
    console.error('Ошибка при вычислении:', error)
    $q.notify({
      message: 'Ошибка вычисления',
      type: 'negative',
      position: 'top'
    })
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.calculator-wrapper {
  display: flex;
  justify-content: center;
}

.calculator-card {
  width: 100%;
  max-width: 400px;
}

.result-section {
  background: #1d1d1d;
  color: white;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 1rem;
  border-radius: 8px 8px 0 0;
}

.result-display {
  font-size: 2.5rem;
  font-weight: bold;
  word-break: break-all;
  text-align: right;
}

.expression-display {
  font-size: 1rem;
  margin-top: 0.5rem;
  text-align: right;
}

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.col-span-2 {
  grid-column: span 2;
}

@media (max-width: 600px) {
  .container {
    padding: 0.5rem;
  }
  
  .result-display {
    font-size: 2rem;
  }
}
</style>
