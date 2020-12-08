<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <div :class="!isLoginPageOpen ? 'block' : 'hidden'">
      <Navigation />
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            {{ menuTitle }}
          </h1>
        </div>
      </header>
      <router-view></router-view>
    </div>
    <div :class="isLoginPageOpen ? 'block' : 'hidden'">
      <Login />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { watchEffect, ref, onMounted } from "vue";
import Navigation from "./components/Navigation.vue";
import Login from "./components/Login.vue";
import firebase from "./utilities/firebase";
import router from "./router";

export default {
  components: { Navigation, Login },
  name: "App",
  setup() {
    const store = useStore();
    const menuTitle = ref("store.state.currentMenuTitle");
    watchEffect(() => (menuTitle.value = store.state.currentMenuTitle));
    const isLoginPageOpen = ref(store.state.isLoginPageOpen);
    watchEffect(() => (isLoginPageOpen.value = store.state.isLoginPageOpen));

    onMounted(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          store.commit("setIsLoggedIn", true);
          store.commit("setAuthUser", user);
        } else {
          store.commit("setIsLoggedIn", false);
          store.commit("setAuthUser", {});
        }
        router.push("/");
        store.commit("setCurrentMenuTitle", "Home");
      });
    });

    return { store, isLoginPageOpen, menuTitle };
  },
};
</script>

<style></style>
