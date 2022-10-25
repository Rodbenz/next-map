import { register } from "ol/proj/proj4";
import proj4 from "proj4";


export const register_32647 = () => {
    proj4.defs("EPSG:32647", "+proj=utm +zone=47 +datum=WGS84 +units=m +no_defs");
    register(proj4)
}