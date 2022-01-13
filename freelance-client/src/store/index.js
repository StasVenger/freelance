import { createStore } from "vuex";
import axios from "axios";
import router from "@/router/index.js";

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_NEW_TASK(state, task) {
      state.tasks.push(task);
    },
    UPDATE_TASK_STATUS(state, task) {
      const index = state.tasks.findIndex((item) => item.id === task.id);
      state.tasks[index] = task;
    },
  },
  actions: {
    getTasksList({ commit }) {
      return axios
        .get("https://freelance-71c9a-default-rtdb.firebaseio.com/tasks.json")
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          if (!response) {
            throw new Error("Список пустой");
          }
          let tasks = Object.keys(response).map((key) => {
            return {
              id: key,
              ...response[key],
            };
          });
          commit("SET_TASKS", tasks);
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    addNewTask({ commit }, task) {
      return axios
        .post(
          "https://freelance-71c9a-default-rtdb.firebaseio.com/tasks.json",
          task
        )
        .then((response) => {
          commit("ADD_NEW_TASK", response.data);
          router.push({ name: "Tasks" });
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    changeTaskStatus({ commit }, task) {
      return axios
        .put(
          `https://freelance-71c9a-default-rtdb.firebaseio.com/tasks/${task.id}.json`,
          task
        )
        .then((response) => {
          commit("UPDATE_TASK_STATUS", response.data);
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getActiveTasks(state) {
      return state.tasks.filter((task) => task.status === "active").length;
    },
    getTask: (state) => (id) => {
      return state.tasks.find((task) => task.id === id);
    },
  },
});
