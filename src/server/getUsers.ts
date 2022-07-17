import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const fieldSelect = { name: true, email: true, id: true };

async function getUsers() {
	try {
		await prisma.$connect();

		const users = await prisma.user.findMany({
			select: fieldSelect,
		});

		await prisma.$disconnect();

		return { status: "OK", data: users };
	} catch (error) {
		return { status: "KO", error: error };
	}
}

export default getUsers;
