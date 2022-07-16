<template>
  <div class="container">
    <section class="user-form">
      <div v-if="!isRegistered" class="user-form__form-container">
        <h2>Working with POST request</h2>
        <v-form
          class="user-form__form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submitForm"
        >
          <v-text-field
            v-model.trim="username"
            variant="outlined"
            label="Your name"
            class="base-input"
            hint="Please enter your name"
            :rules="[rules.required, rules.counter]"
          ></v-text-field>
          <v-text-field
            v-model.trim="email"
            variant="outlined"
            label="Email"
            class="base-input"
            hint="Please enter your email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-text-field
            v-model="phone"
            variant="outlined"
            label="Phone"
            class="base-input"
            hint="Please enter your phone (+380xxxxxxxxx)"
            v-maska="'+380#########'"
            :rules="[rules.required, rules.phone]"
          ></v-text-field>
          <span class="user-form__label">Select your position</span>
          <v-radio-group
            v-model="position"
            :rules="[rules.selected]"
            class="base-radio"
          >
            <v-radio
              v-for="pos in positions"
              :key="pos.id"
              :label="pos.name"
              :value="pos.id"
            ></v-radio>
          </v-radio-group>
          <v-file-input
            accept="image/jpg, image/jpeg"
            label="Upload your photo"
            class="base-file-input"
            :rules="[rules.required, rules.img_size]"
            :error="isAvatarInvalid"
            :error-messages="errorMessages"
            @change="onAvatarChange"
          ></v-file-input>
          <div v-if="isLoading" class="spinner-container">
            <base-spinner></base-spinner>
          </div>
          <div class="user-form__submit">
            <base-button :disabled="!valid">Sign up</base-button>
          </div>
        </v-form>
      </div>
      <div v-else class="user-form__success-container">
        <h2>User successfully registered</h2>
        <div class="imgSuccess">
          <img
            class="imgSuccess__img"
            :src="imgSuccess"
            alt="register success"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { maska } from "maska";
import imgSuccess from "../../assets/success-image.svg";
import BaseSpinner from "../UI/BaseSpinner.vue";

export default {
  directives: { maska },
  props: {
    type: {
      type: String,
      default: "text",
    },
  },
  components: { "base-spinner": BaseSpinner },
  data() {
    return {
      valid: false,
      isLoading: false,
      imgSuccess,
      username: null,
      email: null,
      phone: null,
      position: null,
      photo: null,
      avatar: null,
      selected: null,
      isAvatarInvalid: false,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) =>
          (value.length >= 2 && value.length <= 60) ||
          "Min 2 and max 60 characters",
        img_size: (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 1024 * 1024 * 5 ||
            "Avatar size should be less than 5 MB!"
          );
        },
        email: (value) => {
          const pattern =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
          return pattern.test(value) || "Invalid e-mail.";
        },
        phone: (value) => {
          const phone_pattern = /^[+]{0,1}380([0-9]{9})$/gm;
          return phone_pattern.test(value) || "Invalid phone.";
        },
        selected: (value) => {
          return !!value || "";
        },
      },
    };
  },
  computed: {
    positions() {
      return this.$store.getters["auth/positions"] || [];
    },
    errorMessages() {
      const result = [];
      if (this.isAvatarInvalid) {
        return "Photo resolution should be be 70x70";
      }
      return result;
    },
    isRegistered() {
      return this.$store.getters["auth/success"] || false;
    },
  },
  methods: {
    async loadPositions() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("auth/fetchPositions");
      } catch (error) {
        this.error = error.message || "Something failed!";
      }
      this.isLoading = false;
    },
    onAvatarChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.photo = files[0];
      this.createAvatar(files[0]);
    },
    createAvatar(file) {
      let reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        (image.onload = () => {
          this.isAvatarInvalid = image.width !== 70 || image.height !== 70;
        }),
          (this.avatar = event.target.result);
      };
      reader.readAsDataURL(file);
    },
    async submitForm() {
      this.isLoading = true;
      if (this.valid) {
        const data = {
          name: this.username,
          email: this.email,
          phone: this.phone,
          position_id: this.position,
          photo: this.photo,
        };
        await this.$store.dispatch("auth/registerUser", data);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadPositions();
  },
};
</script>

<style lang="scss" scoped>
.user-form {
  margin-bottom: 50px;

  &__form,
  &__success-container {
    max-width: 380px;
    margin: 0 auto;
  }

  &__label {
    display: block;
    margin: 0 0 10px;
  }
  .base-input:not(:last-child) {
    margin-bottom: 12px;
  }
  .base-input:last-child {
    margin-bottom: 5px;
  }
  .base-file-input {
    margin-top: 5px;
  }
  &__submit {
    margin-top: 12px;
    display: flex;
    width: 100%;
    justify-content: center;
  }
}

.imgSuccess {
  display: flex;
  justify-content: center;

  &__img {
    display: block;
    max-width: 328px;
    height: auto;
  }
}
.spinner-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
