<template>
  <h1 class="text-white center" v-if="tasksList.length === 0">
    Задач пока нет
  </h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ countActiveTasks }}</h3>
    <div class="card" v-for="task in tasksList" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ new Date(task.date).toLocaleDateString() }}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="openTask(task.id)">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import AppStatus from "../components/AppStatus";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const tasksList = computed(() => store.getters.getTasks);
    const countActiveTasks = computed(() => store.getters.getActiveTasks);

    function openTask(id) {
      router.push(`/${id}`);
    }

    onMounted(() => {
      store.dispatch("getTasksList");
    });

    return {
      tasksList,
      countActiveTasks,
      openTask,
    };
  },
  components: { AppStatus },
};
</script>
