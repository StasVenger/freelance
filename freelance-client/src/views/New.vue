<template>
  <form class="card" @submit.prevent="createTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="formData.title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="formData.date" @keypress.prevent />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="formData.description"></textarea>
    </div>

    <button type="submit" class="btn primary" :disabled="isDisabled">
      Создать
    </button>
  </form>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const formData = reactive({
      title: "",
      date: null,
      description: "",
      status: "active",
    });

    const store = useStore();

    const createTask = () => {
      if (new Date(formData.date) < new Date()) formData.status = "cancelled";
      store.dispatch("addNewTask", formData);
    };

    const isDisabled = computed(
      () =>
        formData.title === "" ||
        formData.date === null ||
        formData.description === ""
    );

    return {
      formData,
      createTask,
      isDisabled,
    };
  },
};
</script>
