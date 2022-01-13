import { createStore } from "vuex";
import axios from "axios";
import router from "@/router/index.js";

export default createStore({
  state: {
    tasks: [],
    task: null,
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_NEW_TASK(state, task) {
      state.tasks.push(task);
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
    addNewTask({ commit }, payload) {
      return axios
        .post(
          "https://freelance-71c9a-default-rtdb.firebaseio.com/tasks.json",
          payload
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
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getActiveTasks(state) {
      return state.tasks.filter((task) => task.status === "active").length;
    },
    getTask(_, getters) {
      return (id) => getters.getTasks.find((task) => task.id === id);
    },
  },
});
