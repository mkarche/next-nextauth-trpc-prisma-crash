import type { NextComponentType, NextPageContext } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
	noauth?: boolean;
	children?: ReactNode;
}

const Auth: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
	const { data, status } = useSession();
	const router = useRouter();
	if (props.noauth === true) {
		return <>{props.children}</>;
	} else {
		if (status === "loading") return <div>Waiting for Session....</div>;

		if (status === "unauthenticated") return <div>not auth</div>; //router.push("/auth/signin");

		return <>{props.children}</>;
	}
};

export default Auth;
