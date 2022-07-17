import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import getUserByEmail from "../../../server/getUserByEmail";
import bcrypt from "bcryptjs";

const credentialProvider = CredentialProvider({
	name: "Credentials",
	//type: "credentials",
	credentials: {
		email: {
			label: "email",
			type: "email",
			placeholder: "email@domain.com",
		},
		password: { label: "Password", type: "password" },
	},
	async authorize(credentials, req) {
		if (!credentials?.email || !credentials?.password) return null;

		const result = await getUserByEmail(credentials.email); //{ id: 1, email: "john@email.com", password: "doe" };
		const userFound = result?.data;
		//console.log("provider authorize function", credentials, req);

		if (
			userFound?.password &&
			bcrypt.compareSync(credentials.password, userFound.password)
		) {
			//console.log({ ...userFound, password: undefined });
			const user = { ...userFound, password: undefined };
			return user;
		}
		return null;
	},
});

export default NextAuth({
	providers: [credentialProvider],
	callbacks: {
		signIn(params) {
			console.log("SignIn Callback params", params);
			return true;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/auth/signin",
	},
});
