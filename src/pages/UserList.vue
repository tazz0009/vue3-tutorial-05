<template>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between mt-5">
          <button
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            @click="addUser"
          >
            Add User
          </button>
        </div>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="boarder px-4 py-2">id</th>
              <th class="boarder px-4 py-2">Avatar</th>
              <th class="boarder px-4 py-2">Name</th>
              <th class="boarder px-4 py-2">Email</th>
              <th class="boarder px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in state.users" :key="user._id">
              <td class="border px-4 py-2">{{ user._id }}</td>
              <td class="border px-4 py-2">
                <img
                  class="rounded-full w-10 h-10"
                  :src="user.avatar"
                  :alt="user._id"
                />
              </td>
              <td class="border px-4 py-2">
                <a
                  @click="updateUser(user._id)"
                  class="cursor-pointer text-blue-700"
                >
                  {{ user.name }}
                </a>
              </td>
              <td class="border px-4 py-2">{{ user.email }}</td>
              <td class="border px-4 py-2">
                <button @click="deleteUser(user._id)">delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-between mt-5 max-w-screen-sm">
          <button
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            @click="prev"
            :disabled="state.users.page === 1"
            :class="state.users.page === 1 ? 'bg-gray-100' : ''"
          >
            Previous1
          </button>
          <button
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            @click="next"
            :disabled="state.users.page === state.users.total_pages"
            :class="
              state.users.page === state.users.total_pages ? 'bg-gray-100' : ''
            "
          >
            Next1
          </button>
        </div>
      </div>
      <!-- /End replace -->
    </div>
  </main>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import axios from "../plugins/axios";
import router from "../router";
import { useStore } from "vuex";

export default {
  name: "UserList",
  setup() {
    const pageNum = ref(1);
    const store = useStore();
    const state = reactive({
      users: [],
    });

    onMounted(async () => {
      const { data } = await axios.get(`/users?page=${pageNum.value}`);
      state.users = data;
    });

    async function next() {
      pageNum.value = pageNum.value + 1;
      const { data } = await axios.get(`/users?page=${pageNum.value}`);
      state.users = data;
    }

    async function prev() {
      pageNum.value = pageNum.value - 1;
      const { data } = await axios.get(`/users?page=${pageNum.value}`);
      state.users = data;
    }

    function addUser() {
      router.push("/add-user");
      store.commit("setCurrentMenuTitle", "Add User");
    }

    function updateUser(id) {
      router.push(`/update-user/${id}`);
      store.commit("setCurrentMenuTitle", "Update User");
    }

    async function deleteUser(id) {
      await axios.delete(`/users/${id}`);
      state.users = state.users.filter((user) => user._id !== id);
    }
    
    return { state, next, prev, addUser, updateUser, deleteUser };
  },
};
</script>

<style></style>
