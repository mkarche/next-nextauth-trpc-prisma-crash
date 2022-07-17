import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const fieldSelect = { name: true, email: true, password: true };

async function getUserByEmail(email: string) {
	try {
		await prisma.$connect();

		const user = await prisma.user.findFirst({
			where: { email: email },
			select: fieldSelect,
		});

		await prisma.$disconnect();

		return { status: "OK", data: user };
	} catch (error) {
		return { status: "KO", error: error };
	}
}

export default getUserByEmail;
