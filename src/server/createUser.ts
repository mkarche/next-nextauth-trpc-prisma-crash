import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const UserInterface = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
});

const fieldSelect = { name: true, email: true, id: true };

async function createUser(user: z.infer<typeof UserInterface>) {
	try {
		await prisma.$connect();
		user.password = bcrypt.hashSync(user.password, 14); //Hash the password with a salt of 14 before storing in DB
		const userCreated = await prisma.user.create({
			data: user,
			select: fieldSelect,
		});
		await prisma.$disconnect();

		return { status: "OK", data: userCreated };
	} catch (error) {
		return { status: "KO", error: error };
	}
}

export default createUser;
