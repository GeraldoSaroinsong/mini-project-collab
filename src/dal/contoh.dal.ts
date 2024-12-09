// ? IMPORTS IF NEEDED
import { prisma } from "../config/prisma";

// ? INTERFACE IF NEEDED
// interface IContoh {}

class DalContoh {
    // ? YOUR METHODS HERE
    async dalContohMethod(dataContoh: any): Promise<any> {
        try {
            // ? PEMANGGILAN DATABASE(PRISMA) HERE. CONTOH
            const newContoh = await prisma.event.create({ data: dataContoh });

            return newContoh;
        } catch (error: any) {
            throw error;
        }
    }
}

export default new DalContoh();
