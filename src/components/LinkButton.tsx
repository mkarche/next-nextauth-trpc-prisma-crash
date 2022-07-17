import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
	href: string;
}

const LinkButton: NextComponentType<NextPageContext, {}, Props> = (
	props: Props
) => {
	return (
		<span className="text-black hover:text-white py-2 px-6 border rounded border-black hover:bg-black text-2xl m-2">
			<Link href={props.href}>{props.children}</Link>
		</span>
	);
};

export default LinkButton;
