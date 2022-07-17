import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import Auth from "../components/auth";
import Loading from "../components/Loading";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	const hello = trpc.useQuery(["hello", { text: "Momo" }]);
	// const users = trpc.useQuery(["users.all"]);
	// const posts = trpc.useQuery(["posts.list"]);
	//console.log("users", users);

	const { data, status } = useSession();

	return (
		<>
			<Head>
				<title>Next-trpc-prisma-app</title>
				<meta
					name="description"
					content="Crash Next TRPC PRISMA and TailwindCSS"
				/>
				<meta
					name="keywords"
					content="Dev Practice, Next, Next-auth, Trpc, Prisma, TailwindCSS, javascript, React fullstack framework"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-center font-bold text-3xl text-teal-700">
				Sensitive Data
			</h1>
			{/* <div>
				{hello.status === "loading" && (
					<div className="m-4 text-center text-lg">Loading....</div>
				)}
				{hello.status === "success" && (
					<div className="m-4 text-center text-lg">
						Hello {hello.data?.greeting}
					</div>
				)}
				{hello.status === "error" && (
					<div className="m-4 text-center text-lg">
						An Error Occurred When Fetching Data
					</div>
				)}
			</div> */}

			<div>
				<>
					{status === "loading" && <Loading>Loading Session....</Loading>}
					{status === "unauthenticated" && ( //Router.push("/api/auth/signin")
						<>
							Not SignedIn <br />
							{/* <button onClick={() => signIn()}>Sign In</button> */}
						</>
					)}
					{status === "authenticated" && (
						<>
							<div className="m-4 text-center text-lg">
								<span className="text-2xl font-bold">
									Hello {data?.user?.email}
								</span>{" "}
								<br />
								Congrats! you reached our secret pages <br />
								<button
									className="bg-teal-600 text-white px-4 py-2 mt-4"
									onClick={() => {
										signOut();
										//appRouter.push("/api/auth/signin");
									}}
								>
									Sign Out
								</button>
							</div>
						</>
					)}
				</>
			</div>
		</>
	);
};

export default Home;
