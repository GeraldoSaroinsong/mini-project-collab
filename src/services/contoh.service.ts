// ? IMPORT DAL's HERE. CONTOH
// import { dalCreateNeWRole, dalUpdateRole } from "../dal/role.dal";
import DalContoh from "../dal/contoh.dal";

// ? INTERFACE IF NEEDED
interface IContoh {}

class ServiceContoh {
    // ? YOUR METHODS HERE
    async serviceCreateContohMethod(dataContoh: IContoh): Promise<any> {
        try {
            // ? YOUR BUSINESS CODE HERE
            if (true) {
                console.log("INI ADALAH PERKONDISIAN DI DALAM SERVICE");
            } else {
                throw { rc: 400, message: "Error di perkondisian service" };
            }

            // ? PEMANGGILAN DAL HERE
            const newContoh = await DalContoh.dalContohMethod(dataContoh);

            return newContoh;
        } catch (error: any) {
            throw error;
        }
    }
}

export default new ServiceContoh();
