<template>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>

      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p class="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form @submit.prevent="submit">
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="first_name"
                        class="block text-sm font-medium text-gray-700"
                        >User Name</label
                      >
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        v-model="state.form.name"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                      <label
                        for="email_address"
                        class="block text-sm font-medium text-gray-700"
                        >Email address</label
                      >
                      <input
                        type="text"
                        required
                        v-model="state.form.email"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        for="avatar"
                        class="block text-sm font-medium text-gray-700"
                        >Avatar URL</label
                      >
                      <input
                        type="text"
                        required
                        v-model="state.form.avatar"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "../plugins/axios";
import router from "../router";
import { useStore } from "vuex";

export default {
  props: ["id"],
  setup(props) {
    const state = reactive({
      form: {
        name: "",
        email: "",
        avatar: "",
      },
    });
    const store = useStore();

    onMounted(() => {
      getUserInfo(props.id);
    });

    async function getUserInfo(id) {
      if (id) {
        const { data } = await axios.get(`/users/${id}`);
        state.form.name = data.name;
        state.form.email = data.email;
        state.form.avatar = data.avatar;
      }
    }

    async function submit() {
      let data;
      if (props.id) {
        data = await axios.put(`/users/${props.id}`, state.form);
      } else {
        data = await axios.post("/users", state.form);
      }
      if (data) {
        state.form.name = "";
        state.form.email = "";
        state.form.avatar = "";
        router.push("/user-list");
        store.commit("setCurrentMenuTitle", "UserList");
      }
    }
    return { submit, state };
  },
};
</script>

<style></style>
