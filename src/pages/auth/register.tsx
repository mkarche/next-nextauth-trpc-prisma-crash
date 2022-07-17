import axios from "axios";
import type { NextPage } from "next";
import { prepareServerlessUrl } from "next/dist/server/base-server";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { LinkButton, PrimaryButton } from "../../components";
import { z } from "zod";
import { trpc } from "../../utils/trpc";

// const UserType = z.object({
// 	name: z.union([z.string(), z.undefined()]),
// 	email: z.union([z.string(), z.undefined()]),
// 	password: z.union([z.string(), z.undefined()]),
// });

const UserType = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
});

const Register: NextPage = () => {
	const [user, setUser] = useState<z.infer<typeof UserType>>({
		name: "",
		email: "",
		password: "",
	});
	const router = useRouter();
	const userMutation = trpc.useMutation("users.create");

	//Create User(handle submit)
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const userToCreate = UserType.parse(user);
			//console.log("Client User posted", user);

			//Create user using REST API
			// const res = await axios.post("/api/auth/register", userToCreate);

			//Create user using TRPC API
			userMutation.mutate(userToCreate);
			!userMutation.error && router.push("/auth/signin");
		} catch (error) {
			console.log("Please check user data");
		}
	};

	return (
		<>
			<div className="w-full h-[100vh] flex justify-center items-center">
				<div className="border rounded border-teal-500 flex flex-col w-[30rem] p-4 justify-center items-center">
					<div>
						<form action="/api/auth/register">
							<div className="text-3xl font-bold text-center">Register</div>
							<div>
								<div className="w-full m-2">
									<label
										htmlFor="name"
										className="text-2xl inline-block w-[30%]"
									>
										Name:
									</label>
									<input
										id="name"
										type="text"
										placeholder="your name"
										className="w-[70%] p-2 text-2xl"
										value={user?.name}
										onChange={(e) => {
											setUser((prev) => {
												return {
													...prev,
													[e.target.id]: e.target.value,
												};
											});
										}}
									/>
								</div>
								<div className="w-full m-2">
									<label
										htmlFor="email"
										className="text-2xl inline-block w-[30%]"
									>
										Email:
									</label>
									<input
										id="email"
										type="email"
										placeholder="email@domain.com"
										className="w-[70%] p-2 text-2xl"
										value={user?.email}
										onChange={(e) => {
											setUser((prev) => {
												return {
													...prev,
													[e.target.id]: e.target.value,
												};
											});
										}}
									/>
								</div>
								<div className="w-full m-2">
									<label
										htmlFor="password"
										className="text-2xl inline-block w-[30%]"
									>
										Password:
									</label>
									<input
										id="password"
										type="password"
										className="w-[70%] p-2 text-2xl"
										value={user?.password}
										onChange={(e) => {
											setUser((prev) => {
												return {
													...prev,
													[e.target.id]: e.target.value,
												};
											});
										}}
									/>
								</div>
								<div className="flex justify-end">
									<PrimaryButton handler={handleSubmit}>Register</PrimaryButton>
								</div>
							</div>
						</form>
					</div>
					{userMutation.error && (
						<div> Something Went wrong! {userMutation.error.message} </div>
					)}
					<div className="mt-12">
						<LinkButton href="/auth/signin">SignIn</LinkButton>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
