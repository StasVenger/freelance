<template>
  <h1 class="text-white center" v-if="tasksList.length === 0">
    Задач пока нет
  </h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ countActiveTasks }}</h3>
    <task-card
      v-for="task in tasksList"
      :key="task.id"
      :task="task"
      @open-task-info="openTask(task.id)"
    ></task-card>
  </template>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import TaskCard from "@/components/TaskCard";

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
  components: { TaskCard },
};
</script>
