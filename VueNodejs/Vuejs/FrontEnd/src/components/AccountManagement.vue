<template>
  <v-row align-items="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="email" label="Search by Email"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn size="x-large" @click="searchEmail"> Search </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Accounts</v-card-title>

        <v-data-table
          :items="Accounts"
          disable-pagination
          :hide-default-footer="true"
          :headers="headers"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editAccount(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteAccount(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserAccountService from "../services/user.account.service";
export default {
  name: "Accounts-list",
  data() {
    return {
      Accounts: [],
      email: "",
      headers: [
        {
          title: "ID",
          align: "start",
          key: "id",
        },
        { title: "Email", key: "email" },
        { title: "UserName", key: "username" },
        { title: "Roles", key: "roles" },
        { title: "Actions", key: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveAccounts() {
      UserAccountService.getAllAccount()
        .then((response) => {
          console.log("API Response:", response.data); // Log dữ liệu trả về
          this.Accounts = response.data.map(this.getDisplayAccount);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveAccounts();
    },

    removeAllAccounts() {
      UserAccountService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchEmail() {
      UserAccountService.findByEmail(this.email)
        .then((response) => {
          this.Accounts = response.data.map(this.getDisplayAccount);
          console.log("search email:", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editAccount(id) {
      this.$router.push({ name: "Account-details", params: { id: id } });
    },

    deleteAccount(id) {
      UserAccountService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayAccount(Account) {
      return {
        id: Account.id,
        email: Account.email, // Hiển thị email
        username:
          Account.username.length > 30
            ? Account.username.substr(0, 30) + "..."
            : Account.username, // Hiển thị username
        roles:
          Account.roles && Account.roles.length > 0
            ? Account.roles.map((role) => role.name).join(", ") // Lấy name từ roles và nối thành chuỗi
            : "No roles assigned", // Giá trị mặc định nếu không có vai trò
      };
    },
  },
  mounted() {
    this.retrieveAccounts();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
