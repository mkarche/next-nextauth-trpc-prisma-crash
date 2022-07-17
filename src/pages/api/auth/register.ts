import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import createUser from "../../../server/createUser";

type Data = {
	message: string;
	data?: UserSelectionInterface;
	error?: any;
};

interface UserSelectionInterface {
	name: string;
	email: string;
	id: string;
}

const UserInterface = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
	age: z.number().nullish(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const newUser = UserInterface.parse(req.body);
		const result = await createUser(newUser);
		if (result.status === "KO") {
			res.status(500).json({
				message: "An Error occurred while creating the user",
				error: result.error,
			});
		}
		res
			.status(200)
			.json({ message: "User created successfully", data: result.data });
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: `An Error occurred while creating the user:${e}`,
		});
	}
};

export default handler;
