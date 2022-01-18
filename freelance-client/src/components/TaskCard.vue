<template>
  <div class="card">
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
    <button class="btn primary" @click="$emit('open-task-info')">
      Посмотреть
    </button>
  </div>
</template>

<script>
import AppStatus from "@/components/AppStatus";
export default {
  emits: ["open-task-info"],
  props: ["task"],
  components: { AppStatus },
};
</script>
