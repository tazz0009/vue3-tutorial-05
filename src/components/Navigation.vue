<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link to="/" @click="clickedMenu('Home')">
              <img
                class="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </router-link>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                v-for="item in list"
                :key="item.to"
                :to="item.to"
                @click="clickedMenu(item.title)"
                >{{ item.title }}</router-link
              >
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <button
              class="bg-gray-800 p-1 rounded-full text-gray-400 hover:bg-gray-400 hover:text-white"
              :class="!isLoggedIn ? 'block' : 'hidden'"
              @click="openLoginPage"
            >
              Login
            </button>
            <button
              class="bg-gray-800 p-1 rounded-full text-gray-400 hover:bg-gray-400 hover:text-white"
              :class="isLoggedIn ? 'block' : 'hidden'"
              @click="logout"
            >
              Logout
            </button>
          </div>
        </div>
        <div class="mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button
            class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            @click="setMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <!--
              Heroicon name: menu

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg
              class="block h-6 w-6"
              :class="!isModbileMenuOpen ? 'block' : 'hidden'"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!--
              Heroicon name: x

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg
              class="h-6 w-6"
              :class="isModbileMenuOpen ? 'block' : 'hidden'"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
    -->
    <div class="md:hidden" :class="isModbileMenuOpen ? 'block' : 'hidden'">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <router-link
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          v-for="item in list"
          :key="item.to"
          :to="item.to"
          @click="clickedMenu(item.title)"
          >{{ item.title }}</router-link
        >
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="mt-3 px-2 space-y-1">
          <a
            href="#"
            class="px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            :class="!isLoggedIn ? 'block' : 'hidden'"
            @click="openLoginPage"
            >Login</a
          >

          <a
            href="#"
            class="px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            :class="isLoggedIn ? 'block' : 'hidden'"
            @click="logout"
            >Logout</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { watchEffect, ref } from "vue";
import firebase from "../utilities/firebase";

export default {
  name: "Navigation",
  setup() {
    const list = ref([
      { title: "Dashboard", to: "/dashboard" },
      { title: "UserList", to: "/user-list" },
    ]);
    const store = useStore();
    const isModbileMenuOpen = ref(store.state.isModbileMenuOpen);
    watchEffect(
      () => (isModbileMenuOpen.value = store.state.isModbileMenuOpen)
    );
    const isLoggedIn = ref(store.state.isLoggedIn);
    watchEffect(() => (isLoggedIn.value = store.state.isLoggedIn));

    function setMobileMenu() {
      store.commit("setIsMobileMenuOpen", !isModbileMenuOpen.value);
    }
    function openLoginPage() {
      store.commit("setIsLoginPageOpen", true);
    }
    function logout() {
      firebase.auth().signOut();
      store.commit("setIsMobileMenuOpen", false);
    }

    function clickedMenu(title) {
      console.log("title :", title);
      store.commit("setCurrentMenuTitle", title);
    }

    return {
      list,
      store,
      isModbileMenuOpen,
      setMobileMenu,
      openLoginPage,
      logout,
      isLoggedIn,
      clickedMenu,
    };
  },
};
</script>

<style>
.router-link-active {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
  background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
}
</style>
