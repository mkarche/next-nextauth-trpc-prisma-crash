import type { NextComponentType, NextPageContext } from "next";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const Loading: NextComponentType<NextPageContext, {}, Props> = (
	props: Props
) => {
	return (
		<div className="m-4 text-center text-lg text-teal-500">
			{props.children}
		</div>
	);
};

export default Loading;
