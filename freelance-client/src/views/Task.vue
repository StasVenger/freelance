<template>
  <div class="card" v-if="taskInfo">
    <h2>{{ taskInfo.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="taskInfo.status" /></p>
    <p>
      <strong>Дэдлайн</strong>:
      {{ new Date(taskInfo.date).toLocaleDateString() }}
    </p>
    <p><strong>Описание</strong>: {{ taskInfo.description }}</p>
    <div>
      <button class="btn" @click="changeStatus('pending')">
        Взять в работу
      </button>
      <button class="btn primary" @click="changeStatus('done')">
        Завершить
      </button>
      <button class="btn danger" @click="changeStatus('cancelled')">
        Отменить
      </button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ taskId }}</strong> нет.
  </h3>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import AppStatus from "../components/AppStatus";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const taskId = route.params.id;
    const taskInfo = computed(() => store.getters.getTask(taskId));

    const changeStatus = (status) => {
      const changedTask = { ...taskInfo.value, status };
      store.dispatch("changeTaskStatus", changedTask);
    };

    onMounted(() => {
      store.dispatch("getTasksList");
      store.getters.getTask(taskId);
    });

    return {
      taskId,
      taskInfo,
      changeStatus,
    };
  },
  components: { AppStatus },
};
</script>
