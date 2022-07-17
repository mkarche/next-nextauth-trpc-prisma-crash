import type { NextComponentType, NextPageContext } from "next";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
	handler: Function;
}

const PrimaryButton: NextComponentType<NextPageContext, {}, Props> = (
	props: Props
) => {
	return (
		<button
			className="bg-teal-600 hover:bg-teal-500 text-white py-2 px-6 border rounded text-2xl m-2"
			onClick={(e) => props.handler(e)}
		>
			{props.children}
		</button>
	);
};

export default PrimaryButton;
