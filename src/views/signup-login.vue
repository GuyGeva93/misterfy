<template>
	<section class="signup-login">
		<section class="login">
			<h2 class="title">Log in</h2>
			<form @submit.prevent="login">
				<select v-model="loginCred.username">
					<option value="">Select User</option>
					<option v-for="user in users" :key="user._id" :value="user.username">
						{{ user.fullname }}
					</option>
				</select>
				<button>Login</button>
			</form>
		</section>

		<section class="signup">
			<h2 class="title">Sign up</h2>
			<form @submit.prevent="signup">
				<h3>Username:</h3>
				<input
					type="text"
					placeholder="Enter username"
					v-model="signupCreds.username"
				/>
				<h3>Fullname:</h3>
				<input
					type="text"
					placeholder="Enter full name"
					v-model="signupCreds.fullname"
				/>
				<h3>Password</h3>
				<input
					type="password"
					autocomplete="false"
					v-model="signupCreds.password"
				/>
				<button>Sign up</button>
			</form>
		</section>
	</section>
</template>

<script>
export default {
	data() {
		return {
			signupCreds: {
				fullname: "",
				username: "",
				password: "",
			},
			loginCred: {
				username: "",
				password: "12345",
			},
		};
	},
	created() {
		this.loadUsers();
	},
	computed: {
		loggedinUser() {
			return this.$store.getters.loggedinUser;
		},

		users() {
			return this.$store.getters.users;
		},
	},
	methods: {
		loadUsers() {
			this.$store.dispatch({ type: "loadUsers" });
		},
		async signup() {
			await this.$store.dispatch({
				type: "signup",
				userCred: this.signupCreds,
			});
			this.$router.push('/');
		},
		async login() {
			await this.$store.dispatch({ type: 'login', userCred: this.loginCred })
			this.$router.push('/');
		}
	},
};
</script>

<style>
</style>