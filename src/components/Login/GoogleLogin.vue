<template>
  <div class="flex justify-center">
    <img
      class="h-12 w-12 rounded-md"
      src="https://img-authors.flaticon.com/google.jpg"
      alt=""
      @click="loginWithGoogle"
    />
  </div>
</template>

<script>
import firebase from "../../utilities/firebase";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    function loginWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          store.commit("setIsLoginPageOpen", false);
        })
        .catch(() => {});
    }
    return { loginWithGoogle };
  },
};
</script>

<style></style>
