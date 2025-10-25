<template>
  <q-page padding>
    <div class="container">
      <div class="text-center q-mb-xl">
        <p class="text-h6 text-grey-7">
          Выберите приложение для использования
        </p>
      </div>

      <div class="row q-gutter-md justify-center">
        <!-- Калк -->
        <q-card 
          class="app-card col-12 col-md-5" 
          @click="$router.push('/calculator')"
          clickable
          :hoverable="true"
        >
          <q-card-section class="text-center">
            <q-icon name="calculate" size="64px" color="primary" />
            <div class="text-h5 q-mt-md text-weight-bold">Калькулятор</div>
            <div class="text-body2 text-grey-6 q-mt-sm">
              Выполняйте математические операции
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn 
              unelevated 
              color="primary" 
              label="Открыть" 
              icon-right="arrow_forward"
              @click.stop="$router.push('/calculator')"
            />
          </q-card-actions>
        </q-card>

        <!-- Игра -->
        <q-card 
          class="app-card col-12 col-md-5"
          @click="$router.push('/guessNumber')"
          clickable
          :hoverable="true"
        >
          <q-card-section class="text-center">
            <q-icon name="videogame_asset" size="64px" color="accent" />
            <div class="text-h5 q-mt-md text-weight-bold">Угадай число</div>
            <div class="text-body2 text-grey-6 q-mt-sm">
              Отгадайте загаданное число
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn 
              unelevated 
              color="accent" 
              label="Открыть" 
              icon-right="arrow_forward"
              @click.stop="$router.push('/guessNumber')"
            />
          </q-card-actions>
        </q-card>
      </div>


    
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// уведа вначале
onMounted(() => {
  $q.notify({
    message: 'Привет, выбери приложение для использования.',
    type: 'positive',
    position: 'top',
    timeout: 3000
  })
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.app-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.app-card:hover {
  transform: translateY(-8px);
}

@media (max-width: 600px) {
  .container {
    padding: 1rem;
  }
}
</style>
