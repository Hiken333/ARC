<template>
  <q-page padding>
    <div class="container">
      <div class="text-center q-mb-lg">
        <h4 class="text-h4 text-weight-bold q-mb-sm">
          Угадай число
        </h4>
      </div>

      <!-- Настройки игры -->
      <q-card v-if="!gameActive" class="q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">Настройки игры</div>
          
          <q-input
            v-model.number="minNumber"
            label="Минимальное число"
            type="number"
            outlined
            class="q-mb-md"
          />
          
          <q-input
            v-model.number="maxNumber"
            label="Максимальное число"
            type="number"
            outlined
            class="q-mb-md"
          />
          
          <q-input
            v-model.number="maxAttempts"
            label="Количество попыток"
            type="number"
            outlined
            class="q-mb-md"
          />

          <q-btn 
            color="primary" 
            label="Начать игру" 
            size="lg"
            @click="startGame"
            class="full-width"
          />
        </q-card-section>
      </q-card>

      <!-- Игровое поле -->
      <q-card v-if="gameActive">
        <q-card-section>
          <div class="text-center q-mb-lg">
            <q-badge color="primary" class="text-h6 q-pa-md">
              Попытка {{ attempts }}/{{ maxAttempts }}
            </q-badge>
          </div>

          <q-input
            v-model.number="userGuess"
            label="Ваше число"
            type="number"
            outlined
            :min="minNumber"
            :max="maxNumber"
            class="q-mb-md"
            @keyup.enter="makeGuess"
          />

          <q-btn 
            color="primary" 
            label="Проверить" 
            size="lg"
            @click="makeGuess"
            class="full-width q-mb-md"
          />

          <div v-if="message" class="text-center q-mt-lg">
            <q-badge 
              :color="badgeColor" 
              class="text-h6 q-pa-md"
            >
              {{ message }}
            </q-badge>
          </div>

          <!-- История попыток -->
          <div v-if="history.length > 0" class="q-mt-lg">
            <q-separator class="q-mb-md" />
            <div class="text-h6 q-mb-md">История попыток:</div>
            <q-list bordered>
              <q-item 
                v-for="(item, index) in history" 
                :key="index"
                :class="getItemClass(item.result)"
              >
                <q-item-section>
                  <q-item-label>Попытка {{ item.attempts }}: {{ item.guess }}</q-item-label>
                  <q-item-label caption>{{ item.message }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <!-- Кнопка новой игры -->
          <q-btn 
            color="orange" 
            label="Новая игра" 
            size="md"
            @click="newGame"
            class="full-width q-mt-lg"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { GuessNumberGame } from '@/utils/GuessNumber'

const $q = useQuasar()

const minNumber = ref(1)
const maxNumber = ref(100)
const maxAttempts = ref(10)
const gameActive = ref(false)
const userGuess = ref<number | null>(null)
const message = ref('')
const badgeColor = ref('primary')
const attempts = ref(0)
const history = ref<Array<{
  guess: number
  attempts: number
  message: string
  result: 'win' | 'tooHigh' | 'tooLow' | 'noAttempts'
}>>([])

let game: GuessNumberGame | null = null

// Запуск новой игры
const startGame = () => {
  // Валидация ввода
  if (minNumber.value >= maxNumber.value) {
    $q.notify({
      message: 'Минимальное число должно быть меньше максимального!',
      type: 'negative',
      position: 'top'
    })
    return
  }

  game = new GuessNumberGame(minNumber.value, maxNumber.value, maxAttempts.value)
  gameActive.value = true
  userGuess.value = null
  message.value = ''
  badgeColor.value = 'primary'
  attempts.value = 0
  history.value = []

  $q.notify({
    message: 'Игра началась! Угадайте число от ' + minNumber.value + ' до ' + maxNumber.value,
    type: 'positive',
    position: 'top'
  })
}

// Проверка числа пользователя
const makeGuess = () => {
  if (!game || userGuess.value === null) {
    $q.notify({
      message: 'Введите число!',
      type: 'warning',
      position: 'top'
    })
    return
  }

  const result = game.makeGuess(userGuess.value)
  attempts.value = result.attempts
  message.value = result.message

  // Добавл в историю
  history.value.push({
    guess: userGuess.value,
    attempts: result.attempts,
    message: result.message,
    result: result.result
  })

  // Обработал результаты
  if (result.result === 'win') {
    badgeColor.value = 'positive'
    $q.notify({
      message: result.message,
      type: 'positive',
      position: 'top',
      timeout: 3000
    })
  } else if (result.result === 'tooHigh' || result.result === 'tooLow') {
    badgeColor.value = 'warning'
  } else {
    badgeColor.value = 'negative'
    $q.notify({
      message: 'Unluck. Правильный ответ: ' + game.getTargetNumber(),
      type: 'negative',
      position: 'top',
      timeout: 5000
    })
  }

  userGuess.value = null
}

// Новая игра
const newGame = () => {
  gameActive.value = false
  userGuess.value = null
  message.value = ''
  badgeColor.value = 'primary'
  attempts.value = 0
  history.value = []
  game = null
}

// Получить CSS класс для истории попыток
const getItemClass = (result: string) => {
  if (result === 'win') return 'bg-positive text-white'
  if (result === 'tooHigh') return 'bg-red-1'
  if (result === 'tooLow') return 'bg-blue-1'
  return ''
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

@media (max-width: 600px) {
  .container {
    padding: 0.5rem;
  }
}
</style>
