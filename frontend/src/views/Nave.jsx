import NaveSlider from "../components/card/NaveSlider";
import { useUser } from "../hooks/useUser";

export default function Nave() {

const { equiparNave } = useUser();

    return <NaveSlider onEquipar={equiparNave}/>

}