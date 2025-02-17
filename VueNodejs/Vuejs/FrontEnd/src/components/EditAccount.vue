<template>
  <div v-if="currentAccount" class="edit-form py-3">
    <p class="headline">Edit Account</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentAccount.username"
        label="Username"
      ></v-text-field>

      <v-text-field v-model="currentAccount.email" label="Email"></v-text-field>

      <v-select
        v-model="selectedRoles"
        :items="availableRoles"
        label="Roles"
        multiple
      ></v-select>

      <v-divider class="my-5"></v-divider>

      <v-btn color="success" small @click="updateAccount"> Update </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Account...</p>
  </div>
</template>

<script>
import userAccountService from "../services/user.account.service";

export default {
  name: "Account",
  data() {
    return {
      currentAccount: null,
      message: "",
      availableRoles: ["admin", "user"], // Danh sách các role có sẵn
      selectedRoles: [],
    };
  },
  methods: {
    getAccount(id) {
      userAccountService
        .getAccountById(id)
        .then((response) => {
          this.currentAccount = response.data;
          this.selectedRoles = response.data.roles.map((role) => role.name);
          console.log("get account by id:", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateAccount() {
      const updatedData = {
        ...this.currentAccount,
        roles: this.selectedRoles, // Đảm bảo roles là array dạng ["admin", "user"]
      };

      console.log("Updated Data:", updatedData); // Kiểm tra dữ liệu trước khi gửi API
      userAccountService
        .updateAccountById(this.currentAccount.id, updatedData)
        .then((response) => {
          console.log(response.data);
          this.message = "The Account was updated successfully!";
          this.$router.push({ name: "Account-list" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getAccount(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
