import CardHistoria from "../components/card/CardHistoria";
function Inicio() {


  return (
    <div className="background-general min-h-screen flex items-center justify-center gap-8">
      <div className="card-inicio"></div>

      <CardHistoria />

      <div className="card-inicio"></div>
    </div>
  );
}

export default Inicio;
