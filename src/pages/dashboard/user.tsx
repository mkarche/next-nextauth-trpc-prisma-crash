import type { NextPage } from "next";
import { signOut } from "next-auth/react";
import { PrimaryButton, LinkButton } from "../../components";

const User: NextPage = () => {
	const handleLogout = () => {
		signOut({ callbackUrl: "/auth/signin" });
	};
	return (
		<>
			<div className="w-full flex flex-col items-center">
				<div className="m-4 flex flex-col gap-4 items-center justify-center">
					<h1 className="text-3xl font-bold text-red-500">
						Protected User Page......
					</h1>
					<PrimaryButton handler={handleLogout}>Logout</PrimaryButton>
				</div>
			</div>
		</>
	);
};

export default User;
