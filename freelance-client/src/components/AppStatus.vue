<template>
  <span :class="['badge', statusClass]">{{ status }}</span>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: ["type"],
  setup(props) {
    const classesList = {
      active: "primary",
      pending: "warning",
      done: "primary",
      cancelled: "danger",
    };

    const listStatuses = {
      active: "Активен",
      pending: "Выполняется",
      done: "Выполнен",
      cancelled: "Отменен",
    };

    const status = ref(listStatuses[props.type]);
    const statusClass = ref(classesList[props.type]);

    watch(props, (newValue) => {
      statusClass.value = classesList[newValue.type];
      status.value = listStatuses[newValue.type];
    });

    return {
      status,
      statusClass,
    };
  },
};
</script>
