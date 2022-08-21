import "dotenv/config";
import {getCheckData} from "./controllers";

(async function () {
    console.log("Scanning urls...");
    const checkData = await getCheckData();
    console.table(checkData);
})();

