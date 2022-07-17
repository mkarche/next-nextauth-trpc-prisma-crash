import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";

const Signin: NextPage = () => {
	const [email, setEmail] = useState<string | undefined>("");
	const [password, setPassword] = useState<string | undefined>("");
	const credentials = {
		email: email,
		password: password,
	};
	const { data, status } = useSession();
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//axios.post("/auth/api/login", credentials);
		signIn("credentials", {
			...credentials,
			callbackUrl: "/dashboard/user",
		});
	};

	if (status === "loading") {
		return <Loading>Loading Session...</Loading>;
	}

	if (status === "authenticated") {
		router.push("/dashboard/user");
	}

	return (
		<>
			<div className="w-full h-[100vh] flex justify-center items-center">
				<div className="border rounded border-teal-500 flex flex-col w-[30rem] p-4 justify-center items-center">
					<div>
						<form
							onSubmit={(e) => {
								handleSubmit(e);
							}}
						>
							<div className="text-3xl font-bold text-center">Sign In</div>
							<div>
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
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
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
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</div>
								<div className="flex justify-end">
									<button
										className="bg-teal-600 hover:bg-teal-500 text-white py-2 px-6 border rounded text-2xl m-2"
										type="submit"
									>
										Sign In
									</button>
								</div>
							</div>
						</form>
					</div>

					<div className="mt-12">
						<span className="text-black hover:text-white py-2 px-6 border rounded border-black hover:bg-black text-2xl m-2">
							<Link href="/auth/register">Register here</Link>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signin;
